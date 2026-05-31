// src/pages/Wildlife.jsx
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import '../styles/wildlife.css'

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const categories = [
  {
    id:     'marine',
    label:  'Marine Life',
    eyebrow: 'Indian Ocean · Gulf of Aden',
    accent: '#4189DD',
    intro:  `Below the surface of Somalia's 3,333 km coastline lies one of the least-documented marine ecosystems on the planet — largely untouched, extraordinarily rich.`,
    cards: [
      {
        id:      'whale-shark',
        name:    'Whale Shark',
        latin:   'Rhincodon typus',
        status:  'Endangered',
        body:    `The largest fish on earth is a seasonal visitor to Somalia's offshore waters, drawn by the upwelling nutrients of the monsoon season. Individuals reaching 12 metres have been recorded in the Gulf of Aden.`,
        img:     'https://images.unsplash.com/photo-1559827291-72f59b58a0bc?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Whale shark gliding through blue water',
        stat:    { value: '12 m', label: 'Max length' },
      },
      {
        id:      'hawksbill',
        name:    'Hawksbill Turtle',
        latin:   'Eretmochelys imbricata',
        status:  'Critically Endangered',
        body:    'Nesting sites along the Berbera coast and the beaches north of Bosaso represent some of the most important hawksbill habitat remaining in the northwest Indian Ocean.',
        img:     'https://images.unsplash.com/photo-1510832198440-a52376be4b2d?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Hawksbill turtle swimming over reef',
        stat:    { value: '80 yrs', label: 'Lifespan' },
      },
      {
        id:      'barracuda',
        name:    'Great Barracuda',
        latin:   'Sphyraena barracuda',
        status:  'Least Concern',
        body:    `Schools of barracuda patrol the reef systems off Berbera in formations that can number in the thousands — a spectacle that experienced divers describe as one of the most overwhelming they've encountered.`,
        img:     'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Barracuda school in clear blue water',
        stat:    { value: '1,000s', label: 'Per school' },
      },
      {
        id:      'manta',
        name:    'Oceanic Manta Ray',
        latin:   'Mobula birostris',
        status:  'Endangered',
        body:    `Manta rays cruise the surface currents off Somalia's northern coast during the northeast monsoon — feeding on the plankton blooms that the seasonal current brings from the open ocean.`,
        img:     'https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Manta ray gliding through sunlit water',
        stat:    { value: '7 m', label: 'Wingspan' },
      },
    ],
  },
  {
    id:     'land',
    label:  'Land Animals',
    eyebrow: 'Semi-arid plains · Montane scrub',
    accent: '#8B5E3C',
    intro:  `Somalia's interior — scrubland, dry riverbeds, and the highland escarpments of the north — supports a wildlife community uniquely adapted to aridity.`,
    cards: [
      {
        id:      'wild-ass',
        name:    'Somali Wild Ass',
        latin:   'Equus africanus somaliensis',
        status:  'Critically Endangered',
        body:    `One of the rarest large mammals on earth. Fewer than 600 individuals survive, scattered across the rocky semi-arid plains of Puntland and northern Somalia. The ancestor of the domestic donkey.`,
        img:     'https://images.unsplash.com/photo-1598887142476-f5a8e1c30929?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Wild ass on arid plains',
        stat:    { value: '< 600', label: 'Remaining' },
      },
      {
        id:      'gerenuk',
        name:    'Gerenuk',
        latin:   'Litocranius walleri',
        status:  'Near Threatened',
        body:    `The gerenuk — its name means "giraffe-necked" in Somali — is a gazelle with an extraordinarily elongated neck that allows it to browse tree foliage that no other antelope can reach, standing on its hind legs to feed.`,
        img:     'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Gerenuk standing tall in savanna',
        stat:    { value: '1 m', label: 'Neck length' },
      },
      {
        id:      'dik-dik',
        name:    `Günther's Dik-dik`,
        latin:   'Madoqua guentheri',
        status:  'Least Concern',
        body:    `These tiny antelopes — the height of a domestic cat — are found throughout Somalia's arid scrublands. They pair for life and are rarely seen apart, using a complex system of scent marking to define territory.`,
        img:     'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Small dik-dik antelope in dry scrub',
        stat:    { value: '38 cm', label: 'Shoulder height' },
      },
      {
        id:      'leopard',
        name:    'African Leopard',
        latin:   'Panthera pardus pardus',
        status:  'Vulnerable',
        body:    `Leopards persist in Somalia's mountain ranges — the Karkaar and Cal Madow highlands of the north — in populations that are almost completely unstudied. Camera trap surveys in the 2010s confirmed their presence in numbers higher than expected.`,
        img:     'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Leopard resting on a rocky outcrop',
        stat:    { value: '~70 kg', label: 'Adult weight' },
      },
    ],
  },
  {
    id:     'birds',
    label:  'Birdlife',
    eyebrow: 'Migratory corridor · Endemic species',
    accent: '#5C7A4E',
    intro:  `Somalia sits on one of the world's great migratory corridors — the East African–West Asian flyway. Over 650 species have been recorded, including several found nowhere else.`,
    cards: [
      {
        id:      'sparrow',
        name:    'Somali Sparrow',
        latin:   'Passer castanopterus',
        status:  'Least Concern',
        body:    `Endemic to Somalia and a small region of Ethiopia, the Somali sparrow is one of the defining birds of the lowland acacia scrub. Its sharp chirp is one of the most familiar sounds of the Somali countryside.`,
        img:     'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Small sparrow perched on a branch',
        stat:    { value: 'Endemic', label: 'Range' },
      },
      {
        id:      'ostrich',
        name:    'Somali Ostrich',
        latin:   'Struthio molybdophanes',
        status:  'Vulnerable',
        body:    `Recognised as a distinct species from the common ostrich only in 2014, the Somali ostrich has blue-grey skin (rather than pink) on its neck and thighs. It ranges across the Horn of Africa's dry plains.`,
        img:     'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Ostrich on open plains',
        stat:    { value: '2014', label: 'Recognised species' },
      },
      {
        id:      'bee-eater',
        name:    'Somali Bee-eater',
        latin:   'Merops revoilii',
        status:  'Least Concern',
        body:    `A small, vividly coloured bird endemic to Somalia and neighbouring areas. The Somali bee-eater is found in open, dry country, where it hunts insects in fast aerial sallies from a low perch.`,
        img:     'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Brightly coloured bee-eater bird on branch',
        stat:    { value: 'Endemic', label: 'Range' },
      },
      {
        id:      'flamingo',
        name:    'Lesser Flamingo',
        latin:   'Phoeniconaias minor',
        status:  'Near Threatened',
        body:    `The coastal lagoons and tidal flats of Somalia's southern Indian Ocean coast host large flocks of lesser flamingos during migration — bright pink columns wading through shallow water, visible from kilometres away.`,
        img:     'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&auto=format&fit=crop&q=80',
        imgAlt:  'Flamingos in a coastal lagoon',
        stat:    { value: '1.2 m', label: 'Height' },
      },
    ],
  },
]

