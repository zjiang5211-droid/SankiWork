/*
 * SankiWork plugin page — complete locale registry.
 *
 * Unlike older DeepPartial page models, every locale here must satisfy the
 * full English copy shape. That makes omissions, missing FAQ entries and
 * array-length drift fail at typecheck time instead of silently falling back.
 */
import type { LandingLocaleCode } from '../i18n';
import type { SankiWorkPluginCopy } from '../sankiwork-plugin-i18n';

import zh from './zh';
import ja from './ja';
import ko from './ko';
import de from './de';
import fr from './fr';
import ru from './ru';
import es from './es';
import ptBr from './pt-br';
import it from './it';
import tr from './tr';

export const SANKIWORK_PLUGIN_TRANSLATIONS: Partial<
  Record<LandingLocaleCode, SankiWorkPluginCopy>
> = {
  zh,
  ja,
  ko,
  de,
  fr,
  ru,
  es,
  'pt-br': ptBr,
  it,
  tr,
};
