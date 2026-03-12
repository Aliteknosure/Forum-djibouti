'use client'

import { useState, useEffect, useCallback } from 'react'
import { PARTICIPANT_TYPE_LABELS, PARTICIPANT_TYPE_COLORS } from '@/types/registration'

interface Stats {
  total: number
  by_type: Record<string, number>
}

export default function RepartitionChart({ stats: initialStats }: { stats: Stats }) {
  const [stats, setStats] = useState(initialStats)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      if (res.ok) {
        const json = await res.json()
        setStats(json)
      }
    } catch {}
  }, [])

  // Fetch immédiat au montage
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Polling 20s
  useEffect(() => {
    const interval = setInterval(() => fetchStats(), 20_000)
    return () => clearInterval(interval)
  }, [fetchStats])

  // Refresh au focus
  useEffect(() => {
    window.addEventListener('focus', fetchStats)
    return () => window.removeEventListener('focus', fetchStats)
  }, [fetchStats])

  // Refresh immédiat sur event global (suppression, approbation, etc.)
  useEffect(() => {
    window.addEventListener('registration-changed', fetchStats)
    return () => window.removeEventListener('registration-changed', fetchStats)
  }, [fetchStats])

  const types = ['speaker', 'investor', 'startup_msme', 'exhibitor', 'ecosystem_leader', 'partner', 'visitor']

  return (
    <div className="space-y-3">
      {types.map((type) => {
        const count = stats.by_type?.[type] ?? 0
        const label = PARTICIPANT_TYPE_LABELS[type as keyof typeof PARTICIPANT_TYPE_LABELS] || type
        const color = PARTICIPANT_TYPE_COLORS[type as keyof typeof PARTICIPANT_TYPE_COLORS] || '#d4af37'
        const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
        return (
          <div key={type}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium" style={{ color }}>
                {count} ({pct}%)
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        )
      })}
      {types.every((t) => (stats.by_type?.[t] ?? 0) === 0) && (
        <p className="text-gray-400 text-sm text-center py-4">Aucune donnée</p>
      )}
    </div>
  )
}
