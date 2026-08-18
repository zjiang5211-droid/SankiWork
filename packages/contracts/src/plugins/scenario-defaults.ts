// Default scenario plugin bindings (plan §3.3 of plugin-driven-flow-plan).
//
// Both the web client (`EntryShell.handleCreate`) and the daemon
// (`/api/projects` + `/api/runs`) need to know which bundled scenario
// plugin to bind when the caller didn't pick one explicitly. Keeping
// the mapping in contracts lets both sides import the same table so the
// client and the server never disagree about what counts as the
// "default" plugin for a given project kind / task kind.
//
// Kind → scenario plugin mapping. Surfaces that have a battle-tested
// bundled skill+template (decks, web prototypes) point to the
// specialised plugin so the agent gets a real seed (`assets/template.html`),
// a layout vocabulary (`references/layouts.md`), and a P0 checklist —
// instead of routing through the generic sw-new-generation router and
// re-inventing every slide/section's CSS from scratch. The latter is
// the root cause of decks that overflow the 1080px canvas, mismatched
// type scales, and "different aesthetic every turn" drift.
//
// Generic / catch-all kinds (template, other) keep sw-new-generation,
// which runs discovery → plan → generate → critique without a
// surface-specific seed. Media kinds keep sw-media-generation, which
// dispatches through the media contract instead of emitting HTML.

import type { ProjectKind, ProjectMetadata } from '../api/projects.js';
import type { AppliedPluginSnapshot } from './apply.js';

export type TaskKind = AppliedPluginSnapshot['taskKind'];

// Plugin ids the kind/task-kind defaults can resolve to. Two tiers:
//   1. `od-*` scenarios (under `plugins/_official/scenarios/`) — generic
//      routers / pipelines without per-surface templates.
//   2. `example-*` scenarios (under `plugins/_official/examples/`) —
//      specialised bundled skills that ship a seed template + layout
//      vocabulary + checklist. Promoted to first-class defaults here so
//      the chip rail / project create paths bind them without the user
//      having to manually pick the skill.
// Kept as a string-literal union so a typo surfaces as a type error in
// both the web shell and the daemon resolver.
export type DefaultScenarioPluginId =
  | 'sw-default'
  | 'sw-new-generation'
  | 'sw-media-generation'
  | 'sw-plugin-authoring'
  | 'sw-figma-migration'
  | 'sw-code-migration'
  | 'sw-tune-collab'
  | 'example-live-artifact'
  | 'example-simple-deck'
  | 'example-web-clone'
  | 'example-web-prototype';

export const DEFAULT_UNSELECTED_SCENARIO_PLUGIN_ID =
  'sw-default' satisfies DefaultScenarioPluginId;

export const DEFAULT_SCENARIO_PLUGIN_BY_KIND: Record<ProjectKind, DefaultScenarioPluginId> = {
  // Prototypes bind to web-prototype's seed template (single-file HTML,
  // 1280×800 frame, section layouts library, P0 checklist).
  prototype: 'example-web-prototype',
  // Decks bind to simple-deck's seed (1920×1080 canvas, 8-pattern
  // layout vocabulary including cover / body / big-stat / pipeline /
  // closing, plus an overflow checklist that catches the
  // "headline + subtitle + absolute footer" collision).
  deck:      'example-simple-deck',
  template:  'sw-new-generation',
  brand:     'sw-new-generation',
  image:     'sw-media-generation',
  video:     'sw-media-generation',
  audio:     'sw-media-generation',
  other:     'sw-new-generation',
};

export const DEFAULT_SCENARIO_PLUGIN_BY_TASK_KIND: Record<TaskKind, DefaultScenarioPluginId> = {
  'new-generation':  'sw-new-generation',
  'figma-migration': 'sw-figma-migration',
  'code-migration':  'sw-code-migration',
  'tune-collab':     'sw-tune-collab',
};

export function defaultScenarioPluginIdForKind(
  kind: ProjectKind | undefined,
): DefaultScenarioPluginId | null {
  if (!kind) return null;
  return DEFAULT_SCENARIO_PLUGIN_BY_KIND[kind] ?? null;
}

export function defaultScenarioPluginIdForProjectMetadata(
  metadata: Pick<ProjectMetadata, 'kind' | 'intent'> | null | undefined,
): DefaultScenarioPluginId | null {
  if (metadata?.intent === 'live-artifact') return 'example-live-artifact';
  if (metadata?.intent === 'web-clone') return 'example-web-clone';
  return defaultScenarioPluginIdForKind(metadata?.kind);
}

export function defaultScenarioPluginIdForTaskKind(
  taskKind: TaskKind | undefined,
): DefaultScenarioPluginId | null {
  if (!taskKind) return null;
  return DEFAULT_SCENARIO_PLUGIN_BY_TASK_KIND[taskKind] ?? null;
}
