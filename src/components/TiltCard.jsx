import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * 3D tilt-on-hover card. The outer wrapper owns scroll-reveal transforms,
 * the inner card owns the mouse tilt, so the two never fight each other.
 */
export default function TiltCard({ children, className = '', max = 9, lift = 18, wrapClass = '', ...rest }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduce) return

    gsap.set(el, { transformPerspective: 1000 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const z = gsap.quickTo(el, 'z', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      ry((px - 0.5) * max * 2)
      rx(-(py - 0.5) * max * 2)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
    const onEnter = () => z(lift)
    const onLeave = () => {
      rx(0)
      ry(0)
      z(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [max, lift])

  return (
    <div className={`tilt-wrap ${wrapClass}`}>
      <div ref={cardRef} className={`tilt-card ${className}`} {...rest}>
        {children}
      </div>
    </div>
  )
}
