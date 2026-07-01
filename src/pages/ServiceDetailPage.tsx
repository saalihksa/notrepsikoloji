import { asset } from '../utils/asset'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getService, SERVICES } from '../data/services'
import { useMeta } from '../hooks/useMeta'

const ArrowSmall = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function ServiceDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const svc = getService(slug)

  useMeta(svc?.title ?? 'Hizmet', svc?.shortDesc)

  if (!svc) return <Navigate to="/hizmetler/" replace />

  const others = SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 12)

  return (
    <main id="contenu-principal" className="wrapper svc-detail">
      <section className="hero">
        <img src={asset("/assets/cta-bg.png")} alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li className="breadcrumbs-item"><BreadcrumbArrow /><Link to="/hizmetler/" className="breadcrumbs-link">Hizmetler</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />{svc.title}</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">{svc.title}</h1>
            <div className="hero-wysiwyg cms"><p>{svc.shortDesc}</p></div>
          </div>
        </div>
      </section>

      <section className="svc-detail__top">
        <div className="container">
          <div className="cards-top svc-detail__cards-top" data-animate-container>
            <div className="cards-title-wrap" data-animate-child>
              <p className="svc-detail__intro">{svc.intro}</p>
            </div>
            <div className="cards-text" data-animate-child>
              <p>{svc.richP1}</p>
            </div>
          </div>

          <div className="cards-grid svc-detail__steps-grid" data-animate-container>
            {svc.steps.map((step) => (
              <div key={step.title} className="cards-item" data-animate-child>
                <h3 className="cards-item-title title-lg">{step.title}</h3>
                <p className="cards-item-text">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="svc-detail__bottom-row">
            <div className="svc-detail__body-text">
              <p className="svc-detail__rich">{svc.richP2}</p>
              <div className="svc-detail__topics">
                <p className="svc-detail__topics-label">Bu süreçte çalıştığımız başlıca konular</p>
                <ul className="svc-detail__topics-list">
                  {svc.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="svc-sidebar">
              <div className="svc-sidebar__header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <p className="svc-sidebar__heading">{svc.title}</p>
                </div>
                <p className="svc-sidebar__sub">Üsküdar, İstanbul</p>
              </div>
              <div className="svc-sidebar__body">
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Seans süresi</span>
                    <span className="svc-info-row__value">50 dakika</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Çalışma saatleri</span>
                    <span className="svc-info-row__value">Pzt – Cmt · 10:00 – 22:00</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Seans tipi</span>
                    <span className="svc-info-row__value">Yüz yüze veya online</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Telefon</span>
                    <span className="svc-info-row__value">
                      <a href="tel:+905521542552" style={{ color: 'inherit' }}>+90 552 154 2552</a>
                    </span>
                  </div>
                </div>
                <hr className="svc-sidebar__divider" />
                <Link to="/randevu/" className="svc-sidebar__btn">Randevu Al <ArrowSmall /></Link>
                <Link to="/iletisim/" className="svc-sidebar__link">Soru sormak ister misiniz? →</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="svc-related">
        <div className="container">
          <p className="svc-related__label">Diğer hizmetlerimiz</p>
          <ul className="svc-related__list">
            {others.map((other) => (
              <li key={other.slug} className="svc-related__item">
                <Link to={`/hizmetler/${other.slug}/`} className="svc-related__link">
                  <span>{other.title}</span>
                  <ArrowSmall />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
