'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/* ── capability cards ───────────────────────────────────────── */
const capabilities = [
  {
    id: '01',
    title: 'Badge Intel',
    sub: 'BADGE_SCAN',
    desc: 'Every earned and pending badge plotted in a live visual grid — Arcade, Skill, and Trivia separated clearly.',
    accent: 'var(--amber)',
    accentLo: 'var(--amber-lo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Point Engine',
    sub: 'PTS_CALC',
    desc: 'Automated tallying across all badge types plus milestone bonuses — your exact point total, always current.',
    accent: 'var(--cyan)',
    accentLo: 'var(--cyan-lo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Swag Radar',
    sub: 'SWAG_LVL',
    desc: 'Live tier progress bars showing the exact gap to your next reward level — Novice through Legend.',
    accent: 'var(--green)',
    accentLo: 'var(--green-lo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Deep Scan',
    sub: 'PROFILE_RT',
    desc: 'Paste any public Cloud Skills Boost URL — we fetch, parse and report your full profile state in real time.',
    accent: 'var(--violet)',
    accentLo: 'var(--violet-lo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
]

/* ── mission phases ─────────────────────────────────────────── */
const phases = [
  {
    code: 'PHASE-A',
    title: 'Expose Your Profile',
    detail: 'Log in to cloudskillsboost.google, navigate to your profile, and flip it to public visibility.',
    status: 'PREP',
  },
  {
    code: 'PHASE-B',
    title: 'Capture the URL',
    detail: 'Copy the full public profile URL directly from your browser address bar.',
    status: 'FETCH',
  },
  {
    code: 'PHASE-C',
    title: 'Run Analysis',
    detail: 'Drop the URL into Arcade Tracker and hit Analyze — full badge + points report fires instantly.',
    status: 'EXEC',
  },
]

/* ── readout stats ──────────────────────────────────────────── */
const pointRules = [
  { val: '1 pt',   label: 'Arcade Game Badge' },
  { val: '1 pt',   label: 'Sprint / Trivia Badge' },
  { val: '½ pt',   label: 'per Skill Badge (2 = 1)' },
  { val: '+2→25',  label: 'Milestone Bonus' },
]

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as number[] },
})