const STATUS_COLORS = {
  'Critically Endangered': '#C0392B',
  'Endangered':            '#E67E22',
  'Vulnerable':            '#F39C12',
  'Near Threatened':       '#8B5E3C',
  'Least Concern':         '#5C7A4E',
}

/* ══════════════════════════════════════════
   HORIZONTAL SCROLL TRACK
══════════════════════════════════════════ */
function HorizontalTrack({ category }) {
  const trackRef    = useRef(null)
  const containerRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)

  /* Scroll hijack — vertical scroll drives horizontal movement */
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end end'],
  })

  /* How far to translate: number of cards × card width + gaps */
  const CARD_W   = 420
  const CARD_GAP = 32
  const CARDS    = category.cards.length
  /* Total scroll distance = (cards - 1) × (card + gap) */
  const totalShift = (CARDS - 1) * (CARD_W + CARD_GAP)

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -totalShift])
  const x    = useSpring(rawX, { stiffness: 100, damping: 30, restDelta: 0.5 })

  return (
    /* Outer container controls the vertical scroll height */
    <div
      ref={containerRef}
      className="h-track-container"
      /* Height = viewport + extra for each card beyond the first */
      style={{ height: `calc(100vh + ${(CARDS - 1) * 80}vh)` }}
    >
      {/* Sticky wrapper keeps the track in view while scrolling */}
      <div className="h-track-sticky">

        {/* Category label */}
        <div className="h-track-header container">
          <span className="eyebrow h-track-eyebrow" style={{ color: category.accent }}>
            {category.eyebrow}
          </span>
          <h2 className="h-track-title display" style={{ color: category.accent }}>
            {category.label}
          </h2>
          <p className="h-track-intro">{category.intro}</p>
        </div>

        {/* Cards rail */}
        <div className="h-track-rail-wrap">
          <motion.div
            ref={trackRef}
            className="h-track-rail"
            style={{ x }}
          >
            {category.cards.map((card, i) => (
              <WildlifeCard
                key={card.id}
                card={card}
                accent={category.accent}
                index={i}
                isActive={activeCard === card.id}
                onOpen={() => setActiveCard(card.id)}
                onClose={() => setActiveCard(null)}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="h-track-progress" aria-hidden="true">
          {category.cards.map((card, i) => {
            const segStart = i / CARDS
            const segEnd   = (i + 1) / CARDS
            return (
              <motion.div
                key={card.id}
                className="h-progress-dot"
                style={{
                  background: useTransform(
                    scrollYProgress,
                    [segStart, segEnd],
                    ['var(--border-strong)', category.accent]
                  ),
                }}
              />
            )
          })}
        </div>

        {/* Scroll hint */}
        <div className="h-track-hint eyebrow" aria-hidden="true">
          scroll to explore →
        </div>

      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   WILDLIFE CARD
══════════════════════════════════════════ */
function WildlifeCard({ card, accent, index, isActive, onOpen, onClose }) {
  const statusColor = STATUS_COLORS[card.status] || accent

  return (
    <>
      <motion.article
        className="wl-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        style={{ '--card-accent': accent }}
      >
        {/* Image */}
        <div className="wl-card__media">
          <img
            src={card.img}
            alt={card.imgAlt}
            className="wl-card__img"
            loading="lazy"
          />
          {/* Status badge */}
          <span
            className="wl-card__status eyebrow"
            style={{ background: statusColor }}
          >
            {card.status}
          </span>
          {/* Index ghost */}
          <span className="wl-card__ghost-index display" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Body */}
        <div className="wl-card__body">
          <div className="wl-card__names">
            <h3 className="wl-card__name display">{card.name}</h3>
            <span className="wl-card__latin eyebrow">{card.latin}</span>
          </div>

          <p className="wl-card__excerpt">
            {card.body.slice(0, 120)}…
          </p>

          <div className="wl-card__footer">
            <div className="wl-card__stat">
              <span className="wl-card__stat-value display" style={{ color: accent }}>
                {card.stat.value}
              </span>
              <span className="wl-card__stat-label eyebrow">{card.stat.label}</span>
            </div>

            <button
              className="wl-card__expand"
              onClick={onOpen}
              aria-label={`Read more about ${card.name}`}
              style={{ '--btn-accent': accent }}
            >
              <span>Read more</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.article>

      {/* Detail drawer */}
      <AnimatePresence>
        {isActive && (
          <CardDrawer card={card} accent={accent} statusColor={statusColor} onClose={onClose} />
        )}
      </AnimatePresence>
    </>
  )
}

/* ══════════════════════════════════════════
   CARD DETAIL DRAWER (modal overlay)
══════════════════════════════════════════ */
function CardDrawer({ card, accent, statusColor, onClose }) {
  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      className="card-drawer-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.name}
    >
      <motion.div
        className="card-drawer"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ '--drawer-accent': accent }}
      >
        <button
          className="card-drawer__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="card-drawer__media">
          <img src={card.img} alt={card.imgAlt} className="card-drawer__img" />
          <span
            className="card-drawer__status eyebrow"
            style={{ background: statusColor }}
          >
            {card.status}
          </span>
        </div>

        <div className="card-drawer__content">
          <p className="card-drawer__latin eyebrow">{card.latin}</p>
          <h2 className="card-drawer__name display">{card.name}</h2>
          <p className="card-drawer__body">{card.body}</p>

          <div className="card-drawer__stat">
            <span className="card-drawer__stat-value display" style={{ color: accent }}>
              {card.stat.value}
            </span>
            <span className="card-drawer__stat-label eyebrow">{card.stat.label}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   WILDLIFE PAGE
══════════════════════════════════════════ */
export default function Wildlife() {
  return (
    <main className="wildlife">

      {/* ── Page header ── */}
      <section className="wildlife-header">
        <div className="wildlife-header__inner container">
          <div className="wildlife-header__text">
            <motion.span
              className="eyebrow wildlife-header__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Wildlife
            </motion.span>

            <motion.h1
              className="wildlife-header__title display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              A continent's<br />edge, alive.
            </motion.h1>

            <motion.p
              className="wildlife-header__body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              From the coral systems of the Gulf of Aden to the arid plains of the interior,
              Somalia supports wildlife found nowhere else on earth — much of it still
              virtually unknown to science.
            </motion.p>
          </div>

          {/* Decorative species count */}
          <motion.div
            className="wildlife-header__count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            aria-hidden="true"
          >
            <span className="wildlife-header__count-num display">650+</span>
            <span className="wildlife-header__count-label eyebrow">bird species recorded</span>
          </motion.div>
        </div>
      </section>

      {/* ── Horizontal scroll sections ── */}
      {categories.map((cat) => (
        <HorizontalTrack key={cat.id} category={cat} />
      ))}

      {/* ── Closing pull-quote ── */}
      <section className="wildlife-close">
        <div className="container">
          <motion.div
            className="wildlife-close__inner"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="wildlife-close__mark display" aria-hidden="true">"</span>
            <blockquote className="wildlife-close__quote display">
              The land does not belong to us.<br />We belong to the land.
            </blockquote>
            <p className="eyebrow wildlife-close__attr">— Somali pastoral tradition</p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}