import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Placeholder wordmarks. Swap these for your real customer logos.
const BRANDS = ['Helio', 'Quanta', 'Northpeak', 'Lumen & Co', 'Vertex Labs', 'Orbital', 'Fathom', 'Kitebird', 'Mosaic']

const STATS = [
  { value: 1000, suffix: '+', label: 'teams building on SyncFlow' },
  { value: 4.9, suffix: '/5', label: 'average rating from users', decimals: 1 },
  { value: 38, suffix: '%', label: 'less time lost to status meetings' },
  { value: 99.99, suffix: '%', label: 'uptime over the last 12 months', decimals: 2 },
]

export default function LogoCloud() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const track = el.querySelector('.marquee-track')
      const loop = gsap.to(track, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 })
      const wrap = el.querySelector('.marquee')
      const slow = () => gsap.to(loop, { timeScale: 0.15, duration: 0.6 })
      const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 })
      wrap.addEventListener('mouseenter', slow)
      wrap.addEventListener('mouseleave', fast)

      // Counters
      el.querySelectorAll('[data-count]').forEach((node) => {
        const target = parseFloat(node.dataset.count)
        const decimals = parseInt(node.dataset.decimals || '0', 10)
        const obj = { v: 0 }
        ScrollTrigger.create({
          trigger: node,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                node.textContent = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString()
              },
            }),
        })
      })

      return () => {
        wrap.removeEventListener('mouseenter', slow)
        wrap.removeEventListener('mouseleave', fast)
      }
    })

    return () => mm.revert()
  }, [])

  const row = [...BRANDS, ...BRANDS]

  return (
    <section className="logos" ref={root} data-depth-section>
      <div className="container section-inner">
        <p className="logos-title" data-reveal>
          Trusted by 1000+ fast-moving teams, from two-person studios to global product orgs
        </p>

        <div className="marquee" data-reveal="zoom">
          <div className="marquee-track">
            {row.map((b, i) => (
              <span className="wordmark" key={`${b}-${i}`}>
                <i className="wm-glyph" />
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="stats" data-stagger>
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">
                <span data-count={s.value} data-decimals={s.decimals || 0}>0</span>
                <em>{s.suffix}</em>
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
