export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { auth } from '@/lib/auth'
import { Registration } from '@/types/registration'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  let query = supabaseAdmin
    .from('registrations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)
  if (type && type !== 'all') query = query.eq('participant_type', type)
  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,organization.ilike.%${search}%`
    )
  }

  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(
    { data: (data || []) as Registration[], count, page, limit },
    { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
  )
}
