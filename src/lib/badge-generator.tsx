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
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#d4af37',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 9,
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#ffffff',
  },
  photoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    border: '2px solid #d4af37',
    objectFit: 'cover',
  },
  photoInitials: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #d4af37',
  },
  photoInitialsText: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#0a1932',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  jobTitle: {
    fontSize: 9,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 2,
  },
  organization: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 2,
  },
  country: {
    fontSize: 8,
    color: '#b8960c',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    width: '100%',
    marginBottom: 10,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 6,
  },
  qrImage: {
    width: 72,
    height: 72,
    marginBottom: 4,
  },
  qrLabel: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#0a1932',
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerDate: {
    color: '#d4af37',
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
  footerLocation: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 6,
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
      <Page size={[297, 420]} style={styles.page} wrap={false}>
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

          {/* Photo de profil ou initiales */}
          {registration.photo_url ? (
            <Image src={registration.photo_url} style={styles.photoCircle} />
          ) : (
            <View style={[styles.photoInitials, { backgroundColor: typeColor }]}>
              <Text style={styles.photoInitialsText}>
                {registration.first_name[0]}{registration.last_name[0]}
              </Text>
            </View>
          )}

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
