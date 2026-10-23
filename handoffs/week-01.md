# Handoff — Semana 01: Core Components y Flexbox

> Documento para **otro Claude sin memoria de la conversación anterior**. Léelo completo antes de tocar código. Rama de trabajo: `week-01`.

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
**HECHA por Claude en la sesión inicial.** Esta semana solo hay que verificar, probar en Expo Go y cerrar.
```bash
git clone https://github.com/8damara8/Juan-Felipe-Maradey-Navarro.git && cd Juan-Felipe-Maradey-Navarro
git checkout week-01
corepack enable && pnpm install --frozen-lockfile
```

## 2. Objetivo de la semana (en el acuario)
Pantalla única con tarjetas de peces usando `View`, `Text`, `Image`, `ScrollView`, `Pressable` y Flexbox. Header con el nombre del dominio, mínimo 3 tarjetas (hay 4), imagen local, textos con estilos distintos y botón con feedback visual.
Teoría de referencia (solo lectura): `bootcamp/week-01-*/1-teoria/` y `3-proyecto/README.md` en https://github.com/ergrato-dev/bc-reactnative.

## 3. Pasos (un commit por paso)
1. (hecho) Base: `package.json` con pnpm 10.34.7+hash, `.npmrc`, `tsconfig` sin `baseUrl`, `app.json` sin `sdkVersion`, `index.ts` como entrada.
2. (hecho) Tipos y datos: `src/types/index.ts` (`Pez`), `src/data/peces.ts` (4 peces), imágenes locales en `assets/peces/`.
3. (hecho) `src/theme/colors.ts`, `src/components/PezCard.tsx`, `src/screens/HomeScreen.tsx`, `App.tsx`.
4. (pendiente) El usuario ejecuta `pnpm start`, abre Expo Go (SDK 57) y confirma que ve las 4 tarjetas y el botón «Ver ficha» (Alert).
5. (pendiente) El usuario toma una captura/grabación (entregable del instructor).

## 4. Dependencias
- Ya instaladas: `expo 57.0.4`, `expo-status-bar 57.0.0`, `react 19.2.3`, `react-native 0.86.0`, `react-native-safe-area-context 5.7.0`, dev: `typescript 6.0.3`, `@types/react 19.2.17`, `@babel/core 7.29.7`.

## 5. Trampas y restricciones de esta semana
- Restricciones del instructor para esta semana: sin `position: 'absolute'`, sin librerías de UI, sin estilos inline.
- `react-native-safe-area-context` se usa solo para el área segura (lo necesitará React Navigation en la semana 3).

## 6. Criterios de salida
- [ ] La verificación obligatoria de la sección 0 pasa completa.
- [ ] El usuario confirmó que funciona en Expo Go (SDK 57).
- [ ] Comentarios simples en español en el código nuevo; sin `any`.
- [ ] `pnpm-lock.yaml` y `package.json` actualizados y con versiones exactas.
- [ ] No se subió nada de `2-practicas/` ni de los starters del instructor.

## 7. Cierre de la semana (git)
```bash
git status                       # nada sin commitear
git push -u origin week-01
```

### Cascada (mantener las ramas apiladas)
Después del push, propaga tu trabajo a las ramas siguientes con merges (no reescribe historia):
```bash
prev=week-01
for b in $(seq -f "week-%02g" 2 18); do
  git checkout "$b" && git merge --no-edit "$prev" || break
  prev="$b"
done
git checkout week-01
```
Si hay conflicto, resuélvelo, `git commit` y repite el bucle desde esa rama. Luego `git push origin --all` (nunca `--force`).

## 8. Siguiente sesión
Cuando el usuario confirme que la semana funciona, dile que abra una **sesión nueva** de Claude con este mensaje:
> «Lee `handoffs/week-02.md` en la rama `week-02` del repo https://github.com/8damara8/Juan-Felipe-Maradey-Navarro y ejecútalo.»

## 9. Notas para la siguiente semana
Las imágenes de `assets/peces/` son ilustraciones simples generadas con Python/PIL. El usuario puede reemplazarlas por fotos reales manteniendo los nombres de archivo.
