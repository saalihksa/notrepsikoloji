#!/usr/bin/env python3
"""Notre Psikoloji sitesi — nompsikoloji.com referanslı içerik ve sayfa üretimi."""

from __future__ import annotations

import json
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data"
PAGES = DATA / "pages"

SITE = {
    "name": "Notre Psikoloji",
    "tagline": "Psikolojik Danışmanlık Merkezi",
    "phone": "+90 552 154 2552",
    "email": "info@notrepsikoloji.com",
    "hours": "Pazartesi – Cumartesi 10:00 – 22:00 · Pazar kapalı",
    "address": "Üsküdar, İstanbul",
    "instagram": "https://www.instagram.com/notrepsikoloji/",
    "linkedin": "https://www.linkedin.com/company/notrepsikoloji/",
}

SERVICES = [
    {
        "slug": "bireysel-danismanlik",
        "title": "Bireysel Danışmanlık",
        "short": "Depresyon, kaygı, travma ve kişisel gelişim için bire bir destek.",
        "intro": "Bireysel danışmanlık; duygusal zorlukları anlamak, yeni bakış açıları kazanmak ve yaşamda olumlu değişiklikler yapmak için tasarlanmış profesyonel bir süreçtir.",
        "body": "Güvenli ve destekleyici bir ortamda, uzman psikologlarımız eşliğinde kişisel gelişim yolculuğunuzda size rehberlik ediyoruz. Tanı almadan da danışmanlık hizmeti alabilirsiniz.",
        "points": ["Bilişsel Davranışçı Danışmanlık (BDT)", "Psikodinamik yaklaşım", "Kaygı ve depresyon desteği"],
    },
    {
        "slug": "cift-danismanligi",
        "title": "Çift Danışmanlığı",
        "short": "İletişim, güven ve bağ sorunlarında çiftlere özel destek.",
        "intro": "İlişkinizde yaşadığınız iletişim sorunları, güven problemleri veya yaşam geçişlerinde çift danışmanlığı etkili bir destek sunar.",
        "body": "Ortak hedefler belirleyerek, ilişkinizde sağlıklı iletişim becerileri geliştirmenize yardımcı oluyoruz.",
        "points": ["İletişim becerileri", "Çatışma çözümü", "Bağlanma odaklı çalışma"],
    },
    {
        "slug": "ergen-danismanligi",
        "title": "Ergen Danışmanlığı",
        "short": "12–18 yaş arası ergenler ve aileleri için destek.",
        "intro": "Ergenlik dönemindeki duygusal dalgalanmalar, okul uyumu, akran ilişkileri ve kimlik gelişimi için uzman desteği sunuyoruz.",
        "body": "Gizlilik ilkesine bağlı kalarak ergenin kendini ifade etmesini destekler, gerektiğinde aileyle iş birliği kurarız.",
        "points": ["Okul ve sınav kaygısı", "Davranış sorunları", "Aile iletişimi"],
    },
    {
        "slug": "oyun-danismanligi",
        "title": "Oyun Danışmanlığı",
        "short": "2–12 yaş çocuklar için oyun temelli terapi.",
        "intro": "Oyun danışmanlığı, çocukların duygularını ve deneyimlerini oyun yoluyla ifade etmelerine olanak tanır.",
        "body": "Gelişimsel ihtiyaçlara uygun, güvenli bir ortamda çocuğunuzun duygusal dünyasını anlamanıza yardımcı oluyoruz.",
        "points": ["Duygusal düzenleme", "Travma sonrası destek", "Aile rehberliği"],
    },
    {
        "slug": "online-danismanlik",
        "title": "Online Danışmanlık",
        "short": "Güvenli görüntülü görüşme ile uzaktan destek.",
        "intro": "Lokasyon engeli olan danışanlar için online danışmanlık, yüz yüze seanslar kadar etkili bir alternatif sunabilir.",
        "body": "Gizlilik ve etik kurallara uygun, güvenli platformlar üzerinden danışmanlık hizmeti veriyoruz.",
        "points": ["Esnek randevu", "Gizlilik odaklı süreç", "Türkiye geneli erişim"],
    },
    {
        "slug": "anaokulu-danismanligi",
        "title": "Anaokulu Danışmanlığı",
        "short": "Okul öncesi kurumlar ve eğitimciler için rehberlik.",
        "intro": "Anaokulu danışmanlığı; çocukların duygusal gelişimi, uyum süreçleri ve sınıf içi davranışlar konusunda kurumlara destek sağlar.",
        "body": "Eğitimciler ve ailelerle birlikte çalışarak okul ortamında sağlıklı gelişimi destekliyoruz.",
        "points": ["Uyum süreçleri", "Davranış planları", "Eğitici seminerler"],
    },
    {
        "slug": "psikolojik-testler",
        "title": "Psikolojik Testler ve Değerlendirme",
        "short": "WISC-IV ve diğer standart testlerle kapsamlı değerlendirme.",
        "intro": "Psikolojik testler; bilişsel, duygusal ve davranışsal alanlarda objektif bir değerlendirme sunar.",
        "body": "Test sonuçlarını anlaşılır bir raporla paylaşır, sonraki adımlar için yönlendirme yaparız.",
        "points": ["Zeka testleri", "Dikkat değerlendirmesi", "Gelişim taraması"],
    },
    {
        "slug": "dikkat-gelistirme",
        "title": "Dikkat Geliştirme Programı",
        "short": "Çocuklarda odaklanma ve dikkat becerilerini güçlendirme.",
        "intro": "Dikkat geliştirme programı; ödevde odaklanamama, dikkat dağınıklığı ve akademik performans sorunlarında yapılandırılmış destek sunar.",
        "body": "Bireyselleştirilmiş egzersizler ve aile katılımı ile sürdürülebilir gelişim hedefliyoruz.",
        "points": ["Bireysel program", "Aile koçluğu", "İlerleme takibi"],
    },
    {
        "slug": "egitim-danismanligi",
        "title": "Eğitim Danışmanlığı",
        "short": "Okul seçimi, öğrenme stratejileri ve akademik planlama.",
        "intro": "Eğitim danışmanlığı; öğrencinin güçlü yönlerini keşfetmesine ve akademik hedeflerine ulaşmasına yardımcı olur.",
        "body": "Öğrenme stillerine uygun stratejiler geliştirir, aile ve okul iş birliğini destekleriz.",
        "points": ["Akademik planlama", "Öğrenme stratejileri", "Motivasyon desteği"],
    },
    {
        "slug": "sinav-koclugu",
        "title": "Sınav Koçluğu",
        "short": "Sınav kaygısı yönetimi ve performans artırma.",
        "intro": "Sınav koçluğu; kaygı yönetimi, zaman planlaması ve etkili çalışma teknikleri üzerine odaklanır.",
        "body": "Hem duygusal hem bilişsel becerileri güçlendirerek sınav sürecinde denge kurmanıza yardımcı oluyoruz.",
        "points": ["Kaygı yönetimi", "Çalışma planı", "Performans takibi"],
    },
    {
        "slug": "aile-danismanligi",
        "title": "Aile Danışmanlığı",
        "short": "Aile içi iletişim ve rol dengelerinde destek.",
        "intro": "Aile danışmanlığı; aile üyeleri arasındaki iletişimi güçlendirmek ve ortak çözümler üretmek için yapılandırılmış bir süreçtir.",
        "body": "Her aile üyesinin sesinin duyulduğu güvenli bir ortamda çalışıyoruz.",
        "points": ["Aile dinamikleri", "Ebeveyn rehberliği", "Kriz yönetimi"],
    },
    {
        "slug": "cinsel-danismanlik",
        "title": "Cinsel Danışmanlık",
        "short": "Cinsellik, ilişki ve beden algısı konularında gizli destek.",
        "intro": "Cinsel danışmanlık; bireysel veya çift olarak cinsellikle ilgili sorunlarda profesyonel, yargısız bir destek sunar.",
        "body": "Etik ilkelere bağlı, tamamen gizli bir ortamda danışmanlık hizmeti veriyoruz.",
        "points": ["Çift cinsel terapi", "Performans kaygısı", "İletişim becerileri"],
    },
    {
        "slug": "kurumsal-danismanlik",
        "title": "Kurumsal Danışmanlık",
        "short": "İş yerinde ruh sağlığı, stres yönetimi ve ekip desteği.",
        "intro": "Kurumsal danışmanlık; çalışan refahı, tükenmişlik önleme ve kurumsal psikolojik destek programları sunar.",
        "body": "Kurumunuzun ihtiyaçlarına özel atölye, seminer ve bireysel destek paketleri hazırlıyoruz.",
        "points": ["Stres yönetimi", "Ekip atölyeleri", "Kriz müdahalesi"],
    },
]

