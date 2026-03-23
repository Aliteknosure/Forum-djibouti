'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Volume2, Mic, Users, Presentation, Clock, ArrowRight, Calendar, Download } from 'lucide-react'

type ProgramType = 'networking' | 'ceremony' | 'keynote' | 'panel' | 'presentation' | 'workshop' | 'visit' | 'announcement'

interface ProgramItem {
  time: string
  title: string
  description: string | string[]
  type: ProgramType
  speakers?: string[]
}

interface Day {
  day: string
  date: string
  label: string
  color: string
  items: ProgramItem[]
}

const DAYS: Day[] = [
  {
    day: 'Jour 1',
    date: 'Dim. 29 Mars',
    label: 'Ouverture & Inspiration',
    color: 'djibouti-gold',
    items: [
      {
        time: '08h30 – 10h00',
        title: 'Ouverture de l\'EDQ',
        description: 'Visite des stands (Expo-Vente) · Accueil des invités et des participants.',
        type: 'ceremony',
        speakers: ['MC / Invités'],
      },
      {
        time: '10h10 – 10h20',
        title: 'Animation Musicale',
        description: 'Animation musicale d\'ouverture.',
        type: 'workshop',
      },
      {
        time: '10h20 – 10h30',
        title: 'Ouverture et annonce du programme de la journée',
        description: 'Présentation du déroulé de la journée par le MC.',
        type: 'announcement',
      },
      {
        time: '10h30 – 10h40',
        title: 'Vidéo d\'ouverture',
        description: 'Projection de la vidéo d\'ouverture officielle.',
        type: 'presentation',
      },
      {
        time: '10h40 – 11h00',
        title: 'Pitch des 3 Voix des Quartiers',
        description: ['→ Moustapha – Forje', '→ Un entrepreneur de Startup Djibouti (à identifier)', '→ Un bénéficiaire du pool des experts'],
        type: 'presentation',
      },
      {
        time: '11h00 – 11h10',
        title: 'Signature de la Charte d\'Engagement',
        description: 'Signature entre les Banques (à identifier) et la CLE.',
        type: 'ceremony',
      },
      {
        time: '11h10 – 11h30',
        title: 'Discours Officiels',
        description: ['→ Ministère délégué à l\'économie numérique et de l\'innovation', '→ Président de la République'],
        type: 'keynote',
        speakers: ['MC'],
      },
      {
        time: '11h30 – 13h00',
        title: 'Pause-Café & Réseautage sur les stands',
        description: 'Temps d\'échange et de networking entre participants sur les stands.',
        type: 'networking',
      },
      {
        time: '13h00 – 14h00',
        title: 'Déjeuner',
        description: 'Déjeuner Équipe CLE + invités (vouchers).',
        type: 'networking',
      },
      {
        time: '14h30 – 16h30',
        title: 'Conférence : « Tell Me Your Story »',
        description: 'Vie d\'entrepreneur : venez rencontrer et vous inspirer de l\'histoire de 3 entrepreneurs. Ils partageront réussites et échecs. Parler des réussites inspire, parler des échecs fait grandir — l\'échec fait partie de l\'aventure entrepreneuriale.',
        type: 'keynote',
        speakers: ['3 entrepreneurs à impact (à identifier)'],
      },
    ],
  },
  {
    day: 'Jour 2',
    date: 'Lun. 30 Mars',
    label: 'Numérique & Innovation',
    color: 'djibouti-green',
    items: [
      {
        time: '09h00 – 10h30',
        title: 'Panel 1 : De l\'idée à l\'impact — Startup Act & Code du Numérique',
        description: 'Catalyseurs d\'un Djibouti innovant et inclusif : Structuration d\'une idée, cadre juridique, financement et passage à l\'échelle — quelles clés pour transformer une startup en impact durable ?',
        type: 'panel',
        speakers: ['MC : Hawa', 'Anouar', 'Simane'],
      },
      {
        time: '10h30 – 11h00',
        title: 'Pause-Café',
        description: 'Pause et networking.',
        type: 'networking',
      },
      {
        time: '11h00 – 12h30',
        title: 'Panel 2 : Cloud, Infrastructures Numériques & Cybersécurité',
        description: 'Comment les solutions cloud et les infrastructures numériques permettent-elles aux entreprises de réduire leurs coûts, gagner en agilité et innover, tout en faisant face aux risques croissants (fraudes en ligne, usurpation d\'identité, atteintes aux données) ? Ce panel met en lumière les enjeux clés, les responsabilités des entreprises et les bonnes pratiques pour sécuriser les activités tout en accélérant la transformation digitale.',
        type: 'panel',
        speakers: ['MC : Mahdi Dawaleh', 'ANC', 'TO7', 'Huawei'],
      },
      {
        time: '12h30 – 14h30',
        title: 'Pause Déjeuner',
        description: 'Déjeuner des participants.',
        type: 'networking',
      },
      {
        time: '14h30 – 15h30',
        title: 'Atelier Interactif : Préparer son Pitch',
        description: 'Comment bien présenter son projet en quelques minutes et convaincre un jury ? Intro, développement, storytelling... Découvrez les astuces pour pitcher comme des pros devant un jury, un investisseur ou un client.',
        type: 'workshop',
        speakers: ['Ali Dimbio'],
      },
      {
        time: '15h40 – 16h40',
        title: 'OpenHour : À la découverte de FLOODOO',
        description: 'Présentation et démonstration de la solution FLOODOO.',
        type: 'presentation',
      },
    ],
  },
  {
    day: 'Jour 3',
    date: 'Mar. 31 Mars',
    label: 'Entrepreneuriat & Financement',
    color: 'djibouti-sand',
    items: [
      {
        time: '09h00 – 10h30',
        title: 'Panel 3 : Entrepreneuriat Féminin',
        description: 'Comment renforcer l\'entrepreneuriat féminin et lever les obstacles qui freinent encore son développement ? Comment améliorer l\'accès au financement et accompagner les femmes vers une croissance durable ? Des expertes et acteurs clés présentent les leviers institutionnels, financiers et stratégiques pour transformer ces défis en opportunités.',
        type: 'panel',
        speakers: ['Choukri (Présidente Dumaar & Dadaal)', 'Gassira Mohamed — Psychopraticienne & Entrepreneure', 'Ahlane Ahmed — Fondatrice Mon Secret Indien'],
      },
      {
        time: '10h30 – 11h00',
        title: 'Pause-Café',
        description: 'Pause et networking.',
        type: 'networking',
      },
      {
        time: '11h00 – 12h30',
        title: 'Panel 4 : Dispositifs d\'Accompagnement & Innovations Financières',
        description: 'Ce panel explorera les dispositifs d\'accompagnement des MPMEs et les solutions innovantes de financement, notamment via la FinTech, afin d\'élargir l\'accès au capital et soutenir la croissance des entreprises djiboutiennes.',
        type: 'panel',
        speakers: ['Modérateur : DEREE', 'CLE', 'ANPI', 'C-star', 'Keynote : Amin (Hseven)'],
      },
      {
        time: '12h30 – 14h30',
        title: 'Pause Déjeuner',
        description: 'Déjeuner des participants.',
        type: 'networking',
      },
      {
        time: '14h30 – 15h30',
        title: 'Panel 5 : E-Commerce & Marketing Digital',
        description: 'Comment développer votre activité grâce au e-commerce et accroître votre visibilité en ligne ? Comment utiliser le marketing digital pour toucher plus de clients et augmenter vos ventes ? Des spécialistes et entrepreneurs partagent expériences, stratégies et bonnes pratiques pour réussir votre transformation digitale.',
        type: 'panel',
        speakers: ['MC : Journaliste RTD', 'CCD', 'Point Focal Zlecaf (M. Commerce)', 'Car\'tIN'],
      },
      {
        time: '15h30 – 15h45',
        title: 'Clôture',
        description: 'Clôture officielle de l\'EDQ.',
        type: 'ceremony',
      },
    ],
  },
]

