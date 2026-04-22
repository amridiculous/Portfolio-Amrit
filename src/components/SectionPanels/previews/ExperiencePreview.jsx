import { motion } from 'framer-motion'
import styled from 'styled-components'

const EXPERIENCE = [
  {
    period: 'Jun 2025 — Present',
    role: 'Application Development Specialist',
    company: 'Accenture · Bhubaneswar',
    description: 'Leading enterprise Salesforce solutions and application development initiatives within Accenture\'s delivery practice at scale.',
    tags: ['Sales Cloud', 'Service Cloud', 'LWC', 'Apex'],
  },
  {
    period: 'Sep 2022 — Jun 2025',
    role: 'Senior Salesforce Developer',
    company: 'Accenture · Jaipur (Hybrid)',
    description: 'Delivered complex Salesforce implementations across multiple client engagements with end-to-end CI/CD pipelines and cross-functional collaboration.',
    tags: ['CI/CD', 'Deployment', 'Code Review', 'CRM'],
  },
  {
    period: 'Mar 2021 — Sep 2022',
    role: 'Application Development Analyst',
    company: 'Accenture · Hyderabad',
    description: 'Built and maintained Salesforce solutions leveraging FSL, LWC, and Service Cloud for enterprise clients.',
    tags: ['FSL', 'LWC', 'Service Cloud', 'Apex'],
  },
  {
    period: 'Mar 2018 — Mar 2021',
    role: 'System Engineer',
    company: 'Tata Consultancy Services · Pune',
    description: 'Delivered Salesforce CRM solutions across Service Cloud, integrations, and custom application development for enterprise clients.',
    tags: ['Service Cloud', 'CTI', 'Apex', 'REST API'],
  },
]

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 12px;
  padding: 16px 52px 16px;
  pointer-events: none;
`

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ $accent }) => $accent}25;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow: hidden;
`

const Period = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
`

const Role = styled.p`
  font-size: clamp(17px, 1.5vw, 24px);
  font-weight: 650;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`

const Company = styled.p`
  font-size: clamp(12px, 1vw, 15px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.01em;
`

const Desc = styled.p`
  font-size: clamp(12px, 0.95vw, 14px);
  line-height: 1.7;
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

export default function ExperiencePreview({ isHovered, accent = '#34c759' }) {
  return (
    <Grid>
      {EXPERIENCE.map((item, i) => (
        <Card
          key={item.role}
          $accent={accent}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
          transition={{ duration: 0.35, delay: isHovered ? i * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Period $accent={accent}>{item.period}</Period>
          <Role>{item.role}</Role>
          <Company>{item.company}</Company>
          <Desc>{item.description}</Desc>
          <Tags>{item.tags.map((t) => <Tag key={t} $accent={accent}>{t}</Tag>)}</Tags>
        </Card>
      ))}
    </Grid>
  )
}
