import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import '../styles/plan-visit.css'

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const sections = [
  {
    id:      'flights',
    number:  '01',
    label:   'Getting There',
    accent:  '#4189DD',
    eyebrow: 'Flights & airlines',
    intro:   `Three carriers connect Somalia reliably to the wider world. Book well in advance — seats fill fast, particularly on routes to Hargeisa.`,
    img:     'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop&q=80',
    imgAlt:  'Airplane wing over clouds at golden hour',
    links: [
      {
        name:   'Ethiopian Airlines',
        handle: 'ethiopianairlines.com',
        href:   'https://www.ethiopianairlines.com',
        meta:   'Addis Ababa hub · Daily to Mogadishu, Hargeisa, Bosaso',
        note:   `The most reliable connection via Addis Ababa. Onward connections from almost anywhere in the world.`,
      },
      {
        name:   'Turkish Airlines',
        handle: 'turkishairlines.com',
        href:   'https://www.turkishairlines.com',
        meta:   'Istanbul hub · Mogadishu route',
        note:   `Istanbul to Mogadishu direct. Strong European and North American connecting network via IST.`,
      },
      {
        name:   'Jubba Airways',
        handle: 'jubbaairways.com',
        href:   'https://www.jubbaairways.com',
        meta:   'Regional carrier · Intra-Somalia routes',
        note:   `The essential domestic carrier. Operates between Mogadishu, Hargeisa, Bosaso, Kismayo, and Baidoa.`,
      },
    ],
  },
  {
    id:      'money',
    number:  '02',
    label:   'Money',
    accent:  '#8B5E3C',
    eyebrow: 'Transfers & currency',
    intro:   `Cash is king across most of Somalia. Dahabshiil is the backbone of money movement — trusted by diaspora and residents alike for over three decades.`,
    img:     'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=900&auto=format&fit=crop&q=80',
    imgAlt:  'Hands exchanging currency at a market',
    links: [
      {
        name:   'Dahabshiil',
        handle: 'dahabshiil.com',
        href:   'https://www.dahabshiil.com',
        meta:   'Money transfer · 126+ countries',
        note:   `The largest money transfer operator in Africa. Branches in every major Somali city — ask at your hotel for the nearest agent.`,
      },
      {
        name:   'Hormuud Telesom (EVC Plus)',
        handle: 'hormuud.com',
        href:   'https://www.hormuud.com',
        meta:   'Mobile money · South-Central Somalia',
        note:   `EVC Plus is Mogadishu's dominant mobile payment system. Widely accepted at restaurants, shops, and transport.`,
      },
      {
        name:   'Telesom ZAAD',
        handle: 'telesom.net',
        href:   'https://www.telesom.net',
        meta:   'Mobile money · Somaliland',
        note:   `ZAAD is the equivalent in Somaliland — nearly universal in Hargeisa. Get a SIM at the airport.`,
      },
    ],
  },
 {
  id: 'visa',
  number: '03',
  label: 'Entry & Visas',
  accent: '#5C7A4E',
  eyebrow: 'Documents & entry',
  intro: `Entry requirements differ significantly between Somaliland, Puntland, and Federal Somalia. Plan carefully — the logistics are manageable but require attention.`,
  img: 'https://media.istockphoto.com/id/1321257486/photo/somasport-and-toy-airplane-on-wooden-background.jpg?s=612x612&w=0&k=20&c=16OC_cJ3z9kS9ZJR3Ks-ZduUgLWuxfiq3NoSdpgyvCQ=',
  imgAlt: 'Somali passport with toy airplane on wooden background',

  links: [
    {
      name: 'Somaliland e-Visa',
      handle: 'evisa.somalilandgov.com',
      href: 'https://evisa.somalilandgov.com',
      meta: 'Online · Issued in 1–3 business days',
      note: `Somaliland operates an independent visa system. Apply online before travel. Most nationalities are approved quickly and pay on arrival.`,
    },

    {
      name: 'Federal Somalia Visa',
      handle: 'mfa.gov.so',
      href: 'https://www.mfa.gov.so',
      meta: 'Embassy or on arrival · Mogadishu',
      note: `Check with the nearest Somali embassy. Visas are often available on arrival at Aden Adde International Airport for many nationalities.`,
    },

    {
      name: 'FCDO / State Dept Travel Advice',
      handle: 'gov.uk/foreign-travel-advice/somalia',
      href: 'https://www.gov.uk/foreign-travel-advice/somalia',
      meta: 'UK / US travel advisories',
      note: `Read current advisories before travel. Conditions vary sharply by region — Somaliland and parts of Puntland are significantly calmer than South-Central Somalia.`,
    },
  ],
},
  {
    id:      'ground',
    number:  '04',
    label:   'On the Ground',
    accent:  '#C17A2A',
    eyebrow: 'Local essentials',
    intro:   `Somalia rewards the prepared traveller. A few essentials that will make the difference between confusion and confidence once you land.`,
    img:     'https://media.istockphoto.com/id/1125844254/photo/aerial-view-to-hargeisa-biggest-city-of-somaliland-somalia.jpg?s=612x612&w=0&k=20&c=2oryp1CzVg9C2RjXyISMawbwtnW8U-EEdlWemDh9DFw=',
    imgAlt:  'Aerial view of Hargeisa, Somaliland',
    links: [
      {
        name:   'Somaliland Tourism Board',
        handle: 'somalilandtourism.com',
        href:   'https://somalilandtourism.com',
        meta:   'Official tourism info · Hargeisa',
        note:   `The most organised tourism infrastructure in the region. Can arrange guides, vehicles, and permits for Laas Geel and Berbera.`,
      },
      {
        name:   'Waddani Travel',
        handle: 'waddanitravel.com',
        href:   'https://www.waddanitravel.com',
        meta:   'Tour operator · Somaliland',
        note:   `Established local operator running curated trips through Somaliland. Highly recommended for first-time visitors.`,
      },
      {
        name:   'SIM Cards — Somtel / Telesom',
        handle: 'somtel.so',
        href:   'https://www.somtel.so',
        meta:   'Data & calls · Available at airports',
        note:   `Pick up a local SIM at the airport on arrival. Data is inexpensive and coverage surprisingly good in urban areas and main routes.`,
      },
    ],
  },
]

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y     = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div ref={ref} className="pv-hero">
      {/* Parallax image */}
      <motion.div className="pv-hero__img-wrap" style={{ y, scale }}>
        <img
          src="https://media.istockphoto.com/id/2240203070/photo/aerial-view-of-passenger-plane-silhouette-and-sandy-beach-blue-sea-with-waves-at-sunset.jpg?s=612x612&w=0&k=20&c=uEeqSNUveKR_cviCDGwpWlUIs-7ZoxNBg-a1XaeQEBg="
          alt="Aerial view of plane silhouette over a golden beach and blue sea at sunset"
          className="pv-hero__img"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="pv-hero__overlay" />

      {/* Hero text */}
      <div className="pv-hero__content container">
        <motion.span
          className="eyebrow pv-hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          Plan your visit
        </motion.span>

        <motion.h1
          className="pv-hero__title display"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          Everything you need.<br />Nothing you don't.
        </motion.h1>

        <motion.p
          className="pv-hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          Flights, money transfers, visas, and ground logistics —
          curated links to the resources that actually matter.
        </motion.p>

        {/* Four quick-jump pills */}
        <motion.div
          className="pv-hero__pills"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.23, 1, 0.32, 1] }}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#pv-${s.id}`}
              className="pv-hero__pill eyebrow"
              style={{ '--pill-accent': s.accent }}
            >
              <span className="pv-hero__pill-dot" style={{ background: s.accent }} />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="pv-hero__scroll-cue eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
        scroll
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════
   LINK ROW
