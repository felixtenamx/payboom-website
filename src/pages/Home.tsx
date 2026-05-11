import MetaTags from '@/components/seo/MetaTags'
import Hero from '@/components/home/Hero'
import FeaturesGrid from '@/components/home/FeaturesGrid'
import GlobeSection from '@/components/home/GlobeSection'
import ApiSection from '@/components/home/ApiSection'
import SecuritySection from '@/components/home/SecuritySection'
import ContactSection from '@/components/home/ContactSection'

export default function Home() {
  return (
    <>
      <MetaTags
        title="Payboom — Infraestructura de pagos global"
        description="Payboom — Infraestructura de pagos para empresas globales. Procesa tarjetas, acepta pagos internacionales y conecta con APIs en minutos."
        path="/"
      />
      <Hero />
      <FeaturesGrid />
      <GlobeSection />
      <ApiSection />
      <SecuritySection />
      <ContactSection />
    </>
  )
}