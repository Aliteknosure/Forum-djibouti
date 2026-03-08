'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/context/LangContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, t, toggle } = useLang()

  const navLinks = [
    { href: '#about',       label: t.nav.about },
    { href: '#thematiques', label: lang === 'fr' ? 'Thématiques' : 'Themes' },
    { href: '#program',     label: t.nav.program },
    { href: '#orateurs',    label: lang === 'fr' ? 'Orateurs' : 'Speakers' },
    { href: '#sponsors',    label: lang === 'fr' ? 'Partenaires' : 'Partners' },
    { href: '#faq',         label: t.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(10, 25, 50, 0.95)' : 'transparent' }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-navy-950 text-lg shadow-md" style={{ color: '#0a1932' }}>
              F
            </div>
            <span className="text-white font-semibold text-sm sm:text-base hidden sm:block leading-tight">
              Forum National<br />
              <span style={{ color: '#d4af37' }} className="text-xs font-normal">de l&apos;Entrepreneuriat 2026</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 hover:text-yellow-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Lang toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Bouton langue */}
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-all duration-200"
              title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe size={14} className="opacity-70" />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Bouton inscription */}
            <Button
              asChild
              className="text-sm font-semibold px-6 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#0a1932' }}
            >
              <Link href="/register">{t.nav.register}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Bouton langue mobile */}
            <button
              onClick={toggle}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border border-white/25 text-white/80 hover:text-white transition-all"
            >
              <Globe size={12} />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t border-white/10 py-4 px-4"
          style={{ backgroundColor: 'rgba(10, 25, 50, 0.98)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <Button
              asChild
              className="w-full text-sm font-semibold rounded-full"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#0a1932' }}
            >
              <Link href="/register" onClick={() => setIsOpen(false)}>
                {t.nav.registerNow}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
