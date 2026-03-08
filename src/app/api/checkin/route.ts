export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { Registration } from '@/types/registration'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 })

  const { data: regRaw, error: fetchErr } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !regRaw) {
    return NextResponse.json({ error: 'Participant non trouvé' }, { status: 404 })
  }

  const reg = regRaw as Registration

  if (reg.status !== 'approved') {
    return NextResponse.json(
      { error: 'Ce participant n\'est pas approuvé', participant: reg },
      { status: 403 }
    )
  }

  if (reg.checked_in) {
    return NextResponse.json(
      { warning: 'Participant déjà enregistré', participant: reg },
      { status: 200 }
    )
  }

  const { error: updateErr } = await supabaseAdmin
    .from('registrations')
    .update({ checked_in: true, checked_in_at: new Date().toISOString() })
    .eq('id', id)

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })

  const { data: updatedRaw } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('id', id)
    .single()

  return NextResponse.json({ success: true, participant: updatedRaw as Registration })
}
