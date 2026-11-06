# Handoff — Semana 04: Estado global con Zustand

> Documento para **otro Claude sin memoria de la conversación anterior**. Léelo completo antes de tocar código. Rama de trabajo: `week-04`.

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
9. **Seguridad.** Sin secretos en el repo (`.env*` ignorado). Todo `EXPO_PUBLIC_*` es público. Excepciones de auditoría aceptadas (dependencias de desarrollo del CLI de Expo; no entran al bundle): `GHSA-mrhx-c7xc-m3w5`, `GHSA-3g3m-2fjr-6pw4`, `GHSA-g3hv-75wg-m249` y `GHSA-gcqx-w48m-w2h4`, declaradas en `pnpm.auditConfig.ignoreGhsas`. `node-forge` ya no es excepción: se fija en 1.4.2 con `pnpm.overrides`. Cualquier otra vulnerabilidad `high` nueva se corrige o se informa al usuario.

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
Parte de `week-03`.
```bash
git clone https://github.com/8damara8/Juan-Felipe-Maradey-Navarro.git && cd Juan-Felipe-Maradey-Navarro
git checkout week-04
corepack enable && pnpm install --frozen-lockfile
```

## 2. Objetivo de la semana (en el acuario)
Pantalla «Mi Tanque»: el usuario agrega/quita peces de su tanque y marca favoritos. Estado global con Zustand, selectores, slices y persistencia con AsyncStorage. Badge en el tab con la cantidad de peces.
Teoría de referencia (solo lectura): `bootcamp/week-04-*/1-teoria/` y `3-proyecto/README.md` en https://github.com/ergrato-dev/bc-reactnative.

## 3. Pasos (un commit por paso)
1. Crear `src/store/tanqueStore.ts` con `create<…>()` tipado: `pecesEnTanque`, `agregarPez`, `quitarPez`, `vaciarTanque`.
2. Crear slice de favoritos (`favoritosSlice`) y combinarlo en `src/store/index.ts`.
3. Usar selectores en los componentes (`useTanqueStore(s => s.pecesEnTanque.length)`) para evitar re-renders.
4. Botón «Agregar a mi tanque» en `DetallePezScreen` y botón de favorito en `PezCard`.
5. Implementar `MiTanqueScreen` con la lista del tanque, contador y botón vaciar.
6. Middleware `persist` con `createJSONStorage(() => AsyncStorage)` para conservar el tanque entre sesiones.
7. Badge dinámico en el tab «Mi Tanque».

## 4. Dependencias
- `zustand` **5.0.14**.
- `@react-native-async-storage/async-storage` con `pnpm expo install` (fijar exacta).

## 5. Trampas y restricciones de esta semana
- Zustand = estado de CLIENTE (tanque, favoritos). El estado de SERVIDOR (lista de peces de una API) irá en TanStack Query en la semana 5: no mezclarlos.

## 6. Criterios de salida
- [ ] La verificación obligatoria de la sección 0 pasa completa.
- [ ] El usuario confirmó que funciona en Expo Go (SDK 57).
- [ ] Comentarios simples en español en el código nuevo; sin `any`.
- [ ] `pnpm-lock.yaml` y `package.json` actualizados y con versiones exactas.
- [ ] No se subió nada de `2-practicas/` ni de los starters del instructor.

## 7. Cierre de la semana (git)
```bash
git status                       # nada sin commitear
git push -u origin week-04
```

### Cascada (mantener las ramas apiladas)
Después del push, propaga tu trabajo a las ramas siguientes con merges (no reescribe historia):
```bash
prev=week-04
for b in $(seq -f "week-%02g" 5 18); do
  git checkout "$b" && git merge --no-edit "$prev" || break
  prev="$b"
done
git checkout week-04
```
Si hay conflicto, resuélvelo, `git commit` y repite el bucle desde esa rama. Luego `git push origin --all` (nunca `--force`).

## 8. Siguiente sesión
Cuando el usuario confirme que la semana funciona, dile que abra una **sesión nueva** de Claude con este mensaje:
> «Lee `handoffs/week-05.md` en la rama `week-05` del repo https://github.com/8damara8/Juan-Felipe-Maradey-Navarro y ejecútalo.»

