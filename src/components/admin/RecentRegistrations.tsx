'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import {
  PARTICIPANT_TYPE_LABELS,
  PARTICIPANT_TYPE_COLORS,
  STATUS_LABELS,
  Registration,
} from '@/types/registration'

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export default function RecentRegistrations({
  initialData,
}: {
  initialData: Pick<Registration, 'id' | 'first_name' | 'last_name' | 'email' | 'participant_type' | 'status' | 'created_at' | 'country'>[]
}) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const fetchRecent = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true)
    try {
      const res = await fetch('/api/admin/registrations?limit=5&page=1', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      if (res.ok) {
        const json = await res.json()
        setData(json.data || [])
      }
    } catch {}
    if (showLoader) setLoading(false)
  }, [])

  // Fetch immédiat au montage
  useEffect(() => {
    fetchRecent()
  }, [fetchRecent])

  // Polling 20s — même rythme que StatsCards
  useEffect(() => {
    const interval = setInterval(() => fetchRecent(), 20_000)
    return () => clearInterval(interval)
  }, [fetchRecent])

  // Refresh au focus
  useEffect(() => {
    const onFocus = () => fetchRecent()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [fetchRecent])

  // Refresh immédiat sur event global (suppression, approbation, etc.)
  useEffect(() => {
    const onChange = () => fetchRecent()
    window.addEventListener('registration-changed', onChange)
    return () => window.removeEventListener('registration-changed', onChange)
  }, [fetchRecent])

  return (
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

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 size={20} className="animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="space-y-1">
          {data.map((reg) => (
            <Link
              key={reg.id}
              href={`/admin/registrations/${reg.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate" style={{ color: '#0a1932' }}>
                  {reg.first_name} {reg.last_name}
                </p>
                <p className="text-xs text-gray-400 truncate">{reg.email} · {reg.country}</p>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium hidden sm:block"
                  style={{
                    backgroundColor: `${PARTICIPANT_TYPE_COLORS[reg.participant_type]}18`,
                    color: PARTICIPANT_TYPE_COLORS[reg.participant_type],
                  }}
                >
                  {PARTICIPANT_TYPE_LABELS[reg.participant_type]}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[reg.status] || ''}`}>
                  {STATUS_LABELS[reg.status] || reg.status}
                </span>
              </div>
            </Link>
          ))}
          {data.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">Aucune inscription pour le moment</p>
          )}
        </div>
      )}
    </div>
  )
}
