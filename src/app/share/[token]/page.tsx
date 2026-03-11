import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { PARTICIPANT_TYPE_LABELS } from '@/types/registration'
import ShareButtons from './ShareButtons'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fisdj2026.com'

interface Props {
  params: { token: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('first_name, last_name, participant_type, organization, status')
    .eq('id', params.token)
    .eq('status', 'approved')
    .single()

  if (!data) {
    return { title: 'FISDJ 2026' }
  }

  const typeLabel = PARTICIPANT_TYPE_LABELS[data.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || data.participant_type
  const name = `${data.first_name} ${data.last_name}`
  const ogImageUrl = `${APP_URL}/api/og?name=${encodeURIComponent(name)}&type=${data.participant_type}${data.organization ? `&org=${encodeURIComponent(data.organization)}` : ''}`
  const title = `${name} — ${typeLabel} au FISDJ 2026`
  const description = `${name} participe au Forum International des Startups de Djibouti 2026 en tant que ${typeLabel}. Le 23 Mars 2026 à Djibouti-Ville. #FISDJ2026`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_DJ',
      url: `${APP_URL}/share/${params.token}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function SharePage({ params }: Props) {
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('id, first_name, last_name, participant_type, organization, job_title, country')
    .eq('id', params.token)
    .eq('status', 'approved')
    .single()

  if (!data) notFound()

  const name = `${data.first_name} ${data.last_name}`
  const typeLabel = PARTICIPANT_TYPE_LABELS[data.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || data.participant_type
  const ogImageUrl = `${APP_URL}/api/og?name=${encodeURIComponent(name)}&type=${data.participant_type}${data.organization ? `&org=${encodeURIComponent(data.organization)}` : ''}`
  const shareUrl = `${APP_URL}/share/${params.token}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-djibouti-navy to-djibouti-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        {/* Preview card — aperçu de l'image OG */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogImageUrl}
            alt={`Badge de ${name}`}
            className="w-full"
            style={{ display: 'block' }}
          />
        </div>

        {/* Infos + boutons de partage */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Participant officiel</p>
          <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
          {data.job_title && <p className="text-white/70 text-base">{data.job_title}</p>}
          {data.organization && <p className="text-white/50 text-sm mt-0.5">{data.organization}</p>}

          <div className="mt-4 mb-6 inline-block">
            <span
              className="text-sm font-semibold px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}
            >
              {typeLabel} · FISDJ 2026
            </span>
          </div>

          {/* Boutons de partage (client component) */}
          <ShareButtons
            shareUrl={shareUrl}
            ogImageUrl={ogImageUrl}
            name={name}
            typeLabel={typeLabel}
            participantType={data.participant_type}
          />

          {/* Event info */}
          <div
            className="mt-6 pt-6 flex items-center justify-center gap-6 text-sm text-white/40"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span>📅 23 Mars 2026</span>
            <span>·</span>
            <span>📍 Djibouti-Ville</span>
            <span>·</span>
            <span>#FISDJ2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
