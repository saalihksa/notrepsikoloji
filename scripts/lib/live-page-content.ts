import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BLOG_POSTS } from '../../src/data/blogPosts'
import { SERVICE_GROUPS, SERVICES } from '../../src/data/services'
import { TEAM_CATEGORIES, TEAM_MEMBERS } from '../../src/data/team'
import {
  extractAriaLabels,
  extractConstObject,
  extractConstStringArray,
  extractContactFormLabels,
  extractDocumentTitle,
  extractFaqPairs,
  extractFieldLabelProps,
  extractJsxTextByClass,
  extractPlaceholders,
  extractUseMeta,
  readSrc,
} from './extract-tsx'

const __dirname = dirname(fileURLToPath(import.meta.url))

export type ContentRow = {
  bolum: string
  alan: string
  baslik: string
  icerik: string
  link: string
}

const SITE = {
  telefon: '+90 552 154 2552',
  eposta: 'info@notrepsikoloji.com',
}

function r(bolum: string, alan: string, icerik: string, baslik = '', link = ''): ContentRow {
  return { bolum, alan, baslik, icerik, link }
}

function metaRows(sayfaBasligi: string, metaDesc: string): ContentRow[] {
  return [r('Meta', 'Sayfa başlığı (title)', sayfaBasligi), r('Meta', 'Meta açıklama', metaDesc)]
}

function heroRows(
  baslik: string,
  aciklama: string,
  breadcrumbs?: { label: string; href?: string }[],
): ContentRow[] {
  const rows: ContentRow[] = [r('Hero', 'Ana başlık (H1)', baslik), r('Hero', 'Açıklama', aciklama)]
  breadcrumbs?.forEach((crumb, i) => {
    rows.push(r('Hero', 'Breadcrumb', crumb.label, `Adım ${i + 1}`, crumb.href ?? ''))
  })
  rows.push(r('Hero', 'Görsel alt metni', '', 'Arka plan görseli (boş alt)'))
  rows.push(r('Erişilebilirlik', 'Breadcrumb aria-label', 'Sayfa konumu'))
  return rows
}

