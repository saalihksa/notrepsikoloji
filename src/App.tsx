import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { useInternalLinkNavigation } from './hooks/useInternalLinkNavigation'
import { useSiteChrome } from './hooks/useSiteChrome'
import { useSolanumAnimations } from './hooks/useSolanumAnimations'
import { HomePage } from './pages/HomePage'
import { AppointmentPage } from './pages/AppointmentPage'
import { ContactPage } from './pages/ContactPage'
import { TeamPage } from './pages/TeamPage'
import { HakkimizdaPage } from './pages/HakkimizdaPage'
import { HizmetlerPage } from './pages/HizmetlerPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { SssPage } from './pages/SssPage'
import { KvkkPage } from './pages/KvkkPage'
import { BlogPage } from './pages/BlogPage'
import { BlogDetailPage } from './pages/BlogDetailPage'

function AppRoutes() {
  useInternalLinkNavigation()
  useSiteChrome()
  useSolanumAnimations()

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Ekip, Randevu, İletişim */}
        <Route path="/ekibimiz" element={<TeamPage />} />
        <Route path="/ekibimiz/" element={<TeamPage />} />
        <Route path="/randevu" element={<AppointmentPage />} />
        <Route path="/randevu/" element={<AppointmentPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/iletisim/" element={<ContactPage />} />

        {/* Hakkımızda */}
        <Route path="/hakkimizda" element={<HakkimizdaPage />} />
        <Route path="/hakkimizda/" element={<HakkimizdaPage />} />

        {/* Hizmetler */}
        <Route path="/hizmetler" element={<HizmetlerPage />} />
        <Route path="/hizmetler/" element={<HizmetlerPage />} />
        <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
        <Route path="/hizmetler/:slug/" element={<ServiceDetailPage />} />

        {/* SSS */}
        <Route path="/sss" element={<SssPage />} />
        <Route path="/sss/" element={<SssPage />} />

        {/* KVKK */}
        <Route path="/kvkk" element={<KvkkPage />} />
        <Route path="/kvkk/" element={<KvkkPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/blog/:slug/" element={<BlogDetailPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
