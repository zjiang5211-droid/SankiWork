import type { SankiWorkPluginCopy } from '../sankiwork-plugin-i18n';

const tr: SankiWorkPluginCopy = {
  metadata: {
    title: 'Codex/ChatGPT için SankiWork | SankiWork Cloud Eklentisini Kurun',
    description:
      'SankiWork Cloud eklentisini Codex/ChatGPT’ye kurun; web siteleri, sunumlar, prototipler ve tasarım sistemlerini aynı görev içinde oluşturun.',
    keywords:
      'SankiWork Codex eklentisi, ChatGPT masaüstü eklentisi, Codex eklenti kurulumu, SankiWork Cloud, Codex tasarım eklentisi, Codex MCP',
  },
  hero: {
    title: 'Codex/ChatGPT için SankiWork eklentisi',
    leadBefore: 'Aşağıdaki talimatı şu uygulamadaki herhangi bir göreve girin:',
    chatgptLabel: 'ChatGPT masaüstü uygulaması',
    installAria: 'SankiWork Cloud eklentisini Codex/ChatGPT’ye kur',
    copy: 'Kopyala',
    github: 'GitHub’da kurulum kılavuzunu görüntüle ↗',
  },
  demo: {
    title: 'Bir kez kurun. Codex/ChatGPT içinden tasarlayın.',
    lead:
      'Önce Codex ile SankiWork çalışma alanının tamamını görün, ardından gerçek kurulumdan sonuca uzanan akışı adım adım izleyin.',
    overviewAlt:
      'Tamamlanan Goodfield kafe web sitesiyle birlikte SankiWork eklentisinin kullanıldığı gerçek bir Codex görevi',
    overviewLabel: 'Gerçek Codex görevi',
    overviewCaption:
      'İstem, SankiWork aktarımı, oluşturulan dosyalar ve tamamlanan web sitesi tek bir çalışma alanında görünür kalır.',
    stepListAria: 'Gerçek Codex eklentisi akışının beş aşaması',
    installPhase: 'Kurulum',
    installTitle: 'Kurulumu Codex’e yaptırın',
    installBody:
      'Bu talimatı bir Codex görevine yapıştırın. Codex, kanonik Git eklenti mağazası kaynağını ekler, eklentiyi yalnızca eksikse kurar ve herkese açık bir katalog kaydı gerektirmeden yerel MCP kurulumunu tamamlar.',
    installNote: 'Codex’e bir kez yapıştırın; tüm kurulum ayrıntıları sizin için halledilir.',
    steps: [
      {
        phase: 'Kullanım',
        title: 'Yeni bir Codex görevi başlatın',
        body:
          'Codex kurulumu tamamladıktan sonra yeni görevde kurulu SankiWork eklentisini açın ve başlamak için “Try now” seçeneğini belirleyin.',
        alt:
          'Codex içindeki gerçek SankiWork eklentisi ayrıntı ekranı ve Try now düğmesi',
      },
      {
        phase: 'Oluşturma',
        title: 'Tasarım özetini yazın',
        body:
          'SankiWork’dan bahsedin; ardından oluşturulacak içeriği, metinleri, görsel yönü ve duyarlı tasarım gereksinimlerini açıklayın.',
        alt:
          'SankiWork’dan sıcak ve samimi bir mahalle kafesi web sitesi oluşturmasını isteyen gerçek bir Codex istemi',
      },
      {
        phase: 'Oluşturma',
        title: 'Canlı aktarımı izleyin',
        body:
          'Codex yönü onaylar, projeyi oluşturur ve dosyalar canlı olarak görünürken işi SankiWork’a aktarır.',
        alt:
          'Mahalle kafesi web sitesi oluşturulurken görünen gerçek Codex ve SankiWork çalışma alanı',
      },
      {
        phase: 'Oluşturma',
        title: 'Sonucu inceleyin',
        body:
          'Aynı görev, duyarlı Goodfield kafe açılış sayfasını, oluşturulan görselleri ve düzenlenebilir dosyaları sunar.',
        alt:
          'Codex içindeki SankiWork eklentisiyle oluşturulan tamamlanmış Goodfield mahalle kafesi açılış sayfası',
      },
    ],
  },
  use: {
    title: 'Tam istemle başlayın.',
    lead:
      'Codex eklenti menüsünden SankiWork’ı seçin, oluşturmak istediğiniz içeriği açıklayın ve aynı görevde geliştirmeye devam edin. Codex, eklenti etiketini bir SankiWork çipi olarak gösterir.',
    promptLabel: 'Kaydedilen Codex görevinde kullanılan istem',
    copyPrompt: 'Codex istemini kopyala',
    galleryAria: 'SankiWork ile oluşturulan örnekler',
    templates: [
      {
        alt:
          'Dokulu bir kesim matı ve mantar nesne içeren Oryzo ürün açılış sayfası',
        label: 'Ürün lansmanı',
      },
      {
        alt: 'Tipografik harita içeren SankiWork Osaka etkinlik açılış sayfası',
        label: 'Etkinlik sayfası',
      },
      {
        alt: 'Fable 5 için koyu renkli, editoryal ürün web sitesi',
        label: 'Editoryal site',
      },
      {
        alt: 'Aydınlık bir tuval üzerinde SankiWork model zaman çizelgesi arayüzü',
        label: 'Etkileşimli hikâye',
      },
    ],
    promptListAria: 'SankiWork Cloud istem örnekleri',
    prompts: [
      { title: 'Web sitesi' },
      { title: 'Sunumlar' },
      { title: 'Prototip' },
      { title: 'Tasarım sistemi' },
    ],
  },
  faq: {
    title: 'Kurulumdan önce merak edilenler',
    lead: 'Görevin kontrolü Codex’te kalır. Görsel iş akışını SankiWork yönetir.',
    items: [
      {
        q: 'Eklenti Codex’e ne kazandırır?',
        a:
          'Codex’e web siteleri, sunumlar, prototipler ve tasarım sistemleri için bir SankiWork iş akışı ekler. Eklenti; özetler, projeler ve çıktı üretimi için yerel SankiWork MCP bağlantısını kullanır.',
      },
      {
        q: 'Hangi Codex ürünleri destekleniyor?',
        a:
          'Mevcut paket Codex Desktop ve Codex CLI ürünlerini destekler. İlk desteklenen çalışma ortamı Codex’tir.',
      },
      {
        q: 'Kurulumdan önce nelere ihtiyacım var?',
        a:
          'Codex CLI 0.144.6 veya daha yeni bir sürüm ile SankiWork 0.17.0 veya daha yeni bir sürüm kullanın. Yerel MCP kaydını yapmadan önce SankiWork’ı kurun.',
      },
      {
        q: 'Neden yeni bir Codex görevi açmam gerekiyor?',
        a:
          'Codex, eklenti ve MCP özelliklerini görev başlatılırken yükler. Yeni bir görev, az önce kurulan SankiWork Cloud eklentisini algılar.',
      },
      {
        q: 'SankiWork penceresinin açık kalması gerekiyor mu?',
        a:
          'Hayır. Kayıtlı yerel MCP, gerektiğinde imzalı SankiWork çalışma zamanını görünür bir pencere olmadan başlatabilir.',
      },
    ],
  },
  final: {
    aria: 'SankiWork Cloud eklentisini Codex/ChatGPT’ye kur',
    title: 'SankiWork’ı bir sonraki Codex/ChatGPT görevinize taşıyın.',
    bodyBeforeMention: 'Eklentiyi kurun, yerel MCP bağlantısını yapın ve',
    bodyAfterMention: 'etiketini kullanın.',
    copy: 'Kopyala',
    download: 'SankiWork’ı indir',
    source: 'Kaynak kodu görüntüle',
  },
  clipboard: {
    copying: 'Kopyalanıyor…',
    copied: 'Kopyalandı',
    failed: 'Seçip kopyalayın',
  },
  schema: {
    pageName: 'Codex/ChatGPT için SankiWork Cloud Eklentisi',
    applicationName: 'Codex/ChatGPT için SankiWork Cloud Eklentisi',
  },
};

export default tr;