SERVICE_GROUPS = [
    {
        "title": "Bireysel & İlişki",
        "slugs": [
            "bireysel-danismanlik",
            "cift-danismanligi",
            "online-danismanlik",
            "cinsel-danismanlik",
            "aile-danismanligi",
        ],
    },
    {
        "title": "Çocuk & Ergen",
        "slugs": [
            "ergen-danismanligi",
            "oyun-danismanligi",
            "anaokulu-danismanligi",
            "dikkat-gelistirme",
        ],
    },
    {
        "title": "Eğitim & Kurumsal",
        "slugs": [
            "psikolojik-testler",
            "egitim-danismanligi",
            "sinav-koclugu",
            "kurumsal-danismanlik",
        ],
    },
]

ABOUT_LINKS = [
    {"href": "/hakkimizda/", "title": "Hakkımızda"},
    {"href": "/ekibimiz/", "title": "Ekibimiz"},
    {"href": "/kvkk/", "title": "KVKK ve Gizlilik"},
]

SERVICE_BY_SLUG = {s["slug"]: s for s in SERVICES}

TEAM = [
    {"name": "Dr. Ayşe Yılmaz", "role": "Klinik Psikolog", "slug": "ayse-yilmaz", "bio": "Bireysel ve çift danışmanlığı alanında 10 yılı aşkın deneyim."},
    {"name": "Uzm. Psk. Mehmet Kaya", "role": "Psikolog", "slug": "mehmet-kaya", "bio": "Ergen danışmanlığı ve sınav koçluğu uzmanı."},
    {"name": "Uzm. Psk. Zeynep Demir", "role": "Klinik Psikolog", "slug": "zeynep-demir", "bio": "Oyun danışmanlığı ve çocuk psikolojisi alanında çalışıyor."},
    {"name": "Uzm. Psk. Can Arslan", "role": "Psikolog", "slug": "can-arslan", "bio": "Online danışmanlık ve bireysel terapi alanında uzman."},
    {"name": "Uzm. Psk. Elif Öztürk", "role": "Klinik Psikolog", "slug": "elif-ozturk", "bio": "Aile danışmanlığı ve psikolojik değerlendirme uzmanı."},
    {"name": "Uzm. Psk. Burak Şahin", "role": "Psikolog", "slug": "burak-sahin", "bio": "Kurumsal danışmanlık ve stres yönetimi programları."},
]

BLOG = [
    {
        "slug": "cocuk-odevde-odaklanamiyorsa-dikkat-programi",
        "title": "Çocuk ödevde odaklanamıyorsa dikkat geliştirme programı ne zaman gerekir?",
        "date": "12/03/2026",
        "excerpt": "Ev ödevlerinde sık sık dikkatinin dağılması, sürekli mola istemesi veya bitirememesi birçok ebeveynin tanıdık bir kaygısıdır.",
        "body": "Dikkat geliştirme programı; çocuğun yaşına, gelişim düzeyine ve günlük yaşam etkisine göre planlanır.",
        "sections": [
            {
                "title": "Ödevde odaklanma sorunu ne zaman kaygı verici?",
                "paragraphs": [
                    "Ev ödevlerinde sık sık dikkatinin dağılması, sürekli mola istemesi veya bitirememesi birçok ebeveynin tanıdık bir kaygısıdır. Bu durum her zaman dikkat eksikliği anlamına gelmez; bazen yorgunluk, kaygı veya öğrenme stiline uygun olmayan çalışma düzeni de etkili olabilir.",
                    "Ancak ödev süresinin yaşına göre belirgin şekilde uzaması, sık unutkanlık, talimatları takip etmekte zorlanma ve okulda da benzer şikâyetler varsa profesyonel değerlendirme faydalı olur.",
                ],
            },
            {
                "title": "Dikkat geliştirme programı nasıl işler?",
                "paragraphs": [
                    "Program; çocuğun yaşına, gelişim düzeyine ve günlük yaşam etkisine göre planlanır. Önce kapsamlı bir değerlendirme yapılır, ardından bireyselleştirilmiş egzersizler ve aile rehberliği ile süreç ilerletilir.",
                    "Amaç yalnızca ödev süresini kısaltmak değil; çocuğun dikkatini sürdürme, planlama ve öz düzenleme becerilerini güçlendirmektir.",
                ],
            },
            {
                "title": "Ebeveynler ne yapabilir?",
                "paragraphs": [
                    "Kısa ve net talimatlar, düzenli çalışma rutini ve övgüyle pekiştirme evde destekleyici olabilir. Sorun uzun süredir devam ediyorsa ve çocuğun özgüvenini etkiliyorsa uzman desteği almak en doğru adımdır.",
                ],
            },
        ],
    },
    {
        "slug": "online-terapi-guvenli-mi",
        "title": "Online terapi güvenli mi, güvenilir psikolog nasıl seçilir?",
        "date": "28/02/2026",
        "excerpt": "Online danışmanlık pandemi sonrası yaygınlaştı; bilimsel çalışmalar birçok alanda yüz yüze kadar etkili olduğunu gösteriyor.",
        "body": "Güvenilir bir psikolog seçerken diploma, uzmanlık alanı, etik ilkeler ve gizlilik taahhüdüne dikkat edin.",
        "sections": [
            {
                "title": "Online terapi gerçekten işe yarar mı?",
                "paragraphs": [
                    "Online danışmanlık pandemi sonrası yaygınlaştı; bilimsel çalışmalar birçok alanda yüz yüze kadar etkili olduğunu gösteriyor. Kaygı, depresyon ve ilişki sorunları gibi konularda online seanslar güvenli ve erişilebilir bir alternatif sunabilir.",
                    "Önemli olan, seansların gizlilik ilkelerine uygun bir platformda ve lisanslı bir uzmanla yürütülmesidir.",
                ],
            },
            {
                "title": "Güvenilir psikolog nasıl seçilir?",
                "paragraphs": [
                    "Diploma ve uzmanlık alanını doğrulayın, etik ilkeler ve gizlilik taahhüdünü sorun. İlk görüşmede kendinizi rahat hissedip hissetmediğinize dikkat edin; terapötik ilişki sürecin başarısında belirleyicidir.",
                    "Notre Psikoloji'de tüm online seanslar güvenli platformlar üzerinden yürütülür; kişisel verileriniz KVKK kapsamında korunur.",
                ],
            },
        ],
    },
    {
        "slug": "wisc-iv-zeka-testi",
        "title": "WISC-IV zeka testi nedir, çocuğa ne zaman yaptırılır?",
        "date": "15/01/2026",
        "excerpt": "WISC-IV, 6–16 yaş arası çocukların bilişsel yeteneklerini değerlendiren standart bir testtir.",
        "body": "Okul uyumu, öğrenme güçlüğü şüphesi veya dikkat sorunlarında uzman değerlendirmesi sonrası uygulanabilir.",
        "sections": [
            {
                "title": "WISC-IV nedir?",
                "paragraphs": [
                    "WISC-IV, 6–16 yaş arası çocukların bilişsel yeteneklerini değerlendiren standart bir testtir. Sözel ve performans alt testlerinden oluşur; genel bilişsel kapasite ve alt beceri alanları hakkında bilgi verir.",
                ],
            },
            {
                "title": "Ne zaman uygulanır?",
                "paragraphs": [
                    "Okul uyumu, öğrenme güçlüğü şüphesi veya dikkat sorunlarında uzman değerlendirmesi sonrası uygulanabilir. Test tek başına tanı koydurmaz; öğrenme profilini anlamak ve destek planı oluşturmak için kullanılır.",
                ],
            },
            {
                "title": "Sonuçlar nasıl yorumlanmalı?",
                "paragraphs": [
                    "Sonuçlar tek başına bir etiket değildir; çocuğun güçlü yönlerini ve desteklenmesi gereken alanları gösteren bir rehber niteliğindedir. Detaylı geri bildirim ve öneriler için testi uygulayan uzmanla birlikte değerlendirme yapılmalıdır.",
                ],
            },
        ],
    },
]

