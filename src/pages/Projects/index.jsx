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

const PROJECTS = [
  {
    title: 'Agentforce Customer Service Automation',
    description:
      'Built an autonomous AI agent using Agentforce to handle Tier-1 customer service queries end-to-end — triaging cases, retrieving knowledge articles, updating records, and escalating edge cases to human agents. Reduced average case resolution time by over 50% and freed support teams to focus on complex issues.',
    tags: ['Agentforce', 'Einstein Copilot', 'Service Cloud', 'Prompt Builder', 'Apex'],
    badge: 'AI',
    link: '#',
  },
  {
    title: 'Field Service Lightning Transformation',
    description:
      'Led the end-to-end FSL implementation for a large utilities client, replacing a legacy work order system with Salesforce Field Service. Configured scheduling policies, dispatcher console, and custom mobile LWC components for field technicians. Improved first-time fix rates and eliminated manual scheduling overhead.',
    tags: ['Field Service Lightning', 'LWC', 'Apex', 'Service Cloud'],
    badge: 'Featured',
    link: '#',
  },
  {
    title: 'Enterprise ERP–Salesforce Integration',
    description:
      'Architected a bi-directional integration between Salesforce and SAP ERP for a manufacturing client, handling real-time sync of orders, accounts, and inventory using REST APIs, platform events, and custom Apex middleware. Eliminated dual data entry across teams and reduced sync errors to near zero.',
    tags: ['Apex', 'REST API', 'Platform Events', 'SAP', 'Integration'],
    badge: null,
    link: '#',
  },
  {
    title: 'Einstein Next Best Action for Sales',
    description:
      'Implemented Einstein Next Best Action on opportunity records to surface AI-driven recommendations — upsell prompts, renewal alerts, and risk flags — based on historical CRM data and engagement signals. Sales reps adopted the feature within the first sprint, directly influencing pipeline decisions.',
    tags: ['Einstein Next Best Action', 'Einstein GPT', 'Sales Cloud', 'Apex'],
    badge: 'AI',
    link: '#',
  },
  {
    title: 'Reusable LWC Component Library',
    description:
      'Designed and built a production-grade Lightning Web Component library used across six Salesforce orgs at Accenture. Included dynamic data tables, multi-step form builders, contextual toast systems, and reusable modal frameworks — all aligned to SLDS and tested with Jest.',
    tags: ['LWC', 'JavaScript', 'SLDS', 'Jest', 'Salesforce DX'],
    badge: null,
    link: '#',
  },
  {
    title: 'Omni-Channel Service Cloud Deployment',
    description:
      'Configured and deployed a full Omni-Channel routing solution for a BPO client on Service Cloud — including CTI integration, Live Agent, Einstein Bot for chat deflection, and custom case management flows. Supported over 300 concurrent agents and reduced average handle time significantly.',
    tags: ['Service Cloud', 'CTI', 'Live Agent', 'Einstein Bots', 'Omni-Channel'],
    badge: null,
    link: '#',
  },
  {
    title: 'Data Cloud Unified Customer Profile',
    description:
      'Implemented Salesforce Data Cloud to unify customer data from CRM, marketing, and web analytics into a single identity-resolved profile. Used the unified profiles to power personalised Einstein GPT content and targeted Salesforce Flow automations, enabling truly context-aware customer journeys.',
    tags: ['Data Cloud', 'Einstein GPT', 'Salesforce Flow', 'Marketing Cloud'],
    badge: 'AI',
    link: '#',
  },
  {
    title: 'Automated CI/CD Pipeline for Salesforce',
    description:
      'Built a full CI/CD pipeline for Salesforce metadata deployments using GitHub Actions, Salesforce DX, and SFDX scratch orgs. Included automated Apex test execution, code coverage gates, static analysis with PMD, and environment-specific deployment manifests — cutting release cycles from days to hours.',
    tags: ['Salesforce DX', 'GitHub Actions', 'CI/CD', 'Apex', 'DevOps'],
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
            Eight years of real-world Salesforce work — enterprise deployments,
            AI-powered solutions, and scalable architecture built for production.
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
