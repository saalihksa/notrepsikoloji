import { Button } from '../ui/Button'
import { missionBadges } from '../../data/content'

export function MissionSection() {
  return (
    <section id="mission" className="py-16 md:py-24">
      <div className="container-tc">
        <div className="rounded-[2rem] bg-purple px-6 py-12 text-white md:px-12 md:py-16">
          <h2 className="heading-section max-w-2xl">
            Our mission reflects our strong shared commitments
          </h2>
          <Button
            href="#"
            variant="outline"
            className="mt-8 border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
          >
            See our ethic & quality policy
          </Button>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {missionBadges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-3 rounded-[var(--radius-card)] bg-white/10 px-5 py-4 backdrop-blur-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-purple">
                  ✓
                </span>
                <span className="text-sm font-medium md:text-base">{badge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
