import { Button } from '../ui/Button'
import { diseaseAreas } from '../../data/content'

export function ExperienceSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-tc">
        <div className="rounded-[2rem] bg-white px-6 py-12 md:px-12 md:py-16">
          <h2 className="heading-section max-w-4xl text-navy">
            Benefits from our 12 years experience in validated mouse models
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            Being at the forefront of our industry, we are committed to renewal and innovation.
            <br />
            Together with our collaborators, we challenge the market with new preclinical models
            in humanized and standard mice that are increasingly predictive.
          </p>
          <p className="mt-4 text-base font-semibold text-navy">
            Our experienced R&D team loves new challenges!{' '}
            <a href="#contact" className="text-purple underline-offset-4 hover:underline">
              Contact us to discuss your needs.
            </a>
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {diseaseAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-[var(--radius-card)] border border-navy/5 bg-bg p-6 md:p-8"
              >
                <h3 className="text-xl font-semibold text-navy">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {area.links.map((link) => (
                    <Button key={link} href="#" variant="outline" size="sm">
                      {link}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
