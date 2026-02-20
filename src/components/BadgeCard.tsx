'use client'

import { motion } from 'framer-motion'
import type { BadgeData } from '@/app/api/scrape/route'

interface BadgeCardProps {
  badge: BadgeData
  index: number
}

const typeStyle: Record<string, { color: string; bg: string; label: string }> = {
  arcade:  { color: 'var(--accent)',  bg: 'var(--accent-lo)',  label: 'Arcade'  },
  skill:   { color: 'var(--purple)',  bg: 'var(--purple-lo)',  label: 'Skill'   },
  trivia:  { color: 'var(--yellow)',  bg: 'var(--yellow-lo)',  label: 'Trivia'  },
  lab:     { color: 'var(--green)',   bg: 'var(--green-lo)',   label: 'Lab'     },
  course:  { color: '#60a5fa',        bg: 'rgba(96,165,250,.12)', label: 'Course' },
  other:   { color: 'var(--muted)',   bg: 'rgba(75,90,114,.15)', label: 'Other'  },
}

export default function BadgeCard({ badge, index }: BadgeCardProps) {
  const style = typeStyle[badge.type] || typeStyle.other
  const earned = badge.isActive

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.55) }}
      style={{
        background: earned ? 'var(--card)' : 'rgba(15,22,35,.6)',
        border: `1px solid ${earned ? 'var(--border)' : 'rgba(30,45,69,.4)'}`,
        borderRadius: 14,
        padding: '14px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 8,
        position: 'relative', cursor: 'default',
        opacity: earned ? 1 : 0.52,
        transition: 'transform .2s, box-shadow .2s, border-color .2s',
      }}
      whileHover={earned ? { y: -3, boxShadow: '0 8px 28px rgba(79,142,247,.18)' } : {}}
    >
      {/* Earned dot */}
      {earned && (
        <span style={{
          position: 'absolute', top: 9, right: 9,
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 6px rgba(34,197,94,.6)',
        }}/>
      )}

      {/* Badge image */}
      <div style={{
        width: 58, height: 58, borderRadius: 12,
        background: earned ? style.bg : 'rgba(30,45,69,.3)',
        border: `1px solid ${earned ? style.color + '28' : 'transparent'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {badge.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badge.imageUrl}
            alt={badge.name}
            style={{ width: 46, height: 46, objectFit: 'contain', filter: earned ? 'none' : 'grayscale(1) opacity(.4)' }}
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.display = 'none'
              const p = el.parentElement
              if (p) p.innerHTML = `<span style="font-size:1.5rem">${earned ? '🏅' : '🔒'}</span>`
            }}
          />
        ) : (
          <span style={{ fontSize: '1.5rem' }}>{earned ? '🏅' : '🔒'}</span>
        )}
      </div>

      {/* Name */}
      <p style={{ fontSize: '.72rem', fontWeight: 600, lineHeight: 1.35, color: 'var(--text)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {badge.name}
      </p>

      {/* Type tag */}
      <span className="tag" style={{ color: style.color, borderColor: style.color + '30', background: style.bg, textTransform: 'capitalize', letterSpacing: '.02em' }}>
        {style.label}
      </span>

      {/* Date */}
      {badge.earnedDate && earned && (
        <p style={{ fontSize: '.65rem', color: 'var(--muted)' }}>{badge.earnedDate}</p>
      )}

      {/* Link */}
      {badge.link && earned && (
        <a
          href={badge.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: '.68rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          View →
        </a>
      )}
    </motion.div>
  )
}
