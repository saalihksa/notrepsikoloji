import { Button } from '../ui/Button'

export function ContactCtaSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container-tc">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-purple/10">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src="/assets/team.webp"
                alt="TransCure bioServices laboratory"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:to-white" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <h2 className="heading-section text-navy">
                Accelerate your preclinical research with confidence.
              </h2>
              <p className="mt-4 text-xl font-medium text-purple">
                Together, we transform research into results.
              </p>

              <div className="mt-10 rounded-[var(--radius-card)] bg-bg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <img
                    src="/assets/scientist.webp"
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Have a question?</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Our experts are ready to assist you. Get in touch, and we&apos;ll get back
                      to you shortly.
                    </p>
                    <Button href="#" className="mt-5">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
