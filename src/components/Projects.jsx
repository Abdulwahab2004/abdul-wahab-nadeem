import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

export default function Projects() {
  const [ref, inView] = useReveal()

  return (
    <section id="projects" ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,120px)' }}>
      <SectionLabel inView={inView}>WHAT I BUILT</SectionLabel>
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
        Featured Projects
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(480px, 100%), 1fr))',
        gap: 24,
      }}>
        {data.projects.map((proj, i) => (
          <motion.div
            key={proj.num}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, borderColor: proj.color + '44' }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 18, padding: '36px 32px',
              position: 'relative', overflow: 'hidden',
              cursor: 'none', transition: 'border-color 0.3s',
            }}
          >
            {/* BG glow blob */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${proj.color}14, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Number */}
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '3.5rem', lineHeight: 1,
              color: proj.color + '18',
              marginBottom: 16,
            }}>{proj.num}</div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.3rem', marginBottom: 12,
              letterSpacing: '-0.01em',
            }}>{proj.title}</h3>

            {/* Desc */}
            <p style={{
              color: 'var(--text2)', fontSize: '0.92rem',
              lineHeight: 1.75, marginBottom: 22,
            }}>{proj.desc}</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 13px', borderRadius: 100,
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: proj.color,
                  background: proj.color + '12',
                  border: `1px solid ${proj.color}28`,
                }}>{tag}</span>
              ))}
            </div>

            {/* Bottom accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
