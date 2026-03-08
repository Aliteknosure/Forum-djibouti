'use client'

import { useState, useEffect, useCallback } from 'react'
import { Users, CheckCircle, Clock, XCircle, CreditCard, QrCode, RefreshCw } from 'lucide-react'

interface Stats {
  total: number
  pending: number
  approved: number
  rejected: number
  badge_sent: number
  checked_in: number
  by_type: Record<string, number>
}

export default function StatsCards({ stats: initialStats }: { stats: Stats }) {
  const [stats, setStats] = useState(initialStats)
  const [refreshing, setRefreshing] = useState(false)

  // Sync quand les props changent (après router.refresh du Server Component)
  useEffect(() => {
    setStats(initialStats)
  }, [initialStats])

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/admin/stats', { cache: 'no-store' })
      if (res.ok) {
        const json = await res.json()
        setStats(json)
      }
    } catch {}
    setRefreshing(false)
  }, [])

  // Rafraîchir quand la fenêtre reprend le focus
  useEffect(() => {
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [refresh])

  const cards = [
    { label: 'Total inscrits', value: stats.total, icon: Users, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Approuvés', value: stats.approved, icon: CheckCircle, color: '#10b981', bg: '#dcfce7' },
    { label: 'Rejetés', value: stats.rejected, icon: XCircle, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Badges envoyés', value: stats.badge_sent, icon: CreditCard, color: '#8b5cf6', bg: '#f3e8ff' },
    { label: 'Check-ins', value: stats.checked_in, icon: QrCode, color: '#06b6d4', bg: '#cffafe' },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl p-4 bg-white shadow-sm"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: card.bg }}
            >
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: '#0a1932' }}>{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          Actualiser les stats
        </button>
      </div>
    </div>
  )
}
