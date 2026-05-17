import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.9-3.1-.3-6.4-1.5-6.4-6.8 0-1.5.5-2.7 1.4-3.7-.1-.4-.6-1.7.1-3.6 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.4 3.3-.4 1.1 0 2.2.2 3.3.4 2.6-1.7 3.7-1.4 3.7-1.4.7 1.9.3 3.2.1 3.6.9 1 1.4 2.2 1.4 3.7 0 5.3-3.2 6.5-6.3 6.8.5.4.9 1.3.9 2.6v3.8c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const socialIcons = { GitHub: <GithubIcon />, LinkedIn: <LinkedinIcon />, Email: <MailIcon /> }

export default function Contact() {
  const [ref, inView] = useReveal()

  return (
    <section id="contact" ref={ref} style={{
      maxWidth: 1200, margin: '0 auto',
      padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,140px)',
      textAlign: 'center', position: 'relative',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(0,229,179,0.055), transparent 65%)',
        pointerEvents: 'none',
      }} />

      <SectionLabel inView={inView} style={{ justifyContent: 'center' }}>SAY HELLO</SectionLabel>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          letterSpacing: '-0.03em', marginBottom: 16,
        }}
      >
        Let's Work Together
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: 'var(--text2)', maxWidth: 480, margin: '0 auto 36px',
          lineHeight: 1.8, fontSize: '1rem',
        }}
      >
        Have a project in mind or want to collaborate? I'm open to new opportunities and would love to connect.
      </motion.p>

      <motion.a
        href={`mailto:${data.email}`}
        data-hover
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.04, filter: 'brightness(1.15)' }}
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1.3rem, 3vw, 2rem)',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 52, transition: 'filter 0.3s',
        }}
      >
        {data.email}
      </motion.a>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {data.socials.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            data-hover
            whileHover={{ y: -4, borderColor: 'rgba(0,229,179,0.4)', background: 'rgba(0,229,179,0.07)', boxShadow: '0 12px 40px rgba(0,229,179,0.12)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 26px', borderRadius: 100,
              border: '1px solid var(--border2)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              transition: 'all 0.3s ease',
            }}
          >
            {socialIcons[s.label]}
            {s.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
