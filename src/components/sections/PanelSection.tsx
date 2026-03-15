'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Calendar, Clock, ArrowRight } from 'lucide-react'

const PANELS = [
  {
    id: 'p1',
    numero: 'Panel 1',
    titre: 'Startup Act — Cadre légal et soutien aux startups',
    description: 'Structuration d\'une idée, cadre juridique, financement et passage à l\'échelle : quelles clés pour transformer une startup en impact durable ?',
    date: 'Lundi 30 Mars',
    horaire: '08h30 – 10h00',
    jour: 'Jour 2',
    intervenants: [
      { role: 'Keynote', nom: 'MDENI' },
      { role: 'Modérateur', nom: 'Raisso' },
      { role: 'Intervenant', nom: 'Ministère du Numérique' },
      { role: 'Intervenant', nom: 'CLE' },
      { role: 'Intervenant', nom: 'Startups' },
    ],
    color: '#009A44',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
    tags: ['Juridique', 'Startup', 'Financement'],
  },
  {
    id: 'p2',
    numero: 'Panel 2',
    titre: 'FinTech et Accès au Financement',
    description: 'FinTech, innovation financière et nouveaux mécanismes de financement : quelles solutions pour élargir l\'accès au capital et accélérer la croissance des entreprises djiboutiennes ?',
    date: 'Lundi 30 Mars',
    horaire: '10h20 – 11h50',
    jour: 'Jour 2',
    intervenants: [
      { role: 'Keynote', nom: 'Warsama' },
      { role: 'Intervenant', nom: 'Banque Centrale de Djibouti' },
      { role: 'Intervenant', nom: 'BCIMR' },
      { role: 'Intervenant', nom: 'Fintech Locale (Beyleh)' },
    ],
    color: '#F5A623',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
    tags: ['FinTech', 'Finance', 'Capital'],
  },
  {
    id: 'p4',
    numero: 'Panel 4',
    titre: 'Transformation Digitale des MSMEs',
    description: 'Outils numériques pour améliorer productivité, gestion et accès aux marchés. Comment accélérer la digitalisation des petites entreprises ?',
    date: 'Mardi 31 Mars',
    horaire: '08h30 – 10h00',
    jour: 'Jour 3',
    intervenants: [
      { role: 'Modérateur', nom: 'Consultant Digital' },
      { role: 'Intervenant', nom: 'CLE' },
      { role: 'Intervenant', nom: 'Djibouti Telecom' },
      { role: 'Intervenant', nom: 'Entrepreneur E-Commerce' },
    ],
    color: '#1A3C6E',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
    tags: ['Digital', 'MSME', 'Productivité'],
  },
  {
    id: 'p5',
    numero: 'Panel 5',
    titre: 'E-Commerce et Nouveaux Marchés',
    description: 'Comment développer votre activité grâce au e-commerce et accroître votre visibilité en ligne ? Des spécialistes et entrepreneurs partagent stratégies et bonnes pratiques pour réussir votre transformation digitale.',
    date: 'Mardi 31 Mars',
    horaire: '10h20 – 11h50',
    jour: 'Jour 3',
    intervenants: [
      { role: 'Intervenant', nom: 'Entrepreneur E-Commerce LIMO' },
      { role: 'Intervenant', nom: 'Représentant Banque / FinTech DMoney' },
    ],
    color: '#8B5CF6',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    dotColor: 'bg-violet-500',
    tags: ['E-Commerce', 'Digital', 'Marchés'],
  },
  {
    id: 'p6',
    numero: 'Panel 6',
    titre: 'Cloud et Infrastructures Numériques',
    description: 'Comment les solutions cloud aident les entreprises à améliorer leur performance, réduire leurs coûts et accélérer leur transformation digitale ? Quels rôles jouent les infrastructures numériques dans le développement des services ?',
    date: 'Mardi 31 Mars',
    horaire: '14h30 – 15h30',
    jour: 'Jour 3',
    intervenants: [
      { role: 'Intervenant', nom: 'Direction Cybersécurité' },
      { role: 'Intervenant', nom: 'Djibouti Telecom' },
    ],
    color: '#06B6D4',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    dotColor: 'bg-cyan-500',
    tags: ['Cloud', 'Infrastructure', 'Numérique'],
  },
  {
    id: 'p7',
    numero: 'Panel 7',
    titre: 'Services de Confiance Numérique',
    description: 'Signature électronique, horodatage, recommandé électronique — quelles opportunités pour les MSMEs dans l\'économie numérique ?',
    date: 'Mercredi 1er Avril',
    horaire: '09h00 – 10h30',
    jour: 'Jour 4',
    intervenants: [
      { role: 'Modérateur', nom: 'Expert Droit Numérique' },
      { role: 'Intervenant', nom: 'Autorité Numérique' },
      { role: 'Intervenant', nom: 'Juriste' },
      { role: 'Intervenant', nom: 'Entreprise Tech' },
    ],
    color: '#EC4899',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    dotColor: 'bg-pink-500',
    tags: ['Numérique', 'Juridique', 'Sécurité'],
  },
  {
    id: 'p9',
    numero: 'Panel 9',
    titre: 'Protection des Données et Cybersécurité',
    description: 'Fraudes en ligne, usurpation d\'identité, responsabilité des entreprises, protection des données personnelles — ce que tout entrepreneur doit savoir pour protéger son activité.',
    date: 'Mercredi 1er Avril',
    horaire: '10h30 – 11h30',
    jour: 'Jour 4',
    intervenants: [
      { role: 'Modérateur', nom: 'Spécialiste Cybersécurité' },
      { role: 'Intervenant', nom: 'Autorité Protection des Données' },
      { role: 'Intervenant', nom: 'Expert Cybersécurité' },
      { role: 'Intervenant', nom: 'Entreprise Digitale' },
    ],
    color: '#EF4444',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
    tags: ['Cybersécurité', 'Données', 'Protection'],
  },
]

