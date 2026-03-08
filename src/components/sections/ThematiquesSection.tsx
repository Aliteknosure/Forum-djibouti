'use client'

import { useEffect, useRef } from 'react'

const thematiques = [
  {
    icon: '📣',
    tag: 'Teasing & Annonces',
    title: 'Lancement du calendrier EDQ',
    desc: 'Présentation officielle du calendrier des Caravanes et des Bootcamps régionaux — les premières étapes concrètes du programme sur le terrain.',
    color: '#3b82f6',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    icon: '🏪',
    tag: 'Stands MSMEs',
    title: 'Early-Adopters en vitrine',
    desc: "Exposition des premiers projets sélectionnés pour montrer le potentiel des quartiers — de Balbala aux 5 régions de l'intérieur.",
    color: '#d4af37',
    gradient: 'from-amber-400/10 to-yellow-500/5',
  },
  {
    icon: '🎙️',
    tag: 'Panels de Haut Niveau',
    title: 'Inclusion financière',
    desc: "Discussion sur l'inclusion financière des jeunes et des femmes avec la Banque mondiale et les institutions partenaires.",
    color: '#10b981',
    gradient: 'from-emerald-500/10 to-green-600/5',
  },
  {
    icon: '✍️',
    tag: 'Légitimation',
    title: 'Signature de conventions',
    desc: 'Signature de conventions officielles avec les partenaires pour garantir le soutien aux MSMEs durant les 7 mois de programme qui suivent.',
    color: '#ec4899',
    gradient: 'from-pink-500/10 to-rose-600/5',
  },
]

export default function ThematiquesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.transitionDelay = `${target.dataset.delay ?? '0'}ms`
            target.classList.add('animate-in')
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.1 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="thematiques" className="py-24 overflow-hidden" style={{ background: '#060f1f' }}>
      <style>{`
        [data-animate]{opacity:0;transform:translateY(28px);transition:opacity .65s ease-out,transform .65s ease-out}
        [data-animate].animate-in{opacity:1;transform:translateY(0)}
      `}</style>

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-6 max-w-3xl mx-auto" data-animate data-delay="0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            Thématiques
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-white leading-tight">
            Un Forum pour créer un{' '}
            <span style={{ color: '#d4af37' }}>"choc de visibilité"</span>
          </h2>
        </div>

        {/* ── Citation encadrée ── */}
        <div className="max-w-3xl mx-auto mb-16" data-animate data-delay="80">
          <div
            className="rounded-2xl px-8 py-6 text-center"
            style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <p className="text-white/70 leading-relaxed text-base">
              Le Forum n&apos;est pas une simple conférence, c&apos;est{' '}
              <strong className="text-white">l&apos;acte de naissance de l&apos;EDQ</strong>.
              Sous le{' '}
              <strong className="text-white">haut patronage du Président de la République</strong>,
              il vise à rendre le potentiel entrepreneurial des quartiers visible aux yeux de la nation.
            </p>
          </div>
        </div>

        {/* ── Cartes thématiques ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {thematiques.map((t, i) => (
            <div
              key={t.tag}
              data-animate
              data-delay={120 + i * 80}
              className={`group relative rounded-2xl p-6 overflow-hidden cursor-default select-none transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Fond coloré hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${t.color}22, transparent 70%)` }}
              />

              {/* Icône */}
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}
              >
                {t.icon}
              </div>

              {/* Tag */}
              <span
                className="relative z-10 inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-3"
                style={{ background: `${t.color}20`, color: t.color }}
              >
                {t.tag}
              </span>

              {/* Titre */}
              <h3 className="relative z-10 font-bold text-white text-sm mb-3 leading-snug">
                {t.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {t.desc}
              </p>

              {/* Barre couleur bas */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: t.color }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
