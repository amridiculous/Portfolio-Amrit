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

// ── Replace with your actual skills ──────────────────────────────────────────
const SKILLS = [
  { name: 'Apex', level: 'Expert' },
  { name: 'Lightning Web Components', level: 'Expert' },
  { name: 'Salesforce Flow', level: 'Expert' },
  { name: 'SOQL / SOSL', level: 'Advanced' },
  { name: 'Salesforce Integrations', level: 'Advanced' },
  { name: 'Experience Cloud', level: 'Advanced' },
  { name: 'JavaScript', level: 'Advanced' },
  { name: 'REST / SOAP APIs', level: 'Advanced' },
]

// ── Replace with your actual certifications ───────────────────────────────────
const CERTS = [
  'Salesforce Administrator',
  'Platform Developer I',
  'Platform Developer II',
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
            Salesforce Developer with a focus on scalable architecture
            and delivering exceptional user experiences.
          </Subtitle>

          <Section>
            <SectionLabel>Bio</SectionLabel>
            <BioBlock>
              <BioText>
                I'm Amrit Das, a Salesforce Developer passionate about building
                robust CRM solutions that help businesses grow. With deep expertise
                in the Salesforce ecosystem, I specialise in Apex development,
                Lightning Web Components, and architecting integrations between
                Salesforce and third-party systems.
              </BioText>
              {/* ── Replace the paragraph below with your own bio ── */}
              <BioText>
                Currently working at [Your Company]. Previously at [Previous Company].
                I believe in writing clean, maintainable code and creating solutions
                that are both technically sound and aligned with business goals.
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
