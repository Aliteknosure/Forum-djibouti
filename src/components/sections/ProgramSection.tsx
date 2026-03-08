'use client'

const program = [
  {
    time: '08:00',
    title: 'Accueil & Enregistrement',
    type: 'logistique',
    speaker: null,
    room: 'Hall principal',
    description: 'Accueil des 120 MSMEs leaders, remise des badges et petit-déjeuner de bienvenue.',
  },
  {
    time: '09:00',
    title: 'Cérémonie d\'ouverture officielle',
    type: 'plénière',
    speaker: 'MDENI · CLE · Union Européenne · Banque Mondiale',
    room: 'Grande Salle',
    description: 'Discours d\'ouverture du Ministère de l\'Entreprise (MDENI), du CLE, et des représentants de l\'UE et de la Banque Mondiale.',
  },
  {
    time: '10:00',
    title: 'Présentation des 120 MSMEs leaders du programme EDQ',
    type: 'plénière',
    speaker: 'CLE — Équipe EDQ',
    room: 'Grande Salle',
    description: 'Mise en lumière des 120 entreprises sélectionnées parmi les 200 MSMEs accompagnées dans les 5 régions, dont 50 % dirigées par des femmes.',
  },
  {
    time: '11:30',
    title: 'Caravane G2B — Guichet unique de formalisation',
    type: 'atelier',
    speaker: 'MDENI · REDA · CJEO Obock · Dumar iyo Dadal · CJED',
    room: 'Espace G2B',
    description: 'Sessions pratiques de formalisation des MSMEs avec les partenaires territoriaux. Dépôt de dossiers, orientation juridique et administrative en direct.',
  },
  {
    time: '13:00',
    title: 'Déjeuner & Networking',
    type: 'pause',
    speaker: null,
    room: 'Restaurant',
    description: 'Moment de networking entre MSMEs, institutions financières et partenaires institutionnels.',
  },
  {
    time: '14:30',
    title: 'Panel : Inclusion financière & accès au crédit',
    type: 'table-ronde',
    speaker: 'Banque Mondiale · Banques partenaires · CLE',
    room: 'Grande Salle',
    description: 'Table ronde sur les mécanismes de financement adaptés aux MSMEs : microcrédit, garanties, fonds d\'investissement et nouvelles solutions financières.',
  },
  {
    time: '16:00',
    title: 'Signature des conventions bancaires',
    type: 'gala',
    speaker: 'CLE · Banques partenaires',
    room: 'Grande Salle',
    description: 'Signature officielle des conventions entre le CLE et les banques partenaires pour faciliter l\'accès au crédit des MSMEs bénéficiaires du programme EDQ.',
  },
  {
    time: '17:30',
    title: 'Remise des prix & Clôture officielle',
    type: 'plénière',
    speaker: 'MDENI · CLE · UE · BM',
    room: 'Grande Salle',
    description: 'Remise des prix aux MSMEs les plus performantes, discours de clôture et photo officielle.',
  },
]

const typeColors: Record<string, { bg: string; text: string; dot: string }> = {
  plénière: { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
  'table-ronde': { bg: '#f3e8ff', text: '#7c3aed', dot: '#8b5cf6' },
  atelier: { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' },
  conférence: { bg: '#ffedd5', text: '#c2410c', dot: '#f97316' },
  pause: { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
  logistique: { bg: '#ecfdf5', text: '#065f46', dot: '#10b981' },
  gala: { bg: '#fef9c3', text: '#854d0e', dot: '#d4af37' },
}

export default function ProgramSection() {
  return (
    <section id="program" style={{ backgroundColor: '#f8fafc' }} className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Agenda
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
            Programme du Forum
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Une journée intense dédiée à la formalisation, au financement et au networking 
            des MSMEs — de l&apos;ouverture officielle à la signature des conventions bancaires.
          </p>
          <p className="font-semibold mt-2" style={{ color: '#b8960c' }}>
            📅 Dimanche 23 mars 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {program.map((item, index) => {
            const colors = typeColors[item.type] || typeColors.conférence
            return (
              <div key={index} className="flex gap-4 sm:gap-6 mb-6 group">
                {/* Time */}
                <div className="w-16 sm:w-20 shrink-0 text-right">
                  <span className="text-sm font-bold" style={{ color: '#0a1932' }}>{item.time}</span>
                </div>

                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0 z-10"
                    style={{ backgroundColor: colors.dot }}
                  />
                  {index < program.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#e2e8f0', minHeight: '20px' }} />
                  )}
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl p-4 sm:p-5 mb-2 transition-all duration-200 group-hover:shadow-md"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: '#0a1932' }}>
                      {item.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0 capitalize"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    {item.speaker && (
                      <span className="flex items-center gap-1">
                        🎤 {item.speaker}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      📍 {item.room}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
