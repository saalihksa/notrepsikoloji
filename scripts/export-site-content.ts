/**
 * Notre Psikoloji — sayfa sayfa site içerik envanteri
 * Kullanım: npm run export:content
 */
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ExcelJS from 'exceljs'
import { BLOG_POSTS } from '../src/data/blogPosts'
import { SERVICES } from '../src/data/services'
import { TEAM_MEMBERS } from '../src/data/team'
import { loadChromeContent, loadHomepageContent } from './lib/extract-html'
import {
  buildAppointmentRows,
  buildBlogDetailRows,
  buildBlogListRows,
  buildContactRows,
  buildGlobalExtrasRows,
  buildHakkimizdaRows,
  buildHizmetlerRows,
  buildHomepageBlogSupplement,
  buildHomepageMetaRows,
  buildKvkkRows,
  buildServiceDetailRows,
  buildSssRows,
  buildTeamDetailRows,
  buildTeamListRows,
} from './lib/live-page-content'
import { validateExcelFile, validatePages } from './lib/validate-export'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '..', 'notre-psikoloji-icerik-envanteri.xlsx')

const BURGUNDY = 'FF5A0202'
const BURGUNDY_LIGHT = 'FFF5E9DD'
const WHITE = 'FFFFFFFF'
const ALT_ROW = 'FFFAF7F4'
const GREEN_EDIT = 'FFE8F5E9'
const STATUS_NONE = 'FFD4EDDA'
const MARK_CHECKED = 'FFFFF3CD'
const MARK_PENDING = 'FFFFE0B2'
const MARK_DONE = 'FFD4EDFA'
const EDIT_BLANK_BG = 'FFF1F8E9'
const SEPARATOR_BG = 'FFF5F5F5'

/** Bölüm renkleri — içerik türünü bir bakışta ayırt etmek için */
const BOLUM_RENK: Record<string, string> = {
  Meta: 'FFF3E8FF',
  Hero: 'FFE3F2FD',
  Sidebar: 'FFFFF8E1',
  CTA: 'FFE8F5E9',
  Form: 'FFFFF3E0',
  'İletişim Bilgileri': 'FFFFF3E0',
  'Adım 1 — Takvim': 'FFFFF3E0',
  'Adım 2 — Form': 'FFFFF3E0',
  'Adım 3 — Onay': 'FFE8F5E9',
  SSS: 'FFFCE4EC',
}

const DURUM_LISTESI = 'Değişiklik yok,Güncellenecek,Güncellendi,Onaylandı'
const ISARET_LISTESI = '☐,☑'

const COL = {
  no: { header: '#', key: 'no', width: 5 },
  isaret: { header: '☑️ Değiştir', key: 'isaret', width: 11 },
  bolum: { header: 'Sayfadaki Bölüm', key: 'bolum', width: 20 },
  alan: { header: 'Ne Tür İçerik?', key: 'alan', width: 20 },
  baslik: { header: 'Başlık / Etiket', key: 'baslik', width: 28 },
  icerik: { header: 'Mevcut Metin', key: 'icerik', width: 52 },
  link: { header: 'Link', key: 'link', width: 28 },
  karakter: { header: 'Karakter', key: 'karakter', width: 9 },
  yeni: { header: '✏️ YENİ METİN (buraya yazın)', key: 'yeni', width: 40 },
  durum: { header: 'Durum', key: 'durum', width: 16 },
} as const

const COLUMNS = Object.values(COL)
const COL_IDX = Object.fromEntries(COLUMNS.map((c, i) => [c.key, i + 1])) as Record<keyof typeof COL, number>
const DATA_START_ROW = 6
const HEADER_ROW = 5

type ContentRow = {
  bolum: string
  alan: string
  baslik: string
  icerik: string
  link: string
}

type PageDef = {
  sayfaAdi: string
  url: string
  sayfaBasligi: string
  rows: ContentRow[]
}

type SheetRowKind = 'content' | 'edit' | 'separator'

type SheetRow = {
  kind: SheetRowKind
  data?: ContentRow
  bolumLabel?: string
}

