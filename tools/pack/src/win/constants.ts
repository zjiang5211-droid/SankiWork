export const PRODUCT_NAME = "SankiWork";
export const DESKTOP_LOG_ECHO_ENV = "SW_DESKTOP_LOG_ECHO";
export const WEB_STANDALONE_HOOK_CONFIG_ENV = "SW_TOOLS_PACK_WEB_STANDALONE_HOOK_CONFIG";
export const WEB_STANDALONE_RESOURCE_NAME = "sankiwork-web-standalone";
export const ELECTRON_BUILDER_ASAR = false;
export const ELECTRON_BUILDER_BUILD_DEPENDENCIES_FROM_SOURCE = false;
export const ELECTRON_BUILDER_NODE_GYP_REBUILD = false;
export const ELECTRON_BUILDER_NPM_REBUILD = false;
export const ELECTRON_REBUILD_MODE = "sequential" as const;
export const ELECTRON_REBUILD_NATIVE_MODULES = ["better-sqlite3"] as const;
export const ELECTRON_BUILDER_FILE_PATTERNS = [
  "**/*",
  "!**/node_modules/.bin",
  "!**/node_modules/electron{,/**/*}",
  "!**/*.map",
  "!**/*.tsbuildinfo",
  "!**/.next/cache",
  "!**/.next/cache/**",
  "!**/node_modules/better-sqlite3/build/Release/obj",
  "!**/node_modules/better-sqlite3/build/Release/obj/**",
  "!**/node_modules/better-sqlite3/deps",
  "!**/node_modules/better-sqlite3/deps/**",
] as const;
export const NSIS_INSTALLER_LANGUAGE_BY_WEB_LOCALE = {
  en: "en_US",
  fa: "fa_IR",
  "pt-BR": "pt_BR",
  ru: "ru_RU",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
} as const;
export const INTERNAL_PACKAGES = [
  { directory: "packages/release", name: "@sankiwork/release" },
  { directory: "packages/components", name: "@sankiwork/components" },
  { directory: "packages/contracts", name: "@sankiwork/contracts" },
  { directory: "packages/registry-protocol", name: "@sankiwork/registry-protocol" },
  { directory: "packages/sidecar-proto", name: "@sankiwork/sidecar-proto" },
  { directory: "packages/launcher-proto", name: "@sankiwork/launcher-proto" },
  { directory: "packages/sidecar", name: "@sankiwork/sidecar" },
  { directory: "packages/platform", name: "@sankiwork/platform" },
  { directory: "packages/download", name: "@sankiwork/download" },
  { directory: "packages/host", name: "@sankiwork/host" },
  { directory: "packages/agui-adapter", name: "@sankiwork/agui-adapter" },
  { directory: "packages/plugin-runtime", name: "@sankiwork/plugin-runtime" },
  { directory: "packages/diagnostics", name: "@sankiwork/diagnostics" },
  { directory: "apps/daemon", name: "@sankiwork/daemon" },
  { directory: "apps/web", name: "@sankiwork/web" },
  { directory: "apps/desktop", name: "@sankiwork/desktop" },
  { directory: "apps/packaged", name: "@sankiwork/packaged" },
] as const;
