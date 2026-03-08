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
import { Search, Download, ExternalLink, Loader2, CheckCircle, RefreshCw } from 'lucide-react'
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
  visitor: 'bg-blue-100 text-blue-700',
  speaker: 'bg-purple-100 text-purple-700',
  press: 'bg-emerald-100 text-emerald-700',
  vip: 'bg-yellow-100 text-yellow-700',
  student: 'bg-cyan-100 text-cyan-700',
}

export default function RegistrationsTable({ initialData, totalCount }: Props) {
  const [data, setData] = useState<Registration[]>(initialData)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
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
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher nom, email, organisation..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvés</SelectItem>
            <SelectItem value="rejected">Rejetés</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={handleTypeFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="visitor">Visiteur</SelectItem>
            <SelectItem value="speaker">Intervenant</SelectItem>
            <SelectItem value="press">Presse</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="student">Étudiant</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => { fetchData(search, statusFilter, typeFilter); router.refresh() }}
          disabled={loading}
          className="flex items-center gap-2"
          title="Actualiser la liste"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2"
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          Exporter CSV
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-3">
        {data.length} résultat{data.length !== 1 ? 's' : ''} sur {totalCount} total
      </p>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: '#f8fafc' }}>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Participant</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Contact</TableHead>
              <TableHead className="font-semibold text-xs" style={{ color: '#0a1932' }}>Type</TableHead>
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
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#0a1932' }}>
                        {reg.first_name} {reg.last_name}
                      </p>
                      {reg.organization && (
                        <p className="text-xs text-gray-400">{reg.organization}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{reg.email}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[reg.participant_type] || ''}`}
                    >
                      {PARTICIPANT_TYPE_LABELS[reg.participant_type] || reg.participant_type}
                    </span>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
