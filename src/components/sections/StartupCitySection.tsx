'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, Store, Users, TrendingUp, Mic,
  ArrowRight, MapPin, Clock, X, ChevronRight,
  Trophy, Flame, Handshake, Globe,
  CheckCircle2,
} from 'lucide-react'

const QUARTIERS = [
  {
    id: 'idea',
    code: '01',
    icon: Lightbulb,
    nom: 'Idea District',
    soustitre: 'Quartier de l\'innovation — là où naissent les idées',
    description:
      'Le point de départ de toute aventure entrepreneuriale. Des startups innovantes présentent leurs projets technologiques en démonstration live, montrant que l\'innovation existe et se développe à Djibouti.',
    details: [
      'Startups innovantes et projets technologiques en démonstration live',
      'Solutions locales à fort potentiel de disruption présentées au public',
      'Rencontres avec les fondateurs de startups djiboutiennes',
      'Objectif : montrer que l\'innovation locale est une réalité',
    ],
    color: '#F5A623',
    gradient: 'from-amber-500/20 to-amber-500/5',
    tags: ['Startups', 'Innovation', 'Tech', 'Démo live'],
  },
  {
    id: 'street',
    code: '02',
    icon: Store,
    nom: 'Entrepreneurs Street',
    soustitre: 'Quartier des entrepreneurs — la rue commerçante de la ville',
    description:
      'La vitrine de la diversité et de la vitalité économique nationale. PME et TPE locales exposent leurs produits et services dans une ambiance de rue commerçante vivante et accessible à tous.',
    details: [
      'PME et TPE locales exposant leurs produits et services',
      'Secteurs représentés : commerce, artisanat, services, numérique, tourisme, industrie légère',
      'Possibilité d\'achats et de commandes sur place',
      'Vitrine de la diversité économique djiboutienne',
    ],
    color: '#009A44',
    gradient: 'from-green-500/20 to-green-500/5',
    tags: ['PME', 'TPE', 'Exposants', 'Produits locaux'],
  },
  {
    id: 'support',
    code: '03',
    icon: Users,
    nom: 'Support Hub',
    soustitre: 'Quartier de l\'accompagnement — le moteur de la ville',
    description:
      'Le CLE au cœur de la ville, jouant son rôle de catalyseur de talents. Un espace dédié aux programmes d\'accompagnement, aux institutions publiques et aux dispositifs d\'appui aux entrepreneurs.',
    details: [
      'Présentation des programmes d\'accompagnement CLE Growth & Startup Djibouti',
      'Espace d\'information sur les dispositifs d\'appui aux entrepreneurs',
      'Inscription en direct aux programmes de mentorat et d\'incubation',
      'Pool d\'experts disponibles pour des consultations flash de 20 minutes',
    ],
    color: '#8B5CF6',
    gradient: 'from-violet-500/20 to-violet-500/5',
    tags: ['CLE', 'Accompagnement', 'Mentorat', 'Incubation'],
  },
  {
    id: 'investment',
    code: '04',
    icon: TrendingUp,
    nom: 'Investment Square',
    soustitre: 'Place du financement — la place centrale de la ville',
    description:
      'La place centrale où se nouent les deals. Des rencontres structurées entre entrepreneurs et investisseurs, avec des sessions de networking ciblées pour créer des connexions concrètes et durables.',
    details: [
      'Rencontres structurées entre entrepreneurs et investisseurs',
      'Discussions sur les mécanismes de financement disponibles à Djibouti',
      'Sessions de speed networking ciblées pour créer des connexions concrètes',
      'Présence des banques, fonds d\'investissement et business angels',
    ],
    color: '#06B6D4',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    tags: ['Investisseurs', 'Financement', 'Banques', 'Networking'],
  },
  {
    id: 'stage',
    code: '05',
    icon: Mic,
    nom: 'Boost Stage',
    soustitre: 'La scène centrale — le cœur battant de la ville',
    description:
      'La scène principale où l\'énergie entrepreneuriale est à son maximum. Pitchs, témoignages inspirants, mini-panels et interviews live se succèdent tout au long des 4 jours du forum.',
    details: [
      'Pitchs de startups devant jury et public — format 5 min + Q&A',
      'Témoignages d\'entrepreneurs et success stories inspirantes',
      'Mini-panels thématiques et interviews live',
      'Cérémonie des Awards — Meilleure MSME, Meilleur Pitch, Innovation Numérique',
    ],
    color: '#EC4899',
    gradient: 'from-pink-500/20 to-pink-500/5',
    tags: ['Pitchs', 'Awards', 'Scène', 'Live'],
  },
]

