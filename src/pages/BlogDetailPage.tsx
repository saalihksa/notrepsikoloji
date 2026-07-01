import { asset } from '../utils/asset'
import { Navigate, useParams } from 'react-router-dom'
import { getBlogPost } from '../data/blogPosts'
import { useMeta } from '../hooks/useMeta'

export function BlogDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const post = getBlogPost(slug)

  useMeta(post?.title ?? 'Blog', post?.description)

  if (!post) return <Navigate to="/blog/" replace />

  return (
    <main id="contenu-principal" className="wrapper blog-detail">
      <section className="hero">
        <img src={asset("/assets/cta-bg.png")} alt="" width={1920} height={631} loading="eager" className="hero-image" />
        <div className="hero-ctr container">
          <div className="hero-content">
            <div>
              <h1 className="hero-title">{post.title}</h1>
            </div>
            <div />
          </div>
        </div>
      </section>

      <div className="single-main">
        {post.sections.map((section) => (
          <section key={section.title} className="content">
            <div className="content-ctr container container--md">
              <h2 className="content-title title-lg">{section.title}</h2>
              <div className="content-wysiwyg cms">
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
