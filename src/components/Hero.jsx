import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const NAV_ITEMS = ['Home', 'My tasks', 'Docs', 'Databases', 'AI Copilot']

const COLUMNS = [
  {
    title: 'Backlog',
    count: 4,
    cards: [
      { t: 'Onboarding revamp', tag: 'Design', c: 'indigo' },
      { t: 'Usage analytics API', tag: 'Backend', c: 'emerald' },
    ],
  },
  {
    title: 'In progress',
    count: 3,
    cards: [
      { t: 'Launch checklist v2', tag: 'Growth', c: 'amber' },
      { t: 'AI summary widget', tag: 'AI', c: 'indigo' },
      { t: 'Billing migration', tag: 'Backend', c: 'emerald' },
    ],
  },
  {
    title: 'Shipped',
    count: 12,
    cards: [
      { t: 'Roadmap timeline', tag: 'Product', c: 'rose' },
      { t: 'Realtime comments', tag: 'Core', c: 'indigo' },
    ],
  },
]

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const preview = el.querySelector('.preview')
      const shell = el.querySelector('.preview-shell')

      // Initial 3D pose, then flatten while the user scrolls away
      gsap.set(preview, { rotationX: 24, rotationY: -16, rotationZ: 2, transformPerspective: 1500 })
      gsap.to(preview, {
        rotationX: 3,
        rotationY: -2,
        rotationZ: 0,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom 35%', scrub: 1 },
      })
      gsap.to('.hero-copy', {
        y: -50,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.grid-floor', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-copy > *', { y: 46, opacity: 0, duration: 0.9, stagger: 0.1 })
        .from(shell, { y: 140, opacity: 0, scale: 0.9, duration: 1.3 }, 0.25)
        .from('.float-pos', { scale: 0.4, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.8)' }, 0.9)

      // Idle floating
      gsap.to(shell, { y: -14, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 })
      el.querySelectorAll('[data-float]').forEach((b, i) => {
        gsap.to(b, {
          y: i % 2 ? -16 : 16,
          x: i % 2 ? 6 : -6,
          duration: 2.4 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Mouse parallax across depth layers
      const layers = el.querySelectorAll('[data-depth]')
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        layers.forEach((l) => {
          const d = parseFloat(l.dataset.depth)
          gsap.to(l, { x: nx * d * 38, y: ny * d * 26, duration: 0.9, ease: 'power3.out', overwrite: 'auto' })
        })
      }
      if (window.matchMedia('(hover: hover)').matches) el.addEventListener('mousemove', onMove)
      return () => el.removeEventListener('mousemove', onMove)
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="grid-floor" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="pill">
            <i className="pill-dot" /> New · AI Copilot is now in every workspace
          </span>
          <h1>
            One workspace for <span className="grad">everything</span> your team builds.
          </h1>
          <p className="lead">
            SyncFlow is the all-in-one Work OS for modern teams. Project management, docs, databases and AI automation,
            bundled into one seamless tool, so your team stops juggling tabs and starts shipping.
          </p>
          <div className="hero-actions">
            <a href="#pricing" className="btn btn-primary btn-lg">
              Start free, no card needed
            </a>
            <a href="#product" className="btn btn-ghost btn-lg">
              <span className="play">▶</span> Take the 2-min tour
            </a>
          </div>
          <p className="hero-note">Free for teams up to 5 · Set up in under 10 minutes · Cancel anytime</p>
        </div>

        <div className="hero-stage">
          <div className="float-pos pos-a" data-depth="1.8">
            <div className="badge" data-float>
              <b className="b-ico b-green">✓</b>
              <span>
                <strong>24 tasks</strong>
                <em>automated this week</em>
              </span>
            </div>
          </div>
          <div className="float-pos pos-b" data-depth="2.4">
            <div className="badge" data-float>
              <b className="b-ico b-indigo">✦</b>
              <span>
                <strong>AI Copilot</strong>
                <em>summarised 12 docs</em>
              </span>
            </div>
          </div>
          <div className="float-pos pos-c" data-depth="1.3">
            <div className="badge" data-float>
              <b className="b-ico b-amber">◔</b>
              <span>
                <strong>Sprint 82%</strong>
                <em>on track for Friday</em>
              </span>
            </div>
          </div>

          <div className="preview-parallax" data-depth="0.6">
            <div className="preview-shell">
              <div className="preview">
                <div className="pv-top">
                  <span className="dots"><i /><i /><i /></span>
                  <span className="pv-title">Product Launch · Q4</span>
                  <span className="pv-avatars"><i>A</i><i>M</i><i>R</i><i>+4</i></span>
                </div>
                <div className="pv-body">
                  <aside className="pv-side">
                    {NAV_ITEMS.map((n, i) => (
                      <div key={n} className={`pv-nav ${i === 1 ? 'on' : ''}`}>
                        <span className="pv-ico" />
                        {n}
                      </div>
                    ))}
                    <div className="pv-progress">
                      <small>Q4 goals</small>
                      <div className="bar"><i style={{ width: '68%' }} /></div>
                    </div>
                  </aside>

                  <div className="pv-main">
                    <div className="pv-head">
                      <h4>Launch board</h4>
                      <div className="pv-tabs"><span className="on">Board</span><span>Timeline</span><span>Docs</span></div>
                    </div>
                    <div className="pv-cols">
                      {COLUMNS.map((col) => (
                        <div className="pv-col" key={col.title}>
                          <div className="pv-col-h">
                            {col.title} <small>{col.count}</small>
                          </div>
                          {col.cards.map((c) => (
                            <div className="pv-card" key={c.t}>
                              <p>{c.t}</p>
                              <div className="pv-card-f">
                                <span className={`tag tag-${c.c}`}>{c.tag}</span>
                                <i className="av" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="pv-ai">
                    <div className="pv-ai-h"><b>✦</b> AI Copilot</div>
                    <div className="msg msg-user">What's blocking the launch?</div>
                    <div className="msg msg-ai">
                      2 tasks are waiting on billing. I drafted a status update and moved the review to Thursday.
                    </div>
                    <div className="pv-ai-input">Ask anything…</div>
                  </aside>
                </div>
              </div>
              <div className="preview-glow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
