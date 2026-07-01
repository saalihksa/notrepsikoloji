import { Button } from '../ui/Button'
import { mouseModels } from '../../data/content'

export function MouseModelsSection() {
  return (
    <section id="mouse-models" className="py-16 md:py-24">
      <div className="container-tc">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-navy md:text-3xl">
            Find the perfect humanized mouse model to advance your research
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Discover our validated mouse models, from conventional to cutting-edge
            double-humanized mice. Perfectly designed for predictive studies, they accelerate
            breakthroughs in oncology, infectious, and inflammatory diseases.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {mouseModels.map((model) => (
            <article
              key={model.title}
              className="card-hover flex flex-col rounded-[var(--radius-card)] bg-white p-6 md:p-8"
            >
              <div
                className="mb-6 h-2 w-12 rounded-full"
                style={{ backgroundColor: model.accent }}
              />
              <h3 className="text-lg font-semibold leading-snug text-navy md:text-xl">
                {model.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {model.description}
              </p>
              <Button href={model.href} variant="outline" size="sm" className="mt-8 self-start">
                See the mouse model
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
