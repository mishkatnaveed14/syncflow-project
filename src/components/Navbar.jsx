import { useEffect, useState } from 'react'
import Logo from './Logo'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#why', label: 'Why SyncFlow' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#customers', label: 'Customers' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="SyncFlow home">
          <Logo id="nav-logo" />
          <span>SyncFlow</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="#top" className="nav-login">Log in</a>
          <a href="#pricing" className="btn btn-primary btn-sm">Get started free</a>
        </div>

        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav-mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#pricing" className="btn btn-primary" onClick={() => setOpen(false)}>
          Get started free
        </a>
      </div>
    </header>
  )
}
