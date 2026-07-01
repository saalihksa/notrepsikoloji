/** Vite base URL'e göre asset yolu döndürür */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') // '/notrepsikoloji' veya ''

export function asset(path: string): string {
  // path "/assets/foo.png" gibi "/" ile başlamalı
  return BASE + path
}

/** Raw HTML stringlerindeki /assets/ ve /wp-content/ yollarını düzeltir */
export function patchHtmlPaths(html: string): string {
  if (!BASE) return html
  return html
    .replace(/src="\/assets\//g, `src="${BASE}/assets/`)
    .replace(/href="\/assets\//g, `href="${BASE}/assets/`)
    .replace(/srcset="\/assets\//g, `srcset="${BASE}/assets/`)
    .replace(/url\(\/assets\//g, `url(${BASE}/assets/`)
    .replace(/src="\/wp-content\//g, `src="${BASE}/wp-content/`)
    .replace(/, \/assets\//g, `, ${BASE}/assets/`)
}
