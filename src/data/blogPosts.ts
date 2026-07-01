export type BlogSection = { title: string; body: string[] }

export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cocuk-odevde-odaklanamiyorsa-dikkat-programi',
    title: 'Çocuk ödevde odaklanamıyorsa dikkat geliştirme programı ne zaman gerekir?',
    date: '12/03/2026',
    description: 'Ev ödevlerinde dikkat dağınıklığı ne zaman kaygı verici? Dikkat geliştirme programına ne zaman başvurulmalı?',
    sections: [
      {
        title: 'Ödevde odaklanma sorunu ne zaman kaygıya dönüşür?',
        body: [
          'Ev ödevlerinde sık sık dikkatinin dağılması, sürekli mola istemesi veya bitirememesi birçok ebeveynin tanıdık bir kaygısıdır. Bu durum her zaman dikkat eksikliği anlamına gelmez; bazen yorgunluk, kaygı veya öğrenme stiline uygun olmayan çalışma düzeni de etkili olabilir.',
          'Ancak ödev süresinin yaşına göre belirgin şekilde uzaması, sık unutkanlık, talimatları takip etmekte zorlanma ve okulda da benzer şikayetler varsa profesyonel değerlendirme faydalı olur.',
        ],
      },
      {
        title: 'Dikkat geliştirme programı nedir?',
        body: [
          'Dikkat geliştirme programı; çocuğun dikkat profilini bilimsel testlerle değerlendirip bu sonuçlara göre tasarlanan bireysel bir destek sürecidir. Kuru tekrar yerine, oyun temelli ve bilişsel egzersizlerle çalışılır.',
          'Programda aile ve öğretmen psikoeğitimi de yer alır; böylece okul ve ev ortamı koordineli olarak desteklenir. Amaç, çocuğun kendi dikkat kapasitesini tanıması ve bunu yönetebilen bir birey haline gelmesidir.',
        ],
      },
      {
        title: 'Notre Psikoloji\'de süreci nasıl işler?',
        body: [
          'İlk olarak kapsamlı bir değerlendirme yapılır. Ardından çocuğa özel haftalık seans planı oluşturulur. Ailenin de sürece dahil edilmesiyle ev ortamında destekleyici bir çerçeve kurulur.',
          'Sonuçlar genellikle 8–12 hafta içinde fark edilmeye başlar. Önemlisi; bu süreç çocuğu "düzeltmek" için değil, güçlü yanlarını keşfettirerek öğrenmeyi sevdirmek için tasarlanmıştır.',
        ],
      },
    ],
  },
  {
    slug: 'online-terapi-guvenli-mi',
    title: 'Online terapi güvenli mi, güvenilir psikolog nasıl seçilir?',
    date: '28/02/2026',
    description: 'Online terapinin güvenilirliği, etkinliği ve doğru psikolog seçiminde dikkat edilmesi gereken noktalar.',
    sections: [
      {
        title: 'Online terapi yüz yüze kadar etkili mi?',
        body: [
          'Yüzlerce araştırma, birçok psikolojik sorun için online terapinin yüz yüze terapi kadar etkili olduğunu göstermektedir. Kaygı bozuklukları, depresyon ve stres yönetimi bu kategorinin başında gelmektedir.',
          'Online format özellikle; ulaşım güçlüğü, zaman kısıtlaması veya yüz yüze görüşmeye başlamak için henüz hazır hissetmeyen danışanlar için büyük bir avantaj sunar.',
        ],
      },
      {
        title: 'Online terapide gizlilik nasıl sağlanır?',
        body: [
          'Notre Psikoloji\'de online seanslar şifreli ve güvenli video platformları aracılığıyla gerçekleştirilir. Hiçbir seans kaydedilmez; kişisel veriler KVKK kapsamında korunur.',
          'Önerilen platform kullanılacak olsa da danışan kendi tercihini belirtebilir. Önemli olan, görüşmenin sessiz ve özel bir ortamda yapılmasıdır.',
        ],
      },
      {
        title: 'Güvenilir bir psikolog nasıl seçilir?',
        body: [
          'Öncelikle psikoloğun lisanslı ve ruhsat sahibi olduğundan emin olun. Türkiye\'de psikologlar Türk Psikologlar Derneği veya üniversite diplomasıyla doğrulanabilir.',
          'Uzmanlaşma alanı, çalışma yöntemi ve ilk tanışma seansındaki iletişim kalitesi seçimde belirleyici olmalıdır. İlk seanstan sonra kendinizi rahat hissetmiyorsanız başka bir uzmana geçmek tamamen normaldir.',
        ],
      },
    ],
  },
  {
    slug: 'wisc-iv-zeka-testi',
    title: 'WISC-IV zeka testi nedir, çocuğa ne zaman yaptırılır?',
    date: '15/01/2026',
    description: 'WISC-IV zeka testi nedir, ne ölçer, hangi durumlarda uygulanır ve sonuçlar ne anlama gelir?',
    sections: [
      {
        title: 'WISC-IV nedir?',
        body: [
          'WISC-IV (Wechsler Intelligence Scale for Children), 6–16 yaş aralığındaki çocuklar için geliştirilmiş, dünya genelinde yaygın kullanılan bir zeka değerlendirme aracıdır. Çocuğun sözel anlama, algısal akıl yürütme, çalışma belleği ve işlem hızı gibi bilişsel alanlarını ölçer.',
          'Test yaklaşık 60–90 dakika sürer ve yalnızca lisanslı psikologlar tarafından bireysel olarak uygulanabilir. Sonuçta bir IQ puanı değil; çocuğun güçlü ve zayıf yönlerini gösteren kapsamlı bir profil elde edilir.',
        ],
      },
      {
        title: 'Hangi durumlarda uygulanır?',
        body: [
          'Okulda beklenmedik başarısızlık, okuma ve yazma güçlüğü, dikkat sorunları, özel eğitim ihtiyacı değerlendirmesi veya üstün zekalılık şüphesi durumlarında WISC-IV yaygın biçimde kullanılır.',
          'Ayrıca erken tanı amaçlı ya da mevcut bir tanıyı (DEHB, disleksi vb.) desteklemek için de uygulanabilir. Test süreci, çocuğa "doğru ya da yanlış" yoktur; sadece farklı görevler verilir.',
        ],
      },
      {
        title: 'Sonuçlar ne anlama gelir?',
        body: [
          'Test sonucunda uzman psikolog, ayrıntılı bir rapor hazırlar. Bu rapor; çocuğun bilişsel profilini, güçlü alanlarını, desteklenmesi gereken yönlerini ve önerileri içerir.',
          'Rapor okul, hastane veya başka kurumlarla paylaşılabilir. Notre Psikoloji\'de sonuçlar mutlaka bir geri bildirim seansında aile ile birlikte değerlendirilir; etiketlemek değil, anlamak ve desteklemek önceliktir.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