══════════════════════════════════════════ */
function LinkRow({ link, accent, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="pv-link"
      style={{ '--link-accent': accent }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pv-link__left">
        <div className="pv-link__top">
          <span className="pv-link__name display">{link.name}</span>
          <span className="pv-link__meta eyebrow">{link.meta}</span>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.p
              className="pv-link__note"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '0.5rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              {link.note}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="pv-link__right">
        <span className="pv-link__handle eyebrow">{link.handle}</span>
        <span className="pv-link__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="pv-link__fill" aria-hidden="true" />
    </motion.a>
  )
}

/* ══════════════════════════════════════════
   SECTION BLOCK
   Two-column: text+links left, image right
   Alternates side on even sections
══════════════════════════════════════════ */
function SectionBlock({ section, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const isEven = index % 2 === 1

  return (
    <motion.section
      ref={ref}
      className={`pv-section ${isEven ? 'pv-section--flip' : ''}`}
      style={{ '--section-accent': section.accent }}
      id={`pv-${section.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* ── Text + links column ── */}
      <div className="pv-section__text">
        {/* Header */}
        <div className="pv-section__heading">
          <span className="eyebrow pv-section__number" style={{ color: section.accent }}>
            {section.number}
          </span>
          <div>
            <p className="eyebrow pv-section__eyebrow" style={{ color: section.accent }}>
              {section.eyebrow}
            </p>
            <h2 className="pv-section__title display">{section.label}</h2>
          </div>
        </div>

        <p className="pv-section__intro">{section.intro}</p>

        {/* Links */}
        <div className="pv-section__links">
          {section.links.map((link, i) => (
            <LinkRow key={link.handle} link={link} accent={section.accent} index={i} />
          ))}
        </div>

        <div className="pv-section__rule" style={{ background: section.accent }} />
      </div>

      {/* ── Image column ── */}
      <div className="pv-section__media">
        <motion.div className="pv-section__img-wrap" style={{ y: imgY }}>
          <img
            src={section.img}
            alt={section.imgAlt}
            className="pv-section__img"
            loading="lazy"
          />
        </motion.div>
        {/* Ghost number */}
        <span
          className="pv-section__ghost display"
          style={{ color: section.accent }}
          aria-hidden="true"
        >
          {section.number}
        </span>
      </div>
    </motion.section>
  )
}

/* ══════════════════════════════════════════
   STICKY SIDE NAV
══════════════════════════════════════════ */
function SideNav() {
  return (
    <nav className="pv-sidenav" aria-label="Section navigation">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#pv-${s.id}`}
          className="pv-sidenav__item"
          style={{ '--nav-accent': s.accent }}
        >
          <span className="pv-sidenav__num eyebrow">{s.number}</span>
          <span className="pv-sidenav__label">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

/* ══════════════════════════════════════════
   PLAN VISIT PAGE
══════════════════════════════════════════ */
export default function PlanVisit() {
  return (
    <main className="plan-visit">

      {/* ── Full-bleed hero ── */}
      <Hero />

      {/* ── Body: side nav + sections ── */}
      <div className="pv-body container">
        <SideNav />
        <div className="pv-content">
          {sections.map((section, i) => (
            <SectionBlock key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>

      {/* ── Closing note ── */}
      <section className="pv-close">
        <div className="container">
          <motion.div
            className="pv-close__inner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="pv-close__text">
              Somalia is not a package-tour destination. It rewards curiosity,
              preparation, and a willingness to move slowly. The people you meet
              will be the highlight of the trip.
            </p>
            <div className="pv-close__rule" />
            <p className="eyebrow pv-close__attr">— A note from the editors</p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}