const SITE = {
  marka: 'Notre Psikoloji',
  slogan: 'Psikolojik Danışmanlık Merkezi',
  siteBaslik: 'Notre Psikoloji | Psikolojik Danışmanlık Merkezi',
  metaAciklama:
    'Notre Psikoloji — bireysel, çift, ergen ve online psikolojik danışmanlık hizmetleri. Randevu alın.',
  telefon: '+90 552 154 2552',
  eposta: 'info@notrepsikoloji.com',
  adres: 'Üsküdar, İstanbul',
  calismaSaatleri: 'Pazartesi – Cumartesi 10:00 – 22:00 · Pazar kapalı',
  instagram: 'https://www.instagram.com/notrepsikoloji/',
  linkedin: 'https://www.linkedin.com/company/notrepsikoloji/',
  telif: '© 2026 Notre Psikoloji',
}

function r(
  bolum: string,
  alan: string,
  icerik: string,
  baslik = '',
  link = '',
): ContentRow {
  return { bolum, alan, baslik, icerik, link }
}

function metaRows(sayfaBasligi: string, metaDesc: string): ContentRow[] {
  return [
    r('Meta', 'Sayfa başlığı (title)', sayfaBasligi),
    r('Meta', 'Meta açıklama', metaDesc),
  ]
}

function heroRows(
  baslik: string,
  aciklama: string,
  breadcrumbs?: { label: string; href?: string }[],
): ContentRow[] {
  const rows: ContentRow[] = [
    r('Hero', 'Ana başlık (H1)', baslik),
    r('Hero', 'Açıklama', aciklama),
  ]
  breadcrumbs?.forEach((crumb, i) => {
    rows.push(
      r('Hero', 'Breadcrumb', crumb.label, `Adım ${i + 1}`, crumb.href ?? ''),
    )
  })
  return rows
}

function htmlToRows(rows: { bolum: string; alan: string; baslik: string; icerik: string; link: string }[]): ContentRow[] {
  return rows.map((row) => ({ ...row }))
}

function readProjectFile(...parts: string[]): string {
  return readFileSync(join(__dirname, '..', ...parts), 'utf-8')
}

