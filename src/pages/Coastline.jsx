// src/pages/Coastline.jsx
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import '../styles/coastline.css'

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const beaches = [
  {
    id:      'berbera',
    number:  '01',
    name:    'Berbera',
    region:  'Somaliland',
    accent:  '#4189DD',
    tagline: 'Where the Gulf of Aden meets silence.',
    body: [
      "Berbera's coastline stretches in a long, unhurried arc — white-sand beaches backed by craggy limestone hills, the water shifting from pale turquoise near the shore to a deep cobalt offshore. It was once one of the most strategically important ports on the Horn of Africa.",
      "The old Ottoman quarter still stands near the waterfront — coral-block houses with ornate wooden doors, narrow lanes that open suddenly onto the sea. In the evenings, families gather on the beach as the temperature finally drops and the Gulf softens to copper.",
      "Diving and snorkelling here is exceptional. The reef system along the Berbera coast is largely untouched — manta rays, hawksbill turtles, and schools of barracuda in water clear enough to see thirty metres down.",
    ],
    stats: [
      { label: 'Coastline', value: '856 km' },
      { label: 'Water temp', value: '28 °C' },
      { label: 'Best season', value: 'Oct – Apr' },
    ],
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop&q=85',
    imgAlt: 'Turquoise coastline with white sand beach',
  },
  {
    id:      'lido',
    number:  '02',
    name:    'Lido Beach',
    region:  'Mogadishu',
    accent:  '#C17A2A',
    tagline: "The city's heartbeat washes up on shore.",
    body: [
      "Lido Beach is Mogadishu's living room — a crescent of sand running along the Indian Ocean where the city comes to exhale. On weekends it fills with families, football games, vendors selling camel milk and fresh fish, the smell of grilling meat drifting across the sand.",
      "The ocean here has a particular quality in the late afternoon: the light comes in low and amber, turning the water the colour of old brass, silhouetting the fishing dhows heading back to harbour with their catch.",
      "The city's recovery is visible here before anywhere else. New restaurants and beach clubs have opened along the corniche, attracting a young, outward-looking crowd. Lido is where Mogadishu's future is being imagined, one Friday afternoon at a time.",
    ],
    stats: [
      { label: 'Length', value: '4.2 km' },
      { label: 'Wave height', value: '0.5 – 1.5 m' },
      { label: 'Character', value: 'Urban' },
    ],
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&auto=format&fit=crop&q=85',
    imgAlt: 'Warm golden beach with gentle waves',
  },
  {
    id:      'kismayo',
    number:  '03',
    name:    'Kismayo',
    region:  'Jubaland',
    accent:  '#5C7A4E',
    tagline: 'Where three rivers meet the Indian Ocean.',
    body: [
      "Kismayo sits at the mouth of the Jubba River valley, where the river's fresh water bleeds into the Indian Ocean and creates one of the most biodiverse coastal ecosystems in the region. The shoreline here is wilder — mangrove forests, tidal flats, and long deserted stretches of beach that see almost no visitors.",
      "The port has historically been one of East Africa's most important, handling the export of livestock, charcoal, and agricultural produce from the interior. The dhow traffic is constant — traditional wooden vessels making journeys that have been made for over a thousand years.",
      "Offshore, the waters are extraordinarily rich. Kismayo's continental shelf is broad and shallow, supporting massive populations of tuna, kingfish, and lobster — a fishery that is only beginning to be understood.",
    ],
    stats: [
      { label: 'Marine zone', value: '200 nm EEZ' },
      { label: 'Fish species', value: '300+' },
      { label: 'Dhow routes', value: 'Gulf & India' },
    ],
    img: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1400&auto=format&fit=crop&q=85',
    imgAlt: 'Wild coastline with mangroves and calm blue water',
  },
  {
    id:      'bosaso',
    number:  '04',
    name:    'Bosaso',
    region:  'Puntland',
    accent:  '#8B5E3C',
    tagline: 'Ancient trade winds still fill these sails.',
    body: [
      "Bosaso is Puntland's commercial capital and the gateway to the Gulf of Aden. The town sprawls across a narrow coastal plain between the sea and the steep escarpment of the Karkaar mountains — a dramatic backdrop that turns purple at dusk while the harbour glitters below.",
      "This was part of the ancient Land of Punt, the source of frankincense and myrrh that Egyptian pharaohs sent expeditions to acquire. The trade routes haven't entirely disappeared — dhows still cross to Yemen and Oman, carrying goods and passengers as they have for three millennia.",
      "The beaches north of the city — reached by a coastal track that winds through fishing villages — are extraordinary: broad, wind-sculpted, and completely empty. The Gulf water here is warm, clear, and barely explored by outsiders.",
    ],
    stats: [
      { label: 'History', value: '3,000 yrs' },
      { label: 'Port traffic', value: 'Gulf–India' },
      { label: 'Altitude', value: 'Sea level' },
    ],
    img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&auto=format&fit=crop&q=85',
    imgAlt: 'Dramatic coastline with mountains meeting the sea',
  },
]

