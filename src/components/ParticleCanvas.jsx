import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], mouse = { x: -999, y: -999 }
    let raf

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const COLORS = [[0, 229, 179], [108, 77, 255], [255, 94, 125]]

    class P {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.r = Math.random() * 1.4 + 0.4
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.alpha = Math.random() * 0.5 + 0.15
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.twinkle = Math.random() * Math.PI * 2
        this.twinkleSpeed = Math.random() * 0.02 + 0.005
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120) {
          this.vx += (dx / d) * 0.08
          this.vy += (dy / d) * 0.08
        }
        this.vx *= 0.98; this.vy *= 0.98
        this.x += this.vx; this.y += this.vy
        this.twinkle += this.twinkleSpeed
        if (this.x < 0 || this.x > W) this.vx *= -1
        if (this.y < 0 || this.y > H) this.vy *= -1
      }
      draw() {
        const a = this.alpha * (0.7 + 0.3 * Math.sin(this.twinkle))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.join(',')},${a})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 130; i++) particles.push(new P())

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,229,179,${0.07 * (1 - d / 110)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      drawLines()
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
        opacity: 0.65,
      }}
    />
  )
}