export default function PanelSection() {
  const [openPanel, setOpenPanel] = useState<string | null>(null)

  return (
    <section id="panel" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Déco background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-djibouti-green/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-djibouti-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-green" />
            <span className="text-djibouti-green text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
              Panels Thématiques
            </span>
            <span className="w-8 h-px bg-djibouti-green" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-djibouti-navy mb-4">
            Débats & Tables{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-green to-djibouti-gold">
              Rondes
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            7 panels thématiques sur 4 jours — experts, entrepreneurs et décideurs débattent des grands enjeux
            du numérique et de l'entrepreneuriat à Djibouti.
          </p>
        </motion.div>

        {/* Panels en accordion */}
        <div className="space-y-4">
          {PANELS.map((panel, index) => {
            const isOpen = openPanel === panel.id
            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isOpen ? panel.borderColor : 'border-gray-100'
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                  className={`w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors ${
                    isOpen ? panel.bgLight : 'bg-white hover:bg-gray-50/80'
                  }`}
                >
                  {/* Numéro */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs"
                    style={{ background: `linear-gradient(135deg, ${panel.color}, ${panel.color}99)` }}
                  >
                    {panel.id.toUpperCase()}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${panel.bgLight} ${panel.textColor}`}>
                        {panel.numero}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {panel.date}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={11} /> {panel.horaire}
                      </span>
                    </div>
                    <p className="font-semibold text-djibouti-navy text-sm md:text-base leading-snug">
                      {panel.titre}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Détails */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 md:px-6 pb-6 pt-2 ${panel.bgLight}`}>
                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                          {panel.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Intervenants */}
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Users size={12} /> Intervenants
                            </p>
                            <div className="space-y-2">
                              {panel.intervenants.map((p, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${panel.dotColor}`} />
                                  <span className="text-xs text-gray-500">{p.role} :</span>
                                  <span className="text-xs font-medium text-djibouti-navy">{p.nom}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Infos pratiques */}
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                              Infos pratiques
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Calendar size={13} style={{ color: panel.color }} />
                                <span>{panel.date} — {panel.jour}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Clock size={13} style={{ color: panel.color }} />
                                <span>{panel.horaire}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {panel.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${panel.bgLight} ${panel.textColor}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-5 pt-4 border-t border-white/60">
                          <a
                            href="#inscription"
                            onClick={(e) => {
                              e.preventDefault()
                              document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                            style={{ color: panel.color }}
                          >
                            Réserver ma place pour ce panel
                            <ArrowRight size={15} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-4">Siège réservé · Inscription gratuite · Places limitées</p>
          <a
            href="#inscription"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary inline-flex"
          >
            Je m'inscris à un panel
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
