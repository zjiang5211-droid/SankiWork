import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PRODUCT_NAME } from "../src/mac/constants.js";
import {
  macAppBundleName,
  macAppExecutablePath,
  resolveMacAppOutputDirectoryName,
  sanitizeNamespace,
} from "../src/mac/paths.js";

describe("sanitizeNamespace", () => {
  it("keeps alphanumerics, dots, hyphens, and underscores", () => {
    expect(sanitizeNamespace("SankiWork.beta_1")).toBe("SankiWork.beta_1");
  });

  it("replaces forbidden chars with hyphens and collapses runs", () => {
    expect(sanitizeNamespace("a/b c")).toBe("a-b-c");
    expect(sanitizeNamespace("a   //  b")).toBe("a-b");
    expect(sanitizeNamespace("中文/ns")).toBe("-ns");
  });
});

describe("macAppBundleName", () => {
  it("formats <PRODUCT_NAME>.<sanitized-namespace>.app", () => {
    expect(macAppBundleName("release-beta")).toBe(`${PRODUCT_NAME}.release-beta.app`);
    expect(macAppBundleName("a b/c")).toBe(`${PRODUCT_NAME}.a-b-c.app`);
  });
});

describe("macAppExecutablePath", () => {
  it("joins the Contents/MacOS executable path under the bundle", () => {
    const appPath = "/tmp/out/mac/SankiWork.app";
    expect(macAppExecutablePath(appPath)).toBe(join(appPath, "Contents", "MacOS", PRODUCT_NAME));
  });

  it("honors a custom executable name", () => {
    const appPath = "/tmp/out/mac/SankiWork.app";
    expect(macAppExecutablePath(appPath, "sankiwork-beta")).toBe(
      join(appPath, "Contents", "MacOS", "sankiwork-beta"),
    );
  });
});

describe("resolveMacAppOutputDirectoryName", () => {
  it("returns mac-arm64 on arm64 hosts, otherwise mac", () => {
    expect(resolveMacAppOutputDirectoryName()).toBe(process.arch === "arm64" ? "mac-arm64" : "mac");
  });
});
