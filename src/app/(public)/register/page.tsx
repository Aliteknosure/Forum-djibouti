import RegistrationForm from '@/components/forms/RegistrationForm'
import { Calendar, MapPin, Shield } from 'lucide-react'

export const metadata = {
  title: 'Inscription',
  description: 'Inscrivez-vous au Forum BOOST Entrepreneurship 2026.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero banner */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #020b18, #0a1932, #0d2545)' }}
      >
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
          style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          Inscriptions ouvertes
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Réservez votre place
        </h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm sm:text-base">
          Rejoignez 500+ décideurs, entrepreneurs et innovateurs au Forum BOOST Entrepreneurship 2026.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar size={15} style={{ color: '#d4af37' }} />
            29 – 31 mars 2026
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin size={15} style={{ color: '#d4af37' }} />
            Djibouti-Ville
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Shield size={15} style={{ color: '#d4af37' }} />
            Entrée avec badge QR
          </div>
        </div>
      </div>

      {/* Form container */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-2xl">
        <div
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
        >
          {/* Form header */}
          <div
            className="px-6 sm:px-8 py-6"
            style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}
          >
            <h2 className="font-bold text-lg" style={{ color: '#0a1932' }}>
              Formulaire d'inscription
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Tous les champs marqués <span className="text-red-500">*</span> sont obligatoires.
              Votre badge sera envoyé par email après approbation.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-8 py-8">
            <RegistrationForm />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">🔒 Données sécurisées</span>
          <span className="flex items-center gap-1">📧 Confirmation immédiate</span>
          <span className="flex items-center gap-1">🎫 Badge PDF personnalisé</span>
        </div>
      </div>
    </div>
  )
}
