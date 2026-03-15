'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  CheckCircle, XCircle, Send, ArrowLeft, Mail, Phone,
  Building2, Briefcase, MapPin, Calendar, QrCode, Loader2,
  Newspaper, Mic2, Store, Trash2, BookOpen, PanelTop
} from 'lucide-react'
import { Registration, PARTICIPANT_TYPE_LABELS, PARTICIPANT_TYPE_COLORS, PARTICIPANT_TYPE_ICONS, STATUS_LABELS } from '@/types/registration'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
}

export default function RegistrationDetail({ registration: initial }: { registration: Registration }) {
  const [reg, setReg] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
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
      window.dispatchEvent(new CustomEvent('registration-changed'))
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

  const deleteRegistration = async () => {
    setDeleteLoading(true)
    try {
      const res = await fetch(`/api/admin/registrations/${reg.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast({ title: '🗑️ Supprimé', description: 'Inscription supprimée avec succès.' })
      window.dispatchEvent(new CustomEvent('registration-changed'))
      router.push('/admin/registrations')
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Erreur inconnue',
        variant: 'destructive',
      })
      setDeleteLoading(false)
      setConfirmDelete(false)
    }
  }

  const typeColor = PARTICIPANT_TYPE_COLORS[reg.participant_type] || '#3b82f6'
  const typeIcon = PARTICIPANT_TYPE_ICONS[reg.participant_type] || '👤'

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
            {reg.photo_url ? (
              <img
                src={reg.photo_url}
                alt={`${reg.first_name} ${reg.last_name}`}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white"
                style={{ background: `linear-gradient(135deg, ${typeColor}, ${typeColor}88)` }}
              >
                {typeIcon}
              </div>
            )}
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

      {/* Champs Exposant */}
      {reg.participant_type === 'exhibitor' && (
        <div className="bg-white rounded-xl p-5 mb-6" style={{ border: '1px solid #fde68a' }}>
          <div className="flex items-center gap-2 mb-4">
            <Store size={15} style={{ color: '#f59e0b' }} />
            <p className="text-sm font-semibold" style={{ color: '#0a1932' }}>Informations Exposant</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reg.company_name && (
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Entreprise / Marque</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.company_name}</p>
              </div>
            )}
            {reg.sector && (
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Secteur d&apos;activité</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.sector}</p>
              </div>
            )}
            {reg.region_origin && (
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Région d&apos;origine</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.region_origin}</p>
              </div>
            )}
            {reg.stand_needs && reg.stand_needs.length > 0 && (
              <div className="bg-amber-50 rounded-lg p-3 sm:col-span-2">
                <p className="text-xs text-gray-400 mb-1.5">Besoins stand</p>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(reg.stand_needs) ? reg.stand_needs : (reg.stand_needs as string).split(', ')).map((need: string) => (
                    <span key={need} className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">{need}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Champs Speaker */}
      {reg.participant_type === 'speaker' && (
        <div className="bg-white rounded-xl p-5 mb-6" style={{ border: '1px solid #e9d5ff' }}>
          <div className="flex items-center gap-2 mb-4">
            <Mic2 size={15} style={{ color: '#8b5cf6' }} />
            <p className="text-sm font-semibold" style={{ color: '#0a1932' }}>Informations Intervenant</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reg.institution && (
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Institution / Organisation</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.institution}</p>
              </div>
            )}
            {reg.topic && (
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Thème de présentation</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.topic}</p>
              </div>
            )}
            {reg.bio && (
              <div className="bg-purple-50 rounded-lg p-3 sm:col-span-2">
                <p className="text-xs text-gray-400">Biographie</p>
                <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{reg.bio}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Champs Investisseur */}
      {reg.participant_type === 'investor' && (
        <div className="bg-white rounded-xl p-5 mb-6" style={{ border: '1px solid #a7f3d0' }}>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper size={15} style={{ color: '#10b981' }} />
            <p className="text-sm font-semibold" style={{ color: '#0a1932' }}>Informations Investisseur</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reg.institution && (
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Fonds / Institution</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.institution}</p>
              </div>
            )}
            {reg.topic && (
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Secteurs d&apos;intérêt</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{reg.topic}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Champs Masterclasse */}
      {reg.participant_type === 'masterclasse' && (
        <div className="bg-white rounded-xl p-5 mb-6" style={{ border: '1px solid #ddd6fe' }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={15} style={{ color: '#7c3aed' }} />
            <p className="text-sm font-semibold" style={{ color: '#0a1932' }}>Session Masterclasse</p>
          </div>
          {reg.session_choice ? (
            <div className="bg-violet-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">Session choisie</p>
              <p className="text-sm font-medium text-violet-700 mt-0.5">{reg.session_choice.toUpperCase()}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucune session sélectionnée</p>
          )}
        </div>
      )}

      {/* Champs Panel */}
      {reg.participant_type === 'panel' && (
        <div className="bg-white rounded-xl p-5 mb-6" style={{ border: '1px solid #fed7aa' }}>
          <div className="flex items-center gap-2 mb-4">
            <PanelTop size={15} style={{ color: '#ea580c' }} />
            <p className="text-sm font-semibold" style={{ color: '#0a1932' }}>Session Panel</p>
          </div>
          {reg.session_choice ? (
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">Panel choisi</p>
              <p className="text-sm font-medium text-orange-700 mt-0.5">{reg.session_choice.toUpperCase()}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucun panel sélectionné</p>
          )}
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

          {/* Séparateur + bouton supprimer */}
          <div className="w-full border-t border-gray-100 mt-1 pt-3">
            <Button
              onClick={() => setConfirmDelete(true)}
              disabled={loading !== null || deleteLoading}
              variant="outline"
              className="flex items-center gap-2 font-medium text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 size={14} />
              Supprimer cette inscription
            </Button>
          </div>
        </div>
      </div>

      {/* Modale confirmation suppression */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmDelete(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Supprimer l&apos;inscription</h3>
                <p className="text-xs text-gray-500">Cette action est irréversible.</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer l&apos;inscription de{' '}
              <span className="font-semibold text-gray-900">
                {reg.first_name} {reg.last_name}
              </span>{' '}
              ? Toutes ses données seront perdues définitivement.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={deleteRegistration}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                {deleteLoading
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Trash2 size={14} />}
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
