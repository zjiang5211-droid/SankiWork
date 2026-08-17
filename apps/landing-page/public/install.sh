#!/usr/bin/env sh
# SankiWork MCP installer wrapper.
#
# This file is served verbatim by the static landing page at:
#   https://sanki-ai.cloud/install.sh
#
# It intentionally delegates to the product-owned installer:
#   sw mcp install <agent>
#
# Keeping the real installer in the daemon avoids duplicating the per-agent
# config planner in a hosted shell script. This wrapper exists so curl|sh no
# longer receives the landing-page HTML fallback, and so users get a clear
# error when the shell resolves /usr/bin/od or another non-SankiWork binary.

set -eu

usage() {
  cat <<'EOF'
SankiWork MCP installer

Usage:
  curl -fsSL https://sanki-ai.cloud/install.sh | sh -s <agent> [options]

This is a thin hosted wrapper around:
  sw mcp install <agent> [options]

Examples:
  curl -fsSL https://sanki-ai.cloud/install.sh | sh -s codex --print
  curl -fsSL https://sanki-ai.cloud/install.sh | sh -s cursor --write-config

Options are forwarded to `sw mcp install`. For the complete option list:
  sw mcp install --help
EOF
}

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  usage
  exit 0
fi

if [ "$#" -eq 0 ]; then
  printf '%s\n\n' "SankiWork install.sh: missing required <agent> argument." >&2
  usage >&2
  exit 2
fi

if ! command -v sw >/dev/null 2>&1; then
  cat >&2 <<'EOF'
SankiWork install.sh: `sw` was not found on PATH.

Install and open the SankiWork desktop app, or run the daemon from a source
checkout so the SankiWork CLI is available, then re-run this command.
EOF
  exit 1
fi

sw_probe="$(sw mcp install --sankiwork-cli-probe 2>/dev/null || true)"
if [ "${sw_probe}" != "sankiwork-cli:mcp-install:v1" ]; then
  sw_path="$(command -v sw || true)"
  cat >&2 <<EOF
SankiWork install.sh: '${sw_path}' does not look like the SankiWork CLI.

On macOS, Linux, and WSL2, /usr/bin/od is the system octal-dump command and can
shadow SankiWork's CLI. Put the SankiWork CLI earlier on PATH, then re-run
this command.

If you installed the macOS desktop app via the DMG or Homebrew cask, the app
bundle does not add an 'od' shim to your shell PATH. Launch SankiWork and use
Settings -> MCP server to copy the client-specific install snippet instead;
that snippet uses absolute paths and avoids the system 'od' collision.
EOF
  exit 1
fi

exec sw mcp install "$@"
