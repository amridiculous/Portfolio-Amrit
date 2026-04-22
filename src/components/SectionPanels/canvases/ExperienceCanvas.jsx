import { useRef, useEffect } from 'react'

const ACCENT = '#34c759'

function lerp(a, b, t) { return a + (b - a) * t }

export default function ExperienceCanvas({ isHovered }) {
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

    const ITEMS = 4 // matching the 4 real experience entries

    function draw() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const target = isHoveredRef.current ? 1 : 0
      state.progress = lerp(state.progress, target, isHoveredRef.current ? 0.04 : 0.06)

      if (state.progress < 0.005) { state.raf = requestAnimationFrame(draw); return }

      const p = state.progress
      const padX = 36
      const padTop = 60  // below the text
      const lineX = padX
      const usableH = h - padTop - 40
      const spacing = usableH / (ITEMS - 1)

      // Vertical spine line — draws downward with progress
      const spineAlpha = Math.min(p * 2, 0.9)
      const spineH = usableH * Math.min(p * 1.6, 1)

      ctx.save()
      ctx.strokeStyle = ACCENT
      ctx.globalAlpha = spineAlpha * 0.35
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(lineX, padTop)
      ctx.lineTo(lineX, padTop + spineH)
      ctx.stroke()
      ctx.restore()

      // Timeline items
      for (let i = 0; i < ITEMS; i++) {
        const stagger = i * 0.18
        const itemP = Math.max(0, Math.min((p - stagger) * 2.2, 1))
        if (itemP <= 0) continue

        const iy = padTop + i * spacing
        const alpha = itemP * spineAlpha

        // Dot
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = ACCENT
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(lineX, iy, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()

        // Period label (short line as placeholder)
        ctx.save()
        ctx.globalAlpha = alpha * 0.45
        ctx.fillStyle = ACCENT
        const periodW = 60 * Math.min(itemP * 2, 1)
        ctx.fillRect(lineX + 18, iy - 8, periodW, 3.5)
        ctx.restore()

        // Role title bar
        ctx.save()
        ctx.globalAlpha = alpha * 0.7
        ctx.fillStyle = ACCENT
        const titleW = (w * 0.55) * Math.min(itemP * 1.8, 1)
        ctx.fillRect(lineX + 18, iy - 1, titleW, 6)
        ctx.restore()

        // Company + description lines
        ctx.save()
        ctx.globalAlpha = alpha * 0.25
        ctx.fillStyle = ACCENT
        const descProgress = Math.max(0, itemP * 2 - 0.6)
        ;[0, 1].forEach((n) => {
          const lw = (w * 0.5 - (n * w * 0.1)) * Math.min(descProgress - n * 0.2, 1)
          if (lw > 0) ctx.fillRect(lineX + 18, iy + 10 + n * 9, lw, 3)
        })
        ctx.restore()
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
