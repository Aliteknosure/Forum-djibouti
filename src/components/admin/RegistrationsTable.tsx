'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Download, ExternalLink, Loader2, CheckCircle, RefreshCw, Trash2 } from 'lucide-react'
import { Registration, PARTICIPANT_TYPE_LABELS, STATUS_LABELS } from '@/types/registration'
import { useToast } from '@/hooks/use-toast'

interface Props {
  initialData: Registration[]
  totalCount: number
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const typeColors: Record<string, string> = {
  speaker: 'bg-purple-100 text-purple-700',
  investor: 'bg-emerald-100 text-emerald-700',
  startup_msme: 'bg-amber-100 text-amber-700',
  exhibitor: 'bg-blue-100 text-blue-700',
  ecosystem_leader: 'bg-red-100 text-red-700',
  partner: 'bg-cyan-100 text-cyan-700',
  visitor: 'bg-gray-100 text-gray-700',
  masterclasse: 'bg-violet-100 text-violet-700',
  panel: 'bg-orange-100 text-orange-700',
}

export default function RegistrationsTable({ initialData, totalCount }: Props) {
  const [data, setData] = useState<Registration[]>(initialData)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch frais au montage — ignore initialData (peut être stale après suppression manuelle)
  useEffect(() => {
    fetchData(search, statusFilter, typeFilter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync si le Server Component repasse de nouvelles props
  useEffect(() => {
    setData(initialData)
  }, [initialData])

  // Rafraîchir quand la fenêtre reprend le focus (retour depuis la page détail)
  useEffect(() => {
    const onFocus = () => {
      router.refresh()
      fetchData(search, statusFilter, typeFilter)
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [search, statusFilter, typeFilter])

  const fetchData = useCallback(async (s: string, st: string, ty: string) => {
    setLoading(true)
    const params = new URLSearchParams({ search: s, status: st, type: ty })
    const res = await fetch(`/api/admin/registrations?${params}`)
    const json = await res.json()
    setData(json.data || [])
    setLoading(false)
  }, [])

  const handleSearch = (value: string) => {
    setSearch(value)
    fetchData(value, statusFilter, typeFilter)
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    fetchData(search, value, typeFilter)
  }

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value)
    fetchData(search, statusFilter, value)
  }

  const quickApprove = async (id: string) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast({ title: '✓ Approuvé', description: 'Badge envoyé par email.' })
      fetchData(search, statusFilter, typeFilter)
      window.dispatchEvent(new CustomEvent('registration-changed'))
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Erreur inconnue',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const deleteRegistration = async (id: string) => {
    setDeleteLoading(id)
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      toast({ title: '🗑️ Supprimé', description: 'Inscription supprimée avec succès.' })
      setData((prev) => prev.filter((r) => r.id !== id))
      window.dispatchEvent(new CustomEvent('registration-changed'))
      router.refresh()
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Erreur inconnue',
        variant: 'destructive',
      })
    } finally {
      setDeleteLoading(null)
      setConfirmDeleteId(null)
    }
  }

