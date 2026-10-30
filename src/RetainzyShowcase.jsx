import { useEffect, useRef, useState } from 'react'
import './retainzy-story.css'

const chapters = [
  {
    name: 'Capture', title: 'Give your knowledge\na place to live.',
    description: 'Rich learning cards keep explanations, code, tables and images together. Organize what matters and make it easy to revisit.',
    detail: 'Rich text · Code & tables · Cloudinary uploads',
  },
  {
    name: 'Generate', title: 'From a document\nto a discovery.',
    description: 'Turn PDFs into topic-based cards with Gemini and retrieval-augmented generation. Follow the source evidence, then refine a draft through conversation.',
    detail: 'Spring AI · Gemini · RAG · Vector embeddings',
  },
  {
    name: 'Retain', title: 'Build understanding.\nKeep it with you.',
    description: 'Spaced repetition brings learning back when it’s due. Review your cards and follow your learning analytics to make a lasting habit.',
    detail: 'Spaced repetition · Learning analytics',
  },
]

export default function RetainzyShowcase({ project }) {
  const root = useRef(null)
  const steps = useRef([])
  const current = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (!root.current) return
      const anchor = window.innerHeight * 0.62
      const positions = steps.current.map(step => step.getBoundingClientRect())
      let next = 0
      positions.forEach((rect, index) => { if (rect.top <= anchor) next = index })
      if (current.current !== next) { current.current = next; setActive(next) }
      const first = positions[0]
      const last = positions[positions.length - 1]
      const progress = Math.min(1, Math.max(0, (anchor - first.top) / Math.max(1, last.bottom - first.top)))
      root.current.style.setProperty('--story-progress', progress)
      root.current.style.setProperty('--story-drift', `${(progress - 0.5) * -24}px`)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <article className="retainzy-story" ref={root} aria-labelledby="retainzy-title">
      <header className="story-heading">
        <div><p className="eyebrow">01 / Flagship project</p><h2 id="retainzy-title">Retainzy<span>.</span></h2></div>
        <a className="project-visit" href={project.href} target="_blank" rel="noopener noreferrer"><img src={project.logo} alt="Retainzy" /><span>Visit Retainzy ↗</span></a>
      </header>
      <div className="story-intro"><p>Less rereading.<br /><em>More remembering.</em></p><span>An AI-powered learning & knowledge retention platform.<br />Designed and built from interface to infrastructure.</span></div>

      <div className="story-layout">
        <div className="story-visual">
          <div className="story-orbit" aria-hidden="true" />
          <div className="story-preview" data-chapter={active}>
            <div className="preview-toolbar"><span className="preview-lights" aria-hidden="true"><i /><i /><i /></span><span>retainzy.in</span><span>↗</span></div>
            <div className="preview-scenes">
              <div className={`preview-scene capture-scene ${active === 0 ? 'scene-active' : ''}`} aria-hidden={active !== 0}>
                <img src={project.background} alt="Retainzy homepage showing a card library, active recall cards and a review schedule" loading="lazy" />
              </div>
              <div className={`preview-scene generate-scene ${active === 1 ? 'scene-active' : ''}`} aria-hidden="true">
                <span className="scene-label">DOCUMENT → UNDERSTANDING</span>
                <div className="rag-source"><span>PDF</span><div><i /><i /><i /></div><small>Your source material</small></div>
                <div className="rag-connection"><i /><span>Gemini + RAG</span><i /></div>
                <div className="rag-card"><span>AI-GENERATED DRAFT</span><h3>What’s the core idea?</h3><p>A focused learning card, grounded in your document.</p><small>↗ Source evidence attached</small></div>
              </div>
              <div className={`preview-scene recall-scene ${active === 2 ? 'scene-active' : ''}`} aria-hidden="true">
                <span className="scene-label">A LITTLE PRACTICE. LASTING KNOWLEDGE.</span>
                <div className="recall-stack"><div className="recall-behind" /><div className="recall-card"><span>TIME TO REVISIT</span><h3>What do<br />you remember?</h3><p>Recall first.<br />Reveal. Reflect. Repeat.</p><span className="recall-check">✓ Ready for review</span></div></div>
                <div className="review-rhythm"><span>LEARN</span><i /><span>REVISIT</span><i /><span>RETAIN</span></div>
              </div>
            </div>
            <div className="preview-caption"><span>0{active + 1} / {chapters[active].name}</span><span>{active === 0 ? 'Product preview' : 'Workflow illustration'}</span></div>
          </div>
          <div className="story-chapters" aria-hidden="true">{chapters.map((chapter, index) => <span className={index === active ? 'chapter-active' : ''} key={chapter.name}><small>0{index + 1}</small>{chapter.name}</span>)}</div>
          <div className="story-light-track" aria-hidden="true"><i /></div>
        </div>

        <div className="story-steps">
          {chapters.map((chapter, index) => (
            <section className={`story-step ${index === active ? 'step-active' : ''}`} key={chapter.name} ref={element => { steps.current[index] = element }} aria-labelledby={`story-step-${index}`}>
              <p className="eyebrow"><span>0{index + 1}</span> / {chapter.name}</p>
              <h3 id={`story-step-${index}`}>{chapter.title}</h3>
              <p>{chapter.description}</p>
              <span className="story-detail">{chapter.detail}</span>
            </section>
          ))}
        </div>
      </div>
      <footer className="story-engineering">
        <div><p className="eyebrow">Behind the experience</p><h3>One product.<br /><em>Every layer.</em></h3><p>Google OAuth 2.0, JWT and role-based access protect the platform, with a dedicated admin portal for users and cards. Docker containers, AWS infrastructure, Vercel and GitHub Actions support deployment.</p></div>
        <div className="story-stack"><p className="eyebrow">Technology stack</p><div>{project.stack.map(item => <span key={item}>{item}</span>)}</div></div>
      </footer>
    </article>
  )
}