function serviceSidebarRows(title: string): ContentRow[] {
  return [
    r('Sidebar', 'Başlık', title),
    r('Sidebar', 'Alt başlık', 'Üsküdar, İstanbul'),
    r('Sidebar', 'Etiket', 'Seans süresi', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', '50 dakika', 'Seans süresi'),
    r('Sidebar', 'Etiket', 'Çalışma saatleri', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', 'Pzt – Cmt · 10:00 – 22:00', 'Çalışma saatleri'),
    r('Sidebar', 'Etiket', 'Seans tipi', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', 'Yüz yüze veya online', 'Seans tipi'),
    r('Sidebar', 'Etiket', 'Telefon', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', SITE.telefon, 'Telefon', 'tel:+905521542552'),
    r('Sidebar', 'Buton', 'Randevu Al', '', '/randevu/'),
    r('Sidebar', 'Link', 'Soru sormak ister misiniz? →', '', '/iletisim/'),
  ]
}

function teamSidebarRows(member: (typeof TEAM_MEMBERS)[0]): ContentRow[] {
  return [
    r('Sidebar', 'Başlık', member.name),
    r('Sidebar', 'Alt başlık', member.role),
    r('Sidebar', 'Etiket', 'Deneyim', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', `${member.experienceYears} yıl`, 'Deneyim'),
    r('Sidebar', 'Etiket', 'Eğitim', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', member.education, 'Eğitim'),
    r('Sidebar', 'Etiket', 'Diller', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', member.languages.join(', '), 'Diller'),
    r('Sidebar', 'Etiket', 'Çalışma saatleri', 'Sidebar satır etiketi'),
    r('Sidebar', 'Değer', 'Pzt – Cmt · 10:00 – 22:00', 'Çalışma saatleri'),
    r('Sidebar', 'Buton', 'Randevu Al', '', '/randevu/'),
    r('Sidebar', 'Link', 'Soru sormak ister misiniz? →', '', '/iletisim/'),
  ]
}

const APPT_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
]
const APPT_WEEKDAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
const APPT_TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = 10 + Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  if (hour > 21 || (hour === 21 && minute === '30')) return null
  return `${String(hour).padStart(2, '0')}:${minute}`
}).filter(Boolean) as string[]

export function buildGlobalExtrasRows(): ContentRow[] {
  const manifest = JSON.parse(
    readFileSync(join(__dirname, '../../src/data/pages/manifest.json'), 'utf-8'),
  ) as Record<string, { title: string; file: string }>

  const rows: ContentRow[] = [
    ...TEAM_CATEGORIES.map((c) => r('Ekip Kategorileri (veri)', 'Kategori', c.label, c.id)),
    r('Çerez Politikası', 'Footer linki', 'Çerez ayarları', 'Hedef: /kvkk/#cerez', '/kvkk/#cerez'),
    r('Çerez Politikası', 'Durum', 'Site içeriği henüz tanımlı değil — footer linki mevcut'),
    r('404 / Bilinmeyen URL', 'Davranış', 'Bilinmeyen adresler ana sayfaya yönlendirilir (özel 404 metni yok)'),
    r('Randevu (canlı)', 'URL', '/randevu/', 'React sayfası — arşiv manifestinde yok'),
    r('Portre Placeholder', 'Filigran metni', 'DEMO', 'Görsel placeholder (fotoğraf yoksa)'),
    r('Portre Placeholder', 'aria-hidden', 'true', 'Ekran okuyucuya sunulmaz'),
    r('Ekip Kartı', 'Görsel alt metni', '', 'Liste kartında boş alt (dekoratif)'),
  ]

  for (const [path, meta] of Object.entries(manifest)) {
    rows.push(r('Sayfa Manifest (referans)', 'Tarayıcı başlığı', meta.title, path))
  }

  return rows
}

export function buildHomepageMetaRows(siteBaslik: string, metaDesc: string): ContentRow[] {
  const homeSrc = readSrc('pages/HomePage.tsx')
  const homeTitle = homeSrc.match(/const HOME_TITLE = '([^']+)'/)?.[1] ?? siteBaslik
  return [
    ...metaRows(homeTitle, metaDesc),
    r('Meta', 'document.title (HomePage.tsx)', homeTitle),
  ]
}

export function buildHomepageBlogSupplement(): ContentRow[] {
  return BLOG_POSTS.map((p) =>
    r('Blog Önizleme (blogPosts.ts)', 'Yazı + tarih', p.title, p.date, `/blog/${p.slug}/`),
  )
}

export function buildHizmetlerRows(): ContentRow[] {
  const src = readSrc('pages/HizmetlerPage.tsx')
  const meta = extractUseMeta(src)!
  const rows: ContentRow[] = [
    ...metaRows(`${meta.title} | Notre Psikoloji`, meta.description),
    ...heroRows('Hizmetlerimiz', meta.description, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Hizmetler' },
    ]),
  ]
  SERVICE_GROUPS.forEach((group) => {
    rows.push(r('Hizmet Listesi', 'Grup başlığı', group.label))
    group.slugs.forEach((slug) => {
      const svc = SERVICES.find((s) => s.slug === slug)
      if (svc) {
        rows.push(
          r('Hizmet Listesi', 'Hizmet başlığı', svc.title, svc.shortDesc, `/hizmetler/${svc.slug}/`),
          r('Hizmet Listesi', 'Kısa açıklama', svc.shortDesc, svc.title),
          r('Hizmet Listesi', 'Kart özeti (pushText)', svc.pushText, svc.title),
        )
      }
    })
  })
  return rows
}

export function buildServiceDetailRows(svc: (typeof SERVICES)[0]): ContentRow[] {
  const grup = SERVICE_GROUPS.find((g) => g.slugs.includes(svc.slug))?.label ?? ''
  const others = SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 12)
  return [
    ...metaRows(`${svc.title} | Notre Psikoloji`, svc.shortDesc),
    ...heroRows(svc.title, svc.shortDesc, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Hizmetler', href: '/hizmetler/' },
      { label: svc.title },
    ]),
    r('Giriş', 'Grup', grup),
    r('Giriş', 'Giriş metni', svc.intro),
    r('Veri', 'pushText (kart özeti)', svc.pushText, 'Ana sayfa kartlarında kullanılır'),
    r('İçerik', 'Paragraf 1', svc.richP1),
    r('İçerik', 'Paragraf 2', svc.richP2),
    ...svc.steps.flatMap((step, i) => [
      r('Süreç Adımları', `Adım ${i + 1} başlık`, step.title),
      r('Süreç Adımları', `Adım ${i + 1} metin`, step.text),
    ]),
    r('Konular', 'Bölüm etiketi', 'Bu süreçte çalıştığımız başlıca konular'),
    ...svc.tags.map((tag) => r('Konular', 'Konu', tag)),
    ...serviceSidebarRows(svc.title),
    r('Diğer Hizmetler', 'Bölüm etiketi', 'Diğer hizmetlerimiz'),
    ...others.map((o) => r('Diğer Hizmetler', 'Link', o.title, '', `/hizmetler/${o.slug}/`)),
  ]
}

