import { Foot, Inner, Copy, Socials, SocialLink } from './Footer.styles'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
  { label: 'GitHub', href: 'https://github.com/yourusername' },
  { label: 'Twitter', href: 'https://twitter.com/yourhandle' },
]

export default function Footer() {
  return (
    <Foot>
      <Inner>
        <Copy>© {new Date().getFullYear()} Amrit Das. All rights reserved.</Copy>
        <Socials>
          {SOCIALS.map(({ label, href }) => (
            <SocialLink key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </SocialLink>
          ))}
        </Socials>
      </Inner>
    </Foot>
  )
}
