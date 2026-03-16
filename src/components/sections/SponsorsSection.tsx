'use client'

import { motion } from 'framer-motion'
import { Landmark, Globe2, Building2, Handshake, Settings, MapPin } from 'lucide-react'
import Image from 'next/image'

const TERRITORIAL_PARTNERS = [
  {
    name: 'REDA',
    logo: '/logos/reda.png',
    desc: 'Agence Régionale de Développement',
    bg: 'white',
  },
  {
    name: 'CJEO Obock',
    logo: '/logos/club-jeune-obock.jpg',
    desc: 'Club des Jeunes Entrepreneurs d\'Obock',
    bg: 'white',
  },
  {
    name: 'Dumar iyo Dadaal',
    logo: '/logos/dumar-iyo-dadaal.jpg',
    desc: 'Women Empowerment — 3D',
    bg: 'white',
  },
  {
    name: 'CJED Djibouti',
    logo: '/logos/cjed.jpg',
    desc: 'Club des Jeunes Entrepreneurs de Djibouti',
    bg: 'navy',
  },
  {
    name: 'CJED Ali Sabieh',
    logo: '/logos/club-jeune-entrepre.jpg',
    desc: 'Club des Jeunes Entrepreneurs d\'Ali Sabieh',
    bg: 'white',
  },
]

const categories = [
  {
    icon: Landmark,
    title: 'Pilotage Stratégique',
    partners: [
      "MDENI (Ministère Délégué chargé de l'Économie Numérique et de l'Innovation)",
      "CLE (Centre de Leadership et d'Entrepreneuriat)",
    ],
  },
  {
    icon: Globe2,
    title: 'Partenaires Financiers Internationaux',
    partners: [
      'Banque Mondiale',
      'Union Européenne (Projet MSMEs)',
    ],
  },
  {
    icon: Building2,
    title: 'Partenaires Financiers Locaux',
    partners: [
      'Institutions Bancaires de la Place',
      "CPEC (Caisse Populaire d'Épargne et de Crédit)",
    ],
  },
  {
    icon: Handshake,
    title: 'Relais Territoriaux',
    partners: [
      'REDA',
      'CJEO Obock',
      'Dumar iyo Dadal',
      'CJED Djibouti',
      'CJED Ali Sabieh',
      'CCD',
    ],
  },
  {
    icon: Settings,
    title: 'Institutions Administratives',
    partners: [
      'ODPIC',
      'CNSS',
      'Direction des Impôts',
    ],
  },
]

export default function SponsorsSection() {
  return (
    <section id="partenaires" className="py-24 md:py-12 bg-gradient-to-br from-djibouti-navy to-[#0F284B] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-djibouti-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-djibouti-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
              Nos Partenaires et Acteurs
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Une Alliance au Service de l&apos;Entrepreneuriat
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
            La force du programme EDQ repose sur une coalition unique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-dark rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-djibouti-gold/30 hover:bg-white/5 transition-all duration-500 ease-out group relative overflow-hidden
                  ${index === 3 || index === 4 ? 'lg:col-span-2' : 'lg:col-span-1'}
                  ${index === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                {/* Icône décorative en arrière-plan au hover */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4">
                  <Icon size={100} className="text-djibouti-gold" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/5 group-hover:bg-djibouti-gold/20 flex items-center justify-center mb-6 transition-colors duration-500 border border-white/5 group-hover:border-djibouti-gold/30 shadow-lg">
                    <Icon className="text-djibouti-gold group-hover:text-white transition-colors duration-500" size={28} />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-6 group-hover:text-djibouti-gold transition-colors duration-300 flex items-center gap-3">
                    {category.title}
                    {category.title.includes('Administratives') && (
                      <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-1 rounded-full font-medium text-white/80">
                        Caravane G2B
                      </span>
                    )}
                  </h3>

                  <ul className="space-y-4">
                    {category.partners.map((partner, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-djibouti-green mt-2 shrink-0 group-hover:bg-djibouti-gold transition-colors duration-300 shadow-[0_0_8px_rgba(0,154,68,0.6)]" />
                        <span className="text-white/70 text-sm md:text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                          {partner}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Partenaires Territoriaux — Logos ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          {/* Séparateur titre */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-djibouti-gold/30 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-djibouti-gold/30 bg-djibouti-gold/5">
              <MapPin size={13} className="text-djibouti-gold" />
              <span className="text-djibouti-gold text-xs font-bold uppercase tracking-[0.22em] whitespace-nowrap">
                Relais Territoriaux
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-djibouti-gold/30 to-transparent" />
          </div>

          {/* Grille logos */}
          <div className="flex flex-wrap justify-center items-start gap-5 md:gap-8">
            {TERRITORIAL_PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="group flex flex-col items-center gap-3 cursor-default"
              >
                {/* Carte logo */}
                <div
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1.5"
                  style={{
                    background: partner.bg === 'navy'
                      ? 'rgba(14,34,72,0.9)'
                      : 'rgba(255,255,255,0.93)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,175,55,0.5)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(212,175,55,0.2)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.12)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'
                  }}
                >
                  {/* Halo doré au hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.08), transparent 70%)' }} />

                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain relative z-10 transition-all duration-300 group-hover:brightness-110"
                  />
                </div>

                {/* Nom + description */}
                <div className="text-center max-w-[128px]">
                  <p className="text-white/80 text-xs font-semibold leading-tight group-hover:text-djibouti-gold transition-colors duration-300">
                    {partner.name}
                  </p>
                  <p className="text-white/30 text-[10px] mt-0.5 leading-tight">
                    {partner.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note bas de section */}
          <p className="text-center text-white/20 text-xs mt-10 tracking-wider uppercase">
            Présents dans les 5 régions · Caravane G2B
          </p>
        </motion.div>

      </div>
    </section>
  )
}
