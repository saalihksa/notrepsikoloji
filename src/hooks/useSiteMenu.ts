import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MOBILE_MQ = '(max-width: 78.98rem)'

// ─── Scroll kilidi ───────────────────────────────────────────────────────────

function lockBodyScroll() {
  const root = document.documentElement
  if (root.dataset.scrollLock === 'true') return
  const y = window.scrollY
  root.dataset.scrollLock = 'true'
  root.dataset.scrollLockY = String(y)
  document.body.style.cssText += `;position:fixed;top:-${y}px;left:0;right:0;width:100%`
}

function unlockBodyScroll() {
  const root = document.documentElement
  if (root.dataset.scrollLock !== 'true') return
  const y = Number(root.dataset.scrollLockY || 0)
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  delete root.dataset.scrollLock
  delete root.dataset.scrollLockY
  window.scrollTo(0, y)
}

// ─── Submenu yardımcıları ────────────────────────────────────────────────────

function closeAllSubmenus() {
  document.querySelectorAll<HTMLElement>('.submenu').forEach((el) => {
    el.inert = true
    const id = el.id
    if (id) {
      const btn = document.querySelector<HTMLElement>(`[aria-controls="${id}"]`)
      btn?.setAttribute('aria-expanded', 'false')
    }
  })
  document.documentElement.dataset.menu = 'close'
  document.body.style.removeProperty('--submenu-h')
}

// ─── Dışarıdan çağrılabilen sıfırlama ────────────────────────────────────────

export function forceResetMenu() {
  unlockBodyScroll()
  closeAllSubmenus()
  ScrollTrigger.getAll().forEach((t) => t.enable(false, false))

  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  const wrapper = document.querySelector<HTMLElement>('#menu')

  if (toggle) toggle.setAttribute('aria-expanded', 'false')
  if (wrapper) wrapper.inert = window.matchMedia(MOBILE_MQ).matches

  document.documentElement.dataset.navMenu = 'close'
  document.documentElement.dataset.menu = 'close'
}

export function isSiteMenuOpen() {
  return document.documentElement.dataset.navMenu === 'open'
}

/** @deprecated uyumluluk */
export function closeSiteMenu() {
  forceResetMenu()
}

// ─── React hook ──────────────────────────────────────────────────────────────

export function useSiteMenu() {
  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
    const wrapper = document.querySelector<HTMLElement>('#menu')
    if (!toggle || !wrapper) return

    const mq = window.matchMedia(MOBILE_MQ)

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'

    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true')
      wrapper.inert = false
      document.documentElement.dataset.navMenu = 'open'
      lockBodyScroll()
      ScrollTrigger.getAll().forEach((t) => t.disable(false, false))
    }

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false')
      wrapper.inert = true
      document.documentElement.dataset.navMenu = 'close'
      closeAllSubmenus()
      unlockBodyScroll()
      ScrollTrigger.getAll().forEach((t) => t.enable(false, false))
    }

    // Tüm tıklamaları document üzerinde yakala (bubble — en güvenilir)
    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return

      // ── Hamburger toggle ──────────────────────────────────────────────────
      if (target.closest('.menu-toggle')) {
        if (!mq.matches) return          // yalnızca mobilde çalış
        e.preventDefault()
        if (isOpen()) closeMenu()
        else openMenu()
        return
      }

      // ── Submenu kapat butonu ──────────────────────────────────────────────
      const closeBtn = target.closest<HTMLElement>('[data-close]')
      if (closeBtn) {
        const id = closeBtn.dataset.close
        if (id) {
          const sub = document.getElementById(id)
          if (sub) {
            sub.inert = true
            const btn = document.querySelector<HTMLElement>(`[aria-controls="${id}"]`)
            btn?.setAttribute('aria-expanded', 'false')
          }
        }
        if (!document.querySelector('.submenu:not([inert])')) {
          document.documentElement.dataset.menu = 'close'
          document.body.style.removeProperty('--submenu-h')
        }
        return
      }

      // ── Submenu toggle butonu ─────────────────────────────────────────────
      const subBtn = target.closest<HTMLElement>('.menu-link[aria-controls]')
      if (subBtn) {
        e.preventDefault()
        const id = subBtn.getAttribute('aria-controls')
        const sub = id ? document.getElementById(id) : null
        if (!sub) return

        if (!mq.matches) {
          // Desktop: overlay alt menü
          if (sub.inert) {
            closeAllSubmenus()
            sub.inert = false
            subBtn.setAttribute('aria-expanded', 'true')
            document.documentElement.dataset.menu = 'open'
            document.body.style.setProperty('--submenu-h', `${sub.offsetHeight}px`)
          } else {
            sub.inert = true
            subBtn.setAttribute('aria-expanded', 'false')
            if (!document.querySelector('.submenu:not([inert])')) {
              document.documentElement.dataset.menu = 'close'
              document.body.style.removeProperty('--submenu-h')
            }
          }
        } else if (isOpen()) {
          // Mobil: accordion — toggle submenu
          sub.inert = !sub.inert
          subBtn.setAttribute('aria-expanded', String(!sub.inert))
        }
        return
      }

      // ── Desktop dışarı tıklama — submenü kapat ───────────────────────────
      if (mq.matches) return
      const openSub = document.querySelector('.submenu:not([inert])')
      if (openSub && !openSub.contains(target)) closeAllSubmenus()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (isOpen()) closeMenu()
      else closeAllSubmenus()
    }

    const onViewportChange = () => {
      if (!mq.matches && isOpen()) closeMenu()
      if (!mq.matches) {
        closeAllSubmenus()
        wrapper.inert = false
      } else if (!isOpen()) {
        wrapper.inert = true
      }
    }

    // Başlangıç durumu
    toggle.setAttribute('aria-expanded', 'false')
    wrapper.inert = mq.matches
    document.documentElement.dataset.navMenu = 'close'
    document.documentElement.dataset.menu = 'close'

    document.addEventListener('click', onDocumentClick)
    document.addEventListener('keydown', onKeyDown)
    mq.addEventListener('change', onViewportChange)

    return () => {
      document.removeEventListener('click', onDocumentClick)
      document.removeEventListener('keydown', onKeyDown)
      mq.removeEventListener('change', onViewportChange)
      closeMenu()
    }
  }, [])
}
