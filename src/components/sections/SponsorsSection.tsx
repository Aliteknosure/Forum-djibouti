'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const majeurs = [
  {
    name: 'Union Européenne',
    logo: '/logos/logo-union-europeenne.jpg',
    desc: 'Bailleur de fonds principal',
    color: '#003399',
  },
  {
    name: 'Banque Mondiale',
    logo: '/logos/logo_worldbank.jpg',
    desc: 'Co-financeur programme EDQ',
    color: '#009FDA',
  },
  {
    name: 'MDENI',
    logo: '/logos/logo-mdeni.webp',
    desc: "Min. de l'Entreprise & du Numérique",
    color: '#1e3a5f',
  },
  {
    name: 'CLE',
    logo: '/logos/cle.png',
    desc: 'Organisateur — Centre de Leadership',
    color: '#d4af37',
  },
]

const territoriaux = [
  { name: 'REDA',             logo: '/logos/reda.png', abbr: 'REDA', color: '#8b5cf6' },
  { name: 'Dumar iyo Dadal',  logo: '',                abbr: 'DID',  color: '#f59e0b' },
  { name: 'CJED',             logo: '',                abbr: 'CJED', color: '#06b6d4' },
]

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Animation d'entrée au scroll — IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-animate]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const delay = target.dataset.delay ?? '0'
            target.style.transitionDelay = `${delay}ms`
            target.classList.add('animate-in')
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="sponsors" style={{ backgroundColor: '#f8fafc' }} className="pt-20 pb-6 overflow-hidden">
      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-12" data-animate data-delay="0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Partenaires &amp; Soutiens
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
            Ils rendent ce forum possible
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Institutions internationales et partenaires territoriaux unis pour développer
            l&apos;entrepreneuriat à Djibouti.
          </p>
        </div>

      </div>

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Partenaires majeurs ── */}
        <div className="mb-8">
          <div data-animate data-delay="80"><Divider label="Partenaires institutionnels majeurs" gold /></div>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {majeurs.map((s, i) => (
              <div key={s.name} data-animate data-delay={120 + i * 80}>
                <MajorCard {...s} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Partenaires territoriaux ── */}
        <div className="mb-8">
          <div data-animate data-delay="80"><Divider label="Partenaires territoriaux" /></div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {territoriaux.map((s, i) => (
              <div key={s.name} data-animate data-delay={120 + i * 80}>
                <TerritorialCard {...s} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center pb-2" data-animate data-delay="200">
          <div
            className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            <p className="text-white font-semibold">Rejoindre le Forum comme partenaire</p>
            <p className="text-white/60 text-sm max-w-xs text-center">
              Visibilité nationale, networking ciblé et impact sur l&apos;entrepreneuriat local.
            </p>
            <a
              href="mailto:contact@cle-djibouti.dj"
              className="px-6 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
            >
              Contactez le CLE
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ────────────────────────── Divider ────────────────────────── */
function Divider({ label, gold }: { label: string; gold?: boolean }) {
  const c = gold ? '#d4af37' : '#94a3b8'
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="h-px flex-1 max-w-24 opacity-40" style={{ backgroundColor: c }} />
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c }}>
        {label}
      </span>
      <div className="h-px flex-1 max-w-24 opacity-40" style={{ backgroundColor: c }} />
    </div>
  )
}

/* ────────────────────── Carte majeure ──────────────────────── */
function MajorCard({
  name,
  logo,
  desc,
  color,
}: {
  name: string
  logo: string
  desc: string
  color: string
}) {
  return (
    <div
      className="
        group relative flex flex-col items-center gap-4 px-10 py-7 rounded-2xl
        cursor-pointer select-none
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
      "
      style={{ background: 'white', border: '1px solid #e2e8f0', minWidth: 200 }}
    >
      {/* Fond coloré subtil au hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}0a, ${color}18)` }}
      />

      {/* Logo — gris au repos, couleur au hover */}
      <div className="relative w-36 h-20 z-10">
        <Image
          src={logo}
          alt={name}
          fill
          className="
            object-contain
            grayscale opacity-35
            group-hover:grayscale-0 group-hover:opacity-100
            transition-all duration-500 ease-out
          "
          sizes="144px"
        />
      </div>

      {/* Texte */}
      <div className="relative z-10 text-center">
        <p className="font-bold text-sm text-gray-400 group-hover:text-gray-800 transition-colors duration-300">
          {name}
        </p>
        <p className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors duration-300 mt-0.5">
          {desc}
        </p>
      </div>

      {/* Barre couleur bas — glisse de gauche à droite */}
      <div
        className="
          absolute bottom-0 left-4 right-4 h-0.5 rounded-full
          scale-x-0 group-hover:scale-x-100
          transition-transform duration-500 ease-out origin-left
        "
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

/* ─────────────────── Carte territoriale ────────────────────── */
function TerritorialCard({
  name,
  logo,
  abbr,
  color,
}: {
  name: string
  logo: string
  abbr: string
  color: string
}) {
  return (
    <div
      className="
        group flex items-center gap-3 px-5 py-3 rounded-xl
        cursor-pointer select-none
        transition-all duration-300 ease-out
        hover:shadow-md hover:-translate-y-0.5
      "
      style={{ background: 'white', border: '1px solid #f1f5f9' }}
    >
      {/* Logo ou fallback abbr */}
      <div
        className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ background: `${color}18` }}
      >
        {logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="
              object-contain p-1
              grayscale opacity-40
              group-hover:grayscale-0 group-hover:opacity-100
              transition-all duration-400 ease-out
            "
            sizes="56px"
          />
        ) : (
          <>
            <span className="relative z-10 text-xs font-bold text-gray-500 group-hover:text-white transition-colors duration-300">
              {abbr}
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
            />
          </>
        )}
      </div>

      {/* Nom */}
      <span className="font-semibold text-sm text-gray-400 group-hover:text-gray-800 transition-colors duration-300">
        {name}
      </span>

      {/* Dot couleur au hover */}
      <span
        className="w-2 h-2 rounded-full ml-2 scale-0 group-hover:scale-100 transition-transform duration-300"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
