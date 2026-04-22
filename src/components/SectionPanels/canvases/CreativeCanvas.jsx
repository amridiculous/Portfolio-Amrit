import { useRef, useEffect } from 'react'

const PALETTE = ['#ff375f', '#ff6b81', '#e879f9', '#c084fc', '#fb923c', '#f472b6']

function lerp(a, b, t) { return a + (b - a) * t }

function cubicBezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  }
}

function drawPartialBezier(ctx, pts, progress, color, width, opacity) {
  if (progress <= 0) return
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.globalAlpha = opacity
  ctx.beginPath()
  const steps = 48
  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * Math.min(progress, 1)
    const pt = cubicBezierPoint(pts[0], pts[1], pts[2], pts[3], t)
    s === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)
  }
  ctx.stroke()
  ctx.restore()
}

function generateStrokes(w, h) {
  const count = 9
  return Array.from({ length: count }, (_, i) => {
    // Spread origins across the canvas, not just center
    const cx = w * (0.2 + Math.random() * 0.6)
    const cy = h * (0.25 + Math.random() * 0.5)
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8
    const len = Math.min(w, h) * (0.25 + Math.random() * 0.35)
    const curve = (Math.random() - 0.5) * 1.8
    return {
      pts: [
        { x: cx, y: cy },
        { x: cx + Math.cos(angle + curve) * len * 0.35, y: cy + Math.sin(angle + curve) * len * 0.35 },
        { x: cx + Math.cos(angle - curve * 0.5) * len * 0.7, y: cy + Math.sin(angle - curve * 0.5) * len * 0.7 },
        { x: cx + Math.cos(angle) * len, y: cy + Math.sin(angle) * len },
      ],
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      width: 8 + Math.random() * 22,
      opacity: 0.55 + Math.random() * 0.35,
      progress: 0,
      speed: 0.007 + Math.random() * 0.012,
      delay: i * 0.08, // normalised 0–1 delay
    }
  })
}

export default function CreativeCanvas({ isHovered }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ raf: null, globalProgress: 0, strokes: [], initialised: false })
  const isHoveredRef = useRef(isHovered)
  const prevHoveredRef = useRef(isHovered)

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

    function resetStrokes() {
      state.strokes = generateStrokes(canvas.offsetWidth, canvas.offsetHeight)
      state.globalProgress = 0
    }

    function draw() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const hovering = isHoveredRef.current

      // Trigger fresh burst on hover entry
      if (hovering && !prevHoveredRef.current) resetStrokes()
      prevHoveredRef.current = hovering

      if (!state.strokes.length) resetStrokes()

      // Advance global progress toward target
      const target = hovering ? 1 : 0
      state.globalProgress = lerp(state.globalProgress, target, hovering ? 0.035 : 0.055)

      if (state.globalProgress < 0.005) { state.raf = requestAnimationFrame(draw); return }

      // Advance individual stroke progress
      state.strokes.forEach((stroke) => {
        const effective = Math.max(0, state.globalProgress - stroke.delay)
        stroke.progress = Math.min(effective * 1.4, 1)
      })

      // Draw each stroke
      state.strokes.forEach((stroke) => {
        drawPartialBezier(ctx, stroke.pts, stroke.progress, stroke.color, stroke.width, stroke.opacity * state.globalProgress)
      })

      state.raf = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) state.raf = requestAnimationFrame(draw)
        else cancelAnimationFrame(state.raf)
      },
      { threshold: 0 }
    )

    const resizeObserver = new ResizeObserver(() => {
      initCanvas()
      state.strokes = []
    })

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
