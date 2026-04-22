import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLOR = '#0071e3'
const NODE_COUNT = 24
const CONNECT_DIST = 140

const RADIUS = 220

const PROJ_CARDS = [
  {
    title: 'Agentforce Service Automation',
    desc: 'Autonomous AI agent that triages, routes, and resolves Tier-1 support cases without human intervention — cutting average handle time by 40%.',
    tags: ['Agentforce', 'Einstein Copilot', 'Service Cloud', 'Apex'],
    badge: 'AI', delay: 0.0,
  },
  {
    title: 'Field Service Lightning',
    desc: 'Replaced ageing work-order system with FSL, building custom LWC mobile components for 200+ field technicians across three regions.',
    tags: ['Field Service Lightning', 'LWC', 'Apex', 'Service Cloud'],
    badge: 'Featured', delay: 0.1,
  },
  {
    title: 'ERP–Salesforce Integration',
    desc: 'Real-time bi-directional sync between Salesforce and SAP via REST APIs and Platform Events, processing 50k+ records daily with zero data loss.',
    tags: ['Apex', 'REST API', 'Platform Events', 'SAP'],
    badge: null, delay: 0.2,
  },
  {
    title: 'Einstein Next Best Action',
    desc: 'AI-driven recommendation engine surfacing upsell prompts and churn-risk flags directly on opportunity records, improving win rate by 18%.',
    tags: ['Einstein Next Best Action', 'Einstein GPT', 'Sales Cloud', 'Apex'],
    badge: 'AI', delay: 0.3,
  },
  {
    title: 'LWC Component Library',
    desc: 'Reusable production component library — data tables, multi-step forms, and modals — deployed across six orgs and adopted by four dev teams.',
    tags: ['LWC', 'JavaScript', 'SLDS', 'Jest', 'Salesforce DX'],
    badge: null, delay: 0.4,
  },
  {
    title: 'Omni-Channel Service Cloud',
    desc: 'Unified CTI, Live Agent, and Einstein Bot routing layer handling 300+ concurrent agents with intelligent queue prioritisation and fallback flows.',
    tags: ['Service Cloud', 'CTI', 'Live Agent', 'Einstein Bots'],
    badge: null, delay: 0.5,
  },
  {
    title: 'Data Cloud Unified Profile',
    desc: 'Stitched customer identities across five data sources into a single Data Cloud profile, powering personalised Einstein GPT marketing journeys.',
    tags: ['Data Cloud', 'Einstein GPT', 'Salesforce Flow', 'Marketing Cloud'],
    badge: 'AI', delay: 0.6,
  },
  {
    title: 'CI/CD Pipeline',
    desc: 'End-to-end GitHub Actions pipeline with Apex test gates, PMD static analysis, and automated scratch-org deployment — reducing release cycle from weeks to hours.',
    tags: ['Salesforce DX', 'GitHub Actions', 'CI/CD', 'Apex', 'DevOps'],
    badge: null, delay: 0.7,
  },
]

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

export default function ProjectsCanvas({ isHovered, isMobile }) {
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
    <div style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      <AnimatePresence>
        {isHovered && !isMobile && PROJ_CARDS.map((card, i) => {
          const angle = (2 * Math.PI * i) / PROJ_CARDS.length - Math.PI / 2
          const tx = RADIUS * Math.cos(angle)
          const ty = RADIUS * Math.sin(angle)
          const floatY = 10 + (i % 3) * 4
          const dur = 4.8 + (i % 4) * 0.5
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${tx}px)`,
                top: `calc(50% + ${ty}px)`,
                transform: 'translate(-50%, -50%)',
                width: '11%',
                zIndex: 10,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -floatY, 0] }}
                  transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  style={{
                    background: 'rgba(248,247,243,0.97)',
                    border: `1px solid rgba(0,0,0,0.07)`,
                    borderTop: `3px solid ${COLOR}`,
                    borderRadius: 10,
                    padding: '10px 11px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                    aspectRatio: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {card.badge && (
                    <div style={{
                      fontSize: 8, fontWeight: 700, letterSpacing: '0.07em',
                      textTransform: 'uppercase', color: COLOR, marginBottom: 4,
                    }}>
                      {card.badge}
                    </div>
                  )}
                  <div style={{
                    fontSize: 16.5, fontWeight: 700, color: '#1d1d1f',
                    lineHeight: 1.3, marginBottom: 5,
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: 13.5, color: '#3a3a3c', lineHeight: 1.55,
                    flex: 1, overflow: 'hidden',
                  }}>
                    {card.desc}
                  </div>
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6,
                    borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 5,
                  }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 7.5, color: '#6e6e73',
                        border: '1px solid rgba(0,0,0,0.13)',
                        padding: '1px 5px', borderRadius: 20,
                        whiteSpace: 'nowrap',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
