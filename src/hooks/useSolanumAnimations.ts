import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MAIN_SELECTOR = '#contenu-principal'

function killMainScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger
    if (trigger instanceof Element && trigger.closest(MAIN_SELECTOR)) {
      st.kill()
    }
  })
}

function resetAnimationState() {
  document
    .querySelectorAll<HTMLElement>(
      `${MAIN_SELECTOR} [data-animate-child], ${MAIN_SELECTOR} [data-animate-text], ${MAIN_SELECTOR} .herohome-title, ${MAIN_SELECTOR} .herohome-tagline, ${MAIN_SELECTOR} .herohome-text`,
    )
    .forEach((el) => {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform,filter' })
    })

  document.querySelectorAll<HTMLElement>(`${MAIN_SELECTOR} .cardsScroll-list`).forEach((list) => {
    gsap.set(list, { clearProps: 'transform,paddingTop' })
  })

  document.querySelectorAll<HTMLElement>(`${MAIN_SELECTOR} .cardsScroll-top`).forEach((top) => {
    gsap.set(top, { y: 0, autoAlpha: 1, clearProps: 'transform,opacity' })
  })

  const imageContent = document.querySelector<HTMLElement>(`${MAIN_SELECTOR} .imageContent`)
  if (imageContent) {
    const box = imageContent.querySelector<HTMLElement>('.imageContent-inner') ?? imageContent
    gsap.set(box, { clearProps: 'transform,borderRadius' })
    imageContent.querySelectorAll<HTMLElement>('.imageContent-title, .imageContent-wysiwyg').forEach((el) => {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform,filter' })
    })
  }
}

function lockHeroContent() {
  document
    .querySelectorAll<HTMLElement>(
      `${MAIN_SELECTOR} .herohome-title, ${MAIN_SELECTOR} .herohome-tagline, ${MAIN_SELECTOR} .herohome-text`,
    )
    .forEach((el) => {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform,filter' })
    })
}

function killCardsScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger
    if (!(trigger instanceof Element)) return
    if (
      trigger.matches('.cardsScroll, .cardsScroll-list') ||
      trigger.closest('.cardsScroll')
    ) {
      st.kill()
    }
  })
}

function getCardsScrollLeadIn(section: HTMLElement) {
  const top = section.querySelector<HTMLElement>('.cardsScroll-top')
  if (!top) return 240

  const marginBottom = Number.parseFloat(getComputedStyle(top).marginBottom) || 0
  return top.offsetHeight + marginBottom + 120
}

function initCardsScroll() {
  const section = document.querySelector<HTMLElement>(`${MAIN_SELECTOR} .cardsScroll`)
  if (!section) return

  const list = section.querySelector<HTMLElement>('ul.cardsScroll-list')
  const top = section.querySelector<HTMLElement>('.cardsScroll-top')
  if (!list || !top) return

  killCardsScrollTriggers()
  gsap.set(list, { x: 0, clearProps: 'transform,paddingTop' })
  gsap.set(top, { y: 0, autoAlpha: 1, clearProps: 'transform,opacity' })

  const mm = gsap.matchMedia()
  mm.add('(min-width: 64rem)', () => {
    const measureDistance = () =>
      Math.max(0, list.scrollWidth - window.innerWidth)

    const distance = measureDistance()
    if (distance <= 0) return

    const leadIn = getCardsScrollLeadIn(section)
    const topTravel = () => {
      const marginBottom = Number.parseFloat(getComputedStyle(top).marginBottom) || 0
      return top.offsetHeight + marginBottom
    }

    gsap.set(list, { x: 0, paddingTop: '10rem' })
    gsap.set(top, { y: 0, autoAlpha: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'notre-cards-scroll',
        trigger: section,
        pin: section,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        start: 'top top',
        end: () => `+=${leadIn + measureDistance()}`,
        onToggle: (self) => {
          section.classList.toggle('is-pinned', self.isActive)
        },
      },
    })

    tl.fromTo(
      top,
      { y: 0, autoAlpha: 1 },
      { y: () => -topTravel(), autoAlpha: 0, ease: 'none', duration: leadIn },
      0,
    )

    tl.fromTo(
      list,
      { paddingTop: '10rem' },
      { paddingTop: '0rem', ease: 'none', duration: leadIn },
      0,
    )

    tl.fromTo(
      list,
      { x: 0 },
      { x: () => -measureDistance(), ease: 'none', duration: distance },
      leadIn,
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      gsap.set(top, { clearProps: 'transform,opacity' })
      gsap.set(list, { clearProps: 'transform,paddingTop' })
    }
  })

  section.querySelectorAll<HTMLImageElement>('.cardsScroll-item-image').forEach((img) => {
    if (img.complete) return
    const refresh = () => ScrollTrigger.refresh()
    img.addEventListener('load', refresh, { once: true })
    img.addEventListener('error', refresh, { once: true })
  })

  return () => {
    section.classList.remove('is-pinned')
    mm.revert()
    killCardsScrollTriggers()
  }
}

function killImageContentTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger
    if (!(trigger instanceof Element)) return
    if (
      trigger.matches('.imageContent, .imageContent-inner') ||
      trigger.closest('.imageContent')
    ) {
      st.kill()
    }
  })
}

