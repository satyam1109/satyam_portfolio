import { useEffect, useRef } from 'react'

const stories = {
  BuilMirai: {
    heading: 'Backend systems for smarter buildings.',
    points: [
      'Built Spring Boot microservices and REST APIs for building operations.',
      'Improved API response times by up to 60% through PostgreSQL partitioning.',
      'Moved event publishing to Debezium CDC with a transactional outbox for reliable delivery.',
    ],
  },
  'QAD Adaptive ERP': {
    heading: 'Modernizing enterprise workflows.',
    points: [
      'Developed backend functionality for 20+ ERP screens.',
      'Migrated workflows across EDI, Sales, Service and Inventory.',
      'Resolved production and pre-production issues, contributing to 100+ fixes across QAD and BuilMirai.',
    ],
  },
}

export default function ExperiencePanels({ project }) {
  const track = useRef(null)
  const story = stories[project.title]

  useEffect(() => {
    const element = track.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const distance = Math.max(1, element.offsetHeight - window.innerHeight)
      const pinTop = window.innerWidth <= 600 ? 76 : 88
      const raw = Math.min(1, Math.max(0, (pinTop - rect.top) / (distance * .9)))
      const progress = reduced.matches ? 1 : raw * raw * (3 - 2 * raw)
      element.style.setProperty('--panel-progress', progress)
      element.style.setProperty('--label-width', `${34 * (1 - progress)}%`)
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
    <article className="experience-case" aria-labelledby={`case-${project.number}`}>
      <div className="experience-scroll-track" ref={track}>
        <div className="experience-pin">
          <div className="experience-panels">
            <div className="experience-label" aria-hidden="true">
              <div className="experience-label-inner">
                <span className="case-number">{project.number} / GlobalLogic</span>
                <h3>{project.title}</h3>
                <p className="case-description">{story.heading}</p>
                <span className="case-scroll">Scroll to explore <span>↗</span></span>
              </div>
            </div>
            <section className="experience-contribution" aria-labelledby={`case-${project.number}`}>
              <div className="contribution-title"><p className="eyebrow">My contribution</p><span>{project.number}</span></div>
              <p className="contribution-project" id={`case-${project.number}`}>{project.title}</p>
              <ul>{story.points.map(point => <li key={point}>{point}</li>)}</ul>
              <p className="contribution-stack">{project.stack.slice(0, 5).join(' · ')}</p>
              <div className="case-light" aria-hidden="true"><i /></div>
            </section>
          </div>
          <details className="technical-details case-details">
            <summary>All contributions & complete stack — {project.title}</summary>
            <ul>{project.work.map(item => <li key={item}>{item}</li>)}</ul>
            <p className="details-stack">{project.stack.join(' · ')}</p>
          </details>
        </div>
      </div>
    </article>
  )
}
