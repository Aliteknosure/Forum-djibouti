'use client'

import { motion } from 'framer-motion'
import { Landmark, Globe2, Building2, Handshake, Settings } from 'lucide-react'

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
      </div>
    </section>
  )
}
