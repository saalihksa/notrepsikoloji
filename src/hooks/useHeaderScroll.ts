import { useEffect } from 'react'
import { isSiteMenuOpen } from './useSiteMenu'

const HEADER_OVERLAY_SELECTOR = '.herohome, .hero'
const LOGO_LIGHT_SELECTOR = '.herohome, .hero'

function isHeaderOverZone(header: HTMLElement, selector: string): boolean {
  const sections = document.querySelectorAll<HTMLElement>(selector)
  if (sections.length === 0) {
    return selector === HEADER_OVERLAY_SELECTOR && window.scrollY <= header.offsetHeight
  }

  const probeY = Math.max(1, header.getBoundingClientRect().bottom - 1)

  return Array.from(sections).some((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= probeY && rect.bottom > probeY
  })
}

function applyScrollDataset(
  header: HTMLElement,
  headerOverlay: boolean,
  logoLight: boolean,
) {
  const root = document.documentElement
  const scrollY = window.scrollY

  if (headerOverlay) root.dataset.headerOverlay = 'true'
  else delete root.dataset.headerOverlay

  if (logoLight) root.dataset.logoLight = 'true'
  else delete root.dataset.logoLight

  let nextScroll: 'start' | 'ongoing' | 'end'
  if (scrollY + window.innerHeight >= document.body.scrollHeight) {
    nextScroll = 'end'
  } else if (scrollY > header.offsetHeight) {
    nextScroll = 'ongoing'
  } else {
    nextScroll = 'start'
  }

  if (root.dataset.scroll !== nextScroll) {
    root.dataset.scroll = nextScroll
  }
}

function setHeaderOffset(value: number) {
  const px = `${value}px`
  document.documentElement.style.setProperty('--header-offset', px)
  document.documentElement.style.setProperty('--header-o', px)
}

function readHeaderState(header: HTMLElement) {
  return {
    headerOverlay: isHeaderOverZone(header, HEADER_OVERLAY_SELECTOR),
    logoLight: isHeaderOverZone(header, LOGO_LIGHT_SELECTOR),
  }
}

function syncHeaderVisible(
  header: HTMLElement,
  lastState: { headerOverlay: boolean; logoLight: boolean },
) {
  const headerHeight = header.offsetHeight
  setHeaderOffset(headerHeight)

  if (isSiteMenuOpen()) return

  const nextState = readHeaderState(header)
  const changed =
    nextState.headerOverlay !== lastState.headerOverlay ||
    nextState.logoLight !== lastState.logoLight

  if (changed) {
    lastState.headerOverlay = nextState.headerOverlay
    lastState.logoLight = nextState.logoLight
  }

  applyScrollDataset(header, nextState.headerOverlay, nextState.logoLight)
}

/**
 * Header: sticky, her zaman görünür.
 * Beyaz logo yalnızca hero slider (ve sayfa hero) üzerindeyken.
 */
export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.header')
    if (!header) return

    const lastState = readHeaderState(header)
    let raf = 0

    const syncScrollState = () => {
      syncHeaderVisible(header, lastState)
    }

    const handleResize = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
      const nextState = readHeaderState(header)
      lastState.headerOverlay = nextState.headerOverlay
      lastState.logoLight = nextState.logoLight
      syncScrollState()
    }

    const handleScroll = () => {
      if (isSiteMenuOpen()) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(syncScrollState)
    }

    const handleMenuChange = () => {
      if (isSiteMenuOpen()) return
      syncScrollState()
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('opening', handleMenuChange)
    document.addEventListener('closing', handleMenuChange)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('opening', handleMenuChange)
      document.removeEventListener('closing', handleMenuChange)
    }
  }, [])
}

export function resetHeaderScroll() {
  const header = document.querySelector<HTMLElement>('.header')
  if (!header) return

  document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
  const { headerOverlay, logoLight } = readHeaderState(header)
  setHeaderOffset(header.offsetHeight)
  applyScrollDataset(header, headerOverlay, logoLight)
}
