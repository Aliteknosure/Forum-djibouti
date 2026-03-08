'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  CheckCircle, XCircle, Send, ArrowLeft, Mail, Phone,
  Building2, Briefcase, MapPin, Calendar, QrCode, Loader2
} from 'lucide-react'
import { Registration, PARTICIPANT_TYPE_LABELS, STATUS_LABELS } from '@/types/registration'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
}

const typeColors: Record<string, string> = {
  visitor: '#3b82f6',
  speaker: '#8b5cf6',
  press: '#10b981',
  vip: '#f59e0b',
  student: '#06b6d4',
}

export default function RegistrationDetail({ registration: initial }: { registration: Registration }) {
  const [reg, setReg] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const performAction = async (action: string, label: string) => {
    setLoading(action)
    try {
      const res = await fetch(`/api/admin/registrations/${reg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const json = await res.json()

      console.log('[performAction] status:', res.status, '| body:', json)

      if (!res.ok) throw new Error(json.detail ? `${json.error} — ${json.detail} (id: ${json.id})` : json.error)

      toast({ title: label, description: json.message })

      // Mettre à jour l'état depuis les données fraîches retournées par l'API
      if (json.registration) {
        setReg(json.registration)
      } else {
        if (action === 'approve') setReg((p) => ({ ...p, status: 'approved', badge_sent: true }))
        if (action === 'reject') setReg((p) => ({ ...p, status: 'rejected' }))
        if (action === 'send_badge') setReg((p) => ({ ...p, badge_sent: true }))
      }

      // Rafraîchir les Server Components (dashboard, liste)
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Erreur inconnue',
        variant: 'destructive',
      })
    } finally {
      setLoading(null)
    }
  }

  const typeColor = typeColors[reg.participant_type] || '#3b82f6'

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/registrations"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Retour aux inscriptions
      </Link>

      {/* Header */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white"
              style={{ background: `linear-gradient(135deg, ${typeColor}, ${typeColor}88)` }}
            >
              {reg.first_name[0]}{reg.last_name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {reg.first_name} {reg.last_name}
              </h1>
              <p className="text-white/60 text-sm">{reg.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: typeColor }}
            >
              {PARTICIPANT_TYPE_LABELS[reg.participant_type]}
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[reg.status]}`}
            >
              {STATUS_LABELS[reg.status]}
            </span>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { icon: Mail, label: 'Email', value: reg.email },
          { icon: Phone, label: 'Téléphone', value: reg.phone || '—' },
          { icon: Building2, label: 'Organisation', value: reg.organization || '—' },
          { icon: Briefcase, label: 'Fonction', value: reg.job_title || '—' },
          { icon: MapPin, label: 'Pays', value: reg.country },
          {
            icon: Calendar,
            label: 'Date d\'inscription',
            value: new Date(reg.created_at).toLocaleString('fr-FR'),
          },
          {
            icon: Send,
            label: 'Badge envoyé',
            value: reg.badge_sent ? 'Oui ✓' : 'Non',
          },
          {
            icon: QrCode,
            label: 'Check-in',
            value: reg.checked_in
              ? `Oui – ${reg.checked_in_at ? new Date(reg.checked_in_at).toLocaleString('fr-FR') : ''}`
              : 'Non',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl p-4 flex items-start gap-3"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <item.icon size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="font-medium text-sm mt-0.5" style={{ color: '#0a1932' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message */}
      {reg.message && (
        <div
          className="bg-white rounded-xl p-5 mb-6"
          style={{ border: '1px solid #e2e8f0' }}
        >
          <p className="text-xs text-gray-400 mb-2">Message / Besoins spéciaux</p>
          <p className="text-sm text-gray-700 leading-relaxed">{reg.message}</p>
        </div>
      )}

      {/* Reference */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center gap-2"
        style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
      >
        <QrCode size={14} className="text-gray-400" />
        <span className="text-xs text-gray-500">Référence : </span>
        <span className="text-xs font-mono font-bold" style={{ color: '#0a1932' }}>
          #{reg.id.substring(0, 8).toUpperCase()}
        </span>
        <span className="text-xs text-gray-400">({reg.id})</span>
      </div>

      {/* Actions */}
      <div
        className="bg-white rounded-xl p-5"
        style={{ border: '1px solid #e2e8f0' }}
      >
        <h3 className="font-semibold text-sm mb-4" style={{ color: '#0a1932' }}>Actions</h3>
        <div className="flex flex-wrap gap-3">
          {reg.status === 'pending' && (
            <>
              <Button
                onClick={() => performAction('approve', 'Inscription approuvée')}
                disabled={loading !== null}
                className="flex items-center gap-2 font-medium"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
              >
                {loading === 'approve' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                Approuver + Envoyer badge
              </Button>
              <Button
                onClick={() => performAction('reject', 'Inscription rejetée')}
                disabled={loading !== null}
                variant="destructive"
                className="flex items-center gap-2 font-medium"
              >
                {loading === 'reject' ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                Rejeter
              </Button>
            </>
          )}
          {reg.status === 'approved' && (
            <Button
              onClick={() => performAction('send_badge', 'Badge renvoyé')}
              disabled={loading !== null}
              variant="outline"
              className="flex items-center gap-2 font-medium"
            >
              {loading === 'send_badge' ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Renvoyer le badge
            </Button>
          )}
          {reg.status === 'rejected' && (
            <Button
              onClick={() => performAction('approve', 'Inscription approuvée')}
              disabled={loading !== null}
              className="flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
            >
              {loading === 'approve' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              Approuver quand même
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
