import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import {
  NavBar,
  Inner,
  LogoLink,
  Links,
  NavLinkItem,
  NavSocials,
  SocialIconLink,
  Hamburger,
  MobileNav,
  MobileNavInner,
  MobileLinkItem,
} from './Navbar.styles'

const NAV_ITEMS = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amrit-das-a61985110/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/amridiculous',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Trailhead',
    href: 'https://www.salesforce.com/trailblazer/amdas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    setOpen(false)
    if (menuRef.current) {
      gsap.killTweensOf(menuRef.current)
      gsap.set(menuRef.current, { height: 0 })
    }
  }, [location.pathname])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    const items = itemRefs.current.filter(Boolean)

    if (open) {
      gsap.killTweensOf(menu)
      gsap.killTweensOf(items)
      gsap.set(items, { y: -14, opacity: 0 })
      gsap.to(menu, { height: menu.scrollHeight, duration: 0.45, ease: 'power3.inOut' })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.065,
        ease: 'power3.out',
        delay: 0.15,
      })
    } else {
      gsap.killTweensOf(menu)
      gsap.killTweensOf(items)
      gsap.to(items, { y: -10, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' })
      gsap.to(menu, { height: 0, duration: 0.38, ease: 'power3.inOut', delay: 0.12 })
    }
  }, [open])

  return (
    <>
      <NavBar>
        <Inner>
          {location.pathname !== '/' && (
            <LogoLink to="/">Amrit Das</LogoLink>
          )}

          <Links>
            {NAV_ITEMS.map(({ label, path }) => (
              <NavLinkItem key={path} to={path}>
                {label}
              </NavLinkItem>
            ))}
          </Links>

          <NavSocials>
            {SOCIALS.map(({ label, href, icon }) => (
              <SocialIconLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                {icon}
              </SocialIconLink>
            ))}
          </NavSocials>

          <Hamburger onClick={() => setOpen(prev => !prev)} aria-label="Toggle navigation menu">
            <span />
            <span />
            <span />
          </Hamburger>
        </Inner>
      </NavBar>

      <MobileNav ref={menuRef}>
        <MobileNavInner>
          {NAV_ITEMS.map(({ label, path }, i) => (
            <MobileLinkItem key={path} to={path} ref={el => (itemRefs.current[i] = el)}>
              {label}
            </MobileLinkItem>
          ))}
          <MobileLinkItem
            as="div"
            ref={el => (itemRefs.current[NAV_ITEMS.length] = el)}
            style={{ display: 'flex', gap: '20px', paddingTop: '12px' }}
          >
            {SOCIALS.map(({ label, href, icon }) => (
              <SocialIconLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                {icon}
              </SocialIconLink>
            ))}
          </MobileLinkItem>
        </MobileNavInner>
      </MobileNav>
    </>
  )
}
