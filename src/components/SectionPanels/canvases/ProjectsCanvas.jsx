import { useRef, useEffect } from 'react'

const ACCENT = '#0071e3'

function lerp(a, b, t) { return a + (b - a) * t }

export default function ProjectsCanvas({ isHovered }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ raf: null, progress: 0 })
  const isHoveredRef = useRef(isHovered)

  useEffect(() => { isHoveredRef.current = isHovered }, [isHovered])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    function initCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    // Draw a single project card outline with animated inner content
    function drawCard(x, y, w, h, cardProgress, alpha) {
      if (cardProgress <= 0 || alpha <= 0) return
      const r = 12

      // Card border — draws in clockwise from top-left
      const perimeter = 2 * (w + h)
      const drawn = perimeter * Math.min(cardProgress * 1.4, 1)

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = ACCENT
      ctx.lineWidth = 1.2

      // Trace perimeter as a partial rect
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      let rem = drawn
      // top edge
      const top = w - 2 * r
      if (rem > 0) { ctx.lineTo(x + r + Math.min(rem, top), y); rem -= top }
      // top-right corner (approx)
      if (rem > 0) { ctx.lineTo(x + w, y + Math.min(rem, h / 2)); rem -= h / 2 }
      if (rem > 0) { ctx.lineTo(x + w, y + h - Math.min(rem, h / 2)); rem -= h / 2 }
      if (rem > 0) { ctx.lineTo(x + w - Math.min(rem, w), y + h); rem -= w }
      if (rem > 0) { ctx.lineTo(x, y + h - Math.min(rem, h)); rem -= h }
      if (rem > 0) { ctx.lineTo(x, y + Math.min(rem, h / 2)) }
      ctx.stroke()

      // Inner content lines — appear after card border is mostly drawn
      const innerProgress = Math.max(0, (cardProgress - 0.5) * 2)
      if (innerProgress <= 0) { ctx.restore(); return }

      const pad = 14
      const lineAlpha = innerProgress * alpha

      // Badge dot
      ctx.fillStyle = ACCENT
      ctx.globalAlpha = lineAlpha * 0.7
      ctx.beginPath()
      ctx.arc(x + pad + 4, y + pad + 4, 3.5, 0, Math.PI * 2)
      ctx.fill()

      // Title bar
      ctx.globalAlpha = lineAlpha * 0.55
      ctx.fillStyle = ACCENT
      const titleW = (w - pad * 2) * Math.min(innerProgress * 1.5, 1)
      ctx.fillRect(x + pad, y + pad + 14, titleW, 7)

      // Description lines (3)
      ctx.globalAlpha = lineAlpha * 0.25
      ;[0, 1, 2].forEach((n) => {
        const lineW = (w - pad * 2) * (n === 2 ? 0.6 : 0.92) * Math.min(innerProgress * 2 - n * 0.3, 1)
        if (lineW > 0) ctx.fillRect(x + pad, y + pad + 30 + n * 10, lineW, 4)
      })

      // Tag pills
      ctx.globalAlpha = lineAlpha * 0.35
      ;[0, 1, 2].forEach((n) => {
        const pillW = 32 + n * 8
        const pillX = x + pad + n * (pillW + 6)
        if (pillX + pillW < x + w - pad && innerProgress > 0.6) {
          ctx.strokeStyle = ACCENT
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.roundRect(pillX, y + h - pad - 14, pillW, 12, 6)
          ctx.stroke()
        }
      })

      ctx.restore()
    }

    function draw() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const target = isHoveredRef.current ? 1 : 0
      state.progress = lerp(state.progress, target, isHoveredRef.current ? 0.04 : 0.06)

      if (state.progress < 0.005) { state.raf = requestAnimationFrame(draw); return }

      // 2-column card grid layout
      const cols = 2
      const rows = 2
      const gapX = 16
      const gapY = 16
      const padX = 28
      const padY = 60 // leave room for text at top
      const cardW = (w - padX * 2 - gapX * (cols - 1)) / cols
      const cardH = (h - padY - 40 - gapY * (rows - 1)) / rows

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          const stagger = idx * 0.18
          const cardProgress = Math.max(0, (state.progress - stagger) / (1 - stagger * 0.5))
          const cx = padX + col * (cardW + gapX)
          const cy = padY + row * (cardH + gapY)
          drawCard(cx, cy, cardW, cardH, Math.min(cardProgress * 1.6, 1), Math.min(state.progress * 2, 0.9))
        }
      }

      state.raf = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) state.raf = requestAnimationFrame(draw)
        else cancelAnimationFrame(state.raf)
      },
      { threshold: 0 }
    )

    const resizeObserver = new ResizeObserver(() => { initCanvas() })

    initCanvas()
    observer.observe(canvas)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(state.raf)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
