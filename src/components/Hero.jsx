import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { data } from '../data'

function GlitchText({ text, style }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      {text}
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        color: 'var(--accent)',
        fontFamily: 'var(--font-display)', fontWeight: 800,
        animation: 'glitch1 5s infinite',
        pointerEvents: 'none',
      }}>{text}</span>
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        color: 'var(--accent2)',
        fontFamily: 'var(--font-display)', fontWeight: 800,
        animation: 'glitch2 5s infinite',
        pointerEvents: 'none',
      }}>{text}</span>
    </span>
  )
}

function OrbitSystem({ size = 300 }) {
  const center = size / 2
  const radii = [center * 0.88, center * 0.62, center * 0.38]
  const colors = ['rgba(0,229,179,0.2)', 'rgba(108,77,255,0.2)', 'rgba(255,94,125,0.15)']
  const dotColors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)']
  const durations = [20, 14, 24]

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto', flexShrink: 0 }}>
      {radii.map((r, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: center - r, left: center - r,
          width: r * 2, height: r * 2,
          borderRadius: '50%',
          border: `1px solid ${colors[i]}`,
          animation: `rotateRing ${durations[i]}s linear ${i % 2 === 1 ? 'reverse' : ''} infinite`,
        }}>
          <div style={{
            position: 'absolute',
            width: i === 0 ? 10 : i === 1 ? 8 : 6,
            height: i === 0 ? 10 : i === 1 ? 8 : 6,
            borderRadius: '50%',
            background: dotColors[i],
            boxShadow: `0 0 14px ${dotColors[i]}`,
            top: '50%', left: -5,
            transform: 'translateY(-50%)',
          }} />
        </div>
      ))}
      {/* Center circle */}
      <div style={{
        position: 'absolute',
        top: center - center * 0.28, left: center - center * 0.28,
        width: center * 0.56, height: center * 0.56,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0,229,179,0.08), rgba(108,77,255,0.1))',
        border: '1px solid rgba(0,229,179,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)',
        flexDirection: 'column', gap: 2,
      }}>
        <span style={{ fontSize: size > 240 ? '2.2rem' : '1.5rem' }}>💻</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: 'var(--accent)', letterSpacing: '0.15em',
        }}>DEV</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const target = data.roles[roleIdx]
    let timeout
    if (!deleting) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 85)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2400)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
      } else {
        setDeleting(false)
        setRoleIdx((roleIdx + 1) % data.roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  const nameVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }
  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '100px 24px 80px' : '120px 60px 80px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
        // Stack vertically on mobile, side-by-side on desktop
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 48 : 80,
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      {/* ── LEFT / TOP column ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.18em',
            marginBottom: 28,
          }}
        >
          <span style={{ width: 28, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
          AVAILABLE FOR OPPORTUNITIES
          <span style={{ width: 28, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
        </motion.div>

        {/* Name */}
      <motion.h1
  variants={nameVariants}
  initial="hidden"
  animate="show"
  style={{
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    lineHeight: isMobile ? 1.02 : 0.92,
    letterSpacing: isMobile ? '-0.02em' : '-0.04em',

    // Better responsive sizing
    fontSize: isMobile
      ? 'clamp(2.1rem, 11vw, 3.4rem)'
      : 'clamp(3.2rem, 7vw, 6rem)',

    marginBottom: 24,

    // Prevent overflow
    width: '100%',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  }}
>
          {data.nameLines.map((line, i) => (
           <div key={i} style={{ overflow: 'hidden', width: '100%', }}>
            <motion.div variants={lineVariants}>
                {i === 1 ? (
                  <GlitchText text={line} style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.35)',
                  }} />
                ) : (
                  <span>{line}</span>
                )}
              </motion.div>
            </div>
          ))}
        </motion.h1>

        {/* Typing role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? '0.9rem' : '1.05rem',
            color: 'var(--text2)',
            marginBottom: 10,
            minHeight: '1.6em',
          }}
        >
          {displayed}
          <span style={{
            display: 'inline-block', width: 2, height: '1em',
            background: 'var(--accent)', marginLeft: 3,
            verticalAlign: 'text-bottom',
            animation: 'blink 0.8s step-end infinite',
          }} />
        </motion.p>

        {/* Location / email */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--muted)', marginBottom: 36,
            wordBreak: 'break-all',
          }}
        >
          📍 {data.location} &nbsp;·&nbsp; {data.email}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          <motion.a
            href="#contact"
            data-hover
            whileHover={{ y: -3, boxShadow: '0 16px 50px rgba(0,229,179,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '12px 24px' : '14px 32px',
              background: 'var(--accent)',
              color: '#04060f',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            ✉ GET IN TOUCH
          </motion.a>
          <motion.a
            href="#projects"
            data-hover
            whileHover={{ y: -3, borderColor: 'rgba(0,229,179,0.4)', background: 'rgba(0,229,179,0.05)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '12px 24px' : '14px 32px',
              background: 'transparent',
              color: 'var(--text)',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              border: '1px solid var(--border2)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            VIEW PROJECTS →
          </motion.a>
        </motion.div>
      </div>

      {/* ── RIGHT / BOTTOM column — Orbit ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <OrbitSystem size={isMobile ? 220 : 300} />
      </motion.div>

      {/* Scroll indicator — hidden on mobile to save space */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--muted)', letterSpacing: '0.15em',
          }}
        >
          <div style={{
            width: 1, height: 52,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollLine 1.8s ease-in-out infinite',
          }} />
          SCROLL
        </motion.div>
      )}
    </section>
  )
}
