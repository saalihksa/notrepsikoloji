export type ServiceStep = { title: string; text: string }

export type Service = {
  slug: string
  title: string
  shortDesc: string
  intro: string
  richP1: string
  richP2: string
  steps: ServiceStep[]
  tags: string[]
  pushText: string
  bodyClass: string
}

const ALL_SLUGS = [
  'bireysel-danismanlik', 'cift-danismanligi', 'aile-danismanligi',
  'ergen-danismanligi', 'oyun-danismanligi', 'online-danismanlik',
  'psikolojik-testler', 'dikkat-gelistirme', 'egitim-danismanligi',
  'sinav-koclugu', 'anaokulu-danismanligi', 'cinsel-danismanlik',
  'kurumsal-danismanlik',
]

const STEPS_DEFAULT: ServiceStep[] = [
  { title: 'İlk Görüşme', text: 'İhtiyaçlarınızı dinler, süreci ve hedefleri birlikte belirleriz.' },
  { title: 'Değerlendirme', text: 'Güçlü yönlerinizi ve odak alanlarınızı birlikte keşfederiz.' },
  { title: 'Kişisel Plan', text: 'Size özel danışmanlık planı oluşturulur.' },
  { title: 'Düzenli Seans', text: 'Haftalık seanslarla ilerlemenizi destekleriz.' },
]

