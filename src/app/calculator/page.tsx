'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProfileData, BadgeData } from '@/app/api/scrape/route'
import BadgeCard from '@/components/BadgeCard'

const LS_KEY = 'arcade_last_url'
type SortMode   = 'default' | 'date' | 'type'
type FilterMode = 'all' | 'arcade' | 'trivia' | 'skill'

const TIER_META: Record<string, { color: string; pts: number }> = {
  Novice:   { color: '#60a5fa', pts: 25 },
  Trooper:  { color: '#a78bfa', pts: 45 },
  Ranger:   { color: '#34d399', pts: 65 },
  Champion: { color: '#f59e0b', pts: 75 },
  Legend:   { color: '#f43f5e', pts: 95 },
}

const IcoStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
)
const IcoGame = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="6" width="20" height="12" rx="3"/>
    <path strokeLinecap="round" d="M6 12h4M8 10v4M15 11h.01M17 13h.01"/>
  </svg>
)
const IcoTrivia = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
)
const IcoBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
  </svg>
)
const Spinner = () => (
  <svg style={{ animation: 'spin 1s linear infinite', width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/>
    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
)

function FilterPill({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 13px', borderRadius: 99, border: '1px solid',
      cursor: 'pointer', fontSize: '.73rem', fontWeight: 600, whiteSpace: 'nowrap',
      background: active ? 'rgba(245,158,11,.12)' : 'transparent',
      color: active ? '#f59e0b' : 'var(--text-dim)',
      borderColor: active ? 'rgba(245,158,11,.35)' : 'var(--border)',
      transition: 'all .15s',
      display: 'flex', alignItems: 'center', gap: 5,
    }}>
      {label}
      {count !== undefined && (
        <span style={{
          background: active ? 'rgba(245,158,11,.2)' : 'var(--surface)',
          padding: '0px 5px', borderRadius: 99, fontSize: '.6rem', fontWeight: 700,
          color: active ? '#f59e0b' : 'var(--text-dim)',
        }}>{count}</span>
      )}
    </button>
  )
}

