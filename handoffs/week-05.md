# Handoff — Semana 05: Networking y TanStack Query v5

> Documento para **otro Claude sin memoria de la conversación anterior**. Léelo completo antes de tocar código. Rama de trabajo: `week-05`.

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
Parte de `week-04`.
```bash
git clone https://github.com/8damara8/Juan-Felipe-Maradey-Navarro.git && cd Juan-Felipe-Maradey-Navarro
git checkout week-05
corepack enable && pnpm install --frozen-lockfile
```

## 2. Objetivo de la semana (en el acuario)
Obtener el catálogo de peces desde una API con Axios + `useQuery`, y crear/eliminar con `useMutation` e invalidación de caché. Estados de carga, error y vacío, y pull-to-refresh con `refetch`.
Teoría de referencia (solo lectura): `bootcamp/week-05-*/1-teoria/` y `3-proyecto/README.md` en https://github.com/ergrato-dev/bc-reactnative.

## 3. Pasos (un commit por paso)
1. Elegir fuente de datos: busca una API pública gratuita y SIN llave que sirva datos de peces; **verifícala con `curl` antes de usarla**. Si no hay una fiable, crea una capa `src/api/` con datos mock y `setTimeout` que simule red y mantenga la MISMA interfaz que usaría Axios (así se cambia luego por una API real).
2. Crear `src/api/client.ts`: instancia Axios (`baseURL` desde `process.env.EXPO_PUBLIC_API_URL`, timeout, interceptor de errores).
3. Crear `src/api/peces.ts` con funciones tipadas (`obtenerPeces`, `crearPez`, `eliminarPez`) y validación mínima de la respuesta.
4. Crear `QueryClientProvider` en `App.tsx` y el hook `src/hooks/usePeces.ts` con `useQuery`.
5. Pantalla de lista: estados `isPending` (spinner), `isError` (mensaje + botón reintentar), vacío; pull-to-refresh con `refetch`.
6. `useMutation` para crear y eliminar peces con `invalidateQueries`.

## 4. Dependencias
- `axios`: versión parcheada más reciente (**≥ 1.20.0**; NO 1.18.1). Verificar con `pnpm audit`.
- `@tanstack/react-query` **5.101.2**.

## 5. Trampas y restricciones de esta semana
- Prohibido guardar datos del servidor en Zustand y prohibido `as any`.
- Si usas una API real, no envíes datos personales; no pongas llaves en el repo.

## 6. Criterios de salida
- [ ] La verificación obligatoria de la sección 0 pasa completa.
- [ ] El usuario confirmó que funciona en Expo Go (SDK 57).
- [ ] Comentarios simples en español en el código nuevo; sin `any`.
- [ ] `pnpm-lock.yaml` y `package.json` actualizados y con versiones exactas.
- [ ] No se subió nada de `2-practicas/` ni de los starters del instructor.

## 7. Cierre de la semana (git)
```bash
git status                       # nada sin commitear
git push -u origin week-05
```

### Cascada (mantener las ramas apiladas)
Después del push, propaga tu trabajo a las ramas siguientes con merges (no reescribe historia):
```bash
prev=week-05
for b in $(seq -f "week-%02g" 6 18); do
  git checkout "$b" && git merge --no-edit "$prev" || break
  prev="$b"
done
git checkout week-05
```
Si hay conflicto, resuélvelo, `git commit` y repite el bucle desde esa rama. Luego `git push origin --all` (nunca `--force`).

## 8. Siguiente sesión
Cuando el usuario confirme que la semana funciona, dile que abra una **sesión nueva** de Claude con este mensaje:
> «Lee `handoffs/week-06.md` en la rama `week-06` del repo https://github.com/8damara8/Juan-Felipe-Maradey-Navarro y ejecútalo.»

## 9. Notas para la siguiente semana
- **Servidor simulado en vez de API real.** No pude verificar ninguna API pública de peces que permita crear/borrar con estos campos, así que se usó el plan B: un adaptador de Axios (`src/api/simulacion/`) que responde como un servidor (GET/POST `/peces`, DELETE `/peces/:id`, latencia 700 ms, errores 404/409/422). Axios y los interceptores son reales. Los datos viven en memoria: **se reinician al cerrar la app**.
- **Variables de entorno** (todas públicas): `EXPO_PUBLIC_API_URL` (si existe, se usa una API real y no el simulador) y `EXPO_PUBLIC_SIMULAR_ERROR=true` (fuerza error de red para probar la pantalla de error y «Reintentar»).
- **DTO vs dominio.** `PezApi` (lo que llega del servidor, `imagen` es texto) se convierte a `Pez` en `aPez`. `resolverImagen` (`src/data/imagenes.ts`) traduce la clave a `require(...)`, acepta URLs http(s) y cae en `generico.png` si no conoce la clave. `src/data/peces.ts` se eliminó; la semilla está en `src/api/simulacion/semilla.ts`.
- **Estado del servidor fuera de Zustand.** El store solo guarda ids. `usePeces` y `usePez(id)` comparten la misma `queryKey` (`['peces']`); el detalle usa `select`, sin segunda petición. `buscarPezPorId` ya no se usa en las pantallas.
- **Mutaciones.** `useCrearPez` y `useEliminarPez` invalidan `['peces']`. Al eliminar, también se limpia el pez del tanque y de favoritos (evita ids huérfanos), y la invalidación no se espera (`await`) para no mostrar un instante «No encontramos este pez».
- **Pantalla nueva** `NuevoPez` (stack de Peces, botón «＋ Nuevo» en la lista) con validación manual simple (`src/utils/validarFormulario.ts`). **La semana 6 debe reemplazarla** por el formulario con Zod + react-hook-form y reutilizarla para editar (usa `useCrearPez`; falta crear `useEditarPez` y la ruta PUT/PATCH en el adaptador).
- **Versiones:** `axios` 1.21.0 (el 1.18.1 del instructor es vulnerable) y `@tanstack/react-query` 5.101.2, ambas exactas. `queryClient`: `retry: 1`, `staleTime: 30 s`.
- Pull-to-refresh de la lista usa `refetch` + `isRefetching`.
- El repo se llama ahora `Aqua-Project` (este texto aún cita el nombre antiguo). Las correcciones de la semana 4 se aplicaron directamente en `week-04`.
- Pendiente de prueba visual en Expo Go por parte del usuario.
