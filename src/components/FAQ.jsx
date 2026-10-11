import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const ITEMS = [
  {
    q: 'Is there really a free plan, and what are the limits?',
    a: 'Yes. Free is for teams of up to 5 members with 1 GB of storage, basic docs and boards. It is not a disguised trial: it never expires, and you can upgrade whenever you outgrow it.',
  },
  {
    q: 'Do I get a trial of paid plans?',
    a: 'Every new workspace can try Pro free for 14 days, no credit card needed. When the trial ends you pick a plan, or simply drop back to Free and keep your data.',
  },
  {
    q: 'How does yearly billing work?',
    a: 'Yearly billing is 20% cheaper than monthly. Prices are per user per month, billed once a year. When you add a teammate mid-cycle you only pay for the time that remains.',
  },
  {
    q: 'Can I import from Notion, Jira, Trello, Airtable or Slack?',
    a: 'Yes. Guided importers bring in pages, issues, boards, tables and key channels so you can move over gradually, and our team can help with larger migrations on Pro and Enterprise.',
  },
  {
    q: 'How does the AI Copilot use my data?',
    a: 'The Copilot only sees what the person asking can already access. Your content is never used to train models, and admins can switch AI features off per workspace.',
  },
  {
    q: 'What security and compliance do you offer?',
    a: 'All plans include encryption in transit and at rest and two-factor authentication. Enterprise adds SAML SSO, SCIM provisioning, audit logs, custom roles and data residency options.',
  },
  {
    q: 'Can I cancel or change plan at any time?',
    a: 'Yes. Upgrade, downgrade or cancel from your billing settings. Paid features stay active until the end of the billing period, then the workspace moves to Free.',
  },
  {
    q: 'Do you offer discounts?',
    a: 'Open-source maintainers and student teams get Pro free, and non-profits save 50%. Reach out to our team with a few details and we will set it up.',
  },
]

function Item({ item, open, onToggle, index }) {
  const panel = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    const el = panel.current
    if (!el) return
    if (first.current) {
      first.current = false
      gsap.set(el, { height: open ? 'auto' : 0 })
      return
    }
    gsap.to(el, {
      height: open ? 'auto' : 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [open])

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="faq-q"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-btn-${index}`}
      >
        <span>{item.q}</span>
        <i className="plus" aria-hidden="true" />
      </button>
      <div className="faq-a" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`} ref={panel}>
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq" data-depth-section>
      <div className="container section-inner">
        <div className="faq-layout">
          <div className="faq-side" data-reveal="left">
            <span className="eyebrow">FAQ</span>
            <h2 className="title">
              Questions, <span className="grad">answered</span>
            </h2>
            <p className="sub">Can't find what you need? Our team replies fast, and a real human reads every message.</p>
            <div className="help-card glass">
              <strong>Still curious?</strong>
              <p>Book a 20-minute walkthrough with a workspace specialist.</p>
              <a href="mailto:hello@syncflow.example" className="btn btn-primary">Talk to us</a>
            </div>
          </div>

          <div className="faq-list" data-stagger>
            {ITEMS.map((item, i) => (
              <Item key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
