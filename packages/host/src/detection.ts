import {
  SANKIWORK_HOST_GLOBAL,
  SANKIWORK_HOST_VERSION,
  SANKIWORK_HOST_CLIENT_TYPES,
  type SankiWorkHostBridge,
  type SankiWorkHostClientType,
  type SankiWorkHostGlobalScope,
} from "./protocol.js";

/**
 * @module detection
 *
 * Locates the host bridge on a global scope and structurally validates it.
 * Owns the {@link isSankiWorkHostBridge} type guard plus the scope-lookup
 * helpers used by every renderer-facing accessor.
 */

/** @internal Narrow an unknown value to a plain record. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value != null && !Array.isArray(value);
}

/** @internal True when `record[key]` is a function. */
function hasFunction(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === "function";
}

/**
 * Structural type guard for a fully-formed {@link SankiWorkHostBridge}: checks
 * version, client type, and the presence of every required capability method.
 */
export function isSankiWorkHostBridge(value: unknown): value is SankiWorkHostBridge {
  if (!isRecord(value)) return false;
  if (value.version !== SANKIWORK_HOST_VERSION) return false;
  const client = value.client;
  if (!isRecord(client) || client.type !== SANKIWORK_HOST_CLIENT_TYPES.DESKTOP) return false;
  if (client.platform != null && typeof client.platform !== "string") return false;
  if (client.osLocale != null && typeof client.osLocale !== "string") return false;

  const shell = value.shell;
  if (!isRecord(shell) || !hasFunction(shell, "openExternal") || !hasFunction(shell, "openPath")) return false;

  const browser = value.browser;
  if (!isRecord(browser) || !hasFunction(browser, "clearData")) return false;

  const capture = value.capture;
  if (!isRecord(capture) || !hasFunction(capture, "page")) return false;

  const project = value.project;
  if (
    !isRecord(project) ||
    !hasFunction(project, "pickAndImport") ||
    !hasFunction(project, "pickAndReplaceWorkingDir")
  ) {
    return false;
  }

  const pdf = value.pdf;
  if (!isRecord(pdf) || !hasFunction(pdf, "print")) return false;

  const pet = value.pet;
  if (!isRecord(pet) || !hasFunction(pet, "setVisible")) return false;

  const updater = value.updater;
  if (
    !isRecord(updater) ||
    !hasFunction(updater, "status") ||
    !hasFunction(updater, "check") ||
    !hasFunction(updater, "clear-cache") ||
    !hasFunction(updater, "download") ||
    !hasFunction(updater, "install") ||
    !hasFunction(updater, "quit") ||
    !hasFunction(updater, "setMenuLabels") ||
    !hasFunction(updater, "subscribe") ||
    !hasFunction(updater, "subscribeOpenDialog")
  ) {
    return false;
  }

  return true;
}

/** @internal Read the host-bridge candidate from a scope (or its `window`). */
function candidateFromScope(scope: SankiWorkHostGlobalScope): unknown {
  if (SANKIWORK_HOST_GLOBAL in scope) return scope[SANKIWORK_HOST_GLOBAL];
  const windowValue = scope.window;
  if (isRecord(windowValue) && SANKIWORK_HOST_GLOBAL in windowValue) {
    return windowValue[SANKIWORK_HOST_GLOBAL];
  }
  return undefined;
}

/**
 * Resolve the validated host bridge from `scope`, or `null` when absent or
 * malformed.
 */
export function getSankiWorkHost(scope: SankiWorkHostGlobalScope = globalThis): SankiWorkHostBridge | null {
  const candidate = candidateFromScope(scope);
  return isSankiWorkHostBridge(candidate) ? candidate : null;
}

/** True when a valid SankiWork host bridge is present on `scope`. */
export function isSankiWorkHostAvailable(scope: SankiWorkHostGlobalScope = globalThis): boolean {
  return getSankiWorkHost(scope) != null;
}

/** Detect the host client type on `scope`, falling back to web. */
export function detectSankiWorkHostClientType(scope: SankiWorkHostGlobalScope = globalThis): SankiWorkHostClientType | "web" {
  return getSankiWorkHost(scope)?.client.type ?? "web";
}