export const SERVICES: Service[] = [
  {
    slug: 'bireysel-danismanlik',
    title: 'Bireysel Danışmanlık',
    shortDesc: 'Depresyon, kaygı, travma ve kişisel gelişim için bire bir destek.',
    intro: 'Güvenli ve destekleyici bir ortamda, uzman psikologlarımız eşliğinde kişisel gelişim yolculuğunuzda size rehberlik ediyoruz.',
    richP1: 'Yaşamın getirdiği zorluklarla başa çıkmak bazen tek başına yönetilmesi güç bir hal alabilir. Kaygı, üzüntü, ilişki sorunları, iş stresi, özgüven eksikliği veya geçmişten gelen izler — bunların hepsinde profesyonel bir destek almak, değişimin başlangıç noktası olabilir.',
    richP2: "Notre Psikoloji'de bireysel danışmanlık sürecinde, sizi anlamak için gerçek anlamda zaman ayırıyoruz. İlk seanstan itibaren yargısız, güvenli ve sıcak bir ortamda kendinizi ifade edebilirsiniz.",
    steps: STEPS_DEFAULT,
    tags: ['Bilişsel Davranışçı Danışmanlık (BDT)', 'Psikodinamik yaklaşım', 'Kaygı ve depresyon desteği', 'Kaygı ve stres yönetimi', 'Öz-farkındalık geliştirme', 'Travma sonrası destek', 'Yas süreci', 'Özgüven çalışmaları'],
    pushText: 'Depresyon, kaygı, travma ve kişisel gelişim için bire bir destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'cift-danismanligi',
    title: 'Çift Danışmanlığı',
    shortDesc: 'İletişim, güven ve bağ sorunlarında çiftlere özel destek.',
    intro: 'Ortak hedefler belirleyerek, ilişkinizde sağlıklı iletişim becerileri geliştirmenize yardımcı oluyoruz.',
    richP1: 'Her ilişki farklı dinamikler taşır. Zamanla biriken küçük kırılmalar, iletişim boşlukları veya yaşam değişimlerine uyum sorunları çiftler arasında derin mesafeler yaratabilir.',
    richP2: 'Seanslarımızda her iki tarafın sesi eşit önem taşır. Uzmanımız taraf tutmadan, çiftin ortak bir anlayış geliştirmesine rehberlik eder.',
    steps: STEPS_DEFAULT,
    tags: ['İletişim becerileri', 'Çatışma çözümü', 'Bağlanma odaklı çalışma', 'Güven yenileme süreci', 'Duygusal mesafe', 'Evlilik öncesi hazırlık', 'Ebeveynlik rolleri', 'Yeniden bağlanma'],
    pushText: 'İletişim, güven ve bağ sorunlarında çiftlere özel destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'aile-danismanligi',
    title: 'Aile Danışmanlığı',
    shortDesc: 'Aile içi iletişim ve rol dengelerinde destek.',
    intro: 'Aile sistemi içindeki dinamikleri anlamlandırarak sağlıklı bir iletişim ortamı oluşturmanıza destek oluyoruz.',
    richP1: 'Aile içindeki bir kişinin yaşadığı zorluk, tüm aile sistemini etkiler. Çocuğun davranış sorunları, ergenlerin aileden uzaklaşması veya ebeveyn çatışmaları gibi kriz dönemlerinde aile danışmanlığı bütünsel bir bakış açısı sunar.',
    richP2: 'Seanslarımızda aile üyelerinin her biri kendi bakış açısını güvenle paylaşabilir. Hem bireysel hem de ilişkisel iyileşme hedeflenir.',
    steps: STEPS_DEFAULT,
    tags: ['Ebeveyn-çocuk ilişkisi', 'Boşanma süreci desteği', 'Kardeş çatışmaları', 'Aile içi sınır belirleme', 'Yeniden yapılanma', 'Aile içi iletişim', 'Rol dengesi', 'Sistem terapisi'],
    pushText: 'Aile içi iletişim ve rol dengelerinde kapsamlı destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'ergen-danismanligi',
    title: 'Ergen Danışmanlığı',
    shortDesc: '12–18 yaş arası ergenler ve aileleri için destek.',
    intro: 'Ergenlik döneminin getirdiği kimlik, ilişki ve gelecek sorularında gençlere güvenli bir alan sunuyoruz.',
    richP1: 'Ergenlik; kimlik arayışı, beden değişimleri, akran baskısı ve gelecek kaygısının iç içe geçtiği karmaşık bir dönemdir. Bu dönemde profesyonel destek almak, ergenlerin çoğu zaman en çok ihtiyaç duyduğu ama en az talep ettiği şeydir.',
    richP2: 'Ergen danışmanlığı seanslarımızda gizlilik esastır. Uzmanımız, ergenin kendi hızında açılmasına alan tanır; ebeveynlerle iletişim ise ancak gencin onayıyla kurulur.',
    steps: STEPS_DEFAULT,
    tags: ['Kimlik gelişimi', 'Sosyal kaygı', 'Akran ilişkileri', 'Okul uyumu', 'Aile ile iletişim', 'Gelecek kaygısı', 'Öz-saygı', 'Dijital bağımlılık'],
    pushText: '12–18 yaş arası ergenler için güvenli ve uzman destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'oyun-danismanligi',
    title: 'Oyun Danışmanlığı',
    shortDesc: '2–12 yaş çocuklar için oyun temelli terapi.',
    intro: 'Çocukların doğal dili olan oyun aracılığıyla duygusal ifade ve gelişim süreçlerini destekliyoruz.',
    richP1: 'Çocuklar duygularını büyükler gibi söze dökemez — ama oyun onların dilini konuşmalarını sağlar. Oyun danışmanlığı, çocuğun doğal ifade biçimini terapötik bir araç olarak kullanır.',
    richP2: '2–12 yaş aralığındaki çocuklarla çalışan uzmanlarımız, her çocuğun kendine özgü dünyasını saygıyla karşılar. Ebeveynler de sürece dahil edilir.',
    steps: [
      { title: 'Tanışma', text: 'Çocuk ve aile ile güvenli bir ortam oluşturulur.' },
      { title: 'Değerlendirme', text: 'Oyun gözlemi ve gelişim değerlendirmesi yapılır.' },
      { title: 'Terapi Planı', text: 'Çocuğa özel oyun terapisi planı oluşturulur.' },
      { title: 'Ebeveyn Desteği', text: 'Aile, sürece dahil edilerek ev ortamı desteklenir.' },
    ],
    tags: ['Davranış sorunları', 'Uyum güçlüğü', 'Kaygılı çocuk', 'Sosyal beceri gelişimi', 'Travma desteği', 'Kum terapisi', 'Yaratıcı oyun', 'Ayrılık kaygısı'],
    pushText: '2–12 yaş çocuklar için oyun temelli profesyonel terapi.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'online-danismanlik',
    title: 'Online Danışmanlık',
    shortDesc: 'Güvenli görüntülü görüşme ile uzaktan destek.',
    intro: 'Uzaklık veya yoğun tempo, artık destek almanızın önünde bir engel değil. Güvenli bağlantıyla her yerden destek.',
    richP1: 'Güvenli video bağlantısı üzerinden gerçekleştirilen online seanslarımız, yüz yüze görüşmeyle aynı etkinliği sunar; bilimsel veriler bunu desteklemektedir.',
    richP2: 'Online danışmanlıkta gizlilik tamamen korunur. Seanslar şifreli platformlar üzerinden yapılır; randevu saatleri daha esnektir ve istediğiniz konforlu bir ortamda oturumunuzu gerçekleştirebilirsiniz.',
    steps: STEPS_DEFAULT,
    tags: ['Güvenli video görüşme', 'Esnek randevu', 'Yurt dışı danışanlar', 'Şehir dışı erişim', 'Gizlilik güvencesi', 'Şifreli platform', 'Mobil uyumlu', 'Zaman tasarrufu'],
    pushText: 'Nerede olursanız olun güvenli ve esnek online danışmanlık.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'psikolojik-testler',
    title: 'Psikolojik Testler ve Değerlendirme',
    shortDesc: 'WISC-IV ve diğer standart testlerle kapsamlı değerlendirme.',
    intro: 'Bilimsel ve standart araçlarla; dikkat, zeka, kişilik ve gelişim düzeyini kapsamlı şekilde değerlendiriyoruz.',
    richP1: 'Psikolojik testler; dikkat, zeka, kişilik yapısı, duygusal durum ve gelişim düzeyi gibi alanları bilimsel ve standart araçlarla ölçer. Bu ölçümler yalnızca bir etiket koymak için değil, kişinin güçlü yönlerini ve ihtiyaçlarını anlamak için kullanılır.',
    richP2: 'Değerlendirme raporlarımız detaylı ve anlaşılır bir dille hazırlanır. Sonuçlar, danışanla ve gerektiğinde ailesiyle birlikte yorumlanır; rapor doğrultusunda bir destek planı oluşturulur.',
    steps: [
      { title: 'Başvuru ve Görüşme', text: 'Değerlendirme ihtiyacı ve hedefler belirlenir.' },
      { title: 'Test Uygulaması', text: 'Standart psikolojik testler bireysel olarak uygulanır.' },
      { title: 'Raporlama', text: 'Detaylı ve anlaşılır bir değerlendirme raporu hazırlanır.' },
      { title: 'Geri Bildirim', text: 'Sonuçlar aile ve danışanla birlikte yorumlanır.' },
    ],
    tags: ['Zeka testi (WISC-V)', 'Dikkat değerlendirmesi', 'Kişilik ölçümü', 'Gelişim değerlendirmesi', 'Okul raporu', 'Kariyer testi', 'Nöropsikolojik değerlendirme', 'Öğrenme güçlüğü'],
    pushText: 'Bilimsel ve kapsamlı psikolojik test ve değerlendirme hizmeti.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'dikkat-gelistirme',
    title: 'Dikkat Geliştirme Programı',
    shortDesc: 'Çocuklarda odaklanma ve dikkat becerilerini güçlendirme.',
    intro: 'Dikkat güçlüğü yaşayan çocuk ve yetişkinler için kişiye özel bilişsel gelişim programı.',
    richP1: 'Dikkat güçlüğü; çocuklarda ödev yapmayı, sınıfta odaklanmayı ve sosyal ilişkileri olumsuz etkileyebilirken yetişkinlerde iş performansını ve günlük yaşamı zorlaştırabilir.',
    richP2: 'Dikkat geliştirme programımız; kapsamlı bir değerlendirmenin ardından bireye özel bilişsel egzersizler, davranışsal stratejiler ve aile/öğretmen psikoeğitimini kapsar.',
    steps: [
      { title: 'Dikkat Değerlendirmesi', text: 'Standardize testlerle dikkat profili belirlenir.' },
      { title: 'Bireysel Program', text: 'Kişiye özel bilişsel egzersiz programı oluşturulur.' },
      { title: 'Uygulama', text: 'Haftalık seanslarla program uygulanır ve izlenir.' },
      { title: 'Aile Eğitimi', text: 'Ev ve okul ortamı için pratik stratejiler paylaşılır.' },
    ],
    tags: ['DEHB değerlendirme', 'Bilişsel egzersiz', 'Öğrenme desteği', 'Aile psikoeğitimi', 'Okul uyum planı', 'Odak egzersizleri', 'Öz-düzenleme', 'Çalışma becerileri'],
    pushText: 'Dikkat ve odaklanma güçlükleri için kişiye özel gelişim programı.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'egitim-danismanligi',
    title: 'Eğitim Danışmanlığı',
    shortDesc: 'Okul seçimi, öğrenme stratejileri ve akademik planlama.',
    intro: 'Çocuğun potansiyelini ortaya çıkarmak; doğru motivasyonu, öğrenme stilini ve hedefleri anlamakla başlar.',
    richP1: 'Öğrenme yolculuğu, akademik başarının çok ötesinde bir süreçtir. Eğitim danışmanlığımız; öğrenme güçlüklerini, okul uyum sorunlarını ve akademik hedefleri değerlendirerek kişiye özel bir yol haritası çizer.',
    richP2: 'Hem öğrenci hem de aile ile çalışıyoruz. Uzmanımız; öğrenme stilini analiz eder, hedefler belirler ve okul-aile işbirliğini güçlendirir.',
    steps: STEPS_DEFAULT,
    tags: ['Öğrenme stili analizi', 'Okul uyum desteği', 'Motivasyon çalışmaları', 'Aile-okul işbirliği', 'Hedef belirleme', 'Öğrenme güçlükleri', 'Akademik planlama', 'Üniversite hazırlık'],
    pushText: 'Akademik başarı ve öğrenme sürecinde uzman rehberlik.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'sinav-koclugu',
    title: 'Sınav Koçluğu',
    shortDesc: 'Sınav kaygısı yönetimi ve performans artırma.',
    intro: 'Sınav kaygısı, çalışma alışkanlıkları ve motivasyon konularında öğrencilere özel destek.',
    richP1: 'Sınav kaygısı; konu bilgisinden bağımsız olarak performansı ciddi biçimde düşürebilir. Kalp çarpıntısı, zihin boşalması, uyku sorunları ve çalışmaya başlayamama gibi belirtiler gösterirse, bu psikolojik desteğin devreye girmesi gereken bir işarettir.',
    richP2: 'Sınav koçluğu programımız; kaygı yönetimi, zaman planlaması, motivasyon artırımı ve zihinsel dayanıklılık üzerine odaklanır. Hem öğrenci hem de ebeveyn için destekleyici seanslar planlanabilir.',
    steps: [
      { title: 'Kaygı Değerlendirmesi', text: 'Sınav kaygısının düzeyi ve tetikleyiciler belirlenir.' },
      { title: 'Teknik Öğretimi', text: 'Nefes, gevşeme ve odaklanma teknikleri öğretilir.' },
      { title: 'Çalışma Planı', text: 'Kişiye özel verimli çalışma programı oluşturulur.' },
      { title: 'Performans Takibi', text: 'Deneme süreçleri izlenir ve program güncellenir.' },
    ],
    tags: ['Sınav kaygısı', 'Çalışma teknikleri', 'Motivasyon yönetimi', 'YKS / LGS hazırlık', 'Nefes ve gevşeme', 'Zaman yönetimi', 'Zihinsel dayanıklılık', 'Ebeveyn desteği'],
    pushText: 'Sınav kaygısı ve performans için özel koçluk programı.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'anaokulu-danismanligi',
    title: 'Anaokulu Danışmanlığı',
    shortDesc: 'Okul öncesi kurumlar ve eğitimciler için rehberlik.',
    intro: 'İlk okul deneyiminde çocuğun sağlıklı uyumunu desteklemek için aile, çocuk ve okul ekibiyle çalışıyoruz.',
    richP1: 'İlk okul deneyimi, çocukların sosyal dünyaya açılan en kritik kapılarından biridir. Uyum güçlükleri, ayrılık kaygısı, ısırma veya vurma gibi davranışlar ya da içe kapanma; bu dönemde sıkça gözlemlenen ve erken destekle yönetilebilecek belirtilerdir.',
    richP2: 'Anaokulu danışmanlığında hem çocukla hem de aile ve okul ekibiyle birlikte çalışılır. Amacımız; çocuğun okul ortamına sağlıklı, güvenli ve mutlu bir şekilde dahil olmasını desteklemektir.',
    steps: [
      { title: 'Gözlem', text: 'Okul ortamında çocuk gözlemlenir, öğretmenlerle görüşülür.' },
      { title: 'Aile Görüşmesi', text: 'Aile ile çocuğun gelişim tarihi ve kaygılar ele alınır.' },
      { title: 'Destek Planı', text: 'Okul ve aile için özel bir destek planı oluşturulur.' },
      { title: 'Takip', text: 'İlerleme düzenli olarak değerlendirilir ve plan güncellenir.' },
    ],
    tags: ['Ayrılık kaygısı', 'Sosyal uyum', 'Davranış sorunları', 'Okul fobisi', 'Aile-okul koordinasyonu', 'Eğitimci rehberliği', 'Gelişim takibi', 'Oyun bazlı destek'],
    pushText: 'Okul öncesi dönemde çocuğunuzun sağlıklı gelişimi için destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'cinsel-danismanlik',
    title: 'Cinsel Danışmanlık',
    shortDesc: 'Cinsellik, ilişki ve beden algısı konularında gizli destek.',
    intro: 'Cinsel danışmanlık; cinsel işlev sorunları, kimlik soruları ve ilişkisel uyumsuzluk konularında yargısız ve uzman destek sunar.',
    richP1: 'Cinsellik, bireyin ve ilişkinin önemli bir parçasıdır; ancak bu konuda yardım aramak hâlâ yeterince normalleşmemiş olabilir. Cinsel danışmanlık, cinsel işlev sorunları, cinsel kimlik ile ilgili sorular, erotik uyumsuzluk veya geçmiş yaşantıların bıraktığı izler gibi konularda yargısız ve uzman bir destek sunar.',
    richP2: 'Seanslar tamamen gizlidir. Uzmanımız; bireysel ya da çift seansları biçiminde çalışabilir, klinik bir değerlendirme ile süreci birlikte planlar.',
    steps: STEPS_DEFAULT,
    tags: ['Cinsel işlev sorunları', 'Cinsel kimlik', 'Beden imajı', 'İlişkisel uyumsuzluk', 'Geçmiş yaşantı izleri', 'Çift uyumu', 'Kaygı ve inhibisyon', 'Travma odaklı çalışma'],
    pushText: 'Cinsellik ve ilişki konularında gizli, yargısız ve uzman destek.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
  {
    slug: 'kurumsal-danismanlik',
    title: 'Kurumsal Danışmanlık',
    shortDesc: 'İş yerinde ruh sağlığı, stres yönetimi ve ekip desteği.',
    intro: 'Çalışan refahı ve kurumsal ruh sağlığı için sistematik ve ölçülebilir destek programları sunuyoruz.',
    richP1: 'Çalışan refahı, kurumsal üretkenliğin temel taşıdır. Tükenmişlik, iş stresi, ekip içi çatışmalar veya kurumsal değişim süreçleri; bireylerin ve organizasyonun sağlığını doğrudan etkiler.',
    richP2: 'İhtiyaç analizinden başlayarak; bireysel danışmanlık, grup çalışmaları, psikoeğitim atölyeleri ve kriz müdahalesi gibi hizmetler kuruma özel olarak tasarlanır.',
    steps: [
      { title: 'İhtiyaç Analizi', text: 'Kurumun mevcut durumu ve ihtiyaçları değerlendirilir.' },
      { title: 'Program Tasarımı', text: 'Kuruma özel danışmanlık ve eğitim programı hazırlanır.' },
      { title: 'Uygulama', text: 'Bireysel, grup veya atölye formatında programlar uygulanır.' },
      { title: 'Değerlendirme', text: 'Programın etkinliği ölçülür ve gerektiğinde güncellenir.' },
    ],
    tags: ['Tükenmişlik önleme', 'Ekip içi iletişim', 'Stres yönetimi atölyesi', 'Kriz müdahalesi', 'Çalışan refahı programı', 'Liderlik koçluğu', 'Kurum kültürü', 'Motivasyon eğitimi'],
    pushText: 'Kurumunuz için kapsamlı ruh sağlığı ve çalışan refahı programları.',
    bodyClass: 'wp-singular page wp-theme-solanum page-template-service',
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export const OTHER_SERVICES_MAP: Record<string, string[]> = Object.fromEntries(
  ALL_SLUGS.map((slug) => [
    slug,
    ALL_SLUGS.filter((s) => s !== slug).slice(0, 6),
  ])
)

export const SERVICE_GROUPS = [
  {
    label: 'Bireysel & İlişki',
    slugs: ['bireysel-danismanlik', 'cift-danismanligi', 'online-danismanlik', 'cinsel-danismanlik', 'aile-danismanligi'],
  },
  {
    label: 'Çocuk & Ergen',
    slugs: ['ergen-danismanligi', 'oyun-danismanligi', 'anaokulu-danismanligi', 'dikkat-gelistirme'],
  },
  {
    label: 'Eğitim & Kurumsal',
    slugs: ['psikolojik-testler', 'egitim-danismanligi', 'sinav-koclugu', 'kurumsal-danismanlik'],
  },
]
