export const HOME_BODY_CLASS =
  'home wp-singular page-template-default page page-id-4 wp-theme-solanum'

function setViewportHeight() {
  document.documentElement.style.setProperty(
    '--viewport-height',
    `${window.innerHeight}px`,
  )
}

function playHeroVideo() {
  const video = document.querySelector<HTMLVideoElement>('.herohome-video')
  if (!video) return
  video.muted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

function bootstrapSiteRuntime() {
  document.documentElement.setAttribute('data-animations-ready', 'true')
  playHeroVideo()
  window.dispatchEvent(new CustomEvent('site-app-ready'))
}

export function setPageBodyClass(bodyClass: string) {
  document.body.className = bodyClass
}

export function initSiteShell() {
  const html = document.documentElement
  html.lang = 'tr'
  html.setAttribute('data-menu', 'close')
  html.setAttribute('data-nav-menu', 'close')
  html.setAttribute('data-scroll', 'start')
  html.setAttribute('data-animations-ready', 'false')

  setViewportHeight()
  window.addEventListener('resize', setViewportHeight)
  bootstrapSiteRuntime()

  return () => {
    window.removeEventListener('resize', setViewportHeight)
    document.documentElement.removeAttribute('data-animations-ready')
  }
}

/** @deprecated Tek seferlik init için initSiteShell + setPageBodyClass kullanın */
export function initTranscureSite(bodyClass = HOME_BODY_CLASS) {
  const cleanup = initSiteShell()
  setPageBodyClass(bodyClass)
  return cleanup
}
