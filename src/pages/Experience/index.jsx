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

const EXPERIENCE = [
  {
    period: 'Jun 2025 — Present · 11 mos',
    role: 'Application Development Specialist',
    company: 'Accenture · Full-time · Bhubaneswar, Odisha, India',
    description:
      'Leading application development initiatives and driving enterprise Salesforce solutions at scale within Accenture\'s delivery practice.',
    achievements: [
      'Architecting scalable Salesforce solutions across Sales Cloud and Service Cloud',
      'Driving deployment strategies and code review standards across the team',
      'Mentoring developers and establishing best practices for LWC and Apex',
    ],
  },
  {
    period: 'Sep 2022 — Jun 2025 · 2 yrs 10 mos',
    role: 'Senior Salesforce Developer',
    company: 'Accenture · Hybrid · Jaipur, Rajasthan, India',
    description:
      'Delivered complex Salesforce implementations across multiple client engagements, contributing to deployment strategies, code review, and cross-functional collaboration.',
    achievements: [
      'Spearheaded end-to-end Salesforce deployments with robust CI/CD pipelines',
      'Expertise in Deployment Strategies, Code Review, and 13+ Salesforce skill areas',
      'Collaborated with cross-functional teams to deliver CRM transformations on time',
    ],
  },
  {
    period: 'Mar 2021 — Sep 2022 · 1 yr 6 mos',
    role: 'Application Development Analyst',
    company: 'Accenture · Hyderabad, Telangana, India',
    description:
      'Built and maintained Salesforce solutions leveraging FSL, LWC, and Service Cloud for enterprise clients, developing a strong foundation in platform best practices.',
    achievements: [
      'Developed Field Service Lightning (FSL) configurations and custom components',
      'Built reusable Lightning Web Components used across multiple client orgs',
      'Implemented Service Cloud solutions improving case resolution efficiency',
    ],
  },
  {
    period: 'Mar 2018 — Mar 2021 · 3 yrs 1 mo',
    role: 'System Engineer',
    company: 'Tata Consultancy Services · Full-time · Pune, Maharashtra, India',
    description:
      'Delivered Salesforce CRM solutions across Service Cloud, integrations, and custom application development for enterprise clients at TCS.',
    achievements: [
      'Implemented Service Cloud, CTI, and Live Agent for customer support workflows',
      'Built custom integrations using Apex, Visualforce, and REST/SOAP APIs',
      'Worked across Lightning, Apex, Visualforce, and Salesforce Configuration',
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
            8+ years building Salesforce solutions at Accenture and TCS
            across enterprise clients globally.
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
