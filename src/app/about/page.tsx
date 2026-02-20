'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  { icon: '📊', title: 'Check Your Score',      desc: 'Paste your public Cloud Skills Boost profile link and instantly see your Arcade points, badges, and progress.' },
  { icon: '🎯', title: 'Milestone Tracker',      desc: "See exactly how far you are in each milestone and what you still need to complete to reach the next one." },
  { icon: '🎁', title: 'Prize Tiers',            desc: 'Track your progress toward all 5 prize tiers — Novice, Trooper, Ranger, Champion, and Legend.' },
  { icon: '🏆', title: 'Leaderboard',            desc: 'See how you rank among other players this season. Submit your profile via Check Score to appear.' },
  { icon: '📅', title: 'Badge Tracker',          desc: "Browse all season skill badges, see which ones count toward your score, and find ones you haven't done yet." },
  { icon: '🔒', title: 'No Account Needed',      desc: 'No sign-up, no login, no data saved. Just paste your profile link and go.' },
]

const CHANGELOG = [
  { version: 'v1.3', date: 'Feb 2026', note: 'Added Season 1 (2026) prize tiers: Novice, Trooper, Ranger, Champion, Legend' },
  { version: 'v1.2', date: 'Feb 2026', note: 'Dashboard page with active badge tracker and monthly games list' },
  { version: 'v1.1', date: 'Jan 2026', note: 'Milestone tracker with per-requirement progress bars' },
  { version: 'v1.0', date: 'Jan 2026', note: 'Initial launch — Calculator, Leaderboard, Resources' },
]

export default function AboutPage() {
  return (
    <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 22,
            background: 'linear-gradient(135deg,#4f8ef7,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', margin: '0 auto 24px',
            boxShadow: '0 0 40px rgba(79,142,247,.3)',
          }}>
            🎮
          </div>
          <h1 style={{
            fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 16,
          }}>
            About <span className="gradient-text">Arcade Tracker</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.7 }}>
            An unofficial community tool to track your Google Cloud Arcade Season 1 (2026) progress —
            badges, points, milestones, and prize tiers — all in one place.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/calculator" className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '.9rem', textDecoration: 'none', borderRadius: 11 }}>
              Try the Calculator →
            </Link>
            <Link href="/query" className="btn-ghost"
              style={{ padding: '12px 24px', fontSize: '.9rem', textDecoration: 'none', borderRadius: 11 }}>
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}
          style={{
            marginBottom: 48, padding: '16px 20px', borderRadius: 12,
            background: 'rgba(245,158,11,.07)', border: '1px solid rgba(245,158,11,.2)',
            color: 'var(--yellow)', fontSize: '.83rem', display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
          </svg>
          <span>
            <strong>Disclaimer:</strong> Arcade Tracker is an unofficial tool and is not affiliated with, endorsed by, or connected to Google LLC.
            All Google Cloud Arcade branding, program details, and prize information belong to Google.
            This tool reads publicly available profile data only.
          </span>
        </motion.div>

        {/* Features */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <div style={{ width: 4, height: 22, borderRadius: 99, background: 'linear-gradient(180deg,var(--accent),var(--purple))' }}/>
            <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.1rem' }}>What It Does</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .06 }}
                className="card card-hover"
                style={{ padding: '20px 18px' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '.8rem', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

          {/* Changelog */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="card" style={{ padding: '24px', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 20 }}>
            📋 Changelog
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHANGELOG.map((c, i) => (
              <div key={c.version} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                paddingBottom: i < CHANGELOG.length - 1 ? 10 : 0,
                borderBottom: i < CHANGELOG.length - 1 ? '1px solid rgba(30,45,69,.5)' : 'none',
              }}>
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 52 }}>
                  <div style={{
                    display: 'inline-block', padding: '3px 8px', borderRadius: 6,
                    background: 'var(--accent-lo)', border: '1px solid rgba(79,142,247,.3)',
                    fontSize: '.7rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 3,
                  }}>
                    {c.version}
                  </div>
                  <div style={{ fontSize: '.65rem', color: 'var(--muted)' }}>{c.date}</div>
                </div>
                <p style={{ fontSize: '.83rem', color: 'var(--text-dim)', lineHeight: 1.5, paddingTop: 4 }}>{c.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="card" style={{ padding: '24px', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 16 }}>
              🔍 How It Works
            </h2>
            <p style={{ fontSize: '.85rem', color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 12 }}>
              Paste your public Cloud Skills Boost profile link and Arcade Tracker does the rest.
              It looks up your progress, identifies which badges count toward Season 1, and gives you
              an instant breakdown of your points, milestones, and prize tier status.
            </p>
            <p style={{ fontSize: '.85rem', color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 12 }}>
              Everything happens on the spot — nothing is stored or saved anywhere.
              Your data stays yours.
            </p>
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              fontSize: '.78rem', color: 'var(--text-dim)',
            }}>
              <strong style={{ color: 'var(--text)' }}>Important:</strong> Your profile must be set to public for this tool to work.
              Visit your Cloud Skills Boost settings to enable public visibility.
            </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div style={{
            padding: '48px 32px', borderRadius: 22, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(79,142,247,.1),rgba(168,85,247,.07))',
            border: '1px solid rgba(79,142,247,.2)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%,rgba(79,142,247,.1) 0%,transparent 60%)', pointerEvents: 'none' }}/>
            <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '1.4rem', marginBottom: 10, position: 'relative' }}>
              Ready to Track Your Progress?
            </h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '.9rem', marginBottom: 26, position: 'relative' }}>
              Paste your Cloud Skills Boost URL and see your full Arcade report in seconds.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                <Link href="/calculator" className="btn-primary"
                  style={{ padding: '13px 26px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 12 }}>
                  Check My Score →
                </Link>
              <Link href="/faqs" className="btn-ghost"
                style={{ padding: '13px 26px', fontSize: '.95rem', textDecoration: 'none', borderRadius: 12 }}>
                Read FAQs
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
