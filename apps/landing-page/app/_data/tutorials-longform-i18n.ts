/*
 * Per-tutorial localized long-form content (index).
 *
 * Non-English tutorial detail pages render `bodyHtml` from this store; the page
 * prefers a match here and falls back to the generic placeholder when a locale
 * is missing, so short catalogue entries are untouched. English renders from the
 * Markdown source via `<Content />` and is not stored here.
 *
 * Each article's localized content lives in its own shard file under
 * `./tutorials-longform/<slug>.ts` (keeps every changed file well under the 1 MiB CI blob
 * guard). This index merges the shards. Locale keys match `LANDING_LOCALES`
 * (see `app/i18n.ts`); retired locales are never stored.
 */

export interface LocalizedTutorialContent {
  title: string;
  summary: string;
  bodyHtml: string;
}

export type TutorialLongformI18n = Record<
  string,
  Partial<Record<string, LocalizedTutorialContent>>
>;

import { entry as e_sankiwork_31_skills_72_systems_popular_ai } from './tutorials-longform/sankiwork-31-skills-72-systems-popular-ai';
import { entry as e_sankiwork_claude_design_alternative_local_ai_fire_academy } from './tutorials-longform/sankiwork-claude-design-alternative-local-ai-fire-academy';
import { entry as e_sankiwork_claude_design_alternative_open_source_brendan_o_connell } from './tutorials-longform/sankiwork-claude-design-alternative-open-source-brendan-o-connell';
import { entry as e_sankiwork_design_engine_codedigipt } from './tutorials-longform/sankiwork-design-engine-codedigipt';
import { entry as e_sankiwork_feature_tour_silicon_hotpot } from './tutorials-longform/sankiwork-feature-tour-silicon-hotpot';
import { entry as e_sankiwork_free_claude_alternative_local_compile_future } from './tutorials-longform/sankiwork-free-claude-alternative-local-compile-future';
import { entry as e_sankiwork_free_claude_alternative_local_dylan_michael_ai_automation } from './tutorials-longform/sankiwork-free-claude-alternative-local-dylan-michael-ai-automation';
import { entry as e_sankiwork_full_overview_vs_figma_purpleschool_anton_larichev } from './tutorials-longform/sankiwork-full-overview-vs-figma-purpleschool-anton-larichev';
import { entry as e_sankiwork_full_walkthrough_self_hosted_alternative_ai_stack_engineer } from './tutorials-longform/sankiwork-full-walkthrough-self-hosted-alternative-ai-stack-engineer';
import { entry as e_sankiwork_in_20_minutes_coding_menace } from './tutorials-longform/sankiwork-in-20-minutes-coding-menace';
import { entry as e_sankiwork_install_demo_systems_chase_ai } from './tutorials-longform/sankiwork-install-demo-systems-chase-ai';
import { entry as e_sankiwork_local_setup_ollama_alternative_ai_automation_station } from './tutorials-longform/sankiwork-local-setup-ollama-alternative-ai-automation-station';
import { entry as e_sankiwork_sankiwork_vs_claude_design_demo_justyn_the_ai_guy } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-demo-justyn-the-ai-guy';
import { entry as e_sankiwork_sankiwork_vs_claude_design_first_look_community } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-first-look-community';
import { entry as e_sankiwork_sankiwork_vs_claude_design_free_alternative_ai_fusion } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-free-alternative-ai-fusion';
import { entry as e_sankiwork_sankiwork_vs_claude_design_landing_page_roy_shavit } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-landing-page-roy-shavit';
import { entry as e_sankiwork_sankiwork_vs_claude_design_setup_eli_rigobeli_ai } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-setup-eli-rigobeli-ai';
import { entry as e_sankiwork_open_source_alternative_claude_design_nyndra_ai } from './tutorials-longform/sankiwork-open-source-alternative-claude-design-nyndra-ai';
import { entry as e_sankiwork_open_source_alternative_claude_design_tony_xhepa } from './tutorials-longform/sankiwork-open-source-alternative-claude-design-tony-xhepa';
import { entry as e_sankiwork_open_source_alternative_comparison_where_do_i_click } from './tutorials-longform/sankiwork-open-source-alternative-comparison-where-do-i-click';
import { entry as e_sankiwork_open_source_alternative_vs_claude_design_ai_teaches_better } from './tutorials-longform/sankiwork-open-source-alternative-vs-claude-design-ai-teaches-better';
import { entry as e_sankiwork_open_source_claude_alternative_aicodeking } from './tutorials-longform/sankiwork-open-source-claude-alternative-aicodeking';
import { entry as e_sankiwork_open_source_tools_roundup_chase_ai } from './tutorials-longform/sankiwork-open-source-tools-roundup-chase-ai';
import { entry as e_sankiwork_overview_worldofai } from './tutorials-longform/sankiwork-overview-worldofai';
import { entry as e_sankiwork_replacing_claude_design_jack_roberts } from './tutorials-longform/sankiwork-replacing-claude-design-jack-roberts';
import { entry as e_sankiwork_revolutionary_approach_01coder } from './tutorials-longform/sankiwork-revolutionary-approach-01coder';
import { entry as e_sankiwork_setup_gemini_cli_free_credits_sandeep_singh } from './tutorials-longform/sankiwork-setup-gemini-cli-free-credits-sandeep-singh';
import { entry as e_sankiwork_vibe_coders_dream_sean_kochel } from './tutorials-longform/sankiwork-vibe-coders-dream-sean-kochel';
import { entry as e_sankiwork_vs_claude_design_better_stack } from './tutorials-longform/sankiwork-vs-claude-design-better-stack';
import { entry as e_sankiwork_vs_claude_design_comparison_panda_making_money } from './tutorials-longform/sankiwork-vs-claude-design-comparison-panda-making-money';
import { entry as e_sankiwork_windows_wsl_installation_setup_ai_automation } from './tutorials-longform/sankiwork-windows-wsl-installation-setup-ai-automation';
import { entry as e_sankiwork_sankiwork_vs_claude_design_jeremy_de_campos } from './tutorials-longform/sankiwork-sankiwork-vs-claude-design-jeremy-de-campos';
import { entry as e_sankiwork_claude_design_rebuild_beginner_assets_parth_jadav } from './tutorials-longform/sankiwork-claude-design-rebuild-beginner-assets-parth-jadav';
import { entry as e_sankiwork_claude_alternative_wordpress_design_dan_davies } from './tutorials-longform/sankiwork-claude-alternative-wordpress-design-dan-davies';
import { entry as e_sankiwork_free_open_source_alternative_code_a_program } from './tutorials-longform/sankiwork-free-open-source-alternative-code-a-program';
import { entry as e_sankiwork_cloud_deployment_sealos_sealos } from './tutorials-longform/sankiwork-cloud-deployment-sealos-sealos';
import { entry as e_sankiwork_instalacao_alternativa_gratis_fabricando_sua_ideia_tutoriais } from './tutorials-longform/sankiwork-instalacao-alternativa-gratis-fabricando-sua-ideia-tutoriais';
import { entry as e_sankiwork_open_source_ai_design_overview_ai } from './tutorials-longform/sankiwork-open-source-ai-design-overview-ai';
import { entry as e_sankiwork_install_setup_free_alternative_ai_unlocked } from './tutorials-longform/sankiwork-install-setup-free-alternative-ai-unlocked';
import { entry as e_sankiwork_alternativa_gratis_claude_design_maestros_da_ia } from './tutorials-longform/sankiwork-alternativa-gratis-claude-design-maestros-da-ia';

