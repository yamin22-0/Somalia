// src/pages/Culture.jsx
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import '../styles/culture.css'

/* ══════════════════════════════════════════
   B&W → COLOUR DRAG REVEAL
══════════════════════════════════════════ */
function ColourReveal() {
  const containerRef = useRef(null)
  const [position, setPosition]   = useState(50) // percent
  const [dragging, setDragging]   = useState(false)
  const [touched,  setTouched]    = useState(false)

  const getPercent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    const x = clientX - rect.left
    return Math.min(100, Math.max(0, (x / rect.width) * 100))
  }, [])

  /* Mouse */
  const onMouseDown = () => setDragging(true)
  const onMouseMove = useCallback((e) => {
    if (!dragging) return
    setPosition(getPercent(e.clientX))
  }, [dragging, getPercent])
  const onMouseUp = () => setDragging(false)

  /* Touch */
  const onTouchStart = (e) => {
    setDragging(true)
    setTouched(true)
    setPosition(getPercent(e.touches[0].clientX))
  }
  const onTouchMove = useCallback((e) => {
    if (!dragging) return
    e.preventDefault()
    setPosition(getPercent(e.touches[0].clientX))
  }, [dragging, getPercent])
  const onTouchEnd = () => setDragging(false)

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup',  onMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',  onMouseUp)
    }
  }, [dragging, onMouseMove])

  return (
    <div className="colour-reveal" ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      aria-label="Drag to reveal colour"
      role="img"
    >
      {/* Colour layer (underneath, full width) */}
      <div className="colour-reveal__layer colour-reveal__layer--colour">
        <img
          src="https://images.unsplash.com/photo-1713164833944-7c1e13aaac55?w=1400&auto=format&fit=crop&q=85"
          alt="Somalia in colour"
          className="colour-reveal__img"
          draggable="false"
        />
      </div>

      {/* B&W layer clipped to the left */}
      <div
        className="colour-reveal__layer colour-reveal__layer--bw"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1713164833944-7c1e13aaac55?w=1400&auto=format&fit=crop&q=85"
          alt="Somalia in black and white"
          className="colour-reveal__img colour-reveal__img--bw"
          draggable="false"
        />
      </div>

      {/* Divider line */}
      <div
        className="colour-reveal__divider"
        style={{ left: `${position}%` }}
      >
        <div className="colour-reveal__handle" style={{ opacity: dragging ? 1 : undefined }}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="colour-reveal__label colour-reveal__label--left eyebrow"
        style={{ opacity: position < 15 ? 0 : 1 }}>
        Past
      </div>
      <div className="colour-reveal__label colour-reveal__label--right eyebrow"
        style={{ opacity: position > 85 ? 0 : 1 }}>
        Present
      </div>

      {/* Hint — shown until first interaction */}
      <AnimatePresence>
        {!touched && !dragging && (
          <motion.div
            className="colour-reveal__hint eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.span
              animate={{ x: [-6, 6, -6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ←
            </motion.span>
            drag to reveal
            <motion.span
              animate={{ x: [6, -6, 6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════════
   STICKY SCROLL STACK
══════════════════════════════════════════ */
const topics = [
  {
    id:      'poetry',
    number:  '01',
    label:   'Poetry',
    sub:     'Gabay — the highest art form',
    accent:  '#4189DD',
    body:    [
      "In Somali culture, the poet — the abwan — holds a status that no other profession approaches. Before writing arrived, the entire history, law, philosophy, and politics of a nation was carried in verse.",
      "The gabay is the most prestigious form: long, metrically complex, performed from memory. A well-turned gabay could end a war or start one. Somali radio stations still broadcast poetry competitions watched by millions.",
      "Maxamed Xaashi Dhamac 'Gaarriye', Hadraawi, Cabdullahi Suldaan 'Timacadde' — these names carry the weight that Shakespeare carries in English. Their verses are quoted in parliament and recited at weddings.",
    ],
    img: 'https://media.istockphoto.com/id/2110282124/photo/quill-pen-with-a-glass-bottle-of-ink-isolated-on-white-background-feather-for-calligraphy-old.webp?a=1&b=1&s=612x612&w=0&k=20&c=SYBq6lF7hdeUb43BGMfeu_y0FblovMq_VRS8hGlB9zY=',
    imgAlt: 'Quill pen and ink — the tools of a written tradition built on an oral one',
  },
  {
    id:      'nomadic',
    number:  '02',
    label:   'Nomadic Life',
    sub:     'The aqal and the open plain',
    accent:  '#8B5E3C',
    body:    [
      "Roughly a third of Somalis are still nomadic or semi-nomadic — following rain across the Horn of Africa with their camels, goats, and the aqal: a portable dome house assembled by women in under an hour.",
      "The camel is not just livestock. It is currency, bride price, poetry subject, and survival. A Somali herder can read the sky, the grass, and the wind in ways that no instrument has improved on.",
      "Nomadic culture shaped everything: the value of hospitality to strangers crossing the open plain, the clan system as a mutual insurance network, the oral tradition as the only library that travels.",
    ],
    img: 'https://media.istockphoto.com/id/185236399/photo/goats-eating-hay-burao.jpg?s=612x612&w=0&k=20&c=-bE1LZDBrVZ0v8t60ytWkU4jtiw8AGH-fWojAV0j4jI=',
    imgAlt: 'Goats grazing in Burao, Somaliland',
  },
  {
    id:      'oral',
    number:  '03',
    label:   'Oral Tradition',
    sub:     'Memory as architecture',
    accent:  '#5C7A4E',
    body:    [
      "Somalia had no written script until 1972. For centuries — millennia — an entire civilisation's worth of knowledge was stored and transmitted through the human voice. Genealogies stretching back forty generations. Legal precedents. Medical knowledge. Cosmology.",
      "The xeer — the customary law governing everything from grazing rights to blood compensation — exists as oral contract, memorised and recited by elders. It is one of the most sophisticated unwritten legal systems on earth.",
      "When the script arrived, Somalis took to literacy faster than almost any other newly-literate population in history. The infrastructure was already there — a culture that understood the weight of words.",
    ],
    img: 'https://media.istockphoto.com/id/1125844254/photo/aerial-view-to-hargeisa-biggest-city-of-somaliland-somalia.jpg?s=612x612&w=0&k=20&c=2oryp1CzVg9C2RjXyISMawbwtnW8U-EEdlWemDh9DFw=',
    imgAlt: 'Aerial view of Hargeisa, Somaliland',
  },
  {
    id:      'food',
    number:  '04',
    label:   'Food',
    sub:     'The table as common ground',
    accent:  '#C17A2A',
    body:    [
      "Somali cuisine sits at a crossroads — Arab spice routes, Indian Ocean trade, East African staples, and the pastoral larder of a nomadic people. Canjeero, the spongy fermented flatbread, is eaten at every meal: with honey and ghee at breakfast, as a base for stew at dinner.",
      "Bariis iskukaris — fragrant rice cooked with cumin, cardamom, and cloves, served with goat or camel meat — is the centrepiece of any celebration. The spice mix, xawaash, is every family's closely held formula.",
      "Tea is an institution. Shaah — black tea brewed with cardamom and sometimes cinnamon — is served sweet and strong at any hour, in any home, to any guest. Refusing it is not an option.",
    ],
    img: 'https://media.istockphoto.com/id/501037136/photo/detail-of-traditional-ethiopian-injera-meal.jpg?s=612x612&w=0&k=20&c=m58BEbLpZx94AznVLvH46PyxSivqp80dAQLKTZgDvvA=',
    imgAlt: 'Traditional East African injera and stew',
  },
]

function StickyTopic({ topic, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div
      ref={ref}
      className="topic-row"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--topic-accent': topic.accent }}
    >
      {/* Left: text */}
      <div className="topic-row__text">
        <div className="topic-row__header">
          <span className="eyebrow topic-row__number" style={{ color: topic.accent }}>
            {topic.number}
          </span>
          <div className="topic-row__heading">
            <h2 className="topic-row__title display">{topic.label}</h2>
            <p className="topic-row__sub">{topic.sub}</p>
          </div>
        </div>

        <div className="topic-row__body">
          {topic.body.map((para, i) => (
            <p key={i} className="topic-row__para">{para}</p>
          ))}
        </div>

        <div className="topic-row__rule" style={{ background: topic.accent }} />
      </div>

      {/* Right: image with parallax */}
      <div className="topic-row__media">
        <motion.div className="topic-row__img-wrap" style={{ y: imgY }}>
          <img
            src={topic.img}
            alt={topic.imgAlt}
            className="topic-row__img"
            loading="lazy"
          />
        </motion.div>
        <div
          className="topic-row__img-number display"
          aria-hidden="true"
          style={{ color: topic.accent }}
        >
          {topic.number}
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   STICKY SCROLL NAVIGATOR
   Shows fixed pill on the right tracking
   which topic is in view
══════════════════════════════════════════ */
function ScrollNav({ activeIndex }) {
  return (
    <div className="scroll-nav" aria-hidden="true">
      {topics.map((t, i) => (
        <a
          key={t.id}
          href={`#culture-${t.id}`}
          className={`scroll-nav__dot ${activeIndex === i ? 'scroll-nav__dot--active' : ''}`}
          style={{ '--dot-accent': t.accent }}
          title={t.label}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════
   CULTURE PAGE
══════════════════════════════════════════ */
export default function Culture() {
  const [activeIndex, setActiveIndex] = useState(0)

  /* Track which section is in viewport */
  useEffect(() => {
    const observers = topics.map((t, i) => {
      const el = document.getElementById(`culture-${t.id}`)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <main className="culture">

      {/* ── Page header ── */}
      <section className="culture-header">
        <div className="culture-header__inner container">
          <div className="culture-header__text">
            <motion.span
              className="eyebrow culture-header__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Culture
            </motion.span>

            <motion.h1
              className="culture-header__title display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              A civilisation<br />carried by voice.
            </motion.h1>

            <motion.p
              className="culture-header__body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              For millennia before a written script existed, Somalis stored their entire
              world — history, law, science, love — in verse. What emerged is one of the
              most sophisticated oral cultures on earth.
            </motion.p>
          </div>

          {/* Vertical text accent */}
          <motion.div
            className="culture-header__vert-text"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            شعر · Gabayadda · ستر
          </motion.div>
        </div>
      </section>

      {/* ── B&W → Colour drag reveal ── */}
      <section className="culture-reveal-section">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ColourReveal />
        </motion.div>
        <div className="container">
          <p className="culture-reveal-caption eyebrow">
            Somalia — then and now. One land. Many generations.
          </p>
        </div>
      </section>

      {/* ── Section divider ── */}
      <div className="container">
        <div className="section-divider">
          <span className="eyebrow">Three pillars</span>
          <div className="section-divider__line" />
        </div>
      </div>

      {/* ── Topic rows ── */}
      <section className="culture-topics section">
        <div className="container">
          {topics.map((topic, i) => (
            <div key={topic.id} id={`culture-${topic.id}`}>
              <StickyTopic topic={topic} index={i} />
              {i < topics.length - 1 && (
                <div className="topic-separator" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing pull-quote ── */}
      <section className="culture-pullquote">
        <div className="container">
          <motion.div
            className="culture-pullquote__inner"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="culture-pullquote__mark display" aria-hidden="true">"</span>
            <blockquote className="culture-pullquote__quote display">
              The tongue is sharper than the sword.
            </blockquote>
            <p className="eyebrow culture-pullquote__attr">
              — Somali proverb
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Fixed scroll nav ── */}
      <ScrollNav activeIndex={activeIndex} />

    </main>
  )
}