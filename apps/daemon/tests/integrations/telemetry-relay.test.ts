import { describe, expect, it } from 'vitest';

import {
  normalizeSankiWorkTelemetryRelayUrl,
  SANKIWORK_TELEMETRY_RELAY_URLS,
} from '../../src/integrations/telemetry-relay.js';

describe('SankiWork telemetry relay URLs', () => {
  it('keeps production on telemetry.sanki-ai.cloud', () => {
    expect(SANKIWORK_TELEMETRY_RELAY_URLS.prod).toBe(
      'https://telemetry.sanki-ai.cloud/api/langfuse',
    );
    expect(normalizeSankiWorkTelemetryRelayUrl(
      'https://telemetry.sanki-ai.cloud/api/langfuse//',
    )).toBe(SANKIWORK_TELEMETRY_RELAY_URLS.prod);
  });

  it('moves legacy self-host test URLs to telemetry-test.sanki-ai.cloud', () => {
    expect(normalizeSankiWorkTelemetryRelayUrl(
      'https://telemetry-selfhost.sanki-ai.cloud/api/langfuse/',
    )).toBe(SANKIWORK_TELEMETRY_RELAY_URLS.test);
  });

  it('leaves custom relay URLs unchanged', () => {
    expect(normalizeSankiWorkTelemetryRelayUrl(
      'https://telemetry.example.test/api/langfuse/',
    )).toBe('https://telemetry.example.test/api/langfuse');
  });
});
