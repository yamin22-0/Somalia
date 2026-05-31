// src/components/Navbar.jsx
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import '../styles/navbar.css'

/* ── Theme toggle icon ── */
function ThemeIcon({ isDark }) {
  return isDark ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

/* ── Magnetic button wrapper ── */
function MagneticBtn({ children, className, onClick, 'aria-label': ariaLabel }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const translateX = useTransform(x, [-40, 40], [-6, 6])
  const translateY = useTransform(y, [-40, 40], [-6, 6])

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ translateX, translateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}

/* ── Nav links config ── */
const links = [
  { to: '/',           label: 'Home' },
  { to: '/discover',   label: 'Discover' },
  { to: '/culture',    label: 'Culture' },
  { to: '/coastline',  label: 'Coastline' },
  { to: '/wildlife',   label: 'Wildlife' },
  { to: '/plan-visit', label: 'Plan Visit' },
]

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [isDark, setIsDark]       = useState(false)
  const location                  = useLocation()

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  /* Scroll detection */
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 48) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Dark mode toggle — writes to <html> data-theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '')
  }, [isDark])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHeroPage = location.pathname === '/'

  return (
    <>
      <motion.header
        className={[
          'navbar',
          scrolled      ? 'navbar--filled' : '',
          isHeroPage    ? 'navbar--hero'   : '',
          menuOpen      ? 'navbar--open'   : '',
        ].filter(Boolean).join(' ')}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="navbar__inner">

          {/* Logo */}
          <NavLink to="/" className="navbar__logo" aria-label="Somalia — Home">
            <motion.span
              className="navbar__logo-text"
              whileHover={{ letterSpacing: '0.22em' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Somalia
            </motion.span>
            <span className="navbar__logo-star" aria-hidden="true">★</span>
          </NavLink>

          {/* Desktop nav links */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
                }
              >
                {label}
                <span className="navbar__link-dot" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="navbar__controls">
            {/* Theme toggle */}
            <MagneticBtn
              className="navbar__icon-btn"
              onClick={() => setIsDark(d => !d)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{    opacity: 0, rotate:  30, scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                >
                  <ThemeIcon isDark={isDark} />
                </motion.span>
              </AnimatePresence>
            </MagneticBtn>

            {/* Hamburger */}
            <MagneticBtn
              className="navbar__hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`hamburger-icon ${menuOpen ? 'hamburger-icon--open' : ''}`}>
                <span />
                <span />
                <span />
              </span>
            </MagneticBtn>
          </div>

        </div>
      </motion.header>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)'   }}
            exit={{    clipPath: 'inset(0 0 100% 0)'  }}
            transition={{ duration: 0.65, ease: [0.87, 0, 0.13, 1] }}
          >
            <nav className="mobile-menu__nav" aria-label="Mobile navigation">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0   }}
                  exit={{    opacity: 0, x: -16  }}
                  transition={{
                    duration: 0.5,
                    delay:    menuOpen ? 0.3 + i * 0.07 : 0,
                    ease:     [0.16, 1, 0.3, 1],
                  }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      ['mobile-menu__link', isActive ? 'mobile-menu__link--active' : ''].join(' ')
                    }
                  >
                    <span className="mobile-menu__link-num eyebrow">0{i + 1}</span>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom strip */}
            <motion.div
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <span className="eyebrow">Discover Somalia</span>
              <span className="navbar__logo-star" aria-hidden="true">★</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}