export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { generateBadgePDF } from '@/lib/badge-generator'
import { sendBadgeEmail, sendRejectionEmail } from '@/lib/resend'
import { Registration } from '@/types/registration'

type Params = { params: { id: string } }

// ──────────────────────────────────────────────────────────────
// GET /api/admin/registrations/[id]
// ──────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 })
  }

  return NextResponse.json({ data: data as Registration })
}

// ──────────────────────────────────────────────────────────────
// PATCH /api/admin/registrations/[id]
// body: { action: 'approve' | 'reject' | 'send_badge' }
// ──────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { action } = body

  if (!['approve', 'reject', 'send_badge', 'update', 'reset_to_pending'].includes(action)) {
    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  }

  // Récupérer l'inscription
  const id = params.id
  console.log('[PATCH] id reçu:', id)

  // Diagnostic : compter toutes les lignes visibles par supabaseAdmin
  const { count } = await supabaseAdmin
    .from('registrations')
    .select('*', { count: 'exact', head: true })
  console.log('[PATCH] total rows visibles par supabaseAdmin:', count)

  // .maybeSingle() évite l'erreur PGRST116 quand 0 résultats
  const { data: reg, error: fetchError } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  console.log('[PATCH] reg:', reg ? reg.id : 'null', '| fetchError:', fetchError)

  if (fetchError) {
    return NextResponse.json(
      { error: 'Erreur base de données', detail: fetchError.message, id },
      { status: 500 }
    )
  }

  if (!reg) {
    // Afficher quelques IDs existants pour debug
    const { data: sample } = await supabaseAdmin
      .from('registrations').select('id, email, status').limit(3)
    console.log('[PATCH] Exemples IDs en base:', sample)
    return NextResponse.json(
      { error: 'Inscription introuvable', id },
      { status: 404 }
    )
  }

  const registration = reg as Registration

  // ── Modifier les infos ─────────────────────────────────────
  if (action === 'update') {
    const { first_name, last_name, email, phone, organization, job_title, country } = body
    const updates: Record<string, string> = {}
    if (first_name !== undefined) updates.first_name = first_name.trim()
    if (last_name !== undefined) updates.last_name = last_name.trim()
    if (email !== undefined) updates.email = email.trim().toLowerCase()
    if (phone !== undefined) updates.phone = phone.trim()
    if (organization !== undefined) updates.organization = organization.trim()
    if (job_title !== undefined) updates.job_title = job_title.trim()
    if (country !== undefined) updates.country = country.trim()

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à modifier' }, { status: 400 })
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('registrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Inscription mise à jour avec succès.',
      registration: updated,
    })
  }

  // ── Approuver ──────────────────────────────────────────────
  if (action === 'approve') {
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({ status: 'approved' })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Générer et envoyer le badge
    try {
      const pdfBuffer = await generateBadgePDF(updated as Registration)
      await sendBadgeEmail(updated as Registration, pdfBuffer)

      // Marquer badge_sent = true
      const { data: final, error: badgeError } = await supabaseAdmin
        .from('registrations')
        .update({ badge_sent: true })
        .eq('id', id)
        .select()
        .single()

      if (badgeError) {
        return NextResponse.json({ error: badgeError.message }, { status: 500 })
      }

      return NextResponse.json({
        message: 'Inscription approuvée et badge envoyé avec succès.',
        registration: final,
      })
    } catch (emailError) {
      console.error('[BADGE_EMAIL_ERROR]', emailError)
      return NextResponse.json({
        message: "Inscription approuvée, mais l'envoi du badge a échoué.",
        registration: updated,
        emailError: emailError instanceof Error ? emailError.message : 'Erreur email',
      })
    }
  }

  // ── Rejeter ────────────────────────────────────────────────
  if (action === 'reject') {
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Envoyer email de rejet à l'utilisateur
    try {
      await sendRejectionEmail({
        first_name: registration.first_name,
        last_name: registration.last_name,
        email: registration.email,
      })
    } catch (emailError) {
      console.error('[REJECTION_EMAIL_ERROR]', emailError)
    }

    return NextResponse.json({
      message: 'Inscription rejetée.',
      registration: updated,
    })
  }

  // ── Renvoyer badge ─────────────────────────────────────────
  if (action === 'send_badge') {
    if (registration.status !== 'approved') {
      return NextResponse.json(
        { error: "L'inscription doit être approuvée avant l'envoi du badge." },
        { status: 400 }
      )
    }

    try {
      const pdfBuffer = await generateBadgePDF(registration)
      await sendBadgeEmail(registration, pdfBuffer)

      const { data: updated, error: updateError } = await supabaseAdmin
        .from('registrations')
        .update({ badge_sent: true })
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }

      return NextResponse.json({
        message: 'Badge renvoyé avec succès.',
        registration: updated,
      })
    } catch (emailError) {
      console.error('[RESEND_BADGE_ERROR]', emailError)
      return NextResponse.json(
        { error: emailError instanceof Error ? emailError.message : "Erreur lors de l'envoi du badge." },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Action non traitée' }, { status: 400 })

  } catch (err) {
    console.error('[PATCH GLOBAL ERROR]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

// ──────────────────────────────────────────────────────────────
// DELETE /api/admin/registrations/[id]
// ──────────────────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { error } = await supabaseAdmin
    .from('registrations')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Inscription supprimée avec succès.' })
}
