export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend, FROM_EMAIL, buildConfirmationEmailHtml, FORUM_NAME, FORUM_DATE } from '@/lib/resend'
import { registrationSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validation zod
    const parsed = registrationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Vérification email unique
    const { data: existing } = await supabaseAdmin
      .from('registrations')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Cette adresse email est déjà inscrite. Vérifiez votre boîte mail.' },
        { status: 409 }
      )
    }

    // Insertion en base
    const { data: registration, error: dbError } = await supabaseAdmin
      .from('registrations')
      .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        organization: data.organization || null,
        job_title: data.job_title || null,
        participant_type: data.participant_type,
        country: data.country,
        message: data.message || null,
        // Champs Exposant MSME
        company_name: data.company_name || null,
        sector: data.sector || null,
        region_origin: data.region_origin || null,
        stand_needs: data.stand_needs && data.stand_needs.length > 0
          ? data.stand_needs.join(', ')
          : null,
        // Champs Panéliste
        institution: data.institution || null,
        topic: data.topic || null,
        bio: data.bio || null,
        // Champs Presse
        media_name: data.media_name || null,
        media_type: data.media_type || null,
        status: 'pending',
        badge_sent: false,
        checked_in: false,
      })
      .select()
      .single()

    if (dbError) {
      console.error('DB Error:', dbError)
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement.' }, { status: 500 })
    }

    // Envoi email de confirmation
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Inscription confirmée – ${FORUM_NAME} – ${FORUM_DATE}`,
      html: buildConfirmationEmailHtml({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        participant_type: data.participant_type,
        organization: data.organization,
        job_title: data.job_title,
        country: data.country,
        id: registration.id,
      }),
    })

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 })
  } catch (err) {
    console.error('Register API Error:', err)
    return NextResponse.json({ error: 'Erreur serveur interne.' }, { status: 500 })
  }
}
