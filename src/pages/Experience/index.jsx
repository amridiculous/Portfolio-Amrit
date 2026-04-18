import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineLine,
  TimelineContent,
  Period,
  Role,
  Company,
  Description,
  AchievementList,
  Achievement,
} from './Experience.styles'

gsap.registerPlugin(ScrollTrigger)

// ── Replace with your actual experience ──────────────────────────────────────
const EXPERIENCE = [
  {
    period: '2023 — Present',
    role: 'Senior Salesforce Developer',
    company: 'Your Current Company',
    description:
      'Leading Salesforce development initiatives across Sales Cloud and Service Cloud. Architecting scalable solutions and mentoring junior developers.',
    achievements: [
      'Delivered [X] major platform upgrades on time and under budget',
      'Reduced page load time by 40% through LWC and Apex optimisation',
      'Implemented CI/CD pipeline for Salesforce deployments using GitHub Actions',
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Salesforce Developer',
    company: 'Previous Company',
    description:
      'Developed custom Apex classes, triggers, and Lightning Web Components for enterprise CRM solutions serving 500+ internal users.',
    achievements: [
      'Built SAP ↔ Salesforce integration via REST APIs processing 10k records/day',
      'Automated 15+ business processes with Salesforce Flow',
      'Achieved Salesforce Platform Developer II certification',
    ],
  },
  {
    period: '2019 — 2021',
    role: 'Junior Salesforce Developer',
    company: 'Earlier Company',
    description:
      'Started career building Salesforce solutions, developing Apex code and working with declarative tools to solve real business problems.',
    achievements: [
      'Completed Salesforce Administrator and Platform Developer I certifications',
      'Developed custom reports and dashboards for C-suite stakeholders',
      'Supported CRM migration from legacy platform to Salesforce',
    ],
  },
]

export default function Experience() {
  const itemsRef = useRef([])

  useEffect(() => {
    const triggers = []

    itemsRef.current.forEach((item) => {
      if (!item) return
      const trigger = gsap.fromTo(
        item,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          },
        }
      )
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill())
    }
  }, [])

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>Experience.</PageTitle>
          <Subtitle>
            My professional journey building Salesforce solutions
            across various industries.
          </Subtitle>

          <Timeline>
            {EXPERIENCE.map((exp, i) => (
              <TimelineItem
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                style={{ opacity: 0 }}
              >
                <TimelineDot />
                {i < EXPERIENCE.length - 1 && <TimelineLine />}
                <TimelineContent>
                  <Period>{exp.period}</Period>
                  <Role>{exp.role}</Role>
                  <Company>{exp.company}</Company>
                  <Description>{exp.description}</Description>
                  <AchievementList>
                    {exp.achievements.map((a, j) => (
                      <Achievement key={j}>{a}</Achievement>
                    ))}
                  </AchievementList>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
