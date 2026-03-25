'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Calendar, Clock, ArrowRight, Target, BookOpen, X, ChevronRight } from 'lucide-react'

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
    date: 'Mardi 31 Mars',
    horaire: '09h00 – 10h30',
    duree: '90 min — Table ronde ouverte',
    jour: 'Jour 3',
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
    date: 'Mardi 31 Mars',
    horaire: '10h30 – 11h30',
    duree: '90 min — Table ronde + simulation flash',
    jour: 'Jour 3',
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
  const [selected, setSelected] = useState<string | null>(null)
  const activePanel = PANELS.find((p) => p.id === selected) ?? null

  return (
    <section id="panel" className="py-24 md:py-32 bg-gradient-to-b from-[#071a12] to-[#0a2118] relative overflow-hidden">
      {/* Bordure top décorative — sépare visuellement du Programme */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-djibouti-green to-transparent" />
      {/* Déco bg */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-djibouti-green/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-djibouti-gold/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs md:text-sm font-bold uppercase tracking-[0.25em] bg-djibouti-gold/15 px-4 py-1.5 rounded-full border border-djibouti-gold/40">
              Panels Thématiques
            </span>
            <span className="w-10 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Débats &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-green to-white">
              Tables Rondes
            </span>
          </h2>
          <p className="text-white/50 text-base max-w-2xl mx-auto">
            7 panels thématiques sur 3 jours — experts, entrepreneurs et décideurs débattent des grands enjeux
            du numérique et de l'entrepreneuriat à Djibouti.
          </p>
        </motion.div>

        {/* Grille de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PANELS.map((panel, index) => (
            <motion.button
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              onClick={() => setSelected(panel.id)}
              className="group relative text-left rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
              style={{ minHeight: '280px' }}
            >
              {/* Fond coloré avec dégradé */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(145deg, ${panel.color}22 0%, ${panel.color}08 100%)`,
                  border: `1px solid ${panel.color}30`,
                  borderRadius: '16px',
                }}
              />
              {/* Barre de couleur haut */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: panel.color }} />

              {/* Numéro géant en watermark */}
              <div
                className="absolute -bottom-4 -right-2 text-[80px] font-black leading-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                style={{ color: `${panel.color}18` }}
              >
                {panel.numero.replace('Panel ', 'P')}
              </div>

              <div className="relative z-10 p-5 flex flex-col h-full" style={{ minHeight: '280px' }}>
                {/* Header card */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${panel.color}20`, color: panel.color }}
                  >
                    {panel.numero}
                  </span>
                  <span className="text-xs text-white/40 flex items-center gap-1 shrink-0">
                    <Calendar size={10} /> {panel.jour}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-white font-bold text-sm md:text-base leading-snug mb-2 flex-1">
                  {panel.titre}
                </h3>

                {/* Sous-titre */}
                <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
                  {panel.soustitre}
                </p>

                {/* Footer card */}
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Clock size={11} style={{ color: panel.color }} />
                    <span>{panel.date} · {panel.horaire}</span>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {panel.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${panel.color}18`, color: panel.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* CTA hint */}
                  <div
                    className="flex items-center gap-1 text-xs font-semibold mt-1 opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: panel.color }}
                  >
                    Voir le détail <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/30 text-sm mb-4">Siège réservé · Inscription gratuite · Places limitées</p>
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

      {/* ── Modal détail ── */}
      <AnimatePresence>
        {activePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Panel modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-4 md:inset-[5%] lg:inset-x-[15%] lg:inset-y-[5%] z-50 overflow-hidden rounded-3xl flex flex-col"
              style={{ background: '#0d1b2e', border: `1px solid ${activePanel.color}30` }}
            >
              {/* Barre couleur */}
              <div className="h-1.5 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${activePanel.color}, ${activePanel.color}66)` }} />

              {/* Scroll container */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8">

                {/* Header modal */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${activePanel.color}25`, color: activePanel.color }}>
                        {activePanel.numero}
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1.5">
                        <Calendar size={11} /> {activePanel.date} — {activePanel.jour}
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1.5">
                        <Clock size={11} /> {activePanel.horaire}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight mb-1">
                      {activePanel.titre}
                    </h3>
                    <p className="text-sm italic" style={{ color: `${activePanel.color}bb` }}>
                      {activePanel.soustitre}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="shrink-0 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {activePanel.description}
                </p>

                {/* Enjeux stratégiques */}
                <div className="rounded-2xl p-4 mb-6" style={{ background: `${activePanel.color}12`, border: `1px solid ${activePanel.color}25` }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: activePanel.color }}>
                    <Target size={12} /> Enjeux stratégiques
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{activePanel.contexte}</p>
                </div>

                {/* Grille 2 colonnes */}
                <div className="grid md:grid-cols-5 gap-6 mb-6">

                  {/* Thématiques — large */}
                  <div className="md:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                      <BookOpen size={12} /> Thématiques abordées
                    </p>
                    <div className="space-y-3">
                      {activePanel.themes.map((t, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                            style={{ background: `${activePanel.color}30`, color: activePanel.color }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-white/70 text-sm leading-relaxed">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colonne droite */}
                  <div className="md:col-span-2 space-y-5">

                    {/* Intervenants */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                        <Users size={12} /> Intervenants
                      </p>
                      <div className="space-y-2">
                        {activePanel.intervenants.map((p, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: `${activePanel.color}10` }}>
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: activePanel.color }} />
                            <div className="min-w-0">
                              <span className="text-xs" style={{ color: `${activePanel.color}99` }}>{p.role} · </span>
                              <span className="text-xs font-semibold text-white">{p.nom}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Format */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                        Format
                      </p>
                      <div className="rounded-xl px-3 py-2.5" style={{ background: `${activePanel.color}10` }}>
                        <p className="text-xs text-white/70">{activePanel.duree}</p>
                      </div>
                    </div>

                    {/* Publics cibles */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                        Publics cibles
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activePanel.publics.map((pub) => (
                          <span
                            key={pub}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{ background: `${activePanel.color}15`, color: `${activePanel.color}cc` }}
                          >
                            {pub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {activePanel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: `${activePanel.color}20`, color: activePanel.color }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: `${activePanel.color}20` }}>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    ← Retour aux panels
                  </button>
                  <a
                    href="#inscription"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelected(null)
                      setTimeout(() => document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' }), 150)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: `linear-gradient(135deg, ${activePanel.color}, ${activePanel.color}cc)` }}
                  >
                    Réserver ma place
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
