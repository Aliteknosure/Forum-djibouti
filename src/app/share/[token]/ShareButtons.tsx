'use client'

import { useState } from 'react'
import { Linkedin, Twitter, Share2, Check, Copy } from 'lucide-react'

const LINKEDIN_POSTS: Record<string, string> = {
  visitor: `🚀 Je serai au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🌍 Un événement historique pour l'entrepreneuriat en Afrique de l'Est

Au programme : 120 MSMEs exposantes, panels d'experts et networking de haut niveau !

#FISDJ2026 #StartupDjibouti #SmartNation #Entrepreneuriat #Innovation`,

  press: `📰 Je couvre le Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🎙️ Un événement majeur pour l'économie djiboutienne

#FISDJ2026 #StartupDjibouti #Presse #Médias #Djibouti`,

  exposant_msme: `🏪 Mon entreprise est officiellement sélectionnée pour exposer au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🌍 Parmi les 120 MSMEs sélectionnées

Venez découvrir notre stand ! 💪

#FISDJ2026 #MSME #StartupDjibouti #MadeInDjibouti`,

  paneliste: `🎤 Je suis confirmé(e) comme panéliste au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
💡 Innovation · Financement · Transformation digitale

#FISDJ2026 #StartupDjibouti #Leadership #Conférence`,
}

interface Props {
  shareUrl: string
  ogImageUrl: string
  name: string
  typeLabel: string
  participantType: string
}

export default function ShareButtons({ shareUrl, name, typeLabel, participantType }: Props) {
  const [copied, setCopied] = useState(false)

  const linkedinText = `${LINKEDIN_POSTS[participantType] ?? LINKEDIN_POSTS.visitor}\n\n👤 ${name}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(linkedinText)}`

  const twitterText = `🚀 Je participe au Forum International des Startups de Djibouti 2026 en tant que ${typeLabel} !\n📅 23 Mars 2026 • Djibouti-Ville\n#FISDJ2026 #StartupDjibouti`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`

  const whatsappText = `🚀 Je participe au Forum International des Startups de Djibouti 2026 en tant que ${typeLabel} !\n📅 23 Mars 2026 • Djibouti-Ville\n\nVoici ma page de participation : ${shareUrl}\n\n#FISDJ2026`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} — FISDJ 2026`,
        text: `Je participe au Forum International des Startups de Djibouti 2026 en tant que ${typeLabel} !`,
        url: shareUrl,
      })
    }
  }

  const buttons = [
    {
      label: 'LinkedIn',
      href: linkedinUrl,
      bg: '#0A66C2',
      hoverBg: '#004182',
      icon: <Linkedin size={18} />,
    },
    {
      label: 'X / Twitter',
      href: twitterUrl,
      bg: '#000000',
      hoverBg: '#1a1a1a',
      icon: <Twitter size={18} />,
    },
    {
      label: 'WhatsApp',
      href: whatsappUrl,
      bg: '#25D366',
      hoverBg: '#1aad52',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-white/60 text-sm">Partagez votre participation</p>

      {/* Boutons principaux */}
      <div className="flex flex-wrap justify-center gap-3">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: btn.bg }}
          >
            {btn.icon}
            {btn.label}
          </a>
        ))}
      </div>

      {/* Ligne — Copier lien + Partager natif */}
      <div className="flex justify-center gap-3">
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: copied ? '#10B981' : 'rgba(255,255,255,0.7)',
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Lien copié !' : 'Copier le lien'}
        </button>

        {/* Bouton partage natif — mobile uniquement */}
        <button
          onClick={nativeShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 sm:hidden"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <Share2 size={15} />
          Partager
        </button>
      </div>
    </div>
  )
}
