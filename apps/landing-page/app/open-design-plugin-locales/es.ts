import type { SankiWorkPluginCopy } from '../open-design-plugin-i18n';

const es: SankiWorkPluginCopy = {
  metadata: {
    title: 'SankiWork para Codex/ChatGPT | Instala el plugin SankiWork Cloud',
    description:
      'Instala SankiWork Cloud en Codex/ChatGPT y crea sitios web, presentaciones, prototipos y sistemas de diseño desde la misma tarea.',
    keywords:
      'plugin de SankiWork para Codex, plugin para ChatGPT desktop, instalar plugin de Codex, SankiWork Cloud, plugin de diseño para Codex, Codex MCP',
  },
  hero: {
    title: 'Plugin de SankiWork para Codex/ChatGPT',
    leadBefore: 'Introduce la siguiente instrucción en cualquier tarea de tu',
    chatgptLabel: 'aplicación de escritorio de ChatGPT',
    installAria: 'Instalar SankiWork Cloud en Codex/ChatGPT',
    copy: 'Copiar',
    github: 'Ver la guía de instalación en GitHub ↗',
  },
  demo: {
    title: 'Instálalo una vez. Crea desde Codex/ChatGPT.',
    lead:
      'Conoce primero el espacio de trabajo completo de Codex y SankiWork y, después, sigue la secuencia real desde la instalación hasta el resultado.',
    overviewAlt:
      'Una tarea real de Codex que usa el plugin de SankiWork junto al sitio web terminado de la cafetería Goodfield',
    overviewLabel: 'Tarea real de Codex',
    overviewCaption:
      'El prompt, la transferencia a SankiWork, los archivos generados y el sitio web terminado permanecen visibles en un único espacio de trabajo.',
    stepListAria: 'Las cinco etapas de una ejecución real del plugin en Codex',
    installPhase: 'Instalar',
    installTitle: 'Pide a Codex que lo instale',
    installBody:
      'Pega esta instrucción en una tarea de Codex. Codex añade la fuente canónica del marketplace de Git, instala el plugin solo si falta y completa la configuración del MCP local sin exigir que esté publicado en un catálogo público.',
    installNote:
      'Pégala una vez en Codex: los detalles de la instalación se gestionan por ti.',
    steps: [
      {
        phase: 'Usar',
        title: 'Inicia una nueva tarea de Codex',
        body:
          'Cuando Codex termine la instalación, abre el plugin de SankiWork instalado en la nueva tarea y elige «Try now» para empezar.',
        alt:
          'Pantalla real del plugin de SankiWork en Codex con el botón Try now',
      },
      {
        phase: 'Crear',
        title: 'Escribe el brief de diseño',
        body:
          'Menciona SankiWork y describe el entregable, el contenido, la dirección visual y los requisitos de adaptación a distintas pantallas.',
        alt:
          'Prompt real de Codex que pide a SankiWork crear el sitio web acogedor de una cafetería de barrio',
      },
      {
        phase: 'Crear',
        title: 'Sigue la transferencia en tiempo real',
        body:
          'Codex confirma la dirección, crea el proyecto y transfiere el trabajo a SankiWork mientras los archivos aparecen en tiempo real.',
        alt:
          'Espacio de trabajo real de Codex y SankiWork mientras se genera el sitio web de la cafetería de barrio',
      },
      {
        phase: 'Crear',
        title: 'Revisa el resultado',
        body:
          'La misma tarea devuelve la landing page adaptable de la cafetería Goodfield, las imágenes generadas y los archivos editables.',
        alt:
          'Landing page terminada de la cafetería de barrio Goodfield, generada mediante el plugin de SankiWork en Codex',
      },
    ],
  },
  use: {
    title: 'Empieza con el prompt exacto.',
    lead:
      'Selecciona SankiWork en el menú de plugins de Codex, describe lo que quieres crear y sigue refinándolo desde la misma tarea. Codex muestra la mención del plugin como una etiqueta de SankiWork.',
    promptLabel: 'Prompt utilizado en la tarea de Codex registrada',
    copyPrompt: 'Copiar el prompt de Codex',
    galleryAria: 'Ejemplos creados con SankiWork',
    templates: [
      {
        alt:
          'Landing page de producto de Oryzo con una base de corte táctil y un objeto de corcho',
        label: 'Lanzamiento de producto',
      },
      {
        alt:
          'Landing page del evento SankiWork Osaka con un mapa tipográfico',
        label: 'Página de evento',
      },
      {
        alt: 'Sitio web de producto editorial y oscuro de Fable 5',
        label: 'Sitio editorial',
      },
      {
        alt:
          'Interfaz de cronología de modelos de SankiWork sobre un lienzo luminoso',
        label: 'Historia interactiva',
      },
    ],
    promptListAria: 'Ejemplos de prompts para SankiWork Cloud',
    prompts: [
      { title: 'Sitio web' },
      { title: 'Presentaciones' },
      { title: 'Prototipo' },
      { title: 'Sistema de diseño' },
    ],
  },
  faq: {
    title: 'Preguntas antes de instalar',
    lead:
      'Codex mantiene el control de la tarea. SankiWork se encarga del flujo de trabajo visual.',
    items: [
      {
        q: '¿Qué añade el plugin a Codex?',
        a:
          'Proporciona a Codex un flujo de trabajo de SankiWork para crear sitios web, presentaciones, prototipos y sistemas de diseño. El plugin se conecta al SankiWork MCP local para gestionar briefs, proyectos y la generación de entregables.',
      },
      {
        q: '¿Qué productos de Codex son compatibles?',
        a:
          'El paquete actual es compatible con Codex Desktop y Codex CLI. Codex es el primer entorno compatible.',
      },
      {
        q: '¿Qué necesito antes de instalarlo?',
        a:
          'Usa Codex CLI 0.144.6 o una versión posterior y SankiWork 0.17.0 o una versión posterior. Instala SankiWork antes de registrar su MCP local.',
      },
      {
        q: '¿Por qué necesito una nueva tarea de Codex?',
        a:
          'Codex carga las capacidades del plugin y del MCP al iniciar una tarea. Una nueva tarea detectará el plugin SankiWork Cloud recién instalado.',
      },
      {
        q: '¿La ventana de SankiWork debe permanecer abierta?',
        a:
          'No. El MCP local registrado puede iniciar el entorno firmado de SankiWork en segundo plano cuando sea necesario.',
      },
    ],
  },
  final: {
    aria: 'Instalar SankiWork Cloud en Codex/ChatGPT',
    title: 'Lleva SankiWork a tu próxima tarea de Codex/ChatGPT.',
    bodyBeforeMention: 'Instala el plugin, conecta el MCP local e invoca',
    bodyAfterMention: '.',
    copy: 'Copiar',
    download: 'Descargar SankiWork',
    source: 'Ver el código fuente',
  },
  clipboard: {
    copying: 'Copiando…',
    copied: 'Copiado',
    failed: 'Selecciona y copia',
  },
  schema: {
    pageName: 'Plugin de SankiWork Cloud para Codex/ChatGPT',
    applicationName: 'Plugin de SankiWork Cloud para Codex/ChatGPT',
  },
};

export default es;
