import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'

const BreadcrumbArrow = () => (
  <svg aria-hidden="true" className="breadcrumbs-arrow icon" viewBox="0 0 17 16">
    <path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

const FAQ_LEFT = [
  { q: 'Psikolojik danışmanlık nedir?', a: 'Bireylerin ruhsal zorluklarını anlamak, duygusal denge kurmak ve yaşam kalitesini artırmak için yürütülen profesyonel bir süreçtir. Uzman psikologlar eşliğinde sorunlarınıza çözüm odaklı yaklaşılır.' },
  { q: 'Tanı almadan danışmanlık alabilir miyim?', a: 'Evet. Günlük stres, ilişki sorunları, kaygı ve kişisel gelişim gibi birçok konuda herhangi bir tanı olmadan destek alabilirsiniz. Danışmanlık yalnızca klinik sorunlarla sınırlı değildir.' },
  { q: 'Hangi yaş gruplarıyla çalışıyorsunuz?', a: '2–12 yaş oyun danışmanlığı, 12–18 yaş ergen danışmanlığı ve 18 yaş üstü yetişkin danışmanlığı sunuyoruz. Her yaş grubuna uygun farklı terapötik yöntemler kullanılır.' },
  { q: 'Online ve yüz yüze seans arasında fark var mı?', a: 'Bilimsel çalışmalar birçok konuda online danışmanlığın yüz yüze kadar etkili olduğunu göstermektedir. Uzaklık, ulaşım veya zaman kısıtı yaşayan danışanlarımız online seçeneği tercih edebilir.' },
  { q: 'Paylaştığım bilgiler gizli kalır mı?', a: 'Evet. Gizlilik, psikolojik danışmanlığın temel etik ilkesidir. Yasal zorunluluk gerektiren durumlar dışında hiçbir bilgi üçüncü kişilerle paylaşılmaz.' },
  { q: 'İlk seans ne kadar sürer?', a: 'İlk görüşme genellikle 50 dakika sürer. Bu seansta psikologunuz sizi daha yakından tanımak, ihtiyaçlarınızı anlamak ve süreci birlikte planlamak için sorular sorar.' },
  { q: 'Kaç seans süreceğini önceden bilebilir miyim?', a: 'Seans sayısı kişiden kişiye ve konudan konuya değişir. Kısa süreli sorunlarda 6–12 seans yeterli olabilirken, daha kapsamlı çalışmalar daha uzun sürebilir. Psikologunuz size öneride bulunacaktır.' },
  { q: 'Psikolog ile psikiyatrist arasındaki fark nedir?', a: 'Psikologlar psikolojik yöntemlerle (konuşma, test, terapi) çalışır; ilaç yazamazlar. Psikiyatristler ise tıp doktorudur ve gerektiğinde ilaç tedavisi uygularlar. İkisi birbirini tamamlayıcı uzmanlıklardır.' },
  { q: 'Çocuğum için danışmanlık almalı mıyım?', a: 'Çocuğunuzda davranış değişikliği, okul başarısında düşüş, uyku sorunları, aşırı kaygı veya sosyal geri çekilme gözlemliyorsanız bir uzmanla görüşmeniz faydalı olabilir. Erken destek büyük fark yaratır.' },
  { q: 'Seans ücretleri ve ödeme seçenekleri nelerdir?', a: 'Ücretler uzman ve seans türüne göre değişmektedir. Ayrıntılı bilgi için bizimle iletişime geçebilirsiniz. Kredi kartı ve havale/EFT ile ödeme kabul edilmektedir.' },
]

const FAQ_RIGHT = [
  { q: 'Randevu nasıl alınır?', a: 'Web sitemizden online randevu formumuzu doldurabilir, telefon veya e-posta yoluyla bize ulaşabilirsiniz. Ekibimiz size en uygun uzmanı ve saati belirlemede yardımcı olacaktır.' },
  { q: 'Seans iptali veya erteleme yapabilir miyim?', a: 'Evet, ancak iptal veya erteleme talebinizi en az 24 saat öncesinden iletmeniz gerekir. Geç bildirilen iptallerde seans ücreti tahsil edilebilir.' },
  { q: 'Aile danışmanlığı nasıl işler?', a: 'Aile danışmanlığında tüm aile bireyleri ya da belirli aile üyeleri seanslara katılır. Uzmanımız, aile içi iletişimi güçlendirmeyi ve çatışmaları çözümlemeyi hedefler.' },
  { q: 'Çift terapisi ne zaman gereklidir?', a: 'İletişim sorunları, tekrarlayan tartışmalar, güven krizleri veya hayat değişimlerine uyum sağlamakta güçlük çekiyorsanız çift terapisi faydalı olabilir. Kriz öncesinde önleyici olarak da tercih edilebilir.' },
  { q: 'Oyun danışmanlığı nedir?', a: "Oyun, çocukların kendilerini en doğal şekilde ifade ettiği dildir. Oyun danışmanlığında çocuk oyun aracılığıyla duygularını keşfeder; uzman da bu süreçte rehberlik eder." },
  { q: 'Ergen danışmanlığı nasıl ilerler?', a: 'Ergenlerle yürütülen seanslar gizlilik esasına dayanır. Ebeveyn katılımı gerektiğinde uzmanın yönlendirmesiyle planlanır. Amaç, ergenin güvenli bir ortamda kendini ifade edebilmesidir.' },
  { q: 'Psikolojik test nedir, ne işe yarar?', a: 'Psikolojik testler; zeka, dikkat, kişilik, gelişim ve duygusal durum gibi alanları bilimsel yöntemlerle ölçer. Sonuçlar, doğru destek planının oluşturulmasına zemin hazırlar.' },
  { q: 'Kurumsal danışmanlık kapsamı nedir?', a: 'Kurumsal danışmanlık; çalışan refahı, tükenmişlik önleme, ekip içi iletişim ve kriz yönetimi gibi konuları kapsar. Şirketinizin ihtiyaçlarına özel programlar oluşturulabilir.' },
  { q: 'Sınav kaygısı için destek alabilir miyim?', a: 'Evet. Sınav kaygısı, odaklanma güçlüğü ve performans baskısı gibi sorunlar için özel koçluk ve danışmanlık programları sunuyoruz. Hem öğrencilere hem de ailelere destek verilmektedir.' },
  { q: 'Dikkat ve odaklanma sorunları için ne yapılır?', a: 'Dikkat güçlüğü yaşayan bireylere önce kapsamlı bir değerlendirme yapılır. Ardından kişiye özel dikkat geliştirme programları, bilişsel egzersizler ve gerektiğinde aile psikoeğitimi uygulanır.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="sss-item">
      <summary className="sss-item__summary">
        <span>{q}</span>
      </summary>
      <div className="sss-item__body"><p>{a}</p></div>
    </details>
  )
}

export function SssPage() {
  useMeta('Sıkça Sorulan Sorular', 'Psikolojik danışmanlık hizmetlerimiz hakkında merak ettikleriniz.')

  return (
    <main id="contenu-principal" className="wrapper sss-page">
      <section className="hero">
        <img src="/assets/cta-bg.png" alt="" width={1920} height={631} loading="lazy" className="hero-image" />
        <div className="hero-ctr container">
          <nav aria-label="Sayfa konumu" className="hero-breadcrumbs breadcrumbs">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item"><Link to="/" className="breadcrumbs-link">Ana Sayfa</Link></li>
              <li aria-current="page" className="breadcrumbs-item"><BreadcrumbArrow />SSS</li>
            </ul>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">Sıkça Sorulan Sorular</h1>
            <div className="hero-wysiwyg cms">
              <p>Psikolojik danışmanlık hizmetlerimiz hakkında merak ettikleriniz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sss-section">
        <div className="container container--fluid sss-container">
          <div className="sss-header">
            <span className="sss-eyebrow">Yardım Merkezi</span>
            <h2 className="sss-title">Aklınızdaki soruların yanıtları</h2>
            <p className="sss-desc">Burada yanıtını bulamadığınız sorular için bize doğrudan ulaşabilirsiniz.</p>
          </div>

          <div className="sss-grid">
            {[...FAQ_LEFT, ...FAQ_RIGHT].map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>

          <div className="sss-cta">
            <p className="sss-cta__text">Sorunuzu burada bulamadınız mı?</p>
            <div className="sss-cta__actions">
              <Link to="/iletisim/" className="button button--outline-burgundy">Bize Yazın</Link>
              <Link to="/randevu/" className="button button--purple">
                Randevu Al
                <svg aria-hidden="true" className="button-icon icon" width="8" height="12" viewBox="0 0 8 12" fill="none">
                  <path d="M1.35059 0.701547L6.6491 6.00007L1.35059 11.2986" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
