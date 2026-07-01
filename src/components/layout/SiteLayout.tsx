import type { ReactNode } from 'react'
import headerHtml from '../../data/site-header.html?raw'
import footerHtml from '../../data/site-footer.html?raw'
import { patchHtmlPaths } from '../../utils/asset'

type SiteLayoutProps = {
  children: ReactNode
}

const patchedHeader = patchHtmlPaths(headerHtml)
const patchedFooter = patchHtmlPaths(footerHtml)

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <div className="site-chrome" dangerouslySetInnerHTML={{ __html: patchedHeader }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: patchedFooter }} />
    </>
  )
}
