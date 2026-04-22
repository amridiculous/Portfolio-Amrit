import { motion } from 'framer-motion'
import styled, { useTheme } from 'styled-components'

const PROJECTS = [
  {
    title: 'Agentforce Customer Service Automation',
    description: 'Autonomous AI agent handling Tier-1 queries end-to-end — triaging cases, retrieving knowledge articles, and escalating edge cases. Reduced resolution time by 50%.',
    tags: ['Agentforce', 'Einstein Copilot', 'Service Cloud', 'Apex'],
    badge: 'AI',
  },
  {
    title: 'Field Service Lightning Transformation',
    description: 'End-to-end FSL implementation replacing a legacy work order system. Custom mobile LWC for field technicians, scheduling policies, and dispatcher console.',
    tags: ['FSL', 'LWC', 'Apex', 'Service Cloud'],
    badge: 'Featured',
  },
  {
    title: 'Enterprise ERP–Salesforce Integration',
    description: 'Bi-directional real-time sync between Salesforce and SAP ERP using REST APIs, platform events, and Apex middleware. Eliminated dual data entry across teams.',
    tags: ['Apex', 'REST API', 'Platform Events', 'SAP'],
    badge: null,
  },
  {
    title: 'Einstein Next Best Action for Sales',
    description: 'AI-driven upsell prompts, renewal alerts, and risk flags surfaced on opportunity records based on historical CRM data and engagement signals.',
    tags: ['Einstein NBA', 'Einstein GPT', 'Sales Cloud'],
    badge: 'AI',
  },
  {
    title: 'Reusable LWC Component Library',
    description: 'Production-grade Lightning Web Component library used across six Salesforce orgs — data tables, multi-step forms, toast systems, and modal frameworks.',
    tags: ['LWC', 'JavaScript', 'SLDS', 'Jest'],
    badge: null,
  },
  {
    title: 'Omni-Channel Service Cloud',
    description: 'Full Omni-Channel routing with CTI, Live Agent, Einstein Bot chat deflection, and custom case flows. Supported 300+ concurrent agents.',
    tags: ['Service Cloud', 'CTI', 'Live Agent', 'Einstein Bots'],
    badge: null,
  },
  {
    title: 'Data Cloud Unified Customer Profile',
    description: 'Unified customer data from CRM, marketing, and web analytics into a single identity-resolved profile powering Einstein GPT content and Flow automations.',
    tags: ['Data Cloud', 'Einstein GPT', 'Salesforce Flow'],
    badge: 'AI',
  },
  {
    title: 'Automated CI/CD Pipeline',
    description: 'GitHub Actions pipeline for Salesforce metadata deployments with Apex test gates, PMD static analysis, and scratch org previews. Cut release cycles from days to hours.',
    tags: ['Salesforce DX', 'GitHub Actions', 'CI/CD', 'Apex'],
    badge: null,
  },
]

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 12px;
  padding: 16px 52px 16px;
  pointer-events: none;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ $accent }) => $accent}25;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow: hidden;
`

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
`

const Title = styled.p`
  font-size: clamp(15px, 1.3vw, 20px);
  font-weight: 650;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.25;
`

const Desc = styled.p`
  font-size: clamp(12px, 0.95vw, 14px);
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.008em;
  flex: 1;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Tag = styled.span`
  font-size: 11px;
  color: ${({ $accent }) => $accent};
  background: ${({ $accent }) => $accent}12;
  border: 1px solid ${({ $accent }) => $accent}30;
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 3px 10px;
`

export default function ProjectsPreview({ isHovered, accent = '#0071e3' }) {
  return (
    <Grid>
      {PROJECTS.map((p, i) => (
        <Card
          key={p.title}
          $accent={accent}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
          transition={{ duration: 0.35, delay: isHovered ? i * 0.04 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          {p.badge && <Badge $accent={accent}>{p.badge}</Badge>}
          <Title>{p.title}</Title>
          <Desc>{p.description}</Desc>
          <Tags>{p.tags.map((t) => <Tag key={t} $accent={accent}>{t}</Tag>)}</Tags>
        </Card>
      ))}
    </Grid>
  )
}
