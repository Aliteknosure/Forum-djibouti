'use client'

import { motion } from 'framer-motion'
import { Store, Landmark, FileCheck, ShoppingCart, Users, Handshake } from 'lucide-react'

const THEMES = [
  {
    icon: Store,
    title: 'Entrepreneuriat de Quartier',
    description: "Mettre en lumière le potentiel économique des quartiers populaires de Balbala et des cinq régions de l'intérieur comme viviers d'entrepreneurs.",
    color: '#1A3C6E',
  },
  {
    icon: Landmark,
    title: 'Inclusion Financière',
    description: 'Lever le plafond de verre financier : comment connecter les micro-entrepreneurs aux institutions bancaires et aux mécanismes de microfinance (CPEC).',
    color: '#009A44',
  },
  {
    icon: FileCheck,
    title: 'Formalisation & Guichet Unique',
    description: 'Simplifier les démarches administratives (immatriculation, CNSS, fiscalité) grâce à la Caravane G2B Mobile présente sur place lors du Forum.',
    color: '#F5A623',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Marchés Numériques',
    description: "Briser l'isolement commercial : intégrer les MSMEs des régions aux plateformes d'e-commerce locales pour ouvrir les marchés nationaux.",
    color: '#1A3C6E',
  },
  {
    icon: Users,
    title: 'Femmes & Jeunes Entrepreneurs',
    description: "Transformer des profils vulnérables en acteurs économiques : 50% de femmes et 30% de jeunes non-diplômés au cœur de la cible du programme EDQ.",
    color: '#009A44',
  },
  {
    icon: Handshake,
    title: 'Partenariats Public-Privé',
    description: "La synergie entre le MDENI, le CLE, les associations relais et les partenaires financiers comme modèle d'impact durable.",
    color: '#F5A623',
  },
]

export default function ThematiquesSection() {
  return (
    <section id="thematiques" className="py-12 md:py-12 bg-slate-50 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/80 to-transparent" />
        <div className="absolute -left-24 top-40 w-96 h-96 bg-djibouti-navy/5 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-20 w-80 h-80 bg-djibouti-green/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
              Thématiques
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-djibouti-navy mb-6">
            Les Axes Stratégiques du Forum
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Des panels de haut niveau ancrés dans les réalités de terrain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {THEMES.map((theme, index) => {
            const Icon = theme.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-djibouti-green/20 hover:shadow-xl hover:shadow-djibouti-navy/5 transition-all duration-500 ease-out relative overflow-hidden"
              >
                {/* Decorative hover gradient background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                  style={{ background: `radial-gradient(circle at top right, ${theme.color}08, transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out"
                      style={{ backgroundColor: `${theme.color}15` }}
                    >
                      <Icon
                        size={28}
                        style={{ color: theme.color }}
                        className="group-hover:rotate-6 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-djibouti-navy leading-tight group-hover:text-djibouti-green transition-colors duration-300">
                      {theme.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                    {theme.description}
                  </p>

                  {/* Decorative bottom bar */}
                  <div className="w-12 h-1 bg-gray-200 rounded-full group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-djibouti-green group-hover:to-djibouti-gold transition-all duration-700 ease-out mt-auto" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
