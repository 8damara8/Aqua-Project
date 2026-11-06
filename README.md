# Acuario — App móvil (React Native + Expo SDK 57)

App de un **acuario** construida paso a paso, una rama por semana (`week-01` … `week-18`).
Cada rama parte de la anterior. `main` está vacío a propósito.

## Requisitos
- Node.js 22+
- pnpm **10.34.7** (fijo, verificado con hash): `corepack enable` y listo
- Expo Go **SDK 57** en el celular

## Ejecutar
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm start        # escanear el QR con Expo Go
pnpm typecheck    # verificar TypeScript
pnpm seguridad    # auditoría de dependencias
```

## Qué tiene la app hasta ahora
- **Semana 1:** tarjetas de peces con `View`, `Text`, `Image`, `Pressable` y Flexbox.
- **Semana 2:** catálogo de 12 peces con `FlatList` y `SectionList` (agrupado por tipo de agua),
  buscador en tiempo real (sin tildes ni mayúsculas), chips de filtro, pull-to-refresh,
  manejo del teclado y tema reutilizable (`colors`, `spacing`, `typography`).
- **Semana 3:** React Navigation 7. Barra de pestañas (**Peces** · **Mi Tanque**) con íconos, y un
  Stack anidado en «Peces» (Lista → Detalle del pez) con params tipados y header con el tema.
- **Semana 4:** estado global con **Zustand**. Un solo store (`useAcuarioStore`) hecho con *slices*
  (tanque + favoritos) que se guarda en el celular con `persist` y `AsyncStorage`.
  Desde la ficha se agrega/quita un pez del tanque, el corazón marca favoritos, la pestaña
  «Mi Tanque» lista ambos grupos y muestra un **badge** con la cantidad de peces en tiempo real.

## Estructura de `src/`
```
components/   un componente por archivo (PezCard, BuscadorPeces, ChipsFiltro, ...)
data/         datos de ejemplo (peces.ts)
navigation/   AppNavigator (tabs + badge), PecesStack, tipos de params y tema de navegación
screens/      pantallas (HomeScreen, DetallePezScreen, MiTanqueScreen)
store/        useAcuarioStore (index.ts), slices (tanque, favoritos) y sus tipos
theme/        colors.ts, spacing.ts, typography.ts
types/        tipos de TypeScript (Pez, TipoAgua, ...)
utils/        funciones pequeñas (normalizarTexto, cerrarTeclado)
```

## Cómo funciona el store (semana 4)
```ts
// Siempre con selector: el componente solo se redibuja si CAMBIA lo que pide
const enTanque = useAcuarioStore((estado) => estado.idsTanque.includes(pezId));
const agregarPez = useAcuarioStore((estado) => estado.agregarPez);
```
- Se guardan solo **ids** (`idsTanque`, `idsFavoritos`); el pez completo se busca con `buscarPezPorId`.
- `partialize` deja fuera `hidratado`, un dato volátil que indica si ya se leyó lo guardado.
- `onRehydrateStorage` marca `hidratado = true` al terminar de leer, y `App.tsx` no monta el
  navegador (muestra `PantallaCarga`) hasta entonces, para que ningún toque se pierda en el arranque.

## Seguridad
- Versiones exactas (sin `^` ni `~`) y `pnpm-lock.yaml` versionado.
- `.npmrc`: `minimum-release-age=1440` (no instala paquetes de menos de 24 h).
- `pnpm.overrides`: `node-forge` fijado en **1.4.2** (corrige los avisos de `@expo/cli`; la 1.4.0 era vulnerable).
- Excepciones aceptadas (`pnpm.auditConfig.ignoreGhsas`): `zod`, `glob`, `minimatch` y `deepmerge` **dentro de `@expo/cli` / `@expo/config`**
  (herramientas de desarrollo; no van en el bundle de la app). Arreglarlas exige saltar de versión mayor dentro del CLI de Expo
  o aún no hay parche. **Revisar al actualizar Expo** y quitar cada GHSA cuando se pueda.
- `pnpm seguridad` debe terminar sin errores antes de cada entrega.
