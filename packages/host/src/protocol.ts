import type { ReleaseChannel } from "@sankiwork/release";

/**
 * @module protocol
 *
 * The SankiWork renderer host-bridge wire contract: the injected-global name
 * and version, client/updater constant registries, and every request/result
 * type that crosses the host bridge — including the {@link SankiWorkHostBridge}
 * shape itself. Pure declarations only; depends on nothing else in the package.
 */

export const SANKIWORK_HOST_GLOBAL = "__sankiwork__";
export const SANKIWORK_HOST_VERSION = 2;

export const SANKIWORK_HOST_CLIENT_TYPES = Object.freeze({
  DESKTOP: "desktop",
} as const);

export type SankiWorkHostClientType =
  (typeof SANKIWORK_HOST_CLIENT_TYPES)[keyof typeof SANKIWORK_HOST_CLIENT_TYPES];

export type SankiWorkHostClient = {
  // BCP-47 locale string (e.g. "zh-CN", "pt-BR") the host process read from
  // the OS at startup. The renderer uses this so the packaged desktop app
  // can follow the OS language even when Chromium's built-in
  // `navigator.language` would have defaulted to en-US.
  osLocale?: string;
  platform?: string;
  type: SankiWorkHostClientType;
};

export type SankiWorkHostFailure = {
  details?: unknown;
  ok: false;
  reason: string;
};

export type SankiWorkHostActionResult =
  | { ok: true }
  | SankiWorkHostFailure;

/**
 * The workspace attribution the renderer gives the host so a folder import
 * lands in the caller's current workspace instead of the host's ambient one.
 *
 * This is a deliberate structural subset of the daemon/web
 * `WorkspaceCollabContext`, redeclared here rather than imported: this package
 * is the renderer host-bridge wire contract and must stay independent of the
 * daemon/web contracts package (enforced by the "stays independent from
 * daemon/web contracts" test). A full `WorkspaceCollabContext` is structurally
 * assignable to this type, so callers pass theirs unchanged.
 *
 * Only the fields the host actually forwards are modelled, and the enum-like
 * fields stay `string` because the host treats them as opaque pass-through
 * values — the daemon remains the authority that parses and validates them.
 * Deliberately no index signature: an interface never satisfies one, so adding
 * it would reject the very `WorkspaceCollabContext` callers pass. Callers hand
 * over a variable, not a fresh literal, so the extra fields ride along fine.
 */
export type SankiWorkHostWorkspaceContext = {
  lifecycleState: string;
  memberStatus: string;
  permissions: {
    canShareProjects: boolean;
    canWriteSyncedFiles: boolean;
  };
  role: string;
  workspaceId: string;
  workspaceMemberId: string;
  workspaceType: string;
};

export type SankiWorkHostProjectImportInit = {
  designSystemId?: string | null;
  name?: string;
  skillId?: string | null;
  workspaceContext?: SankiWorkHostWorkspaceContext | null;
};

export type SankiWorkHostProjectImportSuccess = {
  conversationId: string;
  entryFile: string | null;
  ok: true;
  projectId: string;
};

export type SankiWorkHostProjectImportResult =
  | SankiWorkHostProjectImportSuccess
  | {
      canceled: true;
      ok: false;
    }
  | SankiWorkHostFailure;

export type SankiWorkHostProjectReplaceWorkingDirSuccess = {
  baseDir: string;
  entryFile: string | null;
  ok: true;
};

export type SankiWorkHostProjectReplaceWorkingDirResult =
  | SankiWorkHostProjectReplaceWorkingDirSuccess
  | {
      canceled: true;
      ok: false;
    }
  | SankiWorkHostFailure;

export type SankiWorkHostPickWorkingDirSuccess = {
  baseDir: string;
  ok: true;
  // Single-use HMAC token (minted by the host main process for `baseDir`)
  // that the renderer threads into POST /api/projects/:id/working-dir once
  // the project exists. Lets the Home flow pick a folder before the project
  // is created without exposing the daemon's desktop-auth gate.
  token: string;
};

export type SankiWorkHostPickWorkingDirResult =
  | SankiWorkHostPickWorkingDirSuccess
  | {
      canceled: true;
      ok: false;
    }
  | SankiWorkHostFailure;

export type SankiWorkHostPdfPrintOptions = {
  deck?: boolean;
};

export type SankiWorkHostCaptureClip = { x: number; y: number; width: number; height: number };
export type SankiWorkHostCaptureOptions = { clip?: SankiWorkHostCaptureClip };
export type SankiWorkHostCaptureSuccess = { dataUrl: string; h: number; ok: true; w: number };
export type SankiWorkHostCaptureResult = SankiWorkHostCaptureSuccess | SankiWorkHostFailure;

export type SankiWorkHostBrowserClearDataOptions = {
  cookies?: boolean;
  storage?: boolean;
};

