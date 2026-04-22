import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Wrapper,
  Hero,
  NameBlock,
  NameHeading,
  Letter,
  Tagline,
  HeroPreviewZone,
  BioCentered,
  MarqueeRow,
  MarqueeInner,
  MarqueeWord,
} from './Home.styles'
import ProjectsCanvas from '../../components/SectionPanels/canvases/ProjectsCanvas'
import ExperienceCanvas from '../../components/SectionPanels/canvases/ExperienceCanvas'
import CreativeCanvas from '../../components/SectionPanels/canvases/CreativeCanvas'
import AmbientCanvas from '../../components/SectionPanels/canvases/AmbientCanvas'

const NAME = 'Amrit Das'
const SECTIONS = [
  { id: 'projects',   label: 'PROJECTS',   to: '/projects',   accent: '#0071e3' },
  { id: 'experience', label: 'EXPERIENCE', to: '/experience', accent: '#34c759' },
  { id: 'creative',   label: 'CREATIVE',   to: '/creative',   accent: '#ff375f' },
]

const AUTO_SEQUENCE = [
  { section: 'projects',   duration: 4000 },
  { section: null,         duration: 4500 },
  { section: 'experience', duration: 4000 },
  { section: null,         duration: 4500 },
  { section: 'creative',   duration: 4000 },
  { section: null,         duration: 4500 },
]

const BIO = 'I build web applications and agentic workflows — clean systems that cut through complexity. Design matters as much to me as the code behind it.'

const FUNNY_BIOS = [
  "I build AI agents that are almost fully autonomous. 'Almost' is doing a lot of heavy lifting in that sentence.",
  "My code is clean. My git history, however, reads like a crime novel with no clear resolution.",
  "I've automated so many workflows that I'm genuinely unsure who's working for whom — me or the agents.",
  "I craft web apps so smooth, users forget they're being gently herded toward the CTA. That's the plan.",
  "Salesforce certified, which means I've memorized enough acronyms to sound dangerous in any meeting.",
  "I once deployed to production on a Friday. The site survived. My weekend did not. Lessons were learned.",
  "I build things on the web, teach AI to do my job, then bill clients for the privilege of watching it happen.",
  "My agentic workflows are so autonomous, they've started filing their own tickets. I'm choosing to see this as a win.",
  "My AI agents are very capable. They're also very confident about things they're completely wrong about. We have that in common.",
  "I debug by staring at the screen until the code feels my disappointment and fixes itself.",
  "I've been told my UX is 'intuitive.' This means users figured it out without reading the docs I never wrote.",
  "My Salesforce dashboards are beautiful. What they're actually measuring is a philosophical question best left unexplored.",
  "I automate things so clients feel like they're getting more value. They are. I'm also napping.",
  "Every web app I build has exactly one undocumented feature. It's different every time. That's what keeps it interesting.",
  "I asked an AI to review my code. It called it 'innovative.' I believe that's a polite way of saying 'wrong in a new way.'",
  "I have 47 browser tabs open. Three are Stack Overflow. One of them has the answer. I'll find it eventually.",
  "I once wrote a regex that worked on the first try. I closed my laptop and went outside. Some things should not be tempted.",
  "My agentic systems have SLAs, runbooks, and escalation paths. The agents ignore all of them with remarkable consistency.",
  "Salesforce development is just regular development, but with more clicks, more acronyms, and a profound sense of resignation.",
  "Every project starts with clean architecture and ends with a file called final_FINAL_v3_REAL.js.",
  "My components are reusable. My excuses for technical debt are even more reusable.",
  "I trained an AI to predict user behavior. It predicted they'd click the wrong button. It was correct.",
  "Web performance matters deeply to me while I simultaneously import a library just to center a div.",
  "I write TypeScript so the compiler can tell me I'm wrong before the users do. Everyone appreciates the heads-up.",
  "My pull requests are approved on the first review. I am also the only reviewer. We run a lean operation.",
  "I've convinced several executives that 'agentic workflow' is transformative. It is. I'm just not always sure how.",
  "Somewhere between the API call and the response, hope dies and a developer is born.",
  "I've shipped features users love, features users tolerate, and one feature nobody will discuss at the retrospective.",
]

function pickDifferentRandom(current, max) {
  if (max <= 1) return 0
  let next
  do { next = Math.floor(Math.random() * max) } while (next === current)
  return next
}

