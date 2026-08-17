/*
 * Copy for the `/solutions/` index (overview) page — the hub that links to
 * every Solution sub-page (Use cases + Roles). Only the page's own chrome
 * lives here (label / heading / lead); each card's text is pulled from that
 * sub-page's own `getSolutionPageCopy` breadcrumb + description, and the two
 * group headings reuse the header nav labels (`nav.useCases` / `nav.roles`),
 * so there is a single source of truth per string.
 *
 * Keyed by every `LandingLocaleCode`; the `Record` type makes a missing
 * locale a typecheck error, matching the 18-locale guarantee the rest of the
 * landing i18n relies on.
 */
import type { LandingLocaleCode } from './i18n';

export interface SolutionsIndexCopy {
  /** Small kicker label above the H1. */
  label: string;
  /** Page H1. */
  heading: string;
  /** One-sentence intro under the H1. */
  lead: string;
}

const COPY: Record<LandingLocaleCode, SolutionsIndexCopy> = {
  en: {
    label: 'SOLUTION',
    heading: 'SankiWork solutions',
    lead: "Find the right way to use SankiWork — by what you're making, and by the role you play.",
  },
  zh: {
    label: '解决方案',
    heading: 'SankiWork 解决方案',
    lead: '找到最适合你的 SankiWork 使用方式——既可按你要构建的内容（使用场景）查找，也可按你的角色查找。',
  },
  'zh-tw': {
    label: '解決方案',
    heading: 'SankiWork 解決方案',
    lead: '依你要打造的內容、依你扮演的角色，找到最適合運用 SankiWork 的方式。',
  },
  ja: {
    label: 'ソリューション',
    heading: 'SankiWork のソリューション',
    lead: '作りたいもの（ユースケース）と、あなたの役割の両方から、SankiWork を活用する最適な方法を見つけましょう。',
  },
  ko: {
    label: '솔루션',
    heading: 'SankiWork 솔루션',
    lead: '만들려는 것과 맡은 역할에 따라 정리된, SankiWork를 활용하는 가장 알맞은 방법을 찾아보세요.',
  },
  de: {
    label: 'Lösung',
    heading: 'SankiWork Lösungen',
    lead: 'Finden Sie den passenden Weg, SankiWork zu nutzen – sortiert danach, was Sie entwickeln, und nach Ihrer Rolle.',
  },
  fr: {
    label: 'SOLUTION',
    heading: 'Solutions SankiWork',
    lead: "Trouvez la meilleure façon d'utiliser SankiWork — selon ce que vous créez et selon votre rôle.",
  },
  ru: {
    label: 'Решение',
    heading: 'Решения SankiWork',
    lead: 'Найдите подходящий способ использовать SankiWork — по тому, что вы создаёте, и по вашей роли.',
  },
  es: {
    label: 'SOLUCIÓN',
    heading: 'Soluciones de SankiWork',
    lead: 'Encuentra la mejor manera de usar SankiWork: según lo que estás creando y según tu rol.',
  },
  'pt-br': {
    label: 'Solução',
    heading: 'Soluções do SankiWork',
    lead: 'Encontre a maneira certa de usar o SankiWork — pelo que você está criando e pela função que você desempenha.',
  },
  it: {
    label: 'Soluzione',
    heading: 'Le soluzioni di SankiWork',
    lead: 'Trova il modo giusto di usare SankiWork, organizzato in base a ciò che stai creando e al ruolo che ricopri.',
  },
  vi: {
    label: 'Giải pháp',
    heading: 'Giải pháp SankiWork',
    lead: 'Tìm cách phù hợp để sử dụng SankiWork — theo những gì bạn đang xây dựng, và theo vai trò của bạn.',
  },
  pl: {
    label: 'Rozwiązanie',
    heading: 'Rozwiązania SankiWork',
    lead: 'Znajdź właściwy sposób korzystania z SankiWork — według tego, co tworzysz, i według roli, jaką pełnisz.',
  },
  id: {
    label: 'Solusi',
    heading: 'Solusi SankiWork',
    lead: 'Temukan cara yang tepat untuk menggunakan SankiWork — berdasarkan apa yang Anda buat, dan berdasarkan peran yang Anda jalankan.',
  },
  nl: {
    label: 'OPLOSSING',
    heading: 'SankiWork-oplossingen',
    lead: 'Vind de juiste manier om SankiWork te gebruiken — op basis van wat je maakt en van de rol die je vervult.',
  },
  ar: {
    label: 'حل',
    heading: 'حلول SankiWork',
    lead: 'اعثر على الطريقة المناسبة لاستخدام SankiWork — حسب ما تبنيه، وحسب الدور الذي تؤديه.',
  },
  tr: {
    label: 'Çözüm',
    heading: 'SankiWork çözümleri',
    lead: "SankiWork'ı kullanmanın doğru yolunu bulun — ne ürettiğinize ve hangi rolü üstlendiğinize göre.",
  },
  uk: {
    label: 'Рішення',
    heading: 'Рішення SankiWork',
    lead: 'Знайдіть свій спосіб використання SankiWork — за тим, що ви створюєте, і за вашою роллю.',
  },
};

export function getSolutionsIndexCopy(locale: LandingLocaleCode): SolutionsIndexCopy {
  return COPY[locale] ?? COPY.en;
}
