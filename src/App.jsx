import { useEffect, useRef, useState } from 'react'
import PersonalBuilds from './PersonalBuilds'
import ExperiencePanels from './ExperiencePanels'
import LandingHero from './LandingHero'
import TechnicalToolkit from './TechnicalToolkit'
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
    summary: 'Built REST APIs for smart-building operations, improved API response times by up to 60% through PostgreSQL partitioning, and moved event publishing to Debezium CDC with a transactional outbox.',
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
    summary: 'Migrated Progress 4GL workflows to Java and Spring Boot across EDI, Sales, Service and Inventory, developing backend functionality for 20+ ERP screens.',
    work: [
      'Contributed to modernizing QAD Adaptive ERP by migrating legacy Progress 4GL functionality to Java and Spring Boot.',
      'Developed backend functionality for 20+ ERP screens across EDI, Sales, Service and Inventory modules.',
      'Maintained functional parity while moving critical workflows into a modern service architecture.',
      'Diagnosed production and pre-production defects through cross-module root-cause analysis, contributing to 100+ resolutions across QAD and BuilMirai.',
    ],
    impact: '20+ ERP screens developed',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Progress 4GL', 'QAD ERP', 'EDI', 'SQL'],
  },
]

const personalProjects = [
  {
    number: '01',
    type: 'AI-powered learning & knowledge retention',
    title: 'Retainzy',
    href: 'https://retainzy.in',
    logo: '/retainzy-logo.png',
    background: '/retainzy-project-preview.png',
    featured: true,
    summary: 'A full-stack learning platform that turns knowledge into rich learning cards, helps learners retain it through spaced repetition, and uses AI to generate cards from PDFs.',
    work: [
      'Built rich learning cards with formatted text, code, tables and Cloudinary image uploads, alongside spaced-repetition scheduling and learning analytics.',
      'Implemented Google OAuth 2.0, JWT authentication and role-based access control, with a dedicated admin portal for viewing users and their cards.',
      'Developed PDF-based retrieval-augmented generation using Spring AI, Gemini and vector embeddings to create topic-based cards with source evidence.',
      'Added conversational draft refinement with chat history so learners can shape AI-generated cards before saving them.',
      'Containerized services with Docker, with AWS EC2, ECR and RDS, Vercel and GitHub Actions in the deployment stack.',
    ],
    impact: 'Learn once. Remember longer.',
    stack: ['LLM', 'RAG', 'Spring Boot', 'Spring AI', 'React', 'PostgreSQL', 'Gemini', 'Cloudinary', 'Docker', 'AWS EC2', 'AWS ECR', 'AWS RDS', 'Vercel', 'GitHub Actions'],
  },
  {
    number: '02',
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

const impactStats = [
  { label: 'Production API latency', value: '15s → 2s', qualifier: 'Over 15s → up to 2s', detail: 'Optimized database views, indexes and existing code flows.', featured: true },
  { label: 'API performance', value: '60%', qualifier: 'Up to 60% faster', detail: 'PostgreSQL partitioning for high-volume datasets in BuilMirai.' },
  { label: 'Production reliability', value: '100+', qualifier: 'Defects resolved', detail: 'Production and pre-production issues across QAD and BuilMirai.' },
  { label: 'ERP development', value: '20+', qualifier: 'ERP screens', detail: 'Backend functionality built with Java and Spring Boot for QAD Adaptive ERP.' },
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
  const [activeSection, setActiveSection] = useState('top')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCertificate, setActiveCertificate] = useState(null)

  useEffect(() => {
    const sectionIds = ['impact', 'experience', 'builds', 'skills', 'profiles', 'contact']
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
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
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="monogram" aria-label="Home">SS<span className="signal-dot" /></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          <a className={activeSection === 'experience' ? 'active' : ''} href="#experience" onClick={closeMenu}>Experience</a>
          <a className={activeSection === 'builds' ? 'active' : ''} href="#builds" onClick={closeMenu}>Builds</a>
          <a className={activeSection === 'skills' ? 'active' : ''} href="#skills" onClick={closeMenu}>Skills</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/satyam-singh-resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Résumé <Arrow diagonal /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span /><span />
        </button>
      </header>

      <main>
        <LandingHero />

        <section className="impact-section section-pad dark-surface" id="impact" onPointerMove={illuminateGrid} aria-labelledby="impact-title">
          <Reveal className="section-kicker"><span>02</span><p>Highlights</p></Reveal>
          <Reveal className="impact-heading"><h2 id="impact-title">Selected <em>impact.</em></h2><p>Results from my work at GlobalLogic.</p></Reveal>
          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <Reveal className={`impact-card ${stat.featured ? 'impact-featured' : ''}`} key={stat.label} delay={index * 90}>
                <p className="eyebrow">{stat.label}</p>
                <strong>{stat.value}</strong>
                <h3>{stat.qualifier}</h3>
                <p className="impact-detail">{stat.detail}</p>
                <span className="impact-marker" aria-hidden="true">0{index + 1}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="work experience section-pad dark-surface" id="experience" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>03</span><p>Experience / Recognition</p></Reveal>
          <div className="experience-grid experience-lead">
            <Reveal className="timeline">
              <div className="timeline-line" />
              <article>
                <p className="eyebrow">03/2024 — PRESENT</p>
                <h2>Software Engineer</h2>
                <div className="company-identity">
                  <img src="/globallogic-logo.png" alt="GlobalLogic, a Hitachi Group Company" />
                </div>
                <p>Backend development for Hitachi’s BuilMirai platform and QAD Adaptive ERP: REST APIs, database optimization and legacy modernization.</p>
              </article>
            </Reveal>
            <Reveal className="recognition" delay={140}>
              <p className="eyebrow">Recognition</p>
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
          <Reveal className="role-projects-heading">
            <h3>Projects & contributions</h3>
          </Reveal>
          <div className="project-list">
            {professionalProjects.map(project => <ExperiencePanels key={project.title} project={project} />)}
          </div>
        </section>

        <PersonalBuilds projects={personalProjects} />

        <TechnicalToolkit groups={skillGroups} />

        <section className="profiles section-pad dark-surface" id="profiles" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker"><span>06</span><p>Find me across</p></Reveal>
          <div className="profile-layout">
            <Reveal className="profile-intro">
              <h2 className="profiles-title">Find me online.</h2>
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

        <section className="contact section-pad dark-surface" id="contact" onPointerMove={illuminateGrid}>
          <Reveal className="section-kicker light"><span>07</span><p>Contact</p></Reveal>
          <div className="contact-grid">
            <Reveal>
              <h2>Bring me a problem.<br /><em>I’ll build the solution.</em></h2>
              <p className="contact-sub">Have a technical challenge, a product idea or a role in mind? Tell me about it.</p>
              <p className="availability-note">Open to Java Backend and Full Stack roles.</p>
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
                  <span>{formState === 'sending' ? 'Sending…' : 'Send message'}</span><Arrow diagonal />
                </button>
                <div className="form-status" role="status" aria-live="polite">
                  {formState === 'success' && 'Message sent. I’ll be in touch soon.'}
                  {formState === 'error' && <>Couldn’t send your message. Email me at <a href="mailto:satyamror1109@gmail.com">satyamror1109@gmail.com</a>.</>}
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
        <span>{activeSection === 'top' ? '01' : String(['impact', 'experience', 'builds', 'skills', 'profiles', 'contact'].indexOf(activeSection) + 2).padStart(2, '0')}</span>
        <div><i style={{ transform: `scaleY(${scrollProgress})` }} /></div>
        <span>07</span>
      </aside>

      <footer>
        <a href="#top" className="monogram">SS</a>
        <p>© {new Date().getFullYear()} Satyam Singh</p>
        <div>Bengaluru, India</div>
      </footer>
    </div>
  )
}

export default App
