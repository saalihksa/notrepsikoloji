export function TeamSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-tc">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="heading-section text-navy">
              Meet your humanized research team: Dedicated to your success
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Human values are essential to the cultivation of all innovations. Our advanced
              mouse models would not yield such relevant results without the investment and
              expertise of our team.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Our 70 collaborators all believe that partnership, exchange and collaboration drive
              forward the causes that matter. Together, in our diversity, we bring expertise,
              passion, and a commitment to making a difference, driving solutions that truly
              matter.
            </p>
            <p className="mt-6 text-lg font-semibold text-navy">
              Large enough to serve, small enough to care!
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-white p-2 shadow-xl shadow-purple/10">
              <img
                src="/assets/team.webp"
                alt="TransCure bioServices team"
                className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