function ProfileHeroCard({ data }: { data: ProfileData }) {
  const currentTierMeta = TIER_META[data.currentPrizeTier]
  const tierColor = currentTierMeta?.color ?? '#5a6280'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'grid', gap: 0,
        background: 'var(--card)',
        border: '1px solid rgba(245,158,11,.2)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(245,158,11,.07)',
      }}
      className="profile-hero-grid"
    >
      {/* LEFT: identity */}
      <div style={{
        padding: '26px 26px',
        borderRight: '1px solid var(--border)',
        background: 'linear-gradient(135deg, rgba(245,158,11,.03) 0%, transparent 60%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 18 }}>
          {data.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.avatarUrl} alt={data.name} style={{
              width: 62, height: 62, borderRadius: '50%', objectFit: 'cover',
              border: '2px solid rgba(245,158,11,.4)', flexShrink: 0,
              boxShadow: '0 0 20px rgba(245,158,11,.2)',
            }}/>
          ) : (
            <div style={{
              width: 62, height: 62, flexShrink: 0,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg,#f59e0b,#22d3ee)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0a0b0f', fontWeight: 900, fontSize: '1.4rem',
            }}>
              {data.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 3, lineHeight: 1.2 }}>{data.name}</div>
            <a href={data.profileUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '.61rem', color: 'var(--text-dim)', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {data.profileUrl.replace('https://www.', '').replace('https://', '')}
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {data.league && (
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: '.63rem', fontWeight: 700, background: 'rgba(245,158,11,.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,.28)' }}>{data.league}</span>
          )}
          {data.rank && (
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: '.63rem', fontWeight: 600, background: 'var(--surface)', color: 'var(--text-sub)', border: '1px solid var(--border)' }}>Rank #{data.rank.toLocaleString()}</span>
          )}
          {data.memberSince && (
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: '.63rem', fontWeight: 600, background: 'var(--surface)', color: 'var(--text-sub)', border: '1px solid var(--border)' }}>Since {data.memberSince}</span>
          )}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 15px', borderRadius: 11,
          background: tierColor + '0f', border: `1px solid ${tierColor}30`,
          marginBottom: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.54rem', color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 3 }}>CURRENT TIER</div>
            <div style={{ fontWeight: 800, fontSize: '.92rem', color: tierColor }}>{data.currentPrizeTier === 'Not Eligible Yet' ? 'Not Eligible' : data.currentPrizeTier}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '2rem', fontWeight: 900, color: tierColor, lineHeight: 1 }}>{data.totalPoints}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.53rem', color: 'var(--text-dim)', letterSpacing: '.08em' }}>SEASON PTS</div>
          </div>
        </div>
        {data.nextPrizeTier !== 'Max Tier!' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.66rem', color: 'var(--text-dim)', marginBottom: 5, fontFamily: 'JetBrains Mono, monospace' }}>
              <span>to {data.nextPrizeTier}</span>
              <span style={{ color: tierColor }}>{data.pointsToNextPrize} pts needed</span>
            </div>
            <div style={{ height: 5, background: 'var(--surface)', borderRadius: 99, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, data.prizeProgress)}%` }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.4 }}
                style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${tierColor}, ${tierColor}bb)` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: season info + badge counts + tier track */}
      <div style={{ padding: '26px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 5, marginBottom: 14,
            background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} className="pulse-dot"/>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.55rem', color: '#10b981', letterSpacing: '.1em', fontWeight: 700 }}>SEASON 1 · LIVE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {[
              { label: 'SEASON START', value: 'Jan 8, 2026' },
              { label: 'SEASON END',   value: 'Mar 27, 2026' },
              { label: 'FACILITATOR',  value: 'Cohort Active' },
              { label: 'BONUS WINDOW', value: 'Feb – Mar 2026' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--surface)', borderRadius: 8, padding: '9px 11px', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.5rem', color: 'var(--text-dim)', letterSpacing: '.09em', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: '.76rem', fontWeight: 700, color: 'var(--text-sub)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {[
            { label: 'ARCADE', val: data.arcadeCount,  color: '#60a5fa', icon: <IcoGame/>   },
            { label: 'SPRINT', val: data.triviaCount,  color: '#a78bfa', icon: <IcoTrivia/> },
            { label: 'SKILL',  val: data.skillCount,   color: '#34d399', icon: <IcoBadge/>  },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', borderRadius: 9, padding: '10px 8px', textAlign: 'center', border: `1px solid ${s.color}20` }}>
              <div style={{ color: s.color, marginBottom: 4, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '1.4rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.49rem', color: 'var(--text-dim)', marginTop: 3, letterSpacing: '.07em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.54rem', color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 9 }}>PRIZE TIERS</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {data.prizeTiers.map(tier => {
              const meta = TIER_META[tier.name]
              return (
                <div key={tier.name} style={{
                  flex: 1, padding: '7px 4px', borderRadius: 8, textAlign: 'center',
                  background: tier.current ? meta.color + '18' : tier.achieved ? meta.color + '0d' : 'var(--surface)',
                  border: `1px solid ${tier.current ? meta.color + '60' : tier.achieved ? meta.color + '35' : 'var(--border)'}`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  {tier.current && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: meta.color }}/>}
                  {tier.achieved
                    ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="3" style={{ display: 'block', margin: '0 auto 2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : <div style={{ width: 7, height: 7, borderRadius: '50%', border: `1.5px solid ${tier.current ? meta.color : 'var(--border-hi)'}`, margin: '0 auto 2px' }}/>
                  }
                  <div style={{ fontSize: '.53rem', fontWeight: 700, color: tier.achieved ? meta.color : 'var(--text-dim)' }}>{tier.name.slice(0, 4)}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.46rem', color: 'var(--text-dim)', marginTop: 1 }}>{meta.pts}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StatCards({ data }: { data: ProfileData }) {
  const cards = [
    { title: 'Total Points', value: data.totalPoints, icon: <IcoStar/>, color: '#f59e0b', colorLo: 'rgba(245,158,11,.1)', sub1: `Base ${data.arcadePoints + data.triviaPoints + data.skillPoints} pts`, sub2: `+ ${data.milestoneBonus} milestone bonus`, showTiers: true },
    { title: 'Arcade Games', value: data.arcadeCount, icon: <IcoGame/>, color: '#60a5fa', colorLo: 'rgba(96,165,250,.1)', sub1: `${data.arcadePoints} pt${data.arcadePoints !== 1 ? 's' : ''} earned`, sub2: '1 pt per game', showTiers: false },
    { title: 'Sprint Badges', value: data.triviaCount, icon: <IcoTrivia/>, color: '#a78bfa', colorLo: 'rgba(167,139,250,.1)', sub1: `${data.triviaPoints} pt${data.triviaPoints !== 1 ? 's' : ''} earned`, sub2: '1 pt per badge', showTiers: false },
    { title: 'Skill Badges', value: data.skillCount, icon: <IcoBadge/>, color: '#34d399', colorLo: 'rgba(52,211,153,.1)', sub1: `${data.skillPoints} pts earned`, sub2: 'every 2 = 1 pt', showTiers: false },
  ]
  return (
    <div style={{ display: 'grid', gap: 11 }} className="stat-cards-grid">
      {cards.map((c, i) => (
        <motion.div key={c.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
          className="card card-hover"
          style={{ padding: '17px 17px 14px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.color}, transparent)` }}/>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.53rem', color: 'var(--text-dim)', letterSpacing: '.1em', textTransform: 'uppercase', paddingTop: 2 }}>{c.title}</div>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: c.colorLo, border: `1px solid ${c.color}28`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: '2.2rem', fontWeight: 900, color: c.color, lineHeight: 1, marginBottom: 8 }}>{c.value}</div>
          <div style={{ fontSize: '.66rem', color: 'var(--text-sub)', marginBottom: 1 }}>{c.sub1}</div>
          <div style={{ fontSize: '.61rem', color: 'var(--text-dim)' }}>{c.sub2}</div>
          {c.showTiers && (
            <div style={{ marginTop: 10, display: 'flex', gap: 3 }}>
              {data.prizeTiers.map(tier => {
                const meta = TIER_META[tier.name]
                return (
                  <div key={tier.name} title={`${tier.name}: ${meta.pts} pts`} style={{
                    flex: 1, height: 4, borderRadius: 99,
                    background: tier.achieved ? meta.color : tier.current ? meta.color + '55' : 'var(--border)',
                  }}/>
                )
              })}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function OverviewTab({ data }: { data: ProfileData }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      {/* Points breakdown */}
      <div style={{ padding: '20px 22px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 15, borderRadius: 99, background: 'linear-gradient(180deg,#f59e0b,#22d3ee)', flexShrink: 0 }}/>
          <h3 style={{ fontWeight: 700, fontSize: '.87rem' }}>Points Breakdown</h3>
          <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-space)', fontSize: '1.15rem', fontWeight: 900, color: '#f59e0b' }}>
            {data.totalPoints} <span style={{ fontSize: '.63rem', color: 'var(--text-dim)', fontFamily: 'inherit', fontWeight: 400 }}>pts</span>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10 }} className="breakdown-grid">
          {[
            { label: 'Arcade',    pts: data.arcadePoints,   formula: `${data.arcadeCount} × 1`,  color: '#60a5fa' },
            { label: 'Sprint',    pts: data.triviaPoints,   formula: `${data.triviaCount} × 1`,  color: '#a78bfa' },
            { label: 'Skill',     pts: data.skillPoints,    formula: `${data.skillCount} ÷ 2`,  color: '#34d399' },
            { label: 'Milestone', pts: data.milestoneBonus, formula: data.currentMilestone,      color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--surface)', borderRadius: 10, padding: '13px 13px', border: `1px solid ${item.pts > 0 ? item.color + '28' : 'var(--border)'}`, position: 'relative', overflow: 'hidden' }}>
              {item.pts > 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.color}, transparent)` }}/>}
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.53rem', color: 'var(--text-dim)', marginBottom: 7, letterSpacing: '.08em', textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '1.85rem', fontWeight: 900, color: item.pts > 0 ? item.color : 'var(--text-dim)', lineHeight: 1 }}>{item.pts}</div>
              <div style={{ fontSize: '.62rem', color: 'var(--text-dim)', marginTop: 5 }}>{item.formula}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone tracker */}
      <div style={{ padding: '20px 22px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 15, borderRadius: 99, background: 'linear-gradient(180deg,#22d3ee,#a78bfa)', flexShrink: 0 }}/>
          <h3 style={{ fontWeight: 700, fontSize: '.87rem' }}>Milestone Progress</h3>
          <span style={{ marginLeft: 'auto', fontSize: '.68rem', color: data.currentMilestone === 'No Milestone Yet' ? 'var(--text-dim)' : '#10b981', fontWeight: 600 }}>
            {data.currentMilestone === 'No Milestone Yet' ? `Next: ${data.nextMilestone}` : `${data.currentMilestone} achieved`}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 11 }}>
          {data.milestones.map((m, i) => {
            const colors = ['#60a5fa','#a78bfa','#34d399','#f59e0b']
            const color = colors[i] ?? '#60a5fa'
            const reqs = [
              { label: 'Arcade', need: m.gamesRequired,  have: data.arcadeCount },
              { label: 'Sprint', need: m.triviaRequired,  have: data.triviaCount },
              { label: 'Skill',  need: m.skillRequired,   have: data.skillCount  },
            ]
            return (
              <div key={m.name} style={{ background: m.achieved ? color + '10' : 'var(--surface)', border: `1px solid ${m.achieved ? color + '40' : 'var(--border)'}`, borderRadius: 12, padding: '15px', position: 'relative', overflow: 'hidden' }}>
                {m.achieved && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}/>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
                  <span style={{ fontWeight: 700, fontSize: '.82rem', color: m.achieved ? color : 'var(--text-sub)' }}>{m.name}</span>
                  <span style={{ fontSize: '.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: m.achieved ? color + '20' : 'var(--border)', color: m.achieved ? color : 'var(--muted)' }}>+{m.bonusPoints} pts</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {reqs.map(r => {
                    const done = r.have >= r.need
                    const pct  = Math.min(100, Math.round((r.have / r.need) * 100))
                    return (
                      <div key={r.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.63rem', marginBottom: 3 }}>
                          <span style={{ color: done ? color : 'var(--text-dim)' }}>{r.label}</span>
                          <span style={{ color: done ? color : 'var(--muted)', fontWeight: 600 }}>{Math.min(r.have, r.need)}/{r.need}{done && ' ✓'}</span>
                        </div>
                        <div style={{ height: 3, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                            style={{ height: '100%', borderRadius: 99, background: done ? color : '#f59e0b80' }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Prize tiers — horizontal milestone track */}
      <div style={{ padding: '20px 22px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 3, height: 15, borderRadius: 99, background: 'linear-gradient(180deg,#f59e0b,#f43f5e)', flexShrink: 0 }}/>
          <h3 style={{ fontWeight: 700, fontSize: '.87rem' }}>Reward Tiers</h3>
          <span style={{ marginLeft: 'auto', fontSize: '.7rem', color: 'var(--text-dim)' }}>
            {data.nextPrizeTier === 'Max Tier!' ? 'Max tier reached!' : `${data.pointsToNextPrize} pts to ${data.nextPrizeTier}`}
          </span>
        </div>
        {/* track */}
        <div style={{ position: 'relative', padding: '24px 0 8px' }}>
          <div style={{ position: 'absolute', top: '50%', left: 14, right: 14, height: 3, background: 'var(--border)', borderRadius: 99, transform: 'translateY(-8px)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, (data.totalPoints / 95) * 100)}%` }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: .3 }}
              style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#60a5fa,#a78bfa,#34d399,#f59e0b,#f43f5e)' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {data.prizeTiers.map(tier => {
              const meta = TIER_META[tier.name]
              return (
                <div key={tier.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: tier.achieved ? meta.color : tier.current ? meta.color + '30' : 'var(--surface)',
                    border: `2px solid ${tier.achieved ? meta.color : tier.current ? meta.color : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: tier.current ? `0 0 12px ${meta.color}60` : 'none',
                  }}>
                    {tier.achieved
                      ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0a0b0f" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      : <div style={{ width: 6, height: 6, borderRadius: '50%', background: tier.current ? meta.color : 'var(--border-hi)' }}/>
                    }
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '.65rem', fontWeight: 700, color: tier.achieved ? meta.color : tier.current ? meta.color : 'var(--text-dim)' }}>{tier.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.52rem', color: 'var(--text-dim)' }}>{meta.pts}pts</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', marginTop: 8 }}>
          <span style={{ fontSize: '.68rem', color: 'var(--text-dim)' }}>You are at</span>
          <span style={{ fontFamily: 'var(--font-space)', fontWeight: 900, fontSize: '.95rem', color: '#f59e0b' }}>{data.totalPoints} pts</span>
          {data.currentPrizeTier !== 'Not Eligible Yet' && (
            <><span style={{ color: 'var(--border)' }}>·</span><span style={{ fontSize: '.68rem', color: TIER_META[data.currentPrizeTier]?.color ?? 'var(--text-sub)', fontWeight: 700 }}>{data.currentPrizeTier} tier</span></>
          )}
          {data.nextPrizeTier !== 'Max Tier!' && (
            <><span style={{ color: 'var(--border)' }}>·</span><span style={{ fontSize: '.68rem', color: 'var(--text-dim)' }}>{data.pointsToNextPrize} more to {data.nextPrizeTier}</span></>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ActiveTab({ data }: { data: ProfileData }) {
  const earned  = data.activeBadges.filter(b => b.earnedByUser)
  const pending = data.activeBadges.filter(b => !b.earnedByUser)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
        <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.2)', display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: 'rgba(16,185,129,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '1.7rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>{earned.length}</div>
            <div style={{ fontSize: '.69rem', color: 'var(--text-dim)', marginTop: 2 }}>Earned this month</div>
          </div>
        </div>
        <div style={{ padding: '16px 18px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: 'rgba(245,158,11,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '1.7rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{pending.length}</div>
            <div style={{ fontSize: '.69rem', color: 'var(--text-dim)', marginTop: 2 }}>Pending badges</div>
          </div>
        </div>
      </div>

      {/* 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="active-badges-grid">
        {/* EARNED */}
        <div style={{ background: 'var(--card)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '13px 17px 11px', borderBottom: '1px solid rgba(16,185,129,.15)', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,.04)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} className="pulse-dot"/>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.6rem', fontWeight: 700, color: '#10b981', letterSpacing: '.08em' }}>EARNED · {earned.length}</span>
          </div>
          <div style={{ padding: 13, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {earned.length === 0 && <div style={{ textAlign: 'center', padding: '22px 12px', color: 'var(--text-dim)', fontSize: '.78rem' }}>No earned badges yet</div>}
            {earned.map(badge => (
              <div key={badge.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 10, background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.18)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {badge.imageUrl
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={badge.imageUrl} alt={badge.name} style={{ width: 34, height: 34, objectFit: 'contain' }} onError={e => { const el = e.target as HTMLImageElement; el.style.display='none'; if(el.parentElement) el.parentElement.innerHTML='<span style="font-size:1rem">🏅</span>' }}/>
                    : <span style={{ fontSize: '1rem' }}>🏅</span>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 600, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{badge.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.56rem', color: 'var(--text-dim)' }}>{badge.type} · {badge.points}pt · {badge.deadline}</div>
                </div>
                <span style={{ padding: '2px 7px', borderRadius: 99, fontSize: '.58rem', fontWeight: 700, background: 'rgba(16,185,129,.12)', color: '#10b981', border: '1px solid rgba(16,185,129,.2)', flexShrink: 0 }}>✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* PENDING */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '13px 17px 11px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)' }}>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.6rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '.08em' }}>PENDING · {pending.length}</span>
          </div>
          <div style={{ padding: 13, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {pending.length === 0 && <div style={{ textAlign: 'center', padding: '22px 12px', color: '#10b981', fontSize: '.78rem', fontWeight: 600 }}>All badges earned!</div>}
            {pending.map(badge => (
              <div key={badge.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {badge.imageUrl
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={badge.imageUrl} alt={badge.name} style={{ width: 34, height: 34, objectFit: 'contain', opacity: 0.55 }} onError={e => { const el = e.target as HTMLImageElement; el.style.display='none'; if(el.parentElement) el.parentElement.innerHTML='<span style="font-size:1rem">🔒</span>' }}/>
                    : <span style={{ fontSize: '1rem' }}>🔒</span>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 600, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-sub)' }}>{badge.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.56rem', color: 'var(--text-dim)' }}>{badge.type} · {badge.points}pt · Due {badge.deadline}</div>
                </div>
                <a href={badge.link} target="_blank" rel="noopener noreferrer" style={{ padding: '3px 9px', borderRadius: 99, fontSize: '.6rem', fontWeight: 700, background: 'rgba(245,158,11,.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,.25)', textDecoration: 'none', flexShrink: 0 }}>
                  Start ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProfileScanPage() {
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [data, setData]       = useState<ProfileData | null>(null)
  const [sort, setSort]       = useState<SortMode>('default')
  const [filter, setFilter]   = useState<FilterMode>('all')
  const [tab, setTab]         = useState<'overview' | 'badges' | 'active'>('overview')

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY)
    if (saved) setUrl(saved)
  }, [])

  const run = useCallback(async () => {
    if (!url.trim()) return
    setLoading(true); setError(''); setData(null); setTab('overview')
    try {
      localStorage.setItem(LS_KEY, url.trim())
      const res  = await fetch('/api/scrape', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error || 'Failed to fetch profile')
      else setData(json as ProfileData)
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }, [url])

  const getFilteredBadges = (badges: BadgeData[]) => {
    let list = [...badges]
    if (filter === 'arcade') list = list.filter(b => b.type === 'arcade')
    if (filter === 'trivia') list = list.filter(b => b.type === 'trivia')
    if (filter === 'skill')  list = list.filter(b => b.type === 'skill')
    if (sort === 'date') list.sort((a, b) => {
      if (!a.earnedDate) return 1; if (!b.earnedDate) return -1
      return new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime()
    })
    if (sort === 'type') {
      const o: Record<string, number> = { arcade: 0, trivia: 1, skill: 2, lab: 3, course: 4, other: 5 }
      list.sort((a, b) => (o[a.type] ?? 5) - (o[b.type] ?? 5))
    }
    return list
  }

  return (
    <div className="dot-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '44px 20px 88px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 30 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 14px', borderRadius: 6, background: 'rgba(245,158,11,.07)', border: '1px solid rgba(245,158,11,.2)', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} className="pulse-dot"/>
            ORBIT · PROFILE SCAN · SEASON 1 · 2026
          </div>
          <h1 style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(1.7rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: 8 }}>
            Scan Your Arcade <span className="text-amber">Profile</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '.88rem', maxWidth: 500 }}>
            Drop your public Cloud Skills Boost URL — we&apos;ll pull your <strong style={{ color: 'var(--text)' }}>current season</strong> badges, compute points, and show tier progress instantly.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 }} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '12px 14px', background: 'var(--card)', border: '1px solid rgba(245,158,11,.18)', borderRadius: 14, boxShadow: '0 0 30px rgba(245,158,11,.04)' }}>
            <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
              </div>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && run()}
                placeholder="https://www.cloudskillsboost.google/public_profiles/YOUR-ID"
                style={{ width: '100%', boxSizing: 'border-box', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 9, color: 'var(--text)', padding: '11px 12px 11px 34px', fontSize: '.84rem', outline: 'none', fontFamily: 'JetBrains Mono, monospace' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,.4)')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <button onClick={run} disabled={loading || !url.trim()} className="btn-primary" style={{ padding: '11px 26px', fontSize: '.86rem', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {loading ? <><Spinner/> Scanning…</> : 'Run Scan →'}
            </button>
          </div>
          <p style={{ fontSize: '.65rem', color: 'var(--text-dim)', marginTop: 6, paddingLeft: 4, fontFamily: 'JetBrains Mono, monospace' }}>
            Profile must be set to Public · Shows <span style={{ color: '#f59e0b' }}>current season only</span>
          </p>
        </motion.div>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginBottom: 22, padding: '13px 17px', borderRadius: 11, background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.22)', color: '#f87171', fontSize: '.83rem', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/></svg>
              <span style={{ whiteSpace: 'pre-line' }}>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SKELETON */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="shimmer" style={{ height: 155, borderRadius: 16, background: 'var(--card)' }}/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 11 }}>
              {[1,2,3,4].map(i => <div key={i} className="shimmer" style={{ height: 105, borderRadius: 14, background: 'var(--card)' }}/>)}
            </div>
            <div className="shimmer" style={{ height: 200, borderRadius: 14, background: 'var(--card)' }}/>
          </div>
        )}

        {/* RESULTS */}
        <AnimatePresence>
          {data && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>

              <div style={{ marginBottom: 14 }}><ProfileHeroCard data={data}/></div>
              <div style={{ marginBottom: 14 }}><StatCards data={data}/></div>

              {/* Dashboard split */}
              <div style={{ display: 'grid', gap: 14, alignItems: 'start' }} className="dashboard-split">

                {/* LEFT SIDEBAR */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {/* vertical nav */}
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                    {([
                      { id: 'overview', label: 'Overview', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, count: undefined as number | undefined },
                      { id: 'badges',   label: 'Season Badges', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>, count: data.seasonBadges.length },
                      { id: 'active',   label: 'Active Now', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, count: data.activeBadges.length },
                    ] as const).map((t, idx) => (
                      <button key={t.id} onClick={() => setTab(t.id)} style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                        padding: '12px 15px', border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: tab === t.id ? 'rgba(245,158,11,.1)' : 'transparent',
                        color: tab === t.id ? '#f59e0b' : 'var(--text-sub)',
                        borderLeft: `3px solid ${tab === t.id ? '#f59e0b' : 'transparent'}`,
                        borderBottom: idx < 2 ? '1px solid var(--border)' : 'none',
                        transition: 'all .15s', fontSize: '.8rem', fontWeight: 600,
                      }}>
                        <span style={{ color: tab === t.id ? '#f59e0b' : 'var(--text-dim)' }}>{t.icon}</span>
                        <span style={{ flex: 1 }}>{t.label}</span>
                        {t.count !== undefined && (
                          <span style={{ fontSize: '.58rem', fontWeight: 700, padding: '1px 6px', borderRadius: 99, background: tab === t.id ? 'rgba(245,158,11,.2)' : 'var(--surface)', color: tab === t.id ? '#f59e0b' : 'var(--text-dim)', border: `1px solid ${tab === t.id ? 'rgba(245,158,11,.3)' : 'var(--border)'}` }}>{t.count}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* points recap */}
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '15px' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.54rem', color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 11 }}>POINTS RECAP</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {[
                        { label: 'Arcade',    val: data.arcadePoints,   color: '#60a5fa' },
                        { label: 'Sprint',    val: data.triviaPoints,   color: '#a78bfa' },
                        { label: 'Skill',     val: data.skillPoints,    color: '#34d399' },
                        { label: 'Milestone', val: data.milestoneBonus, color: '#f59e0b' },
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: item.color, flexShrink: 0 }}/>
                          <span style={{ flex: 1, fontSize: '.7rem', color: 'var(--text-dim)' }}>{item.label}</span>
                          <span style={{ fontFamily: 'var(--font-space)', fontSize: '.82rem', fontWeight: 700, color: item.color }}>{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 11, paddingTop: 9, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.05rem', fontWeight: 900, color: '#f59e0b' }}>{data.totalPoints}</span>
                    </div>
                  </div>

                  {/* milestone status */}
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '15px' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.54rem', color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 11 }}>MILESTONES</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {data.milestones.map((m, i) => {
                        const colors = ['#60a5fa','#a78bfa','#34d399','#f59e0b']
                        const color = colors[i] ?? '#60a5fa'
                        return (
                          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 15, height: 15, borderRadius: '50%', flexShrink: 0, background: m.achieved ? color + '20' : 'var(--surface)', border: `1.5px solid ${m.achieved ? color : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {m.achieved && <svg width="7" height="7" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>}
                            </div>
                            <span style={{ flex: 1, fontSize: '.7rem', color: m.achieved ? 'var(--text-sub)' : 'var(--text-dim)' }}>{m.name}</span>
                            <span style={{ fontSize: '.6rem', fontWeight: 700, color: m.achieved ? color : 'var(--muted)' }}>+{m.bonusPoints}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div>
                  {tab === 'overview' && <OverviewTab data={data}/>}

                  {tab === 'badges' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '20px 22px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 17, flexWrap: 'wrap' }}>
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: '.93rem', marginBottom: 3 }}>Season 1 Badges</h3>
                          <p style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>
                            {data.seasonBadges.length} badge{data.seasonBadges.length !== 1 ? 's' : ''} this season
                            {data.badges.length > data.seasonBadges.length && <span style={{ marginLeft: 6 }}>· {data.badges.length - data.seasonBadges.length} older seasons excluded</span>}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            <FilterPill label="All"    active={filter === 'all'}    count={data.seasonBadges.length} onClick={() => setFilter('all')}/>
                            <FilterPill label="Arcade" active={filter === 'arcade'} count={data.arcadeCount}         onClick={() => setFilter('arcade')}/>
                            <FilterPill label="Sprint" active={filter === 'trivia'} count={data.triviaCount}         onClick={() => setFilter('trivia')}/>
                            <FilterPill label="Skill"  active={filter === 'skill'}  count={data.skillCount}          onClick={() => setFilter('skill')}/>
                          </div>
                          <select value={sort} onChange={e => setSort(e.target.value as SortMode)}
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-dim)', fontSize: '.71rem', borderRadius: 8, padding: '5px 9px', outline: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>
                            <option value="default">Sort: Default</option>
                            <option value="date">Sort: Date</option>
                            <option value="type">Sort: Type</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(132px,1fr))', gap: 10 }}>
                        {getFilteredBadges(data.seasonBadges).map((badge, i) => (
                          <BadgeCard key={badge.id} badge={badge} index={i}/>
                        ))}
                      </div>
                      {getFilteredBadges(data.seasonBadges).length === 0 && (
                        <div style={{ textAlign: 'center', padding: '38px 20px', color: 'var(--text-dim)', fontSize: '.88rem' }}>No badges match this filter.</div>
                      )}
                    </motion.div>
                  )}

                  {tab === 'active' && <ActiveTab data={data}/>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {!data && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}
            style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{ width: 72, height: 72, margin: '0 auto 22px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', background: 'linear-gradient(135deg,rgba(245,158,11,.15),rgba(34,211,238,.1))', border: '1px solid rgba(245,158,11,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 8 }}>Ready to Scan</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '.86rem', maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Enter your public Cloud Skills Boost profile URL and click <strong style={{ color: 'var(--text)' }}>Run Scan</strong> to see your full Season 1 progress.
            </p>
            <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto', gap: '9px 32px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 28px', textAlign: 'left' }}>
              {[
                { label: 'Arcade Game',     val: '1 pt each',      color: '#60a5fa' },
                { label: 'Sprint Badge',    val: '1 pt each',      color: '#a78bfa' },
                { label: 'Skill Badge',     val: '1 per 2 badges', color: '#34d399' },
                { label: 'Milestone Bonus', val: '+2 to +25 pts',  color: '#f59e0b' },
              ].map(r => (
                <React.Fragment key={r.label}>
                  <span style={{ fontSize: '.78rem', color: 'var(--text-dim)' }}>{r.label}</span>
                  <span style={{ fontSize: '.78rem', fontWeight: 700, color: r.color }}>{r.val}</span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .profile-hero-grid { grid-template-columns: 1fr 1fr; }
        .stat-cards-grid   { grid-template-columns: repeat(4,1fr); }
        .dashboard-split   { grid-template-columns: 210px 1fr; }
        .active-badges-grid{ grid-template-columns: 1fr 1fr; }
        .breakdown-grid    { grid-template-columns: repeat(4,1fr); }
        @media (max-width: 1024px) {
          .dashboard-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) {
          .profile-hero-grid  { grid-template-columns: 1fr !important; }
          .stat-cards-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .active-badges-grid { grid-template-columns: 1fr !important; }
          .breakdown-grid     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .stat-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .breakdown-grid  { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
