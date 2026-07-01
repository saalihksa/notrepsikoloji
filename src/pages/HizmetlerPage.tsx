import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'
import { SERVICE_GROUPS, SERVICES } from '../data/services'

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function HizmetlerPage() {
  useMeta('Hizmetler', 'İhtiyacınıza uygun psikolojik danışmanlık hizmetlerini keşfedin.')

  return (
    <main id="contenu-principal" className="wrapper">
      <section className="hero">
        <img src="/assets/cta-bg.png" alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />Hizmetler</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">Hizmetlerimiz</h1>
            <div className="hero-wysiwyg cms">
              <p>İhtiyacınıza uygun psikolojik danışmanlık hizmetlerini keşfedin.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-index">
        <div className="container">
          {SERVICE_GROUPS.map((group) => {
            const groupServices = group.slugs
              .map((slug) => SERVICES.find((s) => s.slug === slug))
              .filter(Boolean)
            return (
              <div key={group.label} className="svc-index__group">
                <div className="svc-index__group-label">
                  <span>{group.label}</span>
                </div>
                <ul className="svc-index__list">
                  {groupServices.map((svc) => svc && (
                    <li key={svc.slug} className="svc-index__item">
                      <Link to={`/hizmetler/${svc.slug}/`} className="svc-index__link">
                        <span className="svc-index__title">{svc.title}</span>
                        <span className="svc-index__desc">{svc.shortDesc}</span>
                        <span className="svc-index__arrow" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3.5 9h11M9.5 4l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
