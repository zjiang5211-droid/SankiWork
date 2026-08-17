import {
  SANKIWORK_HOST_GLOBAL,
  SANKIWORK_HOST_VERSION,
  type SankiWorkHostBridge,
  type SankiWorkHostGlobalScope,
  type SankiWorkHostUpdaterStatusSnapshot,
} from "./index.js";

export type MockSankiWorkHost = Partial<Omit<SankiWorkHostBridge, "capture" | "client" | "pdf" | "pet" | "project" | "shell" | "updater">> & {
  browser?: Partial<SankiWorkHostBridge["browser"]>;
  capture?: Partial<SankiWorkHostBridge["capture"]>;
  client?: Partial<SankiWorkHostBridge["client"]>;
  pdf?: Partial<SankiWorkHostBridge["pdf"]>;
  pet?: Partial<SankiWorkHostBridge["pet"]>;
  project?: Partial<SankiWorkHostBridge["project"]>;
  shell?: Partial<SankiWorkHostBridge["shell"]>;
  updater?: Partial<SankiWorkHostBridge["updater"]>;
};

export type MockSankiWorkHostOptions = {
  host?: MockSankiWorkHost;
  scope?: SankiWorkHostGlobalScope;
};

function defaultHost(): SankiWorkHostBridge {
  const updaterStatus: SankiWorkHostUpdaterStatusSnapshot = {
    arch: "arm64",
    capabilities: {
      canApplyInPlace: false,
      canDownload: true,
      canOpenInstaller: true,
      requiresManualInstall: true,
    },
    channel: "beta",
    currentVersion: "1.0.0-beta.0",
    enabled: true,
    mode: "package-launcher",
    platform: "darwin",
    state: "idle",
    supported: true,
  };
  return {
    version: SANKIWORK_HOST_VERSION,
    browser: {
      clearData: async () => ({ ok: true }),
    },
    capture: {
      page: async () => ({ ok: true, dataUrl: "data:image/png;base64,", h: 1, w: 1 }),
    },
    client: {
      type: "desktop",
      platform: "test",
    },
    shell: {
      openExternal: async () => ({ ok: true }),
      openPath: async () => ({ ok: true }),
    },
    project: {
      pickAndImport: async () => ({
        ok: true,
        projectId: "project-test",
        conversationId: "conversation-test",
        entryFile: "index.html",
      }),
      pickAndReplaceWorkingDir: async () => ({
        ok: true,
        baseDir: "/tmp/sankiwork-test",
        entryFile: null,
      }),
    },
    pdf: {
      print: async () => ({ ok: true }),
    },
    pet: {
      setVisible: () => undefined,
    },
    updater: {
      check: async () => updaterStatus,
      "clear-cache": async () => updaterStatus,
      download: async () => updaterStatus,
      install: async () => updaterStatus,
      quit: async () => ({ ok: true }),
      setMenuLabels: async () => ({ ok: true }),
      status: async () => updaterStatus,
      subscribe: () => () => undefined,
      subscribeOpenDialog: () => () => undefined,
    },
  };
}

export function createMockSankiWorkHost(overrides: MockSankiWorkHost = {}): SankiWorkHostBridge {
  const base = defaultHost();
  return {
    ...base,
    ...overrides,
    browser: { ...base.browser, ...overrides.browser },
    capture: { ...base.capture, ...overrides.capture },
    client: { ...base.client, ...overrides.client },
    shell: { ...base.shell, ...overrides.shell },
    project: { ...base.project, ...overrides.project },
    pdf: { ...base.pdf, ...overrides.pdf },
    pet: { ...base.pet, ...overrides.pet },
    updater: { ...base.updater, ...overrides.updater },
  };
}

export function installMockSankiWorkHost(options: MockSankiWorkHostOptions = {}): () => void {
  const scope = (options.scope ?? globalThis) as SankiWorkHostGlobalScope;
  const host = createMockSankiWorkHost(options.host);
  const windowValue = scope.window;
  const targets = [
    scope,
    ...(typeof windowValue === "object" && windowValue != null && windowValue !== scope
      ? [windowValue as SankiWorkHostGlobalScope]
      : []),
  ];
  const previous = targets.map((target) => ({
    had: Object.prototype.hasOwnProperty.call(target, SANKIWORK_HOST_GLOBAL),
    target,
    value: target[SANKIWORK_HOST_GLOBAL],
  }));

  for (const target of targets) {
    Object.defineProperty(target, SANKIWORK_HOST_GLOBAL, {
      configurable: true,
      value: host,
      writable: true,
    });
  }

  return () => {
    for (const entry of previous) {
      if (entry.had) {
        Object.defineProperty(entry.target, SANKIWORK_HOST_GLOBAL, {
          configurable: true,
          value: entry.value,
          writable: true,
        });
      } else {
        delete entry.target[SANKIWORK_HOST_GLOBAL];
      }
    }
  };
}
