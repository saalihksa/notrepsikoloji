import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'
import { BLOG_POSTS } from '../data/blogPosts'

const ArrowIcon = () => (
  <svg aria-hidden="true" className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3.10645 7.98816C2.76127 7.98816 2.48145 8.26798 2.48145 8.61316C2.48145 8.95834 2.76127 9.23816 3.10645 9.23816V7.98816ZM3.10645 9.23816H14.8922V7.98816H3.10645V9.23816Z" fill="currentColor" />
    <path d="M10.0693 3.79224L14.8908 8.61366L10.0693 13.4351" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function BlogPage() {
  useMeta('Blog', 'Notre Psikoloji blogunda ruh sağlığı, ebeveynlik ve danışmanlık süreçlerine dair uzman yazıları.')

  return (
    <main id="contenu-principal" className="wrapper">
      <section className="hero">
        <img src="/assets/cta-bg.png" alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />Blog</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">Blog</h1>
            <div className="hero-wysiwyg cms">
              <p>Notre Psikoloji blogunda ruh sağlığı, ebeveynlik, çocuk gelişimi ve danışmanlık süreçlerine dair uzman yazılarımızı okuyabilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sectionPosts">
        <div className="sectionPosts-ctr container">
          <ul aria-label="Blog yazıları" className="grid">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug} className="grid-item">
                <article className="post-card">
                  <div className="post-card-top">
                    <ul className="post-card-terms">
                      <li className="post-card-term" style={{ '--term-bg': 'rgba(90, 2, 2, 0.08)', '--term-color': 'rgba(90, 2, 2, 1)' } as React.CSSProperties}>Blog</li>
                    </ul>
                    <p className="post-card-date">{post.date}</p>
                  </div>
                  <div className="post-card-bottom">
                    <h3 className="post-card-title">{post.title}</h3>
                    <Link to={`/blog/${post.slug}/`} className="post-card-link" aria-label="Devamını oku">
                      <ArrowIcon />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
