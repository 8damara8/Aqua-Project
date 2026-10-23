# Handoff — Semana 02: Listas, Inputs y Estilos

> Documento para **otro Claude sin memoria de la conversación anterior**. Léelo completo antes de tocar código. Rama de trabajo: `week-02`.

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
Parte de `week-01` (app con 4 tarjetas en `ScrollView`).
```bash
git clone https://github.com/8damara8/Juan-Felipe-Maradey-Navarro.git && cd Juan-Felipe-Maradey-Navarro
git checkout week-02
corepack enable && pnpm install --frozen-lockfile
```

## 2. Objetivo de la semana (en el acuario)
Convertir la lista en una lista real y buscable: `FlatList`, `SectionList` (agrupar por tipo de agua), `TextInput` con búsqueda en tiempo real, pull-to-refresh, separadores, manejo de teclado y un sistema de tema reutilizable.
Teoría de referencia (solo lectura): `bootcamp/week-02-*/1-teoria/` y `3-proyecto/README.md` en https://github.com/ergrato-dev/bc-reactnative.

## 3. Pasos (un commit por paso)
1. Ampliar `src/data/peces.ts` a **mínimo 12 peces** (reutiliza las 4 imágenes locales o añade nuevas en `assets/peces/`).
2. Reemplazar `ScrollView` por `FlatList` (`keyExtractor`, `ItemSeparatorComponent`, `ListEmptyComponent`).
3. Añadir `RefreshControl` (pull-to-refresh simulado con `setTimeout`).
4. Crear `src/components/BuscadorPeces.tsx` con `TextInput` (búsqueda por nombre/nombre científico, insensible a mayúsculas y tildes) filtrando la lista en tiempo real con `useMemo`.
5. Envolver en `KeyboardAvoidingView` y cerrar teclado con `Keyboard.dismiss()` al desplazar (`keyboardShouldPersistTaps`).
6. Crear una segunda vista/sección con `SectionList` agrupando por `tipoAgua` (dulce/salada) con encabezados de sección.
7. Ampliar `src/theme/` con `spacing.ts` y `typography.ts` y usarlos en los componentes; estilos dinámicos con arrays (p. ej. chip de filtro activo: «Todos / Dulce / Salada»).

## 4. Dependencias
- No se necesitan dependencias nuevas.

## 5. Trampas y restricciones de esta semana
- No usar `ScrollView` + `map` para listas dinámicas.
- Teoría de referencia: `week-02-listas_inputs_y_estilos/1-teoria/`.

## 6. Criterios de salida
- [ ] La verificación obligatoria de la sección 0 pasa completa.
- [ ] El usuario confirmó que funciona en Expo Go (SDK 57).
- [ ] Comentarios simples en español en el código nuevo; sin `any`.
- [ ] `pnpm-lock.yaml` y `package.json` actualizados y con versiones exactas.
- [ ] No se subió nada de `2-practicas/` ni de los starters del instructor.

## 7. Cierre de la semana (git)
```bash
git status                       # nada sin commitear
git push -u origin week-02
```

### Cascada (mantener las ramas apiladas)
Después del push, propaga tu trabajo a las ramas siguientes con merges (no reescribe historia):
```bash
prev=week-02
for b in $(seq -f "week-%02g" 3 18); do
  git checkout "$b" && git merge --no-edit "$prev" || break
  prev="$b"
done
git checkout week-02
```
Si hay conflicto, resuélvelo, `git commit` y repite el bucle desde esa rama. Luego `git push origin --all` (nunca `--force`).

## 8. Siguiente sesión
Cuando el usuario confirme que la semana funciona, dile que abra una **sesión nueva** de Claude con este mensaje:
> «Lee `handoffs/week-03.md` en la rama `week-03` del repo https://github.com/8damara8/Juan-Felipe-Maradey-Navarro y ejecútalo.»

## 9. Notas para la siguiente semana
_(la persona que cierre esta semana completa esto: qué se omitió, qué se adaptó, qué debe saber la semana siguiente)_
