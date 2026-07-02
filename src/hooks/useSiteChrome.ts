import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta } from '../data/pageRegistry'
import { HOME_BODY_CLASS, initSiteShell, setPageBodyClass } from './useTranscureSite'
import { resetHeaderScroll, useHeaderScroll } from './useHeaderScroll'
import { forceResetMenu, useSiteMenu } from './useSiteMenu'

const BASE = 'wp-theme-solanum wp-singular'

/** React route'larına uygun body class döndürür */
function resolveBodyClass(pathname: string): string {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`

  // Manifest'te kayıtlı sayfa varsa onu kullan
  const meta = getPageMeta(p)
  if (meta?.bodyClass) return meta.bodyClass

  // Blog detay
  if (p.startsWith('/blog/') && p !== '/blog/') return `single-post ${BASE}`
  // Blog listesi
  if (p === '/blog/') return `blog ${BASE}`
  // Hizmet detay
  if (p.startsWith('/hizmetler/') && p !== '/hizmetler/') return `page ${BASE}`
  // Ekip detay
  if (p.startsWith('/ekibimiz/') && p !== '/ekibimiz/') return `page ${BASE}`
  if (p === '/hakkimizda/' || p === '/sss/' || p === '/kvkk/') return `page ${BASE}`
  // İletişim / Ekibimiz / Randevu
  if (p === '/iletisim/' || p === '/ekibimiz/' || p === '/randevu/') return `page ${BASE}`

  // Anasayfa
  if (p === '/') return HOME_BODY_CLASS

  return `page ${BASE}`
}

export function useSiteChrome() {
  const { pathname } = useLocation()

  useEffect(() => initSiteShell(), [])
  useHeaderScroll()
  useSiteMenu()

  useEffect(() => {
    forceResetMenu()
    setPageBodyClass(resolveBodyClass(pathname))
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      resetHeaderScroll()
    })
  }, [pathname])
}
