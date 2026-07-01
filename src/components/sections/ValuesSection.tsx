import { values } from '../../data/content'

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-tc">
        <h2 className="heading-section max-w-3xl text-navy">
          Supporting your research with solutions tailored to your needs
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="card-hover overflow-hidden rounded-[var(--radius-card)] bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden bg-purple-light/30">
                <img
                  src={value.image}
                  alt={value.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-navy">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
