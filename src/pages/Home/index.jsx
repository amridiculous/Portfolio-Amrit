import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Wrapper,
  Hero,
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

const SECTIONS = [
  { id: 'projects',   label: 'PROJECTS',   to: '/projects',   accent: '#0071e3' },
  { id: 'experience', label: 'EXPERIENCE', to: '/experience', accent: '#34c759' },
  { id: 'creative',   label: 'CREATIVE',   to: '/creative',   accent: '#ff375f' },
]

const MOBILE_SEQUENCE = [
  { section: 'projects',   duration: 2500 },
  { section: null,         duration: 2000 },
  { section: 'experience', duration: 2500 },
  { section: null,         duration: 2000 },
  { section: 'creative',   duration: 2500 },
  { section: null,         duration: 2000 },
]

const BIO = 'I build web applications and agentic workflows — clean systems that cut through complexity. Design matters as much to me as the code behind it.'

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    let cancelled = false
    let idx = 0
    let timeoutId

    const step = () => {
      if (cancelled) return
      const { section, duration } = MOBILE_SEQUENCE[idx % MOBILE_SEQUENCE.length]
      setHoveredSection(section)
      idx++
      timeoutId = setTimeout(step, duration)
    }

    timeoutId = setTimeout(step, 800)
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      setHoveredSection(null)
    }
  }, [isMobile])

  return (
    <Wrapper>
      <Hero>
        <HeroPreviewZone>
          {/* Ambient animation — always running, fades out on section hover */}
          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <AmbientCanvas />
          </motion.div>

          {/* Bio — fades out when a section is hovered */}
          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 740, pointerEvents: 'none' }}
          >
            <BioCentered>{BIO}</BioCentered>
          </motion.div>

          {/* Canvas animations — appear on section hover (desktop) or auto-cycle (mobile) */}
          <AnimatePresence mode="sync">
            {hoveredSection === 'projects' && (
              <motion.div
                key="projects"
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <ProjectsCanvas isHovered />
              </motion.div>
            )}
            {hoveredSection === 'experience' && (
              <motion.div
                key="experience"
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <ExperienceCanvas isHovered />
              </motion.div>
            )}
            {hoveredSection === 'creative' && (
              <motion.div
                key="creative"
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <CreativeCanvas isHovered />
              </motion.div>
            )}
          </AnimatePresence>
        </HeroPreviewZone>

        <MarqueeRow>
          <MarqueeInner>
            {SECTIONS.map(({ id, label, to, accent }) => (
              <MarqueeWord
                key={id}
                to={to}
                $accent={accent}
                $hovered={hoveredSection === id}
                $dimmed={hoveredSection !== null && hoveredSection !== id}
                onMouseEnter={() => { if (!isMobile) setHoveredSection(id) }}
                onMouseLeave={() => { if (!isMobile) setHoveredSection(null) }}
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
