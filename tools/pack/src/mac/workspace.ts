import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { ToolPackCache } from "../cache.js";
import type { ToolPackConfig } from "../config.js";
import { processWebSourcemaps } from "../web-sourcemaps.js";
import { ensureWorkspaceBuildArtifacts } from "../workspace-build.js";
import { runPnpm } from "./commands.js";

async function buildWorkspaceArtifacts(config: ToolPackConfig): Promise<void> {
  const webNextEnvPath = join(config.workspaceRoot, "apps", "web", "next-env.d.ts");
  const previousWebNextEnv = await readFile(webNextEnvPath, "utf8").catch(() => null);

  await runPnpm(config, ["--filter", "@sankiwork/contracts", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/registry-protocol", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/sidecar-proto", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/launcher-proto", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/sidecar", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/platform", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/agui-adapter", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/plugin-runtime", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/download", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/host", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/diagnostics", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/dsh-runtime", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/components", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/daemon", "build"]);
  try {
    await runPnpm(config, ["--filter", "@sankiwork/web", "build"], {
      SW_WEB_OUTPUT_MODE: config.webOutputMode,
    });
    await runPnpm(config, ["--filter", "@sankiwork/web", "build:sidecar"]);
    // Inject chunk IDs + upload browser sourcemaps to PostHog, then strip
    // .map files. Runs before any packaging step copies the web output into
    // the Electron resources so .map never ends up inside the .app bundle.
    await processWebSourcemaps(config);
  } finally {
    if (previousWebNextEnv == null) {
      await rm(webNextEnvPath, { force: true });
    } else {
      await writeFile(webNextEnvPath, previousWebNextEnv, "utf8");
    }
  }
  await runPnpm(config, ["--filter", "@sankiwork/desktop", "build"]);
  await runPnpm(config, ["--filter", "@sankiwork/packaged", "build"]);
}

export async function ensureMacWorkspaceBuild(config: ToolPackConfig, cache: ToolPackCache): Promise<void> {
  await ensureWorkspaceBuildArtifacts(config, cache, async () => {
    await buildWorkspaceArtifacts(config);
  });
}
