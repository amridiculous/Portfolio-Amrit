import { motion } from 'framer-motion'
import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  ContactGrid,
  ContactInfo,
  InfoItem,
  InfoLabel,
  InfoLink,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  SubmitButton,
  FormNote,
} from './Contact.styles'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to EmailJS, Formspree, or your preferred service
    alert('Message sent! Connect this to your preferred email service.')
  }

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>Contact.</PageTitle>
          <Subtitle>
            Have a project in mind or want to connect?
            I'd love to hear from you.
          </Subtitle>

          <ContactGrid>
            {/* Left — contact details */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <ContactInfo>
                <InfoItem>
                  <InfoLabel>Email</InfoLabel>
                  {/* ── Replace with your email ── */}
                  <InfoLink href="mailto:your@email.com">your@email.com</InfoLink>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>LinkedIn</InfoLabel>
                  {/* ── Replace with your LinkedIn URL ── */}
                  <InfoLink
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/yourprofile
                  </InfoLink>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Location</InfoLabel>
                  {/* ── Replace with your location ── */}
                  <InfoLink as="span">India</InfoLink>
                </InfoItem>
              </ContactInfo>
            </motion.div>

            {/* Right — contact form */}
            <motion.div
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Send message
                </SubmitButton>

                <FormNote>I typically respond within 24 hours.</FormNote>
              </Form>
            </motion.div>
          </ContactGrid>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
