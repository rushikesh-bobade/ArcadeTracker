'use client'

import { motion } from 'framer-motion'
import type { ProfileData } from '@/app/api/scrape/route'

interface Props {
  data: ProfileData
}

const PRIZE_COLORS: Record<string, string> = {
  Novice:   '#60a5fa',
  Trooper:  '#a78bfa',
  Ranger:   '#34d399',
  Champion: '#f59e0b',
  Legend:   '#f43f5e',
}

export default function SwagProgress({ data }: Props) {
  const { prizeTiers, currentPrizeTier, nextPrizeTier, pointsToNextPrize, prizeProgress, totalPoints } = data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="card"
      style={{ padding: '24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Prize Tier Progress</h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-dim)' }}>
            {nextPrizeTier === 'Max Tier!'
              ? 'You have reached Legend tier!'
              : `${pointsToNextPrize} more point${pointsToNextPrize === 1 ? '' : 's'} to reach ${nextPrizeTier}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="tag" style={{ color: 'var(--accent)', borderColor: 'rgba(79,142,247,.3)', background: 'var(--accent-lo)', fontSize: '.72rem' }}>
            {totalPoints} pts total
          </span>
          {currentPrizeTier !== 'Not Eligible Yet' && (
            <span className="tag" style={{
              color: PRIZE_COLORS[currentPrizeTier] ?? 'var(--green)',
              borderColor: (PRIZE_COLORS[currentPrizeTier] ?? 'var(--green)') + '40',
              background: (PRIZE_COLORS[currentPrizeTier] ?? 'var(--green)') + '14',
              fontSize: '.72rem',
            }}>
              {currentPrizeTier}
            </span>
          )}
        </div>
      </div>

      {/* Overall progress bar */}
      <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--text-dim)', marginBottom: 6 }}>
            <span>0 pts</span>
            <span>95+ pts (Legend)</span>
          </div>
          <div style={{ height: 10, background: 'var(--surface)', borderRadius: 99, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (totalPoints / 95) * 100)}%` }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.3 }}
            style={{
              height: '100%',
              borderRadius: 99,
              background: 'linear-gradient(90deg, var(--accent), var(--purple), #34d399)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'linear-gradient(90deg, rgba(255,255,255,.15) 0%, transparent 60%)' }} />
          </motion.div>
        </div>
      </div>

      {/* Prize tier cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
        {prizeTiers.map((tier) => {
          const color = PRIZE_COLORS[tier.name] ?? '#60a5fa'
          const pct = tier.achieved ? 100 : Math.min(100, Math.round((totalPoints / tier.minPoints) * 100))
          return (
            <div key={tier.name} style={{
              background: tier.current ? color + '14' : 'var(--surface)',
              border: `1px solid ${tier.achieved ? color + '40' : 'var(--border)'}`,
              borderRadius: 12,
              padding: '14px 12px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {tier.current && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: tier.achieved ? color : 'var(--text-dim)' }}>
                  {tier.name}
                </span>
                {tier.achieved ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                ) : (
                  <span style={{ fontSize: '.6rem', color: 'var(--muted)' }}>{tier.minPoints}pt</span>
                )}
              </div>
              <div style={{ height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  style={{ height: '100%', borderRadius: 99, background: tier.achieved ? color : `linear-gradient(90deg, var(--accent), ${color})` }}
                />
              </div>
              {!tier.achieved && (
                <div style={{ fontSize: '.6rem', color: 'var(--muted)', marginTop: 5 }}>
                  {tier.minPoints - totalPoints} pts needed
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Eligibility note */}
      {totalPoints < 25 && (
        <div style={{
          marginTop: 16, padding: '10px 14px', borderRadius: 10,
          background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)',
          fontSize: '.78rem', color: '#fcd34d',
        }}>
          You need at least 25 points to become eligible for the Novice prize tier.
        </div>
      )}
    </motion.div>
  )
}
