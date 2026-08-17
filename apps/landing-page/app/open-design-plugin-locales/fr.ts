import type { SankiWorkPluginCopy } from '../open-design-plugin-i18n';

const copy: SankiWorkPluginCopy = {
  metadata: {
    title: 'SankiWork pour Codex/ChatGPT | Installer le plugin SankiWork Cloud',
    description:
      'Installez SankiWork Cloud dans Codex/ChatGPT et créez des sites web, des présentations, des prototypes et des systèmes de design depuis la même tâche.',
    keywords:
      'plugin SankiWork pour Codex, plugin ChatGPT desktop, installation plugin Codex, SankiWork Cloud, plugin design Codex, Codex MCP',
  },
  hero: {
    title: 'Plugin SankiWork pour Codex/ChatGPT',
    leadBefore: 'Saisissez l’instruction ci-dessous dans n’importe quelle tâche de votre',
    chatgptLabel: 'application de bureau ChatGPT',
    installAria: 'Installer SankiWork Cloud dans Codex/ChatGPT',
    copy: 'Copier',
    github: 'Voir le guide d’installation sur GitHub ↗',
  },
  demo: {
    title: 'Installez-le une fois. Créez depuis Codex/ChatGPT.',
    lead:
      'Découvrez d’abord l’espace de travail complet entre Codex et SankiWork, puis suivez le parcours réel, de l’installation au résultat.',
    overviewAlt:
      'Une véritable tâche Codex utilisant le plugin SankiWork à côté du site web final du café Goodfield',
    overviewLabel: 'Véritable tâche Codex',
    overviewCaption:
      'Le prompt, le transfert vers SankiWork, les fichiers générés et le site final restent visibles dans un même espace de travail.',
    stepListAria: 'Les cinq étapes du véritable parcours du plugin dans Codex',
    installPhase: 'Installation',
    installTitle: 'Demandez à Codex de l’installer',
    installBody:
      'Collez cette instruction dans une tâche Codex. Codex ajoute la source Git canonique de la marketplace, installe le plugin uniquement s’il est absent et finalise la configuration du MCP local sans nécessiter de référencement dans un catalogue public.',
    installNote:
      'Collez-la une seule fois dans Codex : les détails de l’installation sont pris en charge pour vous.',
    steps: [
      {
        phase: 'Utilisation',
        title: 'Démarrez une nouvelle tâche Codex',
        body:
          'Une fois l’installation terminée par Codex, ouvrez le plugin SankiWork installé dans la nouvelle tâche et choisissez « Try now » pour commencer.',
        alt:
          'L’écran réel du plugin SankiWork dans Codex, avec le bouton Try now',
      },
      {
        phase: 'Création',
        title: 'Rédigez le brief créatif',
        body:
          'Mentionnez SankiWork, puis décrivez le livrable, le contenu, la direction visuelle et les exigences de responsive design.',
        alt:
          'Un véritable prompt Codex demandant à SankiWork de créer le site web chaleureux d’un café de quartier',
      },
      {
        phase: 'Création',
        title: 'Suivez le transfert en direct',
        body:
          'Codex confirme la direction, crée le projet et transmet le travail à SankiWork pendant que les fichiers apparaissent en direct.',
        alt:
          'Un véritable espace de travail Codex et SankiWork pendant la génération du site web du café de quartier',
      },
      {
        phase: 'Création',
        title: 'Examinez le résultat',
        body:
          'La même tâche renvoie la landing page responsive du café Goodfield, ainsi que ses images générées et ses fichiers modifiables.',
        alt:
          'La landing page finale du café de quartier Goodfield générée dans Codex avec le plugin SankiWork',
      },
    ],
  },
  use: {
    title: 'Commencez avec le prompt exact.',
    lead:
      'Sélectionnez SankiWork dans le menu des plugins de Codex, décrivez le livrable, puis continuez à l’affiner dans la même tâche. Codex affiche la mention du plugin sous forme de pastille SankiWork.',
    promptLabel: 'Prompt utilisé dans la tâche Codex enregistrée',
    copyPrompt: 'Copier le prompt Codex',
    galleryAria: 'Exemples créés avec SankiWork',
    templates: [
      {
        alt:
          'Landing page du produit Oryzo avec un tapis de découpe tactile et un objet en liège',
        label: 'Lancement de produit',
      },
      {
        alt:
          'Landing page de l’événement SankiWork Osaka avec une carte typographique',
        label: 'Page événementielle',
      },
      {
        alt: 'Site produit éditorial sombre de Fable 5',
        label: 'Site éditorial',
      },
      {
        alt:
          'Interface chronologique des modèles SankiWork sur une toile lumineuse',
        label: 'Récit interactif',
      },
    ],
    promptListAria: 'Exemples de prompts SankiWork Cloud',
    prompts: [
      { title: 'Site web' },
      { title: 'Présentations' },
      { title: 'Prototype' },
      { title: 'Système de design' },
    ],
  },
  faq: {
    title: 'Vos questions avant l’installation',
    lead:
      'Codex garde le contrôle de la tâche. SankiWork prend en charge le workflow visuel.',
    items: [
      {
        q: 'Qu’apporte le plugin à Codex ?',
        a:
          'Il ajoute à Codex un workflow SankiWork pour les sites web, les présentations, les prototypes et les systèmes de design. Le plugin se connecte à SankiWork MCP en local pour gérer les briefs, les projets et la génération des livrables.',
      },
      {
        q: 'Quels environnements Codex sont pris en charge ?',
        a:
          'Le package actuel prend en charge Codex Desktop et Codex CLI. Codex est le premier hôte pris en charge.',
      },
      {
        q: 'De quoi ai-je besoin avant l’installation ?',
        a:
          'Utilisez Codex CLI 0.144.6 ou une version ultérieure, ainsi que SankiWork 0.17.0 ou une version ultérieure. Installez SankiWork avant d’enregistrer son MCP local.',
      },
      {
        q: 'Pourquoi dois-je créer une nouvelle tâche Codex ?',
        a:
          'Codex charge les fonctionnalités du plugin et du MCP au démarrage d’une tâche. Une nouvelle tâche détecte le plugin SankiWork Cloud fraîchement installé.',
      },
      {
        q: 'La fenêtre SankiWork doit-elle rester ouverte ?',
        a:
          'Non. Le MCP local enregistré peut démarrer l’environnement SankiWork signé en mode headless lorsqu’il en a besoin.',
      },
    ],
  },
  final: {
    aria: 'Installer SankiWork Cloud dans Codex/ChatGPT',
    title: 'Ajoutez SankiWork à votre prochaine tâche Codex/ChatGPT.',
    bodyBeforeMention: 'Installez le plugin, connectez le MCP local et invoquez',
    bodyAfterMention: '.',
    copy: 'Copier',
    download: 'Télécharger SankiWork',
    source: 'Voir le code source',
  },
  clipboard: {
    copying: 'Copie…',
    copied: 'Copié',
    failed: 'Sélectionner et copier',
  },
  schema: {
    pageName: 'Plugin SankiWork Cloud pour Codex/ChatGPT',
    applicationName: 'Plugin SankiWork Cloud pour Codex/ChatGPT',
  },
};

export default copy;