function getIconForType(type: ProgramType) {
  switch (type) {
    case 'networking': return Coffee
    case 'ceremony': return Volume2
    case 'keynote': return Mic
    case 'panel': return Users
    case 'presentation': return Presentation
    case 'workshop': return Clock
    case 'visit': return Calendar
    case 'announcement': return ArrowRight
    default: return Clock
  }
}

const TYPE_COLORS: Record<ProgramType, { dot: string; icon: string; label: string }> = {
  networking: { dot: 'bg-djibouti-gold', icon: 'text-djibouti-gold', label: 'Networking' },
  ceremony:   { dot: 'bg-djibouti-green', icon: 'text-djibouti-green', label: 'Cérémonie' },
  keynote:    { dot: 'bg-white', icon: 'text-white', label: 'Keynote' },
  panel:      { dot: 'bg-djibouti-green', icon: 'text-djibouti-green', label: 'Panel' },
  presentation:{ dot: 'bg-djibouti-gold', icon: 'text-djibouti-gold', label: 'Présentation' },
  workshop:   { dot: 'bg-blue-400', icon: 'text-blue-400', label: 'Atelier' },
  visit:      { dot: 'bg-purple-400', icon: 'text-purple-400', label: 'Visite' },
  announcement:{ dot: 'bg-orange-400', icon: 'text-orange-400', label: 'Annonce' },
}

