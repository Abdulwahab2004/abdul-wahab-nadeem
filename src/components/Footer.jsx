export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px clamp(20px,5vw,60px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
      color: 'var(--muted)',
      position: 'relative', zIndex: 2,
    }}>
      <span>© 2025 Abdul Wahab Nadeem</span>
      <span style={{ color: 'rgba(0,229,179,0.45)' }}>
        Built with React · Deployed on Netlify · Lahore, Pakistan 🇵🇰
      </span>
    </footer>
  )
}
