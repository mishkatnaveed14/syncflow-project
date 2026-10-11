import { useRef } from 'react'
import useScrollAnimations from './hooks/useScrollAnimations'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoCloud from './components/LogoCloud'
import Features from './components/Features'
import Replace from './components/Replace'
import Pricing from './components/Pricing'
import Matrix from './components/Matrix'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTAFooter from './components/CTAFooter'

export default function App() {
  const root = useRef(null)
  useScrollAnimations(root)

  return (
    <div className="app" ref={root}>
      <div className="progress"><div className="progress-bar" /></div>
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <Replace />
        <Pricing />
        <Matrix />
        <Testimonials />
        <FAQ />
      </main>
      <CTAFooter />
    </div>
  )
}