export default function Home() {
  const lettersRef = useRef([])
  const taglineRef = useRef(null)
  const heroZoneRef = useRef(null)
  const marqueeWordsRef = useRef([])
  const isHoveringRef = useRef(false)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [hoveredName, setHoveredName] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [jokesEnabled, setJokesEnabled] = useState(false)
  const [activeBioIdx, setActiveBioIdx] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(
      lettersRef.current,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: 'power4.out' }
    ).fromTo(
      taglineRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    ).fromTo(
      heroZoneRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      '-=0.6'
    ).fromTo(
      marqueeWordsRef.current.filter(Boolean),
      { yPercent: 80, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power3.out' },
      '-=0.35'
    )
    return () => tl.kill()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setJokesEnabled(true), 30000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!hoveredSection || !jokesEnabled) return
    const t = setTimeout(() => {
      setActiveBioIdx(prev => pickDifferentRandom(prev, FUNNY_BIOS.length))
    }, 1500)
    return () => clearTimeout(t)
  }, [hoveredSection, jokesEnabled])

  useEffect(() => {
    let cancelled = false
    let idx = 0
    let timeoutId

    const step = () => {
      if (cancelled) return
      const entry = AUTO_SEQUENCE[idx % AUTO_SEQUENCE.length]
      if (!isHoveringRef.current) {
        setHoveredSection(entry.section)
      }
      idx++
      timeoutId = setTimeout(step, entry.duration)
    }

    timeoutId = setTimeout(step, 3500)
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      setHoveredSection(null)
    }
  }, [])

  return (
    <Wrapper>
      <Hero>
        <NameBlock
          onMouseEnter={() => { if (!isMobile) setHoveredName(true) }}
          onMouseLeave={() => { if (!isMobile) setHoveredName(false) }}
        >
          <NameHeading aria-label={NAME} $dimmed={hoveredName}>
            {NAME.split('').map((char, i) => (
              <Letter key={i} ref={(el) => (lettersRef.current[i] = el)} style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </Letter>
            ))}
          </NameHeading>
          <Tagline ref={taglineRef} style={{ opacity: 0 }}>
            Web Development &middot; Agentic Workflows &middot; Salesforce
          </Tagline>
        </NameBlock>

        <HeroPreviewZone ref={heroZoneRef} style={{ opacity: 0 }}>
          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <AmbientCanvas />
          </motion.div>

          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 740, pointerEvents: 'none' }}
          >
            <motion.div
              animate={{ y: hoveredName ? [0, 200, 0, -200, 0] : 0 }}
              transition={hoveredName
                ? { duration: 5.7, repeat: Infinity, ease: ['easeInOut', 'easeInOut', 'easeInOut', 'easeInOut'], times: [0, 0.25, 0.5, 0.75, 1] }
                : { duration: 0.8, ease: 'easeInOut' }
              }
            >
              <BioCentered>{jokesEnabled ? FUNNY_BIOS[activeBioIdx] : BIO}</BioCentered>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="sync">
            {hoveredSection === 'projects' && (
              <motion.div key="projects" style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <ProjectsCanvas isHovered isMobile={isMobile} />
              </motion.div>
            )}
            {hoveredSection === 'experience' && (
              <motion.div key="experience" style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <ExperienceCanvas isHovered />
              </motion.div>
            )}
            {hoveredSection === 'creative' && (
              <motion.div key="creative" style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <CreativeCanvas isHovered isMobile={isMobile} />
              </motion.div>
            )}
          </AnimatePresence>
        </HeroPreviewZone>

        <MarqueeRow>
          <MarqueeInner>
            {SECTIONS.map(({ id, label, to, accent }, i) => (
              <MarqueeWord
                key={id}
                ref={el => (marqueeWordsRef.current[i] = el)}
                style={{ opacity: 0 }}
                to={to}
                $accent={accent}
                $hovered={hoveredSection === id}
                $dimmed={hoveredSection !== null && hoveredSection !== id}
                onMouseEnter={() => {
                  if (!isMobile) {
                    isHoveringRef.current = true
                    setHoveredSection(id)
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    isHoveringRef.current = false
                    setHoveredSection(null)
                  }
                }}
              >
                {label}
              </MarqueeWord>
            ))}
          </MarqueeInner>
        </MarqueeRow>
      </Hero>
    </Wrapper>
  )
}
