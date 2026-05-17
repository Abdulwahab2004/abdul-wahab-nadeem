import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

const svgIcons = {
  'HTML5': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M4 2l2.4 27.2L16 32l9.6-2.8L28 2H4z" fill="#E34F26"/><path d="M16 29.4V4.6h-.2L6.4 6.6l1.4 16.2L16 25v4.4z" fill="#EF652A"/><path d="M16 13h5.6l-.4 4.8-5.2 1.4v4.4l9.6-2.6 1-11.6H16V13zm0-6.4h10.8l.4-4.4H16v4.4z" fill="#fff"/><path d="M16 13H10.4l-.4-4.4H16V4.6H5.6l1.4 16.2L16 23.6V19.2l-4.8-1.4L11 13z" fill="#EBEBEB"/></svg>
  ),
  'CSS3': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M4 2l2.4 27.2L16 32l9.6-2.8L28 2H4z" fill="#1572B6"/><path d="M16 29.4V4.6l-9.4 2 1.4 16.2L16 25v4.4z" fill="#33A9DC"/><path d="M16 13h5.4l-.4 4.8-5 1.4v4.4l9.6-2.6 1-11.6H16V13zm0-8.4h10.8l.4-4.4H16v4.4z" fill="#fff"/><path d="M16 13H10.4l-.4-4.4H16V4.6H5.6L7 20.8l9 2.8v-4.2l-4.8-1.4L11 13z" fill="#EBEBEB"/></svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 32 32" width="36" height="36"><rect width="32" height="32" fill="#F7DF1E"/><path d="M6 26.5l3-1.8c.6 1 1.1 1.9 2.3 1.9 1.2 0 1.9-.5 1.9-2.3V14.5h3.7v9.8c0 3.8-2.2 5.5-5.4 5.5-2.9 0-4.6-1.5-5.5-3.3zm13-.4l3-1.7c.8 1.3 1.8 2.3 3.7 2.3 1.6 0 2.5-.8 2.5-1.8 0-1.3-.9-1.7-2.6-2.4l-.9-.4c-2.6-1.1-4.3-2.5-4.3-5.4 0-2.7 2-4.7 5.2-4.7 2.3 0 3.9.8 5.1 2.9l-2.8 1.8c-.6-1.1-1.3-1.5-2.3-1.5-1 0-1.7.7-1.7 1.5 0 1.1.7 1.5 2.2 2.2l.9.4c3 1.3 4.8 2.6 4.8 5.6 0 3.2-2.5 5-5.9 5-3.3 0-5.4-1.6-6.4-3.8z" fill="#333"/></svg>
  ),
  'React.js': (
    <svg viewBox="0 0 32 32" width="36" height="36"><circle cx="16" cy="16" r="2.8" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/><ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/></svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 32 32" width="36" height="36"><circle cx="16" cy="16" r="14" fill="#000"/><path d="M10.6 10.6h2.2l8.6 11.8V10.6h2v10.8l-2 2.2-10.8-13z" fill="#fff"/></svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1Q28.6 16.5 22 16.5c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-3.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1Q21.6 24.9 15 24.9c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-3.9 2.1z" fill="#38BDF8"/></svg>
  ),
  'Bootstrap': (
    <svg viewBox="0 0 32 32" width="36" height="36"><rect width="32" height="32" rx="6" fill="#7952B3"/><path d="M9 8h8c3.3 0 5.5 1.7 5.5 4.3 0 1.8-1.1 3.3-2.8 3.8 2.2.4 3.7 2 3.7 4.1 0 3-2.3 5-6 5H9V8zm4.2 6.8h3.2c1.4 0 2.2-.7 2.2-1.8 0-1-.8-1.7-2.2-1.7h-3.2v3.5zm0 7.2h3.7c1.5 0 2.4-.8 2.4-2s-1-2-2.4-2h-3.7V22z" fill="#fff"/></svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#339933"/><text x="8.5" y="20" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">NODE</text></svg>
  ),
  'Express.js': (
    <svg viewBox="0 0 32 32" width="36" height="36"><rect width="32" height="32" rx="4" fill="#111"/><text x="4" y="21" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">expr</text></svg>
  ),
  'RESTful APIs': (
    <svg viewBox="0 0 32 32" width="36" height="36"><rect x="2" y="11" width="28" height="10" rx="5" fill="none" stroke="#00e5b3" strokeWidth="1.5"/><text x="6.5" y="19.5" fill="#00e5b3" fontSize="7" fontFamily="monospace" fontWeight="bold">REST</text></svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M16 3c-2 8-7 10-7 16a7 7 0 0014 0c0-6-5-8-7-16z" fill="#47A248"/><path d="M16 3v26" stroke="#A5C39B" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  'MySQL': (
    <svg viewBox="0 0 32 32" width="36" height="36"><ellipse cx="16" cy="10" rx="11" ry="3" fill="#F29111"/><path d="M5 10v12c0 1.66 4.93 3 11 3s11-1.34 11-3V10" fill="#00758F" stroke="none"/><ellipse cx="16" cy="10" rx="11" ry="3" fill="#F29111"/><text x="10" y="21" fill="#fff" fontSize="6.5" fontFamily="monospace">MySQL</text></svg>
  ),
  'Git': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path d="M30 14.6L17.4 2c-.8-.8-2-.8-2.8 0L12 4.6l3.5 3.5c.8-.3 1.8-.1 2.4.6.6.6.8 1.5.6 2.3l3.4 3.4c.8-.2 1.7 0 2.3.6 1.1 1.1 1.1 2.8 0 3.9s-2.8 1.1-3.9 0c-.7-.7-.9-1.7-.6-2.6l-3.2-3.2V19c.2.1.5.2.7.4 1.1 1.1 1.1 2.8 0 3.9s-2.8 1.1-3.9 0-1.1-2.8 0-3.9c.3-.3.6-.5.9-.6v-5.8c-.4-.1-.7-.3-1-.6-.7-.7-.9-1.7-.6-2.6L9.2 7.3 2 14.5c-.8.8-.8 2 0 2.8L14.6 30c.8.8 2 .8 2.8 0L30 17.4c.8-.8.8-2 0-2.8z" fill="#F05032"/></svg>
  ),
  'GitHub': (
    <svg viewBox="0 0 32 32" width="36" height="36"><path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.9-3.1-.3-6.4-1.5-6.4-6.8 0-1.5.5-2.7 1.4-3.7-.1-.4-.6-1.7.1-3.6 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.4 3.3-.4 1.1 0 2.2.2 3.3.4 2.6-1.7 3.7-1.4 3.7-1.4.7 1.9.3 3.2.1 3.6.9 1 1.4 2.2 1.4 3.7 0 5.3-3.2 6.5-6.3 6.8.5.4.9 1.3.9 2.6v3.8c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z" fill="#fff"/></svg>
  ),
  'npm': (
    <svg viewBox="0 0 32 32" width="36" height="36"><rect x="2" y="8" width="28" height="16" rx="2" fill="#CB3837"/><text x="7" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">npm</text></svg>
  ),
  'Postman': (
    <svg viewBox="0 0 32 32" width="36" height="36"><circle cx="16" cy="16" r="13" fill="#FF6C37"/><path d="M10 22l10-10M16 10l4 2-2 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/><circle cx="21" cy="11" r="2" fill="#fff" opacity="0.85"/></svg>
  ),
}

