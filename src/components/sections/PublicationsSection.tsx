import { Button } from '../ui/Button'
import { publications } from '../../data/content'

export function PublicationsSection() {
  return (
    <section id="publications" className="py-16 md:py-24">
      <div className="container-tc">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="heading-section max-w-xl text-navy">
            Our latest scientific publications and studies
          </h2>
          <Button href="#" variant="outline">
            See all scientific publications
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {publications.map((pub) => (
            <a
              key={pub.title}
              href={pub.href}
              className="card-hover group overflow-hidden rounded-[var(--radius-card)] bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={pub.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple">
                  <span>{pub.type}</span>
                  {pub.date && (
                    <>
                      <span className="text-muted">·</span>
                      <span className="text-muted">{pub.date}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-navy group-hover:text-purple">
                  {pub.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
