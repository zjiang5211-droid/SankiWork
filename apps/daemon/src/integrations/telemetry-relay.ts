export const SANKIWORK_TELEMETRY_RELAY_URLS = {
  test: 'https://telemetry-test.sanki-ai.cloud/api/langfuse',
  prod: 'https://telemetry.sanki-ai.cloud/api/langfuse',
} as const;

const LEGACY_TEST_RELAY_ORIGIN = 'https://telemetry-selfhost.sanki-ai.cloud';
const TEST_RELAY_ORIGIN = 'https://telemetry-test.sanki-ai.cloud';

/**
 * Keep legacy test configurations working while moving the test Worker to its
 * environment-owned hostname. Production and custom relay URLs are unchanged.
 */
export function normalizeSankiWorkTelemetryRelayUrl(value: string): string {
  const normalized = value.trim().replace(/\/+$/, '');
  return normalized.startsWith(`${LEGACY_TEST_RELAY_ORIGIN}/`) ||
    normalized === LEGACY_TEST_RELAY_ORIGIN
    ? `${TEST_RELAY_ORIGIN}${normalized.slice(LEGACY_TEST_RELAY_ORIGIN.length)}`
    : normalized;
}
