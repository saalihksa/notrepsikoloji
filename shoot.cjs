const puppeteer = require('puppeteer-core')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
;(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1440,900'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 1200))

  await page.screenshot({ path: '/tmp/nav_top.png', clip: { x: 0, y: 0, width: 1440, height: 120 } })

  // scrolled state (header bg cream, links dark)
  await page.evaluate(() => window.scrollTo(0, 700))
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: '/tmp/nav_scrolled.png', clip: { x: 0, y: 0, width: 1440, height: 120 } })

  // back to top, open submenu
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise((r) => setTimeout(r, 500))
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('.menu-link')].find((b) => b.tagName === 'BUTTON' && /Hizmetler/.test(b.textContent))
    if (btn) btn.click()
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: '/tmp/nav_submenu.png', clip: { x: 0, y: 0, width: 1440, height: 560 } })

  // mobile open
  await page.setViewport({ width: 390, height: 844 })
  await new Promise((r) => setTimeout(r, 400))
  await page.evaluate(() => { const t = document.querySelector('.menu-toggle'); if (t) t.click() })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: '/tmp/nav_mobile_open.png' })
  await browser.close()
  console.log('done')
})().catch((e) => { console.error(e); process.exit(1) })
