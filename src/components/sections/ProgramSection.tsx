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
        title: 'Exposition & Networking d\'ouverture',
        description: 'Découverte des stands des entrepreneurs des quartiers. Accueil des invités officiels et des participants.',
        type: 'ceremony',
      },
      {
        time: '09h55 – 10h10',
        title: 'Séquence Présidentielle — Le Président parmi les entrepreneurs',
        description: 'Parcours immersif : Le Président visite les stands des entrepreneurs des quartiers. Échanges directs, sans protocole. Photos et interactions authentiques.',
        type: 'ceremony',
      },
      {
        time: '10h15 – 10h20',
        title: 'Ouverture de la journée',
        description: 'Présentation du programme et du Forum Boost Entrepreneurship 2026.',
        type: 'announcement',
      },
      {
        time: '10h25 – 10h30',
        title: 'Vidéo d\'ouverture',
        description: 'Film institutionnel : bilan de l\'entrepreneuriat djiboutien.',
        type: 'presentation',
      },
      {
        time: '10h30 – 11h00',
        title: 'Pitch « Voix des Quartiers »',
        description: '3 entrepreneurs des quartiers prennent la parole.',
        type: 'presentation',
      },
      {
        time: '11h00 – 11h15',
        title: 'Signature de la Charte d\'Engagement',
        description: 'Engagement solennel entre les banques partenaires et CLE. Symbolise l\'ancrage institutionnel du Programme EDQ.',
        type: 'ceremony',
      },
      {
        time: '11h15 – 12h00',
        title: 'Séquence Présidentielle — Keynote + Fireside Chat + Q&R Entrepreneurs',
        description: '',
        type: 'keynote',
      },
      {
        time: '12h15 – 14h00',
        title: 'Déjeuner officiel',
        description: 'Buffet networking — Vouchers pour équipe CLE et invités.',
        type: 'networking',
      },
      {
        time: '14h30 – 16h30',
        title: 'Conférence : « Tell Me Your Story »',
        description: '3 entrepreneurs à impact partagent leur parcours : Réussites, échecs et rebonds. Ce qui inspire… et ce qui fait grandir. Format : storytelling immersif, questions du public.',
        type: 'keynote',
      },
      {
        time: '16h30',
        title: 'Fin de la 1ère journée',
        description: '',
        type: 'announcement',
      },
    ],
  },
  {
    day: 'Jour 2',
    date: 'Lun. 30 Mars',
    label: 'Innovation & Digital',
    color: 'djibouti-green',
    items: [
      {
        time: '09h00 – 10h30',
        title: 'Panel 1 : De l\'idée à l\'impact — Startup Act Djibouti',
        description: 'Startup Act & Code du Numérique : catalyseurs d\'un Djibouti innovant et inclusif. Structuration, cadre juridique, financement, passage à l\'échelle.',
        type: 'panel',
      },
      {
        time: '10h30 – 11h00',
        title: 'Pause-Café & Réseautage',
        description: '',
        type: 'networking',
      },
      {
        time: '11h00 – 12h30',
        title: 'Panel 2 : Régime fiscal spécifique',
        description: 'Comment les MPMEs réduisent leurs coûts et sécurisent leurs activités grâce au digital ? Transformation digitale, protection des données, solutions cloud.',
        type: 'panel',
      },
      {
        time: '12h30 – 14h30',
        title: 'Pause Déjeuner',
        description: '',
        type: 'networking',
      },
      {
        time: '14h30 – 15h30',
        title: 'Atelier Interactif : Préparer son Pitch',
        description: 'Techniques de storytelling, structure d\'un pitch gagnant. Exercices en live — préparer la compétition du Jour 3.',
        type: 'workshop',
      },
      {
        time: '15h40 – 16h40',
        title: 'OpenHour : À la découverte de FLOODOO',
        description: 'Présentation interactive de la solution innovante djiboutienne.',
        type: 'presentation',
      },
      {
        time: '16h40',
        title: 'Fin de la 2ème journée',
        description: '',
        type: 'announcement',
      },
    ],
  },
  {
    day: 'Jour 3',
    date: 'Mar. 31 Mars',
    label: 'Financement, Femmes & Clôture',
    color: 'djibouti-sand',
    items: [
      {
        time: '09h00 – 10h30',
        title: 'Panel 3 : Entrepreneuriat Féminin',
        description: 'Lever les obstacles, accéder au financement, construire une croissance durable. Leviers institutionnels, financiers et stratégiques pour les femmes entrepreneurs.',
        type: 'panel',
      },
      {
        time: '10h30 – 11h00',
        title: 'Pause-Café & Réseautage',
        description: '',
        type: 'networking',
      },
      {
        time: '11h00 – 12h30',
        title: 'Panel 4 : Dispositifs d\'accompagnement',
        description: 'Solutions innovantes de financement pour les MPMEs. Accès au capital, accompagnement, écosystème FinTech djiboutien.',
        type: 'panel',
      },
      {
        time: '12h30 – 14h30',
        title: 'Pause Déjeuner',
        description: '',
        type: 'networking',
      },
      {
        time: '14h30 – 15h30',
        title: 'Panel 5 : E-Commerce',
        description: 'Développer son activité en ligne, toucher plus de clients, booster ses ventes. Expériences terrain d\'entrepreneurs du e-commerce djiboutien.',
        type: 'panel',
      },
      {
        time: '15h30 – 15h50',
        title: 'Clôture solennelle du Forum',
        description: 'Bilan des 3 jours. Annonce des prochaines étapes du Programme EDQ. Remise du prix « Entrepreneur des Quartiers 2026 ».',
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
