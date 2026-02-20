'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { href: '/',            label: 'Home',        short: 'HME', desc: 'Landing' },
  { href: '/calculator',  label: 'Check Score', short: 'SCR', desc: 'See your points and badges' },
  { href: '/badges',      label: 'Badges',      short: 'BGE', desc: 'All season skill badges' },
  { href: '/leaderboard', label: 'Leaderboard', short: 'LDR', desc: 'Top players this season' },
  { href: '/resources',   label: 'Prizes',      short: 'PZE', desc: 'Tiers, rules & prizes' },
  { href: '/faqs',        label: 'FAQs',        short: 'FAQ', desc: 'Common questions answered' },
  { href: '/query',       label: 'Contact',     short: 'CON', desc: 'Reach out to us' },
  { href: '/about',       label: 'About',       short: 'ABT', desc: 'About this tool' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 56,
      background: 'rgba(10,11,15,.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(34,40,64,.7)',
    }}>
      {/* Amber gradient top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent 0%, #f59e0b 25%, #22d3ee 60%, #f59e0b 80%, transparent 100%)',
        opacity: .55,
      }}/>

      <div style={{
        maxWidth: 1400, margin: '0 auto', padding: '0 20px',
        height: '100%', display: 'flex', alignItems: 'center', gap: 16,
      }}>

        {/* ── LOGO ── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0a0b0f"/>
            </svg>
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '.88rem',
              color: '#f59e0b', letterSpacing: '.04em',
            }}>ARCADE</div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '.5rem',
              color: '#4a5568', letterSpacing: '.14em', marginTop: 1,
            }}>ORBIT_v2</div>
          </div>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <div className="desktop-nav hide-scrollbar" style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 1,
          overflowX: 'auto',
        }}>
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: 'relative',
                  padding: '6px 12px',
                  borderRadius: 7,
                  fontSize: '.78rem',
                  fontWeight: active ? 700 : 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  color: active ? '#f59e0b' : 'var(--text-dim)',
                  transition: 'color .15s',
                  letterSpacing: '.01em',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text)'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'
                }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 7,
                      background: 'rgba(245,158,11,.09)',
                      border: '1px solid rgba(245,158,11,.22)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  />
                )}
                <span style={{ position: 'relative' }}>{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* ── SEASON PILL ── */}
        <div className="desktop-nav" style={{
          display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
          padding: '4px 11px', borderRadius: 99,
          background: 'rgba(16,185,129,.07)',
          border: '1px solid rgba(16,185,129,.18)',
        }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'block', flexShrink: 0 }}/>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.58rem', color: '#10b981', letterSpacing: '.1em', fontWeight: 700 }}>
            S1·LIVE
          </span>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            marginLeft: 'auto', padding: 7, borderRadius: 7,
            border: '1px solid var(--border)', cursor: 'pointer', flexShrink: 0,
            background: open ? 'var(--amber-lo)' : 'var(--surface)',
            color: open ? 'var(--amber)' : 'var(--text-sub)',
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: .16 }}
            style={{
              borderTop: '1px solid rgba(34,40,64,.8)',
              background: 'rgba(10,11,15,.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ padding: '10px 14px 14px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
              {navLinks.map(link => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      padding: '9px 7px', borderRadius: 8,
                      fontSize: '.74rem', fontWeight: active ? 700 : 500,
                      textDecoration: 'none', textAlign: 'center',
                      color: active ? '#f59e0b' : 'var(--text-sub)',
                      background: active ? 'rgba(245,158,11,.1)' : 'rgba(22,27,40,.8)',
                      border: `1px solid ${active ? 'rgba(245,158,11,.25)' : 'var(--border)'}`,
                    }}
                  >
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.54rem', opacity: .45, marginBottom: 2, letterSpacing: '.08em' }}>
                      {link.short}
                    </div>
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
