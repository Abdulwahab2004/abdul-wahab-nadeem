import Cursor from './components/Cursor'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Divider from './components/Divider'

// Ambient mesh gradient background
function MeshBg() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `
        radial-gradient(ellipse 70% 55% at 8% 18%, rgba(0,229,179,0.055) 0%, transparent 55%),
        radial-gradient(ellipse 55% 70% at 92% 82%, rgba(108,77,255,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 45% 45% at 50% 50%, rgba(255,94,125,0.025) 0%, transparent 60%)
      `,
    }} />
  )
}

// Noise texture overlay
function Noise() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.4,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
    }} />
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <ParticleCanvas />
      <MeshBg />
      <Noise />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Skills />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Education />
          <Divider />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
