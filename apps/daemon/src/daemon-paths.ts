import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

import { resolveProjectRelativePath } from './home-expansion.js';

const require = createRequire(import.meta.url);

export const DAEMON_CLI_PATH_ENV = 'SW_DAEMON_CLI_PATH';
export const RESOURCE_ROOT_ENV = 'SW_RESOURCE_ROOT';

function cleanOptionalPath(value: string | undefined): string | null {
  return typeof value === 'string' && value.trim().length > 0
    ? path.resolve(value)
    : null;
}

export function resolveDaemonCliPath(env: NodeJS.ProcessEnv = process.env): string {
  const configured = cleanOptionalPath(env[DAEMON_CLI_PATH_ENV]) ?? cleanOptionalPath(env.SW_BIN);
  if (configured) return configured;

  const packageJsonPath = require.resolve('@sankiwork/daemon/package.json');
  return path.join(path.dirname(packageJsonPath), 'dist', 'cli.js');
}

function isPathWithin(base: string, target: string): boolean {
  const relativePath = path.relative(path.resolve(base), path.resolve(target));
  return (
    relativePath === '' ||
    (relativePath.length > 0 &&
      !relativePath.startsWith('..') &&
      !path.isAbsolute(relativePath))
  );
}

export function resolveProcessResourcesPath(): string | null {
  const resourcesPath = (process as NodeJS.Process & { resourcesPath?: string }).resourcesPath;
  if (
    typeof resourcesPath === 'string' &&
    resourcesPath.length > 0
  ) {
    return resourcesPath;
  }

  const resourcesMarker = `${path.sep}Contents${path.sep}Resources${path.sep}`;
  const markerIndex = process.execPath.indexOf(resourcesMarker);
  if (markerIndex !== -1) {
    return process.execPath.slice(0, markerIndex + resourcesMarker.length - 1);
  }

  const normalizedExecPath = process.execPath.toLowerCase();
  const windowsResourceBinMarker =
    `${path.sep}resources${path.sep}sankiwork${path.sep}bin${path.sep}`.toLowerCase();
  const windowsMarkerIndex = normalizedExecPath.indexOf(windowsResourceBinMarker);
  if (windowsMarkerIndex !== -1) {
    return process.execPath.slice(
      0,
      windowsMarkerIndex + `${path.sep}resources`.length,
    );
  }

  return null;
}

export interface ResolveDaemonResourceRootOptions {
  configured?: string;
  safeBases?: Array<string | null | undefined>;
}

export function resolveDaemonResourceRoot({
  configured = process.env[RESOURCE_ROOT_ENV],
  safeBases,
}: ResolveDaemonResourceRootOptions = {}): string | null {
  if (!configured || configured.length === 0) return null;

  const resolved = path.resolve(configured);
  const normalizedSafeBases = (safeBases ?? [])
    .filter((base): base is string => typeof base === 'string' && base.length > 0)
    .map((base) => path.resolve(base));

  if (!normalizedSafeBases.some((base) => isPathWithin(base, resolved))) {
    throw new Error(
      `${RESOURCE_ROOT_ENV} must be under the workspace root or app resources path`,
    );
  }

  return resolved;
}

export function resolveDaemonResourceDir(
  resourceRoot: string | null,
  segment: string,
  fallback: string,
): string {
  return resourceRoot ? path.join(resourceRoot, segment) : fallback;
}

export interface ResolveDaemonPluginPreviewsDirOptions {
  env?: NodeJS.ProcessEnv;
  resourceRoot: string | null | undefined;
  projectRoot: string;
}

export function resolveDaemonPluginPreviewsDir({
  env = process.env,
  resourceRoot,
  projectRoot,
}: ResolveDaemonPluginPreviewsDirOptions): string {
  const override = env.SW_PLUGIN_PREVIEWS_DIR;
  if (override) {
    return path.isAbsolute(override) ? override : path.resolve(projectRoot, override);
  }
  return resolveDaemonResourceDir(
    resourceRoot ?? null,
    path.join('data', 'plugin-previews'),
    path.join(projectRoot, 'data', 'plugin-previews'),
  );
}

export interface ResolveDataDirOptions {
  requireExplicit?: boolean;
}

const DATA_DIR_NAME = '.sankiwork';
const LEGACY_DATA_DIR_NAME = '.od';

/**
 * One-time compatibility migration from the legacy Open Design data dir
 * (`.od`) to the SankiWork data dir (`.sankiwork`). Runs only for the
 * default project-scoped data dir: when the target does not exist and the
 * legacy dir does, the legacy dir is renamed in place (same filesystem) so
 * existing projects / settings / plugins keep working after the rebrand.
 * Failure to migrate is reported loudly but does not block startup — the
 * app starts with a fresh `.sankiwork` and the legacy dir is left intact.
 */
function migrateLegacyDataDir(projectRoot: string): void {
  const legacyDir = path.join(projectRoot, LEGACY_DATA_DIR_NAME);
  const dataDir = path.join(projectRoot, DATA_DIR_NAME);
  if (fs.existsSync(dataDir) || !fs.existsSync(legacyDir)) return;
  try {
    fs.renameSync(legacyDir, dataDir);
    console.warn(`[sw] migrated legacy data dir ${legacyDir} -> ${dataDir}`);
  } catch (err) {
    const e = err as Error;
    console.warn(
      `[sw] legacy data dir ${legacyDir} found but could not be migrated: ${e.message}; ` +
        `starting with a fresh ${dataDir} (legacy dir left untouched)`,
    );
  }
}

export function resolveDataDir(
  raw: string | undefined,
  projectRoot: string,
  options: ResolveDataDirOptions = {},
): string {
  const value = raw?.trim();
  if (!value) {
    if (options.requireExplicit) {
      throw new Error('SW_DATA_DIR is required when SW_SANDBOX_MODE is enabled');
    }
    migrateLegacyDataDir(projectRoot);
    return path.join(projectRoot, DATA_DIR_NAME);
  }

  const resolved = resolveProjectRelativePath(value, projectRoot);
  try {
    fs.mkdirSync(resolved, { recursive: true });
    fs.accessSync(resolved, fs.constants.W_OK);
  } catch (err) {
    const e = err as Error;
    const currentUser = (() => {
      try {
        return os.userInfo().username;
      } catch {
        return process.env.USER ?? process.env.LOGNAME ?? 'unknown';
      }
    })();
    const parentDir = path.dirname(resolved);
    throw new Error(
      [
        `SW_DATA_DIR "${resolved}" is not writable: ${e.message}`,
        `Current user: ${currentUser}`,
        'Check whether the folder or one of its parents is owned by another user, is a symlink to a protected location, or was previously created with sudo.',
        `Try: ls -ld "${parentDir}" "${resolved}"`,
        `If the folder should belong to you, fix ownership/permissions, for example: sudo chown -R "${currentUser}":staff "${parentDir}" && chmod -R u+rwX "${parentDir}"`,
      ].join(' '),
    );
  }
  return resolved;
}
