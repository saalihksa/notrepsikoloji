import type { ReactNode } from 'react'
import headerHtml from '../../data/site-header.html?raw'
import footerHtml from '../../data/site-footer.html?raw'

type SiteLayoutProps = {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <div className="site-chrome" dangerouslySetInnerHTML={{ __html: headerHtml }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  )
}
