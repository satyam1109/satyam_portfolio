import { useEffect, useRef } from 'react'

export default function ProjectShowcase({ project, presentation, tone = 'dark' }) {
  const card = useRef(null)
  const isRetainzy = project.featured

  useEffect(() => {
    if (presentation === 'panel') return
    const element = card.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const next = element.nextElementSibling
      const overlap = next ? Math.min(1, Math.max(0, (window.innerHeight - next.getBoundingClientRect().top) / window.innerHeight)) : 0
      element.dataset.scrollFit = String(element.offsetHeight <= window.innerHeight - 96)
      element.style.setProperty('--card-scale', reduced.matches ? 1 : 1 - overlap * .035)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(element)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
      resizeObserver.disconnect()
    }
  }, [presentation])

  return (
    <article className={`build-chapter build-tone-${tone} ${isRetainzy ? 'build-retainzy' : 'build-commerce'}`} ref={card} aria-labelledby={`build-title-${project.number}`}>
      <header className="build-card-header">
        <div><p className="build-label">{project.number} / {isRetainzy ? 'Learning & AI' : 'Commerce & AI'}</p><h3 id={`build-title-${project.number}`}>{project.title}</h3></div>
        {project.href && <a className="project-visit" href={project.href} target="_blank" rel="noopener noreferrer"><img src={project.logo} alt="" /><span>Visit Retainzy ↗</span></a>}
      </header>
      <div className="build-card-body">
        <div className="build-copy">
          <h4>{isRetainzy ? 'Turn learning into lasting knowledge.' : 'Find products by meaning.'}</h4>
          <p>{isRetainzy ? 'Generate learning cards from PDFs with Gemini and RAG. Review with spaced repetition and track what you remember.' : 'Semantic product search with local AI, backed by event-driven order processing and a React frontend.'}</p>
          <dl className="build-capabilities">
            <div><dt>{isRetainzy ? 'PDF → learning cards' : 'Semantic search'}</dt><dd>{isRetainzy ? 'Grounded in source evidence' : 'Ollama + pgvector'}</dd></div>
            <div><dt>{isRetainzy ? 'Spaced repetition' : 'Event-driven orders'}</dt><dd>{isRetainzy ? 'Scheduling + learning analytics' : 'Kafka + Spring Boot'}</dd></div>
          </dl>
          <p className="build-key-stack">{isRetainzy ? 'Spring Boot · Spring AI · React · PostgreSQL' : 'Java · Spring Boot · React · PostgreSQL'}</p>
        </div>
        <div className="build-visual">
          {isRetainzy ? <div className="build-browser"><div className="build-browser-bar"><span aria-hidden="true">● ● ●</span><span>retainzy.in</span><span>↗</span></div><img src={project.background} alt="Retainzy homepage with a learning card library, recall cards and review schedule" loading="lazy" /></div> : <div className="commerce-diagram" role="img" aria-label="Semantic search workflow: a natural language query is matched to products through Ollama embeddings and pgvector. Illustrative workflow, not a product screenshot.">
            <span className="diagram-caption">Search workflow</span>
            <div className="commerce-query"><span aria-hidden="true">⌕</span> Describe what you’re looking for</div>
            <div className="commerce-connector" aria-hidden="true" />
            <div className="commerce-engine"><span>Ollama</span><span aria-hidden="true">→</span><span>pgvector</span></div>
            <div className="commerce-connector" aria-hidden="true" />
            <div className="commerce-results"><span>Meaning</span><span>Similarity</span><span>Relevant products</span></div>
            <span className="diagram-caption">Query → embeddings → product matches</span>
          </div>}
        </div>
      </div>
      <details className="technical-details build-details"><summary>Engineering details & full stack</summary><ul>{project.work.map(item => <li key={item}>{item}</li>)}</ul><p className="details-stack">{project.stack.join(' · ')}</p></details>
    </article>
  )
}
