import { useRef, useEffect } from 'react'

const COLOR = '#0071e3'
const NODE_COUNT = 24
const CONNECT_DIST = 140

function lerp(a, b, t) { return a + (b - a) * t }

function makeNodes(w, h) {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: 1.5 + Math.random() * 2.5,
  }))
}

export default function ProjectsCanvas({ isHovered }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ raf: null, nodes: [], globalProgress: 0, speedMult: 1 })
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
      if (!s.nodes.length) s.nodes = makeNodes(w, h)

      ctx.clearRect(0, 0, w, h)

      const hovering = isHoveredRef.current
      if (hovering && !prevHoveredRef.current) s.nodes = makeNodes(w, h)
      prevHoveredRef.current = hovering

      s.globalProgress = lerp(s.globalProgress, hovering ? 1 : 0, hovering ? 0.04 : 0.055)
      s.speedMult = lerp(s.speedMult, hovering ? 2.2 : 1, 0.05)

      if (s.globalProgress < 0.004) { s.raf = requestAnimationFrame(draw); return }

      s.nodes.forEach((n) => {
        n.x += n.vx * s.speedMult
        n.y += n.vy * s.speedMult
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.x = Math.max(0, Math.min(w, n.x))
        n.y = Math.max(0, Math.min(h, n.y))
      })

      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i], b = s.nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.5 * s.globalProgress
            ctx.strokeStyle = COLOR
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      s.nodes.forEach((n) => {
        ctx.globalAlpha = s.globalProgress * 0.85
        ctx.fillStyle = COLOR
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
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
    const resizeObserver = new ResizeObserver(() => { initCanvas(); s.nodes = [] })

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
