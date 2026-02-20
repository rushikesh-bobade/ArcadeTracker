'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Category = 'Bug Report' | 'Feature Request' | 'Points Discrepancy' | 'General Question' | 'Other'

const CATEGORIES: Category[] = ['Bug Report', 'Feature Request', 'Points Discrepancy', 'General Question', 'Other']

const CATEGORY_META: Record<Category, { emoji: string; color: string; hint: string }> = {
  'Bug Report':           { emoji: '🐛', color: '#f87171', hint: 'Describe the bug, what you expected, and what actually happened.' },
  'Feature Request':      { emoji: '💡', color: '#60a5fa', hint: 'Describe the feature you\'d like and how it would help.' },
  'Points Discrepancy':   { emoji: '⚠️', color: '#f59e0b', hint: 'Include your profile URL and what points you expected vs what you see.' },
  'General Question':     { emoji: '❓', color: '#a78bfa', hint: 'Ask anything about the Arcade program or this tracker.' },
  'Other':                { emoji: '📝', color: '#34d399', hint: 'Any other feedback or message for the team.' },
}

export default function QueryPage() {
  const [category, setCategory] = useState<Category>('General Question')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [message, setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim())    e.name    = 'Name is required'
    if (!email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!message.trim()) e.message = 'Message is required'
    else if (message.trim().length < 20) e.message = 'Please provide more detail (min 20 chars)'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // Simulate submission
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--green-lo)', border: '2px solid rgba(34,197,94,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', margin: '0 auto 24px',
            boxShadow: '0 0 32px rgba(34,197,94,.15)',
          }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '1.6rem', marginBottom: 12 }}>Message Sent!</h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '.9rem', marginBottom: 32, lineHeight: 1.7 }}>
            Thanks {name.split(' ')[0]}! Your {category.toLowerCase()} has been received.
            We&apos;ll review it and get back to you at {email} if a response is needed.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); setProfileUrl('') }}
              className="btn-ghost"
              style={{ padding: '11px 22px', fontSize: '.88rem', borderRadius: 10 }}>
              Send Another
            </button>
            <Link href="/" className="btn-primary"
              style={{ padding: '11px 22px', fontSize: '.88rem', textDecoration: 'none', borderRadius: 10 }}>
              Go Home →
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const meta = CATEGORY_META[category]

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px', borderRadius: 99,
            background: 'var(--green-lo)', border: '1px solid rgba(34,197,94,.25)',
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: 18,
          }}>
            💬 Get In Touch
          </span>
          <h1 style={{
            fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12,
          }}>
            Send a <span className="gradient-text">Query</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '.95rem', maxWidth: 460, margin: '0 auto' }}>
            Have a bug to report, a feature idea, or a question? We read every message.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}
          className="card" style={{ padding: '28px 26px' }}>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 10 }}>
                Category
              </label>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => {
                  const m = CATEGORY_META[cat]
                  const active = category === cat
                  return (
                    <button
                      key={cat} type="button" onClick={() => setCategory(cat)}
                      style={{
                        padding: '7px 13px', borderRadius: 8, border: `1px solid ${active ? m.color + '50' : 'var(--border)'}`,
                        background: active ? m.color + '14' : 'var(--surface)',
                        color: active ? m.color : 'var(--text-dim)',
                        fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 5,
                        transition: 'all .15s',
                      }}
                    >
                      <span>{m.emoji}</span>{cat}
                    </button>
                  )
                })}
              </div>
              {meta.hint && (
                <AnimatePresence>
                  <motion.p
                    key={category}
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '.75rem', color: meta.color, marginTop: 8, opacity: .8 }}>
                    {meta.hint}
                  </motion.p>
                </AnimatePresence>
              )}
            </div>

            {/* Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>
                  Name <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="text" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                  placeholder="Your name"
                  className="input-base"
                  style={{ padding: '11px 14px', fontSize: '.85rem', borderColor: errors.name ? 'rgba(239,68,68,.5)' : undefined }}
                />
                {errors.name && <p style={{ fontSize: '.72rem', color: '#f87171', marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>
                  Email <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                  placeholder="you@example.com"
                  className="input-base"
                  style={{ padding: '11px 14px', fontSize: '.85rem', borderColor: errors.email ? 'rgba(239,68,68,.5)' : undefined }}
                />
                {errors.email && <p style={{ fontSize: '.72rem', color: '#f87171', marginTop: 4 }}>{errors.email}</p>}
              </div>
            </div>

            {/* Profile URL (optional) */}
            <div>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>
                Profile URL <span style={{ color: 'var(--muted)', fontWeight: 400, textTransform: 'none', fontSize: '.72rem' }}>(optional — helps us investigate issues)</span>
              </label>
              <input
                type="url" value={profileUrl} onChange={e => setProfileUrl(e.target.value)}
                placeholder="https://www.cloudskillsboost.google/public_profiles/YOUR-ID"
                className="input-base"
                style={{ padding: '11px 14px', fontSize: '.85rem' }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>
                Message <span style={{ color: '#f87171' }}>*</span>
              </label>
              <textarea
                value={message}
                onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })) }}
                placeholder="Describe your question, issue, or idea in detail…"
                rows={5}
                className="input-base"
                style={{
                  padding: '12px 14px', fontSize: '.85rem', resize: 'vertical', minHeight: 120,
                  borderColor: errors.message ? 'rgba(239,68,68,.5)' : undefined,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {errors.message
                  ? <p style={{ fontSize: '.72rem', color: '#f87171' }}>{errors.message}</p>
                  : <span/>}
                <span style={{ fontSize: '.7rem', color: message.length < 20 ? 'var(--muted)' : 'var(--green)' }}>
                  {message.length} chars
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="btn-primary"
              style={{ padding: '13px 24px', fontSize: '.9rem', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {loading ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite', width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>Send Message →</>
              )}
            </button>

          </form>
        </motion.div>

        {/* Quick links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}
          style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/faqs" style={{ fontSize: '.8rem', color: 'var(--text-dim)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
            Check FAQs first →
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <Link href="/resources" style={{ fontSize: '.8rem', color: 'var(--text-dim)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
            View Resources
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
