import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

describe("desktop preload host boundary", () => {
  it("exposes the canonical SankiWork host global and diagnostics bridge", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    const source = readFileSync(join(here, "../../src/main/preload.cts"), "utf8");
    const exposedGlobals = Array.from(source.matchAll(/contextBridge\.exposeInMainWorld\(([^,\n]+)/g))
      .map((match) => match[1]?.trim());
    const runtimeRequires = Array.from(source.matchAll(/require\((['"][^'"]+['"])\)/g))
      .map((match) => match[1]);

    expect(exposedGlobals).toEqual(["SANKIWORK_HOST_GLOBAL", "'sankiWorkDesktop'"]);
    expect(runtimeRequires).toEqual(["'electron'"]);
    expect(source).toContain("SANKIWORK_HOST_GLOBAL");
    expect(source).toContain("exportDiagnostics");
    expect(source).toContain("satisfies SankiWorkHostBridge");
    expect(source).toContain("browser");
    expect(source).toContain("browser:clear-data");
    expect(source).toContain("updater");
    // OS locale forwarded from main via webPreferences.additionalArguments
    // is mirrored onto __sankiwork__.client.osLocale. Pin the literal prefix
    // here so it can't drift away from `applyOsLocaleSwitch`/runtime's
    // additionalArguments without the test going red.
    expect(source).toContain("'--od-os-locale='");
    expect(source).toContain("osLocale");
    expect(source).toContain("invokeUpdater('install'");
    expect(source).toContain("invokeUpdater('clear-cache'");
    expect(source).toContain("sw:update:quit");
    expect(source).toContain("sw:update:status-changed");
    expect(source).toContain("sw:update:open-dialog");
    expect(source).toContain("sw:update:set-menu-labels");
    expect(source).toContain("subscribeOpenDialog");
    expect(source).toContain("sw:app-config-changed");
    expect(source).toContain("sankiwork:app-config-changed");
    expect(source).toContain("window.dispatchEvent(new CustomEvent(APP_CONFIG_CHANGED_EVENT))");
    expect(source).not.toContain("@sankiwork/contracts");
    expect(source).not.toContain("exposeInMainWorld('electronAPI'");
    expect(source).not.toContain('exposeInMainWorld("__swDesktop"');
    expect(source).not.toContain("exposeInMainWorld('__swDesktop'");
  });

  it("mirrors the host import contract by accepting a null entryFile", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    const source = readFileSync(join(here, "../../src/main/preload.cts"), "utf8");

    expect(source).toContain("response.entryFile === null");
    expect(source).toContain("entryFile === undefined");
  });
});
