'use client'

import { motion } from 'framer-motion'
import type { ProfileData } from '@/app/api/scrape/route'

interface Props {
  data: ProfileData
}

const MILESTONE_COLORS = ['#60a5fa', '#a78bfa', '#34d399', '#f59e0b']

export default function MilestoneTracker({ data }: Props) {
  const { milestones, arcadeCount, triviaCount, skillCount, currentMilestone, nextMilestone, arcadePoints, triviaPoints, skillPoints } = data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card"
      style={{ padding: '24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Milestone Progress</h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-dim)' }}>
            {currentMilestone === 'No Milestone Yet'
              ? `Working toward ${nextMilestone}`
              : `Achieved ${currentMilestone} · Next: ${nextMilestone}`}
          </p>
        </div>
        <span className="tag" style={{
          color: currentMilestone === 'No Milestone Yet' ? 'var(--muted)' : 'var(--green)',
          borderColor: currentMilestone === 'No Milestone Yet' ? 'rgba(75,90,114,.3)' : 'rgba(34,197,94,.3)',
          background: currentMilestone === 'No Milestone Yet' ? 'rgba(75,90,114,.1)' : 'var(--green-lo)',
          fontSize: '.72rem',
        }}>
          {currentMilestone}
        </span>
      </div>

      {/* Current counts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Arcade Games', count: arcadeCount, icon: '🎮', color: '#60a5fa' },
          { label: 'Trivia Badges', count: triviaCount, icon: '🧠', color: '#a78bfa' },
          { label: 'Skill Badges',  count: skillCount,  icon: '🏅', color: '#34d399' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'var(--surface)', borderRadius: 10, padding: '12px',
            border: '1px solid var(--border)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{item.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: item.color, fontFamily: 'var(--font-space)' }}>
              {item.count}
            </div>
            <div style={{ fontSize: '.65rem', color: 'var(--text-dim)', marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Milestone cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {milestones.map((m, i) => {
          const color = MILESTONE_COLORS[i] ?? '#60a5fa'
          const reqs = [
            { label: 'Arcade', need: m.gamesRequired,  have: arcadeCount },
            { label: 'Trivia', need: m.triviaRequired,  have: triviaCount },
            { label: 'Skill',  need: m.skillRequired,   have: skillCount  },
          ]
          return (
            <div key={m.name} style={{
              background: m.achieved ? color + '12' : 'var(--surface)',
              border: `1px solid ${m.achieved ? color + '40' : 'var(--border)'}`,
              borderRadius: 12, padding: '16px',
              position: 'relative', overflow: 'hidden',
            }}>
              {m.achieved && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                }} />
              )}
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: '.85rem', color: m.achieved ? color : 'var(--text-dim)' }}>
                  {m.name}
                </span>
                <span style={{
                  fontSize: '.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 99,
                  background: m.achieved ? color + '20' : 'var(--border)',
                  color: m.achieved ? color : 'var(--muted)',
                }}>
                  +{m.bonusPoints} pts bonus
                </span>
              </div>

              {/* Requirements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {reqs.map(r => {
                  const done = r.have >= r.need
                  const pct  = Math.min(100, Math.round((r.have / r.need) * 100))
                  return (
                    <div key={r.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.68rem', marginBottom: 3 }}>
                        <span style={{ color: done ? color : 'var(--text-dim)' }}>{r.label}</span>
                        <span style={{ color: done ? color : 'var(--muted)', fontWeight: 600 }}>
                          {Math.min(r.have, r.need)}/{r.need}
                          {done && ' ✓'}
                        </span>
                      </div>
                      <div style={{ height: 3, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                          style={{ height: '100%', borderRadius: 99, background: done ? color : 'var(--accent)' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bonus note */}
              <div style={{ marginTop: 10, fontSize: '.68rem', color: 'var(--muted)' }}>
                Total pts with bonus: <strong style={{ color: m.achieved ? color : 'var(--text-dim)' }}>{arcadePoints + triviaPoints + skillPoints + m.bonusPoints}</strong>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
