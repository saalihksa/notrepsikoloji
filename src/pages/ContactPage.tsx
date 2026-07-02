import { useEffect, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/layout/PageHero'
import { useMeta } from '../hooks/useMeta'

const CONTACT = {
  phone: '+90 552 154 2552',
  phoneHref: 'tel:+905521542552',
  email: 'info@notrepsikoloji.com',
  address: 'Üsküdar, İstanbul',
  hours: 'Pzt – Cmt · 10:00 – 22:00',
  hoursNote: 'Pazar kapalı',
  mapQuery: 'Üsküdar, İstanbul, Türkiye',
} as const

const SERVICES = [
  'Bireysel Danışmanlık',
  'Çift Danışmanlığı',
  'Online Danışmanlık',
  'Ergen Danışmanlığı',
  'Psikolojik Testler',
  'Diğer',
] as const

const ArrowSmall = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function ContactPage() {
  useMeta('İletişim', 'Randevu almak veya soru sormak için bize ulaşın.')

  useEffect(() => {
    document.body.className = 'wp-singular page wp-theme-solanum contact-route'
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&hl=tr&z=14&output=embed`

  return (
    <main id="contenu-principal" className="wrapper contact-page">
      <PageHero
        title="İletişim"
        currentPage="İletişim"
        description="Randevu almak veya soru sormak için bize ulaşın."
      />

      <section className="contact-page__shell" aria-label="İletişim bilgileri ve mesaj formu">
        <div className="container contact-page__container">
          <div className="contact-page__intro">
            <span className="contact-page__eyebrow">Bize ulaşın</span>
            <p className="contact-page__lead">
              Sorularınız, randevu talepleriniz veya danışmanlık süreci hakkındaki merak ettikleriniz için
              ekibimiz 24 saat içinde size dönüş yapar.
            </p>
          </div>

          <div className="contact-page__card">
            <aside className="contact-page__aside">
              <div className="contact-page__aside-header">
                <p className="contact-page__aside-heading">Notre Psikoloji</p>
                <p className="contact-page__aside-sub">Psikolojik Danışmanlık Merkezi</p>
              </div>

              <div className="contact-page__aside-body">
                <ul className="contact-page__channels">
                  <li className="contact-page__channel">
                    <span className="contact-page__channel-icon" aria-hidden="true">
                      <PhoneIcon />
                    </span>
                    <div>
                      <span className="contact-page__channel-label">Telefon</span>
                      <a href={CONTACT.phoneHref} className="contact-page__channel-value contact-page__channel-link">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </li>
                  <li className="contact-page__channel">
                    <span className="contact-page__channel-icon" aria-hidden="true">
                      <MailIcon />
                    </span>
                    <div>
                      <span className="contact-page__channel-label">E-posta</span>
                      <a href={`mailto:${CONTACT.email}`} className="contact-page__channel-value contact-page__channel-link">
                        {CONTACT.email}
                      </a>
                    </div>
                  </li>
                  <li className="contact-page__channel">
                    <span className="contact-page__channel-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <div>
                      <span className="contact-page__channel-label">Adres</span>
                      <span className="contact-page__channel-value">{CONTACT.address}</span>
                    </div>
                  </li>
                  <li className="contact-page__channel">
                    <span className="contact-page__channel-icon" aria-hidden="true">
                      <ClockIcon />
                    </span>
                    <div>
                      <span className="contact-page__channel-label">Çalışma saatleri</span>
                      <span className="contact-page__channel-value">
                        {CONTACT.hours}
                        <span className="contact-page__channel-note">{CONTACT.hoursNote}</span>
                      </span>
                    </div>
                  </li>
                </ul>

                <hr className="contact-page__divider" />

                <Link to="/randevu/" className="contact-page__cta-btn">
                  Randevu Al <ArrowSmall />
                </Link>
                <Link to="/sss/" className="contact-page__cta-link">
                  Sık sorulan sorular →
                </Link>
              </div>

              <div className="contact-page__map">
                <iframe
                  title="Notre Psikoloji konum"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </aside>

            <div className="contact-page__form-panel">
              <div className="contact-page__form-head">
                <h2 className="contact-page__form-title">Mesaj gönderin</h2>
                <p className="contact-page__form-desc">
                  Formu doldurun; size en uygun uzman ve randevu seçenekleri hakkında bilgi verelim.
                </p>
              </div>

              <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
                <div className="contact-page__form-row">
                  <Field label="Ad" name="firstName" placeholder="Adınız" required />
                  <Field label="Soyad" name="lastName" placeholder="Soyadınız" required />
                </div>
                <div className="contact-page__form-row">
                  <Field label="E-posta" name="email" type="email" placeholder="ornek@email.com" required />
                  <Field label="Telefon" name="phone" type="tel" placeholder="05XX XXX XX XX" />
                </div>
                <div className="contact-page__field">
                  <label className="contact-page__label" htmlFor="contact-service">Hizmet</label>
                  <select id="contact-service" name="service" className="contact-page__input">
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="contact-page__field">
                  <label className="contact-page__label" htmlFor="contact-message">Mesajınız</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-page__input contact-page__input--textarea"
                    placeholder="Mesajınızı yazın…"
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="button button--purple contact-page__submit">
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="contact-page__field">
      <label className="contact-page__label" htmlFor={`contact-${name}`}>{label}</label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="contact-page__input"
      />
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}
