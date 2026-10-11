import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

// Tool names are plain text only: no third-party logos or branding.
const TOOLS = [
  { name: 'Notion', role: 'Docs & wiki', angle: -90 },
  { name: 'Jira', role: 'Issue tracking', angle: -18 },
  { name: 'Trello', role: 'Boards', angle: 54 },
  { name: 'Airtable', role: 'Databases', angle: 126 },
  { name: 'Slack', role: 'Team chat', angle: 198 },
]

const R = 39 // orbit radius in % of the container

const POINTS = [
  { big: '5 → 1', label: 'logins, invoices and permission models' },
  { big: '1', label: 'search that finds docs, tasks and data' },
  { big: '0', label: 'copy-pasting between tabs to stay in sync' },
]

export default function Replace() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const chips = el.querySelectorAll('.orbit-chip')
      gsap.set(chips, { xPercent: -50, yPercent: -50, transformPerspective: 800 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: el.querySelector('.orbit'), start: 'top 78%', end: 'bottom 38%', scrub: 1 },
      })
      tl.to(chips, { left: '50%', top: '50%', scale: 0.45, opacity: 0, rotationY: 180, stagger: 0.04 }, 0.15)
        .to('.orbit-ring', { scale: 0.55, opacity: 0, stagger: 0.05 }, 0.1)
        .to('.core', { scale: 1.22 }, 0.35)
        .to('.core-glow', { opacity: 1, scale: 1.6 }, 0.35)
        .to('.core-from', { opacity: 0, y: -10 }, 0.4)
        .to('.core-to', { opacity: 1, y: 0 }, 0.55)

      gsap.to('.orbit-spin', { rotation: 360, duration: 90, repeat: -1, ease: 'none' })
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="section" id="why" ref={root} data-depth-section>
      <div className="container section-inner">
        <div className="why">
          <div className="why-copy" data-reveal="left">
            <span className="eyebrow">Why SyncFlow</span>
            <h2 className="title">
              Why SyncFlow over <span className="grad">5 different apps?</span>
            </h2>
            <p className="sub">
              Docs in one tool, tickets in another, boards in a third, data in a spreadsheet and decisions buried in chat.
              Every extra app adds another login, another bill and another place for context to disappear.
            </p>
            <p className="sub">
              SyncFlow replaces the stack with one workspace where everything is connected from day one.
            </p>

            <div className="points" data-stagger>
              {POINTS.map((p) => (
                <div className="point" key={p.label}>
                  <strong>{p.big}</strong>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-wrap" data-reveal="zoom">
            <div className="orbit">
              <div className="orbit-spin" aria-hidden="true">
                <span className="orbit-ring r1" />
                <span className="orbit-ring r2" />
              </div>

              {TOOLS.map((t) => {
                const a = (t.angle * Math.PI) / 180
                return (
                  <div
                    key={t.name}
                    className="orbit-chip"
                    style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}
                  >
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </div>
                )
              })}

              <div className="core">
                <span className="core-glow" aria-hidden="true" />
                <div className="core-label">
                  <span className="core-from">5 tools</span>
                  <span className="core-to">1 workspace</span>
                </div>
                <strong>SyncFlow</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
