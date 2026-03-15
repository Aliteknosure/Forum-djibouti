'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'

const MDENI_LOGO = "/logos/logo-cle.jpg"

const NAV_ITEMS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À Propos', href: '#apropos' },
  { label: 'Ministre', href: '#mot-ministre' },
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'Thématiques', href: '#thematiques' },
  { label: 'Programme', href: '#programme' },
  { label: 'Orateurs', href: '#orateurs' },
  { label: 'Inscription', href: '#inscription' },
]

// Liens simples (pas de dropdown)
const SIMPLE_EXTRA = [
  { label: 'Masterclasse', href: '#masterclasse', icon: '🎓' },
  { label: 'Panel',        href: '#panel',        icon: '🎤' },
]

// Seul MSME Village a un sous-menu
const MSME_SUBMENU = [
  { label: 'Stands & Exposants',  href: '#msme-stands',     icon: '🏪', desc: 'Découvrez les entreprises exposantes' },
  { label: 'Pitch Competition',   href: '#msme-pitch',      icon: '🚀', desc: 'Pitchez votre projet devant les investisseurs' },
  { label: 'Speed Networking',    href: '#msme-networking', icon: '🤝', desc: 'Rencontres B2B en format accéléré' },
  { label: 'Mentorat & Coaching', href: '#msme-mentorat',   icon: '💡', desc: 'Sessions individuelles avec des mentors' },
  { label: 'Financement & Accès', href: '#msme-finance',    icon: '💰', desc: 'Opportunités de financement disponibles' },
  { label: 'Innovation Lab',      href: '#msme-lab',        icon: '🔬', desc: 'Démonstrations tech et solutions innovantes' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    setOpenDropdown(null)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Barre de progression du scroll */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--forum-green), var(--forum-gold))' }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#accueil" onClick={(e) => scrollToSection(e, '#accueil')} className="flex items-center gap-3">
            <img src={MDENI_LOGO} alt="MDENI Logo" className="h-12 w-auto" />
          </a>

          {/* Nav desktop — visible uniquement sur très grands écrans */}
          <div className="hidden xl:flex items-center gap-5" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className={`text-xs font-medium transition-colors hover:text-djibouti-green whitespace-nowrap ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}>
                {item.label}
              </a>
            ))}

            {/* Séparateur */}
            <div className={`h-5 w-px shrink-0 ${scrolled ? 'bg-gray-300' : 'bg-white/20'}`} />

            {/* Masterclasse — lien simple */}
            {SIMPLE_EXTRA.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className={`flex items-center gap-1 text-xs font-semibold transition-colors hover:text-djibouti-green whitespace-nowrap ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            {/* MSME Village — dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'msme' ? null : 'msme')}
                className={`flex items-center gap-1 text-xs font-semibold transition-colors hover:text-djibouti-green whitespace-nowrap ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}
              >
                <span>🏘️</span>
                <span>MSME Village</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === 'msme' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openDropdown === 'msme' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-3 right-0 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="px-5 py-4 bg-gradient-to-r from-djibouti-navy to-djibouti-dark">
                      <p className="text-djibouti-gold text-xs font-bold tracking-widest uppercase">🏘️ MSME Village</p>
                      <p className="text-white/60 text-xs mt-1">Espace dédié aux PME & startups</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {MSME_SUBMENU.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          onClick={(e) => scrollToSection(e, sub.href)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <span className="text-xl mt-0.5">{sub.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-djibouti-navy group-hover:text-djibouti-green transition-colors">{sub.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <a href="#inscription" onClick={(e) => scrollToSection(e, '#inscription')}
              className="hidden md:flex btn-primary text-sm py-2.5 px-6">
              S&apos;inscrire
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`xl:hidden p-2 ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu open"
            style={{ overflowY: 'auto' }}
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-white p-2">
              <X size={28} />
            </button>
            <img src={MDENI_LOGO} alt="MDENI" className="h-16 mb-8" />

            {/* Nav classique */}
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className="text-white text-xl font-heading font-medium hover:text-djibouti-gold transition-colors">
                {item.label}
              </a>
            ))}

            {/* Séparateur */}
            <div className="w-24 h-px bg-white/20 my-2" />

            {/* Masterclasse + Panel — liens simples */}
            {SIMPLE_EXTRA.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className="text-white text-xl font-heading font-medium hover:text-djibouti-gold transition-colors">
                {item.icon} {item.label}
              </a>
            ))}

            {/* MSME Village — accordion */}
            <div className="w-full">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'msme' ? null : 'msme')}
                className="flex items-center justify-between w-full text-white text-xl font-heading font-medium hover:text-djibouti-gold transition-colors py-1"
              >
                <span>🏘️ MSME Village</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileExpanded === 'msme' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileExpanded === 'msme' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-1"
                  >
                    {MSME_SUBMENU.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={(e) => scrollToSection(e, sub.href)}
                        className="flex items-center gap-2 py-2 text-white/70 hover:text-djibouti-gold text-base transition-colors"
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#inscription" onClick={(e) => scrollToSection(e, '#inscription')} className="btn-primary mt-4">
              S&apos;inscrire maintenant <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