FAQ = [
    ("Psikolojik danışmanlık nedir?", "Bireylerin ruhsal zorluklarını anlamak, duygusal denge kurmak ve yaşam kalitesini artırmak için yürütülen profesyonel bir süreçtir."),
    ("Tanı almadan danışmanlık alabilir miyim?", "Evet. Günlük stres, ilişki sorunları, kaygı ve kişisel gelişim gibi birçok konuda tanı olmadan destek alabilirsiniz."),
    ("Hangi yaş gruplarıyla çalışıyorsunuz?", "2–12 yaş oyun danışmanlığı, 12–18 yaş ergen danışmanlığı ve 18 yaş üstü yetişkin danışmanlığı sunuyoruz."),
    ("Online ve yüz yüze arasında fark var mı?", "Bilimsel çalışmalar birçok konuda online danışmanlığın yüz yüze kadar etkili olduğunu göstermektedir."),
    ("Paylaştığım bilgiler gizli kalır mı?", "Evet. Gizlilik, psikolojik danışmanlığın temel etik ilkesidir; yasal istisnalar dışında bilgiler paylaşılmaz."),
]

BUTTON_ICON = """<svg aria-hidden="true" class="button-icon icon" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.35059 0.701547L6.6491 6.00007L1.35059 11.2986" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""

MENU_ARROW = """<svg aria-hidden="true" class="menu-arrow icon" width="9" height="6" viewBox="0 0 9 6"><path d="M1.44 0.972656L4.5 4.03266L7.56 0.972656L8.5 1.91932L4.5 5.91932L0.5 1.91932L1.44 0.972656Z" fill="currentColor"/></svg>"""

SUBMENU_CLOSE = """<svg aria-hidden="true" class="icon" viewBox="0 0 16 16"><path d="M12.8 3.2L8 8L12.8 12.8M8 8L3.2 12.8M8 8L3.2 3.2" stroke="currentColor" stroke-width="0.8"/></svg>"""

INSTAGRAM_ICON = """<svg aria-hidden="true" class="socials-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>"""

LINKEDIN_ICON = """<svg aria-hidden="true" class="socials-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>"""


def button(text: str, href: str, style: str = "purple") -> str:
    return f'<a href="{href}" class="button button--{style}">{text}{BUTTON_ICON}</a>'


def breadcrumbs(items: list[tuple[str, str | None]]) -> str:
    parts = ['<nav aria-label="Sayfa konumu" class="hero-breadcrumbs breadcrumbs"><ul class="breadcrumbs-list">']
    for label, href in items:
        if href:
            parts.append(f'<li class="breadcrumbs-item"><a href="{href}" class="breadcrumbs-link">{label}</a></li>')
        else:
            parts.append(
                f'<li aria-current="page" class="breadcrumbs-item">'
                f'<svg aria-hidden="true" class="breadcrumbs-arrow icon" viewBox="0 0 17 16">'
                f'<path d="M6.43085 12.8L11.2308 7.99997L6.43085 3.19997" stroke="currentColor" stroke-width="0.8"/></svg>'
                f"{label}</li>"
            )
    parts.append("</ul></nav>")
    return "\n".join(parts)


def hero_block(title: str, intro: str, crumbs: list[tuple[str, str | None]]) -> str:
    return f"""
<section class="hero">
  <img src="/assets/cta-bg.png" alt="" width="1920" height="631" loading="lazy" class="hero-image">
  <div class="hero-ctr container">
    {breadcrumbs(crumbs)}
    <div class="hero-content">
      <h1 class="hero-title">{title}</h1>
      <div class="hero-wysiwyg cms"><p>{intro}</p></div>
    </div>
  </div>
</section>"""


def faq_section() -> str:
    items = []
    for i, (q, a) in enumerate(FAQ, 1):
        items.append(f"""
        <details class="faq-item">
          <summary class="faq-item-title title-sm">{i}. {q}</summary>
          <div class="faq-item-text cms"><p>{a}</p></div>
        </details>""")
    return f"""
<section class="faq" style="--section-bg: var(--c-white--light);">
  <div class="faq-inner container">
    <h2 class="faq-title title-xl">Sıkça Sorulan Sorular</h2>
    <div class="faq-list">{''.join(items)}</div>
    <div class="faq-push">
      <p class="faq-push-text">Sorunuz mu var? Ekibimiz size yardımcı olmaktan memnuniyet duyar.</p>
      {button('Randevu Al', '/randevu/', 'white')}
    </div>
  </div>
</section>"""


def cta_push(title: str, text: str) -> str:
    return f"""
<section class="push" data-animate-container>
  <div class="push-ctr container container--fluid">
    <h2 class="push-text title-xl">{title}</h2>
    <div class="push-question">
      <div class="push-question-content">
        <p class="push-question-text">{text}</p>
        {button('Randevu Al', '/randevu/', 'purple')}
      </div>
    </div>
  </div>
</section>"""


ARROW_ICON = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>'

SVC_ICONS = {
    "bireysel-danismanlik": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    "cift-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="8" r="3.5"/><circle cx="15" cy="8" r="3.5"/><path d="M2 20c0-3.3 3.1-6 7-6"/><path d="M22 20c0-3.3-3.1-6-7-6"/><path d="M9 20c0-3.3 1.3-6 3-6s3 2.7 3 6"/></svg>',
    "ergen-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0114 0v2"/><path d="M12 15v6"/></svg>',
    "oyun-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="10" width="18" height="10" rx="2"/><circle cx="9" cy="15" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="1.5" fill="currentColor"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>',
    "online-danismanlik": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/><path d="M9.5 10.5L11 12l3.5-3.5"/></svg>',
    "anaokulu-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z"/><path d="M9 21v-8h6v8"/></svg>',
    "psikolojik-testler": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>',
    "dikkat-gelistirme": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    "egitim-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19V8l8-5 8 5v11"/><path d="M9 19v-5h6v5"/><path d="M4 8l8 5 8-5"/></svg>',
    "sinav-koclugu": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    "aile-danismanligi": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="6" r="3"/><circle cx="18" cy="8" r="2.5"/><path d="M2 21v-2a7 7 0 0114 0v2"/><path d="M14 17.5a5 5 0 018 4v-1"/></svg>',
    "cinsel-danismanlik": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    "kurumsal-danismanlik": '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v5M9.5 14.5h5"/></svg>',
}

SVC_STEPS = {
    "default": [
        ("İlk görüşme", "İhtiyaçlarınızı dinler, süreci ve hedefleri birlikte belirleriz."),
        ("Değerlendirme", "Güçlü yönlerinizi ve odak alanlarınızı birlikte keşfederiz."),
        ("Kişisel plan", "Size özel danışmanlık planı oluşturulur."),
        ("Düzenli seans", "Haftalık seanslarla ilerlemenizi destekleriz."),
    ],
    "psikolojik-testler": [
        ("Ön görüşme", "Test ihtiyacını ve amacını belirleriz."),
        ("Test uygulaması", "Standart koşullarda test gerçekleştirilir."),
        ("Puanlama ve analiz", "Sonuçlar uzman psikolog tarafından yorumlanır."),
        ("Rapor ve yönlendirme", "Ailelere kapsamlı rapor ve sonraki adımlar sunulur."),
    ],
    "anaokulu-danismanligi": [
        ("Kurum ziyareti", "Mevcut ortam ve ihtiyaçlar yerinde değerlendirilir."),
        ("Eğitimci görüşmesi", "Öğretmen ve personelle odak alanları belirlenir."),
        ("Program tasarımı", "Kuruma özel destek ve eğitim programı hazırlanır."),
        ("Süreç takibi", "Düzenli değerlendirmelerle ilerleme izlenir."),
    ],
    "kurumsal-danismanlik": [
        ("İhtiyaç analizi", "Kurumun ruh sağlığı dinamikleri ve beklentileri değerlendirilir."),
        ("Program önerisi", "Uygun atölye, seminer veya bireysel destek paketi önerilir."),
        ("Uygulama", "Planlanan program ekiple birlikte hayata geçirilir."),
        ("Değerlendirme", "Etkinlik ölçülür, gerekirse program güncellenir."),
    ],
}


