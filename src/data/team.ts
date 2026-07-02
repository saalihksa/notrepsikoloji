export type TeamCategory = 'all' | 'clinical' | 'child' | 'family' | 'corporate'

export type TeamSocial = {
  instagram?: string
  linkedin?: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  longBio: string[]
  education: string
  educationDetails: string[]
  certificates: string[]
  expertiseAreas: string[]
  treatmentAreas: string[]
  summaryBio?: string
  social?: TeamSocial
  approach: string
  specialties: string[]
  category: Exclude<TeamCategory, 'all'>
  languages: string[]
  experienceYears: number
  image?: string
  accent: string
}

export function getTeamMember(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id)
}

export const TEAM_CATEGORIES: { id: TeamCategory; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'clinical', label: 'Klinik Psikolog' },
  { id: 'child', label: 'Çocuk & Ergen' },
  { id: 'family', label: 'Aile & İlişki' },
  { id: 'corporate', label: 'Kurumsal' },
]

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ayse-yilmaz',
    name: 'Dr. Ayşe Yılmaz',
    role: 'Klinik Psikolog',
    bio: 'Bireysel ve çift danışmanlığı alanında 10 yılı aşkın deneyim.',
    longBio: [
      'Dr. Ayşe Yılmaz, bireysel danışmanlık ve çift terapisi alanlarında kanıta dayalı yöntemlerle çalışmaktadır. Danışanlarının duygusal ihtiyaçlarını anlamaya ve güvenli bir terapi ortamı oluşturmaya özen gösterir.',
      'Kaygı, depresyon ve ilişki sorunlarında bilişsel davranışçı terapi ile çalışır; çiftlerde iletişim ve bağlanma odaklı yaklaşımlar uygular.',
    ],
    education: 'Klinik Psikoloji Yüksek Lisans',
    educationDetails: [
      'İstanbul Üniversitesi — Psikoloji (Lisans)',
      'İstanbul Üniversitesi — Klinik Psikoloji (Yüksek Lisans)',
    ],
    certificates: [
      'Bilişsel Davranışçı Terapi Eğitimi',
      'Çift ve Aile Terapisi Sertifikası',
      'EMDR Temel Düzey Eğitimi',
    ],
    expertiseAreas: ['Bireysel Danışmanlık', 'Çift Danışmanlığı', 'Kaygı ve Depresyon'],
    treatmentAreas: ['Bilişsel Davranışçı Terapi', 'Çift Terapisi', 'Bağlanma Odaklı Terapi'],
    summaryBio:
      'Yetişkin danışanlar ve çiftlerle çalışır; süreç boyunca şeffaf iletişim ve bilimsel temelli müdahaleleri bir arada sunar.',
    approach: 'Her danışanı benzersiz bir bütün olarak ele alır; empati, şeffaflık ve bilimsel temelli müdahaleleri bir arada sunar.',
    specialties: ['Bireysel Danışmanlık', 'Çift Danışmanlığı'],
    category: 'clinical',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 12,
    accent: '#5a0202',
  },
  {
    id: 'mehmet-kaya',
    name: 'Uzm. Psk. Mehmet Kaya',
    role: 'Psikolog',
    bio: 'Ergen danışmanlığı ve sınav koçluğu uzmanı.',
    longBio: [
      'Uzm. Psk. Mehmet Kaya, ergenlerin akademik ve duygusal gelişim süreçlerinde yanlarında yer alır. Sınav dönemlerinde kaygı yönetimi ve motivasyon konularında destek sunar.',
      'Ailelerle birlikte çalışarak ergen–ebeveyn iletişimini güçlendirmeyi hedefler; bireysel görüşmelerde gizlilik ve güven ilişkisini ön planda tutar.',
    ],
    education: 'Psikoloji Lisans · Ergen Psikolojisi Sertifikası',
    educationDetails: [
      'Marmara Üniversitesi — Psikoloji (Lisans)',
      'Ergen Psikolojisi Uzmanlık Programı',
    ],
    certificates: [
      'Ergen Danışmanlığı Sertifikası',
      'Sınav Koçluğu Eğitimi',
      'Aile Danışmanlığı Temel Düzey',
    ],
    expertiseAreas: ['Ergen Danışmanlığı', 'Sınav Koçluğu', 'Aile Görüşmeleri'],
    treatmentAreas: ['Çözüm Odaklı Kısa Süreli Terapi', 'Kaygı Yönetimi', 'Motivasyon Koçluğu'],
    summaryBio:
      'Ergenler ve aileleriyle birlikte çalışarak okul, sınav ve duygusal gelişim süreçlerinde yapılandırılmış destek sunar.',
    approach: 'Ergenlerin kendi seslerini duyabildiği, yargısız ve destekleyici bir ortam oluşturur; çözüm odaklı ve gelişimsel perspektifle çalışır.',
    specialties: ['Ergen Danışmanlığı', 'Sınav Koçluğu'],
    category: 'child',
    languages: ['Türkçe'],
    experienceYears: 8,
    accent: '#7a1838',
  },
  {
    id: 'zeynep-demir',
    name: 'Uzm. Psk. Zeynep Demir',
    role: 'Klinik Psikolog',
    bio: 'Oyun danışmanlığı ve çocuk psikolojisi alanında çalışıyor.',
    longBio: [
      'Uzm. Psk. Zeynep Demir, çocukların duygularını oyun ve yaratıcı ifade yoluyla anlamalarına yardımcı olur. Oyun danışmanlığı ve dikkat geliştirme programlarında deneyimlidir.',
      'Aile görüşmeleriyle birlikte çocuğun gelişimini bütüncül ele alır; okul ve ev ortamındaki zorluklara yönelik pratik öneriler sunar.',
    ],
    education: 'Klinik Psikoloji Yüksek Lisans · Oyun Terapisi Eğitimi',
    educationDetails: [
      'Hacettepe Üniversitesi — Psikoloji (Lisans)',
      'Hacettepe Üniversitesi — Klinik Psikoloji (Yüksek Lisans)',
    ],
    certificates: [
      'Çocuk Merkezli Oyun Terapisi Eğitimi',
      'Dikkat Geliştirme Programı Uygulayıcı Sertifikası',
      'Aile Psikoeğitimi Eğitimi',
    ],
    expertiseAreas: ['Oyun Danışmanlığı', 'Dikkat Geliştirme', 'Çocuk Danışmanlığı'],
    treatmentAreas: ['Oyun Temelli Terapi', 'Bilişsel Egzersizler', 'Aile Psikoeğitimi'],
    summaryBio:
      '2–12 yaş arası çocuklar ve aileleriyle oyun temelli, güvenli ve gelişim odaklı bir danışmanlık süreci yürütür.',
    approach: 'Çocuğun hızına ve ihtiyaçlarına uygun, oyun temelli ve güvenli bir terapi süreci tasarlar; ebeveynleri sürece aktif dahil eder.',
    specialties: ['Oyun Danışmanlığı', 'Dikkat Geliştirme'],
    category: 'child',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 9,
    accent: '#4a2858',
  },
  {
    id: 'can-arslan',
    name: 'Uzm. Psk. Can Arslan',
    role: 'Psikolog',
    bio: 'Online danışmanlık ve bireysel terapi alanında uzman.',
    longBio: [
      'Uzm. Psk. Can Arslan, yüz yüze ve online danışmanlık seçenekleriyle bireysel terapi sunar. Dijital ortamda da güvenli ve etkili bir terapi deneyimi oluşturmayı hedefler.',
      'Stres, kaygı ve yaşam geçişlerinde danışanların kendi kaynaklarını keşfetmelerine yardımcı olur; esnek randevu saatleriyle erişilebilir destek sağlar.',
    ],
    education: 'Psikoloji Lisans · Online Terapi Uygulayıcı Sertifikası',
    educationDetails: [
      'Boğaziçi Üniversitesi — Psikoloji (Lisans)',
      'Online Terapi ve Telepsikoloji Uygulayıcı Programı',
    ],
    certificates: [
      'Online Terapi Uygulayıcı Sertifikası',
      'Bilişsel Davranışçı Terapi Temel Düzey',
      'Stres ve Tükenmişlik Yönetimi Eğitimi',
    ],
    expertiseAreas: ['Online Danışmanlık', 'Bireysel Danışmanlık', 'Stres Yönetimi'],
    treatmentAreas: ['Bireysel Terapi', 'Online Görüşme', 'Yaşam Geçişi Danışmanlığı'],
    summaryBio:
      'Yüz yüze ve online formatlarda esnek randevu imkânıyla yetişkin danışanlara erişilebilir psikolojik destek sunar.',
    approach: 'Danışanın tempo ve tercihlerine uyum sağlayan, yapılandırılmış ama esnek bir terapi süreci yürütür; online seanslarda gizliliğe özel önem verir.',
    specialties: ['Online Danışmanlık', 'Bireysel Terapi'],
    category: 'clinical',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 6,
    accent: '#6b3020',
  },
  {
    id: 'elif-ozturk',
    name: 'Uzm. Psk. Elif Öztürk',
    role: 'Klinik Psikolog',
    bio: 'Aile danışmanlığı ve psikolojik değerlendirme uzmanı.',
    longBio: [
      'Uzm. Psk. Elif Öztürk, aile sistemlerine odaklanarak iletişim, sınır ve bağlanma konularında çalışır. Psikolojik test ve değerlendirme süreçlerinde titiz bir yaklaşım benimser.',
      'Çiftlerden geniş aile yapılarına kadar farklı aile dinamiklerinde deneyimlidir; değerlendirme sonuçlarını anlaşılır ve uygulanabilir önerilerle sunar.',
    ],
    education: 'Klinik Psikoloji Yüksek Lisans · Aile Terapisi Eğitimi',
    educationDetails: [
      'Ankara Üniversitesi — Psikoloji (Lisans)',
      'Ankara Üniversitesi — Klinik Psikoloji (Yüksek Lisans)',
    ],
    certificates: [
      'Aile ve Çift Terapisi Eğitimi',
      'Psikolojik Değerlendirme Uygulayıcı Sertifikası',
      'MMPI-2 Uygulayıcı Sertifikası',
    ],
    expertiseAreas: ['Aile Danışmanlığı', 'Psikolojik Testler', 'Çift Danışmanlığı'],
    treatmentAreas: ['Aile Sistemleri Terapisi', 'Psikolojik Değerlendirme', 'İletişim Becerileri Çalışması'],
    summaryBio:
      'Aile ve çiftlerle bütüncül bir perspektifle çalışır; değerlendirme ve danışmanlık süreçlerini şeffaf biçimde yürütür.',
    approach: 'Aileyi bir bütün olarak görür; her bireyin ihtiyacını dengeleyen, iş birliğine dayalı bir danışmanlık süreci yürütür.',
    specialties: ['Aile Danışmanlığı', 'Psikolojik Testler'],
    category: 'family',
    languages: ['Türkçe'],
    experienceYears: 10,
    accent: '#3d4a6e',
  },
  {
    id: 'burak-sahin',
    name: 'Uzm. Psk. Burak Şahin',
    role: 'Psikolog',
    bio: 'Kurumsal danışmanlık ve stres yönetimi programları.',
    longBio: [
      'Uzm. Psk. Burak Şahin, kurumlar için stres yönetimi, tükenmişlik önleme ve ekip iletişimi programları tasarlar ve uygular.',
      'Bireysel danışmanlık deneyimini kurumsal ihtiyaçlarla birleştirerek, çalışan refahını destekleyen sürdürülebilir çözümler sunar.',
    ],
    education: 'Psikoloji Lisans · İş ve Örgüt Psikolojisi Sertifikası',
    educationDetails: [
      'Koç Üniversitesi — Psikoloji (Lisans)',
      'İş ve Örgüt Psikolojisi Uzmanlık Programı',
    ],
    certificates: [
      'Kurumsal Danışmanlık Sertifikası',
      'Stres ve Tükenmişlik Yönetimi Eğitimi',
      'Ekip İletişimi ve Liderlik Atölyesi',
    ],
    expertiseAreas: ['Kurumsal Danışmanlık', 'Stres Yönetimi', 'Çalışan Refahı'],
    treatmentAreas: ['Kurumsal Program Tasarımı', 'Bireysel Koçluk', 'Kriz Müdahalesi'],
    summaryBio:
      'Kurumlar ve bireyler için ölçülebilir hedeflerle stres yönetimi ve çalışan refahı programları geliştirir.',
    approach: 'Kurumsal ihtiyaçları analiz ederek ölçülebilir hedeflerle program tasarlar; katılımcı odaklı ve uygulanabilir içerikler geliştirir.',
    specialties: ['Kurumsal Danışmanlık', 'Stres Yönetimi'],
    category: 'corporate',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 7,
    accent: '#2e4a3a',
  },
  {
    id: 'selin-aksoy',
    name: 'Uzm. Psk. Selin Aksoy',
    role: 'Klinik Psikolog',
    bio: 'Kaygı bozuklukları ve travma sonrası destek alanlarında çalışır.',
    longBio: [
      'Uzm. Psk. Selin Aksoy, kaygı bozuklukları ve travma sonrası süreçlerde kanıta dayalı müdahaleler uygular. Danışanların güvenli bir şekilde duygularını işlemelerine alan açar.',
      'Panik atak, sosyal kaygı ve yaşam travmalarında bireysel terapi planları oluşturur; ilerlemeyi düzenli olarak birlikte değerlendirir.',
    ],
    education: 'Klinik Psikoloji Yüksek Lisans · Travma Odaklı Terapi Eğitimi',
    educationDetails: [
      'Ege Üniversitesi — Psikoloji (Lisans)',
      'Ege Üniversitesi — Klinik Psikoloji (Yüksek Lisans)',
    ],
    certificates: [
      'Travma Odaklı Bilişsel Davranışçı Terapi',
      'EMDR Terapi Eğitimi',
      'Kaygı Bozuklukları Uygulayıcı Sertifikası',
    ],
    expertiseAreas: ['Kaygı Bozuklukları', 'Travma Sonrası Destek', 'Bireysel Danışmanlık'],
    treatmentAreas: ['EMDR', 'Bilişsel Davranışçı Terapi', 'Duygu Düzenleme Çalışması'],
    summaryBio:
      'Kaygı ve travma alanlarında güvenli, adım adım ilerleyen bireysel terapi süreçleri yürütür.',
    approach: 'Güvenli bağlanma ve duygu düzenleme becerilerini merkeze alır; danışanın hızına saygı duyarak adım adım ilerler.',
    specialties: ['Kaygı Bozuklukları', 'Travma Sonrası Destek'],
    category: 'clinical',
    languages: ['Türkçe'],
    experienceYears: 9,
    accent: '#5c2848',
  },
  {
    id: 'deniz-koc',
    name: 'Uzm. Psk. Deniz Koç',
    role: 'Psikolog',
    bio: 'Çift ve aile danışmanlığı, iletişim becerileri üzerine çalışır.',
    longBio: [
      'Uzm. Psk. Deniz Koç, çiftlerin iletişim kalıplarını anlamalarına ve daha sağlıklı etkileşim kurmalarına yardımcı olur. Aile danışmanlığında tüm bireylerin sesinin duyulmasını hedefler.',
      'İlişki çatışmaları, ebeveynlik zorlukları ve aile içi rol dağılımı konularında yapılandırılmış görüşmeler yürütür.',
    ],
    education: 'Psikoloji Lisans · Çift ve Aile Terapisi Eğitimi',
    educationDetails: [
      'İstanbul Bilgi Üniversitesi — Psikoloji (Lisans)',
      'Çift ve Aile Terapisi Uzmanlık Programı',
    ],
    certificates: [
      'Gottman Çift Terapisi Temel Düzey',
      'Aile Danışmanlığı Sertifikası',
      'İletişim Becerileri Eğitmenliği',
    ],
    expertiseAreas: ['Çift Danışmanlığı', 'Aile Danışmanlığı', 'İletişim Becerileri'],
    treatmentAreas: ['Çift Terapisi', 'Aile Görüşmeleri', 'Çatışma Çözümleme'],
    summaryBio:
      'Çiftler ve ailelerle tarafsız, yapılandırılmış görüşmelerle iletişim ve bağ kurma süreçlerini destekler.',
    approach: 'Tarafsız ve destekleyici bir arabulucu rolü üstlenir; çiftlerin ve ailelerin kendi çözümlerini keşfetmelerine rehberlik eder.',
    specialties: ['Çift Danışmanlığı', 'Aile Danışmanlığı'],
    category: 'family',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 7,
    accent: '#3a3f5c',
  },
]
