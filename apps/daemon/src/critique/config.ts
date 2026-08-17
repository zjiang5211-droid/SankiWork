import { defaultCritiqueConfig, FALLBACK_POLICIES } from '@sankiwork/contracts/critique';
import type { CritiqueConfig } from '@sankiwork/contracts/critique';

/**
 * Load CritiqueConfig from process.env. Keys map 1:1 to SW_CRITIQUE_*.
 * Missing values fall back to defaultCritiqueConfig(). Invalid values
 * (non-numeric, negative, out-of-range) throw RangeError so misconfig
 * surfaces at boot, never silently.
 *
 * @see specs/current/critique-theater.md § Configuration (env vars)
 */
export function loadCritiqueConfigFromEnv(env: NodeJS.ProcessEnv = process.env): CritiqueConfig {
  const defaults = defaultCritiqueConfig();

  const enabled = parseEnabled(env['SW_CRITIQUE_ENABLED'], defaults.enabled);
  const maxRounds = parsePositiveInt('SW_CRITIQUE_MAX_ROUNDS', env['SW_CRITIQUE_MAX_ROUNDS'], defaults.maxRounds);
  const scoreThreshold = parseNonNegativeFloat('SW_CRITIQUE_SCORE_THRESHOLD', env['SW_CRITIQUE_SCORE_THRESHOLD'], defaults.scoreThreshold);
  const scoreScale = parsePositiveInt('SW_CRITIQUE_SCORE_SCALE', env['SW_CRITIQUE_SCORE_SCALE'], defaults.scoreScale);
  const perRoundTimeoutMs = parsePositiveInt('SW_CRITIQUE_PER_ROUND_TIMEOUT_MS', env['SW_CRITIQUE_PER_ROUND_TIMEOUT_MS'], defaults.perRoundTimeoutMs);
  const totalTimeoutMs = parsePositiveInt('SW_CRITIQUE_TOTAL_TIMEOUT_MS', env['SW_CRITIQUE_TOTAL_TIMEOUT_MS'], defaults.totalTimeoutMs);
  const parserMaxBlockBytes = parsePositiveInt('SW_CRITIQUE_PARSER_MAX_BLOCK_BYTES', env['SW_CRITIQUE_PARSER_MAX_BLOCK_BYTES'], defaults.parserMaxBlockBytes);
  const fallbackPolicy = parseFallbackPolicy(env['SW_CRITIQUE_FALLBACK_POLICY'], defaults.fallbackPolicy);

  // Cross-field validation: threshold cannot exceed scale.
  if (scoreThreshold > scoreScale + 1e-9) {
    throw new RangeError(
      `SW_CRITIQUE_SCORE_THRESHOLD (${scoreThreshold}) must be <= SW_CRITIQUE_SCORE_SCALE (${scoreScale})`,
    );
  }

  return {
    ...defaults,
    enabled,
    maxRounds,
    scoreThreshold,
    scoreScale,
    perRoundTimeoutMs,
    totalTimeoutMs,
    parserMaxBlockBytes,
    fallbackPolicy,
  };
}

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

function parseEnabled(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined) return fallback;
  const v = raw.trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes';
}

function parsePositiveInt(key: string, raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) {
    throw new RangeError(
      `${key} must be a positive integer, got "${raw}"`,
    );
  }
  return n;
}

function parseNonNegativeFloat(key: string, raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    throw new RangeError(
      `${key} must be a non-negative finite number, got "${raw}"`,
    );
  }
  return n;
}

function parseFallbackPolicy(
  raw: string | undefined,
  fallback: CritiqueConfig['fallbackPolicy'],
): CritiqueConfig['fallbackPolicy'] {
  if (raw === undefined) return fallback;
  const trimmed = raw.trim();
  if (FALLBACK_POLICIES.includes(trimmed as CritiqueConfig['fallbackPolicy'])) {
    return trimmed as CritiqueConfig['fallbackPolicy'];
  }
  throw new RangeError(
    `SW_CRITIQUE_FALLBACK_POLICY must be one of ${FALLBACK_POLICIES.join(', ')}, got "${raw}"`,
  );
}
