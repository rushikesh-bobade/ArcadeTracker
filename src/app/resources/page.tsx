'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const resources = [
  {
    category: 'Official Program',
    icon: '🎮',
    items: [
      {
        title: 'Google Cloud Arcade',
        description: 'Official program page with all details about the 2025 Arcade campaign, rules, and prizes.',
        url: 'https://cloud.google.com/learn/training/arcade',
        icon: '🎮',
        tag: 'Official',
        tagColor: { color: 'var(--accent)', bg: 'var(--accent-lo)', border: 'rgba(79,142,247,.3)' },
      },
      {
        title: 'Cloud Skills Boost',
        description: 'The platform where you complete labs, courses, and earn all your Arcade badges.',
        url: 'https://www.cloudskillsboost.google/',
        icon: '🚀',
        tag: 'Platform',
        tagColor: { color: 'var(--purple)', bg: 'var(--purple-lo)', border: 'rgba(168,85,247,.3)' },
      },
    ],
  },
  {
    category: 'Earning Points',
    icon: '⭐',
    items: [
      {
        title: 'Arcade Games',
        description: 'Monthly Arcade game badges — complete all labs to earn 1 Arcade point each.',
        url: 'https://www.cloudskillsboost.google/catalog?keywords=arcade',
        icon: '⭐',
        tag: '1 Point Each',
        tagColor: { color: 'var(--accent)', bg: 'var(--accent-lo)', border: 'rgba(79,142,247,.3)' },
      },
      {
        title: 'Skill Badges',
        description: 'Complete all labs in a Skill Badge learning path — every 2 skill badges = 1 campaign point.',
        url: 'https://www.cloudskillsboost.google/catalog?keywords=skill+badge',
        icon: '🏅',
        tag: '1 pt per 2 badges',
        tagColor: { color: 'var(--purple)', bg: 'var(--purple-lo)', border: 'rgba(168,85,247,.3)' },
      },
      {
        title: 'Trivia / Sprint Games',
        description: 'Weekly Sprint badge activities — answer correctly to earn 1 Arcade point per Sprint.',
        url: 'https://www.cloudskillsboost.google/catalog?keywords=trivia',
        icon: '🧠',
        tag: '1 Point Each',
        tagColor: { color: 'var(--yellow)', bg: 'var(--yellow-lo)', border: 'rgba(245,158,11,.3)' },
      },
    ],
  },
  {
    category: 'Prize Tiers (Season 1)',
    icon: '🎁',
    items: [
      {
        title: 'Novice — 25 Points',
        description: 'Reach 25 points to unlock the Novice prize tier and claim your first Arcade swag.',
        icon: '🔵',
        tag: 'Tier 1',
        tagColor: { color: '#60a5fa', bg: 'rgba(96,165,250,.1)', border: 'rgba(96,165,250,.3)' },
      },
      {
        title: 'Trooper — 45 Points',
        description: 'Earn 45 points for Trooper tier — branded Google Cloud merchandise.',
        icon: '🟣',
        tag: 'Tier 2',
        tagColor: { color: '#a78bfa', bg: 'rgba(167,139,250,.1)', border: 'rgba(167,139,250,.3)' },
      },
      {
        title: 'Ranger — 65 Points',
        description: 'Hit 65 points for Ranger tier — a full swag bag with premium clothing and accessories.',
        icon: '🟢',
        tag: 'Tier 3',
        tagColor: { color: '#34d399', bg: 'rgba(52,211,153,.1)', border: 'rgba(52,211,153,.3)' },
      },
      {
        title: 'Champion — 75 Points',
        description: 'Reach 75 points for Champion tier — jacket, backpack, and exclusive collectibles.',
        icon: '🟡',
        tag: 'Tier 4',
        tagColor: { color: 'var(--yellow)', bg: 'var(--yellow-lo)', border: 'rgba(245,158,11,.3)' },
      },
      {
        title: 'Legend — 95 Points',
        description: 'The ultimate tier at 95 points — limited-edition jersey and top-performer recognition.',
        icon: '🔴',
        tag: 'Top Tier',
        tagColor: { color: '#f43f5e', bg: 'rgba(244,63,94,.1)', border: 'rgba(244,63,94,.3)' },
      },
    ],
  },
  {
    category: 'Community & Tips',
    icon: '👥',
    items: [
      {
        title: 'Arcade Facilitator Program',
        description: 'Join as a facilitator to help others complete the Arcade and earn additional perks.',
        url: 'https://cloud.google.com/blog/topics/training-certifications',
        icon: '👥',
        tag: 'Community',
        tagColor: { color: 'var(--text-dim)', bg: 'rgba(75,90,114,.15)', border: 'rgba(75,90,114,.3)' },
      },
      {
        title: 'Google Cloud Community',
        description: 'Join forums and Discord to get help, share tips, and connect with other Arcade participants.',
        url: 'https://www.cloudskillsboost.google/community',
        icon: '💬',
        tag: 'Community',
        tagColor: { color: 'var(--text-dim)', bg: 'rgba(75,90,114,.15)', border: 'rgba(75,90,114,.3)' },
      },
    ],
  },
]

const pointsTable = [
  { activity: 'Arcade Game Badge',    points: '1 pt each',        notes: 'Monthly games — 1 pt per badge'   },
  { activity: 'Sprint (Trivia) Badge', points: '1 pt each',       notes: 'Weekly sprint activities'         },
  { activity: 'Skill Badge',          points: '1 pt per 2 badges', notes: 'From active campaign skill list' },
  { activity: 'Milestone Bonus',      points: '+2 to +25 pts',    notes: 'One-time bonus per milestone hit' },
]

