'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Building2, MapPin, Users, Trophy } from 'lucide-react'

// AnimatedCounter — identique à la maquette
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const objectives = [
  {
    icon: Rocket,
    title: 'Lancement Opérationnel',
    description: "Le Forum marque le démarrage des feuilles de route pour 120 MSMEs déjà identifiées. Chaque entrepreneur repart avec son plan de coaching individuel.",
  },
  {
    icon: Building2,
    title: 'Signature de Conventions',
    description: "Des accords officiels seront signés entre le CLE et les institutions financières (Banques et CPEC) pour garantir un accès prioritaire au crédit pour les MSMEs accompagnées.",
  },
  {
    icon: MapPin,
    title: 'Caravane G2B Mobile',
    description: "Un guichet unique temporaire réunissant l'ODPIC, la CNSS et la Direction des Impôts permettra aux entrepreneurs de formaliser leur activité directement sur place.",
  },
]

const stats = [
  { value: 200, suffix: '+', label: 'MSMEs à transformer', icon: Users },
  { value: 120, suffix: '', label: 'Entrepreneurs', icon: Rocket },
  { value: 50, suffix: '%', label: 'Femmes bénéficiaires', icon: Trophy },
  { value: 5, suffix: '', label: 'Régions couvertes', icon: MapPin },
]

export default function AboutSection() {
  return (
    <section id="apropos" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-djibouti-green/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-djibouti-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Grid texte + image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-djibouti-green" />
              <span className="text-djibouti-green text-sm font-semibold uppercase tracking-[0.2em]">
                À PROPOS DU FORUM
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-djibouti-navy mb-8 leading-tight">
              Plus qu&apos;un Forum,{' '}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-navy to-djibouti-green">
                un Acte Fondateur
              </span>
            </h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed border-l-4 border-djibouti-green/20 pl-6">
              <p>
                Le Forum BOOST Entrepreneurship du 29 mars au 1er avril n&apos;est pas une simple conférence. C&apos;est l&apos;acte de naissance officiel du programme{' '}
                <strong className="text-djibouti-navy font-semibold">Entrepreneuriat de Quartier – Build by CLE (EDQ)</strong>, une initiative portée par le{' '}
                <strong className="text-djibouti-gold font-semibold">MDENI</strong> et le Centre de Leadership et d&apos;Entrepreneuriat (CLE).
              </p>
              <p>
                À Djibouti, les quartiers populaires de Balbala et les cinq régions de l&apos;intérieur concentrent un potentiel entrepreneurial immense, encore sous-exploité. Le Forum est le moment où ce potentiel devient visible aux yeux de la nation.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-djibouti-navy/10 overflow-hidden flex items-center justify-center">
                    <Users size={18} className="text-djibouti-navy/40" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-djibouti-navy font-bold">+500 participants</p>
                <p className="text-gray-500">attendus cette année</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 aspect-square group bg-gradient-to-br from-djibouti-navy to-djibouti-dark">
              {/* Image placeholder avec overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-djibouti-navy/80 via-transparent to-transparent opacity-90" />

              {/* Floating Badge — visible au hover */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-xl p-5 border border-white/10 backdrop-blur-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-djibouti-gold/20 flex items-center justify-center shrink-0">
                    <Trophy className="text-djibouti-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold">Un projet ambitieux</h4>
                    <p className="text-white/70 text-sm">Financé par l&apos;UE et soutenu par la Banque Mondiale</p>
                  </div>
                </div>
              </div>

              {/* Contenu visuel central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-20 h-20 rounded-2xl bg-djibouti-gold/20 flex items-center justify-center">
                  <Trophy className="text-djibouti-gold" size={40} />
                </div>
                <p className="text-white/80 text-center font-heading font-semibold text-lg">
                  Forum BOOST Entrepreneurship
                </p>
                <p className="text-djibouti-gold text-sm font-medium">29 Mars – 1er Avril 2026 · Djibouti-Ville</p>
              </div>
            </div>

            {/* Éléments décoratifs derrière l'image */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-[8px] border-djibouti-green/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-dashed border-djibouti-navy/10 rounded-2xl -z-10" />
          </motion.div>
        </div>

        {/* Objectifs — 3 cartes */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {objectives.map((objective, index) => {
            const Icon = objective.icon
            return (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-djibouti-green/30 hover:shadow-xl hover:shadow-djibouti-navy/5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Icône décorative en arrière-plan */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform translate-x-4 -translate-y-4">
                  <Icon size={120} />
                </div>

                <div className="w-14 h-14 rounded-xl bg-djibouti-navy/5 group-hover:bg-djibouti-navy transition-colors duration-300 flex items-center justify-center mb-6">
                  <Icon className="text-djibouti-navy group-hover:text-white transition-colors duration-300" size={28} />
                </div>

                <h3 className="text-xl font-heading font-bold text-djibouti-navy mb-4">
                  {objective.title}
                </h3>
                <p className="text-gray-500 leading-relaxed relative z-10">
                  {objective.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats bar */}
        <div className="bg-djibouti-navy rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Motif pointillé */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-djibouti-navy via-transparent to-djibouti-green/20 mix-blend-multiply" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Icon className="text-djibouti-green" size={24} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 tracking-tight">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-djibouti-gold text-sm md:text-base font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
