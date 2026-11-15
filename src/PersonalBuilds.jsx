import { useEffect, useRef, useState } from 'react'
import ProjectShowcase from './ProjectShowcase'
import './personal-builds.css'

const clamp = value => Math.min(1, Math.max(0, value))
const smooth = value => value * value * (3 - 2 * value)

export default function PersonalBuilds({ projects }) {
  const track = useRef(null)
  const panels = useRef([])
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1001px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setAnimated(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!animated) return
    const element = track.current
    let frame = 0
    const update = () => {
      frame = 0
      const offset = Math.max(0, (64 - element.getBoundingClientRect().top) / window.innerHeight)
      const raw = clamp(offset / 1.3)
      const progress = smooth(raw)
      element.style.setProperty('--portal-radius', `${115 * progress * progress}vmax`)
      element.style.setProperty('--intro-opacity', 1 - smooth(clamp((raw - .4) / .5)))
      element.style.setProperty('--intro-scale', 1 - progress * .06)
      const covers = projects.map((_, index) => index === 0 ? raw : clamp((offset - 1.95 - (index - 1) * 1.75) / 1.1))
      panels.current.forEach((panel, index) => {
        if (!panel) return
        panel.style.setProperty('--cover-y', `${(1 - smooth(covers[index])) * 100}%`)
        panel.inert = covers[index] < (index === 0 ? .82 : .98) || (covers[index + 1] ?? 0) > .98
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [animated, projects])

  const heading = <header className="builds-opening"><p className="builds-overline">04 / Independent projects</p><h2 id="personal-builds-title">Personal<br />builds<span>.</span></h2><p className="builds-opening-copy">AI, learning and commerce.<br />Built from idea to working product.</p></header>

  return (
    <section id="builds" className={`personal builds-showcase ${animated ? 'builds-animated' : 'builds-static'}`} aria-labelledby="personal-builds-title">
      {animated ? <>
        <div className="builds-intro-track" ref={track} style={{ height: `${295 + (projects.length - 1) * 175}svh` }}>
          <div className="builds-intro-stage">
            {heading}
            {projects.map((project, index) => <div key={project.title} ref={element => { panels.current[index] = element }} className={`builds-project-panel ${index === 0 ? 'builds-reveal-surface' : 'builds-cover-panel'}`} inert style={{ zIndex: index + 2 }} onToggleCapture={event => { if (!event.target.open) event.currentTarget.scrollTop = 0 }}>
              <ProjectShowcase project={project} presentation="panel" tone={index % 2 === 0 ? 'light' : 'dark'} />
            </div>)}
          </div>
        </div>
      </> : <>
        {heading}
        <div className="builds-static-list">{projects.map((project, index) => <ProjectShowcase key={project.title} project={project} tone={index % 2 === 0 ? 'light' : 'dark'} />)}</div>
      </>}
    </section>
  )
}
