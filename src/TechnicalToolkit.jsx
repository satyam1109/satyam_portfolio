import { useEffect, useRef, useState } from 'react'
import './technical-toolkit.css'

const clamp = n => Math.max(0, Math.min(1, n))
const smooth = n => n * n * (3 - 2 * n)
const mix = (a, b, t) => a + (b - a) * t
// Gentle acceleration and braking, with a steady speed through most of the arc.
const glide = value => {
  const t = clamp(value)
  const edge = .12
  if (t < edge) return t * t / (2 * edge * (1 - edge))
  if (t > 1 - edge) return 1 - (1 - t) ** 2 / (2 * edge * (1 - edge))
  return (t - edge / 2) / (1 - edge)
}

function SkillRows({ groups }) {
  return <div className="toolkit-overview">{groups.map(group => <div className="toolkit-overview-row" key={group.title}><h3>{group.title}</h3><div>{group.skills.map(skill => { const Icon = skill.icon; return <div className="toolkit-static-skill" key={skill.name}><Icon aria-hidden="true" /><span>{skill.name}</span></div> })}</div></div>)}</div>
}

export default function TechnicalToolkit({ groups }) {
  const root = useRef(null)
  const titles = useRef([])
  const nodes = useRef([])
  const orbits = useRef([])
  const status = useRef(null)
  const heading = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const element = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const arrival = smooth(clamp((window.innerHeight - element.getBoundingClientRect().top) / Math.max(1, window.innerHeight - 64)))
      element.style.setProperty('--toolkit-inset', `${reduced.matches ? 0 : (1 - arrival) * 5}vw`)
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

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1001px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setAnimated(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!animated) return
    const element = root.current
    let frame = 0
    const update = () => {
      frame = 0
      const width = element.clientWidth
      const height = window.innerHeight - 64
      const elapsed = Math.max(0, (64 - element.getBoundingClientRect().top) / window.innerHeight)
      const intro = smooth(clamp(elapsed / .75))
      const time = Math.max(0, elapsed - .75) / 1.8
      heading.current.style.setProperty('--title-x', `${mix(width * .45, 0, intro)}px`)
      heading.current.style.setProperty('--title-y', `${mix(height * .5 - 26, 26, intro)}px`)
      heading.current.style.setProperty('--title-anchor', `${(1 - intro) * -50}%`)
      heading.current.style.setProperty('--title-size', `${mix(Math.min(width * .095, 124), 42.4, intro)}px`)
      element.style.setProperty('--heading-arrival', intro)
      element.style.setProperty('--sequence-reveal', smooth(clamp((elapsed - .65) / .18)))
      const morph = smooth(clamp((time - 5) / 1.2))
      const centerX = width * .5
      const centerY = height * .54
      const radiusX = Math.min(width * .25, height * .34, 240)
      const radiusY = radiusX
      element.style.setProperty('--overview-opacity', morph)
      element.style.setProperty('--skill-icon-size', `${mix(60, 42, morph)}px`)
      element.style.setProperty('--skill-label-size', `${mix(20, 16, morph)}px`)
      element.style.setProperty('--skill-width', `${mix(148, 116, morph)}px`)
      element.style.setProperty('--orbit-width', `${radiusX * 2}px`)
      element.style.setProperty('--orbit-height', `${radiusY * 2}px`)
      status.current.textContent = time >= 5 ? 'All categories' : `${Math.min(4, Math.floor(time / 1.25) + 1).toString().padStart(2, '0')} / 04`

      groups.forEach((group, groupIndex) => {
        const local = time - groupIndex * 1.25
        const enter = smooth(clamp(local / .18))
        const exit = groupIndex < groups.length - 1 ? smooth(clamp((local - 1.06) / .19)) : 0
        const visibility = time < 5 ? (local < 0 ? 0 : 1 - exit) : groupIndex === groups.length - 1 ? 1 : smooth(clamp((morph - .25) / .4))
        const rowY = 112 + (height - 144) / 4 * (groupIndex + .5)
        const title = titles.current[groupIndex]
        title.style.opacity = visibility * (time < 5 ? enter : 1)
        title.style.transform = `translate(-50%,-50%) translate(${mix(0, width * .18 - centerX, morph)}px,${mix((1 - enter) * 35 - exit * 25, rowY - centerY, morph)}px) scale(${mix(.82 + enter * .18, 1, morph)})`
        title.style.fontSize = `${mix(Math.min(width * .03, radiusX * .17, 36), 20, morph)}px`
        title.style.fontFamily = morph < .65 ? "'Instrument Serif', Georgia, serif" : 'var(--sans)'
        title.style.fontStyle = morph < .65 ? 'italic' : 'normal'
        title.style.fontWeight = morph < .65 ? '400' : '500'
        title.style.width = `${mix(radiusX * 1.45, width * .28, morph)}px`
        orbits.current[groupIndex].style.opacity = visibility * enter * (1 - morph) * .65
        nodes.current[groupIndex].forEach((node, skillIndex) => {
          // Every icon uses the same upward entry, then follows its predecessor
          // counterclockwise around the ring. Earlier icons travel farther.
          const start = .18 + skillIndex * .11
          const emerge = smooth(clamp((local - start) / .15))
          const travelSteps = group.skills.length - 1 - skillIndex
          const steps = travelSteps === 0 ? 0 : travelSteps * glide((local - start - .15) / (.11 * travelSteps))
          const angle = -Math.PI / 2 - steps * Math.PI * 2 / group.skills.length
          const orbitX = Math.cos(angle) * radiusX * emerge
          const orbitY = Math.sin(angle) * radiusY * emerge
          const rowX = width * (.42 + skillIndex * .48 / Math.max(1, group.skills.length - 1)) - centerX
          node.style.transform = `translate(-50%,-50%) translate(${mix(orbitX, rowX, morph)}px,${mix(orbitY - exit * 25, rowY - centerY, morph)}px) scale(${mix(.2 + emerge * .8, .85, morph)})`
          node.style.opacity = visibility * (time < 5 ? emerge : 1)
        })
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [animated, groups])

  return <section id="skills" ref={root} className={`skills toolkit-showcase ${animated ? 'toolkit-animated' : 'toolkit-static'}`} aria-labelledby="toolkit-title">
    <div className="toolkit-stage">
      <header className="toolkit-header"><div><p>05 / Technical expertise</p><h2 ref={heading} id="toolkit-title">Technical Toolkit</h2></div>{animated && <span ref={status} aria-hidden="true">01 / 04</span>}</header>
      {animated ? <>
        <div className="toolkit-accessible"><SkillRows groups={groups} /></div>
        <div className="toolkit-orbital-scene" aria-hidden="true">
          <div className="toolkit-row-lines">{groups.map(group => <i key={group.title} />)}</div>
          {groups.map((group, groupIndex) => <div className="toolkit-orbit-group" key={group.title}>
            <div className="toolkit-orbit-ring" ref={element => { orbits.current[groupIndex] = element }} />
            <h3 className="toolkit-orbit-title" ref={element => { titles.current[groupIndex] = element }}>{group.title}</h3>
            {group.skills.map((skill, skillIndex) => { const Icon = skill.icon; return <div key={skill.name} className="toolkit-orbit-skill" ref={element => { (nodes.current[groupIndex] ??= [])[skillIndex] = element }}><Icon /><span>{skill.name}</span></div> })}
          </div>)}
        </div>
        <p className="toolkit-scroll-cue" aria-hidden="true">Scroll to explore <span>↓</span></p>
      </> : <SkillRows groups={groups} />}
    </div>
  </section>
}
