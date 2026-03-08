export const dynamic = 'force-dynamic'
export const revalidate = 0

import { supabaseAdmin } from '@/lib/supabase'
import BadgesBulkSender from '@/components/admin/BadgesBulkSender'

export const metadata = { title: 'Badges – Admin' }

interface PartialReg {
  id: string
  first_name: string
  last_name: string
  email: string
  participant_type: string
  badge_sent: boolean
}

export default async function BadgesPage() {
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('id, first_name, last_name, email, participant_type, badge_sent')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  console.log('[BadgesPage] error:', error, '| data:', JSON.stringify(data))

  const approved = (data || []) as PartialReg[]
  const pendingList = approved.filter((r) => !r.badge_sent)
  const sentList = approved.filter((r) => r.badge_sent)

  console.log('[BadgesPage] pending:', pendingList.length, '| sent:', sentList.length)

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0a1932' }}>Badges</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez l&apos;envoi des badges PDF aux participants approuvés.
        </p>
      </div>
      <BadgesBulkSender pending={pendingList} sent={sentList} />
    </div>
  )
}
