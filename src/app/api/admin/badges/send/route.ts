export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { generateBadgePDF } from '@/lib/badge-generator'
import { sendBadgeEmail } from '@/lib/resend'
import { Registration } from '@/types/registration'

const BATCH_SIZE = 10

// POST /api/admin/badges/send?offset=0&resendAll=false
// Envoie un batch de badges (pagination client-side pour éviter le timeout Vercel 30s)
// resendAll=false → badge_sent=false (nouveaux seulement)
// resendAll=true  → badge_sent=true  (renvoyer à ceux qui badge_sent=true, ex: quota dépassé)
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const resendAll = searchParams.get('resendAll') === 'true'

  // Compter le total pour calculer hasMore
  const countQuery = supabaseAdmin
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')
    .eq('badge_sent', resendAll ? true : false)

  const { count, error: countError } = await countQuery
  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 })
  }

  const total = count ?? 0

  if (total === 0) {
    return NextResponse.json({
      message: resendAll
        ? 'Aucun participant avec badge_sent=true trouvé.'
        : 'Aucun participant approuvé en attente de badge.',
      sent: 0,
      failed: 0,
      hasMore: false,
      remaining: 0,
      nextOffset: 0,
      total: 0,
    })
  }

  // Récupérer le batch
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('status', 'approved')
    .eq('badge_sent', resendAll ? true : false)
    .range(offset, offset + BATCH_SIZE - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const registrations = (data || []) as Registration[]

  let sent = 0
  let failed = 0
  const errors: { id: string; email: string; error: string }[] = []

  for (const registration of registrations) {
    try {
      const pdfBuffer = await generateBadgePDF(registration)
      await sendBadgeEmail(registration, pdfBuffer)

      await supabaseAdmin
        .from('registrations')
        .update({ badge_sent: true, badge_sent_at: new Date().toISOString() })
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

  const processedUpTo = offset + registrations.length
  const hasMore = processedUpTo < total
  const remaining = Math.max(0, total - processedUpTo)

  return NextResponse.json({
    message: `${sent} badge(s) envoyé(s)${failed > 0 ? `, ${failed} échec(s)` : ''}.`,
    sent,
    failed,
    errors: errors.length > 0 ? errors : undefined,
    hasMore,
    remaining,
    nextOffset: processedUpTo,
    total,
  })
}
