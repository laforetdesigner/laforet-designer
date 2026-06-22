import { Helmet } from 'react-helmet-async'
import Hero             from '../components/sections/Hero'
import Stats            from '../components/sections/Stats'
import ServicesSection  from '../components/sections/ServicesSection'
import PortfolioPreview from '../components/sections/PortfolioPreview'
import Testimonials     from '../components/sections/Testimonials'
import CTABanner        from '../components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Laforet Designer — Agence de Design Créatif à Paris</title>
        <meta name="description" content="Agence de design créatif à Paris. Branding, identité visuelle, communication 360 et solutions digitales pour les marques qui veulent s'imposer. Devis gratuit sous 48h." />
        <meta name="keywords" content="agence design paris, branding paris, identité visuelle, communication 360, UI UX design, agence créative" />
        <meta property="og:title" content="Laforet Designer — Agence de Design Créatif à Paris" />
        <meta property="og:description" content="Branding, communication 360 et solutions digitales pour les marques ambitieuses. Devis sous 48h." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://laforetdesigner.com/" />
        <link rel="canonical" href="https://laforetdesigner.com/" />
      </Helmet>
      <Hero />
      <Stats />
      <ServicesSection />
      <PortfolioPreview />
      <Testimonials />
      <CTABanner />
    </>
  )
}
