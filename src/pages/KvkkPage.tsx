import { asset } from '../utils/asset'
import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

export function KvkkPage() {
  useMeta('KVKK ve Gizlilik', 'Kişisel verilerin korunması ve gizlilik politikamız.')

  return (
    <main id="contenu-principal" className="wrapper">
      <section className="hero">
        <img src={asset("/assets/cta-bg.png")} alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />KVKK</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">KVKK ve Gizlilik</h1>
            <div className="hero-wysiwyg cms">
              <p>Kişisel verilerin korunması ve gizlilik politikamız.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contentList">
        <div className="container cms">
          <h2>Kişisel Verilerin Korunması</h2>
          <p>Notre Psikoloji olarak kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işlemekteyiz. Danışmanlık sürecinde paylaştığınız tüm bilgiler gizlilik ilkesiyle korunur.</p>

          <h3>Hangi Verileri İşliyoruz?</h3>
          <p>Randevu ve danışmanlık hizmetleri kapsamında; ad-soyad, iletişim bilgileri ve hizmet sürecine ilişkin notlar gibi veriler toplanabilir. Bu veriler yalnızca hizmet sunumu amacıyla kullanılır.</p>

          <h3>Verileriniz Nasıl Korunur?</h3>
          <p>Tüm danışan bilgileri şifreli sistemlerde saklanmakta; yetkisiz erişime karşı teknik ve idari önlemler alınmaktadır. Psikolojik danışmanlığın etik ilkeleri gereği, yasal zorunluluklar dışında bilgileriniz hiçbir üçüncü kişiyle paylaşılmaz.</p>

          <h3>Haklarınız</h3>
          <p>KVKK kapsamında; verilerinize erişim, düzeltme, silme ve itiraz haklarına sahipsiniz. Bu haklarınızı kullanmak için aşağıdaki iletişim adresine yazabilirsiniz.</p>

          <h3>İletişim</h3>
          <p>Kişisel verilerinizle ilgili her türlü soru ve talebiniz için: <a href="mailto:info@notrepsikoloji.com">info@notrepsikoloji.com</a></p>
        </div>
      </section>
    </main>
  )
}
