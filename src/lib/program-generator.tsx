import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const FORUM_NAME = "Forum National de l'Entrepreneuriat"
const FORUM_DATE = '23 mars 2026'
const FORUM_LOCATION = 'Djibouti-Ville, République de Djibouti'

const PROGRAM = [
  {
    time: '08:00',
    title: 'Accueil & Enregistrement',
    type: 'Logistique',
    typeColor: '#10b981',
    typeBg: '#d1fae5',
    speaker: null,
    room: 'Hall principal',
    description: 'Accueil des 120 MSMEs leaders, remise des badges et petit-déjeuner de bienvenue.',
  },
  {
    time: '09:00',
    title: "Cérémonie d'ouverture officielle",
    type: 'Plénière',
    typeColor: '#1d4ed8',
    typeBg: '#dbeafe',
    speaker: 'MDENI · CLE · Union Européenne · Banque Mondiale',
    room: 'Grande Salle',
    description: "Discours d'ouverture du MDENI, du CLE et des représentants de l'UE et de la Banque Mondiale.",
  },
  {
    time: '10:00',
    title: 'Présentation des 120 MSMEs leaders du programme EDQ',
    type: 'Plénière',
    typeColor: '#1d4ed8',
    typeBg: '#dbeafe',
    speaker: 'CLE — Équipe EDQ',
    room: 'Grande Salle',
    description: 'Mise en lumière des 120 entreprises sélectionnées parmi les 200 MSMEs accompagnées dans les 5 régions.',
  },
  {
    time: '11:30',
    title: 'Caravane G2B — Guichet unique de formalisation',
    type: 'Atelier',
    typeColor: '#15803d',
    typeBg: '#dcfce7',
    speaker: 'MDENI · REDA · CJEO Obock · Dumar iyo Dadal · CJED',
    room: 'Espace G2B',
    description: 'Sessions pratiques de formalisation des MSMEs avec les partenaires territoriaux.',
  },
  {
    time: '13:00',
    title: 'Déjeuner & Networking',
    type: 'Pause',
    typeColor: '#475569',
    typeBg: '#f1f5f9',
    speaker: null,
    room: 'Restaurant',
    description: 'Networking entre MSMEs, institutions financières et partenaires institutionnels.',
  },
  {
    time: '14:30',
    title: 'Panel : Inclusion financière & accès au crédit',
    type: 'Table ronde',
    typeColor: '#7c3aed',
    typeBg: '#f3e8ff',
    speaker: 'Banque Mondiale · Banques partenaires · CLE',
    room: 'Grande Salle',
    description: 'Mécanismes de financement adaptés aux MSMEs : microcrédit, garanties, fonds d\'investissement.',
  },
  {
    time: '16:00',
    title: 'Signature des conventions bancaires',
    type: 'Gala',
    typeColor: '#854d0e',
    typeBg: '#fef9c3',
    speaker: 'CLE · Banques partenaires',
    room: 'Grande Salle',
    description: 'Signature officielle des conventions entre le CLE et les banques partenaires pour l\'accès au crédit EDQ.',
  },
  {
    time: '17:30',
    title: 'Remise des prix & Clôture officielle',
    type: 'Plénière',
    typeColor: '#1d4ed8',
    typeBg: '#dbeafe',
    speaker: 'MDENI · CLE · UE · BM',
    room: 'Grande Salle',
    description: 'Remise des prix aux MSMEs les plus performantes, discours de clôture et photo officielle.',
  },
]

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingBottom: 60,
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: '#0a1932',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  headerLabel: {
    color: '#d4af37',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 9,
    textAlign: 'center',
  },
  goldLine: {
    height: 3,
    backgroundColor: '#d4af37',
    width: '100%',
  },

  // ── Section title ────────────────────────────────────────────
  sectionWrapper: {
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 6,
  },
  sectionTag: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#b8960c',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: '#0a1932',
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 16,
  },

  // ── Table header ─────────────────────────────────────────────
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#e2e8f0',
    paddingVertical: 7,
    paddingHorizontal: 40,
  },
  thTime: { width: 52, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  thSession: { flex: 1, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  thType: { width: 72, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'right' },

  // ── Row ───────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'flex-start',
  },
  rowAlt: {
    backgroundColor: '#fafafa',
  },

  // Colonne heure
  timeBadge: {
    width: 44,
    backgroundColor: '#0a1932',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginTop: 1,
    marginRight: 8,
  },
  timeText: {
    color: '#d4af37',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },

  // Colonne session
  sessionCol: {
    flex: 1,
    paddingRight: 10,
  },
  sessionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0a1932',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  sessionMeta: {
    fontSize: 8,
    color: '#94a3b8',
    marginBottom: 1,
  },
  sessionSpeaker: {
    fontSize: 8,
    color: '#475569',
    fontFamily: 'Helvetica-Oblique',
  },
  sessionDesc: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 3,
    lineHeight: 1.4,
  },

  // Colonne type
  typeCol: {
    width: 72,
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  typePill: {
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  typeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a1932',
    paddingVertical: 14,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    color: '#d4af37',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  footerRight: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 7,
  },
  footerNote: {
    paddingHorizontal: 40,
    paddingBottom: 70,
    paddingTop: 10,
  },
  footerNoteText: {
    fontSize: 7,
    color: '#cbd5e1',
    textAlign: 'center',
    fontFamily: 'Helvetica-Oblique',
  },
})

function ProgramDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Programme officiel</Text>
          <Text style={styles.headerTitle}>{FORUM_NAME}</Text>
          <Text style={styles.headerSub}>{FORUM_DATE} · {FORUM_LOCATION}</Text>
        </View>
        <View style={styles.goldLine} />

        {/* ── Section title ── */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTag}>Agenda</Text>
          <Text style={styles.sectionTitle}>Programme de la journée</Text>
          <Text style={styles.sectionSub}>{FORUM_DATE} — Les horaires sont donnés à titre indicatif et peuvent être modifiés.</Text>
        </View>

        {/* ── Table header ── */}
        <View style={styles.tableHeader}>
          <Text style={styles.thTime}>Heure</Text>
          <Text style={styles.thSession}>Session</Text>
          <Text style={styles.thType}>Type</Text>
        </View>

        {/* ── Rows ── */}
        {PROGRAM.map((item, i) => (
          <View key={item.time} style={[styles.row, i % 2 !== 0 ? styles.rowAlt : {}]} wrap={false}>

            {/* Heure */}
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            {/* Session */}
            <View style={styles.sessionCol}>
              <Text style={styles.sessionTitle}>{item.title}</Text>
              <Text style={styles.sessionMeta}>📍 {item.room}</Text>
              {item.speaker && (
                <Text style={styles.sessionSpeaker}>🎤 {item.speaker}</Text>
              )}
              <Text style={styles.sessionDesc}>{item.description}</Text>
            </View>

            {/* Type */}
            <View style={styles.typeCol}>
              <View style={[styles.typePill, { backgroundColor: item.typeBg }]}>
                <Text style={[styles.typeText, { color: item.typeColor }]}>{item.type}</Text>
              </View>
            </View>

          </View>
        ))}

        {/* Note de bas de page */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            * Ce programme est susceptible de modifications. Consultez le site officiel pour les dernières mises à jour.
          </Text>
        </View>

        {/* ── Footer fixe ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>{FORUM_NAME}</Text>
          <Text style={styles.footerRight}>{FORUM_DATE} · {FORUM_LOCATION}</Text>
        </View>

      </Page>
    </Document>
  )
}

export async function generateProgramPDF(): Promise<Buffer> {
  const buffer = await renderToBuffer(<ProgramDocument />)
  return Buffer.from(buffer)
}