/**
 * App theme values the renderer may pin the host window appearance to.
 * `light`/`dark` force the native window material (macOS under-window
 * vibrancy glass follows the OS appearance by default, which reads as a
 * muddy gray when the OS is dark but the app theme is explicitly light);
 * `system` restores following the OS.
 */
export const SANKIWORK_HOST_APPEARANCE_THEMES = Object.freeze({
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const);

export type SankiWorkHostAppearanceTheme =
  (typeof SANKIWORK_HOST_APPEARANCE_THEMES)[keyof typeof SANKIWORK_HOST_APPEARANCE_THEMES];

export const SANKIWORK_HOST_UPDATER_ACTIONS = Object.freeze({
  CHECK: "check",
  CLEAR_CACHE: "clear-cache",
  DOWNLOAD: "download",
  INSTALL: "install",
  QUIT: "quit",
  STATUS: "status",
} as const);

export type SankiWorkHostUpdaterAction =
  (typeof SANKIWORK_HOST_UPDATER_ACTIONS)[keyof typeof SANKIWORK_HOST_UPDATER_ACTIONS];

/** @internal Updater actions that return a status snapshot (every action except `quit`). */
export type SankiWorkHostUpdaterStatusAction = Exclude<
  SankiWorkHostUpdaterAction,
  typeof SANKIWORK_HOST_UPDATER_ACTIONS.QUIT
>;

export const SANKIWORK_HOST_UPDATER_STATES = Object.freeze({
  AVAILABLE: "available",
  CHECKING: "checking",
  DOWNLOADED: "downloaded",
  DOWNLOADING: "downloading",
  ERROR: "error",
  IDLE: "idle",
  INSTALLING: "installing",
  NOT_AVAILABLE: "not-available",
  UNSUPPORTED: "unsupported",
} as const);

export type SankiWorkHostUpdaterState =
  (typeof SANKIWORK_HOST_UPDATER_STATES)[keyof typeof SANKIWORK_HOST_UPDATER_STATES];

export type SankiWorkHostUpdaterMode = "js-incremental" | "package-launcher";
export type SankiWorkHostUpdaterChannel = ReleaseChannel;

export type SankiWorkHostUpdaterActionOptions = {
  payload?: Record<string, unknown>;
};

export type SankiWorkHostUpdaterCapabilitySet = {
  canApplyInPlace: boolean;
  canDownload: boolean;
  canOpenInstaller: boolean;
  requiresManualInstall: boolean;
};

export type SankiWorkHostUpdaterPathSnapshot = {
  downloadRoot?: string;
  manifestPath?: string;
};

export type SankiWorkHostUpdaterChecksumSnapshot = {
  algorithm: "sha256" | "sha512";
  url?: string;
  value?: string;
};

export type SankiWorkHostUpdaterArtifactSnapshot = {
  name?: string;
  platformKey?: string;
  size?: number;
  type?: string;
  url: string;
};

export type SankiWorkHostUpdaterProgressSnapshot = {
  receivedBytes: number;
  totalBytes?: number;
};

export type SankiWorkHostUpdaterErrorSnapshot = {
  code: string;
  details?: unknown;
  message: string;
};

export type SankiWorkHostUpdaterInstallResult = {
  activeVersion?: string;
  artifactPath?: string;
  dryRun?: boolean;
  helperLogPath?: string;
  launcherRuntimePath?: string;
  launchPath?: string;
  openedAt: string;
  path: string;
};

export type SankiWorkHostUpdaterReleaseSnapshot = {
  arch: string;
  artifact: SankiWorkHostUpdaterArtifactSnapshot;
  checksum: SankiWorkHostUpdaterChecksumSnapshot;
  channel: SankiWorkHostUpdaterChannel;
  downloadedAt: string;
  key: string;
  metadata?: Record<string, unknown>;
  path: string;
  platformKey: string;
  version: string;
};

export type SankiWorkHostUpdaterIncomingSnapshot = {
  arch: string;
  artifact: SankiWorkHostUpdaterArtifactSnapshot;
  channel: SankiWorkHostUpdaterChannel;
  key?: string;
  metadata?: Record<string, unknown>;
  progress?: SankiWorkHostUpdaterProgressSnapshot;
  startedAt: string;
  version: string;
};

export type SankiWorkHostUpdaterCacheLifecycleTrigger = "cold-start" | "manual" | "next-version-ready";

export type SankiWorkHostUpdaterReleaseLifecycleState =
  | "cleanup-deferred"
  | "cleanup-removed"
  | "deprecated"
  | "retained"
  | "unknown";

export type SankiWorkHostUpdaterCacheLifecycleSummary = {
  lastRunAt?: string;
  lastTrigger?: SankiWorkHostUpdaterCacheLifecycleTrigger;
  platform: string;
  releases: {
    cleanupDeferred: number;
    cleanupRemoved: number;
    deprecated: number;
    errors: number;
    retained: number;
    total: number;
    unknown: number;
  };
};

export type SankiWorkHostUpdaterCacheSnapshot = {
  lifecycle?: SankiWorkHostUpdaterCacheLifecycleSummary;
};

export type SankiWorkHostUpdaterReinstallReason =
  | "launcher-schema"
  | "outer-below-min"
  | "outer-version-unreadable";

/**
 * Present when the release feed requires a full installer reinstall instead of
 * an in-place payload update. `installedVersion` is the physically installed
 * outer package version; `url` is an optional operator-supplied explanation
 * link.
 */
export type SankiWorkHostUpdaterReinstallSnapshot = {
  installedVersion?: string;
  minVersion?: string;
  reason: SankiWorkHostUpdaterReinstallReason;
  url?: string;
};

export type SankiWorkHostUpdaterStatusSnapshot = {
  active?: SankiWorkHostUpdaterReleaseSnapshot;
  arch: string;
  artifact?: SankiWorkHostUpdaterArtifactSnapshot;
  artifactUrl?: string;
  availableVersion?: string;
  cache?: SankiWorkHostUpdaterCacheSnapshot;
  capabilities: SankiWorkHostUpdaterCapabilitySet;
  channel: SankiWorkHostUpdaterChannel;
  checksum?: SankiWorkHostUpdaterChecksumSnapshot;
  currentVersion: string;
  downloadPath?: string;
  enabled: boolean;
  error?: SankiWorkHostUpdaterErrorSnapshot;
  incoming?: SankiWorkHostUpdaterIncomingSnapshot;
  installResult?: SankiWorkHostUpdaterInstallResult;
  lastCheckedAt?: string;
  metadata?: Record<string, unknown>;
  mode: SankiWorkHostUpdaterMode;
  paths?: SankiWorkHostUpdaterPathSnapshot;
  platform: string;
  progress?: SankiWorkHostUpdaterProgressSnapshot;
  reinstall?: SankiWorkHostUpdaterReinstallSnapshot;
  state: SankiWorkHostUpdaterState;
  supported: boolean;
};

export type SankiWorkHostUpdaterResult =
  | { ok: true; status: SankiWorkHostUpdaterStatusSnapshot }
  | SankiWorkHostFailure;

export type SankiWorkHostUpdaterStatusListener = (status: SankiWorkHostUpdaterStatusSnapshot) => void;

export type SankiWorkHostUpdaterMenuLabels = {
  check: string;
  checking: string;
  downloading: string;
  install: string;
  installing: string;
  restart: string;
};

export type SankiWorkHostUpdaterOpenDialogRequest = {
  source: string;
};

export type SankiWorkHostUpdaterOpenDialogListener = (request: SankiWorkHostUpdaterOpenDialogRequest) => void;

export type SankiWorkHostBridge = {
  // Optional so older host builds still satisfy the bridge shape; callers
  // must feature-detect before invoking.
  appearance?: {
    setTheme(theme: SankiWorkHostAppearanceTheme): void;
  };
  browser: {
    clearData(options?: SankiWorkHostBrowserClearDataOptions): Promise<SankiWorkHostActionResult>;
  };
  capture: {
    page(options?: SankiWorkHostCaptureOptions): Promise<SankiWorkHostCaptureResult>;
  };
  client: SankiWorkHostClient;
  pdf: {
    print(html: string, nonce?: string, options?: SankiWorkHostPdfPrintOptions): Promise<SankiWorkHostActionResult>;
  };
  pet: {
    setVisible(visible: boolean): void;
  };
  project: {
    pickAndImport(init?: SankiWorkHostProjectImportInit): Promise<SankiWorkHostProjectImportResult>;
    pickAndReplaceWorkingDir(projectId: string): Promise<SankiWorkHostProjectReplaceWorkingDirResult>;
    // Optional so older host builds still satisfy the bridge shape; callers
    // must feature-detect before invoking.
    pickWorkingDir?(): Promise<SankiWorkHostPickWorkingDirResult>;
  };
  shell: {
    openExternal(url: string): Promise<SankiWorkHostActionResult>;
    openPath(projectId: string): Promise<SankiWorkHostActionResult>;
  };
  updater: {
    check(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostUpdaterStatusSnapshot>;
    "clear-cache"(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostUpdaterStatusSnapshot>;
    download(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostUpdaterStatusSnapshot>;
    install(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostUpdaterStatusSnapshot>;
    quit(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostActionResult>;
    setMenuLabels(labels: SankiWorkHostUpdaterMenuLabels): Promise<SankiWorkHostActionResult>;
    status(options?: SankiWorkHostUpdaterActionOptions): Promise<SankiWorkHostUpdaterStatusSnapshot>;
    subscribe(listener: SankiWorkHostUpdaterStatusListener): () => void;
    subscribeOpenDialog(listener: SankiWorkHostUpdaterOpenDialogListener): () => void;
  };
  version: typeof SANKIWORK_HOST_VERSION;
};

export type SankiWorkHostGlobalScope = Record<string, unknown> & {
  window?: unknown;
};
