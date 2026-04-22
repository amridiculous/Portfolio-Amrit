import { motion } from 'framer-motion'
import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  Grid,
  Card,
  CardBadge,
  CardTitle,
  CardDesc,
  CardTags,
  Tag,
  CardLink,
} from './Creative.styles'

// ── Replace with your actual creative work ────────────────────────────────────
const CREATIVE_WORK = [
  {
    title: 'Portfolio Website',
    description:
      'Designed and built this portfolio from scratch using React, GSAP, and Framer Motion. Focus on smooth animations, editorial layout, and performance.',
    tags: ['React', 'GSAP', 'Framer Motion', 'styled-components'],
    badge: 'Featured',
    link: '#',
  },
  {
    title: 'Brand Identity Design',
    description:
      'Created a complete brand identity system including logo, color palette, typography guidelines, and component library for a tech startup.',
    tags: ['Figma', 'Branding', 'Typography'],
    badge: null,
    link: '#',
  },
  {
    title: 'Motion Concepts',
    description:
      'A collection of UI motion experiments exploring micro-interactions, page transitions, and scroll-driven animations.',
    tags: ['After Effects', 'CSS Animation', 'Lottie'],
    badge: null,
    link: '#',
  },
  {
    title: 'Design System',
    description:
      'Built a token-based design system with dark/light mode support, accessible color palettes, and documentation for a cross-platform product.',
    tags: ['Figma', 'Design Tokens', 'Accessibility'],
    badge: null,
    link: '#',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Creative() {
  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>Creative.</PageTitle>
          <Subtitle>
            Design work, motion experiments, and visual systems — the craft
            behind the code.
          </Subtitle>

          <Grid>
            {CREATIVE_WORK.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card>
                  {item.badge && <CardBadge>{item.badge}</CardBadge>}
                  <CardTitle>{item.title}</CardTitle>
                  <CardDesc>{item.description}</CardDesc>
                  <CardTags>
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </CardTags>
                  <CardLink href={item.link} target="_blank" rel="noopener noreferrer">
                    View work →
                  </CardLink>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