export function buildHakkimizdaRows(): ContentRow[] {
  const src = readSrc('pages/HakkimizdaPage.tsx')
  const meta = extractUseMeta(src)!
  return [
    ...metaRows(`${meta.title} | Notre Psikoloji`, meta.description),
    ...heroRows('Hakkımızda', meta.description, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Hakkımızda' },
    ]),
    r('İstatistikler', 'Bölüm başlığı', '10 yılı aşkın deneyimle yanınızdayız'),
    r('İstatistikler', 'Etiket', '8+ Uzman Psikolog'),
    r('İstatistikler', 'Etiket', '500+ Danışan'),
    r('İstatistikler', 'Etiket', '%100 Gizlilik'),
    r('İstatistikler', 'Etiket', 'Yüz yüze & Online'),
    r('İstatistikler', 'Buton', 'Randevu Al', '', '/randevu/'),
    r('Hikaye', 'Bölüm başlığı', 'İnsanı merkeze alan bir anlayışla kurulduk'),
    r('Hikaye', 'Paragraf 1', "Notre Psikoloji, psikolojik danışmanlığın herkes için erişilebilir olması gerektiği inancıyla Üsküdar'da kuruldu. Alanında uzman psikologlardan oluşan ekibimizle bireylere, çiftlere, ailelere ve çocuklara kapsamlı destek sunuyoruz."),
    r('Hikaye', 'Paragraf 2 (vurgu)', 'Her danışan benzersizdir. Bilimsel yöntemleri kişiye özel yaklaşımla birleştiriyoruz.'),
    r('Hikaye', 'Link metni', 'Ekibimizle tanışın.', '', '/ekibimiz/'),
    r('Misyon & Vizyon', 'Bölüm başlığı', 'Misyon ve Vizyonumuz'),
    r('Misyon & Vizyon', 'Alt başlık', 'Etik, bilimsel ve insan odaklı yaklaşımımız her çalışmamızın temelini oluşturur.'),
    r('Misyon & Vizyon', 'Kart başlığı', 'Misyonumuz'),
    r('Misyon & Vizyon', 'Kart metni', 'Uzmanlığımız ile birlikte erişilebilir ve ulaşılabilir psikolojik danışmanlık hizmetleri sunmak; bireyin ve ailenin iyilik halini desteklemek.'),
    r('Misyon & Vizyon', 'Kart başlığı', 'Vizyonumuz'),
    r('Misyon & Vizyon', 'Kart metni', 'Etik, bilimsel ve güvenli bir psikolojik danışmanlık anlayışıyla toplumun ruh sağlığına katkı sağlayan, güvenilir bir referans merkezi olmak.'),
    r('Misyon & Vizyon', 'Kart başlığı', 'Yaklaşımımız'),
    r('Misyon & Vizyon', 'Kart metni', 'Kanıta dayalı, güncel psikoloji biliminin yöntemleriyle çalışıyoruz. Her danışan için kişiye özel bir plan oluşturulur; süreç şeffaf ve işbirlikçi ilerler.'),
    r('Ekip CTA', 'Bölüm başlığı', 'Uzman kadromuzla tanışın'),
    r('Ekip CTA', 'Paragraf 1', 'Alanında uzman psikologlardan oluşan ekibimiz, her danışana saygı ve şefkatle yaklaşır. Farklı uzmanlıkların bir araya geldiği kadromuzla bütüncül destek sunuyoruz.'),
    r('Ekip CTA', 'Paragraf 2 (vurgu)', '8 uzman psikolog, geniş uzmanlık yelpazesi.'),
    r('Ekip CTA', 'Buton', 'Ekibimizi tanıyın', '', '/ekibimiz/'),
    r('Ekip CTA', 'Görsel alt metni', 'Notre Psikoloji ekibi'),
  ]
}