function initImageContent() {
  const section = document.querySelector<HTMLElement>(`${MAIN_SELECTOR} .imageContent`)
  if (!section) return

  const box = section.querySelector<HTMLElement>('.imageContent-inner') ?? section
  const title = section.querySelector<HTMLElement>('.imageContent-title')
  const wysiwyg = section.querySelector<HTMLElement>('.imageContent-wysiwyg')

  killImageContentTriggers()

  const mm = gsap.matchMedia()
  mm.add('(min-width: 64rem)', () => {
    gsap.set(box, { clearProps: 'transform,borderRadius' })
    if (title) gsap.set(title, { autoAlpha: 1, y: 0 })
    if (wysiwyg) gsap.set(wysiwyg, { autoAlpha: 1, y: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'notre-image-content',
        trigger: section,
        scrub: 1,
        start: 'top 55%',
        end: 'top top',
        invalidateOnRefresh: true,
      },
    })

    tl.from(
      box,
      {
        scale: 0.85,
        borderRadius: '4rem',
        transformOrigin: 'center center',
        ease: 'power2.out',
      },
      0,
    )

    if (title) {
      tl.from(title, { autoAlpha: 0, y: 48, ease: 'power2.out' }, 0.15)
    }
    if (wysiwyg) {
      tl.from(wysiwyg, { autoAlpha: 0, y: 36, ease: 'power2.out' }, 0.3)
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  })

  mm.add('(max-width: 63.98rem)', () => {
    gsap.set(box, { clearProps: 'transform,borderRadius' })
    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    })
    if (title) mobileTl.from(title, { autoAlpha: 0, y: 28, duration: 0.7, ease: 'power2.out' })
    if (wysiwyg) {
      mobileTl.from(
        wysiwyg,
        { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out' },
        '-=0.45',
      )
    }
  })

  return () => {
    mm.revert()
    killImageContentTriggers()
  }
}

function initAnimateZoom() {
  const mm = gsap.matchMedia()
  mm.add('(min-width: 64rem)', () => {
    document
      .querySelectorAll<HTMLElement>(
        `${MAIN_SELECTOR} [data-animate-zoom]:not(.imageContent-ctr)`,
      )
      .forEach((el) => {
        const trigger = el.closest<HTMLElement>('[data-animate-container]') ?? el
        gsap.set(el, { clearProps: 'transform,opacity' })
        gsap.from(el, {
          scale: 1.1,
          autoAlpha: 0,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger,
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })
      })
  })

  return () => mm.revert()
}

function initRevealAnimations() {
  const containers = document.querySelectorAll<HTMLElement>(
    `${MAIN_SELECTOR} [data-animate-container]:not(.cardsScroll):not(.herohome):not(.imageContent)`,
  )

  containers.forEach((container) => {
    const delayStep = Number.parseFloat(container.dataset.animateDelay ?? '') || 0.1

    container.querySelectorAll('[data-animate-child]').forEach((child, index) => {
      gsap.from(child, {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * delayStep,
        scrollTrigger: {
          trigger: container,
          start: 'top 62%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
    })

    container.querySelectorAll('[data-animate-text]').forEach((text) => {
      gsap.from(text, {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 68%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
    })

    container
      .querySelectorAll('[data-animate-parallax]:not(.push-image)')
      .forEach((node) => {
      const el = node as HTMLElement
      const distance = Number.parseFloat(el.dataset.animateParallax ?? '') || 100
      gsap.to(el, {
        y: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    container.querySelectorAll('[data-animate-bg]').forEach((node) => {
      const el = node as HTMLElement
      let color = el.dataset.animateBg || '#fff8eb'
      if (color.startsWith('#') && color.length === 7) {
        const hex = color.replace('#', '')
        color = `rgb(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)})`
      }
      gsap.to(el, {
        backgroundColor: color,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',
        },
      })
    })
  })
}

function refreshPageAnimations() {
  // Tüm page-scope trigger'ları öldür (pin'li olanlar scroll'u kaydırabilir)
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger
    if (trigger instanceof Element && trigger.closest(MAIN_SELECTOR)) {
      st.kill()
    }
    // push-image veya cardsScroll pin'li trigger'lar da olabilir
    if (st.pin) st.kill()
  })

  killCardsScrollTriggers()
  killImageContentTriggers()
  resetAnimationState()

  // Trigger'lar tamamen temizlendikten sonra scroll'u sıfırla
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

  const boot = () => {
    lockHeroContent()
    lockPushImage()
    const revertCards = initCardsScroll()
    const revertImage = initImageContent()
    const revertZoom = initAnimateZoom()
    initRevealAnimations()

    requestAnimationFrame(() => {
      // Refresh çağrısından önce ve sonra scroll sıfırla
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      ScrollTrigger.refresh()
      // refresh() bazen async pozisyon hesabı yapar; ek rAF ile garantile
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      })
    })

    return () => {
      revertCards?.()
      revertImage?.()
      revertZoom?.()
      killMainScrollTriggers()
    }
  }

  return boot()
}

function lockPushImage() {
  document.querySelectorAll<HTMLElement>(`${MAIN_SELECTOR} .push-image`).forEach((img) => {
    gsap.killTweensOf(img)
    gsap.set(img, { clearProps: 'transform' })
  })

  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger
    if (trigger instanceof Element && trigger.matches('.push-image')) {
      st.kill()
    }
  })
}

export function useSolanumAnimations() {
  const { pathname } = useLocation()

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const boot = () => {
      cleanup?.()
      cleanup = refreshPageAnimations()
      lockHeroContent()
    }

    const timer = window.setTimeout(boot, 120)

    const onAppReady = () => {
      window.setTimeout(boot, 0)
    }
    const onResize = () => ScrollTrigger.refresh()

    window.addEventListener('site-app-ready', onAppReady)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('site-app-ready', onAppReady)
      window.removeEventListener('resize', onResize)
      cleanup?.()
    }
  }, [pathname])
}
