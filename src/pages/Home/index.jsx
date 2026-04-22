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
  MarqueeRow,
  MarqueeInner,
  MarqueeWord,
} from './Home.styles'
import ProjectsPreview from '../../components/SectionPanels/previews/ProjectsPreview'
import ExperiencePreview from '../../components/SectionPanels/previews/ExperiencePreview'
import CreativeCanvas from '../../components/SectionPanels/canvases/CreativeCanvas'

const NAME = 'Amrit Das'
const SECTIONS = [
  { id: 'projects',   label: 'PROJECTS',   to: '/projects',   accent: '#0071e3' },
  { id: 'experience', label: 'EXPERIENCE', to: '/experience', accent: '#34c759' },
  { id: 'creative',   label: 'CREATIVE',   to: '/creative',   accent: '#ff375f' },
]

export default function Home() {
  const lettersRef = useRef([])
  const taglineRef = useRef(null)
  const [hoveredSection, setHoveredSection] = useState(null)

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
        <NameBlock>
          <NameHeading aria-label={NAME}>
            {NAME.split('').map((char, i) => (
              <Letter key={i} ref={(el) => (lettersRef.current[i] = el)} style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </Letter>
            ))}
          </NameHeading>
          <Tagline ref={taglineRef} style={{ opacity: 0 }}>
            Salesforce Developer &middot; Builder &middot; AI
          </Tagline>
        </NameBlock>

        <HeroPreviewZone>
          <AnimatePresence mode="wait">
            {hoveredSection === 'projects' && (
              <motion.div
                key="projects"
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectsPreview isHovered accent="#0071e3" />
              </motion.div>
            )}
            {hoveredSection === 'experience' && (
              <motion.div
                key="experience"
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ExperiencePreview isHovered accent="#34c759" />
              </motion.div>
            )}
            {hoveredSection === 'creative' && (
              <motion.div
                key="creative"
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
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
