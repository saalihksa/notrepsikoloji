import manifest from './pages/manifest.json'

const pageHtmlModules = import.meta.glob<string>('./pages/*.html', {
  query: '?raw',
  import: 'default',
  eager: false,
})

export type PageMeta = {
  file: string
  bodyClass: string
  title: string
  assets: number
}

export const pageManifest = manifest as Record<string, PageMeta>

export function normalizePath(pathname: string): string {
  if (pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export function getPageMeta(pathname: string): PageMeta | null {
  return pageManifest[normalizePath(pathname)] ?? null
}

export async function loadPageHtml(file: string): Promise<string | null> {
  const key = `./pages/${file}`
  const loader = pageHtmlModules[key]
  if (!loader) return null
  return loader()
}

export const detailRoutes = Object.keys(pageManifest).filter(
  (path) => path !== '/ekibimiz/' && path !== '/randevu/' && path !== '/iletisim/',
)
