import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import TiltCard from './TiltCard'

// Yearly prices are the headline numbers; monthly = yearly / 0.8 (20% saving on yearly).
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'For individuals & small side projects',
    yearly: 0,
    monthly: 0,
    unit: 'forever',
    cta: 'Get started free',
    style: 'ghost',
    lead: 'Includes',
    features: ['Up to 5 members', '1 GB file storage', 'Basic docs & boards', '3 databases', 'Community support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing teams that need more room',
    yearly: 12,
    monthly: 15,
    unit: 'per user / month',
    cta: 'Start 14-day Pro trial',
    style: 'primary',
    popular: true,
    lead: 'Everything in Free, plus',
    features: [
      'Unlimited workspaces',
      'AI Copilot included',
      '100 GB file storage',
      'Custom fields & relations',
      'Automation workflows',
      'Priority email support',
    ],
  },
  {
    id: 'ent',
    name: 'Enterprise',
    tagline: 'For large organisations at scale',
    yearly: 29,
    monthly: 36,
    unit: 'per user / month',
    cta: 'Talk to sales',
    style: 'outline',
    lead: 'Everything in Pro, plus',
    features: [
      'Dedicated success manager',
      'Advanced security (SSO, SCIM, audit log)',
      'Custom integrations & API',
      'Unlimited storage',
      'Data residency options',
    ],
  },
]

function PriceNumber({ value }) {
  const ref = useRef(null)
  const prev = useRef(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (prev.current === null) {
      node.textContent = value
      prev.current = value
      return
    }
    const obj = { v: prev.current }
    const tw = gsap.to(obj, {
      v: value,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        node.textContent = Math.round(obj.v)
      },
    })
    prev.current = value
    return () => tw.kill()
  }, [value])

  return <span ref={ref} />
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <section className="section" id="pricing" data-depth-section>
      <div className="orb orb-c" aria-hidden="true" data-parallax="0.6" />
      <div className="container section-inner">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Pricing</span>
          <h2 className="title">
            One platform, <span className="grad">priced for how you grow</span>
          </h2>
          <p className="sub">Start free with your whole small team. Upgrade only when you need more power. No surprises.</p>

          <div className="toggle" role="group" aria-label="Billing period">
            <button className={!yearly ? 'on' : ''} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button className={yearly ? 'on' : ''} onClick={() => setYearly(true)}>
              Yearly <span className="save">Save 20%</span>
            </button>
            <span className="toggle-thumb" style={{ transform: yearly ? 'translateX(100%)' : 'translateX(0)' }} />
          </div>
        </div>

        <div className="plans" data-stagger>
          {PLANS.map((p) => {
            const price = yearly ? p.yearly : p.monthly
            return (
              <TiltCard key={p.id} className={`plan glass ${p.popular ? 'is-popular' : ''}`} max={6} lift={22}>
                {p.popular && <span className="popular-tag">★ Most popular</span>}
                <div className="tz">
                  <h3>{p.name}</h3>
                  <p className="plan-tag">{p.tagline}</p>
                  <div className="price">
                    <span className="cur">$</span>
                    <strong><PriceNumber value={price} /></strong>
                    <span className="unit">{p.unit}</span>
                  </div>
                  <p className="billing">
                    {p.id === 'free'
                      ? 'No credit card required'
                      : yearly
                        ? 'Billed annually · save 20%'
                        : 'Billed monthly · cancel anytime'}
                  </p>
                  <a href="#top" className={`btn btn-block btn-${p.style}`}>
                    {p.cta}
                  </a>
                </div>
                <div className="plan-list tz">
                  <p className="lead-in">{p.lead}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            )
          })}
        </div>

        <div className="program glass" data-reveal>
          <div>
            <h4>Building in the open?</h4>
            <p>Open-source maintainers and student teams get the Pro plan free. Non-profits save 50%.</p>
          </div>
          <a href="#faq" className="btn btn-ghost">Apply for a discount</a>
        </div>
      </div>
    </section>
  )
}