export function buildTeamListRows(): ContentRow[] {
  const src = readSrc('pages/TeamPage.tsx')
  const title = extractDocumentTitle(src) ?? 'Ekibimiz | Notre Psikoloji'
  const categoryMap = Object.fromEntries(TEAM_CATEGORIES.map((c) => [c.id, c.label]))

  const rows: ContentRow[] = [
    ...metaRows(title, 'Alanında uzman ve deneyimli psikolog kadromuz.'),
    ...heroRows('Ekibimiz', 'Alanında uzman ve deneyimli psikolog kadromuz.', [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Ekibimiz' },
    ]),
    r('Ekip Listesi', 'Bölüm aria-label', 'Uzman kadromuz'),
    ...TEAM_MEMBERS.map((m) =>
      r('Ekip Listesi', 'Kart — isim', m.name, `${m.role} — ${m.bio}`, `/ekibimiz/${m.id}/`),
    ),
    ...TEAM_MEMBERS.map((m) =>
      r('Ekip Listesi', 'Kart — unvan', m.role, m.name),
    ),
    ...TEAM_MEMBERS.map((m) =>
      r('Ekip Listesi', 'Kart — kısa bio', m.bio, m.name),
    ),
    ...TEAM_MEMBERS.map((m) =>
      r('Ekip Listesi', 'Kategori (veri)', categoryMap[m.category] ?? m.category, m.name),
    ),
    ...TEAM_MEMBERS.map((m) =>
      r('Erişilebilirlik', 'Kart linki', `${m.name} profilini görüntüle`, m.name, `/ekibimiz/${m.id}/`),
    ),
    r('CTA', 'Başlık', 'Size en uygun uzmanla tanışın'),
    r('CTA', 'Metin', 'Randevu için bizimle iletişime geçin; ihtiyacınıza uygun uzmana yönlendirme yapalım.'),
    r('CTA', 'Buton', 'Randevu Al', '', '/randevu/'),
  ]
  return rows
}

function memberFirstName(fullName: string): string {
  return fullName.replace(/^(Dr\.|Uzm\. Psk\.)\s*/, '').split(' ')[0] ?? fullName
}