function SkillCard({ name, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -8, scale: 1.06, borderColor: color + '55', boxShadow: `0 16px 40px ${color}22` }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '20px 12px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 10,
        cursor: 'none', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at center, ${color}12, transparent 65%)`,
        opacity: 0, transition: 'opacity 0.3s',
      }} className="skill-glow" />
      {svgIcons[name] || <div style={{ width: 36, height: 36, borderRadius: 8, background: color + '33' }} />}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3,
      }}>{name}</span>
    </motion.div>
  )
}

function CategoryTitle({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
      color: 'var(--muted)', letterSpacing: '0.14em',
      textTransform: 'uppercase', marginBottom: 18,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useReveal()

  return (
    <section id="skills" ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,120px)' }}>
      <SectionLabel inView={inView}>WHAT I KNOW</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          letterSpacing: '-0.03em', marginBottom: 56,
        }}
      >
        Technical Arsenal
      </motion.h2>

      {[
        { label: '⚡ Frontend', items: data.skills.frontend },
        { label: '🔧 Backend & Database', items: data.skills.backend },
        { label: '🛠 Tools & DevOps', items: data.skills.tools },
      ].map(({ label, items }) => (
        <div key={label} style={{ marginBottom: 44 }}>
          <CategoryTitle>{label}</CategoryTitle>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 14,
          }}>
            {items.map((skill, i) => (
              <SkillCard key={skill.name} name={skill.name} color={skill.color} index={i} />
            ))}
          </div>
        </div>
      ))}

      {/* Soft skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16, padding: '32px 36px',
          marginTop: 8,
        }}
      >
        <CategoryTitle>🧠 Non-Technical</CategoryTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {data.skills.soft.map((s, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '6px 16px', borderRadius: 100,
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                background: 'rgba(0,229,179,0.07)',
                color: 'var(--text2)',
                border: '1px solid rgba(0,229,179,0.15)',
              }}
            >{s}</motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