  const handleExport = async () => {    setExporting(true)
    const res = await fetch('/api/admin/export')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscriptions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    setExporting(false)
    toast({ title: 'Export réussi', description: 'Le fichier CSV a été téléchargé.' })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Nom, email, organisation..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-32 sm:w-36 text-xs sm:text-sm">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Validés</SelectItem>
            <SelectItem value="rejected">Refusés</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={handleTypeFilter}>
          <SelectTrigger className="w-36 sm:w-40 text-xs sm:text-sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            <SelectItem value="speaker">🎤 Intervenant</SelectItem>
            <SelectItem value="investor">� Investisseur</SelectItem>
            <SelectItem value="startup_msme">� Startup / MSME</SelectItem>
            <SelectItem value="exhibitor">🏪 Exposant</SelectItem>
            <SelectItem value="ecosystem_leader">� Ecosystem Leader</SelectItem>
            <SelectItem value="partner">🤝 Partenaire</SelectItem>
            <SelectItem value="visitor">👥 Visiteur</SelectItem>
            <SelectItem value="masterclasse">📚 Masterclasse</SelectItem>
            <SelectItem value="panel">🗣️ Panel</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => { fetchData(search, statusFilter, typeFilter); router.refresh() }}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-4"
          title="Actualiser"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-4"
        >
          {exporting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
          <span className="hidden sm:inline">Exporter CSV</span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-3">
        {data.length} résultat{data.length !== 1 ? 's' : ''} sur {totalCount} total
      </p>

      {/* Table desktop */}
      <div className="hidden sm:block rounded-xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: '#f8fafc' }}>
                  <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Participant</TableHead>
                  <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Contact</TableHead>
                  <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Type / Session</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Pays</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Statut</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Badge</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <Loader2 size={20} className="animate-spin mx-auto text-gray-400" />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                  Aucune inscription trouvée
                </TableCell>
              </TableRow>
            ) : (
              data.map((reg) => (
                <TableRow key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {reg.photo_url ? (
                        <img
                          src={reg.photo_url}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs text-gray-400 font-bold border border-gray-200">
                          {reg.first_name?.[0]}{reg.last_name?.[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm" style={{ color: '#0a1932' }}>
                          {reg.first_name} {reg.last_name}
                        </p>
                        {reg.organization && (
                          <p className="text-xs text-gray-400">{reg.organization}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{reg.email}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[reg.participant_type] || ''}`}
                    >
                      {PARTICIPANT_TYPE_LABELS[reg.participant_type] || reg.participant_type}
                    </span>
                    {reg.session_choice && (
                      <p className="text-xs text-gray-400 mt-1">{reg.session_choice.toUpperCase()}</p>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{reg.country}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[reg.status] || ''}`}
                    >
                      {STATUS_LABELS[reg.status] || reg.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs ${reg.badge_sent ? 'text-green-600' : 'text-gray-400'}`}>
                      {reg.badge_sent ? '✓ Envoyé' : '—'}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-400">
                    {new Date(reg.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {reg.status === 'pending' && (
                        <button
                          onClick={() => quickApprove(reg.id)}
                          disabled={actionLoading === reg.id}
                          title="Approuver + envoyer badge"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
                        >
                          {actionLoading === reg.id
                            ? <Loader2 size={11} className="animate-spin" />
                            : <CheckCircle size={11} />}
                          Approuver
                        </button>
                      )}
                      <Link
                        href={`/admin/registrations/${reg.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', color: 'white' }}
                      >
                        Gérer
                        <ExternalLink size={11} />
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(reg.id)}
                        disabled={deleteLoading === reg.id}
                        title="Supprimer cette inscription"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                      >
                        {deleteLoading === reg.id
                          ? <Loader2 size={13} className="animate-spin" />
                          : <Trash2 size={13} />}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cards mobile (< sm) */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <Loader2 size={20} className="animate-spin mx-auto text-gray-400" />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">Aucune inscription trouvée</p>
        ) : (
          data.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-xl p-4 shadow-sm"
              style={{ border: '1px solid #e2e8f0' }}
            >
              {/* Header card */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {reg.photo_url ? (
                    <img
                      src={reg.photo_url}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm text-gray-400 font-bold border border-gray-200">
                      {reg.first_name?.[0]}{reg.last_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0a1932' }}>
                      {reg.first_name} {reg.last_name}
                    </p>
                    {reg.organization && (
                      <p className="text-xs text-gray-400">{reg.organization}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">{reg.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[reg.status] || ''}`}>
                    {STATUS_LABELS[reg.status] || reg.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[reg.participant_type] || ''}`}>
                    {PARTICIPANT_TYPE_LABELS[reg.participant_type] || reg.participant_type}
                  </span>
                  {reg.session_choice && (
                    <span className="text-xs text-gray-400">{reg.session_choice.toUpperCase()}</span>
                  )}
                </div>
              </div>
              {/* Méta */}
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span>{reg.country}</span>
                <span>·</span>
                <span>{new Date(reg.created_at).toLocaleDateString('fr-FR')}</span>
                <span>·</span>
                <span className={reg.badge_sent ? 'text-green-600' : ''}>
                  {reg.badge_sent ? '✓ Badge envoyé' : 'Badge non envoyé'}
                </span>
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                {reg.status === 'pending' && (
                  <button
                    onClick={() => quickApprove(reg.id)}
                    disabled={actionLoading === reg.id}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
                  >
                    {actionLoading === reg.id ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle size={11} />}
                    Approuver
                  </button>
                )}
                <Link
                  href={`/admin/registrations/${reg.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold"
                  style={{ background: 'linear-gradient(135deg, #0a1932, #1e3a5f)', color: 'white' }}
                >
                  Gérer <ExternalLink size={11} />
                </Link>
                <button
                  onClick={() => setConfirmDeleteId(reg.id)}
                  disabled={deleteLoading === reg.id}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                  style={{ border: '1px solid #fee2e2' }}
                >
                  {deleteLoading === reg.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modale de confirmation suppression */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmDeleteId(null)}
          />
          {/* Dialog */}
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
                {data.find((r) => r.id === confirmDeleteId)?.first_name}{' '}
                {data.find((r) => r.id === confirmDeleteId)?.last_name}
              </span>{' '}
              ? Toutes ses données seront perdues définitivement.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteRegistration(confirmDeleteId)}
                disabled={deleteLoading === confirmDeleteId}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                {deleteLoading === confirmDeleteId
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Trash2 size={14} />}
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
