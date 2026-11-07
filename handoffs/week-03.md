# Handoff — Semana 03: React Navigation 7

> Documento para **otro Claude sin memoria de la conversación anterior**. Léelo completo antes de tocar código. Rama de trabajo: `week-03`.

## 0. Contexto fijo (igual en todas las semanas — léelo completo)

**Quién:** Juan Felipe Maradey Navarro (GitHub `8damara8`). Responde SIEMPRE en español.
**Qué:** app móvil **Acuario** (React Native + Expo **SDK 57**, TypeScript strict), construida paso a paso, una semana por rama.
**Repo del aprendiz:** https://github.com/8damara8/Juan-Felipe-Maradey-Navarro
**Referencia del instructor (SOLO LECTURA):** https://github.com/ergrato-dev/bc-reactnative → carpeta `bootcamp/week-NN-*/` (`README.md`, `1-teoria/`, `3-proyecto/README.md`). Clónalo en `/tmp` si tienes red; si no, usa `web_fetch`.

### Reglas del proyecto
1. **Dominio único: acuario.** Entidades: `Pez`, `Tanque` (la pecera del usuario), parámetros del agua, cuidados. Nombres en español.
2. **Solo la app del dominio.** NO subir `2-practicas/`, ejercicios guiados ni los `starter/` del instructor. Léelos como guía, pero el código lo escribes tú para el acuario.
3. **Ramas apiladas.** `main` está VACÍO a propósito: nunca commitear en `main`. Existen `week-01` … `week-18`; cada una nace de la anterior. Trabaja solo en tu rama `week-NN`.
4. **Paso a paso.** Un paso = un commit pequeño (`feat(week-NN): …`). Antes de pasar al siguiente paso, explica al usuario en 2-3 líneas qué hiciste y por qué (está aprendiendo).
5. **Código documentado simple.** Comentarios cortos en español que expliquen el *qué/por qué* no obvio. TypeScript strict, sin `any`, sin `as any`. Estilos con `StyleSheet.create` (sin `style={…}` inline salvo valores realmente dinámicos). Un componente por archivo.
6. **Gestor de paquetes: solo pnpm 10.34.7**, fijo por `packageManager` (con hash sha512) y corepack. Prohibido `npm install`, `yarn`, `package-lock.json`.
7. **Versiones exactas** (sin `^` ni `~`). `.npmrc` ya tiene `save-exact=true` y `minimum-release-age=1440` (no instala paquetes con menos de 24 h). Antes de añadir una dependencia: `npm view <pkg> version`. Para paquetes de Expo usa `pnpm expo install <pkg>` (elige la versión compatible con SDK 57) y luego deja la versión **exacta** en `package.json`. Haz commit de `pnpm-lock.yaml`.
8. **Expo Go SDK 57 únicamente.** Usa solo módulos incluidos en Expo Go. Nada que requiera dev build/prebuild (MMKV, push remoto en Android, OAuth nativo, etc.). Si el temario del instructor lo pide, usa la alternativa compatible con Expo Go y déjala anotada en la sección «Notas para la siguiente semana» de ESTE handoff.
9. **Seguridad.** Sin secretos en el repo (`.env*` ignorado). Todo `EXPO_PUBLIC_*` es público. Excepción de auditoría conocida y aceptada: `GHSA-86w9-cpqp-85rv` (`node-forge`, dependencia de desarrollo del CLI de Expo, sin versión corregida). Cualquier otra vulnerabilidad `high` nueva se corrige o se informa al usuario.

### Errores del repo del instructor que NO debes copiar
- `"main": "expo-router/entry"` sin `expo-router` instalado (el proyecto no arranca). Aquí `main` es `index.ts`.
- `baseUrl` en `tsconfig.json` (error TS5101 con TypeScript 6). No usar `baseUrl`.
- `sdkVersion: "53.0.0"` en `app.json`, e imágenes/íconos referenciados que no existen.
- Ejemplos de CI con `cache: 'npm'` en un proyecto pnpm.
- `axios@1.18.1` tiene vulnerabilidades altas: usar la versión parcheada más reciente (≥ 1.20.0, verificar con `pnpm audit`).

