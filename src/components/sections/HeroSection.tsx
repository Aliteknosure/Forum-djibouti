'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

const MDENI_LOGO = "/logos/logo-cle.jpg"
const HERO_IMAGE = "https://cdn.loquis.com/prod/loquis/pictures/13a6594a-a8e1-4ff0-aa46-83caec67c7d4.jpg"
const EVENT_DATE = new Date('2026-03-23T09:00:00')

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [tick, setTick] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = EVENT_DATE.getTime() - now.getTime()
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
        setTick(t => !t)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Jours', accent: '#009A44' },
    { value: timeLeft.hours, label: 'Heures', accent: '#F5A623' },
    { value: timeLeft.minutes, label: 'Min', accent: '#1A3C6E' },
    { value: timeLeft.seconds, label: 'Sec', accent: '#009A44' },
  ]
  const digits = (val: number) => String(val).padStart(2, '0').split('')

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 md:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 md:gap-1.5">
              {digits(unit.value).map((d, di) => (
                <div key={di}
                  className={`cd-digit relative flex items-center justify-center ${unit.label === 'Sec' ? 'cd-digit--sec' : ''}`}
                  style={{ '--cd-accent': unit.accent } as React.CSSProperties}>
                  <span className="cd-digit__top-accent" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white tabular-nums leading-none">{d}</span>
                  <span className="cd-digit__shine" />
                </div>
              ))}
            </div>
            <span className="text-white/30 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-semibold">{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <div className={`flex flex-col gap-1.5 pb-5 transition-opacity duration-300 ${tick && i === units.length - 2 ? 'opacity-100' : 'opacity-40'}`}>
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/50" />
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/50" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
  const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }

  return (
    <section id="accueil" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-djibouti-dark via-djibouti-navy to-djibouti-dark">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-djibouti-dark via-djibouti-dark/40 to-djibouti-dark/60" />
      </div>
      <div className="hero-shapes">
        <div className="shape shape-1" /><div className="shape shape-2" />
        <div className="shape shape-3" /><div className="shape shape-4" />
        <div className="hexagon hexagon-1" /><div className="hexagon hexagon-2" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-24 pt-36 md:pt-44">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeUp} className="hero-info-pill inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="text-djibouti-gold" size={13} />
              <span className="uppercase tracking-[0.12em] font-medium text-white/90 text-xs">23 Mars 2026</span>
            </div>
            <span className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-1.5">
              <MapPin className="text-djibouti-green" size={13} />
              <span className="uppercase tracking-[0.12em] font-medium text-white/90 text-xs">Djibouti-Ville</span>
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-heading font-bold mb-5 text-left leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
            <span className="gradient-text">Forum National de</span>
            <br />
            <span className="text-white">l&apos;Entrepreneuriat de Djibouti</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-white/60 max-w-xl mb-4 leading-relaxed">
            Programme EDQ – Build by CLE : l&apos;acte de naissance officiel de l&apos;entrepreneuriat de quartier
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/40 text-xs md:text-sm mb-10">
            Organisé par le <span className="text-djibouti-gold font-semibold">MDENI</span> – Ministère Délégué chargé de l&apos;Économie Numérique et de l&apos;Innovation
          </motion.p>
          <motion.div variants={fadeUp} className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-6">
            <div>
              <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 font-medium">L&apos;événement commence dans</p>
              <CountdownTimer />
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => scrollTo('#inscription')} className="btn-primary text-sm md:text-base px-7 py-3.5">
                  S&apos;inscrire maintenant <ArrowRight size={18} />
                </button>
                <button onClick={() => scrollTo('#programme')} className="btn-secondary text-sm md:text-base px-7 py-3.5">
                  Découvrir le programme
                </button>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-djibouti-gold rounded-full animate-pulse" />
                <span className="text-white/35 text-[10px] md:text-xs uppercase tracking-[0.12em]">Places limitées</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
