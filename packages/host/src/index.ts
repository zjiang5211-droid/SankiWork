/**
 * @module host
 *
 * Public barrel for `@sankiwork/host` — the SankiWork renderer host-bridge
 * protocol. Re-exports the exact prior flat surface from the cohesive sibling
 * modules: the wire protocol (constants + types), bridge detection/validation,
 * adapter-result normalizers, and the renderer-facing action wrappers. This
 * file contains no logic.
 */

// --- protocol: constant registries + wire types ---
export {
  SANKIWORK_HOST_GLOBAL,
  SANKIWORK_HOST_VERSION,
  SANKIWORK_HOST_APPEARANCE_THEMES,
  SANKIWORK_HOST_CLIENT_TYPES,
  SANKIWORK_HOST_UPDATER_ACTIONS,
  SANKIWORK_HOST_UPDATER_STATES,
} from "./protocol.js";
export type {
  SankiWorkHostClientType,
  SankiWorkHostClient,
  SankiWorkHostFailure,
  SankiWorkHostActionResult,
  SankiWorkHostWorkspaceContext,
  SankiWorkHostProjectImportInit,
  SankiWorkHostProjectImportSuccess,
  SankiWorkHostProjectImportResult,
  SankiWorkHostProjectReplaceWorkingDirSuccess,
  SankiWorkHostProjectReplaceWorkingDirResult,
  SankiWorkHostPickWorkingDirSuccess,
  SankiWorkHostPickWorkingDirResult,
  SankiWorkHostPdfPrintOptions,
  SankiWorkHostCaptureClip,
  SankiWorkHostCaptureOptions,
  SankiWorkHostCaptureSuccess,
  SankiWorkHostCaptureResult,
  SankiWorkHostAppearanceTheme,
  SankiWorkHostBrowserClearDataOptions,
  SankiWorkHostUpdaterAction,
  SankiWorkHostUpdaterState,
  SankiWorkHostUpdaterMode,
  SankiWorkHostUpdaterChannel,
  SankiWorkHostUpdaterActionOptions,
  SankiWorkHostUpdaterCapabilitySet,
  SankiWorkHostUpdaterPathSnapshot,
  SankiWorkHostUpdaterChecksumSnapshot,
  SankiWorkHostUpdaterArtifactSnapshot,
  SankiWorkHostUpdaterProgressSnapshot,
  SankiWorkHostUpdaterErrorSnapshot,
  SankiWorkHostUpdaterInstallResult,
  SankiWorkHostUpdaterReleaseSnapshot,
  SankiWorkHostUpdaterIncomingSnapshot,
  SankiWorkHostUpdaterCacheLifecycleTrigger,
  SankiWorkHostUpdaterReleaseLifecycleState,
  SankiWorkHostUpdaterCacheLifecycleSummary,
  SankiWorkHostUpdaterCacheSnapshot,
  SankiWorkHostUpdaterReinstallReason,
  SankiWorkHostUpdaterReinstallSnapshot,
  SankiWorkHostUpdaterStatusSnapshot,
  SankiWorkHostUpdaterResult,
  SankiWorkHostUpdaterStatusListener,
  SankiWorkHostUpdaterMenuLabels,
  SankiWorkHostUpdaterOpenDialogRequest,
  SankiWorkHostUpdaterOpenDialogListener,
  SankiWorkHostBridge,
  SankiWorkHostGlobalScope,
} from "./protocol.js";

// --- detection: locate + validate the injected bridge ---
export {
  isSankiWorkHostBridge,
  getSankiWorkHost,
  isSankiWorkHostAvailable,
  detectSankiWorkHostClientType,
} from "./detection.js";

// --- normalize: adapter result -> renderer contract ---
export {
  normalizeSankiWorkHostProjectImportResult,
  normalizeSankiWorkHostProjectReplaceWorkingDirResult,
  normalizeSankiWorkHostPickWorkingDirResult,
} from "./normalize.js";

// --- actions: renderer-facing host action wrappers ---
export {
  openHostExternalUrl,
  openHostProjectPath,
  clearHostBrowserData,
  captureHostPage,
  pickAndImportHostProject,
  pickAndReplaceHostProjectWorkingDir,
  pickHostWorkingDir,
  printHostPdf,
  setHostPetVisible,
  getHostUpdaterStatus,
  checkHostUpdater,
  clearHostUpdaterCache,
  downloadHostUpdater,
  installHostUpdater,
  quitHostAfterUpdaterInstallerOpen,
  subscribeHostUpdater,
  subscribeHostUpdaterOpenDialog,
  setHostUpdaterMenuLabels,
} from "./actions.js";