export const tutorialsLongformI18n: TutorialLongformI18n = {
  "sankiwork-31-skills-72-systems-popular-ai": e_sankiwork_31_skills_72_systems_popular_ai,
  "sankiwork-claude-design-alternative-local-ai-fire-academy": e_sankiwork_claude_design_alternative_local_ai_fire_academy,
  "sankiwork-claude-design-alternative-open-source-brendan-o-connell": e_sankiwork_claude_design_alternative_open_source_brendan_o_connell,
  "sankiwork-design-engine-codedigipt": e_sankiwork_design_engine_codedigipt,
  "sankiwork-feature-tour-silicon-hotpot": e_sankiwork_feature_tour_silicon_hotpot,
  "sankiwork-free-claude-alternative-local-compile-future": e_sankiwork_free_claude_alternative_local_compile_future,
  "sankiwork-free-claude-alternative-local-dylan-michael-ai-automation": e_sankiwork_free_claude_alternative_local_dylan_michael_ai_automation,
  "sankiwork-full-overview-vs-figma-purpleschool-anton-larichev": e_sankiwork_full_overview_vs_figma_purpleschool_anton_larichev,
  "sankiwork-full-walkthrough-self-hosted-alternative-ai-stack-engineer": e_sankiwork_full_walkthrough_self_hosted_alternative_ai_stack_engineer,
  "sankiwork-in-20-minutes-coding-menace": e_sankiwork_in_20_minutes_coding_menace,
  "sankiwork-install-demo-systems-chase-ai": e_sankiwork_install_demo_systems_chase_ai,
  "sankiwork-local-setup-ollama-alternative-ai-automation-station": e_sankiwork_local_setup_ollama_alternative_ai_automation_station,
  "sankiwork-sankiwork-vs-claude-design-demo-justyn-the-ai-guy": e_sankiwork_sankiwork_vs_claude_design_demo_justyn_the_ai_guy,
  "sankiwork-sankiwork-vs-claude-design-first-look-community": e_sankiwork_sankiwork_vs_claude_design_first_look_community,
  "sankiwork-sankiwork-vs-claude-design-free-alternative-ai-fusion": e_sankiwork_sankiwork_vs_claude_design_free_alternative_ai_fusion,
  "sankiwork-sankiwork-vs-claude-design-landing-page-roy-shavit": e_sankiwork_sankiwork_vs_claude_design_landing_page_roy_shavit,
  "sankiwork-sankiwork-vs-claude-design-setup-eli-rigobeli-ai": e_sankiwork_sankiwork_vs_claude_design_setup_eli_rigobeli_ai,
  "sankiwork-open-source-alternative-claude-design-nyndra-ai": e_sankiwork_open_source_alternative_claude_design_nyndra_ai,
  "sankiwork-open-source-alternative-claude-design-tony-xhepa": e_sankiwork_open_source_alternative_claude_design_tony_xhepa,
  "sankiwork-open-source-alternative-comparison-where-do-i-click": e_sankiwork_open_source_alternative_comparison_where_do_i_click,
  "sankiwork-open-source-alternative-vs-claude-design-ai-teaches-better": e_sankiwork_open_source_alternative_vs_claude_design_ai_teaches_better,
  "sankiwork-open-source-claude-alternative-aicodeking": e_sankiwork_open_source_claude_alternative_aicodeking,
  "sankiwork-open-source-tools-roundup-chase-ai": e_sankiwork_open_source_tools_roundup_chase_ai,
  "sankiwork-overview-worldofai": e_sankiwork_overview_worldofai,
  "sankiwork-replacing-claude-design-jack-roberts": e_sankiwork_replacing_claude_design_jack_roberts,
  "sankiwork-revolutionary-approach-01coder": e_sankiwork_revolutionary_approach_01coder,
  "sankiwork-setup-gemini-cli-free-credits-sandeep-singh": e_sankiwork_setup_gemini_cli_free_credits_sandeep_singh,
  "sankiwork-vibe-coders-dream-sean-kochel": e_sankiwork_vibe_coders_dream_sean_kochel,
  "sankiwork-vs-claude-design-better-stack": e_sankiwork_vs_claude_design_better_stack,
  "sankiwork-vs-claude-design-comparison-panda-making-money": e_sankiwork_vs_claude_design_comparison_panda_making_money,
  "sankiwork-windows-wsl-installation-setup-ai-automation": e_sankiwork_windows_wsl_installation_setup_ai_automation,
  "sankiwork-sankiwork-vs-claude-design-jeremy-de-campos": e_sankiwork_sankiwork_vs_claude_design_jeremy_de_campos,
  "sankiwork-claude-design-rebuild-beginner-assets-parth-jadav": e_sankiwork_claude_design_rebuild_beginner_assets_parth_jadav,
  "sankiwork-claude-alternative-wordpress-design-dan-davies": e_sankiwork_claude_alternative_wordpress_design_dan_davies,
  "sankiwork-free-open-source-alternative-code-a-program": e_sankiwork_free_open_source_alternative_code_a_program,
  "sankiwork-cloud-deployment-sealos-sealos": e_sankiwork_cloud_deployment_sealos_sealos,
  "sankiwork-instalacao-alternativa-gratis-fabricando-sua-ideia-tutoriais": e_sankiwork_instalacao_alternativa_gratis_fabricando_sua_ideia_tutoriais,
  "sankiwork-open-source-ai-design-overview-ai": e_sankiwork_open_source_ai_design_overview_ai,
  "sankiwork-install-setup-free-alternative-ai-unlocked": e_sankiwork_install_setup_free_alternative_ai_unlocked,
  "sankiwork-alternativa-gratis-claude-design-maestros-da-ia": e_sankiwork_alternativa_gratis_claude_design_maestros_da_ia,
};

export function getLocalizedTutorial(
  slug: string,
  locale: string,
): LocalizedTutorialContent | undefined {
  return tutorialsLongformI18n[slug]?.[locale];
}
