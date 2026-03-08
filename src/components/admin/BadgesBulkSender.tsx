'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Send, Loader2, CheckCircle, Clock, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PARTICIPANT_TYPE_LABELS } from '@/types/registration'

interface PartialReg {
  id: string
  first_name: string
  last_name: string
  email: string
  participant_type: string
  badge_sent: boolean
}

const typeColors: Record<string, string> = {
  visitor: 'bg-blue-100 text-blue-700',
  speaker: 'bg-purple-100 text-purple-700',
  press: 'bg-emerald-100 text-emerald-700',
  vip: 'bg-yellow-100 text-yellow-700',
  student: 'bg-cyan-100 text-cyan-700',
}

export default function BadgesBulkSender({
  pending: initialPending,
  sent: initialSent,
}: {
  pending: PartialReg[]
  sent: PartialReg[]
}) {
  const [pending, setPending] = useState<PartialReg[]>(initialPending)
  const [sent, setSent] = useState<PartialReg[]>(initialSent)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [result, setResult] = useState<{ sent: number; errors: string[]; total: number } | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Sync quand le Server Component repasse de nouvelles props
  useEffect(() => {
    setPending(initialPending)
    setSent(initialSent)
  }, [initialPending, initialSent])

  // Fetch frais au montage depuis l'API
  useEffect(() => {
    handleRefresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/admin/registrations?status=approved&limit=200', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      const json = await res.json()
      const approved: PartialReg[] = (json.data || [])
      console.log('[BadgesBulkSender] refresh approved:', approved.length, approved)
      setPending(approved.filter((r) => !r.badge_sent))
      setSent(approved.filter((r) => r.badge_sent))
    } catch (e) {
      console.error('[BadgesBulkSender] refresh error:', e)
    } finally {
      setRefreshing(false)
    }
  }

  const handleBulkSend = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/badges/send', { method: 'POST' })
      const json = await res.json()
      setResult(json)
      toast({
        title: `${json.sent} badge(s) envoyé(s)`,
        description: json.errors?.length ? `${json.errors.length} erreur(s)` : 'Tous les badges ont été envoyés.',
      })
      // Rafraîchir les listes locales
      await handleRefresh()
    } catch {
      toast({ title: 'Erreur', description: "Impossible d'envoyer les badges.", variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* En attente */}
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="font-semibold" style={{ color: '#0a1932' }}>
              Badges en attente d'envoi
            </h2>
            <p className="text-gray-500 text-sm">
              {pending.length} participant{pending.length !== 1 ? 's' : ''} approuvé{pending.length !== 1 ? 's' : ''} sans badge
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Actualiser"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#b8960c' }}
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Actualiser
            </button>
            <Button
              onClick={handleBulkSend}
              disabled={loading || pending.length === 0}
              className="flex items-center gap-2 font-semibold"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Envoyer tous les badges ({pending.length})
                </>
              )}
            </Button>
          </div>
        </div>

        {result && (
          <div
            className="mb-4 p-4 rounded-xl text-sm"
            style={{
              backgroundColor: result.errors?.length ? '#fef3c7' : '#dcfce7',
              border: `1px solid ${result.errors?.length ? '#fde68a' : '#bbf7d0'}`,
              color: result.errors?.length ? '#92400e' : '#166534',
            }}
          >
            ✓ {result.sent} badge(s) envoyé(s) sur {result.total}
            {result.errors?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Erreurs :</p>
                {result.errors.map((e, i) => <p key={i} className="text-xs">{e}</p>)}
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          {pending.length === 0 ? (
            <div className="flex items-center gap-2 py-8 justify-center text-gray-400">
              <CheckCircle size={20} />
              <span className="text-sm">Tous les badges ont été envoyés !</span>
            </div>
          ) : (
            pending.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: '#fef9c3', border: '1px solid #fef08a' }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: '#0a1932' }}>
                    {reg.first_name} {reg.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{reg.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[reg.participant_type] || ''}`}>
                    {PARTICIPANT_TYPE_LABELS[reg.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || reg.participant_type}
                  </span>
                  <Clock size={14} className="text-yellow-600" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Déjà envoyés */}
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
        <h2 className="font-semibold mb-1" style={{ color: '#0a1932' }}>
          Badges déjà envoyés
        </h2>
        <p className="text-gray-500 text-sm mb-4">{sent.length} participant{sent.length !== 1 ? 's' : ''}</p>
        <div className="space-y-2">
          {sent.length === 0 ? (
            <div className="flex items-center gap-2 py-6 justify-center text-gray-400">
              <Clock size={18} />
              <span className="text-sm">Aucun badge envoyé pour l'instant</span>
            </div>
          ) : (
            sent.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: '#0a1932' }}>
                    {reg.first_name} {reg.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{reg.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[reg.participant_type] || ''}`}>
                    {PARTICIPANT_TYPE_LABELS[reg.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || reg.participant_type}
                  </span>
                  <CheckCircle size={14} className="text-green-600" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
