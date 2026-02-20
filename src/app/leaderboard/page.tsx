'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const entries = [
  { rank: 1,  name: 'Priya Sharma',     points: 28, badges: 34, level: 'Level 6', avatar: 'P', country: '🇮🇳' },
  { rank: 2,  name: 'Carlos Mendez',    points: 24, badges: 29, level: 'Level 5', avatar: 'C', country: '🇧🇷' },
  { rank: 3,  name: 'Aisha Johnson',    points: 22, badges: 27, level: 'Level 5', avatar: 'A', country: '🇳🇬' },
  { rank: 4,  name: 'Wei Chen',         points: 20, badges: 25, level: 'Level 5', avatar: 'W', country: '🇨🇳' },
  { rank: 5,  name: 'Ivan Petrov',      points: 18, badges: 22, level: 'Level 4', avatar: 'I', country: '🇷🇺' },
  { rank: 6,  name: 'Fatima Al-Rashid', points: 17, badges: 21, level: 'Level 4', avatar: 'F', country: '🇸🇦' },
  { rank: 7,  name: "James O'Brien",    points: 15, badges: 19, level: 'Level 4', avatar: 'J', country: '🇬🇧' },
  { rank: 8,  name: 'Yuki Tanaka',      points: 13, badges: 16, level: 'Level 3', avatar: 'Y', country: '🇯🇵' },
  { rank: 9,  name: 'Elena Popescu',    points: 12, badges: 15, level: 'Level 3', avatar: 'E', country: '🇷🇴' },
  { rank: 10, name: 'Omar Hassan',      points: 11, badges: 13, level: 'Level 3', avatar: 'O', country: '🇪🇬' },
]

const levelStyle: Record<string, { color: string; bg: string; border: string }> = {
  'Level 6': { color: 'var(--accent)',  bg: 'var(--accent-lo)',  border: 'rgba(79,142,247,.3)'  },
  'Level 5': { color: 'var(--purple)',  bg: 'var(--purple-lo)',  border: 'rgba(168,85,247,.3)'  },
  'Level 4': { color: 'var(--green)',   bg: 'var(--green-lo)',   border: 'rgba(34,197,94,.3)'   },
  'Level 3': { color: 'var(--yellow)',  bg: 'var(--yellow-lo)',  border: 'rgba(245,158,11,.3)'  },
  'Level 2': { color: '#fb923c',        bg: 'rgba(251,146,60,.1)', border: 'rgba(251,146,60,.3)' },
  'Level 1': { color: '#f87171',        bg: 'rgba(248,113,113,.1)', border: 'rgba(248,113,113,.3)' },
}

const rankMedal = ['🥇', '🥈', '🥉']
const rankColor = ['#f59e0b', '#94a3b8', '#b45309']

