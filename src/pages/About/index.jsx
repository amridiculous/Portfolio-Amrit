import { motion } from 'framer-motion'
import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  Section,
  SectionLabel,
  BioBlock,
  BioText,
  SkillsGrid,
  SkillCard,
  SkillName,
  SkillLevel,
  CertsRow,
  CertBadge,
} from './About.styles'

const SKILLS = [
  // Core Salesforce
  { name: 'Apex', level: 'Expert' },
  { name: 'Lightning Web Components', level: 'Expert' },
  { name: 'Service Cloud', level: 'Expert' },
  { name: 'Field Service Lightning', level: 'Expert' },
  { name: 'Salesforce Flow', level: 'Advanced' },
  { name: 'SOQL / SOSL', level: 'Advanced' },
  { name: 'REST / SOAP Integrations', level: 'Advanced' },
  { name: 'Visualforce', level: 'Advanced' },
  { name: 'CTI & Live Agent', level: 'Advanced' },
  { name: 'Deployment Strategies', level: 'Advanced' },
  { name: 'Code Review', level: 'Advanced' },
  { name: 'JavaScript', level: 'Intermediate' },
  // Salesforce AI
  { name: 'Agentforce', level: 'Advanced' },
  { name: 'Einstein Copilot', level: 'Advanced' },
  { name: 'Einstein GPT', level: 'Advanced' },
  { name: 'Prompt Builder', level: 'Advanced' },
  { name: 'Model Builder', level: 'Intermediate' },
  { name: 'Einstein Prediction Builder', level: 'Intermediate' },
  { name: 'Einstein Next Best Action', level: 'Intermediate' },
  { name: 'Einstein Bots', level: 'Advanced' },
  { name: 'Data Cloud', level: 'Intermediate' },
  { name: 'Einstein Analytics', level: 'Intermediate' },
  { name: 'Einstein Vision & Language', level: 'Intermediate' },
]

const CERTS = [
  'Salesforce Certified Data 360 Consultant',
  'Salesforce Certified Omnistudio Developer',
  'Salesforce Certified Sales Cloud Consultant',
  'Salesforce Certified Platform Administrator',
  'Salesforce Certified Platform Administrator II',
  'Salesforce Certified Platform App Builder',
  'Salesforce Certified Platform Developer',
  'Salesforce Certified Platform Developer II',
  'Salesforce Certified JavaScript Developer',
  'Salesforce Certified Platform Data Architect',
  'Salesforce Certified Platform Integration Architect',
  'Salesforce Certified Field Service Consultant',
  'Salesforce Certified Service Cloud Consultant',
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>About.</PageTitle>
          <Subtitle>
            Application Development Specialist at Accenture with 8+ years
            delivering enterprise Salesforce solutions.
          </Subtitle>

          <Section>
            <SectionLabel>Bio</SectionLabel>
            <BioBlock>
              <BioText>
                I'm Amrit Das, a Salesforce specialist with over 8 years of
                experience building enterprise CRM solutions across Service Cloud,
                Field Service Lightning, and custom application development. I've
                progressed from System Engineer to Application Development Specialist,
                working with clients at Accenture and Tata Consultancy Services.
              </BioText>
              <BioText>
                I focus on scalable Apex architecture,
                Lightning Web Components, and end-to-end deployment strategies. I
                believe in clean, maintainable code and solutions that are as robust
                under the hood as they are seamless for the end user.
              </BioText>
            </BioBlock>
          </Section>

          <Section>
            <SectionLabel>Skills</SectionLabel>
            <SkillsGrid>
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                >
                  <SkillCard>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>{skill.level}</SkillLevel>
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </Section>

          <Section>
            <SectionLabel>Certifications</SectionLabel>
            <CertsRow>
              {CERTS.map((cert) => (
                <CertBadge key={cert}>{cert}</CertBadge>
              ))}
            </CertsRow>
          </Section>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
