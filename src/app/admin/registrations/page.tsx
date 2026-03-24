export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import RegistrationsTable from '@/components/admin/RegistrationsTable'
import { Registration } from '@/types/registration'

export const metadata = { title: 'Inscriptions – Admin' }

export default async function RegistrationsPage() {
  const { data, count } = await supabaseAdmin
    .from('registrations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0a1932' }}>Inscriptions</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez et filtrez les participants inscrits.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid #e2e8f0' }}>
        <RegistrationsTable
          initialData={(data || []) as Registration[]}
          totalCount={(count as number) || 0}
        />
      </div>
    </div>
  )
}
