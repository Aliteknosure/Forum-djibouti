'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Calendar, Clock, ArrowRight, Target, BookOpen } from 'lucide-react'

const PANELS = [
  {
    id: 'p1',
    numero: 'Panel 1',
    titre: 'Startup Act Djibouti — Cadre légal et soutien aux startups',
    soustitre: 'Construire l\'écosystème entrepreneurial de demain — Loi, accompagnement et défis',
    description: 'Le Startup Act djiboutien définit le cadre juridique, fiscal et institutionnel permettant aux jeunes entreprises innovantes de naître, croître et rayonner. Ce panel explore ce que la loi apporte concrètement, les premiers résultats du Programme Startup Djibouti, et les défis pour atteindre une masse critique de startups compétitives à l\'échelle régionale.',
    contexte: 'Diversification économique au-delà des services portuaires · Création d\'emplois qualifiés pour la jeunesse · Positionnement de Djibouti comme hub d\'innovation pour la Corne de l\'Afrique',
    date: 'Lundi 30 Mars',
    horaire: '08h30 – 10h00',
    duree: '90 min — Table ronde ouverte',
    jour: 'Jour 2',
    publics: ['Entrepreneurs & porteurs de projets', 'Étudiants et jeunes diplômés', 'Investisseurs & business angels', 'Institutions d\'accompagnement'],
    themes: [
      'Le Startup Act : critères de labellisation, régime fiscal, propriété intellectuelle, guichet unique',
      'Programme Startup Djibouti : startups incubées, montants levés, emplois créés',
      'Défis réels : accès au financement, marché local limité, ressources humaines, culture du risque',
      'Témoignages de startups labellisées : parcours, obstacles et conseils aux nouveaux entrants',
      'Vision 2030 : fonds d\'amorçage national, Startup Visa, espaces co-working',
    ],
    intervenants: [
      { role: 'Keynote', nom: 'MDENI — Ministère de l\'Économie Numérique' },
      { role: 'Modérateur', nom: 'Raisso' },
      { role: 'Intervenant', nom: 'Programme Startup Djibouti' },
      { role: 'Intervenant', nom: 'CLE' },
      { role: 'Témoignages', nom: 'Startups labellisées' },
    ],
    color: '#009A44',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
    tags: ['Startup Act', 'Écosystème', 'Financement', 'Innovation'],
  },
  {
    id: 'p2',
    numero: 'Panel 2',
    titre: 'FinTech et Accès au Financement',
    soustitre: 'Nouveaux mécanismes pour élargir l\'accès au capital des entreprises djiboutiennes',
    description: 'FinTech, innovation financière et nouveaux mécanismes de financement : quelles solutions pour élargir l\'accès au capital et accélérer la croissance des entreprises djiboutiennes ? De la Banque Centrale aux fintechs locales, les acteurs du financement se réunissent pour explorer les solutions adaptées à l\'écosystème djiboutien.',
    contexte: 'Renforcer l\'inclusion financière · Développer l\'accès au crédit pour les MSMEs · Soutenir l\'innovation financière locale',
    date: 'Lundi 30 Mars',
    horaire: '10h20 – 11h50',
    duree: '90 min — Table ronde ouverte',
    jour: 'Jour 2',
    publics: ['Entrepreneurs cherchant des financements', 'Startups FinTech', 'Acteurs bancaires et financiers', 'Investisseurs & bailleurs'],
    themes: [
      'État des lieux du financement des PME djiboutiennes',
      'FinTechs locales : D-Money, Beyleh-Fleetin et les nouveaux acteurs du paiement',
      'Mécanismes de microfinance et accès au crédit pour les très petites entreprises',
      'Capital-risque et business angels : quel écosystème d\'investissement à Djibouti ?',
      'Le rôle de la Banque Centrale dans l\'innovation financière',
    ],
    intervenants: [
      { role: 'Keynote', nom: 'Warsama' },
      { role: 'Intervenant', nom: 'Banque Centrale de Djibouti' },
      { role: 'Intervenant', nom: 'BCIMR' },
      { role: 'Intervenant', nom: 'Fintech Locale — Beyleh' },
    ],
    color: '#F5A623',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
    tags: ['FinTech', 'Finance', 'Capital', 'Inclusion'],
  },
  {
    id: 'p4',
    numero: 'Panel 4',
    titre: 'Transformation Digitale des MSMEs',
    soustitre: 'Programme Digital Shift — Comptabilité, RH et stock comme leviers de compétitivité',
    description: 'La transformation digitale n\'est plus réservée aux grandes entreprises. Des solutions accessibles permettent aux PME djiboutiennes de digitaliser leur comptabilité, RH et gestion des stocks en quelques semaines, pour un investissement mensuel comparable à un abonnement téléphonique. Ce panel met en lumière des expériences réelles avec le programme Digital Shift.',
    contexte: 'Compétitivité des PME dans un environnement régional numérique · Accès au financement facilité · Réduction des pertes liées à la gestion manuelle',
    date: 'Mardi 31 Mars',
    horaire: '08h30 – 10h00',
    duree: '90 min — Table ronde + démo live',
    jour: 'Jour 3',
    publics: ['Dirigeants de PME', 'Responsables administratifs, financiers & RH', 'Entrepreneurs en croissance', 'Prestataires IT locaux'],
    themes: [
      'ROI concret : de 10 à 30h/mois gagnées pour une PME de 10 employés',
      'Programme Digital Shift : modules comptabilité, RH, stock — démo live FlowDow',
      'Témoignages CLE : entreprises avant/après digitalisation avec chiffres à l\'appui',
      'Culture du digital : former les équipes et surmonter la résistance au changement',
      'Comment la digitalisation attire les investisseurs et facilite l\'accès au crédit',
    ],
    intervenants: [
      { role: 'Modérateur', nom: 'Consultant Digital' },
      { role: 'Intervenant', nom: 'CLE — Programme Digital Shift' },
      { role: 'Intervenant', nom: 'Djibouti Telecom' },
      { role: 'Témoignages', nom: 'Entrepreneurs E-Commerce accompagnés CLE' },
    ],
    color: '#1A3C6E',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
    tags: ['Digital Shift', 'Gestion', 'PME', 'Productivité'],
  },
  {
    id: 'p5',
    numero: 'Panel 5',
    titre: 'Commerce Électronique et Nouveaux Marchés',
    soustitre: 'Saisir les opportunités du marché numérique djiboutien et régional',
    description: 'Le marché e-commerce africain dépassera 75 milliards USD en 2025 — Djibouti peut en capturer une part significative grâce à sa position géostratégique. Le Livre IV du Code du Numérique établit un cadre légal clair pour les acteurs du marché. Ce panel explore comment lancer une boutique en ligne conforme et conquérir le marché régional.',
    contexte: 'Position géostratégique comme hub logistique · Accès au marché régional (Éthiopie, Somalie, Érythrée) · Inclusion financière via les paiements mobiles',
    date: 'Mardi 31 Mars',
    horaire: '10h20 – 11h50',
    duree: '75 min — Table ronde + networking guidé',
    jour: 'Jour 3',
    publics: ['Commerçants souhaitant se digitaliser', 'Entrepreneurs des services & distribution', 'Développeurs de solutions e-commerce', 'Acteurs de la logistique & livraison'],
    themes: [
      'Livre IV du Code du Numérique : les 9 obligations légales pour l\'e-commerçant',
      'Opportunités de marché : alimentation locale, mode & artisanat, services numériques',
      'Paiement & logistique : D-Money, passerelles internationales, livraison dernier km',
      'Lancer sa boutique en 30 jours : Shopify vs WooCommerce vs plateforme locale',
      'Conquérir le marché régional : le potentiel éthiopien (120M habitants) et la Corne de l\'Afrique',
    ],
    intervenants: [
      { role: 'Modérateur', nom: 'Expert E-Commerce' },
      { role: 'Témoignage', nom: 'Entrepreneur E-Commerce LIMO' },
      { role: 'Intervenant', nom: 'Représentant D-Money / FinTech' },
      { role: 'Intervenant', nom: 'Juriste — Code du Numérique' },
    ],
    color: '#8B5CF6',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    dotColor: 'bg-violet-500',
    tags: ['E-Commerce', 'Marché régional', 'D-Money', 'Code Numérique'],
  },
  {
    id: 'p6',
    numero: 'Panel 6',
    titre: 'Le Cloud au Service des Entreprises',
    soustitre: 'Réduire les coûts, gagner en agilité et accélérer la croissance',
    description: 'Le cloud computing est aujourd\'hui accessible aux PME et micro-entreprises djiboutiennes. En s\'appuyant sur des infrastructures mondiales, elles peuvent bénéficier de technologies de pointe sans coûts prohibitifs. Ce panel démontre concrètement comment le cloud peut transformer l\'économie des entreprises djiboutiennes.',
    contexte: 'Réduction des coûts IT de 30 à 60% (étude Gartner) · Accès aux technologies IA & big data · Conformité avec le Code du Numérique djiboutien',
    date: 'Mardi 31 Mars',
    horaire: '14h30 – 15h30',
    duree: '75 min — Table ronde + démo live',
    jour: 'Jour 3',
    publics: ['Dirigeants PME & responsables IT', 'Startups optimisant leur infrastructure', 'Directeurs financiers sensibles aux coûts IT', 'Prestataires IT & intégrateurs'],
    themes: [
      'Cloud 101 : SaaS, PaaS, IaaS — quelle solution pour quel besoin',
      'ROI financier : comparatif serveur physique vs cloud sur 3 ans, modèle pay-as-you-go',
      'Souveraineté des données : Code du Numérique et hébergement des données à l\'étranger',
      'Sécurité dans le cloud : mythes, responsabilité partagée et bonnes pratiques',
      'Migration réussie : les 5 étapes et les erreurs courantes à éviter',
    ],
    intervenants: [
      { role: 'Modérateur', nom: 'Expert Cloud' },
      { role: 'Intervenant', nom: 'Direction Cybersécurité' },
      { role: 'Intervenant', nom: 'Djibouti Telecom' },
      { role: 'Témoignage', nom: 'PME djiboutienne ayant migré vers le cloud' },
    ],
    color: '#06B6D4',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    dotColor: 'bg-cyan-500',
    tags: ['Cloud', 'Infrastructure', 'Coûts IT', 'Agilité'],
  },
  {
    id: 'p7',
    numero: 'Panel 7',
    titre: 'Services de Confiance Numérique',
    soustitre: 'Signature électronique, horodatage, recommandé électronique — quelles opportunités pour les MSMEs ?',
    description: 'Les services de confiance numérique — signature électronique, horodatage, recommandé électronique — ouvrent de nouvelles opportunités pour les MSMEs dans l\'économie numérique. Ce panel explore le cadre légal et les usages concrets pour les entreprises djiboutiennes.',
    contexte: 'Dématérialisation des actes juridiques et commerciaux · Renforcement de la confiance dans les transactions numériques · Conformité avec le Code du Numérique',
    date: 'Mercredi 1er Avril',
    horaire: '09h00 – 10h30',
    duree: '90 min — Table ronde ouverte',
    jour: 'Jour 4',
    publics: ['Juristes d\'entreprise', 'Dirigeants PME & entrepreneurs', 'Notaires & professionnels du droit', 'Prestataires de solutions numériques'],
    themes: [
      'La valeur juridique de la signature électronique selon le Code du Numérique',
      'Horodatage et recommandé électronique : usages pratiques pour les entreprises',
      'Certification et authentification : les solutions disponibles à Djibouti',
      'Dématérialisation des contrats et actes commerciaux : comment s\'y préparer',
      'Cas d\'usage concrets : contrats de travail, bons de commande, factures électroniques',
    ],
    intervenants: [
      { role: 'Modérateur', nom: 'Expert Droit Numérique' },
      { role: 'Intervenant', nom: 'Autorité Numérique de Djibouti' },
      { role: 'Intervenant', nom: 'Juriste spécialisé' },
      { role: 'Intervenant', nom: 'Entreprise Tech — solutions de confiance' },
    ],
    color: '#EC4899',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    dotColor: 'bg-pink-500',
    tags: ['Signature électronique', 'Confiance numérique', 'Juridique'],
  },
  {
    id: 'p9',
    numero: 'Panel 9',
    titre: 'Protection des Données & Cybersécurité',
    soustitre: 'Comprendre, protéger, prévenir — Le nouveau cadre légal djiboutien et les bonnes pratiques',
    description: 'L\'adoption du Code du Numérique djiboutien (30 novembre 2025) et la création de l\'Autorité Nationale de Cybersécurité marquent un tournant historique. Les entreprises sont soumises à des obligations précises : notifier les violations en 72h, sécuriser les systèmes d\'information, désigner un DPD. La non-conformité expose les dirigeants à des poursuites pénales personnelles.',
    contexte: 'Cyberattaques contre les entreprises africaines +239% entre 2021 et 2023 · 14 infractions pénales liées aux données personnelles · Djibouti futur hub numérique régional',
    date: 'Mercredi 1er Avril',
    horaire: '10h30 – 11h30',
    duree: '90 min — Table ronde + simulation flash',
    jour: 'Jour 4',
    publics: ['Dirigeants & responsables IT (DSI, RSSI)', 'Juristes & responsables conformité', 'Entrepreneurs en phase de lancement', 'Prestataires IT & consultants sécurité'],
    themes: [
      'Code du Numérique — Livres I & VI : les 14 infractions pénales et obligation de notification en 72h',
      'Panorama des cybermenaces : ransomware, phishing, fraude au virement (BEC), fuites de données',
      '10 mesures de cybersécurité pratiques à budget limité pour les PME',
      'Protection des données personnelles : cartographie, bases légales, politique de confidentialité',
      'En cas d\'incident : procédure d\'urgence, dépôt de plainte au Parquet, communication de crise',
    ],
    intervenants: [
      { role: 'Modérateur', nom: 'Spécialiste Cybersécurité' },
      { role: 'Intervenant', nom: 'Expert juridique — Code du Numérique' },
      { role: 'Intervenant', nom: 'Expert Cybersécurité — menaces PME' },
      { role: 'Témoignage', nom: 'Dirigeant ayant vécu un incident cyber' },
      { role: 'Intervenant', nom: 'Autorité Protection des Données (CNPDCP)' },
    ],
    color: '#EF4444',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
    tags: ['Code Numérique', 'Cybersécurité', 'RGPD', 'Conformité'],
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
                      <div className={`px-5 md:px-6 pb-6 pt-3 ${panel.bgLight}`}>

                        {/* Sous-titre */}
                        <p className="text-xs italic text-gray-400 mb-3">{panel.soustitre}</p>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                          {panel.description}
                        </p>

                        {/* Contexte / enjeux */}
                        <div className="rounded-xl border border-white/70 bg-white/60 px-4 py-3 mb-5">
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: panel.color }}>
                            <Target size={11} /> Enjeux stratégiques
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">{panel.contexte}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-5">
                          {/* Thématiques */}
                          <div className="md:col-span-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <BookOpen size={12} /> Thématiques abordées
                            </p>
                            <div className="space-y-1.5">
                              {panel.themes.map((t, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${panel.dotColor}`} />
                                  <span className="text-xs text-gray-600 leading-relaxed">{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Colonne droite : intervenants + infos */}
                          <div className="space-y-4">
                            {/* Intervenants */}
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Users size={12} /> Intervenants
                              </p>
                              <div className="space-y-1.5">
                                {panel.intervenants.map((p, i) => (
                                  <div key={i} className="flex items-start gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${panel.dotColor}`} />
                                    <div>
                                      <span className="text-xs text-gray-400">{p.role} : </span>
                                      <span className="text-xs font-medium text-djibouti-navy">{p.nom}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Infos pratiques */}
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Infos pratiques
                              </p>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <Calendar size={12} style={{ color: panel.color }} />
                                  <span>{panel.date} — {panel.jour}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <Clock size={12} style={{ color: panel.color }} />
                                  <span>{panel.horaire} · {panel.duree}</span>
                                </div>
                              </div>
                            </div>

                            {/* Publics cibles */}
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Publics cibles
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {panel.publics.map((pub) => (
                                  <span key={pub} className={`text-xs px-2 py-0.5 rounded-full font-medium ${panel.bgLight} ${panel.textColor} border border-current/20`}>
                                    {pub}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {panel.tags.map((tag) => (
                            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${panel.bgLight} ${panel.textColor}`}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-4 border-t border-white/60">
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
