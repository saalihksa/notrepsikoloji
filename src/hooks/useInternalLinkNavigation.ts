import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { forceResetMenu } from './useSiteMenu'

// Tüm rotalar artık React bileşeni olduğundan her dahili link yakalanır
function isSpaPath(pathname: string): boolean {
  if (pathname === '/') return true

  const REACT_PREFIXES = [
    '/ekibimiz',
    '/randevu',
    '/iletisim',
    '/hakkimizda',
    '/hizmetler',
    '/sss',
    '/kvkk',
    '/blog',
  ]

  return REACT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  )
}

export function useInternalLinkNavigation() {
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      let url: URL
      try {
        url = new URL(href, window.location.origin)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      const path = `${url.pathname}${url.search}${url.hash}`
      if (path === window.location.pathname + window.location.search + window.location.hash) {
        return
      }

      if (!isSpaPath(url.pathname)) return

      event.preventDefault()
      forceResetMenu()
      navigate(path)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}
