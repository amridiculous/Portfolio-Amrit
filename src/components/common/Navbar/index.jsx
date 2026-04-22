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
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <NavBar>
        <Inner>
          {location.pathname !== '/' && (
            <LogoLink to="/" reloadDocument>
              Amrit Das
            </LogoLink>
          )}

          <Links>
            {NAV_ITEMS.map(({ label, path }) => (
              <NavLinkItem key={path} to={path}>
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
                <MobileLinkItem key={path} to={path}>
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