### Verificación obligatoria antes de cerrar la semana
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck                              # 0 errores
pnpm seguridad                              # solo la excepción conocida
CI=1 npx expo export --platform android     # el bundle debe compilar
rm -rf dist
```
Si algo falla, corrígelo antes de hacer push. Pide al usuario probar en **Expo Go (SDK 57)** con `pnpm start` y confirmar visualmente.

---
## 1. Punto de partida
Parte de `week-02`.
```bash
git clone https://github.com/8damara8/Juan-Felipe-Maradey-Navarro.git && cd Juan-Felipe-Maradey-Navarro
git checkout week-03
corepack enable && pnpm install --frozen-lockfile
```

## 2. Objetivo de la semana (en el acuario)
Navegación multi-pantalla: Tabs (Peces · Mi Tanque) con un Stack anidado en «Peces» (Lista → Detalle del pez), parámetros tipados y header personalizado.
Teoría de referencia (solo lectura): `bootcamp/week-03-*/1-teoria/` y `3-proyecto/README.md` en https://github.com/ergrato-dev/bc-reactnative.

## 3. Pasos (un commit por paso)
1. Instalar dependencias (ver sección 4) y confirmar con `pnpm expo install --check` que son compatibles con SDK 57.
2. Crear `src/navigation/types.ts` con `RootStackParamList` / `TabParamList` tipados.
3. Crear `src/navigation/PecesStack.tsx` (native stack: `ListaPeces` → `DetallePez` con `route.params.pezId`).
4. Crear `src/screens/DetallePezScreen.tsx` (imagen grande, ficha completa: tamaño, temperatura, tipo de agua).
5. Crear `src/screens/MiTanqueScreen.tsx` (pantalla placeholder con texto; se llenará en la semana 4).
6. Crear `src/navigation/AppNavigator.tsx` con Bottom Tabs + íconos de `@expo/vector-icons` y montarlo en `App.tsx` dentro de `NavigationContainer`.

## 4. Dependencias
- `@react-navigation/native` **7.3.8**, `@react-navigation/native-stack` **7.17.10** (versiones usadas por el instructor y verificadas en npm).
- `@react-navigation/bottom-tabs` (misma major 7; verificar con `npm view @react-navigation/bottom-tabs version` y fijar exacta).
- `react-native-screens` **4.25.2** (ya validada con SDK 57). `@expo/vector-icons` con `pnpm expo install`.

## 5. Trampas y restricciones de esta semana
- Drawer Navigator: se OMITE esta semana (requiere Reanimated + Gesture Handler, semana 10). Anotarlo.
- NO usar `expo-router` ni dejar `main` apuntando a él: seguimos con `index.ts` + `registerRootComponent`.
- Cada Stack con `SafeAreaView` o `useSafeAreaInsets` según corresponda para no duplicar márgenes.

## 6. Criterios de salida
- [ ] La verificación obligatoria de la sección 0 pasa completa.
- [ ] El usuario confirmó que funciona en Expo Go (SDK 57).
- [ ] Comentarios simples en español en el código nuevo; sin `any`.
- [ ] `pnpm-lock.yaml` y `package.json` actualizados y con versiones exactas.
- [ ] No se subió nada de `2-practicas/` ni de los starters del instructor.

## 7. Cierre de la semana (git)
```bash
git status                       # nada sin commitear
git push -u origin week-03
```

### Cascada (mantener las ramas apiladas)
Después del push, propaga tu trabajo a las ramas siguientes con merges (no reescribe historia):
```bash
prev=week-03
for b in $(seq -f "week-%02g" 4 18); do
  git checkout "$b" && git merge --no-edit "$prev" || break
  prev="$b"