## 9. Notas para la siguiente semana
**Qué se hizo:** Zustand 5.0.14 con **un solo store** (`useAcuarioStore`, `src/store/index.ts`) hecho con slices: `tanqueSlice` (`idsTanque`, `agregarPez`, `quitarPez`, `vaciarTanque`) y `favoritosSlice` (`idsFavoritos`, `alternarFavorito`), más el dato volátil `hidratado`. Tipos en `src/store/types.ts`. `persist` con `createJSONStorage(() => AsyncStorage)`, `partialize` (solo los dos arrays de ids) y `onRehydrateStorage`. Componentes nuevos: `BotonFavorito`, `BotonTanque`, `PezFila`. `MiTanqueScreen` ya es real (SectionList «En mi tanque» + «Mis favoritos», botón Vaciar con confirmación, indicador de carga hasta hidratar). Badge en la pestaña `MiTanque` con `tabBarBadge`.

**Qué se adaptó / decisiones:**
- **Se guardan ids, no peces:** facilita persistir; el pez se resuelve con `buscarPezPorId`. Si un id guardado ya no existe en los datos, se ignora.
- **`@react-native-async-storage/async-storage` quedó en 2.2.0**, no en la última de npm (3.1.1): 2.2.0 es la que trae Expo Go SDK 57 (`node_modules/expo/bundledNativeModules.json`). **No subirla** sin subir el SDK.
- **`terminarHidratacion()` es una función aparte con tipo de retorno `void`** para evitar un error de TypeScript por referencia circular (el store se referenciaría a sí mismo dentro de `onRehydrateStorage`). No inlinearla.
- **`hidratado` NO se persiste** (partialize lo excluye) y se pone en `true` en `onRehydrateStorage` incluso si hay error de lectura, para que `MiTanque` no quede cargando para siempre.
- **Un selector por dato, siempre** (también para las acciones en `MiTanqueScreen`): las acciones del store no cambian de referencia, así que no hace falta `useShallow`.
- **Navegación anidada:** desde `MiTanque` se abre la ficha con `navigation.navigate('Peces', { screen: 'DetallePez', params })` (tipado gracias a `NavigatorScreenParams` de la semana 3). Se agregó `MiTanqueProps` en `src/navigation/types.ts`.
- **`ReactNavigation.RootParamList` global declarada** en `src/navigation/types.ts` (hueco de la semana 3): ahora `useNavigation()` queda tipado sin genéricos.
- Colores nuevos en el tema: `favorito` y `peligro`.
- **Seguridad:** al ejecutar `pnpm seguridad` aparecieron 16 avisos nuevos (ya existían en `week-03`; son avisos publicados después). Todos son del CLI de desarrollo de Expo, ninguno entra al bundle. Se corrigió `node-forge` con `pnpm.overrides` → **1.4.2**. Quedan 4 excepciones aceptadas en `pnpm.auditConfig.ignoreGhsas` (`zod`, `glob`, `minimatch`, `deepmerge`; arreglarlas exige salto de versión mayor dentro de `@expo/cli` o no hay parche). **Reevaluar al actualizar Expo.**

**Lo que debe saber la semana 5:**
- **Zustand = estado de CLIENTE** (tanque, favoritos). El catálogo de peces del servidor irá en **TanStack Query**; no meter la lista de peces en Zustand.
- `src/data/peces.ts` y `buscarPezPorId` son datos locales: al llegar la API, `DetallePezScreen` y `MiTanqueScreen` deberán resolver el pez desde la caché de la query (el store sigue guardando solo ids, así que no cambia).
- Si cambia la forma de lo persistido, **subir `version` en `persist` y escribir `migrate`**.
- Axios: usar la versión parcheada más reciente (verificar con `pnpm audit`, **no** la 1.18.1).
- `HomeScreen` no cambió en esta semana; `PezCard` ahora incluye `BotonFavorito` (lee el store por sí mismo).

**Verificación hecha:** `pnpm install --frozen-lockfile` OK; `pnpm typecheck` 0 errores; `pnpm seguridad` OK (con las excepciones documentadas); `CI=1 npx expo export --platform android` compila (`dist` borrado); lógica del store probada con un AsyncStorage simulado (agregar sin duplicar, quitar, favoritos, persistencia, `partialize`, rehidratación). **Pendiente:** confirmación visual del usuario en Expo Go (SDK 57) y `git push` + cascada.
