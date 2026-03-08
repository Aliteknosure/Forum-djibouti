'use client'

import { useEffect, useRef } from 'react'

const piliers = [
  {
    icon: '🤝',
    title: 'Caravane G2B',
    desc: 'Guichet unique de formalisation — immatriculation, fiscalité et démarches administratives en un seul endroit, sur place.',
    color: '#3b82f6',
  },
  {
    icon: '💳',
    title: 'Inclusion financière',
    desc: 'Mise en relation directe avec des institutions financières partenaires pour faciliter l\'accès au crédit et aux garanties.',
    color: '#10b981',
  },
  {
    icon: '📈',
    title: 'Networking & Marchés',
    desc: 'Connexion entre MSMEs, grands comptes et administrations pour créer des opportunités commerciales durables.',
    color: '#d4af37',
  },
  {
    icon: '🏆',
    title: 'Remise des prix EDQ',
    desc: 'Cérémonie célébrant les MSMEs sélectionnées du programme avec remise de prix et reconnaissance officielle.',
    color: '#ec4899',
  },
]

export default function AboutSection() {
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
      { threshold: 0.12 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white overflow-hidden">
      <style>{`
        [data-animate]{opacity:0;transform:translateY(28px);transition:opacity .65s ease-out,transform .65s ease-out}
        [data-animate].animate-in{opacity:1;transform:translateY(0)}
      `}</style>

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header centré ── */}
        <div className="text-center mb-16 max-w-3xl mx-auto" data-animate data-delay="0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            À propos du Forum
          </span>
          <div className="flex flex-col items-center gap-1 mb-5">
            <p className="text-base text-gray-500 font-semibold text-center">
              Sous le haut patronage de{' '}
              <strong className="text-gray-800 text-lg">S.E.M. Ismaël Omar Guelleh</strong>
            </p>
            <p className="text-sm text-gray-400 text-center">Président de la République de Djibouti</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: '#0a1932' }}>
            Plus qu&apos;un Forum,{' '}
            <span style={{ color: '#b8960c' }}>un Acte Fondateur</span>
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Le Forum National de l&apos;Entrepreneuriat du 23 mars n&apos;est pas une simple conférence.
            C&apos;est l&apos;<strong className="text-gray-700">acte de naissance officiel</strong> du programme{' '}
            <strong className="text-gray-700">Entrepreneuriat de Quartier – Build by CLE (EDQ)</strong>, une
            initiative portée par le <strong className="text-gray-700">MDENI</strong> et le{' '}
            <strong className="text-gray-700">Centre de Leadership et d&apos;Entrepreneuriat (CLE)</strong>.
          </p>
        </div>

        {/* ── Deux colonnes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Colonne gauche — texte */}
          <div data-animate data-delay="100">
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              À Djibouti, les quartiers populaires de{' '}
              <strong className="text-gray-800">Balbala</strong> et les{' '}
              <strong className="text-gray-800">cinq régions de l&apos;intérieur</strong> concentrent
              un potentiel entrepreneurial immense, encore sous-exploité.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg" style={{ borderLeft: '3px solid #d4af37', paddingLeft: '1.25rem' }}>
              Le Forum est le moment où ce potentiel devient{' '}
              <strong className="text-gray-800">visible aux yeux de la nation</strong>.
            </p>

            {/* Chiffres clés inline */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { n: '120', l: 'MSMEs sélectionnées', icon: '🎯' },
                { n: '5',   l: 'Régions couvertes',   icon: '📍' },
                { n: '50%', l: 'Femmes entrepreneures', icon: '👩‍💼' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="text-center rounded-2xl px-3 py-5"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="text-2xl font-bold mb-1" style={{ color: '#0a1932' }}>{s.n}</p>
                  <p className="text-xs text-gray-500 leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — encadré sombre */}
          <div data-animate data-delay="180">
            <div
              className="rounded-2xl p-8"
              style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-6">Le Forum en chiffres</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { n: '1 journée', l: '23 mars 2026' },
                  { n: '120', l: 'MSMEs participantes' },
                  { n: '5 panels', l: 'Thématiques clés' },
                  { n: '10+', l: 'Institutions présentes' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
                  >
                    <p className="font-bold text-xl mb-1" style={{ color: '#d4af37' }}>{s.n}</p>
                    <p className="text-white/50 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <p className="text-white/80 text-sm leading-relaxed">
                  <span style={{ color: '#d4af37' }}>📍</span>{' '}
                  <strong className="text-white">Djibouti-Ville</strong> — 23 mars 2026
                  <br />
                  <span className="text-white/50 text-xs">Adresse exacte communiquée par email avec le badge d&apos;accès</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Les 4 piliers du Forum ── */}
        <div data-animate data-delay="0">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-24 opacity-30" style={{ backgroundColor: '#d4af37' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#b8960c' }}>
              Les piliers du Forum
            </span>
            <div className="h-px flex-1 max-w-24 opacity-30" style={{ backgroundColor: '#d4af37' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {piliers.map((p, i) => (
              <div
                key={p.title}
                data-animate
                data-delay={80 + i * 80}
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${p.color}18` }}
                >
                  {p.icon}
                </div>
                <h4 className="font-bold text-sm mb-2" style={{ color: '#0a1932' }}>{p.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                <div
                  className="mt-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: p.color }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