export function buildTeamDetailRows(m: (typeof TEAM_MEMBERS)[0]): ContentRow[] {
  const categoryMap = Object.fromEntries(TEAM_CATEGORIES.map((c) => [c.id, c.label]))
  const others = TEAM_MEMBERS.filter((o) => o.id !== m.id).slice(0, 6)
  const firstName = memberFirstName(m.name)

  const rows: ContentRow[] = [
    ...metaRows(`${m.name} | Notre Psikoloji`, m.bio),
    ...heroRows(m.name, `${m.role} · ${m.bio}`, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Ekibimiz', href: '/ekibimiz/' },
      { label: m.name },
    ]),
    r('Profil', 'Unvan', m.role),
    r('Profil', 'Kategori', categoryMap[m.category] ?? m.category),
    r('Profil', 'Kısa bio', m.bio),
    r('Profil', 'Görsel alt metni (detay)', m.name),
    r('Eğitim & Deneyim', 'Bölüm başlığı', 'Eğitim & Deneyim'),
    r('Eğitim & Deneyim', 'Liste etiketi', 'Eğitim'),
    ...m.educationDetails.map((line, i) => r('Eğitim & Deneyim', `Eğitim satırı ${i + 1}`, line)),
    r('Eğitim & Deneyim', 'Liste etiketi', 'Sertifika'),
    ...m.certificates.map((cert, i) => r('Eğitim & Deneyim', `Sertifika ${i + 1}`, cert)),
    r('Eğitim & Deneyim', 'Deneyim', `${m.experienceYears} yıl`),
    r('Eğitim & Deneyim', 'Özet eğitim (sidebar)', m.education),
  ]

  if (m.social?.instagram) {
    rows.push(r('Sosyal Medya', 'Instagram', m.social.instagram, m.name))
  }
  if (m.social?.linkedin) {
    rows.push(r('Sosyal Medya', 'LinkedIn', m.social.linkedin, m.name))
  }
  if (!m.social?.instagram && !m.social?.linkedin) {
    rows.push(r('Sosyal Medya', 'Durum', 'Bu ekip üyesi için sosyal medya linki tanımlı değil', m.name))
  }

  rows.push(
    r('Hakkımda', 'Bölüm başlığı', 'Hakkımda'),
    ...m.longBio.map((para, i) => r('Hakkımda', `Paragraf ${i + 1}`, para)),
    r('Uzmanlık Alanları', 'Bölüm başlığı', `${firstName}'in uzmanlık alanları`),
    ...m.expertiseAreas.map((area) => r('Uzmanlık Alanları', 'Alan', area)),
    r('Çalışma Alanları', 'Bölüm başlığı', `${firstName}'in çalışma alanları`),
    ...m.treatmentAreas.map((area) => r('Çalışma Alanları', 'Alan', area)),
    r('Çalışma Yaklaşımı', 'Bölüm başlığı', 'Çalışma yaklaşımı'),
    r('Çalışma Yaklaşımı', 'Metin', m.approach),
  )

  if (m.summaryBio) {
    rows.push(r('Özet', 'Kapanış paragrafı', m.summaryBio))
  }

  rows.push(
    ...teamSidebarRows(m),
    r('İletişim Formu', 'Bölüm başlığı', 'İletişime geçin'),
    r('İletişim Formu', 'Açıklama', `${m.name} ile randevu veya bilgi almak için formu doldurun; ekibimiz en kısa sürede size dönüş yapacaktır.`),
    r('İletişim Formu', 'Alan etiketi', 'Ad'),
    r('İletişim Formu', 'Placeholder', 'Adınız', 'Ad alanı'),
    r('İletişim Formu', 'Alan etiketi', 'Soyad'),
    r('İletişim Formu', 'Placeholder', 'Soyadınız', 'Soyad alanı'),
    r('İletişim Formu', 'Alan etiketi', 'E-posta'),
    r('İletişim Formu', 'Placeholder', 'ornek@email.com', 'E-posta alanı'),
    r('İletişim Formu', 'Alan etiketi', 'Telefon'),
    r('İletişim Formu', 'Placeholder', '05XX XXX XX XX', 'Telefon alanı'),
    r('İletişim Formu', 'Alan etiketi', 'Mesaj'),
    r('İletişim Formu', 'Placeholder', `${m.name} hakkında randevu veya bilgi talebinizi yazın…`, 'Mesaj alanı'),
    r('İletişim Formu', 'Buton', 'Mesaj Gönder'),
    r('İletişim Formu', 'Buton', 'Randevu Al', '', '/randevu/'),
    r('Diğer Ekip', 'Bölüm etiketi', 'Diğer ekip üyelerimiz'),
    ...others.map((o) => r('Diğer Ekip', 'Link', o.name, o.role, `/ekibimiz/${o.id}/`)),
    r('Erişilebilirlik', 'Breadcrumb aria-label', 'Sayfa konumu'),
  )

  return rows
}

export function buildBlogListRows(): ContentRow[] {
  const src = readSrc('pages/BlogPage.tsx')
  const meta = extractUseMeta(src)!
  const heroDesc =
    'Notre Psikoloji blogunda ruh sağlığı, ebeveynlik, çocuk gelişimi ve danışmanlık süreçlerine dair uzman yazılarımızı okuyabilirsiniz.'

  return [
    ...metaRows(`${meta.title} | Notre Psikoloji`, meta.description),
    r('Meta', 'Not', 'Meta açıklama ile hero açıklama farklı — ikisi de sitede kullanılıyor'),
    ...heroRows('Blog', heroDesc, [{ label: 'Ana Sayfa', href: '/' }, { label: 'Blog' }]),
    r('Yazı Listesi', 'Bölüm aria-label', 'Blog yazıları'),
    ...BLOG_POSTS.flatMap((p) => [
      r('Yazı Listesi', 'Kart başlığı', p.title, p.date, `/blog/${p.slug}/`),
      r('Yazı Listesi', 'Kart tarihi', p.date, p.title),
      r('Yazı Listesi', 'Kategori etiketi', 'Blog', p.title),
      r('Yazı Listesi', 'Özet (meta)', p.description, p.title),
      r('Yazı Listesi', 'Link (aria)', 'Devamını oku', p.title, `/blog/${p.slug}/`),
    ]),
  ]
}

