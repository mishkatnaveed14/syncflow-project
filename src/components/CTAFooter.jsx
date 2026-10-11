import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import Logo from './Logo'

const COLUMNS = [
  { title: 'Product', links: ['Task management', 'Docs', 'Databases', 'AI Copilot', 'Automations', 'Templates'] },
  { title: 'Solutions', links: ['Product teams', 'Engineering', 'Agencies', 'Startups', 'Operations'] },
  { title: 'Resources', links: ['Help centre', 'Guides', 'Changelog', 'Community', 'System status'] },
  { title: 'Company', links: ['About', 'Careers', 'Security', 'Privacy', 'Terms'] },
]

export default function CTAFooter() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Rings spin in 3D, banner scales in with scroll
      gsap.to('.ring-1', { rotationZ: 360, duration: 36, repeat: -1, ease: 'none' })
      gsap.to('.ring-2', { rotationZ: -360, duration: 28, repeat: -1, ease: 'none' })
      gsap.to('.ring-3', { rotationZ: 360, duration: 20, repeat: -1, ease: 'none' })

      gsap.fromTo(
        '.cta-card',
        { rotationX: 16, scale: 0.9, transformPerspective: 1400, transformOrigin: '50% 100%' },
        {
          rotationX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el.querySelector('.cta'), start: 'top bottom', end: 'center 60%', scrub: 1 },
        }
      )
      gsap.to('.cta-rings', {
        rotationX: 62,
        ease: 'none',
        scrollTrigger: { trigger: el.querySelector('.cta'), start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={root}>
      <section className="cta section" data-depth-section>
        <div className="container section-inner">
          <div className="cta-card">
            <div className="cta-rings" aria-hidden="true">
              <span className="ring ring-1" />
              <span className="ring ring-2" />
              <span className="ring ring-3" />
            </div>
            <div className="cta-body">
              <span className="eyebrow">Ready when you are</span>
              <h2>
                Run your whole workspace
                <br />
                in <span className="grad">one place</span>.
              </h2>
              <p>Join 1000+ teams who replaced their tool stack with SyncFlow. Free for small teams, forever.</p>
              <div className="hero-actions center">
                <a href="#pricing" className="btn btn-primary btn-lg">Start free today</a>
                <a href="mailto:hello@syncflow.example" className="btn btn-ghost btn-lg">Book a demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#top" className="brand">
                <Logo id="foot-logo" />
                <span>SyncFlow</span>
              </a>
              <p>The all-in-one work OS for modern teams. Plan, write, build and automate in one connected workspace.</p>
              <div className="socials">
                {['X', 'in', 'GH', 'YT'].map((s) => (
                  <a key={s} href="#top" aria-label={`SyncFlow on ${s}`}>{s}</a>
                ))}
              </div>
            </div>

            {COLUMNS.map((c) => (
              <nav key={c.title} className="footer-col" aria-label={c.title}>
                <h5>{c.title}</h5>
                {c.links.map((l) => (
                  <a key={l} href="#top">{l}</a>
                ))}
              </nav>
            ))}
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} SyncFlow, Inc. All rights reserved.</span>
            <span className="status"><i /> All systems operational</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
