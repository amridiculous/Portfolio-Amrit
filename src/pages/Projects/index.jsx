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
} from './Projects.styles'

// ── Replace with your actual projects ────────────────────────────────────────
const PROJECTS = [
  {
    title: 'CRM Integration Platform',
    description:
      'Built a scalable integration layer connecting Salesforce with ERP systems using REST APIs and custom Apex middleware. Reduced data sync latency by 60%.',
    tags: ['Apex', 'REST API', 'Integration', 'MuleSoft'],
    badge: 'Featured',
    link: '#',
  },
  {
    title: 'Lightning Component Library',
    description:
      'Developed a reusable UI component library for Lightning Web Components including data tables, form builders, and custom dashboards used across 5 orgs.',
    tags: ['LWC', 'JavaScript', 'SLDS'],
    badge: null,
    link: '#',
  },
  {
    title: 'Sales Pipeline Automation',
    description:
      'Automated the end-to-end sales pipeline using Salesforce Flow and Apex triggers, resulting in a 40% reduction in manual data entry.',
    tags: ['Salesforce Flow', 'Apex', 'Process Builder'],
    badge: null,
    link: '#',
  },
  {
    title: 'Customer Self-Service Portal',
    description:
      'Designed and developed a self-service portal on Experience Cloud with custom LWC components, Apex controllers, and Salesforce Knowledge integration.',
    tags: ['Experience Cloud', 'LWC', 'Apex'],
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

export default function Projects() {
  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>Projects.</PageTitle>
          <Subtitle>
            A selection of work I'm proud of — each one a real business
            challenge solved with Salesforce.
          </Subtitle>

          <Grid>
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card>
                  {project.badge && <CardBadge>{project.badge}</CardBadge>}
                  <CardTitle>{project.title}</CardTitle>
                  <CardDesc>{project.description}</CardDesc>
                  <CardTags>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </CardTags>
                  <CardLink href={project.link} target="_blank" rel="noopener noreferrer">
                    View project →
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