const DAY_ACTIVE_STYLES: Record<number, string> = {
  0: 'border-djibouti-gold text-djibouti-gold bg-djibouti-gold/10',
  1: 'border-djibouti-green text-djibouti-green bg-djibouti-green/10',
  2: 'border-blue-400 text-blue-400 bg-blue-400/10',
}

const DAY_DOT_STYLES: Record<number, string> = {
  0: 'bg-djibouti-gold',
  1: 'bg-djibouti-green',
  2: 'bg-blue-400',
}

export default function ProgramSection() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="programme" className="py-24 md:py-32 bg-gradient-to-b from-[#0a1628] to-[#0d1f3c] relative overflow-hidden">
      {/* Bordure top décorative */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-djibouti-gold/60 to-transparent" />
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-djibouti-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-djibouti-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs md:text-sm font-bold uppercase tracking-[0.25em] bg-djibouti-gold/10 px-4 py-1.5 rounded-full border border-djibouti-gold/30">
              Programme Officiel
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            3 jours pour aller à la découverte du{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-gold to-white">
              monde de l&apos;Entrepreneuriat
            </span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-6">
            29 – 31 Mars 2026 · Djibouti-Ville
          </p>
          {/* Télécharger programme */}
          <a
            href="/images/Programme-Officiel.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-djibouti-gold/40 text-djibouti-gold text-sm font-semibold hover:bg-djibouti-gold/10 transition-colors"
          >
            <Download size={15} />
            Télécharger le programme complet (PDF)
          </a>
        </motion.div>

        {/* Onglets jours */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {DAYS.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex flex-col sm:flex-row items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all duration-300 font-semibold text-sm ${
                activeDay === i
                  ? DAY_ACTIVE_STYLES[i]
                  : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
              }`}
            >
              <span className="text-base">{day.day}</span>
              <span className="hidden sm:block text-xs opacity-70 font-normal">·</span>
              <span className="text-xs font-normal opacity-80">{day.date}</span>
              <span
                className={`hidden md:block text-xs font-semibold px-2 py-0.5 rounded-full ${
                  activeDay === i ? 'bg-current/20 opacity-80' : 'opacity-0'
                }`}
              >
                {day.label}
              </span>
            </button>
          ))}
        </div>

        {/* Label du jour actif */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Titre du jour */}
            <div className="text-center mb-10">
              <div className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border ${DAY_ACTIVE_STYLES[activeDay]}`}>
                <Calendar size={14} />
                {DAYS[activeDay].date} · {DAYS[activeDay].label}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Ligne verticale */}
              <div className={`absolute left-5 md:left-6 top-0 bottom-0 w-px ${DAY_DOT_STYLES[activeDay]} opacity-20`} />

              <div className="space-y-4">
                {DAYS[activeDay].items.map((item, index) => {
                  const ItemIcon = getIconForType(item.type)
                  const colors = TYPE_COLORS[item.type]

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="relative flex items-start gap-5 pl-14 md:pl-16"
                    >
                      {/* Dot timeline */}
                      <div className={`absolute left-[14px] md:left-[18px] top-4 w-3 h-3 rounded-full border-2 border-djibouti-navy ${DAY_DOT_STYLES[activeDay]}`} />

                      {/* Card */}
                      <div className="flex-1 group rounded-2xl p-5 md:p-6 border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          {/* Heure */}
                          <div className="flex items-center gap-2">
                            <Clock size={13} className="text-white/30" />
                            <span className={`font-heading font-bold text-base ${colors.icon}`}>
                              {item.time}
                            </span>
                          </div>
                          {/* Badge type */}
                          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-current/20 bg-current/10 ${colors.icon}`}>
                            <ItemIcon size={11} />
                            {colors.label}
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-white text-base md:text-lg leading-snug mb-1.5 group-hover:text-djibouti-gold transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="text-white/50 text-sm leading-relaxed space-y-1">
                          {Array.isArray(item.description)
                            ? item.description.map((line, i) => (
                                <p key={i}>{line}</p>
                              ))
                            : <p>{item.description}</p>
                          }
                        </div>
                        {item.speakers && item.speakers.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/8 flex flex-wrap gap-2">
                            {item.speakers.map((s, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37' }}
                              >
                                <span>🎤</span>
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#inscription"
            className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg group"
          >
            Réserver ma place
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: '3', label: 'Jours' },
            { number: '5', label: 'Panels' },
            { number: '1', label: 'Atelier Pitch' },
            { number: '1', label: 'OpenHour FLOODOO' },
            { number: '15+', label: 'Intervenants' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-djibouti-gold/30 transition-all duration-300 py-6 px-4 text-center ${i === 4 ? 'col-span-2 md:col-span-4 md:max-w-[240px] md:mx-auto' : ''}`}
            >
              <span className="text-3xl md:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-djibouti-gold to-djibouti-green">
                {stat.number}
              </span>
              <span className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
