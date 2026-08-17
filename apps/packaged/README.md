# apps/packaged

Thin packaged Electron runtime entry for SankiWork.

This package starts the packaged daemon and web sidecars, registers the `sankiwork://`
entry protocol, and then delegates to `@sankiwork/desktop/main` for the host
window. Product logic stays in `apps/daemon`, `apps/web`, and `apps/desktop`.
