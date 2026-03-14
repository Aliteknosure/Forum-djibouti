export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { generateBadgePDF } from '@/lib/badge-generator'
import { sendBadgeEmail } from '@/lib/resend'
import { generateQRCodeDataURL } from '@/lib/qrcode'
import { Registration } from '@/types/registration'

// POST /api/admin/badges/send
// Envoie les badges à tous les participants approuvés qui n'ont pas encore reçu leur badge
export async function POST(_req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  // Récupérer tous les approuvés sans badge envoyé
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('status', 'approved')
    .eq('badge_sent', false)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const registrations = (data || []) as Registration[]

  if (registrations.length === 0) {
    return NextResponse.json({
      message: 'Aucun participant approuvé en attente de badge.',
      sent: 0,
      failed: 0,
    })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://forum-djibouti.onrender.com'
  let sent = 0
  let failed = 0
  const errors: { id: string; email: string; error: string }[] = []

  for (const registration of registrations) {
    try {
      const pdfBuffer = await generateBadgePDF(registration)
      const qrDataUrl = await generateQRCodeDataURL(`${appUrl}/checkin?id=${registration.id}`)

      await sendBadgeEmail(registration, pdfBuffer, qrDataUrl)

      await supabaseAdmin
        .from('registrations')
        .update({ badge_sent: true })
        .eq('id', registration.id)

      sent++
    } catch (err) {
      failed++
      errors.push({
        id: registration.id,
        email: registration.email,
        error: err instanceof Error ? err.message : 'Erreur inconnue',
      })
      console.error(`[BADGE_BULK_ERROR] ${registration.email}:`, err)
    }
  }

  return NextResponse.json({
    message: `${sent} badge(s) envoyé(s)${failed > 0 ? `, ${failed} échec(s)` : ''}.`,
    sent,
    failed,
    errors: errors.length > 0 ? errors : undefined,
  })
}
