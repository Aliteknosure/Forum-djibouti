'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const MDENI_LOGO = "/logos/logo-cle.jpg"

const NAV_ITEMS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'A Propos', href: '#apropos' },
  { label: 'Mot de la Ministre', href: '#mot-ministre' },
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'Thematiques', href: '#thematiques' },
  { label: 'Programme', href: '#programme' },
  { label: 'Orateurs', href: '#orateurs' },
  { label: 'Inscription', href: '#inscription' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Barre de progression du scroll */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #009A44, #F5A623)',
        }}
      />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#accueil" onClick={(e) => scrollToSection(e, '#accueil')} className="flex items-center gap-3">
            <img src={MDENI_LOGO} alt="MDENI Logo" className="h-12 w-auto" />
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className={`text-sm font-medium transition-colors hover:text-djibouti-green ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="#inscription" onClick={(e) => scrollToSection(e, '#inscription')}
              className="hidden md:flex btn-primary text-sm py-2.5 px-6">
              S&apos;inscrire
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 ${scrolled ? 'text-djibouti-navy' : 'text-white'}`}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-menu open">
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-white p-2">
              <X size={28} />
            </button>
            <img src={MDENI_LOGO} alt="MDENI" className="h-16 mb-8" />
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}
                className="text-white text-2xl font-heading font-medium hover:text-djibouti-gold transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#inscription" onClick={(e) => scrollToSection(e, '#inscription')} className="btn-primary mt-4">
              S&apos;inscrire maintenant <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
