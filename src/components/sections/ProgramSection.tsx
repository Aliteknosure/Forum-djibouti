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
      { time: '08:00 – 09:30', title: 'Cérémonie d\'Ouverture Officielle de l\'EDQ', description: 'Visite présidentielle du Boost Entrepreneurship City · Accueil des invités et des participants.', type: 'ceremony' },
      { time: '09:30 – 09:40', title: 'Annonce du programme de la journée', description: 'Animation MC — présentation du déroulé de la journée.', type: 'announcement' },
      { time: '09:40 – 09:50', title: 'Lecture du Saint Coran', description: 'Tradition d\'ouverture officielle.', type: 'ceremony' },
      { time: '09:50 – 10:10', title: 'Vidéo d\'ouverture — Témoignages inspirants', description: 'Témoignages de jeunes entrepreneurs et femmes entrepreneures.', type: 'presentation' },
      { time: '10:10 – 10:20', title: 'Sketch — Troupe Iskoufilan', description: 'Représentation artistique de la troupe Iskoufilan.', type: 'workshop' },
      { time: '10:20 – 10:40', title: 'Pitch des 3 Voix des Quartiers', description: ['→ Moustapha – Forje', '→ Un entrepreneur de Startup Djibouti', '→ Un bénéficiaire du pool des experts'], type: 'presentation' },
      { time: '10:40 – 10:50', title: 'Signature de la Charte d\'Engagement', description: 'Banques et CLE — formalisation des engagements partenaires.', type: 'ceremony' },
      { time: '10:50 – 11:00', title: 'Discours Officiels', description: ['→ Ministère délégué à l\'économie numérique et de l\'innovation', '→ Président de la République'], type: 'keynote' },
      { time: '12:00 – 13:00', title: 'Pause-Café Réseautage', description: 'Temps d\'échange et de networking entre participants.', type: 'networking' },
      { time: '13:00 – 14:00', title: 'Déjeuner — Équipe CLE & Invités', description: 'Déjeuner avec vouchers pour l\'équipe CLE et les invités officiels.', type: 'networking' },
      { time: '14:30 – 16:30', title: 'Conférence : « Tell Me Your Story »', description: 'Vie d\'entrepreneur : rencontrez et inspirez-vous de l\'histoire de 3 entrepreneurs. Réussites, échecs et leçons — l\'échec fait partie de l\'aventure entrepreneuriale et fait grandir.', type: 'keynote', speakers: ['Modérateur : À confirmer', 'Moussa Kassim Modjib / Limo', 'Beyleh-Fleetin'] },
      { time: '16:30', title: 'Clôture — Fin de la Journée 1', description: 'Fin officielle de la première journée du Forum.', type: 'ceremony' },
    ],
  },
  {
    day: 'Jour 2',
    date: 'Lun. 30 Mars',
    label: 'Panels & Ateliers',
    color: 'djibouti-green',
    items: [
      {
        time: '08:30 – 10:00', title: 'Panel 1 : Startup Act — Cadre légal et soutien aux startups',
        description: 'Structuration d\'une idée, cadre juridique, financement et passage à l\'échelle : quelles clés pour transformer une startup en impact durable ?',
        type: 'panel',
        speakers: ['Keynote : MDENI', 'Modérateur : Raisso', 'Ministère du Numérique', 'CLE', 'Startups'],
      },
      {
        time: '10:20 – 11:50', title: 'Panel 2 : FinTech et Accès au Financement',
        description: 'FinTech, innovation financière et nouveaux mécanismes de financement : quelles solutions pour élargir l\'accès au capital et accélérer la croissance des entreprises djiboutiennes ?',
        type: 'panel',
        speakers: ['Keynote : Warsama', 'Banque Centrale de Djibouti', 'BCIMR', 'Fintech Locale (Beyleh)'],
      },
      {
        time: '11:00 – 12:30', title: 'Pause-Café · Sessions en parallèle',
        description: 'Temps d\'échange, networking et sessions simultanées.',
        type: 'networking',
      },
      {
        time: '12:30 – 14:30', title: 'Pause Déjeuner',
        description: 'Déjeuner des participants.',
        type: 'networking',
      },
      {
        time: '14:30 – 15:30', title: 'Atelier Interactif : Préparer son Pitch',
        description: 'Comment bien présenter son projet en quelques minutes et convaincre un jury ? Intro, développement, story telling... Découvrez les astuces qui vous aideront à pitcher comme des pros devant un jury, un investisseur ou un client.',
        type: 'workshop',
        speakers: ['Amine HSEVEN'],
      },
      {
        time: '15:40 – 16:00', title: 'Démonstration : Plateforme G2B',
        description: 'Présentation de la plateforme G2B en direct par visio-conférence.',
        type: 'presentation',
      },
      {
        time: '16:00 – 17:00', title: 'Démonstration de FlooDOO',
        description: 'Présentation et démonstration de la solution FlooDOO.',
        type: 'presentation',
      },
      {
        time: '17:00', title: 'Clôture — Fin de la Journée 2',
        description: 'Fin officielle de la deuxième journée du Forum.',
        type: 'ceremony',
      },
    ],
  },
  {
    day: 'Jour 3',
    date: 'Mar. 31 Mars',
    label: 'Jour 3',
    color: 'djibouti-sand',
    items: [
      {
        time: '08:30 – 10:00', title: 'Panel 4 : Transformation Digitale des MSMEs',
        description: 'Outils numériques pour améliorer productivité, gestion et accès aux marchés.',
        type: 'panel',
        speakers: ['Modérateur : Consultant Digital', 'CLE', 'Djibouti Telecom', 'Entrepreneur E-Commerce'],
      },
      {
        time: '10:20 – 11:50', title: 'Panel 5 : E-Commerce et Nouveaux Marchés',
        description: 'Comment développer votre activité grâce au e-commerce et accroître votre visibilité en ligne ? Des spécialistes et entrepreneurs partagent stratégies et bonnes pratiques pour réussir votre transformation digitale.',
        type: 'panel',
        speakers: ['Entrepreneur E-Commerce LIMO', 'Représentant Banque / FinTech DMoney'],
      },
      {
        time: '12:30 – 14:30', title: 'Pause Déjeuner',
        description: 'Déjeuner des participants.',
        type: 'networking',
      },
      {
        time: '14:30 – 15:30', title: 'Panel 6 : Cloud et Infrastructures Numériques',
        description: 'Comment les solutions cloud aident les entreprises à améliorer leur performance, réduire leurs coûts et accélérer leur transformation digitale ? Quels rôles jouent les infrastructures numériques dans le développement des services et de l\'innovation ?',
        type: 'panel',
        speakers: ['Direction Cybersécurité', 'Djibouti Telecom'],
      },
      {
        time: '15:40 – 16:40', title: 'Atelier : Protégez vos Créations — Propriété Intellectuelle',
        description: 'Comment savoir si votre création est nouvelle et comment assurer qu\'elle ne soit pas utilisée par d\'autres sans votre autorisation ? Des spécialistes vous expliquent les différents outils disponibles.',
        type: 'workshop',
        speakers: ['Abdourahman — Chef de Service PI · ODPIC'],
      },
      {
        time: '17:00 – 18:30', title: 'Café Finance — Réseautage Investisseurs',
        description: 'Réseautage avec le monde de la finance et des investisseurs à Djibouti. Participants sélectionnés en avance pour des échanges constructifs.',
        type: 'networking',
        speakers: ['CCD', 'Banques'],
      },
    ],
  },
  {
    day: 'Jour 4',
    date: 'Mer. 1er Avril',
    label: 'Services Numériques & Clôture',
    color: 'purple-400',
    items: [
      {
        time: '09:00 – 10:30', title: 'Panel 7 : Services de Confiance Numérique',
        description: 'Signature électronique, horodatage, recommandé électronique — quelles opportunités pour les MSMEs dans l\'économie numérique ?',
        type: 'panel',
        speakers: ['Autorité Numérique', 'Juriste', 'Entreprise Tech', 'Modérateur : Expert Droit Numérique'],
      },
      {
        time: '10:30 – 11:30', title: 'Panel 9 : Protection des Données et Cybersécurité',
        description: 'Fraudes en ligne, usurpation d\'identité, responsabilité des entreprises, protection des données personnelles — ce que tout entrepreneur doit savoir.',
        type: 'panel',
        speakers: ['Autorité Protection des Données', 'Expert Cybersécurité', 'Entreprise Digitale', 'Modérateur : Spécialiste Cybersécurité'],
      },
      {
        time: '15:00 – 16:00', title: 'Démonstration : Plateforme Services Publics Numériques',
        description: 'Présentation des services publics dématérialisés accessibles aux entreprises et aux citoyens.',
        type: 'presentation',
      },
      {
        time: '15:30 – 16:30', title: 'Masterclass : Cybersécurité et Protection des Données pour MSMEs',
        description: 'Session pratique et interactive — Salle Ateliers.',
        type: 'workshop',
        speakers: ['Direction Cybersécurité'],
      },
      {
        time: '16:30 – 17:30', title: 'Fin de l\'Événement — Cocktail de Clôture & Networking',
        description: 'Célébration des 4 jours, échanges libres entre participants, investisseurs et entrepreneurs.',
        type: 'networking',
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
  3: 'border-purple-400 text-purple-400 bg-purple-400/10',
}

const DAY_DOT_STYLES: Record<number, string> = {
  0: 'bg-djibouti-gold',
  1: 'bg-djibouti-green',
  2: 'bg-blue-400',
  3: 'bg-purple-400',
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
            4 jours pour{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-gold to-white">
              lancer un mouvement
            </span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-6">
            29 Mars – 1er Avril 2026 · Djibouti-Ville
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
            { number: '4', label: 'Jours' },
            { number: '9', label: 'Panels & Conférences' },
            { number: '4', label: 'Ateliers Interactifs' },
            { number: '3', label: 'Démonstrations' },
            { number: '20+', label: 'Intervenants' },
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
