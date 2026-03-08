export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { Registration } from '@/types/registration'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data: raw, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const data = (raw || []) as Registration[]

  const headers = [
    'ID', 'Date', 'Prénom', 'Nom', 'Email', 'Téléphone',
    'Organisation', 'Fonction', 'Type', 'Pays', 'Statut',
    'Badge envoyé', 'Check-in', 'Date check-in',
  ]

  const rows = (data || []).map((r) => [
    r.id,
    new Date(r.created_at).toLocaleString('fr-FR'),
    r.first_name,
    r.last_name,
    r.email,
    r.phone || '',
    r.organization || '',
    r.job_title || '',
    r.participant_type,
    r.country,
    r.status,
    r.badge_sent ? 'Oui' : 'Non',
    r.checked_in ? 'Oui' : 'Non',
    r.checked_in_at ? new Date(r.checked_in_at).toLocaleString('fr-FR') : '',
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return new NextResponse('\uFEFF' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inscriptions-forum-djibouti-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
