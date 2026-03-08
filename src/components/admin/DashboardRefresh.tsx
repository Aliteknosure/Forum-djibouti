'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

export default function DashboardRefresh() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Refresh automatique toutes les 30 secondes
  useEffect(() => {
    router.refresh() // refresh immédiat au montage
    const interval = setInterval(() => {
      router.refresh()
    }, 30_000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    router.refresh()
    setTimeout(() => setLoading(false), 800)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      title="Actualiser les statistiques"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#b8960c' }}
    >
      <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
      Actualiser
    </button>
  )
}