export function buildBlogDetailRows(post: (typeof BLOG_POSTS)[0]): ContentRow[] {
  return [
    ...metaRows(`${post.title} | Notre Psikoloji`, post.description),
    r('Hero', 'Ana başlık (H1)', post.title),
    r('Hero', 'Tarih (veri)', post.date, 'Hero’da gösterilmiyor — envanterde'),
    r('Hero', 'Özet (veri)', post.description, 'Hero’da gösterilmiyor — meta’da'),
    r('Hero', 'Görsel alt metni', '', 'Arka plan görseli (boş alt)'),
    ...post.sections.flatMap((sec) => [
      r('İçerik', 'Bölüm başlığı (H2)', sec.title),
      ...sec.body.map((para, i) => r('İçerik', `Paragraf ${i + 1}`, para, sec.title)),
    ]),
  ]
}

export function buildSssRows(): ContentRow[] {
  const src = readSrc('pages/SssPage.tsx')
  const meta = extractUseMeta(src)!
  const faq = extractFaqPairs(src)

  return [
    ...metaRows(`${meta.title} | Notre Psikoloji`, meta.description),
    ...heroRows('Sıkça Sorulan Sorular', meta.description, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'SSS' },
    ]),
    r('SSS', 'Eyebrow', 'Yardım Merkezi'),
    r('SSS', 'Alt başlık', 'Aklınızdaki soruların yanıtları'),
    r('SSS', 'Açıklama', 'Burada yanıtını bulamadığınız sorular için bize doğrudan ulaşabilirsiniz.'),
    ...faq.flatMap((item, i) => [
      r('SSS', `Soru ${i + 1}`, item.q),
      r('SSS', `Cevap ${i + 1}`, item.a, item.q),
    ]),
    r('CTA', 'Metin', 'Sorunuzu burada bulamadınız mı?'),
    r('CTA', 'Buton', 'Bize Yazın', '', '/iletisim/'),
    r('CTA', 'Buton', 'Randevu Al', '', '/randevu/'),
  ]
}

