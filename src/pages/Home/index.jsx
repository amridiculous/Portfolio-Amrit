import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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

const BIO_WORDS = (
  'I build web applications and agentic workflows — clean systems that cut through complexity. ' +
  'Design matters as much to me as the code behind it.'
).split(' ')

export default function Home() {
  const lettersRef = useRef([])
  const taglineRef = useRef(null)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [hoveredName, setHoveredName] = useState(false)
  const navigate = useNavigate()

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
    )
    return () => tl.kill()
  }, [])

  return (
    <Wrapper>
      <Hero>
        <NameBlock
          onMouseEnter={() => setHoveredName(true)}
          onMouseLeave={() => setHoveredName(false)}
          onClick={() => {
            setHoveredSection(null)
            setHoveredName(false)
            navigate('/', { replace: true })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
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

        <HeroPreviewZone>
          {/* Ambient animation — always running, fades out on section hover */}
          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <AmbientCanvas />
          </motion.div>

          {/* Bio — visible by default, fades out when a section is hovered */}
          <motion.div
            animate={{ opacity: hoveredSection ? 0 : 1, y: hoveredSection ? 6 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 52px', maxWidth: 740, pointerEvents: 'none' }}
          >
            <BioCentered>
              {BIO_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  animate={
                    hoveredName
                      ? { y: -5 }
                      : { y: 0 }
                  }
                  transition={
                    hoveredName
                      ? { duration: 1.4, delay: i * 0.05, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                      : { duration: 0.4, ease: 'easeOut' }
                  }
                  style={{ display: 'inline-block', marginRight: '0.28em' }}
                >
                  {word}
                </motion.span>
              ))}
            </BioCentered>
          </motion.div>

          {/* Canvas animations — appear on section hover */}
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
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
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
