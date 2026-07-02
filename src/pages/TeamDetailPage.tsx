import type { CSSProperties, FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTeamMember, TEAM_MEMBERS, type TeamMember } from '../data/team'
import { TeamPortraitPlaceholder } from '../components/team/TeamPortraitPlaceholder'
import { useMeta } from '../hooks/useMeta'
import { asset } from '../utils/asset'

const ArrowSmall = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

const AREA_SLUGS: Record<string, string> = {
  'Bireysel Danışmanlık': 'bireysel-danismanlik',
  'Bireysel Terapi': 'bireysel-danismanlik',
  'Çift Danışmanlığı': 'cift-danismanligi',
  'Çift Terapisi': 'cift-danismanligi',
  'Aile Danışmanlığı': 'aile-danismanligi',
  'Ergen Danışmanlığı': 'ergen-danismanligi',
  'Oyun Danışmanlığı': 'oyun-danismanligi',
  'Online Danışmanlık': 'online-danismanlik',
  'Psikolojik Testler': 'psikolojik-testler',
  'Dikkat Geliştirme': 'dikkat-gelistirme',
  'Sınav Koçluğu': 'sinav-koclugu',
  'Kurumsal Danışmanlık': 'kurumsal-danismanlik',
  'Kaygı Bozuklukları': 'bireysel-danismanlik',
  'Travma Sonrası Destek': 'bireysel-danismanlik',
}

