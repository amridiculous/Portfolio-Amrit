import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  NavBar,
  Inner,
  LogoLink,
  Links,
  NavLinkItem,
  Hamburger,
  MobileNav,
  MobileLinkItem,
} from './Navbar.styles'

const NAV_ITEMS = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <NavBar $scrolled={scrolled}>
        <Inner>
          <LogoLink to="/">Amrit Das</LogoLink>

          <Links>
            {NAV_ITEMS.map(({ label, path }) => (
              <NavLinkItem key={path} to={path} $active={location.pathname === path}>
                {label}
              </NavLinkItem>
            ))}
          </Links>

          <Hamburger onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">
            <span />
            <span />
            <span />
          </Hamburger>
        </Inner>
      </NavBar>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <MobileNav>
              {NAV_ITEMS.map(({ label, path }) => (
                <MobileLinkItem
                  key={path}
                  to={path}
                  $active={location.pathname === path}
                >
                  {label}
                </MobileLinkItem>
              ))}
            </MobileNav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