def _step_list(slug: str) -> str:
    steps = SVC_STEPS.get(slug, SVC_STEPS["default"])
    items = ""
    for i, (title, text) in enumerate(steps, 1):
        items += f"""<li class="svc-steps__item">
      <span class="svc-steps__num">{i}</span>
      <div>
        <p class="svc-steps__title">{title}</p>
        <p class="svc-steps__text">{text}</p>
      </div>
    </li>"""
    return f'<ol class="svc-steps">{items}</ol>'


def service_page(service: dict) -> str:
    slug = service["slug"]
    tags = "".join(f'<li class="svc-tags__item">{p}</li>' for p in service["points"])
    icon = SVC_ICONS.get(slug, SVC_ICONS["bireysel-danismanlik"])

    others_html = ""
    for s in SERVICES:
        if s["slug"] == slug:
            continue
        others_html += (
            f'<a href="/hizmetler/{s["slug"]}/" class="svc-others__link">'
            f'{s["title"]}'
            f'<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">'
            f'<path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>'
            f'</svg></a>'
        )

    why_cards = [
        ("Kanıta dayalı", "Güncel psikoloji araştırmalarına dayanan teknikler kullanıyoruz.", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>'),
        ("Kişisel plan", "Her danışan için özel ihtiyaçlara göre danışmanlık planı oluşturuyoruz.", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>'),
        ("Güvenli ortam", "Gizlilik ve etik ilkelere bağlı, yargısız bir danışmanlık süreci sunuyoruz.", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l8 4v5c0 4.4-3.4 8.5-8 9.5C7.4 20.5 4 16.4 4 12V7l8-4z"/></svg>'),
        ("Deneyimli ekip", "Alanında uzman ve süpervizyon altında çalışan psikologlarla hizmet sunuyoruz.", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="7" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2 19v-1a7 7 0 0114 0v1"/><path d="M16 14a5 5 0 018 4.5v.5"/></svg>'),
    ]
    why_html = ""
    for title, text, ic in why_cards:
        why_html += f"""<div class="svc-why__card">
      <div class="svc-why__card-icon">{ic}</div>
      <p class="svc-why__card-title">{title}</p>
      <p class="svc-why__card-text">{text}</p>
    </div>"""

    return textwrap.dedent(
        f"""
        <main id="contenu-principal" class="wrapper svc-detail">
        {hero_block(service["title"], service["intro"], [("Ana Sayfa", "/"), ("Hizmetler", "/hizmetler/"), (service["title"], None)])}

        <section class="svc-detail__top">
          <div class="container svc-detail__top-inner">
            <div class="svc-detail__body">
              <p class="svc-detail__intro">{service["body"]}</p>

              <h2 style="margin:0 0 1.25rem;font-size:clamp(1.125rem,1.25vw+0.75rem,1.375rem);font-weight:600;color:var(--color-black)">Süreç nasıl işler?</h2>
              {_step_list(slug)}

              <h3 style="margin:2rem 0 0.75rem;font-size:0.9375rem;font-weight:600;color:var(--color-black)">Odak alanları</h3>
              <ul class="svc-tags">{tags}</ul>
            </div>

            <aside class="svc-sidebar">
              <div class="svc-sidebar__header">
                <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.875rem">
                  <span style="width:2.25rem;height:2.25rem;border-radius:0.5rem;background:rgba(255,248,235,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">{icon}</span>
                  <p class="svc-sidebar__heading">{service["title"]}</p>
                </div>
                <p class="svc-sidebar__sub">Notre Psikoloji · Üsküdar, İstanbul</p>
              </div>
              <div class="svc-sidebar__body">
                <div class="svc-info-row">
                  <span class="svc-info-row__icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></span>
                  <div>
                    <span class="svc-info-row__label">Seans süresi</span>
                    <span class="svc-info-row__value">50 dakika</span>
                  </div>
                </div>
                <div class="svc-info-row">
                  <span class="svc-info-row__icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg></span>
                  <div>
                    <span class="svc-info-row__label">Çalışma saatleri</span>
                    <span class="svc-info-row__value">Pzt – Cmt · 10:00 – 22:00</span>
                  </div>
                </div>
                <div class="svc-info-row">
                  <span class="svc-info-row__icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></span>
                  <div>
                    <span class="svc-info-row__label">Seans tipi</span>
                    <span class="svc-info-row__value">Yüz yüze veya online</span>
                  </div>
                </div>
                <div class="svc-info-row">
                  <span class="svc-info-row__icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></span>
                  <div>
                    <span class="svc-info-row__label">Telefon</span>
                    <span class="svc-info-row__value"><a href="tel:{SITE["phone"].replace(" ", "")}" style="color:inherit">{SITE["phone"]}</a></span>
                  </div>
                </div>
                <hr class="svc-sidebar__divider">
                <a href="/randevu/" class="svc-sidebar__btn">Randevu Al <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                <a href="/iletisim/" class="svc-sidebar__link">Soru sormak ister misiniz? →</a>
              </div>
            </aside>
          </div>
        </section>

        <section class="svc-why">
          <div class="container">
            <h2 class="svc-why__title">Neden Notre Psikoloji?</h2>
            <div class="svc-why__grid">{why_html}</div>
          </div>
        </section>

        {faq_section()}

        <section class="svc-others">
          <div class="container">
            <h2 class="svc-others__title">Diğer hizmetlerimiz</h2>
            <div class="svc-others__grid">{others_html}</div>
          </div>
        </section>

        {cta_push("Daha sağlıklı bir ruh hali için randevunuzu planlayın", service["short"])}
        </main>
        """
    )


def submenu_close(submenu_id: str) -> str:
    return f'<button type="button" data-close="{submenu_id}" aria-label="Kapat" class="submenu-close">{SUBMENU_CLOSE}</button>'


def submenu_block(submenu_id: str, title: str, content: str, variant: str = "grouped") -> str:
    return f"""<div id="{submenu_id}" inert class="submenu submenu--{variant}" role="modal" aria-modal="true" tabindex="-1">
                <div class="container"><div class="submenu-wrapper">
                  <div class="submenu-header"><p class="submenu-title title-lg">{title}</p></div>
                  <div class="submenu-content">{content}</div>
                  {submenu_close(submenu_id)}
                </div></div>
              </div>"""


def services_submenu_html() -> str:
    groups = []
    for group in SERVICE_GROUPS:
        links = "\n".join(
            f'<li class="submenu-item submenu-item--level-2"><a href="/hizmetler/{SERVICE_BY_SLUG[slug]["slug"]}/" class="submenu-link">{SERVICE_BY_SLUG[slug]["title"]}</a></li>'
            for slug in group["slugs"]
        )
        groups.append(
            f"""<li class="submenu-item submenu-item--level-1">
  <p class="submenu-list-title title-md">{group["title"]}</p>
  <ul class="submenu-list submenu-list--level-2">{links}</ul>
</li>"""
        )
    content = f'<ul class="submenu-list submenu-list--level-1">{"".join(groups)}</ul>'
    return submenu_block("submenu-1", "Hizmetlerimiz", content)


def about_submenu_html() -> str:
    links = "\n".join(
        f'<li class="submenu-item submenu-item--level-1"><a href="{item["href"]}" class="submenu-link">{item["title"]}</a></li>'
        for item in ABOUT_LINKS
    )
    content = f'<ul class="submenu-list submenu-list--level-1">{links}</ul>'
    return submenu_block("submenu-2", "Hakkımızda", content, variant="simple")


def write_header() -> None:
    html = f"""<div class="quick-access">
  <a href="#en-tete" class="quick-access-link">Menüye git</a>
  <a href="#contenu-principal" class="quick-access-link">İçeriğe git</a>
  <a href="#pied-de-page" class="quick-access-link">Alt bilgiye git</a>
</div>
<header id="en-tete" class="header">
  <div class="header-ctr container">
    <div class="header-wrapper">
      <a href="/" class="header-logo" aria-label="{SITE["name"]}">
        <span class="header-logo-inner">
          <img class="header-logo-img header-logo-img--light" src="/assets/logo-white.png" alt="" width="240" height="111" decoding="async">
          <img class="header-logo-img header-logo-img--dark" src="/assets/logo-color.png" alt="" width="240" height="111" decoding="async">
        </span>
      </a>
      <nav aria-label="Ana menü" class="menu">
        <button type="button" aria-label="Menüyü aç" aria-controls="menu" aria-expanded="false" class="menu-toggle">
          <i class="menu-toggle-icon"></i>
        </button>
        <div id="menu" inert class="menu-wrapper">
          <ul class="menu-list">
            <li class="menu-item">
              <button type="button" aria-controls="submenu-1" aria-expanded="false" class="menu-link">
                Hizmetler
                {MENU_ARROW}
              </button>
              {services_submenu_html()}
            </li>
            <li class="menu-item">
              <button type="button" aria-controls="submenu-2" aria-expanded="false" class="menu-link">
                Hakkımızda
                {MENU_ARROW}
              </button>
              {about_submenu_html()}
            </li>
            <li class="menu-item"><a href="/blog/" class="menu-link">Blog</a></li>
            <li class="menu-item"><a href="/sss/" class="menu-link">SSS</a></li>
            <li class="menu-item buttons"><ul><li>{button('Randevu Al', '/randevu/', 'purple')}</li></ul></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</header>"""
    (DATA / "site-header.html").write_text(html, encoding="utf-8")


def write_footer() -> None:
    html = f"""<footer id="pied-de-page" class="footer" data-animate-container>
  <div class="footer-ctr container container--fluid">
    <div class="footer-top">
      <a href="/" class="footer-logo">
        <img src="/assets/logo-white.png" alt="{SITE["name"]}" width="240" height="111" loading="lazy" decoding="async" class="footer-logo-inner">
        <p class="footer-tagline">{SITE["tagline"]}</p>
      </a>
      <div class="footer-text cms"><p>{SITE["address"]},<br>{SITE["hours"]}</p></div>
      <ul class="footer-menu footer-menu--main">
        <li class="footer-menu-item"><a href="/iletisim/" class="button button--white footer-menu-link">İletişim</a></li>
        <li class="footer-menu-item"><a href="/iletisim/" class="button button--white footer-menu-link">Bülten</a></li>
      </ul>
    </div>
    <div class="footer-bottom">
      <ul class="footer-socials socials socials--bg">
        <li class="socials-item"><a href="{SITE["instagram"]}" target="_blank" rel="noopener" class="socials-link" aria-label="Instagram">{INSTAGRAM_ICON}</a></li>
        <li class="socials-item"><a href="{SITE["linkedin"]}" target="_blank" rel="noopener" class="socials-link" aria-label="LinkedIn">{LINKEDIN_ICON}</a></li>
      </ul>
      <div class="footer-legals">
        <p>© 2026 {SITE["name"]}</p>
        <ul class="footer-menu footer-menu--legals">
          <li class="footer-menu-item"><a href="/kvkk/" class="footer-menu-link link">KVKK ve Gizlilik</a></li>
          <li class="footer-menu-item"><a href="/kvkk/#cerez" class="footer-menu-link link">Çerez ayarları</a></li>
        </ul>
        <a href="tel:{SITE["phone"].replace(" ", "")}" class="footer-menu-link link">{SITE["phone"]}</a>
      </div>
    </div>
  </div>
</footer>"""
    (DATA / "site-footer.html").write_text(html, encoding="utf-8")


def write_hero() -> None:
    html = f"""<section class="herohome herohome--video">
  <div class="herohome-video-wrapper">
    <video class="herohome-video" autoplay loop muted playsinline poster="/assets/hero-bg.png">
      <source src="/assets/hero-video.mp4" type="video/mp4">
    </video>
  </div>
  <div class="container">
    <div class="herohome-content">
      <div>
        <p class="herohome-tagline">Sizi dinlemeye hazırız</p>
        <h1 class="herohome-title">Ruh sağlığınız için güvenilir, kapsamlı ve etik psikolojik danışmanlık</h1>
      </div>
      <div class="herohome-text">
        <div class="cms"><p>Ruh sağlığınızı korumak ve yaşam kalitenizi artırmak için etik değerleri merkeze alan profesyonel psikolojik danışmanlık hizmetlerini deneyimleyin.</p>
        <p>{button('Randevu Al', '/randevu/', 'white')}</p></div>
      </div>
    </div>
  </div>
</section>"""
    (DATA / "site-hero.html").write_text(html, encoding="utf-8")


FEATURE_SERVICES = ["bireysel-danismanlik", "cift-danismanligi", "online-danismanlik", "ergen-danismanligi"]

VALUE_SLIDES = [
    {
        "title": "Uzmanlık",
        "text": "Farklı yaş grupları ve ihtiyaçlara yönelik psikolojik danışmanlık deneyimimizle, beklentilerinize uygun kaliteli destek sunuyoruz.",
        "image": "/assets/slide-kisiye-ozel.png",
        "width": 1920,
        "height": 1280,
    },
    {
        "title": "Esneklik",
        "text": "Danışmanlık sürecinizi gerçek zamanlı ihtiyaçlarınıza göre şekillendiriyor; yüz yüze ve online seçeneklerle esnek randevu imkânı sağlıyoruz.",
        "image": "/assets/slide-online.png",
        "width": 1920,
        "height": 1280,
    },
    {
        "title": "Şeffaflık",
        "text": "Şeffaflık yaklaşımımızın merkezinde açık iletişim, net süreçler ve her adımda güven ilişkisi yer alır.",
        "image": "/assets/slide-gizlilik.png",
        "width": 1920,
        "height": 1280,
    },
]

EXPERTISE_GROUPS = [
    {
        "title": "Çocuk ve Ergen",
        "text": "Oyun temelli terapi, dikkat geliştirme ve ergenlik dönemi zorluklarında çocuk ve gençlere özel destek.",
        "links": ["oyun-danismanligi", "ergen-danismanligi", "dikkat-gelistirme"],
    },
    {
        "title": "Yetişkin",
        "text": "Kaygı, depresyon, stres ve kişisel gelişim alanlarında bireysel danışmanlık ve psikolojik değerlendirme.",
        "links": ["bireysel-danismanlik", "online-danismanlik", "psikolojik-testler"],
    },
    {
        "title": "Çift, Aile ve Kurum",
        "text": "İlişki, aile içi iletişim ve iş yeri ruh sağlığı konularında çiftlere, ailelere ve kurumlara yönelik programlar.",
        "links": ["cift-danismanligi", "aile-danismanligi", "kurumsal-danismanlik"],
    },
]

CARD_LINK_ICON = """<svg aria-hidden="true" class="icon" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.35059 0.701547L6.6491 6.00007L1.35059 11.2986" stroke="currentColor" stroke-width="1.76617" stroke-linejoin="round" /></svg>"""

CARDS_FIRST_BIG_DECO = """<svg aria-hidden="true" class="cardsFirstBig-item-mouse icon" width="480" height="97" viewBox="0 0 480 97" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M478.554 85.7179C478.554 85.7179 461.72 66.4567 458.29 63.0884L458.227 63.023C453.685 58.5756 448.889 54.5533 443.775 50.9888C436.724 46.0509 430.055 41.3745 420.05 38.8892C419.129 38.6603 418.303 38.5295 417.414 38.366C417.191 30.9754 416.207 19.0393 406.011 11.6488C400.93 7.9862 393.879 7.9535 389.972 11.6488C386.701 14.69 386.415 19.4972 389.146 24.5005C392.799 31.1716 397.595 35.3902 402.01 38.0717C397.309 38.8565 393.243 40.3281 389.4 41.7343C383.112 44.0234 377.681 45.9855 370.28 45.0698C361.482 43.9907 357.195 39.6414 350.747 33.0683C345.348 27.5745 338.646 20.7725 327.117 14.1995C308.537 3.60418 285.605 -1.66078 267.216 0.464829C232.088 4.51983 199.66 38.9546 182.318 90.5905C178.666 90.4597 168.089 88.563 145.571 74.6975C102.979 48.4708 78.2688 60.1126 59.7204 74.9918C41.2672 89.7729 14.3656 86.4374 7.28283 84.0175C2.77276 82.4805 0.485964 80.7146 0.200115 82.0554C-0.371585 84.9004 0.104827 86.8298 3.97968 88.5303C9.98252 91.1464 43.8081 96.9019 65.6279 79.4065C85.0022 63.8733 105.139 57.987 140.394 79.7008C163.77 94.0896 176.379 97 182.731 97C188.734 97 189.591 94.155 189.591 94.155C205.694 44.7428 236.63 10.4388 268.391 6.77624C284.462 4.91225 305.583 9.85019 322.194 19.3337C332.77 25.3508 338.805 31.4987 344.141 36.9271C350.969 43.8599 356.877 49.877 368.946 51.3485C378.856 52.5912 386.288 49.877 392.862 47.4898C400.453 44.7428 407.028 42.3556 417.445 44.939C425.767 47.0319 431.516 51.0542 438.185 55.6979C448.317 62.7941 457.306 71.8525 465.024 82.7421C467.12 85.816 464.611 91.735 460.736 94.0242C456.321 96.6403 467.437 96.8692 474.457 94.3185C479.665 92.4218 481.635 89.9691 478.49 85.7179H478.554ZM394.99 21.0995C394.323 19.8896 393.402 17.7313 394.482 16.7175C395.117 16.1289 396.229 15.8019 397.531 15.8019C399.056 15.8019 400.771 16.2597 402.2 17.3062C408.139 21.5901 409.918 28.1304 410.522 34.6707C406.107 33.0356 399.5 29.3404 394.99 21.0995Z" fill="currentColor"/>
</svg>"""

READ_MORE_ICON = """<svg aria-hidden="true" class="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.10645 7.98816C2.76127 7.98816 2.48145 8.26798 2.48145 8.61316C2.48145 8.95834 2.76127 9.23816 3.10645 9.23816V7.98816ZM3.10645 9.23816H14.8922V7.98816H3.10645V9.23816Z" fill="currentColor" />
    <path d="M10.0693 3.79224L14.8908 8.61366L10.0693 13.4351" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" /></svg>"""

BLOG_TERM_STYLE = 'style="--term-bg: rgba(90, 2, 2, 0.08); --term-color: rgba(90, 2, 2, 1);"'

PAGINATION_ARROW = """<svg aria-hidden="true" class="icon" viewBox="0 0 17 16"><path d="M11.2308 3.19998L6.43083 7.99998L11.2308 12.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/></svg>"""

HERO_BACK_ARROW = """<svg aria-hidden="true" class="hero-back-arrow icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.10645 7.98816C2.76127 7.98816 2.48145 8.26798 2.48145 8.61316C2.48145 8.95834 2.76127 9.23816 3.10645 9.23816V7.98816ZM3.10645 9.23816H14.8922V7.98816H3.10645V9.23816Z" fill="currentColor"/>
    <path d="M10.0693 3.79224L14.8908 8.61366L10.0693 13.4351" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""


def post_card(post: dict, href: str | None = None) -> str:
    url = href or f'/blog/{post["slug"]}/'
    return f"""<article class="post-card">
  <div class="post-card-top">
    <ul class="post-card-terms">
      <li class="post-card-term" {BLOG_TERM_STYLE}>Blog</li>
    </ul>
    <p class="post-card-date">{post["date"]}</p>
  </div>
  <div class="post-card-bottom">
    <h3 class="post-card-title">{post["title"]}</h3>
    <a href="{url}" class="post-card-link" aria-label="Devamını oku">{READ_MORE_ICON}</a>
  </div>
</article>"""


def blog_listing_hero() -> str:
    return f"""
<section class="hero">
  <img src="/assets/cta-bg.png" alt="" width="1920" height="631" loading="lazy" class="hero-image">
  <div class="hero-ctr container">
    {breadcrumbs([("Ana Sayfa", "/"), ("Blog", None)])}
    <div class="hero-content">
      <div>
        <h1 class="hero-title">Blog</h1>
        <div class="hero-wysiwyg cms"><p>Notre Psikoloji blogunda ruh sağlığı, ebeveynlik, çocuk gelişimi ve danışmanlık süreçlerine dair uzman yazılarımızı okuyabilirsiniz.</p></div>
      </div>
      <div>
        <div class="hero-right">
          <div class="hero-filters filters filters--static">
            <select name="type" class="filters-select" disabled aria-label="İçerik türü">
              <option value="blog" selected>Blog</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>"""


def blog_pagination() -> str:
    return f"""
<div class="pagination">
  <button type="button" disabled aria-label="Önceki sayfa" class="pagination-arrow">{PAGINATION_ARROW}</button>
  <ul class="pagination-list">
    <li class="pagination-item"><span aria-current="true" class="pagination-link">01</span></li>
  </ul>
  <button type="button" disabled aria-label="Sonraki sayfa" class="pagination-arrow pagination-arrow--next">{PAGINATION_ARROW}</button>
</div>"""


def blog_listing_posts() -> str:
    items = "".join(f'<li class="grid-item">{post_card(b)}</li>' for b in BLOG)
    return f"""
<div class="sectionPosts">
  <div class="sectionPosts-ctr container">
    <ul aria-label="Sayfa 1" class="grid">{items}</ul>
    {blog_pagination()}
  </div>
</div>"""


def blog_detail_hero(post: dict) -> str:
    return f"""
<section class="hero">
  <div class="hero-ctr container">
    <a href="/blog/" class="hero-back">{HERO_BACK_ARROW}Geri</a>
    <div class="hero-content">
      <div>
        <div class="hero-metas">
          <ul class="hero-terms">
            <li class="hero-term">Blog</li>
          </ul>
          <span class="hero-date">{post["date"]}</span>
        </div>
        <h1 class="hero-title">{post["title"]}</h1>
      </div>
      <div></div>
    </div>
  </div>
</section>"""


def blog_content_sections(post: dict) -> str:
    sections = post.get("sections") or []
    if not sections:
        sections = [{"title": "", "paragraphs": [post["body"]]}]
    blocks = ""
    for section in sections:
        paragraphs = "".join(f"<p>{p}</p>" for p in section["paragraphs"])
        title = (
            f'<h2 class="content-title title-lg">{section["title"]}</h2>'
            if section.get("title")
            else ""
        )
        blocks += f"""
<section class="content">
  <div class="content-ctr container container--md">
    {title}
    <div class="content-wysiwyg cms">{paragraphs}</div>
  </div>
</section>"""
    return f'<div class="single-main">{blocks}</div>'


def related_posts_section(current_slug: str) -> str:
    others = [b for b in BLOG if b["slug"] != current_slug][:3]
    if not others:
        return ""
    items = "".join(f'<li class="relatedPosts-item">{post_card(b)}</li>' for b in others)
    return f"""
<section class="relatedPosts">
  <div class="relatedPosts-ctr container">
    <h2 class="relatedPosts-title title-xl">Diğer blog yazılarımız</h2>
    <ul class="relatedPosts-grid">{items}</ul>
  </div>
</section>"""


def service_by_slug(slug: str) -> dict:
    return next(s for s in SERVICES if s["slug"] == slug)


def cards_first_big(intro_title: str, intro_text: str, slugs: list[str]) -> str:
    items = [
        f"""<div class="cardsFirstBig-item" data-animate-child>
        <div data-animate-draw data-color="#8B4545">{CARDS_FIRST_BIG_DECO}</div>
        <h3 class="cardsFirstBig-item-title title-xl">{intro_title}</h3>
        <div class="cardsFirstBig-item-text"><p>{intro_text}</p></div>
      </div>"""
    ]
    for slug in slugs:
        s = service_by_slug(slug)
        items.append(
            f"""<div class="cardsFirstBig-item" data-animate-child>
        <h3 class="cardsFirstBig-item-title title-md">{s["title"]}</h3>
        <div class="cardsFirstBig-item-text"><p>{s["short"]}</p></div>
        <a href="/hizmetler/{s["slug"]}/" class="button button--purple cardsFirstBig-item-link">Detaylı bilgi</a>
      </div>"""
        )
    return f"""
<section class="cardsFirstBig" data-animate-container>
  <div class="cardsFirstBig-ctr container">
    {''.join(items)}
  </div>
</section>"""


def cards_block() -> str:
    items = ""
    for g in EXPERTISE_GROUPS:
        links = "".join(
            f'<a href="/hizmetler/{slug}/" class="cards-item-link">{service_by_slug(slug)["title"]}{CARD_LINK_ICON}</a>'
            for slug in g["links"]
        )
        items += f"""
        <div class="cards-item" data-animate-child>
          <h3 class="cards-item-title title-lg">{g["title"]}</h3>
          <p class="cards-item-text">{g["text"]}</p>
          <div class="cards-item-links">{links}</div>
        </div>"""
    return f"""
<section class="cards" data-animate-bg="#f5e9dd">
  <div class="cards-ctr container">
    <div class="cards-top" data-animate-container>
      <h2 class="cards-title title-xl" data-animate-child>Her yaş ve ihtiyaç için uzmanlık alanlarımız</h2>
      <div class="cards-text" data-animate-child><p>Çocuktan yetişkine, bireyden kuruma kadar geniş bir yelpazede kanıta dayalı psikolojik danışmanlık sunuyoruz. Size en uygun hizmeti birlikte belirleyelim.</p>
      <p><b>Deneyimli ekibimiz sizi dinlemeye hazır. <a href="/iletisim/">İletişime geçin.</a></b></p></div>
    </div>
    <div class="cards-grid" data-animate-container>{items}</div>
  </div>
</section>"""


def image_content_block() -> str:
    return f"""
<section class="imageContent">
  <div class="imageContent-inner">
    <div class="imageContent-ctr container container--fluid">
      <img src="/assets/team-space.png" alt="{SITE["name"]} ekibi" width="1024" height="683" loading="lazy" class="imageContent-image">
      <div class="imageContent-content">
        <h2 class="imageContent-title title-xl">Ekibimizle tanışın: Yolculuğunuzda yanınızdayız</h2>
        <div class="imageContent-wysiwyg"><p>Alanında uzman psikolog ve klinik psikolog kadromuz, her danışana saygı ve şefkatle yaklaşır. Farklı uzmanlıkların bir araya geldiği ekibimizle bütüncül destek sunuyoruz.</p>
        <p><b>Sizi dinlemeye ve doğru adımı birlikte atmaya hazırız.</b></p>
        <p>{button('Ekibimizi tanıyın', '/ekibimiz/', 'white')}</p></div>
      </div>
    </div>
  </div>
</section>"""


def slider_block() -> str:
    slides = ""
    for slide in VALUE_SLIDES:
        srcset = slide.get("srcset")
        srcset_attr = f' srcset="{srcset}"' if srcset else ""
        slides += f"""
        <li class="cardsScroll-item">
          <img src="{slide["image"]}"{srcset_attr} alt="" width="{slide.get("width", 1024)}" height="{slide.get("height", 683)}" loading="eager" class="cardsScroll-item-image">
          <div class="cardsScroll-item-inner">
            <h3 class="cardsScroll-item-title title-md">{slide["title"]}</h3>
            <p class="cardsScroll-item-text">{slide["text"]}</p>
          </div>
        </li>"""
    return f"""
<section class="cardsScroll">
  <div class="cardsScroll-ctr container">
    <div class="cardsScroll-top">
      <h2 class="cardsScroll-title title-xl">İhtiyaçlarınıza özel çözümlerle danışmanlık sürecinizi destekliyoruz</h2>
    </div>
    <ul class="cardsScroll-list">{slides}</ul>
  </div>
</section>"""


def content_tags_block() -> str:
    tags = [
        ("Gizlilik ve güven", "rgba(90, 2, 2, 0.05)", "#5a0202"),
        ("Bilimsel ve etik", "rgba(168, 48, 88, 0.07)", "#8c2848"),
        ("İnsana saygı", "rgba(120, 48, 32, 0.06)", "#6e3020"),
    ]
    items = "".join(
        f'<li class="contentTags-item" style="--tag-bg: {bg}; --tag-color: {color};" data-animate-child>{label}</li>'
        for label, bg, color in tags
    )
    return f"""
<section class="contentTags" data-animate-container>
  <div class="contentTags-ctr container">
    <div class="contentTags-col">
      <h2 class="contentTags-title title-xl" data-animate-child>Değerlerimiz, çalışma şeklimizi belirler</h2>
      <a href="/hakkimizda/" class="button button--purple contentTags-link">Etik yaklaşımımızı inceleyin</a>
    </div>
    <div class="contentTags-col">
      <ul class="contentTags-list">{items}</ul>
    </div>
  </div>
</section>"""


def blog_section() -> str:
    big = BLOG[0]
    rest = BLOG[1:]
    term_style = "style=\"--term-bg: rgba(90, 2, 2, 0.05); --term-color: rgba(90, 2, 2, 1);\""
    big_card = f"""
        <li class="scientificPublications-item">
          <a href="/blog/{big["slug"]}/" class="scientificPubli-card scientificPubli-card--big">
            <span class="scientificPubli-card-glow" aria-hidden="true"></span>
            <div class="scientificPubli-card-content">
              <ul class="scientificPubli-card-terms">
                <li class="scientificPubli-card-term" {term_style}>Blog</li>
              </ul>
              <h3 class="scientificPubli-card-title title-md">{big["title"]}</h3>
            </div>
            <span class="scientificPubli-card-link" aria-hidden="true">{READ_MORE_ICON}{READ_MORE_ICON}</span>
          </a>
        </li>"""
    rest_cards = ""
    for b in rest:
        rest_cards += f"""
        <li class="scientificPublications-item">
          <a href="/blog/{b["slug"]}/" class="scientificPubli-card">
            <div class="scientificPubli-card-top">
              <ul class="scientificPubli-card-terms">
                <li class="scientificPubli-card-term" {term_style}>Blog</li>
              </ul>
              <p class="scientificPubli-card-date">{b["date"]}</p>
            </div>
            <div class="scientificPubli-card-bottom">
              <h3 class="scientificPubli-card-title title--big">{b["title"]}</h3>
              <span class="scientificPubli-card-link" aria-hidden="true">{READ_MORE_ICON}{READ_MORE_ICON}</span>
            </div>
          </a>
        </li>"""
    return f"""
<section class="scientificPublications" data-animate-container>
  <div class="scientificPublications-ctr container">
    <div class="scientificPublications-top">
      <h2 class="scientificPublications-title title-xl" data-animate-text>Blogdan son yazılar</h2>
      <a href="/blog/" class="button button--purple scientificPublications-link">Tüm yazılar</a>
    </div>
    <ul class="scientificPublications-grid">{big_card}{rest_cards}</ul>
  </div>
</section>"""


def home_push() -> str:
    return f"""
<section class="push" data-animate-container>
  <img src="/assets/cta-bg.png" srcset="/assets/cta-bg.png, /assets/cta-bg@2x.png 2x" alt="" width="1920" height="1280" loading="lazy" class="push-image" data-animate-parallax="1">
  <div class="push-ctr container container--fluid">
    <h2 class="push-text title-xl" data-animate-child>Her şey doğru bir adım ile başlar.<br>Birlikte daha sağlıklı bir ruh haline.</h2>
    <div class="push-question">
      <img src="/assets/push-counselor.png" srcset="/assets/push-counselor.png, /assets/push-counselor@2x.png 2x" alt="" width="600" height="400" loading="lazy" class="push-question-image">
      <div class="push-question-content">
        <h3 class="push-question-title title-lg">Sorularınız mı var?</h3>
        <p class="push-question-text">Uzman ekibimiz size yardımcı olmaya hazır. İletişime geçin, en kısa sürede dönüş yapalım.</p>
        <a href="/randevu/" class="button button--purple push-question-link">Randevu Al{BUTTON_ICON}</a>
      </div>
    </div>
  </div>
</section>"""


def write_body() -> str:
    html = f"""
{cards_first_big("Size en uygun danışmanlık hizmetini bulun", "Bireyselden çifte, çocuktan kuruma kadar geniş bir yelpazede, ihtiyaçlarınıza uygun psikolojik danışmanlık hizmetlerini keşfedin.", FEATURE_SERVICES)}
{cards_block()}
{image_content_block()}
{slider_block()}
{content_tags_block()}
{blog_section()}
{home_push()}
"""
    (DATA / "site-body.html").write_text(html, encoding="utf-8")
    return html


def main() -> None:
    PAGES.mkdir(parents=True, exist_ok=True)
    for old in PAGES.glob("*.html"):
        old.unlink()

    write_header()
    write_footer()
    write_hero()
    write_body()

    manifest: dict = {}

    def add(path: str, filename: str, title: str, body_class: str, html: str) -> None:
        (PAGES / filename).write_text(html.strip(), encoding="utf-8")
        manifest[path] = {"file": filename, "bodyClass": body_class, "title": title, "assets": 0}

    body_class = "wp-singular page wp-theme-solanum"

    add(
        "/hakkimizda/",
        "hakkimizda.html",
        f"Hakkımızda | {SITE['name']}",
        body_class,
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("Hakkımızda", "Üsküdar'da ailenizin her üyesi için güvenilir ve kapsamlı psikolojik danışmanlık.", [("Ana Sayfa", "/"), ("Hakkımızda", None)])}
        <section class="contentList"><div class="contentList-ctr container"><div class="cms">
        <h2 class="title-xl">Yaklaşımımız</h2>
        <p>Etik, bilimsel ve güncel uzmanlık üzerine kurulu psikolojik danışmanlık hizmetleri sunuyoruz.</p>
        <h3 class="title-md">Misyonumuz</h3><p>Uzmanlığımız ile birlikte erişilebilir ve ulaşılabilir hizmetler sunmaktır.</p>
        <h3 class="title-md">Vizyonumuz</h3><p>Etik, bilimsel ve güvenli bir psikolojik danışmanlık desteği sağlamaktır.</p>
        <h3 class="title-md">Değerlerimiz</h3><p>Gizlilik, etik, bilimsellik ve insana saygı.</p>
        </div></div></section>
        {faq_section()}
        {cta_push('Destek almak için ilk adımı atın', 'Ekibimizle iletişime geçin.')}
        </main>""",
    )

    def _svc_group_html() -> str:
        groups_html = ""
        for group in SERVICE_GROUPS:
            cards = ""
            for slug in group["slugs"]:
                s = SERVICE_BY_SLUG[slug]
                ic = SVC_ICONS.get(slug, SVC_ICONS["bireysel-danismanlik"])
                cards += (
                    f'<a href="/hizmetler/{slug}/" class="svc-card">'
                    f'<span class="svc-card__icon">{ic}</span>'
                    f'<h3 class="svc-card__title">{s["title"]}</h3>'
                    f'<p class="svc-card__text">{s["short"]}</p>'
                    f'<span class="svc-card__arrow">Detaylı incele '
                    f'<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">'
                    f'<path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>'
                    f'</svg></span>'
                    f'</a>'
                )
            groups_html += (
                f'<div class="svc-listing__group container">'
                f'<div class="svc-listing__group-header">'
                f'<h2 class="svc-listing__group-title">{group["title"]}</h2>'
                f'<span class="svc-listing__group-line"></span>'
                f'</div>'
                f'<div class="svc-listing__grid">{cards}</div>'
                f'</div>'
            )
        return groups_html

    add(
        "/hizmetler/",
        "hizmetler.html",
        f"Hizmetlerimiz | {SITE['name']}",
        body_class,
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("Hizmetlerimiz", "İhtiyacınıza uygun psikolojik danışmanlık hizmetlerini keşfedin.", [("Ana Sayfa", "/"), ("Hizmetler", None)])}
        <section class="svc-listing">{_svc_group_html()}</section>
        {cta_push('Hangi hizmet size uygun?', 'Randevu için bizimle iletişime geçin.')}
        </main>""",
    )

    for s in SERVICES:
        add(
            f"/hizmetler/{s['slug']}/",
            f"hizmetler__{s['slug']}.html",
            f"{s['title']} | {SITE['name']}",
            body_class,
            service_page(s),
        )

    team_grid = "".join(
        f'<div class="cardsLight-item"><h3 class="title-sm">{m["name"]}</h3><p>{m["role"]}</p><p>{m["bio"]}</p></div>'
        for m in TEAM
    )
    add(
        "/ekibimiz/",
        "ekibimiz.html",
        f"Ekibimiz | {SITE['name']}",
        body_class,
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("Ekibimiz", "Alanında uzman ve deneyimli psikolog kadromuz.", [("Ana Sayfa", "/"), ("Ekibimiz", None)])}
        <section class="cardsLight"><div class="container"><div class="cardsLight-grid">{team_grid}</div></div></section>
        {cta_push('Ekibimizle tanışın', 'Randevu almak için iletişime geçin.')}
        </main>""",
    )

    add(
        "/blog/",
        "blog.html",
        f"Blog | {SITE['name']}",
        "blog wp-theme-solanum",
        f"""<main id="contenu-principal" class="wrapper">
        {blog_listing_hero()}
        {blog_listing_posts()}
        </main>""",
    )

    for b in BLOG:
        add(
            f"/blog/{b['slug']}/",
            f"blog__{b['slug']}.html",
            f"{b['title']} | {SITE['name']}",
            "wp-singular post-template-default single single-post wp-theme-solanum",
            f"""<main id="contenu-principal" class="wrapper">
            {blog_detail_hero(b)}
            {blog_content_sections(b)}
            {related_posts_section(b["slug"])}
            </main>""",
        )

    add(
        "/sss/",
        "sss.html",
        f"Sıkça Sorulan Sorular | {SITE['name']}",
        body_class,
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("Sıkça Sorulan Sorular", "Psikolojik danışmanlık hizmetlerimiz hakkında merak ettikleriniz.", [("Ana Sayfa", "/"), ("SSS", None)])}
        {faq_section()}
        </main>""",
    )

    add(
        "/iletisim/",
        "iletisim.html",
        f"İletişim ve Randevu | {SITE['name']}",
        "wp-singular page-template page-template-contact page wp-theme-solanum",
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("İletişim", "Randevu almak veya sorularınız için bize ulaşın.", [("Ana Sayfa", "/"), ("İletişim", None)])}
        <section class="form"><div class="form-ctr container cms">
        <p><strong>Telefon:</strong> <a href="tel:{SITE["phone"].replace(" ", "")}">{SITE["phone"]}</a></p>
        <p><strong>E-posta:</strong> <a href="mailto:{SITE["email"]}">{SITE["email"]}</a></p>
        <p><strong>Adres:</strong> {SITE["address"]}</p>
        <p><strong>Çalışma saatleri:</strong> {SITE["hours"]}</p>
        <form class="contact-form" action="#" method="post">
          <label>Ad Soyad<input class="input" type="text" name="name" required></label>
          <label>Telefon<input class="input" type="tel" name="phone" required></label>
          <label>E-posta<input class="input" type="email" name="email"></label>
          <label>Hizmet<select class="input" name="service"><option>Bireysel Danışmanlık</option><option>Çift Danışmanlığı</option><option>Online Danışmanlık</option></select></label>
          <label>Mesajınız<textarea class="input" name="message" rows="4"></textarea></label>
          {button('Randevu Talebi Gönder', '#', 'purple')}
        </form>
        </div></section>
        </main>""",
    )

    add(
        "/kvkk/",
        "kvkk.html",
        f"KVKK ve Gizlilik | {SITE['name']}",
        "privacy-policy wp-singular page wp-theme-solanum",
        f"""<main id="contenu-principal" class="wrapper">
        {hero_block("KVKK ve Gizlilik", "Kişisel verilerin korunması ve gizlilik politikamız.", [("Ana Sayfa", "/"), ("KVKK", None)])}
        <section class="contentList"><div class="container cms">
        <p>{SITE["name"]} olarak kişisel verilerinizi 6698 sayılı KVKK kapsamında işlemekteyiz. Danışmanlık sürecinde paylaştığınız bilgiler gizlilik ilkesiyle korunur.</p>
        <p>Detaylı bilgi için {SITE["email"]} adresine yazabilirsiniz.</p>
        </div></section>
        </main>""",
    )

    (PAGES / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Generated {len(manifest)} pages for {SITE['name']}")


if __name__ == "__main__":
    main()
