'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const PARAGRAPHS = [
  "Je vous souhaite la bienvenue à la première édition du Forum BOOST Entrepreneurship, un rendez-vous dédié à la promotion de l'innovation, de l'entrepreneuriat et de la transformation économique.",
  "À travers ce forum, le gouvernement affirme sa volonté de placer l'entrepreneuriat, les startups et les petites et moyennes entreprises au cœur de sa stratégie de développement. Dans un monde marqué par des mutations technologiques rapides et de nouvelles opportunités économiques, il est essentiel de créer des espaces de dialogue, de collaboration et de mise en réseau entre les entrepreneurs, les investisseurs, les institutions publiques et les partenaires internationaux.",
  "Ce forum mettra à l'honneur les talents et les initiatives innovantes portées par les startups et les MSMEs, véritables moteurs de la création d'emplois, de la diversification économique et de la transformation numérique. À travers les panels stratégiques, les masterclass, les sessions de networking, les rencontres B2B et le Village des Startups et MSMEs, nous souhaitons offrir un espace concret où les idées peuvent se transformer en projets.",
  "J'invite toutes les forces vives de notre écosystème, ainsi que nos partenaires internationaux, à prendre part à cette initiative collective et à contribuer ensemble à bâtir l'avenir de l'entrepreneuriat à Djibouti.",
]

export default function MinisterSection() {
  return (
    <section
      id="mot-ministre"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060f1f 0%, #0a1932 40%, #0d2545 70%, #0a1932 100%)' }}
    >
      {/* ── Lignes dorées top/bottom ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-djibouti-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-djibouti-gold/40 to-transparent" />

      {/* ── Lueurs décoratives ── */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-djibouti-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-djibouti-green/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Titre ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-djibouti-gold" />
            <span className="text-djibouti-gold text-xs font-semibold uppercase tracking-[0.25em]">
              Message Officiel
            </span>
            <span className="w-8 h-px bg-djibouti-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Mot de la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-djibouti-gold via-yellow-300 to-djibouti-gold">
              Ministre
            </span>
          </h2>
        </motion.div>

        {/* ── Layout principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* ── Colonne gauche — Photo + Identité ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-28"
          >
            {/* Photo avec cadre doré */}
            <div className="relative self-center lg:self-start">
              {/* Halo doré */}
              <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-djibouti-gold via-yellow-300 to-djibouti-gold opacity-50 blur-[4px]" />
              {/* Cadre */}
              <div className="relative w-52 h-[260px] md:w-60 md:h-[300px] rounded-2xl overflow-hidden border border-djibouti-gold/30">
                <Image
                  src="/images/ministre.JPG"
                  alt="SEM Mariam Hamadou Ali — Ministre Délégué chargée de l'Économie Numérique et de l'Innovation"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Dégradé bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-djibouti-navy/50 via-transparent to-transparent" />
              </div>
              {/* Badge drapeau */}
              <div className="absolute -bottom-3 -right-3 w-11 h-11 rounded-full bg-djibouti-gold shadow-lg flex items-center justify-center text-xl border-2 border-white/10">
                🇩🇯
              </div>
            </div>

            {/* Identité */}
            <div className="text-center lg:text-left">
              <h3 className="text-white font-heading font-bold text-xl leading-tight mb-1">
                SEM Mariam Hamadou Ali
              </h3>
              <p className="text-djibouti-gold text-sm font-semibold mb-2">
                Ministre Délégué
              </p>
              <p className="text-white/45 text-xs leading-relaxed">
                chargée de l&apos;Économie Numérique<br />
                et de l&apos;Innovation<br />
                <span className="text-white/30">République de Djibouti</span>
              </p>
              {/* Tirets déco */}
              <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-8 h-0.5 bg-djibouti-gold rounded-full" />
                <div className="w-3 h-0.5 bg-djibouti-gold/40 rounded-full" />
                <div className="w-1 h-0.5 bg-djibouti-gold/20 rounded-full" />
              </div>
            </div>

            {/* Carte ministère */}
            <div
              className="w-full rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
            >
              <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Ministère</p>
              <p className="text-white/60 text-xs leading-relaxed">
                MDENI — Ministère Délégué<br />
                chargé de l&apos;Économie Numérique<br />
                et de l&apos;Innovation
              </p>
            </div>
          </motion.div>

          {/* ── Colonne droite — Discours ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            {/* Citation d'accroche */}
            <div
              className="relative rounded-2xl p-7 md:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.03))',
                border: '1px solid rgba(212,175,55,0.25)',
              }}
            >
              <Quote
                size={44}
                className="absolute top-6 left-6 opacity-15"
                style={{ color: '#d4af37' }}
              />
              <p className="relative text-white/90 text-lg md:text-xl font-light leading-relaxed italic pl-6 pt-2">
                &ldquo;Ce forum se veut une plateforme dynamique de rencontres, d&apos;échanges
                et de co-construction — un espace concret où les idées peuvent se transformer
                en projets et où les projets peuvent devenir des entreprises à fort impact.&rdquo;
              </p>
            </div>

            {/* Paragraphes du discours */}
            <div className="space-y-5">
              {PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="text-white/60 leading-relaxed text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-2 pt-8 flex items-center gap-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Mini photo ronde */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-djibouti-gold/40 shrink-0">
                <Image
                  src="/images/ministre.JPG"
                  alt="SEM Mariam Hamadou Ali"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-0.5 bg-djibouti-gold" />
                  <span className="text-djibouti-gold text-[10px] font-semibold uppercase tracking-widest">
                    Signé
                  </span>
                </div>
                <p className="text-white font-heading font-bold text-base leading-tight">
                  SEM Mariam Hamadou Ali
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Ministre Délégué — MDENI · République de Djibouti
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
