'use client'

import { useEffect, useRef } from 'react'

const orateurs = [
  // ── Jour 1 ──
  {
    nom: 'Président de la République',
    titre: 'Chef de l\'État',
    institution: 'République de Djibouti',
    role: 'Discours officiel d\'ouverture · Jour 1',
    initiales: 'PR',
    couleur: '#0a1932',
    emoji: '🏛️',
    jour: 'Jour 1',
  },
  {
    nom: 'Ministre — Économie Numérique',
    titre: 'Ministre délégué',
    institution: 'Ministère de l\'Économie Numérique et de l\'Innovation',
    role: 'Discours officiel d\'ouverture · Jour 1',
    initiales: 'MDN',
    couleur: '#3b82f6',
    emoji: '📡',
    jour: 'Jour 1',
  },
  {
    nom: 'Moussa Kassim Modjib',
    titre: 'Entrepreneur',
    institution: 'Limo',
    role: '« Tell Me Your Story » — Conférence · Jour 1',
    initiales: 'MK',
    couleur: '#d4af37',
    emoji: '🚀',
    jour: 'Jour 1',
  },
  {
    nom: 'Beyleh-Fleetin',
    titre: 'Entrepreneur',
    institution: 'Fintech Locale',
    role: '« Tell Me Your Story » — Conférence · Jour 1',
    initiales: 'BF',
    couleur: '#10b981',
    emoji: '💳',
    jour: 'Jour 1',
  },
  {
    nom: 'Moustapha — Forje',
    titre: 'Entrepreneur',
    institution: 'Startup Djibouti',
    role: 'Pitch Voix des Quartiers · Jour 1',
    initiales: 'MF',
    couleur: '#f59e0b',
    emoji: '🎤',
    jour: 'Jour 1',
  },
  // ── Jour 2 ──
  {
    nom: 'Raisso',
    titre: 'Modérateur',
    institution: 'CLE',
    role: 'Panel 1 : Startup Act · Jour 2',
    initiales: 'RA',
    couleur: '#8b5cf6',
    emoji: '🎙️',
    jour: 'Jour 2',
  },
  {
    nom: 'Warsama',
    titre: 'Keynote Speaker',
    institution: 'Banque Centrale de Djibouti',
    role: 'Panel 2 : FinTech & Financement · Jour 2',
    initiales: 'WA',
    couleur: '#009FDA',
    emoji: '🏦',
    jour: 'Jour 2',
  },
  {
    nom: 'Amine HSEVEN',
    titre: 'Expert Pitch & Entrepreneuriat',
    institution: 'Consultant',
    role: 'Atelier : Préparer son Pitch · Jour 2',
    initiales: 'AH',
    couleur: '#ef4444',
    emoji: '🏆',
    jour: 'Jour 2',
  },
  // ── Jour 3 ──
  {
    nom: 'Entrepreneur E-Commerce LIMO',
    titre: 'Entrepreneur',
    institution: 'LIMO',
    role: 'Panel 5 : E-Commerce · Jour 3',
    initiales: 'LM',
    couleur: '#d4af37',
    emoji: '🛒',
    jour: 'Jour 3',
  },
  {
    nom: 'Abdourahman',
    titre: 'Chef de Service PI',
    institution: 'ODPIC',
    role: 'Atelier : Propriété Intellectuelle · Jour 3',
    initiales: 'AB',
    couleur: '#10b981',
    emoji: '⚖️',
    jour: 'Jour 3',
  },
  {
    nom: 'Direction Cybersécurité',
    titre: 'Directeur',
    institution: 'Djibouti Telecom',
    role: 'Panel 6 : Cloud & Infrastructures · Jour 3',
    initiales: 'DC',
    couleur: '#3b82f6',
    emoji: '🔒',
    jour: 'Jour 3',
  },
  // ── Jour 4 ──
  {
    nom: 'Autorité Numérique',
    titre: 'Représentant',
    institution: 'Autorité Nationale du Numérique',
    role: 'Panel 7 : Services de Confiance · Jour 4',
    initiales: 'AN',
    couleur: '#8b5cf6',
    emoji: '🔐',
    jour: 'Jour 4',
  },
  {
    nom: 'Expert Cybersécurité',
    titre: 'Spécialiste',
    institution: 'Autorité Protection des Données',
    role: 'Panel 9 : Cybersécurité · Jour 4',
    initiales: 'EC',
    couleur: '#ef4444',
    emoji: '🛡️',
    jour: 'Jour 4',
  },
]

const JOUR_COLORS: Record<string, string> = {
  'Jour 1': '#d4af37',
  'Jour 2': '#009A44',
  'Jour 3': '#3b82f6',
  'Jour 4': '#8b5cf6',
}

export default function OrateursSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const items = section.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay ?? '0'
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('animate-in')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="orateurs" ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <style>{`
        [data-animate]{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out}
        [data-animate].animate-in{opacity:1;transform:translateY(0)}
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16" data-animate data-delay="0">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Intervenants
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-djibouti-navy mb-4">
            Ils prennent la parole{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-gold to-djibouti-green">
              au Forum
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Dirigeants, experts, entrepreneurs et institutions — les voix qui façonneront les 4 jours du Forum.
          </p>
        </div>

        {/* Grille des jours */}
        {['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4'].map((jour, ji) => {
          const jourOrateurs = orateurs.filter(o => o.jour === jour)
          const color = JOUR_COLORS[jour]
          return (
            <div key={jour} className="mb-14" data-animate data-delay={ji * 80}>
              {/* Titre du jour */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${color}18`, color, border: `1px solid ${color}44` }}
                >
                  {jour}
                </span>
                <div className="flex-1 h-px" style={{ background: `${color}33` }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {jourOrateurs.map((o, i) => (
                  <div
                    key={i}
                    data-animate
                    data-delay={ji * 80 + i * 60}
                    className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ border: '1px solid #e2e8f0', background: 'white' }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs text-white mb-3"
                      style={{ background: `linear-gradient(135deg, ${o.couleur}, ${o.couleur}88)` }}
                    >
                      {o.initiales}
                    </div>
                    <div className="text-lg mb-1">{o.emoji}</div>
                    <h3 className="font-bold text-sm leading-tight mb-0.5" style={{ color: '#0a1932' }}>{o.nom}</h3>
                    <p className="text-xs text-gray-400 mb-1">{o.titre}</p>
                    <p className="text-xs font-medium mb-3 leading-tight" style={{ color: o.couleur }}>{o.institution}</p>
                    <div
                      className="rounded-lg px-3 py-2 text-xs leading-snug"
                      style={{ backgroundColor: `${o.couleur}11`, border: `1px solid ${o.couleur}33`, color: o.couleur }}
                    >
                      🎤 {o.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <p className="text-center text-gray-400 text-xs mt-6" data-animate data-delay="200">
          * Les noms définitifs des intervenants seront confirmés et publiés avant le 29 mars 2026.
        </p>
      </div>
    </section>
  )
}
