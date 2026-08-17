import { APP_KEYS, SANKIWORK_SIDECAR_CONTRACT } from "@sankiwork/sidecar-proto";
import { bootstrapSidecarRuntime } from "@sankiwork/sidecar";
import { readProcessStamp } from "@sankiwork/platform";

import { startWebSidecar } from "./server.js";

async function main(): Promise<void> {
  const stamp = readProcessStamp(process.argv.slice(2), SANKIWORK_SIDECAR_CONTRACT);
  if (stamp == null) throw new Error("sidecar stamp is required");

  const runtime = bootstrapSidecarRuntime(stamp, process.env, {
    app: APP_KEYS.WEB,
    contract: SANKIWORK_SIDECAR_CONTRACT,
  });
  const server = await startWebSidecar(runtime);

  process.stdout.write(`${JSON.stringify(await server.status(), null, 2)}\n`);
  await server.waitUntilStopped();
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
