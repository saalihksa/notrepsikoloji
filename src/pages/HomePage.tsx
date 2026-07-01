import { useEffect } from 'react'
import heroHtml from '../data/site-hero.html?raw'
import bodyHtml from '../data/site-body.html?raw'
import { patchHtmlPaths } from '../utils/asset'

const HOME_TITLE = 'Notre Psikoloji | Psikolojik Danışmanlık Merkezi'
const patchedHero = patchHtmlPaths(heroHtml)
const patchedBody = patchHtmlPaths(bodyHtml)

export function HomePage() {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])

  return (
    <main id="contenu-principal" className="wrapper">
      <div className="bg">
        <div dangerouslySetInnerHTML={{ __html: patchedHero }} />
        <div dangerouslySetInnerHTML={{ __html: patchedBody }} />
      </div>
    </main>
  )
}
