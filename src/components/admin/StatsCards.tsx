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
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [error, setError] = useState(false)

  const fetchStats = useCallback(async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/stats', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      if (res.ok) {
        const json = await res.json()
        setStats(json)
        setLastUpdate(new Date())
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      if (showSpinner) setRefreshing(false)
    }
  }, [])

  // Fetch immédiat au montage (ignore les props initiales potentiellement stales)
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Polling toutes les 20 secondes
  useEffect(() => {
    const interval = setInterval(() => fetchStats(), 20_000)
    return () => clearInterval(interval)
  }, [fetchStats])

  // Refresh au focus fenêtre
  useEffect(() => {
    const onFocus = () => fetchStats()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [fetchStats])

  // Refresh immédiat sur event global (suppression, approbation, etc.)
  useEffect(() => {
    const onChange = () => fetchStats()
    window.addEventListener('registration-changed', onChange)
    return () => window.removeEventListener('registration-changed', onChange)
  }, [fetchStats])

  const cards = [
    { label: 'Total candidatures', value: stats.total, icon: Users, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Validés', value: stats.approved, icon: CheckCircle, color: '#10b981', bg: '#dcfce7' },
    { label: 'Refusés', value: stats.rejected, icon: XCircle, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Badges envoyés', value: stats.badge_sent, icon: CreditCard, color: '#8b5cf6', bg: '#f3e8ff' },
    { label: 'Check-ins', value: stats.checked_in, icon: QrCode, color: '#06b6d4', bg: '#cffafe' },
  ]

  const byRole = [
    { label: '🎤 Intervenants', value: stats.by_type?.speaker ?? 0, color: '#8b5cf6' },
    { label: '💼 Investisseurs', value: stats.by_type?.investor ?? 0, color: '#10b981' },
    { label: '🚀 Startups / MSMEs', value: stats.by_type?.startup_msme ?? 0, color: '#f59e0b' },
    { label: '🏪 Exposants', value: stats.by_type?.exhibitor ?? 0, color: '#3b82f6' },
    { label: '🌐 Ecosystem Leaders', value: stats.by_type?.ecosystem_leader ?? 0, color: '#ef4444' },
    { label: '🤝 Partenaires', value: stats.by_type?.partner ?? 0, color: '#06b6d4' },
    { label: '👥 Visiteurs', value: stats.by_type?.visitor ?? 0, color: '#6b7280' },
    { label: '🗣️ Panel', value: stats.by_type?.panel ?? 0, color: '#ea580c' },
  ]

  return (
    <div className="space-y-4">
      {/* Stats globales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl p-3 sm:p-4 bg-white shadow-sm transition-all duration-300"
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

      {/* Stats par rôle */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {byRole.map((role) => (
          <div
            key={role.label}
            className="rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 bg-white shadow-sm flex items-center justify-between gap-2"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <span className="text-xs sm:text-sm text-gray-600 truncate">{role.label}</span>
            <span className="text-base sm:text-lg font-bold shrink-0" style={{ color: role.color }}>{role.value}</span>
          </div>
        ))}
      </div>

      {/* Barre du bas : heure + bouton refresh */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {error
            ? <span className="text-red-400">⚠ Erreur de chargement</span>
            : lastUpdate
              ? <>Mis à jour à {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</>
              : <>Chargement…</>
          }
        </span>
        <button
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>
    </div>
  )
}
