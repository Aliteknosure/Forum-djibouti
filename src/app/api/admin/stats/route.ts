export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data } = await supabaseAdmin
    .from('registrations')
    .select('status, participant_type, badge_sent, checked_in')

  const rows = (data || []) as {
    status: string
    participant_type: string
    badge_sent: boolean
    checked_in: boolean
  }[]

  const stats = {
    total: rows.length,
    pending: rows.filter((r) => r.status === 'pending').length,
    approved: rows.filter((r) => r.status === 'approved').length,
    rejected: rows.filter((r) => r.status === 'rejected').length,
    badge_sent: rows.filter((r) => r.badge_sent).length,
    checked_in: rows.filter((r) => r.checked_in).length,
    by_type: rows.reduce((acc, r) => {
      acc[r.participant_type] = (acc[r.participant_type] || 0) + 1
      return acc
    }, {} as Record<string, number>),
  }

  return NextResponse.json(stats)
}
