import { asset } from '../../utils/asset'
import { site } from '../../data/content'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="container-tc">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full bg-purple-light px-4 py-1.5 text-sm font-semibold text-purple">
              {site.tagline}
            </span>
            <h1 className="heading-display mt-6 text-navy">
              Personalized preclinical studies with a CRO like no other
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              At TransCure bioServices, we combine innovative expertise and personalized support
              to develop the therapies of tomorrow.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              With a commitment to flexibility and transparency, we leverage advanced mouse
              models to accelerate your research and drive your discoveries forward.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-purple-light/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-white p-2 shadow-2xl shadow-purple/10">
              <img
                src={asset("/assets/scientist.webp")}
                alt="Scientist at work"
                className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