function AreaList({ items }: { items: string[] }) {
  return (
    <ul className="team-detail__area-list">
      {items.map((item) => {
        const slug = AREA_SLUGS[item]
        return (
          <li key={item}>
            {slug ? (
              <Link to={`/hizmetler/${slug}/`} className="team-detail__area-link">
                {item}
              </Link>
            ) : (
              <span>{item}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function TeamCredentials({ member }: { member: TeamMember }) {
  const hasSocial = member.social?.instagram || member.social?.linkedin

  return (
    <div className="team-detail__credentials">
      <h3 className="team-detail__credentials-title">Eğitim &amp; Deneyim</h3>
      <ul className="team-detail__credentials-list">
        <li>
          <span className="team-detail__credentials-label">Eğitim</span>
          <ul className="team-detail__credentials-sublist">
            {member.educationDetails.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </li>
        <li>
          <span className="team-detail__credentials-label">Sertifika</span>
          <ul className="team-detail__credentials-sublist">
            {member.certificates.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </li>
        <li>
          <span className="team-detail__credentials-label">Deneyim</span>
          <span className="team-detail__credentials-value">{member.experienceYears} yıl</span>
        </li>
      </ul>

      {hasSocial ? (
        <div className="team-detail__social">
          <p className="team-detail__social-label">Sosyal medya</p>
          <ul className="team-detail__social-list">
            {member.social?.instagram ? (
              <li>
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            ) : null}
            {member.social?.linkedin ? (
              <li>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function TeamContactSection({ member }: { member: TeamMember }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

  return (
    <section className="team-detail__contact" aria-labelledby="team-contact-heading">
      <div className="container">
        <div className="team-detail__contact-inner">
          <div className="team-detail__contact-intro">
            <h2 id="team-contact-heading" className="team-detail__contact-title title-lg">
              İletişime geçin
            </h2>
            <p className="team-detail__contact-desc">
              {member.name} ile randevu veya bilgi almak için formu doldurun; ekibimiz en kısa sürede size dönüş yapacaktır.
            </p>
          </div>

          <form className="team-detail__contact-form" onSubmit={handleSubmit} noValidate>
            <div className="team-detail__contact-row">
              <div className="team-detail__contact-field">
                <label htmlFor={`team-contact-ad-${member.id}`}>Ad</label>
                <input id={`team-contact-ad-${member.id}`} name="firstName" type="text" placeholder="Adınız" required />
              </div>
              <div className="team-detail__contact-field">
                <label htmlFor={`team-contact-soyad-${member.id}`}>Soyad</label>
                <input id={`team-contact-soyad-${member.id}`} name="lastName" type="text" placeholder="Soyadınız" required />
              </div>
            </div>
            <div className="team-detail__contact-row">
              <div className="team-detail__contact-field">
                <label htmlFor={`team-contact-email-${member.id}`}>E-posta</label>
                <input id={`team-contact-email-${member.id}`} name="email" type="email" placeholder="ornek@email.com" required />
              </div>
              <div className="team-detail__contact-field">
                <label htmlFor={`team-contact-phone-${member.id}`}>Telefon</label>
                <input id={`team-contact-phone-${member.id}`} name="phone" type="tel" placeholder="05XX XXX XX XX" />
              </div>
            </div>
            <div className="team-detail__contact-field team-detail__contact-field--full">
              <label htmlFor={`team-contact-message-${member.id}`}>Mesaj</label>
              <textarea
                id={`team-contact-message-${member.id}`}
                name="message"
                rows={4}
                placeholder={`${member.name} hakkında randevu veya bilgi talebinizi yazın…`}
              />
            </div>
            <div className="team-detail__contact-actions">
              <button type="submit" className="button button--purple">Mesaj Gönder</button>
              <Link to="/randevu/" className="button button--outline-burgundy">Randevu Al</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export function TeamDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const member = getTeamMember(id)
  const memberIndex = TEAM_MEMBERS.findIndex((m) => m.id === id)

  useMeta(member?.name ?? 'Ekip', member?.bio)

  if (!member) return <Navigate to="/ekibimiz/" replace />

  const others = TEAM_MEMBERS.filter((m) => m.id !== member.id).slice(0, 6)
  const firstName = member.name.replace(/^(Dr\.|Uzm\. Psk\.)\s*/, '')

  return (
    <main id="contenu-principal" className="wrapper team-detail">
      <section className="hero">
        <img src={asset('/assets/cta-bg.png')} alt="" width={1920} height={631} loading="eager" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item">
                <Link to="/" className="breadcrumbs-link">Ana Sayfa</Link>
              </li>
              <li className="breadcrumbs-item">
                <BreadcrumbArrow />
                <Link to="/ekibimiz/" className="breadcrumbs-link">Ekibimiz</Link>
              </li>
              <li aria-current="page" className="breadcrumbs-item">
                <BreadcrumbArrow />
                {member.name}
              </li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">{member.name}</h1>
            <div className="hero-wysiwyg cms">
              <p>{member.role} · {member.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-detail__main">
        <div className="container">
          <div className="team-detail__layout">
            <div className="team-detail__content">
              <div className="team-detail__aside-col">
                <div className="team-detail__portrait" style={{ '--team-accent': member.accent } as CSSProperties}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-detail__photo"
                      loading="eager"
                      width={480}
                      height={600}
                    />
                  ) : (
                    <TeamPortraitPlaceholder seed={memberIndex >= 0 ? memberIndex + 1 : 1} />
                  )}
                </div>
                <TeamCredentials member={member} />
              </div>

              <div className="team-detail__body">
                <section className="team-detail__section">
                  <h2 className="team-detail__section-title title-lg">Hakkımda</h2>
                  <div className="team-detail__wysiwyg cms">
                    {member.longBio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                <section className="team-detail__section">
                  <h2 className="team-detail__section-title title-lg">{firstName}&apos;in uzmanlık alanları</h2>
                  <AreaList items={member.expertiseAreas} />
                </section>

                <section className="team-detail__section">
                  <h2 className="team-detail__section-title title-lg">{firstName}&apos;in çalışma alanları</h2>
                  <AreaList items={member.treatmentAreas} />
                </section>

                <section className="team-detail__section">
                  <h2 className="team-detail__section-title title-lg">Çalışma yaklaşımı</h2>
                  <p className="team-detail__section-text">{member.approach}</p>
                </section>

                {member.summaryBio ? (
                  <section className="team-detail__section team-detail__section--summary">
                    <p className="team-detail__summary">{member.summaryBio}</p>
                  </section>
                ) : null}
              </div>
            </div>

            <aside className="svc-sidebar team-detail__sidebar">
              <div className="svc-sidebar__header">
                <p className="svc-sidebar__heading">{member.name}</p>
                <p className="svc-sidebar__sub">{member.role}</p>
              </div>
              <div className="svc-sidebar__body">
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Deneyim</span>
                    <span className="svc-info-row__value">{member.experienceYears} yıl</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
                    </svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Eğitim</span>
                    <span className="svc-info-row__value">{member.education}</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Diller</span>
                    <span className="svc-info-row__value">{member.languages.join(', ')}</span>
                  </div>
                </div>
                <div className="svc-info-row">
                  <span className="svc-info-row__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="17" rx="2" />
                      <path d="M3 10h18M8 2v4M16 2v4" />
                    </svg>
                  </span>
                  <div>
                    <span className="svc-info-row__label">Çalışma saatleri</span>
                    <span className="svc-info-row__value">Pzt – Cmt · 10:00 – 22:00</span>
                  </div>
                </div>
                <hr className="svc-sidebar__divider" />
                <Link to="/randevu/" className="svc-sidebar__btn">
                  Randevu Al <ArrowSmall />
                </Link>
                <Link to="/iletisim/" className="svc-sidebar__link">Soru sormak ister misiniz? →</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <TeamContactSection member={member} />

      <section className="team-detail__related">
        <div className="container">
          <p className="svc-related__label">Diğer ekip üyelerimiz</p>
          <ul className="svc-related__list">
            {others.map((other) => (
              <li key={other.id} className="svc-related__item">
                <Link to={`/ekibimiz/${other.id}/`} className="svc-related__link">
                  <span>{other.name}</span>
                  <ArrowSmall />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
