import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  { number: '01', title: 'Backend systems', skills: ['Java', 'Spring', 'Spring Boot', 'Microservices', 'REST APIs'] },
  { number: '02', title: 'Data & messaging', skills: ['PostgreSQL', 'MySQL', 'Redis', 'Kafka', 'Debezium CDC', 'Flyway'] },
  { number: '03', title: 'Frontend & design', skills: ['React.js', 'JavaScript', 'HTML5', 'CSS', 'Tailwind CSS'] },
  { number: '04', title: 'Tools & cloud', skills: ['Git', 'GitHub', 'AWS', 'Jira', 'Lens', 'SVN'] },
]

const professionalProjects = [
  {
    number: '01',
    type: 'Enterprise platform',
    title: 'BuilMirai',
    summary: 'Backend systems for Hitachi’s smart building management platform—designed for volume, reliability and near-real-time events.',
    impact: 'Up to 60% faster API responses',
    stack: ['Spring Boot', 'PostgreSQL', 'Kafka', 'Debezium'],
  },
  {
    number: '02',
    type: 'Legacy modernization',
    title: 'QAD Adaptive ERP',
    summary: 'Modernizing Progress 4GL business logic into Java services for a platform used by 500+ global manufacturers.',
    impact: '500+ enterprise clients',
    stack: ['Java', 'Spring Boot', 'REST', 'Progress 4GL'],
  },
]

const personalProjects = [
  {
    number: '01',
    type: 'AI-powered commerce',
    title: 'Semantic Commerce',
    summary: 'A full-stack commerce platform with vector search, local LLM embeddings, RBAC and asynchronous order workflows.',
    impact: 'Search by meaning, not keywords',
    stack: ['Java', 'pgvector', 'Ollama', 'React'],
  },
]

const profiles = [
  { number: '01', name: 'LinkedIn', handle: '/in/im-satyam', href: 'https://www.linkedin.com/in/im-satyam', status: 'Connect' },
  { number: '02', name: 'GitHub', handle: '@satyam1109', href: 'https://github.com/satyam1109', status: 'Explore code' },
  { number: '03', name: 'LeetCode', handle: 'Profile incoming', href: null, status: 'Soon' },
  { number: '04', name: 'Medium', handle: 'Writing incoming', href: null, status: 'Soon' },
]

