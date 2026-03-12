import { renderToBuffer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { generateQRCodeDataURL } from './qrcode'
import { Registration, PARTICIPANT_TYPE_LABELS, PARTICIPANT_TYPE_COLORS } from '@/types/registration'

const FORUM_NAME = "Forum BOOST Entrepreneurship"
const FORUM_DATE = '29 mars – 1 avril 2026'
const FORUM_LOCATION = 'Djibouti-Ville, République de Djibouti'

const styles = StyleSheet.create({
  page: {
    width: 297,
    height: 420,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#0a1932',
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#d4af37',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  goldDivider: {
    height: 3,
    backgroundColor: '#d4af37',
    width: '100%',
  },
  body: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  typeText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#ffffff',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#0a1932',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  jobTitle: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 3,
  },
  organization: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 4,
  },
  country: {
    fontSize: 9,
    color: '#b8960c',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    width: '100%',
    marginBottom: 20,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrImage: {
    width: 80,
    height: 80,
    marginBottom: 6,
  },
  qrLabel: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#0a1932',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerDate: {
    color: '#d4af37',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  footerLocation: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 7,
  },
  idText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 6,
  },
})

function BadgeDocument({
  registration,
  qrDataUrl,
}: {
  registration: Registration
  qrDataUrl: string
}) {
  const typeLabel = PARTICIPANT_TYPE_LABELS[registration.participant_type] || registration.participant_type
  const typeColor = PARTICIPANT_TYPE_COLORS[registration.participant_type] || '#3b82f6'
  const fullName = `${registration.first_name} ${registration.last_name}`

  return (
    <Document>
      <Page size={[297, 420]} style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{FORUM_NAME}</Text>
          <Text style={styles.headerSubtitle}>{FORUM_DATE} · {FORUM_LOCATION}</Text>
        </View>
        <View style={styles.goldDivider} />

        {/* Corps */}
        <View style={styles.body}>
          {/* Type badge */}
          <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
            <Text style={styles.typeText}>{typeLabel}</Text>
          </View>

          {/* Nom */}
          <Text style={styles.name}>{fullName}</Text>

          {/* Job title */}
          {registration.job_title && (
            <Text style={styles.jobTitle}>{registration.job_title}</Text>
          )}

          {/* Organisation */}
          {registration.organization && (
            <Text style={styles.organization}>{registration.organization}</Text>
          )}

          {/* Pays */}
          <Text style={styles.country}>{registration.country}</Text>

          <View style={styles.divider} />

          {/* QR Code */}
          <View style={styles.qrSection}>
            <Image src={qrDataUrl} style={styles.qrImage} />
            <Text style={styles.qrLabel}>Présentez ce QR code à l'entrée</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerDate}>{FORUM_DATE}</Text>
            <Text style={styles.footerLocation}>Djibouti-Ville</Text>
          </View>
          <Text style={styles.idText}>#{registration.id.substring(0, 8).toUpperCase()}</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generateBadgePDF(registration: Registration): Promise<Buffer> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://forum-djibouti.onrender.com'
  const qrData = `${appUrl}/checkin?id=${registration.id}`
  const qrDataUrl = await generateQRCodeDataURL(qrData)

  const buffer = await renderToBuffer(
    <BadgeDocument registration={registration} qrDataUrl={qrDataUrl} />
  )

  return Buffer.from(buffer)
}
