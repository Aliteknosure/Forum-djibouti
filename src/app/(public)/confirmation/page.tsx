"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Clock, ArrowLeft, Calendar, MapPin } from "lucide-react";

export default function ConfirmationPage() {
  const steps = [
    {
      icon: <Mail size={18} className="text-djibouti-gold" />,
      title: "Email de confirmation",
      desc: "Vous recevrez un récapitulatif de votre inscription avec votre numéro de référence.",
      color: "from-djibouti-gold/20 to-djibouti-gold/5",
    },
    {
      icon: <Clock size={18} className="text-blue-400" />,
      title: "Examen de votre dossier",
      desc: "Notre équipe examine votre inscription sous 48h ouvrées.",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      icon: <CheckCircle2 size={18} className="text-djibouti-green" />,
      title: "Réception de votre badge",
      desc: "Une fois approuvé, votre badge PDF avec QR code sera envoyé par email.",
      color: "from-djibouti-green/20 to-djibouti-green/5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-djibouti-navy to-djibouti-dark flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.03) 20px,
            rgba(255,255,255,0.03) 40px
          )`,
        }}
      />
      {/* Glow spots */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-djibouti-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-djibouti-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        {/* Success icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-djibouti-green to-djibouti-gold flex items-center justify-center shadow-[0_0_40px_rgba(0,154,68,0.4)]">
            <CheckCircle2 size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Inscription confirmée !
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Merci pour votre inscription au{" "}
            <span className="text-djibouti-gold font-semibold">Forum BOOST Entrepreneurship 2026</span>.
            Vous allez recevoir un email de confirmation dans les prochaines minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="glass-dark rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-heading font-semibold text-white text-sm mb-5">
            Prochaines étapes :
          </h3>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{step.title}</p>
                  <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event info box */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={16} className="text-djibouti-gold" />
            <span className="font-heading font-semibold text-white text-sm">Forum BOOST Entrepreneurship</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-sm mb-1">
            <Calendar size={14} className="text-white/30" />
            <span>29 – 31 mars 2026</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <MapPin size={14} className="text-white/30" />
            <span>Djibouti-Ville, République de Djibouti</span>
          </div>
          <p className="text-white/30 text-xs mt-3 border-t border-white/10 pt-3">
            Pour toute question : djibouti.numerique@gmail.com
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl"
          >
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
          <a
            href="mailto:djibouti.numerique@gmail.com"
            className="btn-secondary flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>
    </div>
  );
}
