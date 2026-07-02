import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '../../src')

export function readSrc(relativePath: string): string {
  return readFileSync(join(SRC, relativePath), 'utf-8')
}

/** const NAME = [ { q: '...', a: '...' }, ... ] dizilerini çıkarır */
export function extractFaqPairs(source: string): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = []
  const re = /\{\s*q:\s*(['"`])((?:\\.|(?!\1)[^\\])*?)\1\s*,\s*a:\s*(['"`])((?:\\.|(?!\3)[^\\])*?)\3\s*\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) {
    items.push({ q: unescapeTs(m[2], m[1]), a: unescapeTs(m[4], m[3]) })
  }
  return items
}

function unescapeTs(text: string, quote: string): string {
  return text
    .replace(new RegExp(`\\\\${quote}`, 'g'), quote)
    .replace(/\\n/g, '\n')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
}

export function extractUseMeta(source: string): { title: string; description: string } | null {
  const m =
    source.match(/useMeta\(\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/) ??
    source.match(/useMeta\(\s*'([^']*)'\s*,\s*"([^"]*)"\s*\)/) ??
    source.match(/useMeta\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*\)/) ??
    source.match(/useMeta\(\s*"([^"]*)"\s*,\s*'([^']*)'\s*\)/)
  if (!m) return null
  return { title: m[1], description: m[2] }
}

export function extractDocumentTitle(source: string): string | null {
  return source.match(/document\.title\s*=\s*'([^']+)'/)?.[1] ?? null
}

/** const NAME = { key: 'value', ... } as const */
export function extractConstObject(source: string, varName: string): Record<string, string> {
  const block = source.match(new RegExp(`const ${varName}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*as const`))?.[1]
  if (!block) return {}
  const out: Record<string, string> = {}
  for (const m of block.matchAll(/(\w+):\s*'([^']*)'/g)) {
    out[m[1]] = m[2]
  }
  return out
}

/** const NAME = [ 'a', 'b', ... ] as const */
export function extractConstStringArray(source: string, varName: string): string[] {
  const block = source.match(new RegExp(`const ${varName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`))?.[1]
  if (!block) return []
  return [...block.matchAll(/'([^']*)'/g)].map((m) => m[1])
}

/** JSX içindeki düz metinleri (>{text}<) çıkarır — kısa metinler */
export function extractJsxTextNodes(source: string): string[] {
  const texts = new Set<string>()
  for (const m of source.matchAll(/>([^<>{}\n][^<>{}]{0,200})</g)) {
    const t = m[1].trim()
    if (t && !t.startsWith('{') && !/^[\s\d./:]+$/.test(t)) texts.add(t)
  }
  return [...texts]
}

export function extractPlaceholders(source: string): string[] {
  return [...source.matchAll(/placeholder="([^"]+)"/g)].map((m) => m[1])
}

export function extractAriaLabels(source: string): string[] {
  return [...source.matchAll(/aria-label="([^"]+)"/g)].map((m) => m[1])
}

export function extractLabelTexts(source: string): string[] {
  return [...source.matchAll(/<label[^>]*>([^<]+)</g)].map((m) => m[1].trim())
}

/** <Field label="Ad" ... /> prop değerleri */
export function extractFieldLabelProps(source: string): string[] {
  return [...source.matchAll(/<Field\s[^>]*label="([^"]+)"/g)].map((m) => m[1])
}

/** contact-page__label veya benzeri sınıflı form etiketleri */
export function extractContactFormLabels(source: string): string[] {
  return [...source.matchAll(/contact-page__label"[^>]*>([^<]+)</g)].map((m) => m[1].trim())
}

/** className="foo"> ile biten JSX metin düğümleri */
export function extractJsxTextByClass(source: string, className: string): string | null {
  const m = source.match(new RegExp(`${className}">\\s*([\\s\\S]*?)\\s*<`))
  if (!m) return null
  return m[1].replace(/\s+/g, ' ').trim()
}