export default function HomePage() {
  return (
    <div className="dot-grid" style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — split panel
      ══════════════════════════════════════════════════════════ */}
      <section className="hero-glow" style={{ position: 'relative', padding: '80px 20px 70px', overflow: 'hidden' }}>

        {/* faint corner grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(245,158,11,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}
          className="hero-grid">

          {/* ── LEFT: mission briefing ── */}
          <div>
            <motion.div {...fadeIn(0)}>
              {/* system label */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginBottom: 28, padding: '5px 12px 5px 8px',
                borderRadius: 6,
                background: 'rgba(245,158,11,.07)',
                border: '1px solid rgba(245,158,11,.2)',
              }}>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }}/>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '.65rem',
                  color: 'var(--amber)', letterSpacing: '.1em', fontWeight: 700,
                }}>
                  ARCADE_SYS · FEB 2026 · LIVE
                </span>
              </div>
            </motion.div>

            <motion.h1 {...fadeIn(0.05)} style={{
              fontFamily: 'var(--font-space)', fontWeight: 900,
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.08, letterSpacing: '-.04em', marginBottom: 20,
            }}>
              Your Arcade<br/>
              <span className="text-amber">Mission Control</span>
            </motion.h1>

            <motion.p {...fadeIn(0.1)} style={{
              fontSize: '1.02rem', color: 'var(--text-sub)', lineHeight: 1.75,
              marginBottom: 36, maxWidth: 440,
            }}>
              Paste your Cloud Skills Boost profile URL and get a full intel report — badge inventory, point total, milestone status, and your swag tier — fired back in seconds.
            </motion.p>

            <motion.div {...fadeIn(0.15)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/calculator" className="btn-primary"
                  style={{ padding: '12px 26px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 8 }}>
                  Scan My Profile ›
                </Link>
                <Link href="/resources" className="btn-outline"
                  style={{ padding: '12px 26px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 8 }}>
                  Intel Hub
                </Link>
            </motion.div>

              {/* scoring quick ref */}
              <motion.div {...fadeIn(0.22)} style={{
                marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12,
              }}>
                {pointRules.map(r => (
                  <div key={r.label} style={{
                    padding: '11px 14px', borderRadius: 8,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-space)', fontSize: '1rem', fontWeight: 800,
                      color: '#f59e0b', minWidth: 44, flexShrink: 0,
                    }}>{r.val}</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </motion.div>
          </div>

          {/* ── RIGHT: mission status terminal card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: .97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: .6, delay: .2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(245,158,11,.2)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(245,158,11,.08), 0 20px 60px rgba(0,0,0,.5)',
            }}>
              {/* terminal title bar */}
              <div style={{
                padding: '10px 16px',
                background: 'rgba(245,158,11,.06)',
                borderBottom: '1px solid rgba(245,158,11,.12)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['#f87171','#fbbf24','#10b981'].map(c => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: .7 }}/>
                  ))}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.65rem', color: 'var(--text-dim)', letterSpacing: '.08em' }}>
                  arcade-tracker — profile_scan.sh
                </span>
              </div>

              <div style={{ padding: '20px 20px 24px' }}>
                {/* operator row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: 'linear-gradient(135deg,#f59e0b,#22d3ee)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, color: '#0a0b0f', fontSize: '1rem',
                  }}>G</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: 2 }}>Cloud Operator</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.6rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      cloudskillsboost.google/public_profiles/…
                    </div>
                  </div>
                  <div className="chip chip-green">Active</div>
                </div>

                {/* stat trio */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                  {[
                    { k: 'POINTS',     v: '18',  c: '#f59e0b' },
                    { k: 'MILESTONES', v: '3',   c: '#22d3ee' },
                    { k: 'BADGES',     v: '26',  c: '#10b981' },
                  ].map(s => (
                    <div key={s.k} style={{
                      padding: '12px 8px', textAlign: 'center', borderRadius: 8,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.56rem', color: 'var(--text-dim)', marginTop: 4, letterSpacing: '.06em' }}>{s.k}</div>
                    </div>
                  ))}
                </div>

                {/* swag tier bar */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: '.72rem' }}>
                    <span style={{ color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.04em' }}>
                      SWAG_TIER → CHAMPION
                    </span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>18 / 75 pts</span>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: '24%' }}
                      transition={{ duration: 1.6, delay: .7, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* milestone log */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    { label: 'Milestone 1 — Bonus +2 pts', done: true },
                    { label: 'Milestone 2 — Bonus +2 pts', done: true },
                    { label: 'Milestone 3 — Bonus +3 pts', done: false },
                  ].map(m => (
                    <div key={m.label} style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      padding: '7px 10px', borderRadius: 7,
                      background: m.done ? 'rgba(16,185,129,.07)' : 'var(--surface)',
                      border: `1px solid ${m.done ? 'rgba(16,185,129,.2)' : 'var(--border)'}`,
                    }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                        background: m.done ? 'rgba(16,185,129,.2)' : 'var(--border)',
                        border: `1.5px solid ${m.done ? '#10b981' : 'var(--border-hi)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {m.done && <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>}
                      </div>
                      <span style={{ fontSize: '.74rem', color: m.done ? 'var(--text-sub)' : 'var(--text-dim)' }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CAPABILITIES GRID
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            {/* section label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', borderRadius: 5,
              background: 'var(--cyan-lo)', border: '1px solid rgba(34,211,238,.2)',
              marginBottom: 16,
            }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.62rem', color: 'var(--cyan)', letterSpacing: '.12em', fontWeight: 700 }}>
                CAPABILITY_SET
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-space)', fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              letterSpacing: '-.03em', lineHeight: 1.2,
            }}>
              All the Tools to{' '}
              <span className="text-cyber">Dominate the Season</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {capabilities.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="card card-hover"
                style={{ padding: '26px 22px', position: 'relative', overflow: 'hidden' }}
              >
                {/* watermark number */}
                <div style={{
                  position: 'absolute', bottom: -16, right: -4,
                  fontFamily: 'var(--font-space)', fontWeight: 900,
                  fontSize: '5rem', lineHeight: 1, opacity: .04,
                  color: c.accent,
                }}>
                  {c.id}
                </div>

                <div style={{
                  width: 42, height: 42, borderRadius: 10, marginBottom: 18,
                  background: c.accentLo,
                  border: `1px solid ${c.accent}30`,
                  color: c.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {c.icon}
                </div>

                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.58rem', color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 7 }}>
                  {c.sub}
                </div>

                <h3 style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: 10, color: 'var(--text)' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '.83rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MISSION PHASES — horizontal timeline
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 20px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 44 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', borderRadius: 5,
              background: 'var(--amber-lo)', border: '1px solid rgba(245,158,11,.2)',
              marginBottom: 16,
            }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.62rem', color: 'var(--amber)', letterSpacing: '.12em', fontWeight: 700 }}>
                OPS_SEQUENCE
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-space)', fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-.03em',
            }}>
              Up &amp; Running in{' '}
              <span className="text-amber">3 Phases</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, position: 'relative' }}>
            {/* connector line */}
            <div style={{
              position: 'absolute', top: 32, left: '16.5%', right: '16.5%', height: 1,
              background: 'linear-gradient(90deg, rgba(245,158,11,.3), rgba(34,211,238,.3))',
            }} className="hide-on-mobile"/>

            {phases.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: '24px 22px', position: 'relative' }}
              >
                {/* phase badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
                }}>
                  <div style={{
                    width: 36, height: 36,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: i === 0 ? 'rgba(245,158,11,.15)' : i === 1 ? 'rgba(34,211,238,.12)' : 'rgba(16,185,129,.12)',
                    border: `1px solid ${i === 0 ? 'rgba(245,158,11,.35)' : i === 1 ? 'rgba(34,211,238,.3)' : 'rgba(16,185,129,.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontFamily: 'var(--font-space)', fontWeight: 900, fontSize: '.75rem',
                    color: i === 0 ? '#f59e0b' : i === 1 ? '#22d3ee' : '#10b981',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.58rem', color: 'var(--text-dim)', letterSpacing: '.1em' }}>
                      {p.code}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.58rem', marginTop: 2, letterSpacing: '.08em',
                      color: i === 0 ? '#f59e0b' : i === 1 ? '#22d3ee' : '#10b981' }}>
                      [{p.status}]
                    </div>
                  </div>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: '.93rem', marginBottom: 9 }}>{p.title}</h3>
                <p style={{ fontSize: '.83rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 20px 88px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div style={{
              borderRadius: 18, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(135deg, rgba(245,158,11,.08) 0%, rgba(34,211,238,.06) 50%, rgba(129,140,248,.06) 100%)',
              border: '1px solid rgba(245,158,11,.2)',
              padding: '56px 40px', textAlign: 'center',
            }}>
              {/* background pattern */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(245,158,11,.05) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}/>
              {/* glow */}
              <div style={{
                position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
                width: 600, height: 300,
                background: 'radial-gradient(ellipse, rgba(245,158,11,.1) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}/>

              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '4px 12px', borderRadius: 5, marginBottom: 22,
                  background: 'var(--amber-lo)', border: '1px solid rgba(245,158,11,.25)',
                }}>
                  <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }}/>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.62rem', color: 'var(--amber)', letterSpacing: '.1em', fontWeight: 700 }}>
                    NO SIGN-UP · INSTANT RESULTS
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-space)', fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  letterSpacing: '-.03em', marginBottom: 14,
                }}>
                  Ready to Check Your{' '}
                  <span className="text-amber">Mission Status?</span>
                </h2>

                <p style={{ color: 'var(--text-sub)', fontSize: '1rem', marginBottom: 32, lineHeight: 1.7 }}>
                  Get your full badge report, point tally, milestone log and swag tier in one click.
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/calculator" className="btn-primary"
                    style={{ padding: '13px 30px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 8 }}>
                    Analyze Now ›
                  </Link>
                  <Link href="/leaderboard" className="btn-outline"
                    style={{ padding: '13px 30px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 8 }}>
                    Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 20px',
        background: 'var(--bg-mid)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg,#f59e0b,#d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0a0b0f"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '.82rem', color: '#f59e0b' }}>
              ARCADE TRACKER
            </span>
          </div>
          <p style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>
            Unofficial tool · Not affiliated with Google LLC · Built for the community
          </p>
        </div>
      </footer>

      {/* ── responsive overrides ──────────────────────────────── */}
      <style>{`
        .hero-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
