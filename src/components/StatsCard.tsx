'use client'

import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  colorLo: string
  subtitle?: string
}

export default function StatsCard({ title, value, icon, color, colorLo, subtitle }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="card card-hover"
      style={{ padding: '22px 20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-dim)' }}>
          {title}
        </span>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: colorLo, border: `1px solid ${color}30`,
          color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-space)', fontSize: '2.6rem', fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginTop: 8 }}>{subtitle}</div>
      )}
    </motion.div>
  )
}
