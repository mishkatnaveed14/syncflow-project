import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once, import { gsap, ScrollTrigger } from here everywhere else.
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out' })

export { gsap, ScrollTrigger }
