import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { PARTICIPANT_TYPE_LABELS } from '@/types/registration'
import ShareButtons from './ShareButtons'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://forum-djibouti.onrender.com'

interface Props {
  params: { token: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('first_name, last_name, participant_type, organization, status, photo_url')
    .eq('id', params.token)
    .eq('status', 'approved')
    .single()

  if (!data) {
    return { title: 'Forum BOOST 2026' }
  }

  const typeLabel = PARTICIPANT_TYPE_LABELS[data.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || data.participant_type
  const name = `${data.first_name} ${data.last_name}`
  const ogImageUrl = `${APP_URL}/api/og?name=${encodeURIComponent(name)}&type=${data.participant_type}${data.organization ? `&org=${encodeURIComponent(data.organization)}` : ''}${data.photo_url ? `&photo=${encodeURIComponent(data.photo_url)}` : ''}`
  const title = `${name} — ${typeLabel} au Forum BOOST 2026`
  const description = `${name} participe au Forum BOOST Entrepreneurship 2026 en tant que ${typeLabel}. Du 29 Mars au 1er Avril 2026 à Djibouti-Ville. #BoostEntrepreneurship`

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
    .select('id, first_name, last_name, participant_type, organization, job_title, country, photo_url')
    .eq('id', params.token)
    .eq('status', 'approved')
    .single()

  if (!data) notFound()

  const name = `${data.first_name} ${data.last_name}`
  const typeLabel = PARTICIPANT_TYPE_LABELS[data.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || data.participant_type
  const ogImageUrl = `${APP_URL}/api/og?name=${encodeURIComponent(name)}&type=${data.participant_type}${data.organization ? `&org=${encodeURIComponent(data.organization)}` : ''}${data.photo_url ? `&photo=${encodeURIComponent(data.photo_url)}` : ''}`
  const shareUrl = `${APP_URL}/share/${params.token}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-djibouti-navy to-djibouti-dark flex items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-10">
      <div className="w-full max-w-2xl">

        {/* Preview card — aperçu de l'image OG */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-4 sm:mb-8">
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
          className="rounded-xl sm:rounded-2xl px-4 py-6 sm:p-8 text-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-2">Participant officiel</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">{name}</h1>
          {data.job_title && <p className="text-white/70 text-sm sm:text-base mt-0.5">{data.job_title}</p>}
          {data.organization && <p className="text-white/50 text-xs sm:text-sm mt-0.5">{data.organization}</p>}

          <div className="mt-3 mb-5 inline-block">
            <span
              className="text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full"
              style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}
            >
              {typeLabel} · Forum BOOST 2026
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
            className="mt-5 pt-5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-xs sm:text-sm text-white/40"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span>📅 29 Mars – 1er Avril 2026</span>
            <span className="hidden sm:inline">·</span>
            <span>📍 Djibouti-Ville</span>
            <span className="hidden sm:inline">·</span>
            <span>#BoostEntrepreneurship</span>
          </div>
        </div>
      </div>
    </div>
  )
}
