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

## Estructura de `src/`
```
components/   un componente por archivo (PezCard, BuscadorPeces, ChipsFiltro, ...)
data/         datos de ejemplo (peces.ts)
screens/      pantallas (HomeScreen)
theme/        colors.ts, spacing.ts, typography.ts
types/        tipos de TypeScript (Pez, TipoAgua, ...)
utils/        funciones pequeñas (normalizarTexto, cerrarTeclado)
```

## Seguridad
- Versiones exactas (sin `^` ni `~`) y `pnpm-lock.yaml` versionado.
- `.npmrc`: `minimum-release-age=1440` (no instala paquetes de menos de 24 h).
- Excepción conocida: `GHSA-86w9-cpqp-85rv` (`node-forge`, dependencia de desarrollo del CLI de Expo, sin versión corregida publicada). Revisar al actualizar Expo.
