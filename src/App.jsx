import { useEffect, useRef, useState } from 'react'
import { FaAws, FaJava } from 'react-icons/fa'
import {
  SiApachekafka, SiCss, SiGit, SiGithub, SiHtml5,
  SiJavascript, SiJira, SiMysql, SiPostgresql, SiReact, SiRedis,
  SiSpring, SiSpringboot, SiSubversion, SiTailwindcss,
} from 'react-icons/si'
import { TbApi, TbArrowsExchange, TbDatabaseCog } from 'react-icons/tb'
import { VscLayers } from 'react-icons/vsc'
import { SiKubernetes } from 'react-icons/si'

const skillGroups = [
  { number: '01', title: 'Backend systems', skills: [
    { name: 'Java', icon: FaJava }, { name: 'Spring', icon: SiSpring }, { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'Microservices', icon: VscLayers }, { name: 'REST APIs', icon: TbApi },
  ] },
  { number: '02', title: 'Data & messaging', skills: [
    { name: 'PostgreSQL', icon: SiPostgresql }, { name: 'MySQL', icon: SiMysql }, { name: 'Redis', icon: SiRedis },
    { name: 'Kafka', icon: SiApachekafka }, { name: 'Debezium CDC', icon: TbArrowsExchange }, { name: 'Flyway', icon: TbDatabaseCog },
  ] },
  { number: '03', title: 'Frontend & design', skills: [
    { name: 'React.js', icon: SiReact }, { name: 'JavaScript', icon: SiJavascript }, { name: 'HTML5', icon: SiHtml5 },
    { name: 'CSS', icon: SiCss }, { name: 'Tailwind CSS', icon: SiTailwindcss },
  ] },
  { number: '04', title: 'Tools & cloud', skills: [
    { name: 'Git', icon: SiGit }, { name: 'GitHub', icon: SiGithub }, { name: 'AWS', icon: FaAws },
    { name: 'Jira', icon: SiJira }, { name: 'Lens', icon: SiKubernetes }, { name: 'SVN', icon: SiSubversion },
  ] },
]

const professionalProjects = [
  {
    number: '01',
    type: 'Enterprise platform',
    title: 'BuilMirai',
    summary: 'Backend systems for Hitachi’s smart building management platform—designed for volume, reliability and near-real-time events.',
    work: [
      'Developed Spring Boot microservices and REST APIs for building operations and management workflows.',
      'Designed database partitioning for high-volume datasets, reducing API response times by up to 60%.',
      'Migrated event publishing from application-level Kafka producers to Debezium CDC with the Transactional Outbox Pattern.',
      'Eliminated dual-write inconsistencies while enabling reliable, near-real-time event streaming.',
    ],
    impact: 'Up to 60% faster API responses',
    stack: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'PostgreSQL', 'Kafka', 'Debezium CDC', 'Transactional Outbox'],
  },
  {
    number: '02',
    type: 'Legacy modernization',
    title: 'QAD Adaptive ERP',
    summary: 'Modernizing Progress 4GL business logic into Java services for a platform used by 500+ global manufacturers.',
    work: [
      'Contributed to modernizing QAD Adaptive ERP by migrating legacy Progress 4GL functionality to Java and Spring Boot.',
      'Analyzed legacy business logic and developed backend services for EDI, Sales, Service and Inventory modules.',
      'Maintained functional parity while moving critical workflows into a modern service architecture.',
      'Resolved 50+ production and pre-production defects through cross-module root-cause analysis.',
    ],
    impact: '500+ enterprise clients',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Progress 4GL', 'QAD ERP', 'EDI', 'SQL'],
  },
]

const personalProjects = [
  {
    number: '01',
    type: 'AI-powered commerce',
    title: 'Semantic Commerce',
    summary: 'A full-stack commerce platform that combines semantic discovery, local AI and reliable event-driven order processing.',
    work: [
      'Built semantic product search using vector embeddings stored in PostgreSQL with pgvector.',
      'Integrated Ollama for local embedding generation and intelligent query processing.',
      'Implemented JWT authentication and role-based access for users, sellers and administrators.',
      'Designed Kafka-based asynchronous workflows for order processing and notifications.',
      'Developed product, order and user REST APIs with a responsive React frontend.',
    ],
    impact: 'Search by meaning, not keywords',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'pgvector', 'Ollama', 'Kafka', 'Redis', 'React'],
  },
]