done
git checkout week-03
```
Si hay conflicto, resuélvelo, `git commit` y repite el bucle desde esa rama. Luego `git push origin --all` (nunca `--force`).

## 8. Siguiente sesión
Cuando el usuario confirme que la semana funciona, dile que abra una **sesión nueva** de Claude con este mensaje:
> «Lee `handoffs/week-04.md` en la rama `week-04` del repo https://github.com/8damara8/Juan-Felipe-Maradey-Navarro y ejecútalo.»

## 9. Notas para la siguiente semana
**Qué se hizo:** los 6 pasos de la sección 3, un commit por paso. Estructura final: `App.tsx` (`SafeAreaProvider` → `NavigationContainer` con tema) → `AppNavigator` (Bottom Tabs: `Peces`, `MiTanque`) → `PecesStack` (`ListaPeces` = `HomeScreen`, `DetallePez` = `DetallePezScreen`). Archivos nuevos: `src/navigation/{types,PecesStack,AppNavigator,temaNavegacion}.ts(x)`, `src/screens/{DetallePezScreen,MiTanqueScreen}.tsx`, `src/components/DatoFicha.tsx`, y `buscarPezPorId` en `src/data/peces.ts`.

**Qué se adaptó / decisiones:**
- **Cascada pendiente de la semana 2:** `week-03` había nacido del commit del handoff de la semana 2, sin el código de la semana 2. Se hizo `git merge origin/week-02` (sin conflictos) antes de empezar.
- **Versiones:** `@react-navigation/native` quedó en **7.5.1** (no 7.3.8 como decía la sección 4): `@react-navigation/elements@2.9.45` (dependencia interna de tabs/stack) exige `native ^7.5.1`, y con 7.3.8 había un peer sin cumplir. El resto: `native-stack 7.17.10`, `bottom-tabs 7.18.8` (mismo release que native-stack 7.17.10), `react-native-screens 4.25.2`, `@expo/vector-icons 15.1.1`. Todas exactas.
- `pnpm expo install --check` no se pudo ejecutar (el entorno no alcanza la API de Expo). Se comprobó a mano contra `node_modules/expo/bundledNativeModules.json`: `react-native-screens 4.25.2` coincide; `@expo/vector-icons` pide `^15.0.2` (15.1.1 cumple). **Si puedes, corre `pnpm expo install --check` en tu máquina.**
- **Orden de los pasos 3 y 4 invertido** (se creó `DetallePezScreen` antes que `PecesStack`) para que cada commit compile.
- **Params de `DetallePez`:** `{ pezId, nombre }`. `pezId` es la fuente de verdad (el detalle busca el pez con `buscarPezPorId`); `nombre` solo sirve para el título del header. Si el id no existe se muestra «No encontramos este pez».
- **`PezCard` ya no abre un `Alert`:** recibe la prop `onVerFicha(pez)`. `HomeScreen` la implementa con `navigation.navigate(...)` y se la pasa también a `ListaPecesAgrupada`.
- **Headers:** `ListaPeces` oculta el header del Stack (conserva su encabezado «🐠 Acuario» con el contador); `DetallePez` usa el header del Stack con el tema; la pestaña `Peces` oculta el header de tabs para no duplicarlo; `MiTanque` usa el header de tabs.
- **Safe area:** `HomeScreen` usa `SafeAreaView` solo con `edges={['top','left','right']}` (abajo ya lo cubre la barra de pestañas). Detalle y Mi Tanque no necesitan `SafeAreaView`.
- **Drawer Navigator: OMITIDO** (requiere Reanimated + Gesture Handler, semana 10), como indica la sección 5.
- No se usó `expo-router`; `main` sigue siendo `index.ts`.

**Lo que debe saber la semana 4:**
- `MiTanqueScreen` es un placeholder estático; la semana 4 debe llenarla con el estado global (Zustand). El botón «Agregar a mi tanque» va en `DetallePezScreen` (después de la `ficha`) y el favorito en `PezCard` (hay que añadir otra prop como `onVerFicha`, o leer el store).
- Se puede mostrar un contador (badge) en la pestaña `MiTanque` con `tabBarBadge` en `AppNavigator` cuando exista el store.
- `HomeScreen` sigue concentrando el estado de búsqueda/filtros/vista; la navegación mantiene la pantalla montada al ir al detalle y volver, así que el estado se conserva.
- Los tipos de las pantallas están en `src/navigation/types.ts` (`ListaPecesProps`, `DetallePezProps`). No se declaró `ReactNavigation.RootParamList` global; si en alguna semana se usa `useNavigation()` sin genérico, hay que declararlo.

**Verificación hecha:** `pnpm install --frozen-lockfile` OK; `pnpm typecheck` 0 errores; `pnpm seguridad` solo la excepción conocida (`GHSA-86w9-cpqp-85rv`); `CI=1 npx expo export --platform android` compila (`dist` borrado). **Pendiente:** confirmación visual del usuario en Expo Go (SDK 57) y `git push` + cascada.
