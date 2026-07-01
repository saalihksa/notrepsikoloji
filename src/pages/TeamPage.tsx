import { useEffect } from 'react'
import { PageHero } from '../components/layout/PageHero'
import { TEAM_MEMBERS } from '../data/team'
import { TeamMemberCard } from '../components/team/TeamMemberCard'

export function TeamPage() {
  useEffect(() => {
    document.title = 'Ekibimiz | Notre Psikoloji'
  }, [])

  return (
    <main id="contenu-principal" className="wrapper team-page">
      <PageHero
        title="Ekibimiz"
        currentPage="Ekibimiz"
        description="Alanında uzman ve deneyimli psikolog kadromuz."
      />

      <section className="team-page__board" aria-label="Uzman kadromuz">
        <div className="container">
          <div className="team-page__grid">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="team-page__cta" aria-labelledby="team-cta-heading">
        <div className="container team-page__cta-inner">
          <div>
            <h2 id="team-cta-heading" className="team-page__cta-title">
              Size en uygun uzmanla tanışın
            </h2>
            <p className="team-page__cta-text">
              Randevu için bizimle iletişime geçin; ihtiyacınıza uygun uzmana yönlendirme yapalım.
            </p>
          </div>
          <a href="/randevu/" className="team-page__cta-btn">
            Randevu Al
            <svg aria-hidden="true" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M1.35 0.7L6.65 6L1.35 11.3"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
