// src/pages/Discover.jsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/discover.css'

/* ── Region data ── */
const regions = [
  {
    id: 'somaliland',
    label: 'Somaliland',
    sub: 'The Unrecognised Republic',
    accent: '#4189DD',
    body:
      "Self-declared independent since 1991, Somaliland has its own currency, passport, and elected government. Hargeisa is a walkable, genuinely welcoming capital — its camel market, war memorial, and painted walls tell a story of resilience few outsiders have witnessed. Laas Geel, 50 km northeast, holds cave paintings up to 5,000 years old that rival anything in the Sahara.",
    highlights: ['Laas Geel Cave Art', 'Hargeisa', 'Berbera Port', 'Naasa Hablood Hills'],
    img: 'https://images.unsplash.com/photo-1730714222751-eb1bbdea6f83?w=900&auto=format&fit=crop&q=80',
    // SVG path coords — NW region
    svgPath: 'M 110,30 L 210,25 L 240,55 L 235,100 L 200,115 L 160,105 L 120,90 L 100,65 Z',
    labelPos: { x: 168, y: 68 },
  },
  {
    id: 'puntland',
    label: 'Puntland',
    sub: 'The Ancient Land of Punt',
    accent: '#8B5E3C',
    body:
      "The semi-autonomous state in northeast Somalia is one of the oldest continuously inhabited places on earth — the Land of Punt mentioned in ancient Egyptian records. Bosaso sits on the Gulf of Aden with a thriving port and extraordinary marine biodiversity. The Nugaal Valley cuts inland through dramatic red-rock terrain.",
    highlights: ['Bosaso', 'Cape Guardafui', 'Nugaal Valley', 'Gulf of Aden'],
    img: 'https://media.istockphoto.com/id/1185200894/photo/port-of-bossaso-somalia.webp?a=1&b=1&s=612x612&w=0&k=20&c=DM5tK0pr6tHGze7NfUTfB59fA_kCN4QFl4mwY_IQ6ts=',
    svgPath: 'M 210,25 L 330,20 L 370,45 L 355,95 L 310,120 L 270,130 L 235,100 L 240,55 Z',
    labelPos: { x: 285, y: 72 },
  },
  {
    id: 'hirshabelle',
    label: 'Hirshabelle',
    sub: 'Rivers & Pastoral Plains',
    accent: '#5C7A4E',
    body:
      "The Shabeelle and Jubba rivers make Hirshabelle the most fertile region of Somalia — green plains, acacia savannah, and a way of life shaped by pastoralism and agriculture. Jowhar, the regional capital, sits on the Shabeelle with a quiet colonial-era infrastructure slowly being reclaimed.",
    highlights: ['Jowhar', 'Shabeelle River', 'Acacia Savannah', 'Traditional Farming'],
    img: 'https://images.unsplash.com/photo-1580452752272-52ad4e72967f?w=900&auto=format&fit=crop&q=80',
    svgPath: 'M 160,105 L 200,115 L 235,100 L 270,130 L 255,185 L 220,210 L 185,215 L 155,195 L 140,160 L 145,130 Z',
    labelPos: { x: 197, y: 162 },
  },
  {
    id: 'jubbaland',
    label: 'Jubbaland',
    sub: 'Southern Frontier',
    accent: '#C17A2A',
    body:
      "Kismayo — Somalia's third city — is Jubbaland's commercial heart. It sits at the mouth of the Jubba River, where mangroves meet the Indian Ocean and fishermen still work the same waters their ancestors did. The region stretches south to the Kenyan border through some of East Africa's most remote wilderness.",
    highlights: ['Kismayo', 'Jubba River Delta', 'Indian Ocean Coast', 'Mangrove Forest'],
    img: 'https://images.unsplash.com/photo-1603999540542-b8c65c6d3e89?w=900&auto=format&fit=crop&q=80',
    svgPath: 'M 155,195 L 185,215 L 220,210 L 215,270 L 190,310 L 160,315 L 130,290 L 125,245 L 135,215 Z',
    labelPos: { x: 172, y: 256 },
  },
  {
    id: 'mogadishu',
    label: 'Mogadishu',
    sub: 'The Comeback City',
    accent: '#4189DD',
    body:
      "Mogadishu is the story the world is only beginning to understand. Lido Beach at dusk — locals swimming, families grilling, children playing in the Indian Ocean surf. Hamarweyne, the old city, with its Ottoman-influenced architecture and coral-stone mosques. A capital rebuilding in real time, driven by a generation that never left.",
    highlights: ['Lido Beach', 'Hamarweyne Old City', 'Bakaara Market', 'Jazeera Beach'],
    img: 'https://plus.unsplash.com/premium_photo-1697730020118-46dffe1c5b8c?w=900&auto=format&fit=crop&q=80',
    svgPath: 'M 220,210 L 255,185 L 270,195 L 275,225 L 255,240 L 230,238 Z',
    labelPos: { x: 248, y: 213 },
  },
  {
    id: 'galmudug',
    label: 'Galmudug',
    sub: 'Central Crossroads',
    accent: '#8B5E3C',
    body:
      "Galmudug sits at the geographic heart of Somalia — the transition zone between the arid north and the fertile south. Dhusamareb, its capital, is an ancient caravan town. The coastline here stretches for hundreds of kilometres with no infrastructure and no tourists, just white sand and the open ocean.",
    highlights: ['Dhusamareb', 'Central Coast', 'Mudug Plains', 'Hobyo'],
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    svgPath: 'M 270,130 L 310,120 L 340,140 L 335,180 L 305,200 L 275,205 L 255,185 L 270,165 Z',
    labelPos: { x: 298, y: 163 },
  },
]

