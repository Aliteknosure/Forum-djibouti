'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const CHEF_ETAT = {
  nom: 'SEM Ismaïl Omar Guelleh',
  titre: 'Président de la République de Djibouti',
  institution: 'République de Djibouti',
  role: 'Discours officiel d\'ouverture · Jour 1',
  initiales: 'IOG',
  couleur: '#d4af37',
  emoji: '🏛️',
  jour: 'Jour 1',
  photo: '/images/iog.jpg',
}

const MINISTRE = {
  nom: 'SEM Mariam Hamadou Ali',
  titre: 'Ministre de l\'Économie Numérique et de l\'Innovation',
  institution: 'République de Djibouti',
  role: 'Discours officiel d\'ouverture · Jour 1',
  initiales: 'MHA',
  couleur: '#0E706B',
  emoji: '📡',
  jour: 'Jour 1',
  photo: '/images/ministre-photo.jpg',
}

const orateurs = [
  // ── Jour 1 ──
  {
    nom: 'Moussa Kassim Modjib',
    titre: 'Entrepreneur',
    institution: 'Limo',
    role: '« Tell Me Your Story » — Conférence · Jour 1',
    initiales: 'MK',
    couleur: '#d4af37',
    emoji: '🚀',
    jour: 'Jour 1',
    photo: '/images/moussa-k.jpeg',
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
    photo: '/images/beyleh.jpeg',
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
    photo: null,
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
    photo: null,
  },
  {
    nom: 'Warsama Ismaël',
    titre: 'Keynote Speaker',
    institution: 'Banque Centrale de Djibouti',
    role: 'Panel 2 : FinTech & Financement · Jour 2',
    initiales: 'WA',
    couleur: '#009FDA',
    emoji: '🏦',
    jour: 'Jour 2',
    photo: '/images/Warsama-Ismael.webp',
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
    photo: '/images/amin-hseven.jpeg',
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
    photo: null,
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
    photo: null,
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
    photo: null,
  },
  // ── Jour 3 (suite) ──
  {
    nom: 'Autorité Numérique',
    titre: 'Représentant',
    institution: 'Autorité Nationale du Numérique',
    role: 'Panel 7 : Services de Confiance · Jour 3',
    initiales: 'AN',
    couleur: '#8b5cf6',
    emoji: '🔐',
    jour: 'Jour 3',
    photo: null,
  },
  {
    nom: 'Expert Cybersécurité',
    titre: 'Spécialiste',
    institution: 'Autorité Protection des Données',
    role: 'Panel 9 : Cybersécurité · Jour 3',
    initiales: 'EC',
    couleur: '#ef4444',
    emoji: '🛡️',
    jour: 'Jour 3',
    photo: null,
  },
]

const JOUR_COLORS: Record<string, string> = {
  'Jour 1': '#d4af37',
  'Jour 2': '#009A44',
  'Jour 3': '#3b82f6',
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
        .orateur-card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.10); }
        .vip-card:hover { transform: translateY(-4px); }
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
              au Forum BOOST Entrepreneurship
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Dirigeants, experts, entrepreneurs et institutions — les voix qui façonneront les 3 jours du Forum BOOST Entrepreneurship.
          </p>
        </div>

        {/* ── NIVEAU 1 : Chef de l'État — seul, centré, grande carte ── */}
        <div className="mb-6" data-animate data-delay="60">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: 'rgba(212,175,55,0.12)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.35)' }}
            >
              🏛️ Chef de l'État
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.25)' }} />
          </div>

          <div className="flex justify-center">
            <div
              className="vip-card group rounded-3xl overflow-hidden transition-all duration-400 flex flex-col sm:flex-row w-full max-w-2xl"
              style={{
                border: '2px solid rgba(212,175,55,0.5)',
                boxShadow: '0 8px 40px rgba(212,175,55,0.15)',
                background: 'linear-gradient(135deg, #fffbf0, #fff)',
              }}
            >
              {/* Photo */}
              <div className="relative sm:w-56 shrink-0 overflow-hidden" style={{ minHeight: 240 }}>
                {CHEF_ETAT.photo ? (
                  <Image
                    src={CHEF_ETAT.photo}
                    alt={CHEF_ETAT.nom}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(160deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))' }}>
                    <span className="text-6xl">{CHEF_ETAT.emoji}</span>
                    <span className="text-3xl font-bold" style={{ color: '#d4af37' }}>{CHEF_ETAT.initiales}</span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 70%, white)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #d4af37, rgba(212,175,55,0.3))' }} />
              </div>

              {/* Infos */}
              <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 self-start"
                  style={{ background: 'rgba(212,175,55,0.15)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <span>★</span> Invité d'honneur
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-djibouti-navy mb-1">
                  {CHEF_ETAT.nom}
                </h3>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#d4af37' }}>{CHEF_ETAT.titre}</p>
                <p className="text-sm text-gray-500 mb-4">{CHEF_ETAT.institution}</p>
                <div
                  className="rounded-xl px-4 py-2.5 text-sm font-medium"
                  style={{ background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.25)', color: '#b8960c' }}
                >
                  🎤 {CHEF_ETAT.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NIVEAU 2 : Ministre — seule, centrée, carte premium ── */}
        <div className="mb-14" data-animate data-delay="120">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: 'rgba(14,112,107,0.10)', color: '#0E706B', border: '1px solid rgba(14,112,107,0.3)' }}
            >
              📡 Ministre délégué
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(14,112,107,0.2)' }} />
          </div>

          <div className="flex justify-center">
            <div
              className="vip-card group rounded-3xl overflow-hidden transition-all duration-400 flex flex-col sm:flex-row w-full max-w-2xl"
              style={{
                border: '2px solid rgba(14,112,107,0.35)',
                boxShadow: '0 8px 40px rgba(14,112,107,0.10)',
                background: 'linear-gradient(135deg, #f0faf9, #fff)',
              }}
            >
              {/* Photo */}
              <div className="relative sm:w-56 shrink-0 overflow-hidden" style={{ minHeight: 240 }}>
                {MINISTRE.photo ? (
                  <Image
                    src={MINISTRE.photo}
                    alt={MINISTRE.nom}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(160deg, rgba(14,112,107,0.15), rgba(14,112,107,0.04))' }}>
                    <span className="text-6xl">{MINISTRE.emoji}</span>
                    <span className="text-3xl font-bold" style={{ color: '#0E706B' }}>{MINISTRE.initiales}</span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 70%, white)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #0E706B, rgba(14,112,107,0.3))' }} />
              </div>

              {/* Infos */}
              <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 self-start"
                  style={{ background: 'rgba(14,112,107,0.10)', color: '#0E706B', border: '1px solid rgba(14,112,107,0.25)' }}
                >
                  <span>◆</span> Invitée d'honneur
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-djibouti-navy mb-1">
                  {MINISTRE.nom}
                </h3>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#0E706B' }}>{MINISTRE.titre}</p>
                <p className="text-sm text-gray-500 mb-4">{MINISTRE.institution}</p>
                <div
                  className="rounded-xl px-4 py-2.5 text-sm font-medium"
                  style={{ background: 'rgba(14,112,107,0.08)', border: '1px solid rgba(14,112,107,0.2)', color: '#0E706B' }}
                >
                  🎤 {MINISTRE.role}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
