import CheckInScanner from '@/components/admin/CheckInScanner'

export const metadata = { title: 'Check-in – Admin' }

export default function CheckInPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0a1932' }}>Check-in QR Code</h1>
        <p className="text-gray-500 text-sm mt-1">
          Scannez les badges QR des participants à l'entrée ou entrez manuellement leur ID.
        </p>
      </div>
      <CheckInScanner />
    </div>
  )
}