const profiles = [
  { number: '01', name: 'LinkedIn', handle: '/in/im-satyam', href: 'https://www.linkedin.com/in/im-satyam', status: 'Connect', previewImage: '/linkedin-profile-preview.png' },
  { number: '02', name: 'GitHub', handle: '@satyam1109', href: 'https://github.com/satyam1109', status: 'Explore code' },
  { number: '03', name: 'LeetCode', handle: '@satyam_ror__', href: 'https://leetcode.com/u/satyam_ror__/', status: 'Solve with me' },
  { number: '04', name: 'Medium', handle: '@satyamror1109', href: 'https://medium.com/@satyamror1109', status: 'Read my writing' },
]

const articles = [
  { number: '01', topic: 'Distributed systems', title: 'Making event streams reliable with the transactional outbox pattern', read: 'Draft in progress' },
  { number: '02', topic: 'Backend performance', title: 'What database partitioning taught me about designing for scale', read: 'Notes in progress' },
  { number: '03', topic: 'AI engineering', title: 'Building semantic product search with pgvector and local embeddings', read: 'Case study soon' },
]

const recognitions = [
  {
    year: '2025',
    title: 'Spotlight of the Month',
    image: '/spotlight-of-the-month-2025.png',
    alt: 'GlobalLogic Spotlight of the Month certificate awarded to Satyam Singh in October 2025',
  },
  {
    year: '2024',
    title: 'Marvel Award',
    image: '/marvel-award-2024.png',
    alt: 'GlobalLogic Marvel Award certificate awarded to Satyam Singh in November 2024',
  },
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
          context.fillStyle = `rgba(117, 104, 212, ${alpha})`
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
  const [activeSection, setActiveSection] = useState('top')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroProgress, setHeroProgress] = useState(0)
  const [activeCertificate, setActiveCertificate] = useState(null)

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const sectionIds = ['experience', 'builds', 'skills', 'profiles', 'writing', 'contact']
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
      setHeroProgress(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.68))))
      const probe = window.scrollY + window.innerHeight * 0.38
      let current = 'top'
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= probe) current = id
      })
      setActiveSection(current)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  useEffect(() => {
    if (!activeCertificate) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveCertificate(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeCertificate])

  const closeMenu = () => setMenuOpen(false)

  const illuminateGrid = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const shiftPortrait = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10
    event.currentTarget.style.setProperty('--portrait-x', `${x}px`)
    event.currentTarget.style.setProperty('--portrait-y', `${y}px`)
  }

  const resetPortrait = (event) => {
    event.currentTarget.style.setProperty('--portrait-x', '0px')
    event.currentTarget.style.setProperty('--portrait-y', '0px')
  }

  const descriptionProgress = Math.min(1, Math.max(0, (heroProgress - 0.72) / 0.28))
  const portraitExitProgress = Math.min(1, Math.max(0, (heroProgress - 0.86) / 0.14))

  const heroMotion = {
    '--hero-progress': heroProgress,
    '--hero-clip': `${heroProgress * 100}%`,
    '--hero-divider': `${52 + heroProgress * 48}%`,
    '--hero-shift': `${heroProgress * 13}vw`,
    '--hero-copy-width': `${52 + heroProgress * 48}vw`,
    '--hero-second-indent': `${9 - heroProgress * 9}vw`,
    '--hero-eyebrow-opacity': 1 - heroProgress * 0.82,
    '--hero-chrome-opacity': 1 - heroProgress,
    '--hero-description-opacity': descriptionProgress,
    '--hero-description-y': `${(1 - descriptionProgress) * 42}px`,
    '--hero-description-blur': `${(1 - descriptionProgress) * 8}px`,
    '--hero-description-events': descriptionProgress > 0.15 ? 'auto' : 'none',
    '--hero-portrait-opacity': 1 - portraitExitProgress,
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
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="monogram" aria-label="Home">SS<span className="signal-dot" /></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          <a className={activeSection === 'experience' ? 'active' : ''} href="#experience" onClick={closeMenu}>Experience</a>
          <a className={activeSection === 'builds' ? 'active' : ''} href="#builds" onClick={closeMenu}>Builds</a>
          <a className={activeSection === 'writing' ? 'active' : ''} href="#writing" onClick={closeMenu}>Writing</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/satyam-singh-resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Résumé <Arrow diagonal /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" id="top" style={heroMotion} onPointerMove={shiftPortrait} onPointerLeave={resetPortrait}>
          <div className="hero-stage">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span>SYS.01</span> SOFTWARE × DESIGN × SYSTEMS</p>
              <h1 aria-label="Satyam Singh">
                <span className="hero-name first">SATYAM</span>
                <span className="hero-name second">SINGH</span>
              </h1>
              <div className="hero-description">
                <p>Software engineer and designer building reliable systems, intelligent products and thoughtful digital experiences.</p>
                <a className="circle-link" href="#experience" aria-label="Explore experience and selected work"><Arrow /></a>
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

            <div className="hero-divider" aria-hidden="true" />
            <div className="hero-index" aria-hidden="true">
              <span className="active">01</span><span>02</span><span>03</span><span>04</span>
            </div>
            <div className="scroll-note"><span className="scroll-line" />SCROLL TO REFRAME</div>
          </div>
        </section>

        <div className="signal-marquee" aria-hidden="true">
          <div>
            <span>SOFTWARE ENGINEER</span><i>◆</i><span>DISTRIBUTED SYSTEMS</span><i>◆</i><span>PRODUCT THINKING</span><i>◆</i><span>INTERFACE DESIGN</span><i>◆</i>
            <span>SOFTWARE ENGINEER</span><i>◆</i><span>DISTRIBUTED SYSTEMS</span><i>◆</i><span>PRODUCT THINKING</span><i>◆</i><span>INTERFACE DESIGN</span><i>◆</i>
          </div>
        </div>

        <section className="work experience section-pad dark-surface" id="experience" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>02</span><p>Experience / Recognition</p></Reveal>
          <div className="experience-grid experience-lead">
            <Reveal className="timeline">
              <div className="timeline-line" />
              <article>
                <p className="eyebrow">03/2024 — PRESENT</p>
                <h2>Software Engineer</h2>
                <div className="company-identity">
                  <img src="/globallogic-logo.png" alt="GlobalLogic, a Hitachi Group Company" />
                </div>
                <p>Building Spring Boot microservices, distributed data systems and enterprise modernization solutions from Bengaluru, India.</p>
              </article>
            </Reveal>
            <Reveal className="recognition" delay={140}>
              <p className="eyebrow">RECOGNITION.LOG</p>
              {recognitions.map((recognition) => (
                <div className="recognition-entry" key={recognition.title}>
                  <span className="recognition-year">{recognition.year}</span>
                  <p>{recognition.title}</p>
                  <button
                    className="certificate-thumb"
                    type="button"
                    onClick={() => setActiveCertificate(recognition)}
                    aria-label={`View ${recognition.title} certificate`}
                  >
                    <img src={recognition.image} alt="" loading="lazy" />
                    <span>VIEW</span>
                  </button>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="experience-metrics">
            <div><strong>60%</strong><span>API response-time reduction</span></div>
            <div><strong>500+</strong><span>Global manufacturing clients</span></div>
            <div><strong>50+</strong><span>Production defects resolved</span></div>
          </Reveal>
          <Reveal className="role-projects-heading">
            <span>PROJECTS WITHIN THIS ROLE</span>
            <p>Selected systems and modernization work delivered as part of my current role.</p>
          </Reveal>
          <div className="project-list">
            {professionalProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 80}>
                <article className="project-card" tabIndex="0">
                  <div className="project-number">{project.number}</div>
                  <div className="project-content">
                    <div className="project-summary-view">
                      <p className="project-type">{project.type}</p>
                      <h2>{project.title}</h2>
                      <p className="project-summary">{project.summary}</p>
                      <p className="project-hint">HOVER OR FOCUS TO EXPLORE MY CONTRIBUTION <span>→</span></p>
                    </div>
                    <div className="project-detail-view">
                      <p className="project-type">My contribution / {project.title}</p>
                      <ul>{project.work.map(item => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </div>
                  <div className="project-meta">
                    <p>{project.impact}</p>
                    <span className="stack-label">COMPLETE STACK</span>
                    <div>{project.stack.map(item => <span key={item}>{item}</span>)}</div>
                  </div>
                  <div className="project-arrow"><span className="closed">↗</span><span className="open">×</span></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="personal section-pad dark-surface" id="builds" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>03</span><p>Personal Builds</p></Reveal>
          <Reveal className="project-section-heading personal-heading">
            <h2>Personal<br /><em>projects.</em></h2>
            <p>Products and technical experiments built independently—from intelligent search and local AI to full-stack product systems.</p>
          </Reveal>
          <div className="personal-layout">
            {personalProjects.map((project) => (
              <Reveal className="personal-feature" key={project.title}>
                <p className="project-type">{project.type}</p>
                <p className="personal-number">{project.number} / FEATURED BUILD</p>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <ul className="personal-contributions">{project.work.map(item => <li key={item}>{item}</li>)}</ul>
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

        <section className="skills section-pad dark-surface" id="skills" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>04</span><p>Technology / Categorized Toolkit</p></Reveal>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <Reveal className="skill-group" key={group.title} delay={index * 70}>
                <div className="skill-heading"><span>{group.number}</span><h3>{group.title}</h3></div>
                <div className="skill-list">{group.skills.map(skill => {
                  const Icon = skill.icon
                  return <div className="skill-item" key={skill.name}><Icon aria-hidden="true" /><span>{skill.name}</span></div>
                })}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="profiles section-pad dark-surface" id="profiles" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>05</span><p>Elsewhere / Developer Profiles</p></Reveal>
          <div className="profile-layout">
            <Reveal className="profile-intro">
              <h2 className="profiles-title">Find me<br /><em>in the wild.</em></h2>
              <div className="profile-status"><span className="signal-dot" /><p>One person.<br />Different places.</p></div>
            </Reveal>
            <div className="profile-rows">
              {profiles.map((profile, index) => {
                const Tag = profile.href ? 'a' : 'div'
                return (
                  <Reveal key={profile.name} delay={index * 70}>
                    <Tag className={`profile-row ${!profile.href ? 'disabled' : ''} ${profile.previewImage ? 'has-preview' : ''}`} href={profile.href || undefined} target={profile.href ? '_blank' : undefined} rel="noreferrer">
                      {profile.previewImage && <img className="profile-preview-image" src={profile.previewImage} alt="" aria-hidden="true" />}
                      <span className="profile-number">{profile.number}</span>
                      <h3>{profile.name}</h3>
                      <div className="profile-copy"><p>{profile.handle}</p><span>{profile.status}</span></div>
                      <span className="profile-arrow">{profile.href ? '→' : '·'}</span>
                    </Tag>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="writing section-pad dark-surface" id="writing" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>06</span><p>Writing / Engineering Notes</p></Reveal>
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
          <Reveal className="section-kicker light"><span>07</span><p>Start a conversation</p></Reveal>
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

      {activeCertificate && (
        <div className="certificate-lightbox" role="dialog" aria-modal="true" aria-label={`${activeCertificate.title} certificate`} onClick={() => setActiveCertificate(null)}>
          <div className="certificate-dialog" onClick={(event) => event.stopPropagation()}>
            <div className="certificate-dialog-head">
              <div><span>{activeCertificate.year}</span><p>{activeCertificate.title}</p></div>
              <button type="button" onClick={() => setActiveCertificate(null)} aria-label="Close certificate preview" autoFocus>×</button>
            </div>
            <img src={activeCertificate.image} alt={activeCertificate.alt} />
            <p className="certificate-hint">CLICK OUTSIDE OR PRESS ESC TO CLOSE</p>
          </div>
        </div>
      )}

      <aside className="section-rail" aria-hidden="true">
        <span>{activeSection === 'top' ? '01' : String(['experience', 'builds', 'skills', 'profiles', 'writing', 'contact'].indexOf(activeSection) + 2).padStart(2, '0')}</span>
        <div><i style={{ transform: `scaleY(${scrollProgress})` }} /></div>
        <span>07</span>
      </aside>

      <footer>
        <a href="#top" className="monogram">SS</a>
        <p>© {new Date().getFullYear()} Satyam Singh</p>
        <div><span className="signal-dot" /> Bengaluru / {time} IST</div>
      </footer>
    </div>
  )
}

export default App
