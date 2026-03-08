import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Mail, Clock, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Inscription confirmée',
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)' }}
          >
            <CheckCircle2 size={48} color="#060f1f" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
          Inscription confirmée !
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-8">
          Merci pour votre inscription au{' '}
          <strong>Forum International de Djibouti 2026</strong>.
          Vous allez recevoir un email de confirmation dans les prochaines minutes.
        </p>

        {/* Steps */}
        <div
          className="rounded-2xl p-6 mb-8 text-left"
          style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
        >
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#0a1932' }}>
            Prochaines étapes :
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: <Mail size={16} style={{ color: '#d4af37' }} />,
                title: 'Email de confirmation',
                desc: 'Vous recevrez un récapitulatif de votre inscription avec votre numéro de référence.',
              },
              {
                icon: <Clock size={16} style={{ color: '#3b82f6' }} />,
                title: 'Examen de votre dossier',
                desc: 'Notre équipe examine votre inscription sous 48h ouvrées.',
              },
              {
                icon: <CheckCircle2 size={16} style={{ color: '#10b981' }} />,
                title: 'Réception de votre badge',
                desc: 'Une fois approuvé, votre badge PDF avec QR code sera envoyé par email.',
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0a1932' }}>{step.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div
          className="rounded-xl p-4 mb-8 text-sm"
          style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', color: 'rgba(255,255,255,0.8)' }}
        >
          <p className="font-semibold mb-1" style={{ color: '#d4af37' }}>
            📅 Forum International de Djibouti
          </p>
          <p>23 mars 2026 · Djibouti-Ville</p>
          <p className="text-white/50 text-xs mt-1">
            Pour toute question : contact@forum-djibouti.dj
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="font-semibold rounded-xl"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
          >
            <Link href="/">
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold rounded-xl">
            <a href="mailto:contact@forum-djibouti.dj">Nous contacter</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
