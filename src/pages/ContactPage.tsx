import { useEffect, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

const CONTACT = {
  phone: '+90 552 154 2552',
  phoneHref: 'tel:+905521542552',
  email: 'info@notrepsikoloji.com',
  address: 'Üsküdar, İstanbul',
  hours: 'Pzt – Cmt  10:00 – 22:00',
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

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function ContactPage() {
  useEffect(() => {
    document.title = 'İletişim | Notre Psikoloji'
    document.body.className = 'wp-singular page wp-theme-solanum contact-route'
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&hl=tr&z=14&output=embed`

  return (
    <main id="contenu-principal" className="wrapper contact-page">
      <section className="hero">
        <img src="/assets/cta-bg.png" alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />İletişim</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">İletişim</h1>
            <div className="hero-wysiwyg cms">
              <p>Randevu almak veya soru sormak için bize ulaşın.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-page__shell">
        <div className="container contact-page__container">
          <div className="contact-slim">

            {/* Sol — bilgiler */}
            <aside className="contact-slim__info">
              <h2 className="contact-slim__info-title">Bize ulaşın</h2>

              <ul className="contact-slim__list">
                <li>
                  <span className="contact-slim__list-label">Telefon</span>
                  <a href={CONTACT.phoneHref} className="contact-slim__list-value">{CONTACT.phone}</a>
                </li>
                <li>
                  <span className="contact-slim__list-label">E-posta</span>
                  <a href={`mailto:${CONTACT.email}`} className="contact-slim__list-value">{CONTACT.email}</a>
                </li>
                <li>
                  <span className="contact-slim__list-label">Adres</span>
                  <span className="contact-slim__list-value">{CONTACT.address}</span>
                </li>
                <li>
                  <span className="contact-slim__list-label">Saatler</span>
                  <span className="contact-slim__list-value">{CONTACT.hours}</span>
                </li>
              </ul>

              <div className="contact-slim__map">
                <iframe
                  title="Notre Psikoloji konum"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </aside>

            {/* Sağ — form */}
            <div className="contact-slim__form-wrap">
              <h2 className="contact-slim__form-title">Mesaj gönderin</h2>
              <p className="contact-slim__form-desc">24 saat içinde size dönüş yaparız.</p>

              <form className="contact-slim__form" onSubmit={handleSubmit} noValidate>
                <div className="contact-slim__row">
                  <Field label="Ad" name="firstName" placeholder="Adınız" required />
                  <Field label="Soyad" name="lastName" placeholder="Soyadınız" required />
                </div>
                <Field label="E-posta" name="email" type="email" placeholder="ornek@email.com" required />
                <Field label="Telefon" name="phone" type="tel" placeholder="05XX XXX XX XX" />
                <div className="contact-slim__field">
                  <label className="contact-slim__label" htmlFor="contact-service">Hizmet</label>
                  <select id="contact-service" name="service" className="contact-slim__input">
                    {SERVICES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="contact-slim__field contact-slim__field--full">
                  <label className="contact-slim__label" htmlFor="contact-message">Mesajınız</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-slim__input contact-slim__input--textarea"
                    placeholder="Mesajınızı yazın…"
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="button button--purple contact-slim__submit">
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
  label, name, type = 'text', placeholder, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div className="contact-slim__field">
      <label className="contact-slim__label" htmlFor={`contact-${name}`}>{label}</label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="contact-slim__input"
      />
    </div>
  )
}
