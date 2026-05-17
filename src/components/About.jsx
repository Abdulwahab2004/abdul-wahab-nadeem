import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

function CountUp({ target, suffix, inView }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 55
    const timer = setInterval(() => {
      start += step
      if (ref.current) ref.current.textContent = Math.min(Math.round(start), target) + suffix
      if (start >= target) clearInterval(timer)
    }, 28)
    return () => clearInterval(timer)
  }, [inView, target, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function About() {
  const [ref, inView] = useReveal()

  return (
    <section id="about" ref={ref} style={{
      maxWidth: 1200, margin: '0 auto',
      padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,60px)',
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%), 1fr))',
      gap: 80, alignItems: 'center',
    }}>
      {/* Text */}
      <div>
        <SectionLabel inView={inView}>WHO I AM</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Crafting digital experiences<br />
          that{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            actually matter
          </span>
        </motion.h2>

        {[data.summary, data.summary2].map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
            style={{
              color: 'var(--text2)', lineHeight: 1.85,
              fontSize: '1rem', marginBottom: 16,
            }}
          >
            {p}
          </motion.p>
        ))}

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%), 1fr))',
          gap: 16, marginTop: 36,
        }}>
          {data.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
              whileHover={{ y: -4, borderColor: 'rgba(0,229,179,0.3)', boxShadow: 'var(--glow-accent)' }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12, padding: '22px 20px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '2rem',
                fontWeight: 800, color: 'var(--accent)',
              }}>
                <CountUp target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual — tech stack orbit display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div style={{
          width: 320, height: 320, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Dashed rings */}
          {[1, 0.7, 0.45].map((scale, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 280 * scale, height: 280 * scale,
              borderRadius: '50%',
              border: `1px dashed ${i === 0 ? 'rgba(0,229,179,0.15)' : i === 1 ? 'rgba(108,77,255,0.12)' : 'rgba(255,94,125,0.1)'}`,
              animation: `rotateRing ${22 + i * 5}s linear ${i % 2 ? 'reverse' : ''} infinite`,
            }} />
          ))}
          {/* Center card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,179,0.07), rgba(108,77,255,0.08))',
              border: '1px solid rgba(0,229,179,0.18)',
              borderRadius: 20, padding: '28px 32px',
              backdropFilter: 'blur(16px)',
              textAlign: 'center', zIndex: 1,
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: 8 }}>🚀</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
              MERN Stack
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', marginTop: 4 }}>
              Full-Stack Developer
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
