# packages/AGENTS.md

Follow the root `AGENTS.md` first. This file only records module-level boundaries for `packages/`.

## Package responsibilities

- `packages/agui-adapter`: pure TypeScript adapter between persisted SankiWork agent/GenUI/plugin-pipeline events and the AG-UI event protocol. Keep transport and filesystem concerns out; daemon producers and web/CopilotKit consumers share this conversion boundary.
- `packages/contracts`: web/daemon app contract layer. Keep it pure TypeScript; it must not depend on Next.js, Express, Node filesystem/process APIs, browser APIs, SQLite, daemon internals, or the sidecar control-plane protocol.
- `packages/components`: shared React UI primitives and primitive CSS. It may depend on React types/runtime only; keep product workflows and app-specific layout/styling in the apps.
- `packages/diagnostics`: shared diagnostics export primitives for log collection, redaction, manifests, crash-report discovery, and zip packaging used by daemon and desktop.
- `packages/download`: managed-download runtime. Owns resumable and checksum-verified transfers, concurrent-request deduplication, target locking, inspection/removal, copy-and-clear, and pruning; callers supply the download identity and storage base.
- `packages/host`: web/desktop host bridge contract. It models renderer-facing host capabilities and helpers while keeping `window.__sankiwork__` access out of app UI code.
- `packages/launcher-proto`: launcher protocol and path/state primitives. Owns channel/version/namespace validation, launcher directory derivation, runtime and cleanup descriptors, target selection, and after-quit argument parsing without owning launcher process orchestration.
- `packages/metatool`: internal metadata helpers for repo-local tool build outputs. Keep reusable hash/check/write mechanics here; each concrete tool owns its own `meta.json`.
- `packages/plugin-runtime`: pure TypeScript plugin manifest/marketplace parsers, source adapters, merge/ref resolution, validation, digesting, and pipeline-fallback selection. Daemon, web, and CI inject I/O rather than adding filesystem access here.
- `packages/registry-protocol`: pure TypeScript plugin-registry backend protocol and schemas. Owns backend list/search/resolve/manifest/doctor plus optional publish/yank interfaces, not concrete network or storage integrations.
- `packages/release`: pure release-domain primitives. Owns release channel names, version parsing/formatting, metadata field derivation, storage prefixes, release namespaces, and app identity data. It must not read/write files, call GitHub/R2, spawn build tools, or own workflow execution.
- `packages/sidecar-proto`: SankiWork sidecar business protocol. Owns app/mode/source constants, namespace validation, stamp descriptor/fields/flags, IPC message schema, status shapes, error semantics, and default product path constants.
- `packages/sidecar`: generic sidecar runtime primitives. Includes bootstrap, IPC transport, path/runtime resolution, launch env, and JSON runtime file helpers; it must not hard-code SankiWork app keys or IPC business messages.
- `packages/platform`: generic OS process primitives. Includes stamp serialization, command parsing, process matching/search, and well-known user-toolchain bin discovery; it must consume the `sidecar-proto` descriptor and must not hard-code `--od-stamp-*` details. The toolchain helper is the single source of truth shared by the daemon runtime executable resolver (`apps/daemon/src/runtimes/executables.ts`) and the packaged sidecar PATH builder (`apps/packaged/src/sidecars.ts`) so neither layer can drift the search list.

## Removed directories

- `packages/shared` has been removed; do not restore it.
- For new shared types, choose the boundary first: web/daemon app DTOs go in `contracts`; sidecar control-plane protocol goes in `sidecar-proto`; generic runtime code goes in `sidecar`; generic OS/process code goes in `platform`.

## Boundary checklist

- Package tests live in each package's `tests/` directory, sibling to `src/`; keep `src/` source-only and do not add new `*.test.ts` or `*.test.tsx` files under `src/`.
- Keep cross-runtime DTO and plugin wire-shape validation schemas in `contracts` when callers need the same runtime parser, while keeping app-specific parsing, I/O, and enforcement in the owning app or package.
- Do not let app packages depend directly on sidecar control-plane details.
- Do not hard-code SankiWork app/source/mode constants in `sidecar` or `platform`.
- Keep stamp fields limited to five: `app`, `mode`, `namespace`, `ipc`, and `source`.

## Common package commands

```bash
pnpm --filter @sankiwork/agui-adapter typecheck
pnpm --filter @sankiwork/agui-adapter test
pnpm --filter @sankiwork/contracts typecheck
pnpm --filter @sankiwork/diagnostics typecheck
pnpm --filter @sankiwork/diagnostics test
pnpm --filter @sankiwork/download typecheck
pnpm --filter @sankiwork/download test
pnpm --filter @sankiwork/host typecheck
pnpm --filter @sankiwork/host test
pnpm --filter @sankiwork/launcher-proto typecheck
pnpm --filter @sankiwork/launcher-proto test
pnpm --filter @sankiwork/metatool typecheck
pnpm --filter @sankiwork/metatool test
pnpm --filter @sankiwork/plugin-runtime typecheck
pnpm --filter @sankiwork/plugin-runtime test
pnpm --filter @sankiwork/registry-protocol typecheck
pnpm --filter @sankiwork/registry-protocol test
pnpm --filter @sankiwork/release typecheck
pnpm --filter @sankiwork/release test
pnpm --filter @sankiwork/sidecar-proto typecheck
pnpm --filter @sankiwork/sidecar-proto test
pnpm --filter @sankiwork/sidecar typecheck
pnpm --filter @sankiwork/sidecar test
pnpm --filter @sankiwork/platform typecheck
pnpm --filter @sankiwork/platform test
```
