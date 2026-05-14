import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'

const Home        = lazy(() => import('./pages/Home'))
const Portfolio   = lazy(() => import('./pages/Portfolio'))
const Services    = lazy(() => import('./pages/Services'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const Ressources  = lazy(() => import('./pages/Ressources'))
const Contact     = lazy(() => import('./pages/Contact'))

function Loader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Chargement…</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"                              element={<Home />} />
            <Route path="/portfolio"                     element={<Portfolio />} />
            <Route path="/services"                      element={<Services />} />
            <Route path="/services/:slug"                element={<ServicePage />} />
            <Route path="/ressources"                    element={<Ressources />} />
            <Route path="/contact"                       element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