const articles = [
  { number: '01', topic: 'Distributed systems', title: 'Making event streams reliable with the transactional outbox pattern', read: 'Draft in progress' },
  { number: '02', topic: 'Backend performance', title: 'What database partitioning taught me about designing for scale', read: 'Notes in progress' },
  { number: '03', topic: 'AI engineering', title: 'Building semantic product search with pgvector and local embeddings', read: 'Case study soon' },
]

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const glyphs = '01{}[]<>/;:SATYAMCODEDESIGN'
    let columns = []
    let animationFrame
    let lastDraw = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Array.from({ length: Math.ceil(window.innerWidth / 26) }, () => Math.random() * -50)
    }

    const draw = (time) => {
      if (time - lastDraw > 76) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.font = '11px monospace'
        columns.forEach((position, index) => {
          const char = glyphs[Math.floor(Math.random() * glyphs.length)]
          const x = index * 26
          const y = position * 18
          const alpha = 0.025 + Math.random() * 0.07
          context.fillStyle = `rgba(139, 164, 255, ${alpha})`
          context.fillText(char, x, y)
          columns[index] = y > window.innerHeight && Math.random() > 0.985 ? Math.random() * -30 : position + 1
        })
        lastDraw = time
      }
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationFrame = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.14 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` }}>
      {children}
    </div>
  )
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState('idle')
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const illuminateGrid = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setFormState('sending')
    const form = event.currentTarget
    const payload = new FormData(form)

    try {
      const response = await fetch('https://formsubmit.co/ajax/satyamror1109@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      })
      if (!response.ok) throw new Error('Unable to send')
      form.reset()
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="site-shell">
      <MatrixRain />
      <div className="noise" aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="monogram" aria-label="Home">SS<span className="signal-dot" /></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#writing" onClick={closeMenu}>Writing</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/satyam-singh-resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Résumé <Arrow diagonal /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span>SYS.01</span> SOFTWARE × DESIGN × SYSTEMS</p>
            <h1 aria-label="Satyam Singh">
              <span className="hero-name first">SATYAM</span>
              <span className="hero-name second">SINGH</span>
            </h1>
            <div className="hero-description">
              <p>Software engineer and designer building resilient systems with a human pulse.</p>
              <a className="circle-link" href="#work" aria-label="Explore selected work"><Arrow /></a>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait-frame">
              <img src="/satyam-portrait.png" alt="Satyam Singh working at his desk" />
              <div className="portrait-scan" aria-hidden="true" />
            </div>
            <div className="portrait-code" aria-hidden="true">
              <span>STATUS // AVAILABLE</span>
              <span>LOC // BLR, IN</span>
            </div>
          </div>

          <div className="hero-index" aria-hidden="true">
            <span className="active">01</span><span>02</span><span>03</span><span>04</span>
          </div>
          <div className="scroll-note"><span className="scroll-line" />SCROLL TO DECODE</div>
        </section>

        <section className="manifesto section-pad dark-surface" id="about" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>01</span><p>Profile / Philosophy</p></Reveal>
          <Reveal>
            <p className="manifesto-text">I translate complex backend systems into <em>fast, reliable</em> products—and shape interfaces that make the complexity disappear.</p>
          </Reveal>
          <Reveal className="about-grid" delay={120}>
            <div className="about-copy">
              <p>I’m a software engineer at GlobalLogic (Hitachi Group), working where distributed systems, data and thoughtful product design meet. I care about performance under the surface and clarity above it.</p>
              <a href="/satyam-singh-resume.pdf" target="_blank" rel="noreferrer" className="text-link">Download full résumé <Arrow diagonal /></a>
            </div>
            <div className="metric"><strong>60%</strong><span>API response-time reduction</span></div>
            <div className="metric"><strong>500+</strong><span>Global manufacturing clients</span></div>
          </Reveal>
        </section>

        <section className="work section-pad dark-surface" id="work" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>02</span><p>Professional Systems / Selected Impact</p></Reveal>
          <Reveal className="section-intro"><p>Production work shaped inside complex enterprise environments—built with teams, tested at scale, and measured by real operational impact.</p></Reveal>
          <div className="project-list">
            {professionalProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 80}>
                <article className="project-card">
                  <div className="project-number">{project.number}</div>
                  <div className="project-main">
                    <p className="project-type">{project.type}</p>
                    <h2>{project.title}</h2>
                    <p className="project-summary">{project.summary}</p>
                  </div>
                  <div className="project-meta">
                    <p>{project.impact}</p>
                    <div>{project.stack.map(item => <span key={item}>{item}</span>)}</div>
                  </div>
                  <div className="project-arrow"><Arrow diagonal /></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="personal section-pad dark-surface" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>03</span><p>Independent Builds / Personal Projects</p></Reveal>
          <div className="personal-layout">
            {personalProjects.map((project) => (
              <Reveal className="personal-feature" key={project.title}>
                <p className="project-type">{project.type}</p>
                <p className="personal-number">{project.number} / FEATURED BUILD</p>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <div className="personal-footer"><span>{project.impact}</span><div>{project.stack.map(item => <span key={item}>{item}</span>)}</div></div>
              </Reveal>
            ))}
            <Reveal className="project-slots" delay={120}>
              <div><span>02</span><p>Next personal build</p><em>Reserved</em></div>
              <div><span>03</span><p>Experimental project</p><em>Reserved</em></div>
              <p className="slot-note">This collection will grow with open-source work, experiments and products outside my professional role.</p>
            </Reveal>
          </div>
        </section>

        <section className="experience section-pad dark-surface" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>04</span><p>Experience / Recognition</p></Reveal>
          <div className="experience-grid">
            <Reveal className="timeline">
              <div className="timeline-line" />
              <article>
                <p className="eyebrow">03/2024 — PRESENT</p>
                <h2>Software Engineer</h2>
                <h3>GlobalLogic <span>(Hitachi Group)</span></h3>
                <p>Spring Boot microservices, distributed data systems and enterprise modernization from Bengaluru, India.</p>
              </article>
            </Reveal>
            <Reveal className="recognition" delay={140}>
              <p className="eyebrow">RECOGNITION.LOG</p>
              <div><span>2025</span><p>SpotLight of the Month</p></div>
              <div><span>2024</span><p>Marvel Award</p></div>
              <div><span>2023</span><p>B.Tech, Computer Science</p></div>
            </Reveal>
          </div>
        </section>

        <section className="skills section-pad dark-surface" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>05</span><p>Technology / Categorized Toolkit</p></Reveal>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <Reveal className="skill-group" key={group.title} delay={index * 70}>
                <div className="skill-heading"><span>{group.number}</span><h3>{group.title}</h3></div>
                <div className="skill-list">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="profiles section-pad dark-surface" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>06</span><p>Elsewhere / Developer Profiles</p></Reveal>
          <Reveal><h2 className="profiles-title">Find me across<br /><em>the wider web.</em></h2></Reveal>
          <div className="profile-grid">
            {profiles.map((profile, index) => {
              const Tag = profile.href ? 'a' : 'div'
              return (
                <Reveal key={profile.name} delay={index * 70}>
                  <Tag className={`profile-card ${!profile.href ? 'disabled' : ''}`} href={profile.href || undefined} target={profile.href ? '_blank' : undefined} rel="noreferrer">
                    <div><span>{profile.number}</span><span>{profile.status}</span></div>
                    <h3>{profile.name}</h3>
                    <p>{profile.handle}</p>
                    <span className="profile-arrow">{profile.href ? '↗' : '·'}</span>
                  </Tag>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="writing section-pad dark-surface" id="writing" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>07</span><p>Writing / Engineering Notes</p></Reveal>
          <div className="writing-grid">
            <Reveal className="writing-lead">
              <p className="eyebrow">THINKING IN PUBLIC</p>
              <h2>Notes from inside<br /><em>the system.</em></h2>
              <p>Long-form ideas about reliable backends, intelligent products and the details that make software feel considered.</p>
            </Reveal>
            <div className="article-list">
              {articles.map((article, index) => (
                <Reveal key={article.title} delay={index * 80}>
                  <article>
                    <span className="article-number">{article.number}</span>
                    <div><p>{article.topic}</p><h3>{article.title}</h3><span>{article.read}</span></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad dark-surface" id="contact" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker light"><span>08</span><p>Start a conversation</p></Reveal>
          <div className="contact-grid">
            <Reveal>
              <p className="contact-overline">HAVE A PROJECT, ROLE OR IDEA?</p>
              <h2>Let’s make<br /><em>something real.</em></h2>
              <p className="contact-sub">Tell me what you’re building. I’ll get back to you over email.</p>
              <a className="email-link" href="mailto:satyamror1109@gmail.com">satyamror1109@gmail.com <Arrow diagonal /></a>
            </Reveal>
            <Reveal delay={120}>
              <form className="contact-form" onSubmit={submitForm}>
                <input type="hidden" name="_subject" value="New portfolio enquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" className="honeypot" tabIndex="-1" autoComplete="off" />
                <label><span>01 / Your name</span><input name="name" type="text" placeholder="Jane Doe" required /></label>
                <label><span>02 / Email address</span><input name="email" type="email" placeholder="jane@company.com" required /></label>
                <label><span>03 / Your message</span><textarea name="message" placeholder="A little about your idea, project or role..." rows="4" required /></label>
                <button type="submit" disabled={formState === 'sending'}>
                  <span>{formState === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span><Arrow diagonal />
                </button>
                <div className="form-status" role="status" aria-live="polite">
                  {formState === 'success' && 'Message transmitted. I’ll be in touch soon.'}
                  {formState === 'error' && <>Transmission failed. Email me directly at <a href="mailto:satyamror1109@gmail.com">satyamror1109@gmail.com</a>.</>}
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <a href="#top" className="monogram">SS</a>
        <p>© {new Date().getFullYear()} Satyam Singh</p>
        <div><span className="signal-dot" /> Bengaluru / {time} IST</div>
      </footer>
    </div>
  )
}

export default App
