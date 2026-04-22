import { useRef, useEffect } from 'react'

const COLOR = '#34c759'
const WAVE_COUNT = 7

function lerp(a, b, t) { return a + (b - a) * t }

function makeWaves(h) {
  return Array.from({ length: WAVE_COUNT }, (_, i) => ({
    yBase: (h / (WAVE_COUNT + 1)) * (i + 1),
    amplitude: 18 + Math.random() * 32,
    freq: 0.003 + Math.random() * 0.004,
    phase: Math.random() * Math.PI * 2,
    speed: 0.35 + Math.random() * 0.45,
    opacity: 0.18 + (i / WAVE_COUNT) * 0.45,
    lineWidth: 1 + Math.random() * 1.8,
  }))
}

export default function ExperienceCanvas({ isHovered }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ raf: null, waves: [], time: 0, globalProgress: 0 })
  const isHoveredRef = useRef(isHovered)
  const prevHoveredRef = useRef(isHovered)

  useEffect(() => { isHoveredRef.current = isHovered }, [isHovered])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const s = stateRef.current

    function initCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    function draw() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (!s.waves.length) s.waves = makeWaves(h)

      ctx.clearRect(0, 0, w, h)

      const hovering = isHoveredRef.current
      if (hovering && !prevHoveredRef.current) s.waves = makeWaves(h)
      prevHoveredRef.current = hovering

      s.globalProgress = lerp(s.globalProgress, hovering ? 1 : 0, hovering ? 0.04 : 0.055)

      if (s.globalProgress < 0.004) { s.raf = requestAnimationFrame(draw); return }

      s.time += 0.012

      s.waves.forEach((wave) => {
        const amp = wave.amplitude * s.globalProgress
        ctx.beginPath()
        ctx.strokeStyle = COLOR
        ctx.lineWidth = wave.lineWidth
        ctx.lineCap = 'round'
        ctx.globalAlpha = wave.opacity * s.globalProgress
        for (let x = 0; x <= w; x += 3) {
          const y = wave.yBase + amp * Math.sin(x * wave.freq + s.time * wave.speed + wave.phase)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      ctx.globalAlpha = 1
      s.raf = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) s.raf = requestAnimationFrame(draw)
        else cancelAnimationFrame(s.raf)
      },
      { threshold: 0 }
    )
    const resizeObserver = new ResizeObserver(() => { initCanvas(); s.waves = [] })

    initCanvas()
    observer.observe(canvas)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(s.raf)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
  )
}
