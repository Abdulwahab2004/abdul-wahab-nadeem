import { motion } from 'framer-motion'

export default function SectionLabel({ children, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: 'var(--accent)', letterSpacing: '0.2em',
        textTransform: 'uppercase', marginBottom: 14,
      }}
    >
      <span style={{ width: 28, height: 1, background: 'var(--accent)', opacity: 0.7 }} />
      {children}
    </motion.div>
  )
}
