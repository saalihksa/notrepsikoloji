import { useEffect } from 'react'

export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Notre Psikoloji`

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description])
}
