function BreadcrumbArrow() {
  return (
    <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
      <path
        d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  )
}

export type BreadcrumbItem = {
  label: string
  href?: string
}

type PageHeroProps = {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  currentPage?: string
}

export function PageHero({ title, description, breadcrumbs, currentPage }: PageHeroProps) {
  const crumbs: BreadcrumbItem[] =
    breadcrumbs ??
    (currentPage
      ? [
          { label: 'Ana Sayfa', href: '/' },
          { label: currentPage },
        ]
      : [{ label: 'Ana Sayfa', href: '/' }])

  return (
    <section className="hero">
      <img
        src="/assets/cta-bg.png"
        alt=""
        width={1920}
        height={631}
        loading="eager"
        className="hero-image"
      />
      <div className="hero-ctr container">
        <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
          <ul className="breadcrumbs-list">
            {crumbs.map((crumb) => {
              if (!crumb.href) {
                return (
                  <li key={crumb.label} aria-current="page" className="breadcrumbs-item">
                    <BreadcrumbArrow />
                    {crumb.label}
                  </li>
                )
              }

              return (
                <li key={crumb.label} className="breadcrumbs-item">
                  <a href={crumb.href} className="breadcrumbs-link">
                    {crumb.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {description ? (
            <div className="hero-wysiwyg cms">
              <p>{description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
