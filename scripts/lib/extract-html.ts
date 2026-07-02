import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../../src/data')

export type HtmlContentRow = {
  bolum: string
  alan: string
  baslik: string
  icerik: string
  link: string
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function stripTags(s: string): string {
  return decodeEntities(
    s
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function sectionLabel(classAttr: string): string {
  const cls = classAttr.split(/\s+/)[0]
  const map: Record<string, string> = {
    herohome: 'Hero',
    cardsFirstBig: 'Hizmet Kartları',
    cards: 'Uzmanlık Alanları',
    imageContent: 'Ekip Tanıtım',
    cardsScroll: 'Değerler Slider',
    contentTags: 'Değerler Etiketleri',
    scientificPublications: 'Blog Önizleme',
    push: 'CTA Alt',
    header: 'Header',
    footer: 'Footer',
    'quick-access': 'Erişilebilirlik',
  }
  return map[cls] ?? cls
}

function pushRow(rows: HtmlContentRow[], seen: Set<string>, row: HtmlContentRow) {
  const key = `${row.bolum}|${row.alan}|${row.icerik}|${row.link}`
  if (!row.icerik && !row.baslik && !row.link) return
  if (seen.has(key)) return
  seen.add(key)
  rows.push(row)
}

function extractFromBlock(html: string, defaultSection: string, seen: Set<string>): HtmlContentRow[] {
  const rows: HtmlContentRow[] = []

  for (const m of html.matchAll(/<h([1-6])[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = stripTags(m[3])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: `Başlık H${m[1]}`, baslik: m[2].split(' ').pop() ?? '', icerik: text, link: '' })
  }
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = stripTags(m[2])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: `Başlık H${m[1]}`, baslik: '', icerik: text, link: '' })
  }

  for (const m of html.matchAll(/<p[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripTags(m[2])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Paragraf', baslik: m[1].split(' ').pop() ?? '', icerik: text, link: '' })
  }
  for (const m of html.matchAll(/<p[^>]*class="scientificPubli-card-date"[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripTags(m[1])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Tarih', baslik: '', icerik: text, link: '' })
  }
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripTags(m[1])
    if (text && text.length > 1) pushRow(rows, seen, { bolum: defaultSection, alan: 'Paragraf', baslik: '', icerik: text, link: '' })
  }

  for (const m of html.matchAll(/<span[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/span>/gi)) {
    const text = stripTags(m[2])
    if (text && text.length < 120) {
      pushRow(rows, seen, { bolum: defaultSection, alan: 'Metin / Etiket', baslik: m[1].split(' ').pop() ?? '', icerik: text, link: '' })
    }
  }

  for (const m of html.matchAll(/<p[^>]*class="submenu-title[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripTags(m[1])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Alt menü başlığı', baslik: '', icerik: text, link: '' })
  }
  for (const m of html.matchAll(/<p[^>]*class="submenu-list-title[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripTags(m[1])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Menü grubu', baslik: '', icerik: text, link: '' })
  }

  for (const m of html.matchAll(/<a[^>]*href="([^"]*)"[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = stripTags(m[3])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Link / Buton', baslik: m[2].split(' ').pop() ?? '', icerik: text, link: m[1] })
  }
  for (const m of html.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = stripTags(m[2])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Link / Buton', baslik: '', icerik: text, link: m[1] })
  }

  for (const m of html.matchAll(/<img[^>]*alt="([^"]*)"[^>]*\/?>/gi)) {
    if (m[1]) pushRow(rows, seen, { bolum: defaultSection, alan: 'Görsel alt metni', baslik: '', icerik: m[1], link: '' })
  }
  for (const m of html.matchAll(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi)) {
    if (m[2]) pushRow(rows, seen, { bolum: defaultSection, alan: 'Görsel', baslik: 'alt metin', icerik: m[2], link: m[1] })
  }

  for (const m of html.matchAll(/<li[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/li>/gi)) {
    const text = stripTags(m[2])
    if (text && text.length < 300) pushRow(rows, seen, { bolum: defaultSection, alan: 'Liste öğesi', baslik: m[1].split(' ').pop() ?? '', icerik: text, link: '' })
  }
  for (const m of html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const text = stripTags(m[1])
    if (text && text.length < 300 && !text.includes('stroke')) {
      pushRow(rows, seen, { bolum: defaultSection, alan: 'Liste öğesi', baslik: '', icerik: text, link: '' })
    }
  }

  for (const m of html.matchAll(/<button[^>]*aria-label="([^"]*)"[^>]*>/gi)) {
    pushRow(rows, seen, { bolum: defaultSection, alan: 'Buton (aria)', baslik: '', icerik: m[1], link: '' })
  }
  for (const m of html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)) {
    const text = stripTags(m[1])
    if (text) pushRow(rows, seen, { bolum: defaultSection, alan: 'Buton', baslik: '', icerik: text, link: '' })
  }

  return rows
}

export function extractHtmlFile(relativePath: string): HtmlContentRow[] {
  const html = readFileSync(join(DATA_DIR, relativePath), 'utf-8')
  const seen = new Set<string>()
  const rows: HtmlContentRow[] = []

  const withoutSvg = html.replace(/<svg[\s\S]*?<\/svg>/gi, '')

  const sections = [...withoutSvg.matchAll(/<section[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/gi)]
  if (sections.length > 0) {
    for (const sec of sections) {
      const label = sectionLabel(sec[1])
      rows.push(...extractFromBlock(sec[2], label, seen))
    }
  } else {
    const headerMatch = withoutSvg.match(/<header[^>]*>([\s\S]*?)<\/header>/i)
    const footerMatch = withoutSvg.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i)
    const quickMatch = withoutSvg.match(/<div[^>]*class="quick-access"[^>]*>([\s\S]*?)<\/div>/i)

    if (quickMatch) rows.push(...extractFromBlock(quickMatch[1], 'Erişilebilirlik', seen))
    if (headerMatch) rows.push(...extractFromBlock(headerMatch[1], 'Header', seen))
    if (footerMatch) rows.push(...extractFromBlock(footerMatch[1], 'Footer', seen))

    if (!headerMatch && !footerMatch) {
      rows.push(...extractFromBlock(withoutSvg, 'İçerik', seen))
    }
  }

  return rows
}

export function loadHomepageContent(): HtmlContentRow[] {
  const hero = extractHtmlFile('site-hero.html')
  const body = extractHtmlFile('site-body.html')
  return [...hero, ...body]
}

export function loadChromeContent(): HtmlContentRow[] {
  return [...extractHtmlFile('site-header.html'), ...extractHtmlFile('site-footer.html')]
}