function sanitizeSheetName(name: string): string {
  const clean = name.replace(/[\\/*?:\[\]]/g, '-').trim()
  return clean.length > 31 ? clean.slice(0, 31) : clean
}

function buildPages(): PageDef[] {
  const pages: PageDef[] = []

  // ── Global site ayarları (index.html, manifest) ─────────────────
  const indexHtml = readProjectFile('index.html')
  const manifest = JSON.parse(readProjectFile('public/site.webmanifest'))
  const metaDescMatch = indexHtml.match(/name="description"\s+content="([^"]*)"/)
  const themeColorMatch = indexHtml.match(/name="theme-color"\s+content="([^"]*)"/)

  pages.push({
    sayfaAdi: 'Global — Site Ayarları',
    url: '(tüm site)',
    sayfaBasligi: SITE.siteBaslik,
    rows: [
      r('Meta (index.html)', 'Sayfa başlığı (title)', SITE.siteBaslik),
      r('Meta (index.html)', 'Meta açıklama', metaDescMatch?.[1] ?? SITE.metaAciklama),
      r('Meta (index.html)', 'Theme color', themeColorMatch?.[1] ?? '#5A0202'),
      r('Meta (index.html)', 'Dil', 'tr', 'html lang'),
      r('PWA Manifest', 'Uygulama adı', manifest.name),
      r('PWA Manifest', 'Kısa ad', manifest.short_name),
      r('PWA Manifest', 'Theme color', manifest.theme_color),
      r('PWA Manifest', 'Arka plan rengi', manifest.background_color),
      r('PWA Manifest', 'Görünüm modu', manifest.display),
      r('İletişim (global)', 'Telefon', SITE.telefon),
      r('İletişim (global)', 'E-posta', SITE.eposta),
      r('İletişim (global)', 'Adres', SITE.adres),
      r('İletişim (global)', 'Çalışma saatleri', SITE.calismaSaatleri),
      r('Sosyal Medya', 'Instagram', SITE.instagram),
      r('Sosyal Medya', 'LinkedIn', SITE.linkedin),
      r('Erişilebilirlik', 'Breadcrumb aria-label', 'Sayfa konumu'),
      r('Erişilebilirlik', 'Ana içerik id', 'contenu-principal'),
      r('Erişilebilirlik', 'Footer id', 'pied-de-page'),
      r('Erişilebilirlik', 'Header id', 'en-tete'),
      ...buildGlobalExtrasRows(),
    ],
  })

  // ── Ortak: Header & Footer (HTML kaynağından) ───────────────────
  pages.push({
    sayfaAdi: 'Ortak — Header & Footer',
    url: '(tüm sayfalarda)',
    sayfaBasligi: '—',
    rows: htmlToRows(loadChromeContent()),
  })

  // ── Ana Sayfa (HTML kaynağından + meta) ─────────────────────────
  pages.push({
    sayfaAdi: 'Ana Sayfa',
    url: '/',
    sayfaBasligi: SITE.siteBaslik,
    rows: [
      ...buildHomepageMetaRows(SITE.siteBaslik, metaDescMatch?.[1] ?? SITE.metaAciklama),
      ...htmlToRows(loadHomepageContent()),
      ...buildHomepageBlogSupplement(),
    ],
  })

  // ── Hizmetler listesi (canlı TSX + services.ts) ─────────────────
  pages.push({
    sayfaAdi: 'Hizmetler',
    url: '/hizmetler/',
    sayfaBasligi: 'Hizmetler | Notre Psikoloji',
    rows: buildHizmetlerRows(),
  })

  // ── Her hizmet detay ────────────────────────────────────────────
  SERVICES.forEach((svc) => {
    pages.push({
      sayfaAdi: `Hizmet — ${svc.title}`,
      url: `/hizmetler/${svc.slug}/`,
      sayfaBasligi: `${svc.title} | Notre Psikoloji`,
      rows: buildServiceDetailRows(svc),
    })
  })

  // ── Hakkımızda (canlı TSX) ────────────────────────────────────
  pages.push({
    sayfaAdi: 'Hakkımızda',
    url: '/hakkimizda/',
    sayfaBasligi: 'Hakkımızda | Notre Psikoloji',
    rows: buildHakkimizdaRows(),
  })

  // ── Ekibimiz ────────────────────────────────────────────────────
  pages.push({
    sayfaAdi: 'Ekibimiz',
    url: '/ekibimiz/',
    sayfaBasligi: 'Ekibimiz | Notre Psikoloji',
    rows: buildTeamListRows(),
  })

  // ── Her ekip detay ──────────────────────────────────────────────
  TEAM_MEMBERS.forEach((m) => {
    pages.push({
      sayfaAdi: `Ekip — ${m.name}`,
      url: `/ekibimiz/${m.id}/`,
      sayfaBasligi: `${m.name} | Notre Psikoloji`,
      rows: buildTeamDetailRows(m),
    })
  })

  // ── Blog listesi ────────────────────────────────────────────────
  pages.push({
    sayfaAdi: 'Blog',
    url: '/blog/',
    sayfaBasligi: 'Blog | Notre Psikoloji',
    rows: buildBlogListRows(),
  })

  // ── Her blog detay ──────────────────────────────────────────────
  BLOG_POSTS.forEach((post) => {
    pages.push({
      sayfaAdi: `Blog — ${post.title.slice(0, 40)}`,
      url: `/blog/${post.slug}/`,
      sayfaBasligi: `${post.title} | Notre Psikoloji`,
      rows: buildBlogDetailRows(post),
    })
  })

  // ── SSS (canlı TSX) ─────────────────────────────────────────────
  pages.push({
    sayfaAdi: 'SSS',
    url: '/sss/',
    sayfaBasligi: 'SSS | Notre Psikoloji',
    rows: buildSssRows(),
  })

  // ── İletişim (canlı TSX) ────────────────────────────────────────
  pages.push({
    sayfaAdi: 'İletişim',
    url: '/iletisim/',
    sayfaBasligi: 'İletişim | Notre Psikoloji',
    rows: buildContactRows(),
  })

  // ── Randevu (canlı TSX) ─────────────────────────────────────────
  pages.push({
    sayfaAdi: 'Randevu',
    url: '/randevu/',
    sayfaBasligi: 'Randevu Al | Notre Psikoloji',
    rows: buildAppointmentRows(),
  })

  // ── KVKK (canlı TSX) ────────────────────────────────────────────
  pages.push({
    sayfaAdi: 'KVKK',
    url: '/kvkk/',
    sayfaBasligi: 'KVKK ve Gizlilik | Notre Psikoloji',
    rows: buildKvkkRows(),
  })

  return pages
}

function bolumRengi(bolum: string): string {
  for (const [key, color] of Object.entries(BOLUM_RENK)) {
    if (bolum.startsWith(key) || bolum === key) return color
  }
  return WHITE
}

function setFill(cell: ExcelJS.Cell, color: string) {
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } }
}

function setBorder(cell: ExcelJS.Cell) {
  cell.border = {
    top: { style: 'thin', color: { argb: 'FFE8E0D8' } },
    left: { style: 'thin', color: { argb: 'FFE8E0D8' } },
    bottom: { style: 'thin', color: { argb: 'FFE8E0D8' } },
    right: { style: 'thin', color: { argb: 'FFE8E0D8' } },
  }
}

function karakterSayisi(alan: string, metin: string): string {
  if (!metin) return ''
  const seoAlanlar = ['title', 'meta', 'başlık', 'h1', 'açıklama', 'özet']
  const lower = alan.toLowerCase()
  if (!seoAlanlar.some((k) => lower.includes(k))) return ''
  return String(metin.length)
}

function isEditableRow(row: ContentRow): boolean {
  const alan = row.alan.toLowerCase()
  const skip =
    /aria-label|bölüm aria|iframe|theme color|görünüm modu|arka plan rengi|dil$|takvim aria|buton \(aria\)|liste etiketi/.test(
      alan,
    )
  if (skip) return false
  if (!row.icerik && !row.baslik) return false
  return true
}

function expandPageRows(rows: ContentRow[]): SheetRow[] {
  const expanded: SheetRow[] = []
  let prevBolum = ''

  for (const row of rows) {
    if (prevBolum && row.bolum !== prevBolum) {
      expanded.push({ kind: 'separator', bolumLabel: row.bolum })
    }
    expanded.push({ kind: 'content', data: row })
    if (isEditableRow(row)) {
      expanded.push({ kind: 'edit', data: row })
    }
    prevBolum = row.bolum
  }

  return expanded
}

function colLetter(index: number): string {
  let n = index
  let s = ''
  while (n > 0) {
    const rem = (n - 1) % 26
    s = String.fromCharCode(65 + rem) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

function addHowToSheet(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet('Nasıl Kullanılır', {
    properties: { tabColor: { argb: BURGUNDY } },
    views: [{ showGridLines: false }],
  })

  const blocks: [string, string][] = [
    ['Notre Psikoloji — İçerik Envanteri', ''],
    ['Bu dosya ne?', 'Sitedeki her sayfanın tüm metinlerini tek bir yerde toplar. İçerik güncellemesi yaparken referans olarak kullanın.'],
    ['', ''],
    ['1️⃣  Sayfayı bulun', '"Sayfa Listesi" sekmesine gidin. Düzenlemek istediğiniz sayfaya tıklayın (sekme adı = sayfa adı).'],
    ['2️⃣  İçeriği okuyun', '"Mevcut Metin" sütununda sitede şu an yayında olan yazıları görürsünüz. Renkli satırlar bölümleri ayırır (mavi=Hero, mor=Meta, sarı=Sidebar vb.).'],
    ['3️⃣  Düzenleme satırını kullanın', 'Düzenlenebilir her alanın altında yeşil boş bir "↳ Düzenleme" satırı vardır. Yeni metni oradaki "✏️ YENİ METİN" hücresine yazın.'],
    ['4️⃣  Kutucuğu işaretleyin', '"☑️ Değiştir" sütununda ☐ → ☑ seçerek alanı takibe alın. İşaretli satırlar otomatik turuncu renkle vurgulanır.'],
    ['5️⃣  Durumu güncelleyin', '"Durum" sütunundan seçin: Değişiklik yok → Güncellenecek → Güncellendi → Onaylandı. Durum değişince satır rengi güncellenir.'],
    ['6️⃣  Filtre kullanın', 'Başlık satırındaki ▼ oklarıyla sadece işaretli (☑) veya "Güncellenecek" satırları gösterebilirsiniz.'],
    ['', ''],
    ['Renk rehberi', ''],
    ['🟢 Açık yeşil satırlar', 'Boş düzenleme satırları — yeni metni buraya yazın'],
    ['🟠 Turuncu satırlar', '☑ işaretli veya "Güncellenecek" durumundaki alanlar'],
    ['🔵 Mavi satırlar', '"Güncellendi" olarak işaretlenen alanlar'],
    ['⬜ Gri ince satırlar', 'Bölüm ayırıcıları'],
    ['🟣 Mor satırlar', 'Google / tarayıcı bilgileri (sayfa başlığı, meta açıklama)'],
    ['🔵 Mavi satırlar', 'Sayfa üstü hero alanı (büyük başlık, açıklama)'],
    ['🟡 Sarı satırlar', 'Yan panel (sidebar) bilgileri'],
    ['🟢 Yeşil satırlar', 'CTA / randevu çağrıları'],
    ['🟠 Turuncu satırlar', 'Form alanları ve etiketleri'],
    ['🩷 Pembe satırlar', 'SSS soru-cevapları'],
    ['', ''],
    ['İpucu', 'Karakter sütunu SEO metinleri için karakter sayısını gösterir. Google başlık için ~60, açıklama için ~160 karakter önerilir.'],
    ['Güncelleme tarihi', new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })],
  ]

  blocks.forEach(([title, body], i) => {
    const row = ws.getRow(i + 1)
    const titleCell = row.getCell(1)
    titleCell.value = title
    titleCell.font = { bold: !!body, size: body ? 12 : 14, color: { argb: body ? 'FF333333' : BURGUNDY } }
    const bodyCell = row.getCell(2)
    bodyCell.value = body
    bodyCell.font = { size: 11, color: { argb: 'FF555555' } }
    bodyCell.alignment = { wrapText: true, vertical: 'top' }
    if (!body && title) {
      setFill(titleCell, BURGUNDY_LIGHT)
      row.height = 28
    }
    if (body) row.height = Math.max(20, Math.ceil(body.length / 80) * 16)
  })

  ws.getColumn(1).width = 28
  ws.getColumn(2).width = 72
}

function addGuideSheet(wb: ExcelJS.Workbook, pages: PageDef[], sheetNames: Map<string, string>) {
  const ws = wb.addWorksheet('Sayfa Listesi', {
    properties: { tabColor: { argb: 'FF8B4545' } },
    views: [{ state: 'frozen', ySplit: 3 }],
  })

  ws.mergeCells(1, 1, 1, 6)
  const title = ws.getCell(1, 1)
  title.value = 'Tüm Sayfalar — Sekmeye tıklayarak ilgili sayfaya gidin'
  title.font = { bold: true, size: 13, color: { argb: BURGUNDY } }
  setFill(title, BURGUNDY_LIGHT)
  title.alignment = { vertical: 'middle' }
  ws.getRow(1).height = 32

  const headers = ['#', 'Sayfa', 'Web Adresi (URL)', 'Tarayıcı Başlığı', 'İçerik Adedi', '→ Sekmeye Git']
  const headerR = ws.getRow(2)
  headers.forEach((h, i) => {
    const cell = headerR.getCell(i + 1)
    cell.value = h
    cell.font = { bold: true, color: { argb: WHITE }, size: 11 }
    setFill(cell, BURGUNDY)
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
  })
  headerR.height = 30

  pages.forEach((p, i) => {
    const row = ws.getRow(3 + i)
    const sheetName = sheetNames.get(p.sayfaAdi) ?? ''
    const bg = i % 2 === 0 ? WHITE : ALT_ROW

    row.getCell(1).value = i + 1
    row.getCell(2).value = p.sayfaAdi
    row.getCell(3).value = p.url
    row.getCell(4).value = p.sayfaBasligi
    row.getCell(5).value = p.rows.length

    const linkCell = row.getCell(6)
    if (sheetName) {
      linkCell.value = { text: `▶ ${sheetName}`, hyperlink: `#'${sheetName}'!A1` }
      linkCell.font = { color: { argb: BURGUNDY }, underline: true, bold: true }
    }

    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c)
      setFill(cell, bg)
      setBorder(cell)
      cell.alignment = { vertical: 'middle', wrapText: true }
    }
    row.height = 22
  })

  ws.getColumn(1).width = 5
  ws.getColumn(2).width = 30
  ws.getColumn(3).width = 36
  ws.getColumn(4).width = 40
  ws.getColumn(5).width = 12
  ws.getColumn(6).width = 28
  ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: 2, column: 6 } }
}

function addPageSheet(
  wb: ExcelJS.Workbook,
  page: PageDef,
  sheetName: string,
): string {
  const sheetRows = expandPageRows(page.rows)
  const isShared = page.url === '(tüm sayfalarda)'
  const ws = wb.addWorksheet(sheetName, {
    properties: { tabColor: { argb: isShared ? 'FF888888' : 'FF5A0202' } },
    views: [{ state: 'frozen', ySplit: HEADER_ROW, activeCell: `${colLetter(COL_IDX.yeni)}${DATA_START_ROW}` }],
  })

  // ── Üst bilgi kartı (satır 1-3) ──
  ws.mergeCells(1, 1, 1, COLUMNS.length)
  const r1 = ws.getCell(1, 1)
  r1.value = `  ${page.sayfaAdi}`
  r1.font = { bold: true, size: 14, color: { argb: WHITE } }
  setFill(r1, BURGUNDY)
  r1.alignment = { vertical: 'middle', indent: 1 }
  ws.getRow(1).height = 34

  ws.getCell(2, 1).value = 'Web adresi:'
  ws.getCell(2, 1).font = { bold: true, size: 10, color: { argb: 'FF666666' } }
  const urlCell = ws.getCell(2, 2)
  if (page.url.startsWith('http') || page.url.startsWith('/')) {
    const fullUrl = page.url.startsWith('http') ? page.url : `https://notrepsikoloji.com${page.url}`
    urlCell.value = { text: page.url, hyperlink: fullUrl }
    urlCell.font = { color: { argb: BURGUNDY }, underline: true, size: 10 }
  } else {
    urlCell.value = page.url
    urlCell.font = { size: 10 }
  }
  ws.mergeCells(2, 2, 2, 4)

  ws.getCell(2, 5).value = 'Tarayıcı başlığı:'
  ws.getCell(2, 5).font = { bold: true, size: 10, color: { argb: 'FF666666' } }
  ws.mergeCells(2, 6, 2, COLUMNS.length)
  ws.getCell(2, 6).value = page.sayfaBasligi
  ws.getCell(2, 6).font = { size: 10 }
  ws.getRow(2).height = 20
  setFill(ws.getCell(2, 1), BURGUNDY_LIGHT)
  for (let c = 2; c <= COLUMNS.length; c++) setFill(ws.getCell(2, c), BURGUNDY_LIGHT)

  ws.mergeCells(3, 1, 3, COLUMNS.length)
  const hint = ws.getCell(3, 1)
  hint.value =
    '  💡 Düzenlenebilir alanların altındaki yeşil boş satıra yeni metni yazın. ☑️ kutucuğunu işaretleyin veya Durum sütunundan ilerlemeyi takip edin.'
  hint.font = { italic: true, size: 9, color: { argb: 'FF5A0202' } }
  setFill(hint, 'FFFFF8E1')
  hint.alignment = { vertical: 'middle', indent: 1 }
  ws.getRow(3).height = 22

  // ── Başlık satırı ──
  ws.columns = COLUMNS.map((c) => ({ key: c.key, width: c.width }))
  const headerRow = ws.getRow(HEADER_ROW)
  COLUMNS.forEach((c, i) => {
    const cell = headerRow.getCell(i + 1)
    cell.value = c.header
    cell.font = { bold: true, color: { argb: WHITE }, size: 10 }
    setFill(cell, BURGUNDY)
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    setBorder(cell)
  })
  headerRow.height = 32

  // ── Veri satırları ──
  let contentNo = 0
  let prevBolum = ''

  sheetRows.forEach((sheetRow, idx) => {
    const rowNum = DATA_START_ROW + idx
    const excelRow = ws.getRow(rowNum)

    if (sheetRow.kind === 'separator') {
      ws.mergeCells(rowNum, COL_IDX.bolum, rowNum, COL_IDX.icerik)
      const labelCell = excelRow.getCell(COL_IDX.bolum)
      labelCell.value = `──── ${sheetRow.bolumLabel} ────`
      labelCell.font = { italic: true, color: { argb: 'FF999999' }, size: 9 }
      labelCell.alignment = { horizontal: 'center', vertical: 'middle' }
      for (let c = 1; c <= COLUMNS.length; c++) {
        setFill(excelRow.getCell(c), SEPARATOR_BG)
        setBorder(excelRow.getCell(c))
      }
      excelRow.height = 14
      return
    }

    if (sheetRow.kind === 'edit') {
      const ref = sheetRow.data!
      excelRow.getCell(COL_IDX.no).value = ''
      excelRow.getCell(COL_IDX.isaret).value = '☑'
      excelRow.getCell(COL_IDX.bolum).value = '↳ Düzenleme'
      excelRow.getCell(COL_IDX.alan).value = 'Yeni metin'
      excelRow.getCell(COL_IDX.baslik).value = ref.baslik || ref.alan
      excelRow.getCell(COL_IDX.icerik).value = ''
      excelRow.getCell(COL_IDX.link).value = ''
      excelRow.getCell(COL_IDX.karakter).value = ''
      excelRow.getCell(COL_IDX.yeni).value = ''
      excelRow.getCell(COL_IDX.durum).value = 'Güncellenecek'

      COLUMNS.forEach((_, i) => {
        const cell = excelRow.getCell(i + 1)
        cell.alignment = { wrapText: true, vertical: 'top' }
        setBorder(cell)
        if (i + 1 === COL_IDX.yeni) {
          setFill(cell, GREEN_EDIT)
          cell.font = { size: 11, italic: true, color: { argb: 'FF2E7D32' } }
        } else if (i + 1 === COL_IDX.durum) {
          setFill(cell, MARK_PENDING)
        } else if (i + 1 === COL_IDX.isaret) {
          setFill(cell, MARK_CHECKED)
          cell.alignment = { horizontal: 'center', vertical: 'middle' }
          cell.font = { size: 14, bold: true }
        } else {
          setFill(cell, EDIT_BLANK_BG)
        }
      })
      excelRow.height = 28
      return
    }

    const row = sheetRow.data!
    contentNo += 1
    if (row.bolum !== prevBolum) prevBolum = row.bolum

    const bg = bolumRengi(row.bolum)
    const icerik = row.icerik || row.baslik

    excelRow.getCell(COL_IDX.no).value = contentNo
    excelRow.getCell(COL_IDX.isaret).value = '☐'
    excelRow.getCell(COL_IDX.bolum).value = row.bolum
    excelRow.getCell(COL_IDX.alan).value = row.alan
    excelRow.getCell(COL_IDX.baslik).value = row.baslik
    excelRow.getCell(COL_IDX.icerik).value = row.icerik
    excelRow.getCell(COL_IDX.link).value = row.link
      ? { text: row.link, hyperlink: row.link.startsWith('http') ? row.link : `https://notrepsikoloji.com${row.link}` }
      : ''
    excelRow.getCell(COL_IDX.karakter).value = karakterSayisi(row.alan, icerik)
    excelRow.getCell(COL_IDX.yeni).value = ''
    excelRow.getCell(COL_IDX.durum).value = 'Değişiklik yok'

    COLUMNS.forEach((_, i) => {
      const col = i + 1
      const cell = excelRow.getCell(col)
      cell.alignment = { wrapText: true, vertical: 'top' }
      setBorder(cell)

      if (col === COL_IDX.yeni) {
        setFill(cell, GREEN_EDIT)
        cell.font = { size: 11 }
      } else if (col === COL_IDX.durum) {
        setFill(cell, STATUS_NONE)
      } else if (col === COL_IDX.isaret) {
        setFill(cell, bg === WHITE && contentNo % 2 === 0 ? ALT_ROW : bg)
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
        cell.font = { size: 14 }
      } else if (col === COL_IDX.icerik) {
        setFill(cell, bg === WHITE && contentNo % 2 === 0 ? ALT_ROW : bg)
        cell.font = { size: 10, color: { argb: 'FF444444' } }
      } else {
        setFill(cell, bg === WHITE && contentNo % 2 === 0 ? ALT_ROW : bg)
      }

      if (col === COL_IDX.link && row.link) {
        cell.font = { color: { argb: BURGUNDY }, underline: true, size: 10 }
      }
      if (col === COL_IDX.karakter && cell.value) {
        cell.font = { size: 9, color: { argb: 'FF888888' } }
        cell.alignment = { horizontal: 'center', vertical: 'top' }
      }
    })

    const lineCount = Math.max(
      String(row.icerik).split('\n').length,
      Math.ceil(String(row.icerik).length / 70),
      1,
    )
    excelRow.height = Math.min(120, Math.max(18, lineCount * 15))
  })

  const lastRow = DATA_START_ROW + sheetRows.length - 1
  if (sheetRows.length > 0) {
    const isaretCol = colLetter(COL_IDX.isaret)
    const yeniCol = colLetter(COL_IDX.yeni)
    const durumCol = colLetter(COL_IDX.durum)

    ws.dataValidations.add(`${isaretCol}${DATA_START_ROW}:${isaretCol}${lastRow}`, {
      type: 'list',
      allowBlank: false,
      formulae: [`"${ISARET_LISTESI}"`],
      showErrorMessage: true,
      errorTitle: 'Geçersiz işaret',
      error: 'Lütfen ☐ veya ☑ seçin.',
    })

    ws.dataValidations.add(`${durumCol}${DATA_START_ROW}:${durumCol}${lastRow}`, {
      type: 'list',
      allowBlank: false,
      formulae: [`"${DURUM_LISTESI}"`],
      showErrorMessage: true,
      errorTitle: 'Geçersiz durum',
      error: 'Lütfen listeden bir durum seçin.',
    })

    const refRange = `A${DATA_START_ROW}:${durumCol}${lastRow}`
    const anchor = DATA_START_ROW

    ws.addConditionalFormatting({
      ref: refRange,
      rules: [
        {
          type: 'expression',
          priority: 1,
          formulae: [`$${isaretCol}${anchor}="☑"`],
          style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: MARK_CHECKED } } },
        },
        {
          type: 'expression',
          priority: 2,
          formulae: [`$${durumCol}${anchor}="Güncellenecek"`],
          style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: MARK_PENDING } } },
        },
        {
          type: 'expression',
          priority: 3,
          formulae: [`$${durumCol}${anchor}="Güncellendi"`],
          style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: MARK_DONE } } },
        },
        {
          type: 'expression',
          priority: 4,
          formulae: [`LEN($${yeniCol}${anchor})>0`],
          style: {
            fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFC8E6C9' } },
            font: { bold: true, color: { argb: 'FF1B5E20' } },
          },
        },
      ],
    })
  }

  ws.autoFilter = {
    from: { row: HEADER_ROW, column: 1 },
    to: { row: HEADER_ROW, column: COLUMNS.length },
  }

  return sheetName
}

function resolveSheetName(pageAdi: string, usedNames: Set<string>): string {
  let sheetName = sanitizeSheetName(pageAdi)
  let suffix = 1
  while (usedNames.has(sheetName)) {
    sheetName = `${sanitizeSheetName(pageAdi).slice(0, 28)}${suffix++}`
  }
  usedNames.add(sheetName)
  return sheetName
}

async function main() {
  const pages = buildPages()

  const pageErrors = validatePages(pages)
  if (pageErrors.length > 0) {
    console.error('✗ İçerik doğrulama hataları:')
    pageErrors.forEach((e) => console.error(`  · ${e}`))
    process.exit(1)
  }

  const wb = new ExcelJS.Workbook()
  wb.creator = 'Notre Psikoloji'
  wb.created = new Date()
  wb.title = 'Notre Psikoloji İçerik Envanteri'

  // Sekme adlarını önceden hesapla (sayfa listesi linkleri için)
  const nameSet = new Set<string>()
  const sheetNames = new Map<string, string>()
  for (const page of pages) {
    sheetNames.set(page.sayfaAdi, resolveSheetName(page.sayfaAdi, nameSet))
  }

  addHowToSheet(wb)
  addGuideSheet(wb, pages, sheetNames)

  for (const page of pages) {
    addPageSheet(wb, page, sheetNames.get(page.sayfaAdi)!)
  }

  mkdirSync(dirname(OUTPUT), { recursive: true })
  await wb.xlsx.writeFile(OUTPUT)

  const expectedSheets = pages.length + 2
  const fileErrors = await validateExcelFile(OUTPUT, expectedSheets)
  if (fileErrors.length > 0) {
    console.error('✗ Excel dosya doğrulama hataları:')
    fileErrors.forEach((e) => console.error(`  · ${e}`))
    process.exit(1)
  }

  const desktopPath = join(process.env.HOME ?? '', 'Desktop', 'notre-psikoloji-icerik-envanteri.xlsx')
  if (process.env.HOME) {
    await wb.xlsx.writeFile(desktopPath)
  }

  const totalRows = pages.reduce((s, p) => s + p.rows.length, 0)
  const totalSheetRows = pages.reduce((s, p) => s + expandPageRows(p.rows).length, 0)
  console.log(`✓ Excel oluşturuldu: ${OUTPUT}`)
  if (process.env.HOME) console.log(`✓ Masaüstü kopyası: ${desktopPath}`)
  console.log(`✓ Doğrulama geçti — eksik sayfa veya boş içerik yok`)
  console.log(`  ${pages.length} sayfa + kullanım kılavuzu + sayfa listesi`)
  console.log(`  ${totalRows} içerik kaydı · ${totalSheetRows} Excel satırı (düzenleme + ayırıcı dahil)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
