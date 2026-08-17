import type { SankiWorkPluginCopy } from '../open-design-plugin-i18n';

const copy: SankiWorkPluginCopy = {
  metadata: {
    title: 'SankiWork para Codex/ChatGPT | Instale o plugin SankiWork Cloud',
    description:
      'Instale o SankiWork Cloud no Codex/ChatGPT e crie sites, apresentações, protótipos e sistemas de design na mesma tarefa.',
    keywords:
      'plugin SankiWork para Codex, plugin para ChatGPT desktop, instalar plugin no Codex, SankiWork Cloud, plugin de design para Codex, Codex MCP',
  },
  hero: {
    title: 'Plugin SankiWork para Codex/ChatGPT',
    leadBefore: 'Insira a instrução abaixo em qualquer tarefa no seu',
    chatgptLabel: 'aplicativo ChatGPT para desktop',
    installAria: 'Instalar o SankiWork Cloud no Codex/ChatGPT',
    copy: 'Copiar',
    github: 'Ver o guia de instalação no GitHub ↗',
  },
  demo: {
    title: 'Instale uma vez. Crie no Codex/ChatGPT.',
    lead:
      'Veja primeiro o espaço de trabalho completo do Codex e do SankiWork e, depois, acompanhe a sequência real da instalação ao resultado.',
    overviewAlt:
      'Uma tarefa real no Codex usando o plugin SankiWork ao lado do site finalizado do café Goodfield',
    overviewLabel: 'Tarefa real no Codex',
    overviewCaption:
      'O prompt, a transferência para o SankiWork, os arquivos gerados e o site finalizado permanecem visíveis no mesmo espaço de trabalho.',
    stepListAria: 'As cinco etapas de uma execução real do plugin no Codex',
    installPhase: 'Instalar',
    installTitle: 'Peça ao Codex para instalar',
    installBody:
      'Cole esta instrução em uma tarefa do Codex. O Codex adiciona a origem Git canônica do marketplace, instala o plugin somente se ele ainda não estiver presente e conclui a configuração do MCP local sem exigir uma listagem em catálogo público.',
    installNote:
      'Cole no Codex uma única vez — os detalhes da instalação ficam por conta dele.',
    steps: [
      {
        phase: 'Usar',
        title: 'Inicie uma nova tarefa no Codex',
        body:
          'Quando o Codex concluir a instalação, abra o plugin SankiWork instalado na nova tarefa e selecione “Try now” para começar.',
        alt:
          'Tela real de detalhes do plugin SankiWork no Codex com o botão Try now',
      },
      {
        phase: 'Criar',
        title: 'Escreva o briefing de design',
        body:
          'Mencione o SankiWork e descreva o artefato, o conteúdo, a direção visual e os requisitos de responsividade.',
        alt:
          'Um prompt real no Codex pedindo ao SankiWork para criar o site acolhedor de um café de bairro',
      },
      {
        phase: 'Criar',
        title: 'Acompanhe a transferência em tempo real',
        body:
          'O Codex confirma a direção, cria o projeto e transfere o trabalho para o SankiWork enquanto os arquivos aparecem em tempo real.',
        alt:
          'Um espaço de trabalho real do Codex e do SankiWork durante a criação do site do café de bairro',
      },
      {
        phase: 'Criar',
        title: 'Revise o resultado',
        body:
          'A mesma tarefa entrega a landing page responsiva do café Goodfield, as imagens geradas e os arquivos editáveis.',
        alt:
          'Landing page finalizada do café de bairro Goodfield, gerada pelo plugin SankiWork no Codex',
      },
    ],
  },
  use: {
    title: 'Comece com o prompt exato.',
    lead:
      'Selecione SankiWork no menu de plugins do Codex, descreva o artefato e continue refinando tudo na mesma tarefa. O Codex exibe a menção ao plugin como um chip do SankiWork.',
    promptLabel: 'Prompt usado na tarefa gravada no Codex',
    copyPrompt: 'Copiar prompt do Codex',
    galleryAria: 'Exemplos criados com o SankiWork',
    templates: [
      {
        alt:
          'Landing page do produto Oryzo com uma base de corte tátil e um objeto de cortiça',
        label: 'Lançamento de produto',
      },
      {
        alt:
          'Landing page do evento SankiWork Osaka com um mapa tipográfico',
        label: 'Página de evento',
      },
      {
        alt: 'Site editorial escuro do produto Fable 5',
        label: 'Site editorial',
      },
      {
        alt:
          'Interface de linha do tempo dos modelos do SankiWork em uma tela clara',
        label: 'História interativa',
      },
    ],
    promptListAria: 'Exemplos de prompts do SankiWork Cloud',
    prompts: [
      { title: 'Site' },
      { title: 'Apresentações' },
      { title: 'Protótipo' },
      { title: 'Sistema de design' },
    ],
  },
  faq: {
    title: 'O que saber antes de instalar',
    lead:
      'O Codex mantém o controle da tarefa. O SankiWork cuida do fluxo de trabalho visual.',
    items: [
      {
        q: 'O que o plugin adiciona ao Codex?',
        a:
          'Ele oferece ao Codex um fluxo de trabalho do SankiWork para sites, apresentações, protótipos e sistemas de design. O plugin se conecta ao SankiWork MCP local para criar briefings, projetos e artefatos.',
      },
      {
        q: 'Quais produtos do Codex são compatíveis?',
        a:
          'O pacote atual é compatível com Codex Desktop e Codex CLI. O Codex é o primeiro ambiente com suporte.',
      },
      {
        q: 'O que é necessário antes da instalação?',
        a:
          'Use o Codex CLI 0.144.6 ou mais recente e o SankiWork 0.17.0 ou mais recente. Instale o SankiWork antes de registrar o MCP local.',
      },
      {
        q: 'Por que preciso iniciar uma nova tarefa no Codex?',
        a:
          'O Codex carrega os recursos do plugin e do MCP quando uma tarefa é iniciada. Uma nova tarefa reconhece o plugin SankiWork Cloud recém-instalado.',
      },
      {
        q: 'A janela do SankiWork precisa permanecer aberta?',
        a:
          'Não. O MCP local registrado pode iniciar o runtime assinado do SankiWork em segundo plano quando necessário.',
      },
    ],
  },
  final: {
    aria: 'Instalar o SankiWork Cloud no Codex/ChatGPT',
    title: 'Leve o SankiWork para sua próxima tarefa no Codex/ChatGPT.',
    bodyBeforeMention: 'Instale o plugin, conecte o MCP local e invoque',
    bodyAfterMention: '.',
    copy: 'Copiar',
    download: 'Baixar o SankiWork',
    source: 'Ver código-fonte',
  },
  clipboard: {
    copying: 'Copiando…',
    copied: 'Copiado',
    failed: 'Selecione e copie',
  },
  schema: {
    pageName: 'Plugin SankiWork Cloud para Codex/ChatGPT',
    applicationName: 'Plugin SankiWork Cloud para Codex/ChatGPT',
  },
};

export default copy;
