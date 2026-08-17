import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SANKIWORK_SIDECAR_CONTRACT,
  SIDECAR_DEFAULTS,
} from "@sankiwork/sidecar-proto";

import {
  PACKAGED_NAMESPACE_ENV,
  resolvePackagedAmrProfile,
  type PackagedConfig,
} from "./config.js";
import {
  parsePackagedHeadlessRequest,
  runPackagedHeadless,
} from "./headless-runtime.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function resolveHeadlessNamespaceBaseRoot(): string {
  const odDataDir = process.env.SW_DATA_DIR;
  if (odDataDir != null && odDataDir.length > 0) {
    return join(resolve(odDataDir.replace(/^~/, homedir())), "namespaces");
  }
  const xdgDataHome = process.env.XDG_DATA_HOME;
  const dataBase =
    xdgDataHome != null && xdgDataHome.length > 0
      ? xdgDataHome
      : join(homedir(), ".local", "share");
  return join(dataBase, "sankiwork", "namespaces");
}

function resolveHeadlessAmrProfile(): PackagedConfig["amrProfile"] {
  return resolvePackagedAmrProfile(process.env.SANKIWORK_AMR_PROFILE);
}

function resolveHeadlessConfig(): PackagedConfig {
  const namespace = SANKIWORK_SIDECAR_CONTRACT.normalizeNamespace(
    process.env[PACKAGED_NAMESPACE_ENV] ?? SIDECAR_DEFAULTS.namespace,
  );
  const namespaceBaseRoot = resolveHeadlessNamespaceBaseRoot();

  // SW_RESOURCE_ROOT may be set by a launcher script; otherwise default to a
  // sibling sankiwork/ directory relative to the node_modules that contain
  // this file — the layout written by tools-pack linux headless-install.
  const resourceRoot =
    process.env.SW_RESOURCE_ROOT
    ?? join(__dirname, "..", "..", "..", "sankiwork");

  return {
    amrProfile: resolveHeadlessAmrProfile(),
    appVersion: null,
    daemonCliEntry: null,
    daemonSidecarEntry: null,
    namespace,
    namespaceBaseRoot,
    nodeCommand: null,
    resourceRoot,
    telemetryRelayUrl:
      process.env.SANKIWORK_TELEMETRY_RELAY_URL?.trim() || null,
    updateMetadataUrl: process.env.SW_UPDATE_METADATA_URL?.trim() || null,
    posthogKey: process.env.POSTHOG_KEY?.trim() || null,
    posthogHost: process.env.POSTHOG_HOST?.trim() || null,
    velaWebUrl: process.env.SW_VELA_WEB_URL?.trim() || null,
    webSidecarEntry: null,
    webStandaloneRoot: null,
    webOutputMode: "server",
  };
}

const headlessRequest = parsePackagedHeadlessRequest([
  "--headless",
  ...process.argv.slice(2),
]);

void runPackagedHeadless(
  resolveHeadlessConfig(),
  headlessRequest,
  {
    mcpBootstrapLaunch: {
      command: process.execPath,
      args: [fileURLToPath(import.meta.url), "--headless"],
    },
  },
).catch((error: unknown) => {
  process.stderr.write(
    `sankiwork headless failed: ${
      error instanceof Error ? error.message : String(error)
    }\n`,
  );
  process.exit(1);
});