const podiumConfig = [
  { posLabel: 2, height: 100, glowColor: 'rgba(148,163,184,.15)', border: 'rgba(148,163,184,.25)' },
  { posLabel: 1, height: 130, glowColor: 'rgba(245,158,11,.18)',  border: 'rgba(245,158,11,.35)'  },
  { posLabel: 3, height: 80,  glowColor: 'rgba(180,100,40,.15)',  border: 'rgba(180,100,40,.25)'  },
]

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<'points' | 'badges'>('points')

  const sorted = [...entries].sort((a, b) =>
    sortBy === 'points' ? b.points - a.points : b.badges - a.badges
  )
  // podium order: 2nd left, 1st center, 3rd right
  const podium = [sorted[1], sorted[0], sorted[2]]

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px', borderRadius: 99,
            background: 'var(--yellow-lo)', border: '1px solid rgba(245,158,11,.25)',
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
            color: 'var(--yellow)', marginBottom: 18,
          }}>
            🏆 Season Rankings
          </span>
          <h1 style={{
            fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12,
          }}>
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '1rem', maxWidth: 460, margin: '0 auto' }}>
            Top Arcade performers this season. Use the Calculator to check where you stand.
          </p>
        </motion.div>

        {/* ── Demo notice ─────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
          style={{
            marginBottom: 36, padding: '13px 18px', borderRadius: 12,
            background: 'rgba(245,158,11,.07)', border: '1px solid rgba(245,158,11,.2)',
            color: 'var(--yellow)', fontSize: '.82rem',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
          </svg>
          <span>Sample data for demonstration. Real-time rankings require profile submissions via the Calculator.</span>
        </motion.div>

        {/* ── Podium ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: 12, marginBottom: 36, alignItems: 'flex-end' }}>
          {podium.map((entry, i) => {
            if (!entry) return null
            const cfg   = podiumConfig[i]
            const medal = rankMedal[cfg.posLabel - 1]
            const mClr  = rankColor[cfg.posLabel - 1]
            return (
              <motion.div key={entry.rank}
                initial={{ opacity: 0, y: 28, scale: .94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: .18 + i * .07 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Player info */}
                <div style={{ textAlign: 'center', marginBottom: 10, width: '100%' }}>
                  <div style={{
                    width: cfg.posLabel === 1 ? 56 : 44,
                    height: cfg.posLabel === 1 ? 56 : 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,var(--accent),var(--purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800,
                    fontSize: cfg.posLabel === 1 ? '1.4rem' : '1rem',
                    margin: '0 auto 6px',
                    boxShadow: cfg.posLabel === 1 ? '0 0 22px rgba(79,142,247,.45)' : 'none',
                  }}>
                    {entry.avatar}
                  </div>
                  <div style={{ fontSize: '.78rem', fontWeight: 600, marginBottom: 2, color: 'var(--text)' }}>
                    {entry.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '.82rem', fontWeight: 800, color: 'var(--accent)' }}>
                    {sortBy === 'points' ? `${entry.points} pts` : `${entry.badges} badges`}
                  </div>
                </div>
                {/* Bar */}
                <div style={{
                  width: '100%', height: cfg.height,
                  background: cfg.glowColor,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: '12px 12px 0 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 4,
                }}>
                  <span style={{ fontSize: '2rem' }}>{medal}</span>
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '1rem', fontWeight: 900, color: mClr }}>
                    #{cfg.posLabel}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Sort controls ───────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <div style={{
            display: 'flex', gap: 3, padding: 4,
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10,
          }}>
            {(['points', 'badges'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                padding: '6px 18px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: '.78rem', fontWeight: 600,
                background: sortBy === s ? 'var(--accent)' : 'transparent',
                color: sortBy === s ? '#fff' : 'var(--text-dim)',
                transition: 'all .2s',
              }}>
                By {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
          className="card" style={{ overflow: 'hidden' }}>

          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '48px 1fr 88px 88px 110px',
            gap: 12, padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(15,22,35,.6)',
          }}>
            {['#', 'Player', 'Points', 'Badges', 'Level'].map((h, i) => (
              <span key={h} style={{
                fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '.06em', color: 'var(--muted)',
                textAlign: i > 1 ? 'right' : 'left',
              }}>{h}</span>
            ))}
          </div>

          {/* Data rows */}
          {sorted.map((entry, i) => {
            const lvl = levelStyle[entry.level] || levelStyle['Level 1']
            const rnkColor = i < 3 ? rankColor[i] : 'var(--text-dim)'
            return (
              <motion.div key={entry.rank}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: .05 * i }}
                style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr 88px 88px 110px',
                  gap: 12, alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: i < sorted.length - 1 ? '1px solid rgba(30,45,69,.5)' : 'none',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,22,35,.6)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Rank */}
                <span style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '.95rem', color: rnkColor }}>
                  {i < 3 ? rankMedal[i] : `${i + 1}`}
                </span>

                {/* Player */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,rgba(79,142,247,.4),rgba(168,85,247,.4))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '.85rem',
                    border: '1px solid rgba(79,142,247,.2)',
                  }}>
                    {entry.avatar}
                  </div>
                  <span style={{ fontSize: '.88rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {entry.country} {entry.name}
                  </span>
                </div>

                {/* Points */}
                <span style={{ textAlign: 'right', fontWeight: 700, color: 'var(--accent)', fontSize: '.9rem' }}>
                  {entry.points}
                </span>

                {/* Badges */}
                <span style={{ textAlign: 'right', color: 'var(--text-dim)', fontSize: '.88rem' }}>
                  {entry.badges}
                </span>

                {/* Level */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span className="tag" style={{ color: lvl.color, background: lvl.bg, borderColor: lvl.border }}>
                    {entry.level}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: 36, textAlign: 'center' }}>
          <div style={{
            padding: '36px 28px', borderRadius: 20,
            background: 'linear-gradient(135deg,rgba(79,142,247,.08),rgba(168,85,247,.06))',
            border: '1px solid rgba(79,142,247,.18)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 8 }}>
              Where Do You Rank?
            </h3>
            <p style={{ color: 'var(--text-sub)', fontSize: '.88rem', marginBottom: 22 }}>
              Use the calculator to analyze your profile and see your stats.
            </p>
            <a href="/calculator" className="btn-primary"
              style={{ display: 'inline-block', padding: '12px 28px', fontSize: '.9rem', borderRadius: 11, textDecoration: 'none' }}>
              Check My Progress →
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
