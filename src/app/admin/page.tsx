export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import StatsCards from '@/components/admin/StatsCards'
import DashboardRefresh from '@/components/admin/DashboardRefresh'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Registration, PARTICIPANT_TYPE_LABELS } from '@/types/registration'

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

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  const labels: Record<string, string> = {
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || ''}`}>
      {labels[status] || status}
    </span>
  )
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

      {stats && <StatsCards stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: '#0a1932' }}>Dernières inscriptions</h2>
            <Link
              href="/admin/registrations"
              className="text-xs flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{ color: '#b8960c' }}
            >
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recent.map((reg) => (
              <Link
                key={reg.id}
                href={`/admin/registrations/${reg.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: '#0a1932' }}>
                    {reg.first_name} {reg.last_name}
                  </p>
                  <p className="text-xs text-gray-400">{reg.email} · {reg.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {PARTICIPANT_TYPE_LABELS[reg.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS]}
                  </span>
                  {statusBadge(reg.status)}
                </div>
              </Link>
            ))}
            {recent.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">Aucune inscription pour le moment</p>
            )}
          </div>
        </div>

        {stats && (
          <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="font-semibold mb-4" style={{ color: '#0a1932' }}>Répartition par type</h2>
            <div className="space-y-3">
              {Object.entries(stats.by_type).map(([type, count]) => {
                const label = PARTICIPANT_TYPE_LABELS[type as keyof typeof PARTICIPANT_TYPE_LABELS] || type
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
                return (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-medium" style={{ color: '#0a1932' }}>
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #d4af37, #b8960c)' }}
                      />
                    </div>
                  </div>
                )
              })}
              {Object.keys(stats.by_type).length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">Aucune donnée</p>
              )}
            </div>
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
