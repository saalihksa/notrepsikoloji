/** Hızlı içerik envanteri denetimi — export:content öncesi/sonrası */
import { BLOG_POSTS } from '../src/data/blogPosts'
import { SERVICES } from '../src/data/services'
import { TEAM_MEMBERS } from '../src/data/team'
import { loadHomepageContent } from './lib/extract-html'
import {
  buildAppointmentRows,
  buildContactRows,
  buildHakkimizdaRows,
  buildHizmetlerRows,
  buildSssRows,
  buildTeamDetailRows,
  buildTeamListRows,
} from './lib/live-page-content'
import { extractFaqPairs, readSrc } from './lib/extract-tsx'

const issues: string[] = []

const faqLive = extractFaqPairs(readSrc('pages/SssPage.tsx'))
const faqExport = buildSssRows().filter((r) => r.alan.startsWith('Soru '))
if (faqLive.length !== faqExport.length) {
  issues.push(`SSS: ${faqLive.length} soru sitede, ${faqExport.length} Excel'de`)
}

for (const m of TEAM_MEMBERS) {
  const rows = buildTeamDetailRows(m)
  if (!rows.some((r) => r.bolum === 'Eğitim & Deneyim' && r.alan.startsWith('Eğitim satırı'))) {
    issues.push(`Ekip ${m.name}: eğitim satırı eksik`)
  }
  if (!rows.some((r) => r.bolum === 'Uzmanlık Alanları')) {
    issues.push(`Ekip ${m.name}: uzmanlık alanları bölümü eksik`)
  }
}

const contact = buildContactRows()
if (!contact.find((r) => r.bolum === 'Giriş' && r.alan === 'Giriş metni')?.icerik.includes('24 saat')) {
  issues.push('İletişim: güncel giriş metni export edilmemiş')
}

const home = loadHomepageContent()
if (home.length < 50) issues.push(`Ana sayfa HTML çıkarımı düşük: ${home.length} satır`)

for (const svc of SERVICES) {
  const list = buildHizmetlerRows()
  if (!list.some((r) => r.icerik === svc.title)) {
    issues.push(`Hizmetler listesinde eksik: ${svc.title}`)
  }
}

if (buildAppointmentRows().length < 40) issues.push('Randevu sayfası export satırı düşük')
if (buildHakkimizdaRows().length < 20) issues.push('Hakkımızda export satırı düşük')
if (buildTeamListRows().length < TEAM_MEMBERS.length * 3) issues.push('Ekip listesi export düşük')

for (const post of BLOG_POSTS) {
  const sectionCount = post.sections.length
  if (sectionCount === 0) issues.push(`Blog ${post.slug}: bölüm yok`)
}

if (issues.length) {
  console.error('Denetim sorunları:')
  issues.forEach((i) => console.error(`  · ${i}`))
  process.exit(1)
}

console.log('✓ İçerik denetimi tamam')
console.log(`  SSS ${faqLive.length} soru · Ekip ${TEAM_MEMBERS.length} · Hizmet ${SERVICES.length} · Blog ${BLOG_POSTS.length}`)
console.log(`  Ana sayfa ${home.length} · İletişim ${contact.length} satır`)
