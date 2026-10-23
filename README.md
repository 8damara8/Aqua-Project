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

## Seguridad
- Versiones exactas (sin `^` ni `~`) y `pnpm-lock.yaml` versionado.
- `.npmrc`: `minimum-release-age=1440` (no instala paquetes de menos de 24 h).
- Excepción conocida: `GHSA-86w9-cpqp-85rv` (`node-forge`, dependencia de desarrollo del CLI de Expo, sin versión corregida publicada). Revisar al actualizar Expo.
