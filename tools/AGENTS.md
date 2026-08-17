# tools/AGENTS.md

Follow the root `AGENTS.md` first. This file only records module-level boundaries for `tools/`.

## Active tools

- `tools/dev` provides `@sankiwork/tools-dev` and the `tools-dev` bin. It is the only currently active local development lifecycle control plane.
- `pnpm tools-dev` manages daemon -> web -> desktop.
- `pnpm tools-dev run web` runs foreground daemon + web for the Playwright webServer flow.
- `pnpm tools-dev inspect desktop ...` inspects the desktop runtime through sidecar IPC.
- `tools/pack` provides `@sankiwork/tools-pack` and the `tools-pack` bin. The active slice is packaged artifact build/install/start/stop/logs/uninstall/cleanup/list/reset plus beta release artifact preparation for mac and Windows lanes, plus a Linux AppImage lane with optional containerized builds.
- `tools/serve` provides `@sankiwork/tools-serve` and the `tools-serve` bin. It owns local fixture services such as `tools-serve start updater`.
- `tools/release` provides `@sankiwork/tools-release` and the `tools-release` bin. It owns release metadata, storage publishing, release reports, and notification-facing file/data contracts; artifact build, cache, installer, payload, and smoke work stays in `tools/pack`.

## Retired tools

- `tools/pr` / `@sankiwork/tools-pr` / `pnpm tools-pr` has been retired from this repository. Maintainer PR-duty workflows now live outside the product workspace in `PerishCode/duty`; do not restore an SankiWork-local PR-duty tool without a new explicit maintainer decision.

## Packaging scope

- Keep `tools-pack` focused on packaging/runtime control, release artifact preparation, and the packaged-updater acceptance harness. The updater product surface and launcher handoff live in `apps/desktop` and `apps/packaged`; do not duplicate that application logic in the tool.
- Pack-specific Electron builder resources belong under `tools/pack/resources/`; do not reference app/docs/download assets directly from pack logic.
- Namespace controls packaged data/log/runtime/cache paths. Ports are transient transport details and must not participate in path decisions.
- There is no root `pnpm build` aggregate. Use package-scoped builds for source packages and `pnpm tools-pack ...` for packaged artifact build/install/release flows.

## Orchestration boundary

- Tool tests live in each tool's `tests/` directory, sibling to `src/`; keep `src/` source-only and do not add new `*.test.ts` or `*.test.tsx` files under `src/`.
- Orchestration layers must consume primitives from `@sankiwork/sidecar-proto`, `@sankiwork/sidecar`, and `@sankiwork/platform`.
- Do not hand-build `--od-stamp-*` args, process-scan regexes, runtime tokens, process roles, or duplicate namespace/source args in `tools/dev`, future `tools/pack`, or packaged launchers.
- Port flags are authoritative inputs: `--daemon-port` and `--web-port`. Internal env vars are `SW_PORT` and `SW_WEB_PORT`; do not introduce `NEXT_PORT`.

## Common tools commands

```bash
pnpm --filter @sankiwork/tools-dev typecheck
pnpm --filter @sankiwork/tools-dev build
pnpm --filter @sankiwork/tools-pack typecheck
pnpm --filter @sankiwork/tools-pack build
pnpm --filter @sankiwork/tools-serve typecheck
pnpm --filter @sankiwork/tools-serve build
pnpm --filter @sankiwork/tools-release typecheck
pnpm --filter @sankiwork/tools-release build
pnpm --filter @sankiwork/tools-release test
pnpm tools-dev status --json
pnpm tools-dev logs --json
pnpm tools-dev check
pnpm tools-pack mac build --to all
pnpm tools-pack mac install
pnpm tools-pack mac cleanup
pnpm tools-pack win build --to nsis
pnpm tools-pack win install
pnpm tools-pack win inspect --expr "document.title"
pnpm tools-pack win cleanup
pnpm tools-pack linux build --to appimage
pnpm tools-pack linux install
pnpm tools-pack linux install --headless
pnpm tools-pack linux start --headless
pnpm tools-pack linux stop --headless
pnpm tools-pack linux build --containerized
pnpm tools-serve start updater
```