export function buildContactRows(): ContentRow[] {
  const src = readSrc('pages/ContactPage.tsx')
  const contact = extractConstObject(src, 'CONTACT')
  const services = extractConstStringArray(src, 'SERVICES')
  const meta = extractUseMeta(src)
  if (!meta) throw new Error('ContactPage.tsx: useMeta bulunamadı')
  const placeholders = extractPlaceholders(src)
  const fieldLabels = extractFieldLabelProps(src)
  const formLabels = extractContactFormLabels(src)
  const introLead = extractJsxTextByClass(src, 'contact-page__lead') ?? ''
  const formDesc = extractJsxTextByClass(src, 'contact-page__form-desc') ?? ''
  const eyebrow = extractJsxTextByClass(src, 'contact-page__eyebrow') ?? 'Bize ulaşın'
  const asideHeading = extractJsxTextByClass(src, 'contact-page__aside-heading') ?? 'Notre Psikoloji'
  const asideSub = extractJsxTextByClass(src, 'contact-page__aside-sub') ?? 'Psikolojik Danışmanlık Merkezi'
  const sectionAria =
    src.match(/aria-label="([^"]+)"[^>]*>\s*<div className="container contact-page__container"/)?.[1] ??
    'İletişim bilgileri ve mesaj formu'

  const rows: ContentRow[] = [
    ...metaRows(`${meta.title} | Notre Psikoloji`, meta.description),
    ...heroRows('İletişim', meta.description, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'İletişim' },
    ]),
    r('Giriş', 'Bölüm aria-label', sectionAria),
    r('Giriş', 'Eyebrow', eyebrow),
    r('Giriş', 'Giriş metni', introLead),
    r('Sidebar', 'Başlık', asideHeading),
    r('Sidebar', 'Alt başlık', asideSub),
    r('İletişim Bilgileri', 'Kanal etiketi', 'Telefon'),
    r('İletişim Bilgileri', 'Telefon', contact.phone ?? SITE.telefon, '', contact.phoneHref ?? 'tel:+905521542552'),
    r('İletişim Bilgileri', 'Kanal etiketi', 'E-posta'),
    r('İletişim Bilgileri', 'E-posta', contact.email ?? SITE.eposta, '', `mailto:${contact.email ?? SITE.eposta}`),
    r('İletişim Bilgileri', 'Kanal etiketi', 'Adres'),
    r('İletişim Bilgileri', 'Adres', contact.address ?? 'Üsküdar, İstanbul'),
    r('İletişim Bilgileri', 'Kanal etiketi', 'Çalışma saatleri'),
    r('İletişim Bilgileri', 'Çalışma saatleri', contact.hours ?? 'Pzt – Cmt · 10:00 – 22:00'),
    r('İletişim Bilgileri', 'Not', contact.hoursNote ?? 'Pazar kapalı', 'Saat alt notu'),
    r('CTA', 'Buton', 'Randevu Al', '', '/randevu/'),
    r('CTA', 'Link', 'Sık sorulan sorular →', '', '/sss/'),
    r('Harita', 'iframe başlığı', 'Notre Psikoloji konum'),
    r('Harita', 'Sorgu', contact.mapQuery ?? 'Üsküdar, İstanbul, Türkiye'),
    r('Form', 'Bölüm başlığı', 'Mesaj gönderin'),
    r('Form', 'Açıklama', formDesc),
  ]

  fieldLabels.forEach((label, i) => {
    rows.push(r('Form', 'Alan etiketi', label))
    if (placeholders[i]) rows.push(r('Form', 'Placeholder', placeholders[i], label))
  })

  formLabels.forEach((label) => {
    rows.push(r('Form', 'Alan etiketi', label))
    if (label === 'Mesajınız' && placeholders[fieldLabels.length]) {
      rows.push(r('Form', 'Placeholder', placeholders[fieldLabels.length], label))
    }
  })

  services.forEach((s) => rows.push(r('Form', 'Hizmet seçeneği', s)))
  rows.push(r('Form', 'Buton', 'Mesaj Gönder'))

  return rows
}

