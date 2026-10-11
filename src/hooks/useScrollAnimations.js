import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Global scroll choreography. Elements opt in with data attributes:
 *   data-reveal="up|left|right|zoom"  -> 3D rise-in when scrolled into view
 *   data-stagger                      -> children rise in one after another
 *   data-parallax="0.5"               -> depth drift while scrolling
 *   data-depth-section                -> section content tilts flat as it arrives
 * Everything is skipped for users who prefer reduced motion.
 */
const VARIANTS = {
  up: { y: 80, rotationX: -28, opacity: 0 },
  left: { x: -120, rotationY: 28, opacity: 0 },
  right: { x: 120, rotationY: -28, opacity: 0 },
  zoom: { scale: 0.82, z: -240, opacity: 0 },
}

export default function useScrollAnimations(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Single elements revealing in 3D
      gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
        const v = VARIANTS[el.dataset.reveal] || VARIANTS.up
        gsap.from(el, {
          ...v,
          transformPerspective: 1200,
          transformOrigin: '50% 100%',
          duration: 1.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      // 2. Groups of children staggering in
      gsap.utils.toArray('[data-stagger]', root).forEach((group) => {
        gsap.from(group.children, {
          y: 70,
          rotationX: -32,
          z: -140,
          opacity: 0,
          transformPerspective: 1100,
          transformOrigin: '50% 100%',
          duration: 1,
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        })
      })

      // 3. Parallax depth drift
      gsap.utils.toArray('[data-parallax]', root).forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.4
        gsap.to(el, {
          y: () => -speed * 160,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // 4. Each section tilts flat as it arrives (scrubbed to scroll)
      gsap.utils.toArray('[data-depth-section]', root).forEach((sec) => {
        const inner = sec.querySelector('.section-inner')
        if (!inner) return
        gsap.fromTo(
          inner,
          { rotationX: 7, scale: 0.955, transformPerspective: 1400, transformOrigin: '50% 0%' },
          {
            rotationX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 25%', scrub: true },
          }
        )
      })

      // 5. Top reading-progress bar
      const bar = root.querySelector('.progress-bar')
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        })
      }
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [rootRef])
}
