import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

const links = ['about', 'skills', 'experience', 'projects', 'education', 'contact']

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  useEffect(() => {
    const onScroll = () => {
      links.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom > 0) setActive(id)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,

    background: scrolled || menuOpen
      ? 'rgba(4,6,15,0.92)'
      : 'transparent',

    backdropFilter: scrolled || menuOpen
      ? 'blur(24px)'
      : 'none',

    borderBottom:
      scrolled || menuOpen
        ? '1px solid var(--border)'
        : '1px solid transparent',

    transition:
      'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
  }}
>
  <div
  style={{
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    boxSizing: 'border-box',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: isMobile
      ? '16px 18px'
      : '16px 60px',
  }}
>
        {/* Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          onClick={handleLinkClick}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800, fontSize: '1.25rem',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em', cursor: 'none', zIndex: 201,
          }}
        >
          AWN.
        </motion.a>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: 36, margin: 0, padding: 0 }}>
            {links.map((link, i) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                style={{ listStyle: 'none' }}
              >
                <a
                  href={`#${link}`}
                  data-hover
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    color: active === link ? 'var(--accent)' : 'var(--muted)',
                    position: 'relative',
                    transition: 'color 0.3s',
                    padding: '4px 0',
                  }}
                >
                  {link}
                  {active === link && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: -4, left: 0, right: 0,
                        height: 1, background: 'var(--accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none',
              width: 36, height: 36,
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-center', justifyContent: 'center',
              gap: 5, cursor: 'pointer', zIndex: 201,
              padding: 0, flexShrink: 0,
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', width: 22, height: 1.5, background: menuOpen ? 'var(--accent)' : 'var(--text)', transformOrigin: 'center', flexShrink: 0 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 16, height: 1.5, background: 'var(--text)', flexShrink: 0 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', width: 22, height: 1.5, background: menuOpen ? 'var(--accent)' : 'var(--text)', transformOrigin: 'center', flexShrink: 0 }}
            />
          </button>
        )}
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: 'rgba(4,6,15,0.97)',
              backdropFilter: 'blur(28px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link}`}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.065, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '2.2rem', letterSpacing: '-0.03em',
                  color: active === link ? 'var(--accent)' : 'var(--text)',
                  padding: '10px 28px', borderRadius: 8,
                  transition: 'color 0.2s', cursor: 'none',
                  textTransform: 'lowercase',
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute', bottom: 52,
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: 'var(--muted)', letterSpacing: '0.1em',
              }}
            >
              wahabndm@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
