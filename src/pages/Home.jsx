// src/pages/Home.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import '../styles/home.css'

/* ── Curtain panel ── */
function CurtainPanel({ side, isOpen }) {
  return (
    <motion.div
      className={`curtain-panel curtain-panel--${side}`}
      animate={{ x: isOpen ? (side === 'left' ? '-100%' : '100%') : '0%' }}
      transition={{ duration: 1.6, ease: [0.87, 0, 0.13, 1], delay: 0.2 }}
    />
  )
}

/* ── Kinetic marquee ── */
function Marquee() {
  const items = [
    'Mogadishu', '·', 'Laas Geel', '·', 'Somaliland', '·',
    'Berbera', '·', 'Puntland', '·', 'Kismayo', '·', 'Bosaso', '·',
  ]
  const repeated = [...items, ...items]

  return (
    <div className="marquee-track" aria-hidden="true">
      <motion.div
        className="marquee-inner"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Feature rows ── */
const features = [
  {
    number: '01',
    label: 'Mogadishu',
    sub: 'The Comeback City',
    body: 'Lido Beach at dusk. The old city of Hamarweyne. A capital rebuilding in real time — not a story of crisis, but of return.',
    img: 'https://plus.unsplash.com/premium_photo-1697730020118-46dffe1c5b8c?w=900&auto=format&fit=crop&q=80',
  },
  {
    number: '02',
    label: 'Somaliland',
    sub: 'Unrecognised. Unmistakable.',
    body: "Its own currency, passport, and airline. Laas Geel — prehistoric cave paintings that rival anything in North Africa. A self-declared republic that has quietly built something remarkable.",
    img: 'https://images.unsplash.com/photo-1730714222751-eb1bbdea6f83?w=900&auto=format&fit=crop&q=80',
  },
  {
    number: '03',
    label: 'The Coast',
    sub: '3,333 km. Nobody on it.',
    body: 'The longest coastline in mainland Africa. The same Indian Ocean as Diani — without a single footprint ahead of you.',
    img: 'https://media.istockphoto.com/id/1185200894/photo/port-of-bossaso-somalia.webp?a=1&b=1&s=612x612&w=0&k=20&c=DM5tK0pr6tHGze7NfUTfB59fA_kCN4QFl4mwY_IQ6ts=',
  },
]

function FeatureRow({ item, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const isEven = index % 2 === 0

  return (
    <motion.article
      ref={ref}
      className={`feature-row ${isEven ? 'feature-row--normal' : 'feature-row--reverse'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="feature-row__text">
        <span className="eyebrow feature-number">{item.number}</span>
        <h2 className="feature-row__title">{item.label}</h2>
        <p className="feature-row__sub">{item.sub}</p>
        <p className="feature-row__body">{item.body}</p>
        <motion.a
          href="/discover"
          className="feature-link"
          whileHover={{ x: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          Explore <span className="feature-link__arrow">→</span>
        </motion.a>
      </div>

      <div className="feature-row__media">
        <motion.div className="feature-row__img-wrap" style={{ y }}>
          <img
            src={item.img}
            alt={item.label}
            className="feature-row__img"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.article>
  )
}

/* ── Stat strip ── */
const stats = [
  { value: '3,333', unit: 'km', label: 'Coastline — longest in mainland Africa' },
  { value: '5,000', unit: 'yr', label: 'Laas Geel cave art — older than the pyramids' },
  { value: '18',    unit: 'M',  label: 'Somalis — one of the great oral literary cultures' },
  { value: '1960',  unit: '',   label: "Independence — one of Africa's founding nations" },
]

function StatStrip() {
  return (
    <section className="stat-strip section--sm">
      <div className="container">
        <div className="stat-strip__grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stat-item__value">
                {s.value}<span className="stat-item__unit">{s.unit}</span>
              </div>
              <p className="stat-item__label">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pre-footer banner ── */
const bannerChips = [
  { label: 'Visa on arrival', sub: 'Somaliland' },
  { label: 'Direct flights', sub: 'via Addis & Istanbul' },
  { label: 'Best season', sub: 'Nov – Mar' },
]

function HomeBanner() {
  return (
    <section className="home-banner">
      <div className="home-banner__bg-wrap">
        <img
          src="https://images.unsplash.com/photo-1580452752272-52ad4e72967f?w=1800&auto=format&fit=crop&q=80"
          alt="Somalia — plan your visit"
          className="home-banner__bg"
          loading="lazy"
        />
        <div className="home-banner__overlay" />
      </div>

      <div className="home-banner__content container">
        <motion.span
          className="eyebrow home-banner__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Plan your journey
        </motion.span>

        <motion.h2
          className="home-banner__title display"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready when<br />you are.
        </motion.h2>

        <motion.p
          className="home-banner__body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Flights via Ethiopian Airlines, Turkish Airlines, and Jubba Airways.
          Somaliland e-visa on arrival. Dahabshiil for transfers.
          Everything you need to make it happen.
        </motion.p>

        <motion.div
          className="home-banner__cta-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="/plan-visit"
            className="btn btn--primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Plan your visit
          </motion.a>
          <motion.a
            href="/discover"
            className="btn btn--ghost"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Explore regions
          </motion.a>
        </motion.div>

        <motion.div
          className="home-banner__chips"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {bannerChips.map((chip, i) => (
            <div key={i} className="home-banner__chip">
              <span className="home-banner__chip-label">{chip.label}</span>
              <span className="eyebrow home-banner__chip-sub">{chip.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
export default function Home() {
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const t1 = setTimeout(() => setCurtainOpen(true), 600)
    const t2 = setTimeout(() => setTextVisible(true), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__bg-wrap" style={{ scale: heroScale }}>
          <img
            src="https://images.unsplash.com/photo-1775635019526-709aca31e13a?w=1800&auto=format&fit=crop&q=80"
            alt="Camels in Somalia"
            className="hero__bg"
          />
          <div className="hero__bg-overlay" />
        </motion.div>

        <CurtainPanel side="left"  isOpen={curtainOpen} />
        <CurtainPanel side="right" isOpen={curtainOpen} />

        <motion.div
          className="hero__content container"
          style={{ opacity: heroOpacity }}
        >
          <AnimatePresence>
            {textVisible && (
              <>
                <motion.span
                  className="eyebrow hero__eyebrow"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Discover Somalia
                </motion.span>

                <motion.h1
                  className="hero__title display"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  The world's<br />last frontier
                </motion.h1>

                <motion.p
                  className="hero__body"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  3,333 kilometres of untouched coastline. Cave art older than the pyramids.
                  A capital city rebuilding itself in real time.
                </motion.p>

                <motion.div
                  className="hero__cta-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.a
                    href="/discover"
                    className="btn btn--primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    Start exploring
                  </motion.a>
                  <motion.a
                    href="/plan-visit"
                    className="btn btn--ghost"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    Plan your visit
                  </motion.a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {textVisible && (
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                className="scroll-indicator__line"
                animate={{ scaleY: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="eyebrow">Scroll</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-section">
        <Marquee />
      </div>

      {/* ── Stat strip ── */}
      <StatStrip />

      {/* ── Section divider ── */}
      <div className="container">
        <div className="section-divider">
          <span className="eyebrow">Where to go</span>
          <div className="section-divider__line" />
        </div>
      </div>

      {/* ── Feature rows ── */}
      <section className="features section">
        <div className="container">
          {features.map((item, i) => (
            <FeatureRow key={item.number} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Pre-footer banner ── */}
      <HomeBanner />

    </main>
  )
}