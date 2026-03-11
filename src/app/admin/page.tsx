export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import StatsCards from '@/components/admin/StatsCards'
import DashboardRefresh from '@/components/admin/DashboardRefresh'
import RepartitionChart from '@/components/admin/RepartitionChart'
import RecentRegistrations from '@/components/admin/RecentRegistrations'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Registration } from '@/types/registration'

interface StatRow {
  status: string
  participant_type: string
  badge_sent: boolean
  checked_in: boolean
}

async function getStats() {
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('status, participant_type, badge_sent, checked_in')

  if (!data) return null
  const rows = data as StatRow[]

  const stats = {
    total: rows.length,
    pending: rows.filter((r) => r.status === 'pending').length,
    approved: rows.filter((r) => r.status === 'approved').length,
    rejected: rows.filter((r) => r.status === 'rejected').length,
    badge_sent: rows.filter((r) => r.badge_sent).length,
    checked_in: rows.filter((r) => r.checked_in).length,
    by_type: {} as Record<string, number>,
  }

  rows.forEach((r) => {
    stats.by_type[r.participant_type] = (stats.by_type[r.participant_type] || 0) + 1
  })

  return stats
}

async function getRecentRegistrations() {
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('id, first_name, last_name, email, participant_type, status, created_at, country')
    .order('created_at', { ascending: false })
    .limit(5)
  return (data || []) as Pick<Registration, 'id' | 'first_name' | 'last_name' | 'email' | 'participant_type' | 'status' | 'created_at' | 'country'>[]
}

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getStats(), getRecentRegistrations()])

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0a1932' }}>Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Forum National de l&apos;Entrepreneuriat 2026</p>
          </div>
          <DashboardRefresh />
        </div>
      </div>

      {/* StatsCards — client, polling 20s autonome */}
      {stats && <StatsCards stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* RecentRegistrations — client, polling 20s autonome */}
        <RecentRegistrations initialData={recent} />

        {/* RepartitionChart — client, polling 20s autonome */}
        {stats && (
          <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="font-semibold mb-4" style={{ color: '#0a1932' }}>Répartition par type</h2>
            <RepartitionChart stats={stats} />
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            href: '/admin/registrations?status=pending',
            label: 'Traiter les demandes en attente',
            desc: `${stats?.pending || 0} à traiter`,
            color: '#f59e0b',
          },
          {
            href: '/admin/badges',
            label: 'Envoyer les badges en masse',
            desc: 'Approuvés sans badge',
            color: '#8b5cf6',
          },
          {
            href: '/admin/checkin',
            label: 'Démarrer le check-in',
            desc: 'Scanner les QR codes',
            color: '#10b981',
          },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-between"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <div>
              <p className="font-semibold text-sm" style={{ color: '#0a1932' }}>{action.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
            </div>
            <ArrowRight size={16} style={{ color: action.color }} />
          </Link>
        ))}
      </div>
    </div>
  )
}
