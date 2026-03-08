'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Compte à rebours
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const target = new Date('2026-03-23T08:00:00').getTime()
    const update = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Animated particles background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020b18 0%, #0a1932 40%, #0d2545 70%, #091628 100%)' }}
    >
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes heroSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        .hero-anim { animation-fill-mode: both; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>

      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-24 pt-36">
        {/* Pre-title badge */}
        <div
          className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
          style={{
            background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#d4af37',
            animation: 'heroSlideDown 0.7s 0.1s both cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          Inscriptions ouvertes
        </div>

        {/* Main title */}
        <h1
          className="hero-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          style={{ animation: 'heroFadeUp 0.9s 0.25s both cubic-bezier(0.22,1,0.36,1)' }}
        >
          Forum National
          <br />
          <span style={{ background: 'linear-gradient(135deg, #d4af37, #f0d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            de l&apos;Entrepreneuriat
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-anim text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ animation: 'heroFadeUp 0.9s 0.45s both cubic-bezier(0.22,1,0.36,1)' }}
        >
          Transformer l&apos;entrepreneuriat de quartier en moteur de croissance nationale.
          120 MSMEs leaders réunies pour un jour de connexions, de financement et d&apos;opportunités.
        </p>

        {/* Info badges */}
        <div
          className="hero-anim flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12"
          style={{ animation: 'heroFadeUp 0.9s 0.6s both cubic-bezier(0.22,1,0.36,1)' }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
            <Calendar size={16} style={{ color: '#d4af37' }} />
            <span>23 mars 2026</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
            <MapPin size={16} style={{ color: '#d4af37' }} />
            <span>Djibouti-Ville</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
            <Users size={16} style={{ color: '#d4af37' }} />
            <span>120 MSMEs leaders</span>
          </div>
        </div>

        {/* ── Compte à rebours ── */}
        <div
          className="hero-anim flex flex-col items-center gap-3 mb-12"
          style={{ animation: 'heroFadeUp 0.9s 0.68s both cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase">Le Forum commence dans</p>
          <div className="flex items-center gap-3 sm:gap-5">
            {[
              { v: timeLeft.days,    l: 'Jours' },
              { v: timeLeft.hours,   l: 'Heures' },
              { v: timeLeft.minutes, l: 'Minutes' },
              { v: timeLeft.seconds, l: 'Secondes' },
            ].map((unit, i) => (
              <div key={unit.l} className="flex items-center gap-3 sm:gap-5">
                <div
                  className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums" style={{ color: '#d4af37' }}>
                    {String(unit.v).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{unit.l}</span>
                </div>
                {i < 3 && <span className="text-white/30 text-xl font-bold mb-4">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'heroFadeUp 0.9s 0.75s both cubic-bezier(0.22,1,0.36,1)' }}
        >          <Button
            asChild
            size="lg"
            className="text-base font-semibold px-8 py-4 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-yellow-900/30"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
          >
            <Link href="/register" className="flex items-center gap-2">
              S&apos;inscrire maintenant
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', background: 'rgba(255,255,255,0.04)' }}
          >
            <a href="#program">Voir le programme</a>
          </Button>
        </div>

        {/* Stats */}
        <div
          className="hero-anim mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          style={{ animation: 'heroFadeIn 1s 1s both cubic-bezier(0.22,1,0.36,1)' }}
        >
          {[
            { value: '200+', label: 'MSMEs accompagnées' },
            { value: '5', label: 'Régions couvertes' },
            { value: '50%', label: 'Femmes bénéficiaires' },
            { value: '120', label: 'MSMEs au Forum' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="hero-anim text-center"
              style={{ animation: `heroFadeUp 0.7s ${1.1 + i * 0.1}s both cubic-bezier(0.22,1,0.36,1)` }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#d4af37' }}>
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-0.5 h-8 bg-white/50 animate-pulse" />
      </div>
    </section>
  )
}
