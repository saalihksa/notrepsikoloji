import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getPageMeta, loadPageHtml } from '../data/pageRegistry'

export function TranscurePage() {
  const { pathname } = useLocation()
  const meta = getPageMeta(pathname)
  const [html, setHtml] = useState<string | null>(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!meta) return

    let cancelled = false
    setHtml(null)
    setLoadError(false)

    void loadPageHtml(meta.file)
      .then((content) => {
        if (cancelled) return
        if (!content) {
          setLoadError(true)
          return
        }
        setHtml(content)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })

    return () => {
      cancelled = true
    }
  }, [meta, pathname])

  useEffect(() => {
    if (!meta || !html) return
    document.title = meta.title
  }, [meta, html, pathname])

  if (!meta) {
    return <Navigate to="/" replace />
  }

  if (loadError) {
    return <Navigate to="/" replace />
  }

  if (!html) {
    return null
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
