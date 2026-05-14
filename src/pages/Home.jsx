import Hero             from '../components/sections/Hero'
import Stats            from '../components/sections/Stats'
import ServicesSection  from '../components/sections/ServicesSection'
import PortfolioPreview from '../components/sections/PortfolioPreview'
import Testimonials     from '../components/sections/Testimonials'
import CTABanner        from '../components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesSection />
      <PortfolioPreview />
      <Testimonials />
      <CTABanner />
    </>
  )
}