/* ══════════════════════════════════════════
   ACCORDION PANEL
══════════════════════════════════════════ */
function BeachPanel({ beach, isActive, onClick, index }) {
  const panelRef = useRef(null)

  return (
    <motion.div
      ref={panelRef}
      className={`beach-panel ${isActive ? 'beach-panel--active' : ''}`}
      style={{ '--panel-accent': beach.accent }}
      layout
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Collapsed tab (always visible) ── */}
      <button
        className="beach-panel__tab"
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`panel-body-${beach.id}`}
      >
        <span className="beach-panel__tab-number eyebrow">{beach.number}</span>
        <span className="beach-panel__tab-name display">{beach.name}</span>
        <span className="beach-panel__tab-region eyebrow">{beach.region}</span>
        <span className="beach-panel__tab-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* ── Expanded body ── */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`panel-body-${beach.id}`}
            className="beach-panel__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="beach-panel__inner">
              {/* Left: text */}
              <div className="beach-panel__text">
                <motion.p
                  className="beach-panel__tagline display"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {beach.tagline}
                </motion.p>

                <div className="beach-panel__paras">
                  {beach.body.map((para, i) => (
                    <motion.p
                      key={i}
                      className="beach-panel__para"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Stats strip */}
                <motion.div
                  className="beach-panel__stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  {beach.stats.map((s) => (
                    <div key={s.label} className="beach-stat">
                      <span className="beach-stat__value display">{s.value}</span>
                      <span className="beach-stat__label eyebrow">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: image */}
              <motion.div
                className="beach-panel__media"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={beach.img}
                  alt={beach.imgAlt}
                  className="beach-panel__img"
                  loading="lazy"
                />
                <div className="beach-panel__img-overlay" />
                {/* Ghost number */}
                <span
                  className="beach-panel__ghost-num display"
                  aria-hidden="true"
                >
                  {beach.number}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   COASTLINE PAGE
══════════════════════════════════════════ */
export default function Coastline() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = useCallback((i) => {
    setActiveIndex(prev => prev === i ? -1 : i)
  }, [])

  /* Keyboard: arrow up/down to navigate panels */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') setActiveIndex(i => Math.min(i + 1, beaches.length - 1))
      if (e.key === 'ArrowUp')   setActiveIndex(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="coastline">

      {/* ── Page header ── */}
      <section className="coastline-header">
        <div className="coastline-header__inner container">
          <div className="coastline-header__text">
            <motion.span
              className="eyebrow coastline-header__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Coastline
            </motion.span>

            <motion.h1
              className="coastline-header__title display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              3,333 kilometres<br />of sea.
            </motion.h1>

            <motion.p
              className="coastline-header__body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              Somalia holds the longest coastline in mainland Africa — from the Gulf of
              Aden in the north to the Indian Ocean shores of Jubaland in the south.
              Four places to begin.
            </motion.p>
          </div>

          {/* Animated wave line */}
          <motion.div
            className="coastline-header__wave"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 600 80" fill="none" preserveAspectRatio="none">
              <path
                d="M0 40 C60 10, 120 70, 180 40 S300 10, 360 40 S480 70, 540 40 S600 10, 600 40"
                stroke="var(--blue)"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                fill="none"
              />
              <path
                d="M0 55 C80 25, 160 80, 240 50 S380 20, 460 55 S560 80, 600 50"
                stroke="var(--brown)"
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        {/* Scrolling stat ticker */}
        <div className="coastline-ticker" aria-hidden="true">
          <div className="coastline-ticker__track">
            {[...Array(3)].flatMap((_, rep) =>
              ['3,333 km of coast', 'Gulf of Aden', 'Indian Ocean', 'Longest in mainland Africa', 'Horn of Africa', 'Ancient trade routes']
                .map((item, i) => (
                  <span key={`${rep}-${i}`} className="coastline-ticker__item eyebrow">
                    {item}
                    <span className="coastline-ticker__sep" aria-hidden="true">·</span>
                  </span>
                ))
            )}
          </div>
        </div>
      </section>

      {/* ── Accordion beaches ── */}
      <section className="coastline-accordion section container" aria-label="Coastal destinations">
        <div className="coastline-accordion__hint eyebrow" aria-hidden="true">
          Select a coast to explore
        </div>

        <div className="coastline-accordion__list">
          {beaches.map((beach, i) => (
            <BeachPanel
              key={beach.id}
              beach={beach}
              index={i}
              isActive={activeIndex === i}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
      </section>

      {/* ── Closing editorial strip ── */}
      <section className="coastline-close">
        <div className="container">
          <motion.div
            className="coastline-close__inner"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="coastline-close__mark display" aria-hidden="true">"</span>
            <blockquote className="coastline-close__quote display">
              The sea is the same sea. What changes is the shore you stand on.
            </blockquote>
            <p className="eyebrow coastline-close__attr">— Somali coastal proverb</p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}