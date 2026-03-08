'use client'

import { useEffect, useRef } from 'react'

const orateurs = [
  {
    nom: 'Représentant du MDENI',
    titre: 'Ministre / Secrétaire Général',
    institution: 'Ministère du Développement de l\'Entreprise, du Numérique et de l\'Innovation',
    role: 'Cérémonie d\'ouverture & Caravane G2B',
    initiales: 'MDN',
    couleur: '#3b82f6',
    emoji: '🏛️',
  },
  {
    nom: 'Directeur du CLE',
    titre: 'Directeur Exécutif',
    institution: 'Centre de Leadership et d\'Entrepreneuriat',
    role: 'Présentation du programme EDQ & résultats',
    initiales: 'CLE',
    couleur: '#d4af37',
    emoji: '🚀',
  },
  {
    nom: 'Représentant Union Européenne',
    titre: 'Chef de la Délégation UE',
    institution: 'Délégation de l\'Union Européenne — Djibouti',
    role: 'Discours d\'ouverture officielle',
    initiales: 'UE',
    couleur: '#003399',
    emoji: '🇪🇺',
  },
  {
    nom: 'Représentant Banque Mondiale',
    titre: 'Économiste Principal / Country Manager',
    institution: 'Banque Mondiale — Bureau de Djibouti',
    role: 'Panel : Inclusion financière & accès au crédit',
    initiales: 'BM',
    couleur: '#009FDA',
    emoji: '🌍',
  },
  {
    nom: 'Représentant REDA',
    titre: 'Directeur',
    institution: 'Regional Economic Development Agency',
    role: 'Caravane G2B — Guichet unique de formalisation',
    initiales: 'REDA',
    couleur: '#8b5cf6',
    emoji: '📋',
  },
  {
    nom: 'Représentant CJEO Obock',
    titre: 'Président',
    institution: 'Chambre des Jeunes Entrepreneurs d\'Obock',
    role: 'Partenaire territorial — Région Obock',
    initiales: 'CJEO',
    couleur: '#10b981',
    emoji: '🤝',
  },
  {
    nom: 'Représentant Dumar iyo Dadal',
    titre: 'Coordinateur',
    institution: 'Dumar iyo Dadal',
    role: 'Accompagnement territorial des MSMEs',
    initiales: 'DID',
    couleur: '#f59e0b',
    emoji: '👩‍💼',
  },
  {
    nom: 'MSMEs lauréates',
    titre: 'Entrepreneures & Entrepreneurs',
    institution: '120 MSMEs sélectionnées du programme EDQ',
    role: 'Témoignages & Remise des prix de clôture',
    initiales: 'EDQ',
    couleur: '#ec4899',
    emoji: '🏆',
  },
]

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
      { threshold: 0.12 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="orateurs" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>{`
        [data-animate]{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out}
        [data-animate].animate-in{opacity:1;transform:translateY(0)}
      `}</style>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16" data-animate data-delay="0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Prise de parole
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
            Ils prennent la parole
            <span style={{ color: '#b8960c' }}> au Forum</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Dirigeants, représentants institutionnels et entrepreneurs lauréats — 
            les voix qui façonneront la journée du 23 mars 2026.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {orateurs.map((o, i) => (
            <div
              key={i}
              data-animate
              data-delay={80 + i * 70}
              className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ border: '1px solid #e2e8f0', background: 'white' }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm text-white mb-4"
                style={{ background: `linear-gradient(135deg, ${o.couleur}, ${o.couleur}88)` }}
              >
                {o.initiales}
              </div>

              {/* Emoji rôle */}
              <div className="text-xl mb-2">{o.emoji}</div>

              {/* Nom & titre */}
              <h3 className="font-bold text-sm mb-0.5" style={{ color: '#0a1932' }}>{o.nom}</h3>
              <p className="text-xs text-gray-400 mb-1">{o.titre}</p>
              <p className="text-xs font-medium mb-3 truncate" style={{ color: o.couleur }}>{o.institution}</p>

              {/* Rôle au forum */}
              <div
                className="rounded-lg px-3 py-2 text-xs leading-snug"
                style={{ backgroundColor: `${o.couleur}11`, border: `1px solid ${o.couleur}33`, color: o.couleur }}
              >
                🎤 {o.role}
              </div>
            </div>
          ))}
        </div>

        {/* Note bas de page */}
        <p className="text-center text-gray-400 text-xs mt-10" data-animate data-delay="200">
          * Les noms définitifs des intervenants seront confirmés et publiés avant le 23 mars 2026.
        </p>
      </div>
    </section>
  )
}
