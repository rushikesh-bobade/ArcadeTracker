'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const FAQS = [
  {
    category: 'Getting Started',
    emoji: '🚀',
    items: [
      {
        q: 'What is Google Cloud Arcade?',
        a: 'Google Cloud Arcade is a gamified learning campaign where you earn points by completing Arcade Game badges, Sprint (Trivia) badges, and Skill badges on Cloud Skills Boost. Points accumulate to unlock prize tiers including exclusive swag and merchandise.',
      },
      {
        q: 'When does Season 1 (2026) run?',
        a: 'The Arcade Season 1 runs from January 2026 through June 2026. New badges and games are released monthly. Make sure to complete badges before their deadlines.',
      },
      {
        q: 'How do I make my profile public?',
        a: 'Go to cloudskillsboost.google → click your profile icon → Settings → set Profile Visibility to Public. Without a public profile, this tracker cannot fetch your data.',
      },
      {
        q: 'Is Arcade Tracker an official Google tool?',
        a: 'No. Arcade Tracker is an unofficial community tool. It reads your public profile page to calculate your points and prize tier. It is not affiliated with or endorsed by Google LLC.',
      },
    ],
  },
  {
    category: 'Points & Scoring',
    emoji: '⭐',
    items: [
      {
        q: 'How are Arcade points calculated?',
        a: 'Points are calculated as:\n• Arcade Game badges: 1 pt each\n• Sprint (Trivia) badges: 1 pt each\n• Skill badges: 1 pt per every 2 badges completed\n• Milestone bonuses: +2, +8, +15, or +25 pts depending on milestone level',
      },
      {
        q: 'What counts as an Arcade Game badge?',
        a: 'Monthly Arcade game collections (e.g. "Arcade Voyage: Data Tools", "From Foundations To Wonders", "Base Camp"), plus any badge explicitly named as an Arcade game in the campaign catalog.',
      },
      {
        q: 'What is a Sprint badge?',
        a: 'Sprint badges (formerly "Trivia" badges) are short weekly quiz-style activities released each month. Completing all questions in a Sprint earns 1 Arcade point.',
      },
      {
        q: 'Do old badges from previous years count?',
        a: 'Only badges earned during the active Season 1 campaign period (January–June 2026) count toward your Season 1 score. Previously earned skill badges may still contribute if they appear on your active profile.',
      },
    ],
  },
  {
    category: 'Milestones',
    emoji: '🎯',
    items: [
      {
        q: 'What are Milestones?',
        a: 'Milestones are bonus checkpoints. When you meet the required combination of Arcade games, Sprint badges, and Skill badges for a milestone, you receive a one-time bonus points addition on top of your base score.',
      },
      {
        q: 'What are the Milestone requirements?',
        a: 'Milestone 1: 2 games + 2 sprint + 8 skill (+2 pts)\nMilestone 2: 4 games + 4 sprint + 20 skill (+8 pts)\nMilestone 3: 6 games + 5 sprint + 30 skill (+15 pts)\nUltimate: 8 games + 6 sprint + 42 skill (+25 pts)',
      },
      {
        q: 'Do Milestone bonuses stack?',
        a: 'Only the highest milestone you have achieved provides a bonus. You receive the bonus for that single milestone — lower milestones are not additionally added.',
      },
    ],
  },
  {
    category: 'Prize Tiers & Swag',
    emoji: '🎁',
    items: [
      {
        q: 'What are the 2026 prize tiers?',
        a: 'Season 1 prize tiers are:\n• Novice: 25 pts\n• Trooper: 45 pts\n• Ranger: 65 pts\n• Champion: 75 pts\n• Legend: 95 pts\nEach tier unlocks progressively better swag rewards.',
      },
      {
        q: 'When will I receive my swag?',
        a: 'Swag is typically distributed after the season ends (post-June 2026) and after a redemption form is shared by Google. Watch your registered email and official Google Cloud social channels for announcements.',
      },
      {
        q: 'Can I receive swag from multiple tiers?',
        a: 'You receive swag for the highest tier you qualify for. Typically this includes items from that tier and all tiers below it, but exact bundling is determined by Google\'s official rules.',
      },
    ],
  },
  {
    category: 'Arcade Tracker Tool',
    emoji: '🛠️',
    items: [
      {
        q: 'Why does my badge count look wrong?',
        a: 'Arcade Tracker scrapes your public profile page in real time. Results depend on how your profile is structured. Some badges may be misclassified if their names don\'t follow standard naming patterns. Use the Calculator and compare with your actual profile.',
      },
      {
        q: 'Does Arcade Tracker store my data?',
        a: 'No. Arcade Tracker does not store your profile data on any server. Data is fetched live on each request and only exists in your browser session. Your URL may be saved in your browser\'s localStorage if you check "Remember URL".',
      },
      {
        q: 'My profile URL is correct but it shows an error. What do I do?',
        a: '1. Make sure your profile is set to public (not private)\n2. Use the full URL format: https://www.cloudskillsboost.google/public_profiles/YOUR-ID\n3. Try again after a few seconds — Google occasionally rate-limits requests\n4. If the issue persists, your profile may be temporarily unavailable.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      background: open ? 'rgba(15,22,35,.6)' : 'var(--surface)',
      transition: 'background .2s',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '15px 18px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14,
          color: 'var(--text)',
        }}
      >
        <span style={{ fontSize: '.88rem', fontWeight: 600, lineHeight: 1.4, flex: 1 }}>{q}</span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: .2 }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <path strokeLinecap="round" d="M12 5v14M5 12h14"/>
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .22 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 18px 16px',
              fontSize: '.83rem', color: 'var(--text-dim)', lineHeight: 1.7,
              whiteSpace: 'pre-line', borderTop: '1px solid rgba(30,45,69,.5)',
              paddingTop: 14,
            }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqsPage() {
  const [search, setSearch] = useState('')

  const filtered = FAQS.map(section => ({
    ...section,
    items: section.items.filter(
      item =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.items.length > 0)

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px', borderRadius: 99,
            background: 'var(--purple-lo)', border: '1px solid rgba(168,85,247,.25)',
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
            color: 'var(--purple)', marginBottom: 18,
          }}>
            ❓ Frequently Asked
          </span>
          <h1 style={{
            fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 14,
          }}>
            <span className="gradient-text">FAQs</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '1rem', maxWidth: 500, margin: '0 auto 28px' }}>
            Everything you need to know about Arcade points, milestones, prize tiers, and this tracker.
          </p>

          {/* Search */}
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search FAQs…"
              className="input-base"
              style={{ paddingLeft: 40, paddingTop: 12, paddingBottom: 12, fontSize: '.88rem' }}
            />
          </div>
        </motion.div>

        {/* FAQ sections */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-dim)' }}>
            No FAQs match "{search}". Try a different search.
          </div>
        )}

        {filtered.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * .05 }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 4, height: 22, borderRadius: 99, background: 'linear-gradient(180deg,var(--accent),var(--purple))' }}/>
              <span style={{ fontSize: '1.1rem' }}>{section.emoji}</span>
              <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '1rem' }}>
                {section.category}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.items.map(item => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{
            padding: '36px 28px', borderRadius: 20, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(79,142,247,.09),rgba(168,85,247,.06))',
            border: '1px solid rgba(79,142,247,.18)', marginTop: 12,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Still have questions?</h3>
            <p style={{ color: 'var(--text-sub)', fontSize: '.88rem', marginBottom: 20 }}>
              Use the Query form to send us a message, or check out the Resources page for more guidance.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/query" className="btn-primary"
                style={{ padding: '11px 22px', fontSize: '.88rem', textDecoration: 'none', borderRadius: 10 }}>
                Send a Query →
              </Link>
              <Link href="/resources" className="btn-ghost"
                style={{ padding: '11px 22px', fontSize: '.88rem', textDecoration: 'none', borderRadius: 10 }}>
                View Resources
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
