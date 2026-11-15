import { useEffect, useRef } from 'react'
import './landing-hero.css'

const clamp = value => Math.min(1, Math.max(0, value))
const smooth = value => value * value * (3 - 2 * value)

export default function LandingHero() {
  const root = useRef(null)

  useEffect(() => {
    const element = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const travel = Math.max(1, element.offsetHeight - window.innerHeight)
      const raw = clamp(-element.getBoundingClientRect().top / (travel * .8))
      const progress = reduced.matches ? 1 : smooth(raw)
      const reveal = reduced.matches ? 1 : smooth(clamp((raw - .65) / .3))
      const photoHeight = Math.max(window.innerHeight, window.innerWidth * 941 / 1672)
      const frameHeight = window.innerWidth <= 600 ? window.innerHeight * .54 : window.innerHeight * .94 - 112
      const fittedScale = Math.min(1, frameHeight / photoHeight)
      element.style.setProperty('--hero-ease', progress)
      element.style.setProperty('--name-exit', reduced.matches ? 1 : smooth(clamp(raw / .65)))
      element.style.setProperty('--name-opacity', reduced.matches ? 0 : 1 - smooth(clamp((raw - .12) / .42)))
      element.style.setProperty('--photo-fit', 1 - progress * (1 - fittedScale))
      element.style.setProperty('--intro-reveal', reveal)
      element.style.setProperty('--side-visibility', reveal > .01 ? 'visible' : 'hidden')
      element.style.setProperty('--scroll-visibility', progress < .95 ? 'visible' : 'hidden')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <section className="landing-hero" id="top" ref={root} aria-labelledby="landing-name">
      <div className="landing-stage">
        <p className="landing-location">Software engineer & product builder <span>Bengaluru, India</span></p>
        <svg width="0" height="0" className="landing-mask-defs" aria-hidden="true"><defs><clipPath id="landing-head-clip" clipPathUnits="objectBoundingBox"><path d="M .495,.108 C .474,.104 .453,.122 .438,.145 C .418,.165 .409,.204 .407,.249 C .405,.283 .418,.319 .426,.34 C .425,.371 .437,.413 .451,.447 C .469,.48 .491,.487 .514,.476 C .537,.46 .553,.425 .558,.384 C .575,.361 .571,.328 .565,.305 C .58,.27 .576,.217 .564,.184 C .552,.145 .522,.109 .495,.108 Z" /></clipPath></defs></svg>
        <div className="landing-portrait">
          <div className="landing-photo-plane">
            <img className="landing-base-photo" src="/satyam-landscape-v2.jpg" alt="Satyam Singh seated at his desk, photographed in black and white" width="1672" height="941" fetchPriority="high" />
            <h1 id="landing-name" className="landing-name"><span>Satyam</span> <span>Singh</span></h1>
            <img className="landing-head-layer" src="/satyam-landscape-v2.jpg" alt="" aria-hidden="true" width="1672" height="941" />
          </div>
        </div>
        <div className="landing-side landing-side-left">
          <span className="landing-side-label">01 / Engineering</span>
          <h2>Software<br />Engineer.</h2>
          <p>3 years of building scalable applications with Java, Spring Boot, React, and Azure Cloud.</p>
          <p>Crafting reliable systems, from backend architecture to user experiences.</p>
        </div>
        <div className="landing-side landing-side-right">
          <span className="landing-side-label">02 / Building</span>
          <h2>Ideas into<br />products.</h2>
          <p>From enterprise applications to AI-powered products, I love building solutions that solve real problems.</p>
          <a href="#builds">Explore my projects <span aria-hidden="true">↗</span></a>
        </div>
        <div className="landing-scroll" aria-hidden="true"><span>Scroll to discover</span><span>↓</span></div>
      </div>
    </section>
  )
}
