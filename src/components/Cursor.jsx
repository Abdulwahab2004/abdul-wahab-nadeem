import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let x = 0, y = 0
    let rx = 0, ry = 0

    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }
    window.addEventListener('mousemove', move)

    const lerp = (a, b, n) => a + (b - a) * n

    let raf
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 5}px, ${y - 5}px)`
      }
      if (ringRef.current) {
        rx = lerp(rx, x, 0.13)
        ry = lerp(ry, y, 0.13)
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Scale on hover
    const onEnter = () => {
      dotRef.current?.style && (dotRef.current.style.transform = `translate(${x - 5}px, ${y - 5}px) scale(2.5)`)
      ringRef.current?.style && (ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(0.5)`)
    }
    const onLeave = () => {
      dotRef.current?.style && (dotRef.current.style.scale = '1')
      ringRef.current?.style && (ringRef.current.style.scale = '1')
    }
    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

   return () => {
  window.removeEventListener('mousemove', move)
  cancelAnimationFrame(raf)

  interactives.forEach(el => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  })
}
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10,
          background: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'scale 0.2s',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          border: '1.5px solid rgba(0,229,179,0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'scale 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
