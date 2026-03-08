'use client'

const speakers = [
  {
    name: 'CLE',
    title: 'Centre de Leadership et d\'Entrepreneuriat',
    org: 'Organisateur du Forum & du programme EDQ',
    country: '�� Djibouti',
    bio: 'Le CLE accompagne depuis plusieurs années les micro, petites et moyennes entreprises à travers tout le territoire djiboutien. Porteur du programme Entrepreneurs de Quartier (EDQ), financé par l\'UE et la Banque Mondiale.',
    topic: 'Programme EDQ & organisation du Forum',
    avatar: 'CLE',
    color: '#d4af37',
  },
  {
    name: 'MDENI',
    title: 'Ministère des Entreprises',
    org: 'Min. du Développement de l\'Entreprise, du Numérique et de l\'Innovation',
    country: '🇩🇯 Djibouti',
    bio: 'Partenaire institutionnel principal du Forum, le MDENI co-organise la Caravane G2B et préside la cérémonie d\'ouverture officielle.',
    topic: 'Caravane G2B & formalisation des MSMEs',
    avatar: 'MDN',
    color: '#3b82f6',
  },
  {
    name: 'Banque Mondiale',
    title: 'Institution internationale',
    org: 'World Bank Group — Bureau de Djibouti',
    country: '� International',
    bio: 'Co-financeur du programme EDQ, la Banque Mondiale anime le panel sur l\'inclusion financière et l\'accès au crédit pour les MSMEs djiboutiennes.',
    topic: 'Inclusion financière & accès au crédit',
    avatar: 'BM',
    color: '#10b981',
  },
  {
    name: 'Union Européenne',
    title: 'Institution internationale',
    org: 'Délégation de l\'UE en République de Djibouti',
    country: '�� Union Européenne',
    bio: 'Principal bailleur de fonds du programme EDQ, l\'Union Européenne soutient le développement du secteur privé, l\'autonomisation des femmes entrepreneures et l\'intégration régionale.',
    topic: 'Financement & développement du secteur privé',
    avatar: 'UE',
    color: '#003399',
  },
  {
    name: 'REDA',
    title: 'Agence régionale de développement',
    org: 'Regional Economic Development Agency',
    country: '�� Djibouti',
    bio: 'Partenaire territorial clé, REDA accompagne les MSMEs dans les régions et co-anime les guichets de formalisation lors de la Caravane G2B.',
    topic: 'Développement économique régional',
    avatar: 'REDA',
    color: '#8b5cf6',
  },
  {
    name: 'Partenaires territoriaux',
    title: 'CJEO Obock · Dumar iyo Dadal · CJED',
    org: 'Chambres et organisations économiques locales',
    country: 'Djibouti',
    bio: 'Les organisations économiques territoriales accompagnent les MSMEs sur le terrain dans les 5 régions : Obock, Tadjourah, Dikhil, Ali Sabieh et Djibouti-ville.',
    topic: 'Accompagnement territorial des MSMEs',
    avatar: 'TER',
    color: '#f59e0b',
  },
]

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#b8960c', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Institutions & Partenaires
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1932' }}>
            Les acteurs du
            <span style={{ color: '#b8960c' }}> Forum National</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Institutions nationales, bailleurs de fonds internationaux et partenaires territoriaux 
            réunis pour transformer l&apos;entrepreneuriat de quartier en levier de croissance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              style={{ border: '1px solid #e2e8f0', background: 'white' }}
            >
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${speaker.color}, ${speaker.color}88)` }}
                >
                  {speaker.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm" style={{ color: '#0a1932' }}>{speaker.name}</h3>
                  <p className="text-gray-500 text-xs truncate">{speaker.title}</p>
                  <p className="text-xs truncate" style={{ color: speaker.color }}>{speaker.org}</p>
                </div>
              </div>

              {/* Country */}
              <div className="text-xs mb-3 text-gray-400">{speaker.country}</div>

              {/* Bio */}
              <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3">{speaker.bio}</p>

              {/* Topic */}
              <div
                className="rounded-lg px-3 py-2 text-xs"
                style={{ backgroundColor: `${speaker.color}11`, border: `1px solid ${speaker.color}33`, color: speaker.color }}
              >
                🎤 {speaker.topic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

