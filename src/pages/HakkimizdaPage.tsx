import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function HakkimizdaPage() {
  useMeta('Hakkımızda', "Üsküdar'da ailenizin her üyesi için güvenilir ve kapsamlı psikolojik danışmanlık.")

  return (
    <main id="contenu-principal" className="wrapper">
      <section className="hero">
        <img src="/assets/cta-bg.png" alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />Hakkımızda</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">Hakkımızda</h1>
            <div className="hero-wysiwyg cms">
              <p>Üsküdar'da ailenizin her üyesi için güvenilir ve kapsamlı psikolojik danışmanlık.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contentTags" data-animate-container>
        <div className="contentTags-ctr container">
          <div className="contentTags-col">
            <h2 className="contentTags-title title-xl" data-animate-child>10 yılı aşkın deneyimle yanınızdayız</h2>
            <Link to="/randevu/" className="button button--purple contentTags-link">Randevu Al</Link>
          </div>
          <div className="contentTags-col">
            <ul className="contentTags-list">
              <li className="contentTags-item" style={{ '--tag-bg': 'rgba(90,2,2,0.05)', '--tag-color': '#5a0202' } as React.CSSProperties} data-animate-child>8+ Uzman Psikolog</li>
              <li className="contentTags-item" style={{ '--tag-bg': 'rgba(90,2,2,0.07)', '--tag-color': '#5a0202' } as React.CSSProperties} data-animate-child>500+ Danışan</li>
              <li className="contentTags-item" style={{ '--tag-bg': 'rgba(90,2,2,0.05)', '--tag-color': '#5a0202' } as React.CSSProperties} data-animate-child>%100 Gizlilik</li>
              <li className="contentTags-item" style={{ '--tag-bg': 'rgba(90,2,2,0.07)', '--tag-color': '#5a0202' } as React.CSSProperties} data-animate-child>Yüz yüze & Online</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cards" data-animate-bg="var(--c-cream)">
        <div className="cards-ctr container">
          <div className="cards-top" data-animate-container>
            <h2 className="cards-title title-xl" data-animate-child>İnsanı merkeze alan bir anlayışla kurulduk</h2>
            <div className="cards-text" data-animate-child>
              <p>Notre Psikoloji, psikolojik danışmanlığın herkes için erişilebilir olması gerektiği inancıyla Üsküdar'da kuruldu. Alanında uzman psikologlardan oluşan ekibimizle bireylere, çiftlere, ailelere ve çocuklara kapsamlı destek sunuyoruz.</p>
              <p><b>Her danışan benzersizdir. Bilimsel yöntemleri kişiye özel yaklaşımla birleştiriyoruz. <Link to="/ekibimiz/">Ekibimizle tanışın.</Link></b></p>
            </div>
          </div>
        </div>
      </section>

      <section className="cards">
        <div className="cards-ctr container">
          <div className="cards-top" data-animate-container>
            <h2 className="cards-title title-xl" data-animate-child>Misyon ve Vizyonumuz</h2>
            <div className="cards-text" data-animate-child>
              <p>Etik, bilimsel ve insan odaklı yaklaşımımız her çalışmamızın temelini oluşturur.</p>
            </div>
          </div>
          <div className="cards-grid" data-animate-container>
            <div className="cards-item" data-animate-child>
              <h3 className="cards-item-title title-lg">Misyonumuz</h3>
              <p className="cards-item-text">Uzmanlığımız ile birlikte erişilebilir ve ulaşılabilir psikolojik danışmanlık hizmetleri sunmak; bireyin ve ailenin iyilik halini desteklemek.</p>
            </div>
            <div className="cards-item" data-animate-child>
              <h3 className="cards-item-title title-lg">Vizyonumuz</h3>
              <p className="cards-item-text">Etik, bilimsel ve güvenli bir psikolojik danışmanlık anlayışıyla toplumun ruh sağlığına katkı sağlayan, güvenilir bir referans merkezi olmak.</p>
            </div>
            <div className="cards-item" data-animate-child>
              <h3 className="cards-item-title title-lg">Yaklaşımımız</h3>
              <p className="cards-item-text">Kanıta dayalı, güncel psikoloji biliminin yöntemleriyle çalışıyoruz. Her danışan için kişiye özel bir plan oluşturulur; süreç şeffaf ve işbirlikçi ilerler.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="imageContent">
        <div className="imageContent-inner">
          <div className="imageContent-ctr container container--fluid">
            <img src="/assets/team-space.png" alt="Notre Psikoloji ekibi" width={1024} height={683} loading="lazy" className="imageContent-image" />
            <div className="imageContent-content">
              <h2 className="imageContent-title title-xl">Uzman kadromuzla tanışın</h2>
              <div className="imageContent-wysiwyg">
                <p>Alanında uzman psikologlardan oluşan ekibimiz, her danışana saygı ve şefkatle yaklaşır. Farklı uzmanlıkların bir araya geldiği kadromuzla bütüncül destek sunuyoruz.</p>
                <p><b>8 uzman psikolog, geniş uzmanlık yelpazesi.</b></p>
                <p>
                  <Link to="/ekibimiz/" className="button button--white">
                    Ekibimizi tanıyın
                    <svg aria-hidden="true" className="button-icon icon" width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M1.35059 0.701547L6.6491 6.00007L1.35059 11.2986" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
