import { useEffect } from 'react'
import heroHtml from '../data/site-hero.html?raw'
import bodyHtml from '../data/site-body.html?raw'

const HOME_TITLE = 'Notre Psikoloji | Psikolojik Danışmanlık Merkezi'

export function HomePage() {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])

  return (
    <main id="contenu-principal" className="wrapper">
      <div className="bg">
        <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </main>
  )
}
