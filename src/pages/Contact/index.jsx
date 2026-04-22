import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  SubmitButton,
  FormNote,
  SuccessMessage,
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
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)

    try {
      const res = await fetch('https://formspree.io/f/xyzgpvkj', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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

          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your name" required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </SubmitButton>

              {status === 'success' && (
                <SuccessMessage>Message sent — I'll be in touch soon.</SuccessMessage>
              )}
              {status === 'error' && (
                <FormNote style={{ color: '#ff3b30' }}>Something went wrong. Please try again.</FormNote>
              )}
              {status === 'idle' && (
                <FormNote>I typically respond within 24 hours.</FormNote>
              )}
            </Form>
          </motion.div>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
