import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

export default function Education() {
  const [ref, inView] = useReveal()

  return (
    <section id="education" ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,120px)' }}>
      <SectionLabel inView={inView}>BACKGROUND</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          letterSpacing: '-0.03em', marginBottom: 48,
        }}
      >
        Education
      </motion.h2>

      {data.education.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
          whileHover={{ y: -4, boxShadow: 'var(--glow-accent)' }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16, padding: '40px 44px',
            display: 'grid', gridTemplateColumns: 'minmax(0,1fr)',
            alignItems: 'center', gap: 40,
            position: 'relative', overflow: 'hidden',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Left accent bar */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
            background: 'linear-gradient(to bottom, var(--accent), var(--accent2))',
            borderRadius: '16px 0 0 16px',
          }} />

          {/* Graduation cap bg */}
          <div style={{
            position: 'absolute', right: 120, top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '8rem', opacity: 0.04,
            pointerEvents: 'none', userSelect: 'none',
          }}>🎓</div>

          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.45rem', marginBottom: 8, letterSpacing: '-0.01em',
            }}>{edu.degree}</h3>
            <p style={{ color: 'var(--accent)', fontSize: '0.92rem', marginBottom: 10 }}>{edu.school}</p>
            <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7 }}>{edu.detail}</p>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            color: 'var(--accent)',
            background: 'rgba(0,229,179,0.07)',
            padding: '10px 22px', borderRadius: 100,
            border: '1px solid rgba(0,229,179,0.18)',
            whiteSpace: 'nowrap',
          }}>
            {edu.period}
          </div>
        </motion.div>
      ))}
    </section>
  )
}
