import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

export default function Experience() {
  const [ref, inView] = useReveal()

  return (
    <section id="experience" ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,120px)' }}>
      <SectionLabel inView={inView}>CAREER PATH</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          letterSpacing: '-0.03em', marginBottom: 60,
        }}
      >
        Work Experience
      </motion.h2>

      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', left: 19, top: 8,
            width: 1, height: '100%',
            background: 'linear-gradient(to bottom, var(--accent), rgba(0,229,179,0.05))',
            transformOrigin: 'top',
          }}
        />

        {data.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingLeft: 60, marginBottom: 56, position: 'relative' }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: 12, top: 6,
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--accent)',
              border: '2px solid var(--bg)',
              boxShadow: '0 0 0 4px rgba(0,229,179,0.2)',
              animation: 'dotPulse 2.2s ease-in-out infinite',
            }} />

            {/* Date badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: '0.74rem',
              color: 'var(--accent)', marginBottom: 10,
              background: 'rgba(0,229,179,0.07)',
              padding: '4px 14px', borderRadius: 100,
              border: '1px solid rgba(0,229,179,0.18)',
            }}>
              {exp.period}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.5rem', letterSpacing: '-0.02em',
              }}>{exp.role}</h3>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'var(--accent2)', background: 'rgba(108,77,255,0.1)',
                padding: '3px 12px', borderRadius: 100,
                border: '1px solid rgba(108,77,255,0.2)',
              }}>{exp.type}</span>
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 20 }}>{exp.company}</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {exp.points.map((pt, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 + j * 0.1 }}
                  style={{
                    color: 'var(--text2)', fontSize: '0.95rem',
                    lineHeight: 1.75, paddingLeft: 22, position: 'relative',
                  }}
                >
                  <span style={{
                    position: 'absolute', left: 0, top: '0.3em',
                    color: 'var(--accent)', fontSize: '0.7rem',
                  }}>▸</span>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
