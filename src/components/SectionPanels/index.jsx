import { useState } from 'react'
import {
  PanelsWrapper,
  Panel,
  PreviewOverlay,
  CanvasWrapper,
  PanelContent,
  PanelCategory,
  PanelTitle,
  PanelSubtitle,
} from './SectionPanels.styles'
import ProjectsPreview from './previews/ProjectsPreview'
import ExperiencePreview from './previews/ExperiencePreview'
import CreativeCanvas from './canvases/CreativeCanvas'

const PANELS = [
  {
    id: 'projects',
    to: '/projects',
    category: 'Work',
    title: 'Projects',
    subtitle: 'Eight years of real-world Salesforce and AI builds.',
    accent: '#0071e3',
    overlayBg: 'rgba(0, 113, 227, 0.04)',
  },
  {
    id: 'experience',
    to: '/experience',
    category: 'Career',
    title: 'Experience',
    subtitle: 'Accenture and TCS — enterprise CRM at scale.',
    accent: '#34c759',
    overlayBg: 'rgba(52, 199, 89, 0.04)',
  },
  {
    id: 'creative',
    to: '/creative',
    category: 'Creative',
    title: 'Creative',
    subtitle: 'Design, motion, and visual experiments.',
    accent: '#ff375f',
    overlayBg: 'rgba(255, 55, 95, 0.04)',
  },
]

export default function SectionPanels() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <PanelsWrapper>
      {PANELS.map(({ id, to, category, title, subtitle, accent, overlayBg }) => (
        <Panel
          key={id}
          to={to}
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <PreviewOverlay $bg={overlayBg} />

          {id === 'projects' && (
            <ProjectsPreview isHovered={hoveredId === 'projects'} />
          )}
          {id === 'experience' && (
            <ExperiencePreview isHovered={hoveredId === 'experience'} />
          )}
          {id === 'creative' && (
            <CanvasWrapper>
              <CreativeCanvas isHovered={hoveredId === 'creative'} />
            </CanvasWrapper>
          )}

          <PanelContent>
            <PanelCategory $accentColor={accent}>{category}</PanelCategory>
            <PanelTitle>{title}</PanelTitle>
            <PanelSubtitle>{subtitle}</PanelSubtitle>
          </PanelContent>
        </Panel>
      ))}
    </PanelsWrapper>
  )
}