const swagTiers = [
  { level: 'Novice',   pts: 25, color: '#60a5fa' },
  { level: 'Trooper',  pts: 45, color: '#a78bfa' },
  { level: 'Ranger',   pts: 65, color: '#34d399' },
  { level: 'Champion', pts: 75, color: 'var(--yellow)' },
  { level: 'Legend',   pts: 95, color: '#f43f5e' },
]

export default function ResourcesPage() {
  return (
    <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px', borderRadius: 99,
            background: 'var(--green-lo)', border: '1px solid rgba(34,197,94,.25)',
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: 18,
          }}>
            📚 Complete Guide
          </span>
          <h1 style={{
            fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 14,
          }}>
            <span className="gradient-text">Resources</span> & Guide
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
            Everything you need to know about Google Cloud Arcade — how to earn points, hit swag tiers, and maximize your progress.
          </p>
        </motion.div>

        {/* ── Quick CTA ───────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
          style={{
            marginBottom: 44, padding: '22px 24px', borderRadius: 18,
            background: 'linear-gradient(135deg,rgba(79,142,247,.1),rgba(168,85,247,.07))',
            border: '1px solid rgba(79,142,247,.22)',
            display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
          }}>
          <div style={{ fontSize: '2.6rem', flexShrink: 0 }}>🎯</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 5 }}>Ready to check your progress?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '.85rem' }}>
              Use Arcade Tracker to instantly see where you stand — badges, points, swag level.
            </p>
          </div>
          <Link href="/calculator" className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '.88rem', textDecoration: 'none', borderRadius: 11, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Open Calculator →
          </Link>
        </motion.div>

        {/* ── Resource sections ───────────────────────────── */}
        {resources.map((section, si) => (
          <motion.div key={section.category}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * .05 }}
            style={{ marginBottom: 40 }}>

            {/* Section heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 4, height: 22, borderRadius: 99,
                background: 'linear-gradient(180deg,var(--accent),var(--purple))',
              }}/>
              <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
              <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.05rem' }}>
                {section.category}
              </h2>
            </div>

            {/* Cards grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}>
              {section.items.map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .04 }}
                  className="card card-hover"
                  style={{ padding: '20px 18px' }}>

                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Title + tag */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 7 }}>
                        <h3 style={{ fontWeight: 600, fontSize: '.88rem', lineHeight: 1.3 }}>{item.title}</h3>
                        <span className="tag" style={{
                          color: item.tagColor.color,
                          background: item.tagColor.bg,
                          borderColor: item.tagColor.border,
                          flexShrink: 0,
                        }}>
                          {item.tag}
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-dim)', fontSize: '.8rem', lineHeight: 1.65, marginBottom: item.url ? 12 : 0 }}>
                        {item.description}
                      </p>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '.78rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                          Visit →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* ── Quick Reference Table ───────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="card" style={{ padding: '24px', marginBottom: 32 }}>

          <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 20 }}>
            📊 Points Quick Reference
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Activity', 'Points', 'Notes'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '10px 14px',
                      color: 'var(--text-dim)', fontWeight: 600, fontSize: '.72rem',
                      textTransform: 'uppercase', letterSpacing: '.06em',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((row, i) => (
                  <tr key={row.activity}
                    style={{ borderBottom: i < pointsTable.length - 1 ? '1px solid rgba(30,45,69,.5)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,22,35,.5)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '12px 14px', fontWeight: 500 }}>{row.activity}</td>
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <span className="tag" style={{
                        color: 'var(--accent)', background: 'var(--accent-lo)',
                        borderColor: 'rgba(79,142,247,.3)', fontWeight: 700,
                      }}>
                        {row.points}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-dim)', fontSize: '.78rem' }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Swag Tier Visual ────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="card" style={{ padding: '24px', marginBottom: 32 }}>

          <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 20 }}>
            🎁 Season 1 Prize Tier Overview
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 12 }}>
            {swagTiers.map((tier) => (
              <div key={tier.level} style={{
                background: 'var(--surface)', borderRadius: 12, padding: '16px 14px', textAlign: 'center',
                border: `1px solid ${tier.color}28`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-space)', fontSize: '1.6rem', fontWeight: 900,
                  color: tier.color, marginBottom: 4,
                }}>
                  {tier.pts}
                </div>
                <div style={{ fontSize: '.7rem', fontWeight: 700, color: tier.color, marginBottom: 3 }}>
                  {tier.level}
                </div>
                <div style={{ fontSize: '.65rem', color: 'var(--muted)' }}>{tier.pts} point{tier.pts > 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer CTA ──────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div style={{
            padding: '48px 32px', borderRadius: 20, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(34,197,94,.08),rgba(79,142,247,.06))',
            border: '1px solid rgba(34,197,94,.18)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%,rgba(34,197,94,.08) 0%,transparent 60%)',
              pointerEvents: 'none',
            }}/>
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '1.4rem', marginBottom: 10 }}>
                Start Tracking Your Progress
              </h2>
              <p style={{ color: 'var(--text-sub)', fontSize: '.9rem', marginBottom: 26, maxWidth: 400, margin: '0 auto 26px' }}>
                Paste your Cloud Skills Boost URL and get a full badge + points report instantly.
              </p>
              <Link href="/calculator" className="btn-primary"
                style={{ display: 'inline-block', padding: '13px 30px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 12 }}>
                Track My Arcade Progress →
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