const PARCOURS = [
  { num: '1', label: 'Découvrir une idée innovante',            icon: Lightbulb },
  { num: '2', label: 'Comprendre comment créer une entreprise', icon: Store },
  { num: '3', label: 'Rencontrer des entrepreneurs',            icon: Users },
  { num: '4', label: 'Explorer les opportunités de financement',icon: TrendingUp },
  { num: '5', label: 'S\'inspirer des success stories',         icon: Trophy },
]

const STATS = [
  { value: '5', label: 'Quartiers thématiques', icon: MapPin },
  { value: '4', label: 'Jours d\'immersion', icon: Clock },
  { value: '120+', label: 'Entreprises exposantes', icon: Store },
  { value: '500+', label: 'Participants attendus', icon: Users },
]

export default function StartupCitySection() {
  const [selected, setSelected] = useState<string | null>(null)
  const activeQ = QUARTIERS.find((q) => q.id === selected) ?? null

  return (
    <section
      id="startup-city"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #071514 0%, #0d2321 40%, #071a19 70%, #050f0e 100%)' }}
    >
      {/* ── Orbes lumineux ── */}
      <div className="absolute top-[-80px] left-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,112,107,0.22) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-[-60px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(40,188,183,0.14) 0%, transparent 70%)' }} />
      <div className="absolute top-[35%] left-[55%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,112,107,0.10) 0%, transparent 70%)' }} />

      {/* ── Grille dot très subtile ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #28BCB7 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* ── Ligne déco diagonale ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #28BCB7 0px, #28BCB7 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
              Au cœur du Forum
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Startup &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-gold to-djibouti-green">
              MSMEs City
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Une expérience immersive qui recrée une mini-ville entrepreneuriale — de l&apos;idée à l&apos;impact,
            en passant par l&apos;accompagnement, la création et le financement.
          </p>

          {/* Conviction fondatrice */}
          <div className="inline-flex items-start gap-3 rounded-2xl px-5 py-3 text-left max-w-xl mx-auto"
            style={{ background: 'rgba(40,188,183,0.10)', border: '1px solid rgba(40,188,183,0.28)' }}>
            <Lightbulb size={16} className="text-djibouti-gold shrink-0 mt-0.5" style={{ color: '#28BCB7' }} />
            <p className="text-white/85 text-xs leading-relaxed">
              <span className="font-bold" style={{ color: '#28BCB7' }}>Conviction fondatrice :</span>{' '}
              Le succès entrepreneurial repose sur l&apos;accompagnement structuré avant l&apos;accès au financement.
              Le CLE constitue le cœur de cette ville.
            </p>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,112,107,0.18) 0%, rgba(40,188,183,0.06) 100%)',
                  border: '1px solid rgba(40,188,183,0.18)',
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(40,188,183,0.15)' }}>
                  <Icon size={16} className="text-djibouti-gold" />
                </div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            )
          })}
        </motion.div>

        {/* ── Parcours visiteur ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-8 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(14,112,107,0.12) 0%, rgba(40,188,183,0.05) 100%)',
            border: '1px solid rgba(40,188,183,0.18)',
          }}
        >
          <p className="text-djibouti-gold text-xs font-semibold uppercase tracking-widest mb-8 text-center">
            Parcours visiteur — L&apos;aventure entrepreneuriale de bout en bout
          </p>
          <div className="relative flex flex-col md:flex-row justify-center items-start md:items-start gap-6 md:gap-0">
            {/* Ligne de connexion desktop */}
            <div
              className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(40,188,183,0.3), rgba(40,188,183,0.3), rgba(40,188,183,0.3), transparent)' }}
            />
            {PARCOURS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="flex md:flex-col items-center md:items-center gap-4 md:gap-0 md:flex-1 md:px-2 relative">
                  {/* Bulle icône */}
                  <div
                    className="relative shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center z-10 mb-0 md:mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #0E706B, #28BCB7)',
                      boxShadow: '0 0 0 3px rgba(40,188,183,0.15), 0 4px 12px rgba(14,112,107,0.35)',
                    }}
                  >
                    <Icon size={16} className="text-white" />
                    <span
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                      style={{ background: '#0a1f1e', border: '1px solid rgba(40,188,183,0.4)' }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <p className="text-white/65 text-xs leading-snug md:text-center" style={{ maxWidth: '90px' }}>
                    {step.label}
                  </p>
                  {/* Flèche mobile */}
                  {i < PARCOURS.length - 1 && (
                    <ChevronRight size={14} className="text-white/20 shrink-0 md:hidden ml-auto" />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Grille des 5 quartiers ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          {QUARTIERS.map((q, index) => {
            const Icon = q.icon
            return (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                onClick={() => setSelected(selected === q.id ? null : q.id)}
                className="group relative text-left rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
                style={{
                  background: selected === q.id
                    ? `linear-gradient(145deg, ${q.color}22, rgba(7,21,20,0.95))`
                    : 'linear-gradient(145deg, rgba(14,112,107,0.10), rgba(7,21,20,0.85))',
                  border: `1px solid ${selected === q.id ? q.color + '55' : 'rgba(40,188,183,0.14)'}`,
                  boxShadow: selected === q.id ? `0 0 24px -4px ${q.color}30` : 'none',
                  minHeight: '220px',
                }}
              >
                {/* Numéro watermark */}
                <span
                  className="absolute -bottom-3 -right-1 text-[64px] font-heading font-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                  style={{ color: `${q.color}12` }}
                >
                  {q.code}
                </span>

                {/* Icône */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
                  style={{ background: `${q.color}20` }}>
                  <Icon size={20} style={{ color: q.color }} />
                </div>

                {/* Nom quartier */}
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: q.color }}>
                  {q.nom}
                </p>
                <p className="text-white font-heading font-semibold text-sm leading-snug mb-2">
                  {q.soustitre.split(' — ')[1] ?? q.soustitre}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {q.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: `${q.color}18`, color: q.color }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA hint */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: q.color }}
                >
                  Découvrir <ChevronRight size={12} />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* ── Panneau détail ── */}
        <AnimatePresence mode="wait">
          {activeQ && (
            <motion.div
              key={activeQ.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6 md:p-8 mb-10"
              style={{
                background: `linear-gradient(135deg, ${activeQ.color}18 0%, rgba(7,21,20,0.95) 60%)`,
                border: `1px solid ${activeQ.color}35`,
                boxShadow: `0 0 40px -8px ${activeQ.color}25`,
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${activeQ.color}25`, color: activeQ.color }}>
                      Quartier {activeQ.code}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
                    {activeQ.nom}
                  </h3>
                  <p className="text-sm italic" style={{ color: `${activeQ.color}aa` }}>
                    {activeQ.soustitre}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">{activeQ.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* Au programme */}
                <div className="rounded-xl p-4"
                  style={{ background: `${activeQ.color}10`, border: `1px solid ${activeQ.color}20` }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: activeQ.color }}>
                    Au programme
                  </p>
                  <ul className="space-y-2">
                    {activeQ.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: activeQ.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags + CTA */}
                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                      Thématiques
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeQ.tags.map((tag) => (
                        <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background: `${activeQ.color}18`, color: activeQ.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#inscription"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelected(null)
                      setTimeout(() => document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' }), 150)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 self-start"
                    style={{ background: `linear-gradient(135deg, ${activeQ.color}, ${activeQ.color}bb)` }}
                  >
                    Réserver ma place <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Impact attendu ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14"
        >
          {[
            { icon: Trophy,    color: '#F5A623', titre: 'Valoriser les talents',       desc: 'Donner de la visibilité aux startups et PME locales' },
            { icon: Flame,     color: '#EC4899', titre: 'Renforcer la culture',        desc: 'Ancrer l\'esprit entrepreneurial dans la jeunesse' },
            { icon: Handshake, color: '#0E706B', titre: 'Générer des opportunités',    desc: 'Faciliter des partenariats et des investissements concrets' },
            { icon: Globe,     color: '#28BCB7', titre: 'Attirer des partenaires',     desc: 'Projeter une image positive de l\'écosystème djiboutien' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.titre}
                className="rounded-2xl p-5 text-center group"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,112,107,0.12) 0%, rgba(7,21,20,0.8) 100%)',
                  border: '1px solid rgba(40,188,183,0.14)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{item.titre}</p>
                <p className="text-white/40 text-xs leading-snug">{item.desc}</p>
              </div>
            )
          })}
        </motion.div>

        {/* ── CTA Global ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/30 text-sm mb-5">Accès gratuit · Places limitées · Badge QR requis à l&apos;entrée</p>
          <a
            href="#inscription"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary inline-flex group text-base px-8 py-4"
          >
            S&apos;inscrire au Forum
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
