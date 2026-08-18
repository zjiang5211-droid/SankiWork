import assert from 'node:assert/strict';
import { test } from 'vitest';
import {
  sankiWorkAmrRunAttempt,
  sankiWorkAmrTraceEnv,
} from '../../src/runtimes/env.js';

test('sankiWorkAmrRunAttempt counts automatic retries and manual recharge resumes', () => {
  assert.equal(
    sankiWorkAmrRunAttempt({
      retryAttemptCount: 2,
      manualResumeAttemptCount: 1,
    }),
    3,
  );
  assert.equal(
    sankiWorkAmrRunAttempt({
      manualResumeAttemptCount: 1,
    }),
    1,
  );
});

test('sankiWorkAmrTraceEnv builds SankiWork trace identity env for AMR only', () => {
  const amrEnv = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: ' run_trace_123 ',
    runAttempt: 2,
    conversationId: ' conversation_trace_456 ',
  });

  assert.equal(amrEnv.SANKIWORK_RUN_ID, 'run_trace_123');
  assert.equal(amrEnv.SANKIWORK_RUN_ATTEMPT, '2');
  assert.equal(amrEnv.SANKIWORK_SESSION_ID, 'conversation_trace_456');

  const claudeEnv = sankiWorkAmrTraceEnv({
    agentId: 'claude',
    runId: 'run_trace_123',
    runAttempt: 2,
    conversationId: 'conversation_trace_456',
  });

  assert.deepEqual(claudeEnv, {});
});

test('sankiWorkAmrTraceEnv omits optional AMR session trace env when no conversation exists', () => {
  const env = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_no_session',
    runAttempt: 0,
  });

  assert.equal(env.SANKIWORK_RUN_ID, 'run_trace_no_session');
  assert.equal(env.SANKIWORK_RUN_ATTEMPT, '0');
  assert.equal(env.SANKIWORK_SESSION_ID, undefined);
});

test('sankiWorkAmrTraceEnv fails fast on invalid AMR trace inputs', () => {
  assert.throws(
    () => sankiWorkAmrTraceEnv({ agentId: 'amr', runId: ' ', runAttempt: 0 }),
    /SANKIWORK_RUN_ID/,
  );
  assert.throws(
    () => sankiWorkAmrTraceEnv({ agentId: 'amr', runId: 'run_trace', runAttempt: -1 }),
    /SANKIWORK_RUN_ATTEMPT/,
  );
});

// Vela's workspace-credit isolation (spec: workspace-scoped wallet and
// credit isolation) attributes an AMR spend by the SANKIWORK_WORKSPACE_ID
// env the daemon forwards to the vela CLI, which the CLI turns into
// `X-SankiWork-Workspace-Id` + `x-vela-workspace-id` request headers.
test('sankiWorkAmrTraceEnv forwards an exact persisted workspace id for AMR runs', () => {
  const env = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_team',
    runAttempt: 0,
    workspaceId: ' workspace_team_123 ',
  });

  assert.equal(env.SANKIWORK_WORKSPACE_ID, 'workspace_team_123');
});

test('sankiWorkAmrTraceEnv forwards a persisted Personal workspace id too', () => {
  const env = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_personal',
    runAttempt: 0,
    workspaceId: ' workspace_personal_123 ',
  });
  assert.equal(env.SANKIWORK_WORKSPACE_ID, 'workspace_personal_123');
});

// Null/undefined/blank means the caller found no persisted binding at all.
// Only that genuinely unbound historical-project case omits the env var.
test('sankiWorkAmrTraceEnv omits SANKIWORK_WORKSPACE_ID only without a persisted binding', () => {
  const withNull = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_unbound',
    runAttempt: 0,
    workspaceId: null,
  });
  assert.equal('SANKIWORK_WORKSPACE_ID' in withNull, false);

  const withUndefined = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_unbound_2',
    runAttempt: 0,
  });
  assert.equal('SANKIWORK_WORKSPACE_ID' in withUndefined, false);

  const withBlank = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_unbound_3',
    runAttempt: 0,
    workspaceId: '   ',
  });
  assert.equal('SANKIWORK_WORKSPACE_ID' in withBlank, false);
});

test('sankiWorkAmrTraceEnv never forwards workspaceId for non-AMR agents', () => {
  const env = sankiWorkAmrTraceEnv({
    agentId: 'claude',
    runId: 'run_trace_123',
    runAttempt: 0,
    workspaceId: 'workspace_team_123',
  });
  assert.deepEqual(env, {});
});

test('sankiWorkAmrTraceEnv forwards only bounded plugin correlation to Vela', () => {
  const env = sankiWorkAmrTraceEnv({
    agentId: 'amr',
    runId: 'run_trace_plugin',
    runAttempt: 0,
    externalPluginAnalytics: {
      pluginWorkflowId: '018f6f2e-4444-7444-8444-444444444444',
      logicalRequestDigest: 'a'.repeat(64),
      logicalRequestDigestVersion: 1,
      externalPluginId: 'sankiwork',
      externalPluginVersion: '0.4.0',
      distributionMechanism: 'git_marketplace',
      publisherClass: 'sankiwork_first_party',
      apiKey: 'must-not-forward',
      accountId: 'must-not-forward',
    },
  });

  assert.equal(
    env.SANKIWORK_PLUGIN_WORKFLOW_ID,
    '018f6f2e-4444-7444-8444-444444444444',
  );
  assert.equal(env.SANKIWORK_LOGICAL_REQUEST_DIGEST, 'a'.repeat(64));
  assert.equal(env.SANKIWORK_LOGICAL_REQUEST_DIGEST_VERSION, '1');
  assert.equal(env.SANKIWORK_EXTERNAL_PLUGIN_ID, 'sankiwork');
  assert.equal(env.SANKIWORK_EXTERNAL_PLUGIN_VERSION, '0.4.0');
  assert.equal(env.SANKIWORK_DISTRIBUTION_MECHANISM, 'git_marketplace');
  assert.equal(
    env.SANKIWORK_PUBLISHER_CLASS,
    'sankiwork_first_party',
  );
  assert.equal(env.SANKIWORK_API_KEY, undefined);
  assert.equal(env.SANKIWORK_ACCOUNT_ID, undefined);
});
