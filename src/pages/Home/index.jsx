import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Wrapper,
  Hero,
  NameBlock,
  NameHeading,
  Letter,
  Bio,
  BioText,
  AvatarBlock,
  AvatarCircle,
  AvatarInitials,
  ScrollHint,
  ScrollDot,
} from './Home.styles'

const NAME = 'Amrit Das'

export default function Home() {
  const lettersRef = useRef([])
  const bioRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    // Letters stagger up into view
    tl.fromTo(
      lettersRef.current,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power4.out',
      }
    )
      // Description fades in while name is still animating
      .fromTo(
        bioRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      // Scroll hint appears last
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '+=0.8'
      )

    return () => tl.kill()
  }, [])

  return (
    <Wrapper>
      <Hero>
        {/* Section 1 — Name */}
        <NameBlock>
          <NameHeading aria-label={NAME}>
            {NAME.split('').map((char, i) => (
              <Letter
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                style={{ opacity: 0 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </Letter>
            ))}
          </NameHeading>
        </NameBlock>

        {/* Section 2 — Profile description */}
        <Bio ref={bioRef} style={{ opacity: 0 }}>
          <BioText>
            Salesforce Developer. Building scalable CRM solutions
            <br />
            that transform how businesses connect with their customers.
          </BioText>
        </Bio>

        {/* Section 3 — Avatar with animated entrance */}
        <AvatarBlock>
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.3,
              duration: 1.0,
              type: 'spring',
              stiffness: 65,
              damping: 14,
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                delay: 2.5,
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <AvatarCircle>
                <AvatarInitials>AD</AvatarInitials>
              </AvatarCircle>
            </motion.div>
          </motion.div>
        </AvatarBlock>

        <ScrollHint ref={scrollRef} style={{ opacity: 0 }}>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ScrollDot />
          </motion.div>
        </ScrollHint>
      </Hero>
    </Wrapper>
  )
}