/* ── Somalia outline (full country silhouette) ── */
const somaliaOutline =
  'M 110,30 L 330,20 L 370,45 L 355,95 L 340,140 L 335,180 L 305,200 L 275,225 L 255,240 L 230,238 L 215,270 L 190,310 L 160,315 L 130,290 L 125,245 L 135,215 L 140,160 L 145,130 L 120,90 L 100,65 Z'

/* ── Dot grid decoration ── */
function DotGrid() {
  const dots = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      dots.push({ x: c * 18, y: r * 18, key: `${r}-${c}` })
    }
  }
  return (
    <svg className="dot-grid" viewBox="0 0 90 90" aria-hidden="true">
      {dots.map(d => (
        <circle key={d.key} cx={d.x + 9} cy={d.y + 9} r="1.2" fill="currentColor" />
      ))}
    </svg>
  )
}

/* ── Region panel (right side) ── */
function RegionPanel({ region }) {
  if (!region) return null

  return (
    <motion.div
      key={region.id}
      className="region-panel"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="region-panel__img-wrap">
        <img
          src={region.img}
          alt={region.label}
          className="region-panel__img"
        />
        <div className="region-panel__img-overlay" />
        <div className="region-panel__img-label">
          <span className="eyebrow" style={{ color: region.accent }}>
            {region.sub}
          </span>
          <h2 className="region-panel__title display">{region.label}</h2>
        </div>
      </div>

      <div className="region-panel__body">
        <p className="region-panel__text">{region.body}</p>

        <div className="region-panel__highlights">
          <span className="eyebrow region-panel__highlights-label">Highlights</span>
          <ul className="region-panel__highlight-list">
            {region.highlights.map((h, i) => (
              <motion.li
                key={h}
                className="region-panel__highlight-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="highlight-dot" style={{ background: region.accent }} />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.a
          href={`/discover/${region.id}`}
          className="btn btn--outline region-panel__cta"
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          Explore {region.label} →
        </motion.a>
      </div>
    </motion.div>
  )
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <motion.div
      className="map-empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="map-empty__icon">
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="26" x2="20" y2="32" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="26" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <p className="map-empty__text">Select a region to explore</p>
    </motion.div>
  )
}

/* ── SVG Map ── */
function SomaliaMap({ activeId, hoveredId, onHover, onSelect }) {
  return (
    <div className="map-svg-wrap">
      <svg
        className="map-svg"
        viewBox="80 15 310 315"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive map of Somalia regions"
      >
        {/* Shadow / background silhouette */}
        <path
          d={somaliaOutline}
          fill="var(--map-shadow)"
          transform="translate(3,4)"
        />

        {/* Region fills */}
        {regions.map(r => {
          const isActive  = activeId  === r.id
          const isHovered = hoveredId === r.id
          return (
            <g key={r.id}>
              <path
                d={r.svgPath}
                className={`map-region ${isActive ? 'map-region--active' : ''} ${isHovered && !isActive ? 'map-region--hover' : ''}`}
                style={{
                  '--region-accent': r.accent,
                }}
                onMouseEnter={() => onHover(r.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(r.id === activeId ? null : r.id)}
                role="button"
                aria-label={r.label}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelect(r.id === activeId ? null : r.id)}
              />
              {/* Region label */}
              <text
                x={r.labelPos.x}
                y={r.labelPos.y}
                className={`map-label ${isActive ? 'map-label--active' : ''}`}
                textAnchor="middle"
                style={{ pointerEvents: 'none' }}
              >
                {r.label}
              </text>
            </g>
          )
        })}

        {/* Active pulse ring */}
        {activeId && (() => {
          const r = regions.find(r => r.id === activeId)
          if (!r) return null
          return (
            <circle
              cx={r.labelPos.x}
              cy={r.labelPos.y - 4}
              r="6"
              fill={r.accent}
              opacity="0.9"
              className="map-pulse-dot"
            >
              <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
          )
        })()}

        {/* Coastline tick marks */}
        <path
          d="M 370,45 L 355,95 L 340,140 L 335,180 L 305,200 L 275,225 L 255,240 L 230,238 L 215,270 L 190,310 L 160,315"
          stroke="var(--blue)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          opacity="0.4"
          fill="none"
        />
      </svg>

      {/* Compass rose */}
      <div className="map-compass" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="0.8" />
          <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="16,2 13,10 16,8 19,10" fill="currentColor" />
          <text x="16" y="5.5" textAnchor="middle" fontSize="4" fill="currentColor" fontFamily="var(--font-mono)" letterSpacing="0.05em">N</text>
        </svg>
      </div>

      {/* Scale bar */}
      <div className="map-scale" aria-label="Map scale">
        <div className="map-scale__bar" />
        <span className="map-scale__label eyebrow">~200 km</span>
      </div>
    </div>
  )
}

/* ── Region list (mobile / sidebar) ── */
function RegionList({ activeId, onSelect }) {
  return (
    <div className="region-list">
      {regions.map((r, i) => (
        <motion.button
          key={r.id}
          className={`region-list__item ${activeId === r.id ? 'region-list__item--active' : ''}`}
          onClick={() => onSelect(r.id === activeId ? null : r.id)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ '--region-accent': r.accent }}
        >
          <span className="region-list__number eyebrow">0{i + 1}</span>
          <span className="region-list__name">{r.label}</span>
          <span className="region-list__sub">{r.sub}</span>
          <span className="region-list__arrow">→</span>
        </motion.button>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════
   DISCOVER PAGE
══════════════════════════════════════════ */
export default function Discover() {
  const [activeId, setActiveId]   = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const activeRegion = regions.find(r => r.id === activeId) || null

  return (
    <main className="discover">

      {/* ── Page header — 50/50 split ── */}
      <section className="discover-header">
        <div className="discover-header__inner container">

          {/* Left: text */}
          <div className="discover-header__text">
            <motion.span
              className="eyebrow discover-header__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Regions of Somalia
            </motion.span>

            <motion.h1
              className="discover-header__title display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Six regions.<br />One nation.
            </motion.h1>

            <motion.p
              className="discover-header__body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Each region of Somalia has its own character — its own dialect, landscape,
              and pace of life. Select a region on the map below to explore what makes it
              distinct, from the arid north to the river deltas of the south.
            </motion.p>

            <motion.div
              className="discover-header__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="discover-header__stat">
                <span className="discover-header__stat-value">6</span>
                <span className="eyebrow discover-header__stat-label">Federal states</span>
              </div>
              <div className="discover-header__divider" />
              <div className="discover-header__stat">
                <span className="discover-header__stat-value">637k</span>
                <span className="eyebrow discover-header__stat-label">km² total area</span>
              </div>
              <div className="discover-header__divider" />
              <div className="discover-header__stat">
                <span className="discover-header__stat-value">3,333</span>
                <span className="eyebrow discover-header__stat-label">km coastline</span>
              </div>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            className="discover-header__img-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1713164833944-7c1e13aaac55?w=1000&auto=format&fit=crop&q=80"
              alt="Somalia landscape"
              className="discover-header__img"
            />
            <div className="discover-header__img-overlay" />
            <span className="discover-header__img-caption eyebrow">
              Somalia — Horn of Africa
            </span>
            <DotGrid />
          </motion.div>

        </div>
      </section>

      {/* ── Map section ── */}
      <section className="discover-map-section">
        <div className="discover-map-section__inner container">

          {/* Left: map */}
          <motion.div
            className="discover-map-col"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <SomaliaMap
              activeId={activeId}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onSelect={setActiveId}
            />

            {/* Hovered region name tooltip */}
            <AnimatePresence>
              {hoveredId && hoveredId !== activeId && (
                <motion.div
                  className="map-tooltip eyebrow"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {regions.find(r => r.id === hoveredId)?.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: panel */}
          <div className="discover-panel-col">
            <AnimatePresence mode="wait">
              {activeRegion ? (
                <RegionPanel key={activeRegion.id} region={activeRegion} />
              ) : (
                <EmptyState key="empty" />
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── Region list (below map, also acts as mobile nav) ── */}
      <section className="discover-list-section section--sm">
        <div className="container">
          <div className="section-divider">
            <span className="eyebrow">All regions</span>
            <div className="section-divider__line" />
          </div>
          <RegionList activeId={activeId} onSelect={setActiveId} />
        </div>
      </section>

    </main>
  )
}