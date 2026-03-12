'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Qui peut s\'inscrire au Forum BOOST Entrepreneurship ?',
    a: 'Le forum est ouvert aux entrepreneurs, porteurs de projets, représentants d\'institutions financières, agents de développement économique, et toute personne intéressée par l\'entrepreneuriat à Djibouti. Les 120 MSMEs sélectionnées du programme EDQ ont une participation prioritaire.',
  },
  {
    q: 'L\'inscription est-elle gratuite ?',
    a: 'Oui, l\'inscription au Forum BOOST Entrepreneurship est entièrement gratuite. Le forum est financé par l\'Union Européenne et la Banque Mondiale dans le cadre du programme Entrepreneurs de Quartier (EDQ).',
  },
  {
    q: 'Qu\'est-ce que le programme EDQ (Entrepreneurs de Quartier) ?',
    a: 'Le programme EDQ, porté par le CLE (Centre de Leadership et d\'Entrepreneuriat), accompagne les micro, petites et moyennes entreprises (MSMEs) dans 5 régions de Djibouti. Il a déjà accompagné plus de 200 MSMEs, dont 50 % dirigées par des femmes, en formation, structuration et accès au financement.',
  },
  {
    q: 'Qu\'est-ce que la Caravane G2B (Government to Business) ?',
    a: 'La Caravane G2B est un guichet unique de formalisation organisé lors du forum. Des agents du MDENI et des partenaires territoriaux (REDA, CJEO Obock, Dumar iyo Dadal, CJED) vous aident à formaliser votre entreprise sur place : dépôt de dossiers, immatriculation, informations fiscales et administratives.',
  },
  {
    q: 'Comment recevoir mon badge d\'accès au forum ?',
    a: 'Une fois votre inscription soumise et approuvée par notre équipe, vous recevrez votre badge personnalisé en PDF par email. Ce badge contient un QR code unique pour votre accès rapide à l\'entrée. Vous pouvez l\'imprimer ou le présenter sur votre téléphone.',
  },
  {
    q: 'Comment se rendre au forum ?',
    a: 'Le Forum BOOST Entrepreneurship se tient à Djibouti-Ville. L\'adresse exacte et les instructions d\'accès vous seront communiquées dans l\'email de confirmation qui accompagne votre badge. Pour tout renseignement, contactez-nous à contact@cle-djibouti.dj ou au +253 21 35 00 00.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="pt-12 pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
              Questions fréquentes
            </h2>
            <p className="text-gray-500">
              Vous ne trouvez pas la réponse ? Contactez-nous à{' '}
              <a href="mailto:contact@cle-djibouti.dj" style={{ color: '#b8960c' }}>
                contact@cle-djibouti.dj
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  border: openIndex === index ? '1px solid rgba(212,175,55,0.4)' : '1px solid #e2e8f0',
                  background: openIndex === index ? 'linear-gradient(135deg, #fffbf0, #fff)' : 'white',
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span
                    className="font-semibold text-sm sm:text-base pr-4"
                    style={{ color: '#0a1932' }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: '#b8960c',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
