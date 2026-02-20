'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────
   All 89 Skill Badges extracted from the Season 1 PDF docs.
   difficulty: "easy" = Very Easy | "moderate" = Easy But Lengthy
   category: derived from badge topic domain
   preAssessment: true if listed in Pre-Assessment Labs PDF
   url: direct Cloud Skills Boost catalog search link
───────────────────────────────────────────────────────────── */
type Difficulty = 'easy' | 'moderate'
type Category = 'AI & ML' | 'Data & Analytics' | 'Infrastructure' | 'Security' | 'App Dev' | 'Networking' | 'Workspace'

interface Badge {
  id: number
  title: string
  difficulty: Difficulty
  category: Category
  preAssessment: boolean
  url: string
}

function slug(title: string) {
  return encodeURIComponent(title)
}

function badgeUrl(title: string) {
  return `https://www.cloudskillsboost.google/catalog?keywords=${slug(title)}&badge_type=skill-badge`
}

const BADGES: Badge[] = [
  // ── Pre-Assessment Labs (from PDF 1) ──────────────────────
  { id: 1,  title: 'Create ML Models with BigQuery ML',                             difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Create ML Models with BigQuery ML') },
  { id: 2,  title: 'Build Infrastructure with Terraform on Google Cloud',           difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Build Infrastructure with Terraform on Google Cloud') },
  { id: 3,  title: 'Build LookML Objects in Looker',                                difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Build LookML Objects in Looker') },
  { id: 4,  title: 'Cloud Speech API: 3 Ways',                                      difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Cloud Speech API: 3 Ways') },
  { id: 5,  title: 'Create and Manage AlloyDB Instances',                           difficulty: 'moderate', category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Create and Manage AlloyDB Instances') },
  { id: 6,  title: 'Create and Manage Bigtable Instances',                          difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Create and Manage Bigtable Instances') },
  { id: 7,  title: 'Create and Manage Cloud Spanner Instances',                     difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Create and Manage Cloud Spanner Instances') },
  { id: 8,  title: 'Create and Manage Cloud SQL for PostgreSQL Instances',          difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Create and Manage Cloud SQL for PostgreSQL Instances') },
  { id: 9,  title: 'Discover and Protect Sensitive Data Across Your Ecosystem',     difficulty: 'easy',     category: 'Security',         preAssessment: true,  url: badgeUrl('Discover and Protect Sensitive Data Across Your Ecosystem') },
  { id: 10, title: 'Enhance Gemini Model Capabilities',                             difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Enhance Gemini Model Capabilities') },
  { id: 11, title: 'Explore Generative AI with the Gemini API in Vertex AI',        difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Explore Generative AI with the Gemini API in Vertex AI') },
  { id: 12, title: 'Get Started with Dataplex',                                     difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Get Started with Dataplex') },
  { id: 13, title: 'Get Started with Google Workspace Tools',                       difficulty: 'easy',     category: 'Workspace',        preAssessment: true,  url: badgeUrl('Get Started with Google Workspace Tools') },
  { id: 14, title: 'Implementing Cloud Load Balancing for Compute Engine',          difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Implementing Cloud Load Balancing for Compute Engine') },
  { id: 15, title: 'Monitoring in Google Cloud',                                    difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Monitoring in Google Cloud') },
  { id: 16, title: 'Perform Predictive Data Analysis in BigQuery',                  difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Perform Predictive Data Analysis in BigQuery') },
  { id: 17, title: 'Privileged Access with IAM',                                    difficulty: 'easy',     category: 'Security',         preAssessment: true,  url: badgeUrl('Privileged Access with IAM') },
  { id: 18, title: 'Set Up an App Dev Environment on Google Cloud',                 difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Set Up an App Dev Environment on Google Cloud') },
  { id: 19, title: 'Use Functions, Formulas, and Charts in Google Sheets',          difficulty: 'easy',     category: 'Workspace',        preAssessment: true,  url: badgeUrl('Use Functions, Formulas, and Charts in Google Sheets') },
  { id: 20, title: 'Configure Service Accounts and IAM Roles for Google Cloud',     difficulty: 'easy',     category: 'Security',         preAssessment: true,  url: badgeUrl('Configure Service Accounts and IAM Roles for Google Cloud') },
  { id: 21, title: 'Use Machine Learning APIs on Google Cloud',                     difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Use Machine Learning APIs on Google Cloud') },
  { id: 22, title: 'Connecting Cloud Networks with NCC',                            difficulty: 'easy',     category: 'Networking',       preAssessment: true,  url: badgeUrl('Connecting Cloud Networks with NCC') },
  { id: 23, title: 'Analyze Sentiment with Natural Language API',                   difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Analyze Sentiment with Natural Language API') },
  { id: 24, title: 'Analyze Speech and Language with Google APIs',                  difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Analyze Speech and Language with Google APIs') },
  { id: 25, title: 'Analyze Images with the Cloud Vision API',                      difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Analyze Images with the Cloud Vision API') },
  { id: 26, title: 'Build Custom Processors with Document AI',                      difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Build Custom Processors with Document AI') },
  { id: 27, title: 'Automate Data Capture at Scale with Document AI',               difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Automate Data Capture at Scale with Document AI') },
  { id: 28, title: 'App Building with AppSheet',                                    difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('App Building with AppSheet') },
  { id: 29, title: 'Analyze BigQuery Data in Connected Sheets',                     difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Analyze BigQuery Data in Connected Sheets') },
  { id: 30, title: 'Classify Images with TensorFlow on Google Cloud',               difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Classify Images with TensorFlow on Google Cloud') },
  { id: 31, title: 'Build and Deploy Machine Learning Solutions on Vertex AI',      difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Build and Deploy Machine Learning Solutions on Vertex AI') },
  { id: 32, title: 'Build a Secure Google Cloud Network',                           difficulty: 'moderate', category: 'Security',         preAssessment: true,  url: badgeUrl('Build a Secure Google Cloud Network') },
  { id: 33, title: 'App Engine: 3 Ways',                                            difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('App Engine: 3 Ways') },
  { id: 34, title: 'Cloud Run Functions: 3 Ways',                                   difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Cloud Run Functions: 3 Ways') },
  { id: 35, title: 'Deploy and Manage Apigee X',                                    difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Deploy and Manage Apigee X') },
  { id: 36, title: 'Detect Manufacturing Defects using Visual Inspection AI',       difficulty: 'moderate', category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Detect Manufacturing Defects using Visual Inspection AI') },
  { id: 37, title: 'Develop GenAI Apps with Gemini and Streamlit',                  difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Develop GenAI Apps with Gemini and Streamlit') },
  { id: 38, title: 'Develop Serverless Applications on Cloud Run',                  difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Develop Serverless Applications on Cloud Run') },
  { id: 39, title: 'Develop and Secure APIs with Apigee X',                         difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Develop and Secure APIs with Apigee X') },
  { id: 40, title: 'Develop with Apps Script and AppSheet',                         difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Develop with Apps Script and AppSheet') },
  { id: 41, title: 'Develop your Google Cloud Network',                             difficulty: 'easy',     category: 'Networking',       preAssessment: true,  url: badgeUrl('Develop your Google Cloud Network') },
  { id: 42, title: 'Engineer Data for Predictive Modeling with BigQuery ML',        difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Engineer Data for Predictive Modeling with BigQuery ML') },
  { id: 43, title: 'Get Started with API Gateway',                                  difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Get Started with API Gateway') },
  { id: 44, title: 'Get Started with Cloud Storage',                                difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Get Started with Cloud Storage') },
  { id: 45, title: 'Get Started with Looker',                                       difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Get Started with Looker') },
  { id: 46, title: 'Get Started with Pub/Sub',                                      difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Get Started with Pub/Sub') },
  { id: 47, title: 'Get Started with Sensitive Data Protection',                    difficulty: 'moderate', category: 'Security',         preAssessment: true,  url: badgeUrl('Get Started with Sensitive Data Protection') },
  { id: 48, title: 'Implement Cloud Security Fundamentals on Google Cloud',         difficulty: 'moderate', category: 'Security',         preAssessment: true,  url: badgeUrl('Implement Cloud Security Fundamentals on Google Cloud') },
  { id: 49, title: 'Monitor Environments with Google Cloud Managed Service for Prometheus', difficulty: 'easy', category: 'Infrastructure', preAssessment: true, url: badgeUrl('Monitor Environments with Google Cloud Managed Service for Prometheus') },
  { id: 50, title: 'Monitor and Log with Google Cloud Observability',               difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Monitor and Log with Google Cloud Observability') },
  { id: 51, title: 'Prepare Data for Looker Dashboards and Reports',                difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Prepare Data for Looker Dashboards and Reports') },
  { id: 52, title: 'Prepare Data for ML APIs on Google Cloud',                      difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Prepare Data for ML APIs on Google Cloud') },
  { id: 53, title: 'Prompt Design in Vertex AI',                                    difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Prompt Design in Vertex AI') },
  { id: 54, title: 'Secure BigLake Data',                                           difficulty: 'easy',     category: 'Security',         preAssessment: true,  url: badgeUrl('Secure BigLake Data') },
  { id: 55, title: 'Secure Software Delivery',                                      difficulty: 'moderate', category: 'Security',         preAssessment: true,  url: badgeUrl('Secure Software Delivery') },
  { id: 56, title: 'Set Up a Google Cloud Network',                                 difficulty: 'easy',     category: 'Networking',       preAssessment: true,  url: badgeUrl('Set Up a Google Cloud Network') },
  { id: 57, title: 'Share Data Using Google Data Cloud',                            difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Share Data Using Google Data Cloud') },
  { id: 58, title: 'Store, Process, and Manage Data on Google Cloud - Command Line',difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Store, Process, and Manage Data on Google Cloud - Command Line') },
  { id: 59, title: 'Create a Secure Data Lake on Cloud Storage',                    difficulty: 'easy',     category: 'Security',         preAssessment: true,  url: badgeUrl('Create a Secure Data Lake on Cloud Storage') },
  { id: 60, title: 'Deploy Kubernetes Applications on Google Cloud',                difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Deploy Kubernetes Applications on Google Cloud') },
  { id: 61, title: 'Get Started with Eventarc',                                     difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Get Started with Eventarc') },
  { id: 62, title: 'Build a Website on Google Cloud',                               difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Build a Website on Google Cloud') },
  { id: 63, title: 'Build a Data Mesh with Dataplex',                               difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Build a Data Mesh with Dataplex') },
  { id: 64, title: 'Build a Data Warehouse with BigQuery',                          difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Build a Data Warehouse with BigQuery') },
  { id: 65, title: 'Protect Cloud Traffic with Chrome Enterprise Premium Security', difficulty: 'moderate', category: 'Security',         preAssessment: true,  url: badgeUrl('Protect Cloud Traffic with Chrome Enterprise Premium Security') },
  { id: 66, title: 'Build Google Cloud Infrastructure for AWS Professionals',       difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Build Google Cloud Infrastructure for AWS Professionals') },
  { id: 67, title: 'Develop Serverless Apps with Firebase',                         difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Develop Serverless Apps with Firebase') },
  { id: 68, title: 'Tag and Discover BigLake Data',                                 difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Tag and Discover BigLake Data') },
  { id: 69, title: 'Streaming Analytics into BigQuery',                             difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Streaming Analytics into BigQuery') },
  { id: 70, title: 'Store, Process, and Manage Data on Google Cloud Console',       difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Store, Process, and Manage Data on Google Cloud Console') },
  { id: 71, title: 'Derive Insights from BigQuery Data',                            difficulty: 'easy',     category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Derive Insights from BigQuery Data') },
  { id: 72, title: 'Analyze and Reason on Multimodal Data with Gemini',             difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Analyze and Reason on Multimodal Data with Gemini') },
  { id: 73, title: 'Use APIs to Work with Cloud Storage',                           difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Use APIs to Work with Cloud Storage') },
  { id: 74, title: 'Monitor and Manage Google Cloud Resources',                     difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Monitor and Manage Google Cloud Resources') },
  { id: 75, title: 'Implement DevOps Workflows in Google Cloud',                    difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Implement DevOps Workflows in Google Cloud') },
  { id: 76, title: 'Integrate BigQuery Data and Google Workspace using Apps Script', difficulty: 'easy',    category: 'Workspace',        preAssessment: true,  url: badgeUrl('Integrate BigQuery Data and Google Workspace using Apps Script') },
  { id: 77, title: 'Manage Kubernetes in Google Cloud',                             difficulty: 'easy',     category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Manage Kubernetes in Google Cloud') },
  { id: 78, title: 'Inspect Rich Documents with Gemini Multimodality and Multimodal RAG', difficulty: 'easy', category: 'AI & ML',       preAssessment: true,  url: badgeUrl('Inspect Rich Documents with Gemini Multimodality and Multimodal RAG') },
  { id: 79, title: 'Optimize Costs for Google Kubernetes Engine',                   difficulty: 'moderate', category: 'Infrastructure',   preAssessment: true,  url: badgeUrl('Optimize Costs for Google Kubernetes Engine') },
  { id: 80, title: 'Migrate MySQL Data to Cloud SQL Using Database Migration Service', difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true, url: badgeUrl('Migrate MySQL Data to Cloud SQL Using Database Migration Service') },
  { id: 81, title: 'Manage Data Models in Looker',                                  difficulty: 'moderate', category: 'Data & Analytics', preAssessment: true,  url: badgeUrl('Manage Data Models in Looker') },
  { id: 82, title: 'Implement Multimodal Vector Search with BigQuery',              difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Implement Multimodal Vector Search with BigQuery') },
  { id: 83, title: 'Implement CI/CD Pipelines on Google Cloud',                    difficulty: 'moderate', category: 'App Dev',          preAssessment: true,  url: badgeUrl('Implement CI/CD Pipelines on Google Cloud') },
  { id: 84, title: 'Using the Google Cloud Speech API',                             difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Using the Google Cloud Speech API') },
  { id: 85, title: 'Deploy Multi-Agent Architectures',                              difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Deploy Multi-Agent Architectures') },
  { id: 86, title: 'Google DeepMind: Train A Small Language Model',                 difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Google DeepMind: Train A Small Language Model') },
  { id: 87, title: 'Develop AI-Powered Prototypes in Google AI Studio',             difficulty: 'easy',     category: 'AI & ML',          preAssessment: true,  url: badgeUrl('Develop AI-Powered Prototypes in Google AI Studio') },
  { id: 88, title: 'Build a Smart Cloud Application with Vibe Coding and MCP',     difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Build a Smart Cloud Application with Vibe Coding and MCP') },
  { id: 89, title: 'Kickstarting Application Development with Gemini Code Assist',  difficulty: 'easy',     category: 'App Dev',          preAssessment: true,  url: badgeUrl('Kickstarting Application Development with Gemini Code Assist') },
]

// ── Category metadata ────────────────────────────────────────
const CAT_META: Record<Category, { color: string; bg: string; border: string; dot: string }> = {
  'AI & ML':          { color: '#f59e0b', bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.25)',  dot: '#f59e0b' },
  'Data & Analytics': { color: '#22d3ee', bg: 'rgba(34,211,238,.1)',  border: 'rgba(34,211,238,.25)',  dot: '#22d3ee' },
  'Infrastructure':   { color: '#818cf8', bg: 'rgba(129,140,248,.1)', border: 'rgba(129,140,248,.25)', dot: '#818cf8' },
  'Security':         { color: '#f87171', bg: 'rgba(248,113,113,.1)', border: 'rgba(248,113,113,.25)', dot: '#f87171' },
  'App Dev':          { color: '#10b981', bg: 'rgba(16,185,129,.1)',  border: 'rgba(16,185,129,.25)',  dot: '#10b981' },
  'Networking':       { color: '#a78bfa', bg: 'rgba(167,139,250,.1)', border: 'rgba(167,139,250,.25)', dot: '#a78bfa' },
  'Workspace':        { color: '#fb923c', bg: 'rgba(251,146,60,.1)',  border: 'rgba(251,146,60,.25)',  dot: '#fb923c' },
}

const ALL_CATEGORIES: Category[] = ['AI & ML', 'Data & Analytics', 'Infrastructure', 'Security', 'App Dev', 'Networking', 'Workspace']

const DIFF_META = {
  easy:     { label: 'Quick Win',  color: '#10b981', bg: 'rgba(16,185,129,.1)',  border: 'rgba(16,185,129,.25)' },
  moderate: { label: 'Lengthy',    color: '#f59e0b', bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.25)' },
}

export default function BadgesPage() {
  const [search, setSearch]         = useState('')
  const [catFilter, setCatFilter]   = useState<Category | 'All'>('All')
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'All'>('All')
  const [view, setView]             = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return BADGES.filter(b => {
      const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
      const matchCat    = catFilter === 'All' || b.category === catFilter
      const matchDiff   = diffFilter === 'All' || b.difficulty === diffFilter
      return matchSearch && matchCat && matchDiff
    })
  }, [search, catFilter, diffFilter])

  // ── Counts ───────────────────────────────────────────────
  const easyCount     = BADGES.filter(b => b.difficulty === 'easy').length
  const moderateCount = BADGES.filter(b => b.difficulty === 'moderate').length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Page Header ──────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 40 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="chip chip-amber">Season 1 · 2026</span>
            <span className="chip chip-cyan">89 Skill Badges</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-space, monospace)', fontSize: 'clamp(1.8rem,4vw,2.7rem)',
            fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12, lineHeight: 1.15,
          }}>
            <span className="text-amber">Skill Badge</span>{' '}
            <span style={{ color: 'var(--text)' }}>Vault</span>
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '.95rem', maxWidth: 580 }}>
            All 89 Season 1 skill badges with difficulty ratings and direct links to Cloud Skills Boost.
            Every 2 badges you complete = 1 campaign point.
          </p>
        </motion.div>

        {/* ── Stats row ────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 32 }}>

          {[
            { label: 'Total Badges',  value: BADGES.length,  color: 'var(--cyan)',   chip: 'chip-cyan'   },
            { label: 'Quick Wins',    value: easyCount,       color: 'var(--green)',  chip: 'chip-green'  },
            { label: 'Lengthy ones',  value: moderateCount,   color: 'var(--amber)',  chip: 'chip-amber'  },
            { label: 'Max pts from badges', value: Math.floor(BADGES.length / 2), color: 'var(--violet)', chip: 'chip-violet' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-space, monospace)', marginBottom: 3 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '.72rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Filters bar ──────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
          className="card" style={{ padding: '18px 20px', marginBottom: 24 }}>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: .4 }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="input-base"
              style={{ padding: '10px 14px 10px 38px', fontSize: '.88rem' }}
              placeholder="Search badge name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {(['All', ...ALL_CATEGORIES] as const).map(cat => {
              const active = catFilter === cat
              const meta   = cat !== 'All' ? CAT_META[cat] : null
              return (
                <button key={cat}
                  onClick={() => setCatFilter(cat)}
                  style={{
                    padding: '5px 13px', borderRadius: 99, fontSize: '.75rem', fontWeight: 600,
                    border: `1px solid ${active && meta ? meta.border : active ? 'rgba(245,158,11,.4)' : 'var(--border)'}`,
                    background: active && meta ? meta.bg : active ? 'var(--amber-lo)' : 'var(--surface)',
                    color: active && meta ? meta.color : active ? 'var(--amber)' : 'var(--text-dim)',
                    cursor: 'pointer', transition: 'all .15s',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                  {meta && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.dot, display: 'inline-block', flexShrink: 0 }}/>
                  )}
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Difficulty + view toggle row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['All', 'easy', 'moderate'] as const).map(d => {
                const active = diffFilter === d
                const meta   = d !== 'All' ? DIFF_META[d] : null
                return (
                  <button key={d}
                    onClick={() => setDiffFilter(d)}
                    style={{
                      padding: '5px 13px', borderRadius: 99, fontSize: '.75rem', fontWeight: 600,
                      border: `1px solid ${active && meta ? meta.border : active ? 'rgba(34,211,238,.4)' : 'var(--border)'}`,
                      background: active && meta ? meta.bg : active ? 'var(--cyan-lo)' : 'var(--surface)',
                      color: active && meta ? meta.color : active ? 'var(--cyan)' : 'var(--text-dim)',
                      cursor: 'pointer', transition: 'all .15s',
                    }}>
                    {d === 'All' ? 'All Levels' : meta!.label}
                  </button>
                )
              })}
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: '.73rem', fontWeight: 600,
                    background: view === v ? 'var(--card-hi)' : 'transparent',
                    color: view === v ? 'var(--text)' : 'var(--text-dim)',
                    border: 'none', cursor: 'pointer', transition: 'all .15s',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                  {v === 'grid'
                    ? <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1.5"/><rect x="10" y="0" width="6" height="6" rx="1.5"/><rect x="0" y="10" width="6" height="6" rx="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5"/></svg>
                    : <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2.5" rx="1.25"/><rect x="0" y="6.75" width="16" height="2.5" rx="1.25"/><rect x="0" y="12.5" width="16" height="2.5" rx="1.25"/></svg>
                  }
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Results count ─────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '.8rem' }}>
            Showing <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> of {BADGES.length} badges
          </span>
          {(search || catFilter !== 'All' || diffFilter !== 'All') && (
            <button onClick={() => { setSearch(''); setCatFilter('All'); setDiffFilter('All') }}
              style={{
                fontSize: '.75rem', color: 'var(--amber)', background: 'none', border: 'none',
                cursor: 'pointer', fontWeight: 600,
              }}>
              Clear filters ✕
            </button>
          )}
        </div>

        {/* ── Badge Grid ────────────────────────────────────── */}
        {view === 'grid' ? (
          <AnimatePresence mode="popLayout">
            <motion.div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 14,
            }}>
              {filtered.map((badge, i) => {
                const cat  = CAT_META[badge.category]
                const diff = DIFF_META[badge.difficulty]
                return (
                  <motion.a
                    key={badge.id}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: .95 }}
                    transition={{ delay: Math.min(i * .018, .3) }}
                    className="card card-hover"
                    style={{
                      padding: '18px 16px',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                    }}>

                    {/* Top row: index + category + diff */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '.65rem',
                        color: 'var(--text-dim)', minWidth: 28,
                      }}>
                        #{String(badge.id).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                        background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                        letterSpacing: '.04em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.dot, display: 'inline-block' }}/>
                        {badge.category}
                      </span>
                      <span style={{
                        fontSize: '.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                        background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`,
                        letterSpacing: '.04em', textTransform: 'uppercase', marginLeft: 'auto',
                      }}>
                        {diff.label}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{
                      fontSize: '.86rem', fontWeight: 600, lineHeight: 1.45,
                      color: 'var(--text)', marginBottom: 12,
                    }}>
                      {badge.title}
                    </div>

                    {/* Footer */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: 10, borderTop: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>
                        cloudskillsboost.google
                      </span>
                      <span style={{ fontSize: '.72rem', color: 'var(--amber)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                        Open Lab
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </span>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* ── List View ──────────────────────────────────── */
          <AnimatePresence mode="popLayout">
            <motion.div className="card" style={{ overflow: 'hidden' }}>
              {filtered.map((badge, i) => {
                const cat  = CAT_META[badge.category]
                const diff = DIFF_META[badge.difficulty]
                return (
                  <motion.a
                    key={badge.id}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * .012, .25) }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '36px 1fr auto auto',
                      alignItems: 'center',
                      gap: 12,
                      padding: '13px 18px',
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                      textDecoration: 'none',
                      transition: 'background .15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-hi)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                    {/* Index */}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                      {String(badge.id).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                      {badge.title}
                    </span>

                    {/* Category pill */}
                    <span style={{
                      fontSize: '.63rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                      background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                      whiteSpace: 'nowrap', letterSpacing: '.04em', textTransform: 'uppercase',
                    }}>
                      {badge.category}
                    </span>

                    {/* Difficulty */}
                    <span style={{
                      fontSize: '.63rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                      background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`,
                      whiteSpace: 'nowrap', letterSpacing: '.04em', textTransform: 'uppercase',
                    }}>
                      {diff.label}
                    </span>
                  </motion.a>
                )
              })}
              {filtered.length === 0 && (
                <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '.88rem' }}>
                  No badges match your filters. <button onClick={() => { setSearch(''); setCatFilter('All'); setDiffFilter('All') }}
                    style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {filtered.length === 0 && view === 'grid' && (
          <div style={{ padding: '64px 24px', textAlign: 'center', color: 'var(--text-dim)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: '.9rem', marginBottom: 16 }}>No badges match your filters.</p>
            <button onClick={() => { setSearch(''); setCatFilter('All'); setDiffFilter('All') }}
              className="btn-outline" style={{ padding: '10px 22px', fontSize: '.85rem' }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Points reminder banner ───────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            marginTop: 40, padding: '20px 24px', borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(245,158,11,.07), rgba(34,211,238,.05))',
            border: '1px solid rgba(245,158,11,.2)',
            display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
          }}>
          <div style={{ fontSize: '2rem', flexShrink: 0 }}>🏅</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 4 }}>
              Every 2 skill badges = 1 campaign point
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--text-sub)' }}>
              Complete {BADGES.length} badges → up to <strong style={{ color: 'var(--amber)' }}>{Math.floor(BADGES.length / 2)} bonus points</strong> toward your swag tier.
              Points shown on your Scan are current season only.
            </div>
          </div>
          <Link href="/calculator" className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '.85rem', textDecoration: 'none', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Scan My Profile →
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
