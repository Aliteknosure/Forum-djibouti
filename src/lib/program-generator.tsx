import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const FORUM_NAME = "Forum BOOST Entrepreneurship"
const FORUM_DATE = '29 – 31 mars 2026'
const FORUM_LOCATION = 'Djibouti-Ville, République de Djibouti'

const DAYS = [
  {
    label: 'Jour 1',
    date: 'Samedi 29 mars 2026',
    sessions: [
      {
        time: '08:30',
        title: 'Accueil & Enregistrement',
        type: 'Logistique',
        typeColor: '#10b981',
        typeBg: '#d1fae5',
        speaker: null,
        description: 'Accueil des participants, remise des badges.',
      },
      {
        time: '09:30',
        title: "Cérémonie d'ouverture officielle",
        type: 'Plénière',
        typeColor: '#1d4ed8',
        typeBg: '#dbeafe',
        speaker: 'MDENI · CLE · Partenaires',
        description: "Discours d'ouverture et présentation du Forum BOOST.",
      },
      {
        time: '10:30',
        title: 'Tell Me Your Story — Pitches MSMEs',
        type: 'Pitch',
        typeColor: '#7c3aed',
        typeBg: '#f3e8ff',
        speaker: 'MSMEs EDQ',
        description: "Présentation des parcours des 120 MSMEs leaders du programme EDQ face aux partenaires institutionnels et financiers.",
      },
      {
        time: '13:00',
        title: 'Déjeuner & Networking',
        type: 'Pause',
        typeColor: '#475569',
        typeBg: '#f1f5f9',
        speaker: null,
        description: 'Networking entre MSMEs, institutions et partenaires.',
      },
      {
        time: '14:30',
        title: 'Caravane G2B — Guichet unique de formalisation',
        type: 'Atelier',
        typeColor: '#15803d',
        typeBg: '#dcfce7',
        speaker: 'MDENI · REDA · CJEO Obock · Dumar iyo Dadal · CJED',
        description: 'Sessions pratiques de formalisation des MSMEs avec les partenaires territoriaux.',
      },
      {
        time: '17:00',
        title: 'Clôture Jour 1',
        type: 'Plénière',
        typeColor: '#1d4ed8',
        typeBg: '#dbeafe',
        speaker: null,
        description: 'Récapitulatif de la journée et annonces du lendemain.',
      },
    ],
  },
  {
    label: 'Jour 2',
    date: 'Dimanche 30 mars 2026',
    sessions: [
      {
        time: '09:00',
        title: 'Panel : Startup Act — Cadre légal & Accélération',
        type: 'Panel',
        typeColor: '#7c3aed',
        typeBg: '#f3e8ff',
        speaker: 'MDENI · Juristes · Entrepreneurs',
        description: "Décryptage du cadre légal Startup Act : avantages fiscaux, simplification administrative et accès aux marchés publics.",
      },
      {
        time: '11:00',
        title: 'Panel : Cloud & Transformation Digitale',
        type: 'Panel',
        typeColor: '#0891b2',
        typeBg: '#cffafe',
        speaker: 'Experts Tech · Opérateurs télécoms · Startups',
        description: "Comment les MSMEs de Djibouti peuvent tirer parti du cloud, de l'IA et de la transformation numérique.",
      },
      {
        time: '13:00',
        title: 'Déjeuner & Networking',
        type: 'Pause',
        typeColor: '#475569',
        typeBg: '#f1f5f9',
        speaker: null,
        description: 'Networking entre MSMEs, institutions et partenaires.',
      },
      {
        time: '14:30',
        title: 'Atelier Pitch — Présentation face aux investisseurs',
        type: 'Atelier',
        typeColor: '#15803d',
        typeBg: '#dcfce7',
        speaker: 'MSMEs sélectionnées · Investisseurs · Jury',
        description: 'Les MSMEs sélectionnées pitchent leur projet face à un panel d\'investisseurs et partenaires financiers.',
      },
      {
        time: '16:30',
        title: 'OpenHour FLOODOO — Innovation & Échange libre',
        type: 'OpenHour',
        typeColor: '#d97706',
        typeBg: '#fef3c7',
        speaker: 'Écosystème startup · Communauté FLOODOO',
        description: 'Session ouverte d\'échanges, de networking informel et de présentation des projets innovants de la communauté.',
      },
    ],
  },
  {
    label: 'Jour 3',
    date: 'Lundi 31 mars 2026',
    sessions: [
      {
        time: '09:00',
        title: "Panel : Entrepreneuriat Féminin",
        type: 'Panel',
        typeColor: '#db2777',
        typeBg: '#fce7f3',
        speaker: 'Femmes entrepreneures · MWAD · Partenaires',
        description: "Levée des obstacles à l'entrepreneuriat féminin à Djibouti : financement, formation, réseaux et success stories.",
      },
      {
        time: '10:45',
        title: 'Panel : FinTech & Inclusion Financière',
        type: 'Panel',
        typeColor: '#1d4ed8',
        typeBg: '#dbeafe',
        speaker: 'Banques · Fintechs · Banque Mondiale',
        description: "Solutions fintech adaptées aux MSMEs djiboutiennes : mobile money, microcrédit digital, assurance inclusive.",
      },
      {
        time: '13:00',
        title: 'Déjeuner & Networking',
        type: 'Pause',
        typeColor: '#475569',
        typeBg: '#f1f5f9',
        speaker: null,
        description: 'Networking entre participants.',
      },
      {
        time: '14:30',
        title: 'Panel : E-Commerce & Marchés Régionaux',
        type: 'Panel',
        typeColor: '#15803d',
        typeBg: '#dcfce7',
        speaker: 'Plateformes e-commerce · Logisticiens · Exportateurs',
        description: "Opportunités e-commerce pour les MSMEs djiboutiennes : plateformes régionales, logistique transfrontalière, marchés COMESA.",
      },
      {
        time: '16:30',
        title: 'Signature des conventions & Remise des prix',
        type: 'Gala',
        typeColor: '#854d0e',
        typeBg: '#fef9c3',
        speaker: 'CLE · Banques partenaires · MDENI',
        description: "Signature officielle des conventions bancaires et remise des prix aux MSMEs les plus performantes.",
      },
      {
        time: '17:30',
        title: 'Cérémonie de clôture officielle',
        type: 'Plénière',
        typeColor: '#1d4ed8',
        typeBg: '#dbeafe',
        speaker: 'MDENI · CLE · Partenaires',
        description: "Discours de clôture, photo officielle et annonce des prochaines étapes du programme EDQ.",
      },
    ],
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
      {DAYS.map((day) => (
        <Page key={day.label} size="A4" style={styles.page}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Programme officiel</Text>
            <Text style={styles.headerTitle}>{FORUM_NAME}</Text>
            <Text style={styles.headerSub}>{FORUM_DATE} · {FORUM_LOCATION}</Text>
          </View>
          <View style={styles.goldLine} />

          {/* ── Section title ── */}
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTag}>{day.label}</Text>
            <Text style={styles.sectionTitle}>{day.date}</Text>
            <Text style={styles.sectionSub}>Les horaires sont donnés à titre indicatif et peuvent être modifiés.</Text>
          </View>

          {/* ── Table header ── */}
          <View style={styles.tableHeader}>
            <Text style={styles.thTime}>Heure</Text>
            <Text style={styles.thSession}>Session</Text>
            <Text style={styles.thType}>Type</Text>
          </View>

          {/* ── Rows ── */}
          {day.sessions.map((item, i) => (
            <View key={item.time} style={[styles.row, i % 2 !== 0 ? styles.rowAlt : {}]} wrap={false}>

              {/* Heure */}
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              {/* Session */}
              <View style={styles.sessionCol}>
                <Text style={styles.sessionTitle}>{item.title}</Text>
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
            <Text style={styles.footerRight}>{day.date} · {FORUM_LOCATION}</Text>
          </View>

        </Page>
      ))}
    </Document>
  )
}

export async function generateProgramPDF(): Promise<Buffer> {
  const buffer = await renderToBuffer(<ProgramDocument />)
  return Buffer.from(buffer)
}
