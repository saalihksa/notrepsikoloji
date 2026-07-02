import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ExcelJS from 'exceljs'
import { BLOG_POSTS } from '../../src/data/blogPosts'
import { SERVICES } from '../../src/data/services'
import { TEAM_MEMBERS } from '../../src/data/team'
import { loadChromeContent } from './extract-html'

const __dirname = dirname(fileURLToPath(import.meta.url))

export type PageDef = {
  sayfaAdi: string
  url: string
  sayfaBasligi: string
  rows: { bolum: string; alan: string; baslik: string; icerik: string; link: string }[]
}

const REQUIRED_URLS = [
  '/',
  '/hizmetler/',
  '/hakkimizda/',
  '/ekibimiz/',
  '/blog/',
  '/sss/',
  '/iletisim/',
  '/randevu/',
  '/kvkk/',
  ...SERVICES.map((s) => `/hizmetler/${s.slug}/`),
  ...TEAM_MEMBERS.map((m) => `/ekibimiz/${m.id}/`),
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}/`),
]

const REQUIRED_CHROME_LINKS = ['/iletisim/', '/randevu/', '/hizmetler/', '/ekibimiz/', '/blog/', '/sss/']

const CONTACT_REQUIRED = [
  'Telefon',
  'E-posta',
  'Mesaj gönderin',
  'Randevu Al',
  'Bireysel Danışmanlık',
]

export function validatePages(pages: PageDef[]): string[] {
  const errors: string[] = []
  const urls = new Set(pages.map((p) => p.url))

  for (const url of REQUIRED_URLS) {
    if (!urls.has(url)) errors.push(`Eksik sayfa: ${url}`)
  }

  for (const page of pages) {
    if (page.rows.length === 0) {
      errors.push(`Boş içerik: ${page.sayfaAdi} (${page.url})`)
    }
    const emptyContent = page.rows.filter((row) => !row.icerik && !row.baslik && !row.link)
    if (emptyContent.length > 0) {
      errors.push(
        `${page.sayfaAdi}: ${emptyContent.length} satırda metin/link yok (${emptyContent.map((r) => r.alan).slice(0, 3).join(', ')}…)`,
      )
    }
  }

  const serviceSheets = pages.filter((p) => p.sayfaAdi.startsWith('Hizmet — '))
  if (serviceSheets.length !== SERVICES.length) {
    errors.push(`Hizmet detay sayısı uyuşmuyor: ${serviceSheets.length} ≠ ${SERVICES.length}`)
  }

  const teamSheets = pages.filter((p) => p.sayfaAdi.startsWith('Ekip — '))
  if (teamSheets.length !== TEAM_MEMBERS.length) {
    errors.push(`Ekip detay sayısı uyuşmuyor: ${teamSheets.length} ≠ ${TEAM_MEMBERS.length}`)
  }

  const blogSheets = pages.filter((p) => p.sayfaAdi.startsWith('Blog — '))
  if (blogSheets.length !== BLOG_POSTS.length) {
    errors.push(`Blog detay sayısı uyuşmuyor: ${blogSheets.length} ≠ ${BLOG_POSTS.length}`)
  }

  const chrome = loadChromeContent()
  const chromeText = chrome.map((r) => `${r.icerik} ${r.link}`).join(' ')
  for (const link of REQUIRED_CHROME_LINKS) {
    if (!chromeText.includes(link)) {
      errors.push(`Header/Footer'da eksik menü linki: ${link}`)
    }
  }

  const contactPage = pages.find((p) => p.url === '/iletisim/')
  if (contactPage) {
    const allText = contactPage.rows.map((r) => r.icerik).join(' ')
    for (const key of CONTACT_REQUIRED) {
      if (!allText.includes(key)) errors.push(`İletişim sayfasında eksik içerik: "${key}"`)
    }
    if (contactPage.rows.length < 25) {
      errors.push(`İletişim sayfası şüpheli derecede az satır: ${contactPage.rows.length}`)
    }
  }

  const home = pages.find((p) => p.url === '/')
  if (home && home.rows.length < 40) {
    errors.push(`Ana sayfa şüpheli derecede az satır: ${home.rows.length}`)
  }

  const headerHtml = readFileSync(join(__dirname, '../../src/data/site-header.html'), 'utf-8')
  if (!headerHtml.includes('/iletisim/')) {
    errors.push('site-header.html içinde /iletisim/ linki yok')
  }

  return errors
}

export async function validateExcelFile(
  filePath: string,
  expectedSheetCount: number,
): Promise<string[]> {
  const errors: string[] = []
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(filePath)

  if (wb.worksheets.length !== expectedSheetCount) {
    errors.push(`Sekme sayısı uyuşmuyor: ${wb.worksheets.length} ≠ ${expectedSheetCount}`)
  }

  const names = new Set<string>()
  for (const ws of wb.worksheets) {
    if (names.has(ws.name)) errors.push(`Yinelenen sekme adı: ${ws.name}`)
    names.add(ws.name)
    if (ws.name.length > 31) errors.push(`Geçersiz sekme adı (>31 karakter): ${ws.name}`)

    const header = ws.getRow(5)
    const headers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => String(header.getCell(c).value ?? ''))
    if (!headers.some((h) => h.includes('Mevcut Metin'))) {
      if (ws.name !== 'Nasıl Kullanılır' && ws.name !== 'Sayfa Listesi') {
        errors.push(`"${ws.name}" sekmesinde beklenen sütun başlıkları yok`)
      }
    }
  }

  const guide = wb.getWorksheet('Sayfa Listesi')
  if (!guide) {
    errors.push('Sayfa Listesi sekmesi eksik')
  } else {
    const rowCount = guide.rowCount
    if (rowCount < 10) errors.push(`Sayfa Listesi çok kısa: ${rowCount} satır`)
  }

  return errors
}
