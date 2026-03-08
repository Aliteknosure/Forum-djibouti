export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import RegistrationDetail from '@/components/admin/RegistrationDetail'
import { notFound, redirect } from 'next/navigation'
import { Registration } from '@/types/registration'

export const metadata = { title: 'Détail inscription – Admin' }

export default async function RegistrationDetailPage({ params }: { params: { id: string } }) {
  // Valider que l'ID ressemble à un UUID valide
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(params.id)) {
    redirect('/admin/registrations')
  }

  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  // Si l'inscription n'existe pas (supprimée ou ID invalide), retour à la liste
  if (error || !data) {
    redirect('/admin/registrations')
  }

  return <RegistrationDetail registration={data as Registration} />
}