export function buildAppointmentRows(): ContentRow[] {
  const src = readSrc('pages/AppointmentPage.tsx')
  const title = extractDocumentTitle(src) ?? 'Randevu Al | Notre Psikoloji'
  const placeholders = extractPlaceholders(src)
  const ariaLabels = extractAriaLabels(src)

  return [
    ...metaRows(title, 'İhtiyacınıza uygun uzman ve randevu saatini birlikte belirleyelim.'),
    ...heroRows('Randevu Al', 'İhtiyacınıza uygun uzman ve randevu saatini birlikte belirleyelim.', [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Randevu Al' },
    ]),
    r('Adım 1 — Takvim', 'Seans adı', 'İlk Danışmanlık Görüşmesi'),
    r('Adım 1 — Takvim', 'Seans süresi', '50 dk'),
    r('Adım 1 — Takvim', 'Açıklama', 'İhtiyacınızı dinleyeceğimiz kısa bir tanışma görüşmesi. Süreci, uygun uzmanı ve randevu seçeneklerini birlikte netleştiririz. Yüz yüze veya online.'),
    r('Adım 1 — Takvim', 'Saat dilimi etiketi', 'Saat dilimi'),
    r('Adım 1 — Takvim', 'Saat dilimi', 'Europe/Istanbul (GMT+3)'),
    r('Adım 1 — Takvim', 'Haftanın günleri', APPT_WEEKDAYS.join(', ')),
    r('Adım 1 — Takvim', 'Aylar', APPT_MONTHS.join(', ')),
    r('Adım 1 — Takvim', 'Gün aria-label şablonu', '{gün} {ay} {yıl}', 'Örn: 15 Mart 2026'),
    r('Adım 1 — Takvim', 'Müsait saatler etiketi şablonu', '{gün} {ay} · Müsait saatler'),
    ...APPT_TIME_SLOTS.map((t) => r('Adım 1 — Takvim', 'Müsait saat', t)),
    r('Adım 1 — Takvim', 'Placeholder', 'Saat seçmek için takvimden bir gün seçin.'),
    ...ariaLabels.map((a) => r('Adım 1 — Takvim', 'aria-label', a)),
    r('Adım 1 — Takvim', 'Buton', 'Devam Et'),
    r('Adım 2 — Form', 'Geri linki', 'Geri'),
    r('Adım 2 — Form', 'Bölüm başlığı', 'İletişim Bilgileriniz'),
    r('Adım 2 — Form', 'Açıklama', 'Randevunuzu tamamlamak için bilgilerinizi girin. Onay bilgisi size iletilecektir.'),
    r('Adım 2 — Form', 'Alan etiketi', 'Ad'),
    r('Adım 2 — Form', 'Placeholder', placeholders[0] ?? 'Adınızı girin', 'Ad alanı'),
    r('Adım 2 — Form', 'Alan etiketi', 'Soyad'),
    r('Adım 2 — Form', 'Placeholder', placeholders[1] ?? 'Soyadınızı girin', 'Soyad alanı'),
    r('Adım 2 — Form', 'Alan etiketi', 'Telefon'),
    r('Adım 2 — Form', 'Placeholder', placeholders[2] ?? '+90 5xx xxx xx xx', 'Telefon alanı'),
    r('Adım 2 — Form', 'Alan etiketi', 'E-posta'),
    r('Adım 2 — Form', 'Placeholder', placeholders[3] ?? 'ornek@mail.com', 'E-posta alanı'),
    r('Adım 2 — Form', 'Alan etiketi', 'Not (isteğe bağlı)'),
    r('Adım 2 — Form', 'Placeholder', placeholders[4] ?? 'Görüşmek istediğiniz konu hakkında kısa bir not bırakabilirsiniz.', 'Not alanı'),
    r('Adım 2 — Form', 'Buton', 'Randevuyu Onayla'),
    r('Adım 2 — Form', 'Özet şablonu', '{gün} {ay} {yıl}, {saat}', 'Seçilen randevu özeti'),
    r('Adım 3 — Onay', 'Başlık', 'Randevunuz Alındı!'),
    r('Adım 3 — Onay', 'Mesaj şablonu', '{ad} {soyad}, randevu talebiniz başarıyla iletildi. Ekibimiz en kısa sürede {e-posta} adresine veya {telefon} numarasına geri dönecektir.'),
    r('Adım 3 — Onay', 'Özet satırı 1', '{tarih}, {saat}', 'Takvim ikonu ile'),
    r('Adım 3 — Onay', 'Özet satırı 2', '50 dk · İlk Danışmanlık Görüşmesi'),
    r('Adım 3 — Onay', 'Buton', 'Yeni Randevu Al'),
  ]
}

export function buildKvkkRows(): ContentRow[] {
  const src = readSrc('pages/KvkkPage.tsx')
  const meta = extractUseMeta(src)!

  const contentBlock = src.match(/<section className="contentList">([\s\S]*?)<\/section>/)?.[1] ?? src
  const h2 = contentBlock.match(/<h2>([^<]+)<\/h2>/)?.[1]
  const sections = [...contentBlock.matchAll(/<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)]

  const rows: ContentRow[] = [
    ...metaRows('KVKK ve Gizlilik | Notre Psikoloji', meta.description),
    ...heroRows('KVKK ve Gizlilik', meta.description, [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'KVKK' },
    ]),
  ]

  const introPara = contentBlock.match(/<h2>[^<]+<\/h2>\s*<p>([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, '').trim()
  if (h2) rows.push(r('İçerik', 'Başlık (H2)', h2))
  if (introPara) rows.push(r('İçerik', 'Paragraf', introPara))

  sections.forEach(([heading, body]) => {
    const para = body.replace(/<[^>]+>/g, '').trim()
    const emailMatch = para.match(/info@notrepsikoloji\.com/)
    rows.push(r('İçerik', 'Başlık (H3)', heading))
    rows.push(r('İçerik', 'Paragraf', para, '', emailMatch ? 'mailto:info@notrepsikoloji.com' : ''))
  })

  rows.push(
    r('Çerez Politikası', 'Footer linki', 'Çerez ayarları', '/kvkk/#cerez'),
    r('Çerez Politikası', 'Durum', 'KVKK sayfasında #cerez bölümü henüz yok — içerik eklenecek'),
  )

  return rows
}
