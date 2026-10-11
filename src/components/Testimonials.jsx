import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

// Sample content. Replace with real customer quotes and results before launch.
const QUOTES = [
  {
    quote:
      'We retired four tools in a month. Planning, specs and customer data finally live in one place, and nobody asks where something is any more.',
    name: 'Maya Alvarez',
    role: 'Head of Product',
    company: 'Helio',
    metric: '4 tools → 1',
  },
  {
    quote:
      'The AI Copilot writes our weekly status updates from real work in the workspace. It saves the whole team an hour every Friday.',
    name: 'Raj Patel',
    role: 'Engineering Manager',
    company: 'Quanta',
    metric: '5 hrs / week saved',
  },
  {
    quote:
      'Custom databases let us model our client pipeline exactly how we work. Setup took an afternoon, not a quarter.',
    name: 'Sofia Lindqvist',
    role: 'Operations Lead',
    company: 'Northpeak',
    metric: '1 afternoon to set up',
  },
  {
    quote:
      'Our designers, engineers and marketers finally share a roadmap. Handoffs went from messy to boring, which is exactly what we wanted.',
    name: 'Daniel Okafor',
    role: 'COO',
    company: 'Orbital',
    metric: '41% fewer handoff delays',
  },
  {
    quote:
      'Security review was painless: SSO, audit logs and data residency were all there. Procurement signed off in days.',
    name: 'Hannah Weiss',
    role: 'IT Director',
    company: 'Vertex Labs',
    metric: 'Approved in 6 days',
  },
]

const CASES = [
  { big: '−41%', text: 'time spent in status meetings', who: 'Orbital · Operations' },
  { big: '2.4×', text: 'faster onboarding for new hires', who: 'Quanta · Engineering' },
  { big: '3 wks', text: 'shaved off the product launch cycle', who: 'Helio · Product' },
]

const initials = (n) => n.split(' ').map((p) => p[0]).join('')

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const hover = useRef(false)
  const n = QUOTES.length

  const layout = useCallback(
    (idx, animate = true) => {
      const cards = stage.current ? stage.current.querySelectorAll('.t-card') : []
      const narrow = window.innerWidth < 760
      cards.forEach((el, i) => {
        let off = i - idx
        if (off > n / 2) off -= n
        if (off < -n / 2) off += n
        const abs = Math.abs(off)
        const hidden = narrow ? abs > 0 : abs > 1
        const props = {
          xPercent: -50 + off * 64,
          rotationY: -off * 32,
          z: -abs * 180,
          scale: 1 - abs * 0.08,
          opacity: hidden ? 0 : abs === 0 ? 1 : 0.5,
          zIndex: 10 - abs,
          transformPerspective: 1400,
          pointerEvents: abs === 0 ? 'auto' : 'none',
          duration: animate ? 1 : 0,
          ease: 'power3.out',
          overwrite: true,
        }
        gsap.to(el, props)
      })
    },
    [n]
  )

  useLayoutEffect(() => {
    layout(active, false)
    const onResize = () => layout(active, false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    layout(active, true)
  }, [active, layout])

  // Autoplay (paused while hovering)
  useEffect(() => {
    const id = setInterval(() => {
      if (!hover.current) setActive((a) => (a + 1) % n)
    }, 6500)
    return () => clearInterval(id)
  }, [n])

  const go = (d) => setActive((a) => (a + d + n) % n)

  return (
    <section className="section" id="customers" data-depth-section>
      <div className="container section-inner">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Customers</span>
          <h2 className="title">
            Loved by teams who <span className="grad">ship for a living</span>
          </h2>
        </div>

        <div
          className="t-stage"
          ref={stage}
          data-reveal="zoom"
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
        >
          {QUOTES.map((q, i) => (
            <article className="t-card glass" key={q.name} aria-hidden={i !== active}>
              <span className="t-quote" aria-hidden="true">“</span>
              <p>{q.quote}</p>
              <div className="t-foot">
                <span className="t-avatar">{initials(q.name)}</span>
                <div>
                  <strong>{q.name}</strong>
                  <small>{q.role}, {q.company}</small>
                </div>
                <span className="t-metric">{q.metric}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="t-controls" data-reveal>
          <button onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
          <div className="t-dots">
            {QUOTES.map((q, i) => (
              <button
                key={q.name}
                className={i === active ? 'on' : ''}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial">→</button>
        </div>

        <div className="cases" data-stagger>
          {CASES.map((c) => (
            <div className="case glass" key={c.text}>
              <strong>{c.big}</strong>
              <p>{c.text}</p>
              <small>{c.who}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
