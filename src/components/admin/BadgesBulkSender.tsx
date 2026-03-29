'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Send, Loader2, CheckCircle, Clock, RefreshCw, RotateCcw } from 'lucide-react'
import { PARTICIPANT_TYPE_LABELS } from '@/types/registration'

interface PartialReg {
  id: string
  first_name: string
  last_name: string
  email: string
  participant_type: string
  badge_sent: boolean
}

interface SendResult {
  totalSent: number
  totalFailed: number
  errors: { id: string; email: string; error: string }[]
}

const typeColors: Record<string, string> = {
  speaker: 'bg-purple-100 text-purple-700',
  investor: 'bg-emerald-100 text-emerald-700',
  startup_msme: 'bg-amber-100 text-amber-700',
  exhibitor: 'bg-blue-100 text-blue-700',
  ecosystem_leader: 'bg-red-100 text-red-700',
  partner: 'bg-cyan-100 text-cyan-700',
  visitor: 'bg-gray-100 text-gray-700',
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
  const [loadingType, setLoadingType] = useState<'normal' | 'resend' | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [progress, setProgress] = useState<{ sent: number; total: number } | null>(null)
  const [result, setResult] = useState<SendResult | null>(null)
  const { toast } = useToast()

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
      const res = await fetch('/api/admin/registrations?status=approved&limit=500', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      const json = await res.json()
      const approved: PartialReg[] = (json.data || [])
      setPending(approved.filter((r) => !r.badge_sent))
      setSent(approved.filter((r) => r.badge_sent))
    } catch (e) {
      console.error('[BadgesBulkSender] refresh error:', e)
    } finally {
      setRefreshing(false)
    }
  }

  const handleBulkSend = async (resendAll = false) => {
    setLoadingType(resendAll ? 'resend' : 'normal')
    setResult(null)
    setProgress(null)

    let offset = 0
    let hasMore = true
    const accumulated: SendResult = { totalSent: 0, totalFailed: 0, errors: [] }

    try {
      while (hasMore) {
        const url = `/api/admin/badges/send?offset=${offset}&resendAll=${resendAll}`
        const res = await fetch(url, { method: 'POST' })
        const json = await res.json()

        if (!res.ok) {
          toast({ title: 'Erreur API', description: json.error || 'Erreur inconnue', variant: 'destructive' })
          break
        }

        accumulated.totalSent += json.sent ?? 0
        accumulated.totalFailed += json.failed ?? 0
        if (json.errors) accumulated.errors.push(...json.errors)

        // Mise à jour progression
        const totalDone = offset + (json.sent ?? 0) + (json.failed ?? 0)
        setProgress({ sent: accumulated.totalSent, total: json.total ?? totalDone })

        hasMore = json.hasMore ?? false
        offset = json.nextOffset ?? offset
      }

      setResult(accumulated)
      toast({
        title: `${accumulated.totalSent} badge(s) envoyé(s)`,
        description: accumulated.totalFailed > 0
          ? `${accumulated.totalFailed} échec(s)`
          : resendAll
          ? 'Renvoi terminé pour tous les participants.'
          : 'Tous les badges ont été envoyés.',
      })
      await handleRefresh()
    } catch (e) {
      console.error('[handleBulkSend] error:', e)
      toast({ title: 'Erreur', description: "Impossible d'envoyer les badges.", variant: 'destructive' })
    } finally {
      setLoadingType(null)
      setProgress(null)
    }
  }

  const isLoading = loadingType !== null
  const progressPercent = progress && progress.total > 0
    ? Math.round((progress.sent / progress.total) * 100)
    : 0

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
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={refreshing || isLoading}
              title="Actualiser"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#b8960c' }}
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Actualiser
            </button>
            {/* Bouton orange : renvoyer à tous ceux avec badge_sent=true (rattrapage quota) */}
            <Button
              onClick={() => handleBulkSend(true)}
              disabled={isLoading || sent.length === 0}
              className="flex items-center gap-2 font-semibold"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff' }}
              title="Renvoyer les badges à tous les participants marqués badge_sent=true (rattrapage quota dépassé)"
            >
              {loadingType === 'resend' ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Renvoi... {progress ? `${progress.sent}/${progress.total}` : ''}
                </>
              ) : (
                <>
                  <RotateCcw size={15} />
                  Renvoyer à tous ({sent.length})
                </>
              )}
            </Button>
            {/* Bouton doré : envoyer aux nouveaux (badge_sent=false) */}
            <Button
              onClick={() => handleBulkSend(false)}
              disabled={isLoading || pending.length === 0}
              className="flex items-center gap-2 font-semibold"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
            >
              {loadingType === 'normal' ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Envoi... {progress ? `${progress.sent}/${progress.total}` : ''}
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

        {/* Barre de progression */}
        {isLoading && progress && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                {loadingType === 'resend' ? 'Renvoi en cours...' : 'Envoi en cours...'}
              </span>
              <span>{progress.sent} / {progress.total} ({progressPercent}%)</span>
            </div>
            <div className="w-full rounded-full h-2.5" style={{ background: '#e2e8f0' }}>
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  background: loadingType === 'resend'
                    ? 'linear-gradient(90deg, #f97316, #ea580c)'
                    : 'linear-gradient(90deg, #d4af37, #b8960c)',
                }}
              />
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div
            className="mb-4 p-4 rounded-xl text-sm"
            style={{
              backgroundColor: result.totalFailed > 0 ? '#fef3c7' : '#dcfce7',
              border: `1px solid ${result.totalFailed > 0 ? '#fde68a' : '#bbf7d0'}`,
              color: result.totalFailed > 0 ? '#92400e' : '#166534',
            }}
          >
            ✓ {result.totalSent} badge(s) envoyé(s)
            {result.totalFailed > 0 && ` — ${result.totalFailed} échec(s)`}
            {result.errors.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Erreurs :</p>
                {result.errors.map((e, i) => (
                  <p key={i} className="text-xs">{e.email}: {e.error}</p>
                ))}
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
