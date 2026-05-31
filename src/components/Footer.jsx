// src/components/Footer.jsx
import { motion } from 'framer-motion'
import { NavLink } from 'react-router'
import '../styles/footer.css'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Discover',  to: '/discover'   },
      { label: 'Culture',   to: '/culture'    },
      { label: 'Coastline', to: '/coastline'  },
      { label: 'Wildlife',  to: '/wildlife'   },
    ],
  },
  {
    heading: 'Regions',
    links: [
      { label: 'Mogadishu',  to: '/discover' },
      { label: 'Somaliland', to: '/discover' },
      { label: 'Puntland',   to: '/discover' },
      { label: 'Kismayo',    to: '/discover' },
    ],
  },
  {
    heading: 'Plan',
    links: [
      { label: 'Plan Visit',       to: '/plan-visit' },
      { label: 'Getting There',    to: '/plan-visit' },
      { label: 'Visa & Entry',     to: '/plan-visit' },
      { label: 'Money & Transfer', to: '/plan-visit' },
    ],
  },
]

/* ── Animated star divider ── */
function StarDivider() {
  return (
    <div className="footer-star-row" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="footer-star"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2.8,
            delay:    i * 0.4,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">

      {/* ── Editorial top band ── */}
      <div className="footer__top">
        <div className="container">
          <motion.p
            className="footer__tagline display"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The place the<br />world hasn't found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavLink to="/discover" className="footer__cta btn btn--primary">
              Start exploring
            </NavLink>
          </motion.div>
        </div>
      </div>

      <StarDivider />

      {/* ── Link columns ── */}
      <div className="footer__mid">
        <div className="container footer__mid-inner">

          {/* Brand column */}
          <div className="footer__brand">
            <NavLink to="/" className="footer__logo" aria-label="Somalia — Home">
              <span className="footer__logo-text">Somalia</span>
              <span className="footer__logo-star" aria-hidden="true">★</span>
            </NavLink>
            <p className="footer__brand-body">
              An editorial guide to one of Africa's most
              compelling and least understood destinations.
              Serious geography. Beautiful attention.
            </p>
            <div className="footer__socials">
              {/* Instagram */}
              <a href="#" className="footer__social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="footer__social-btn" aria-label="X (Twitter)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.978l4.259 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="footer__social-btn" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <div key={col.heading} className="footer__col">
              <h3 className="footer__col-heading eyebrow">{col.heading}</h3>
              <ul className="footer__col-list">
                {col.links.map(({ label, to }, li) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay:    ci * 0.05 + li * 0.06,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink to={to} className="footer__col-link">
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy eyebrow">
            &copy; {year} Somalia Travel Guide. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacy</a>
            <span className="footer__legal-sep" aria-hidden="true">·</span>
            <a href="#" className="footer__legal-link">Terms</a>
            <span className="footer__legal-sep" aria-hidden="true">·</span>
            <a href="#" className="footer__legal-link">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  )
}