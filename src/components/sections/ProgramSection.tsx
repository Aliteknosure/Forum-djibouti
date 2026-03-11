'use client'

import { motion } from 'framer-motion'
import { Coffee, Volume2, Mic, Users, Presentation, PenTool, Clock, ArrowRight } from 'lucide-react'

type ProgramType = 'networking' | 'ceremony' | 'keynote' | 'panel' | 'presentation' | 'announcement'

const PROGRAM: { time: string; title: string; description: string; type: ProgramType }[] = [
  {
    time: '08:30',
    title: 'Accueil & Enregistrement',
    description: 'Installation des participants et des stands MSMEs "Early-Adopters".',
    type: 'networking',
  },
  {
    time: '09:00',
    title: "Cérémonie d'Ouverture Officielle",
    description: "Allocutions du MDENI, du CLE et des représentants de la Banque Mondiale et de l'Union Européenne.",
    type: 'ceremony',
  },
  {
    time: '09:30',
    title: 'Keynote : Présentation du Programme EDQ',
    description: 'Lancement officiel du programme "Entrepreneuriat de Quartier – Build by CLE" : vision, objectifs et feuille de route 2025.',
    type: 'keynote',
  },
  {
    time: '10:30',
    title: "Panel 1 : Inclusion Financière des Jeunes et des Femmes",
    description: "Discussion avec la Banque Mondiale et les institutions financières sur les mécanismes de financement accessibles aux MSMEs.",
    type: 'panel',
  },
  {
    time: '11:30',
    title: 'Présentation des 120 MSMEs de la 1ère Cohorte',
    description: 'Mise en avant des "Early-Adopters" du programme, ambassadeurs du potentiel des quartiers et des régions.',
    type: 'presentation',
  },
  {
    time: '12:30',
    title: 'Déjeuner & Networking',
    description: 'Visite des stands MSMEs et de la Caravane G2B Mobile (guichet unique).',
    type: 'networking',
  },
  {
    time: '14:00',
    title: 'Panel 2 : Formalisation & Opportunités G2B',
    description: "L'ODPIC, la CNSS et la Direction des Impôts présentent les procédures simplifiées pour les entrepreneurs informels.",
    type: 'panel',
  },
  {
    time: '15:00',
    title: 'Annonces & Teasing : Caravanes Régionales et Bootcamps',
    description: "Présentation du calendrier des Caravanes Mobiles dans les 5 régions : Tadjourah, Obock, Dikhil, Ali Sabieh et Arta.",
    type: 'announcement',
  },
  {
    time: '16:00',
    title: 'Signature Officielle des Conventions',
    description: "Signature publique des accords CLE–Banques devant le Chef de l'État et les partenaires pour sécuriser le financement des MSMEs.",
    type: 'ceremony',
  },
  {
    time: '17:00',
    title: 'Discours de Clôture & Perspectives',
    description: 'Le programme EDQ – de mars à décembre 2025 : lancement officiel de la phase "Build".',
    type: 'keynote',
  },
  {
    time: '18:00',
    title: 'Cocktail de Networking',
    description: 'Célébration et clôture de la journée dans un cadre convivial.',
    type: 'networking',
  },
]

function getIconForType(type: ProgramType) {
  switch (type) {
    case 'networking': return Coffee
    case 'ceremony': return Volume2
    case 'keynote': return Mic
    case 'panel': return Users
    case 'presentation': return Presentation
    case 'announcement': return PenTool
    default: return Clock
  }
}

function getColorForType(type: ProgramType) {
  switch (type) {
    case 'networking': return 'text-djibouti-gold border-djibouti-gold/30 bg-djibouti-gold/10'
    case 'ceremony': return 'text-djibouti-green border-djibouti-green/30 bg-djibouti-green/10'
    case 'keynote': return 'text-white border-white/30 bg-white/10'
    case 'panel': return 'text-djibouti-green border-djibouti-green/30 bg-djibouti-green/10'
    case 'presentation': return 'text-djibouti-gold border-djibouti-gold/30 bg-djibouti-gold/10'
    case 'announcement': return 'text-white border-white/30 bg-white/10'
    default: return 'text-djibouti-gold border-djibouti-gold/30 bg-djibouti-gold/10'
  }
}

export default function ProgramSection() {
  return (
    <section id="programme" className="py-24 md:py-12 bg-djibouti-navy relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-djibouti-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-djibouti-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-green" />
            <span className="text-djibouti-green text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
              Programme du 23 Mars
            </span>
            <span className="w-8 h-px bg-djibouti-green" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Une journée conçue pour lancer{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-green to-djibouti-gold">
              un mouvement national
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-djibouti-green/50 via-djibouti-gold/50 to-djibouti-green/10" />

          <div className="space-y-8 md:space-y-12">
            {PROGRAM.map((item, index) => {
              const ItemIcon = getIconForType(item.type)
              const colorClasses = getColorForType(item.type)
              const isEven = index % 2 === 0
              const [textColor, borderColor, bgColor] = colorClasses.split(' ')

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 mt-6 md:mt-0">
                    <div className={`w-12 h-12 rounded-full border-4 border-djibouti-navy flex items-center justify-center shadow-xl ${bgColor} backdrop-blur-md`}>
                      <ItemIcon size={18} className={textColor} />
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className={`hidden md:flex w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Time side */}
                    <div className={`w-1/2 flex flex-col justify-center ${isEven ? 'items-end pr-16' : 'items-start pl-16'}`}>
                      <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full border ${colorClasses} shadow-lg backdrop-blur-sm`}>
                        <Clock size={18} className={textColor} />
                        <span className={`font-heading font-bold text-xl md:text-2xl ${textColor}`}>{item.time}</span>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className={`w-1/2 ${isEven ? 'pl-16' : 'pr-16'}`}>
                      <div className="glass-dark rounded-2xl p-7 hover:bg-white/5 transition-colors duration-300 border border-white/10 hover:border-white/20 group relative overflow-hidden">
                        {/* Hover accent line */}
                        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b from-djibouti-green to-djibouti-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <h3 className="font-heading font-bold text-xl text-white mb-3 leading-snug group-hover:text-djibouti-green transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="flex md:hidden w-full pl-16 pr-2 py-2">
                    <div className="glass-dark rounded-2xl p-5 border border-white/10 w-full relative overflow-hidden group">
                      <div className={`absolute top-0 left-0 w-1 h-full opacity-50 ${
                        colorClasses.includes('djibouti-green')
                          ? 'bg-gradient-to-b from-djibouti-green to-djibouti-green/20'
                          : colorClasses.includes('djibouti-gold')
                          ? 'bg-gradient-to-b from-djibouti-gold to-djibouti-gold/20'
                          : 'bg-gradient-to-b from-white to-white/20'
                      }`} />
                      <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border ${colorClasses} text-xs`}>
                        <Clock size={12} className={textColor} />
                        <span className={`font-heading font-bold ${textColor}`}>{item.time}</span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-white mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="#inscription"
            className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg group"
          >
            Réserver ma place pour l&apos;événement
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
