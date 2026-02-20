import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BadgeData {
  id: string
  name: string
  imageUrl: string
  earnedDate?: string
  type: 'arcade' | 'skill' | 'trivia' | 'lab' | 'course' | 'other'
  points: number
  isActive: boolean
  isCampaign: boolean
  link?: string
}

export interface MilestoneData {
  name: string
  gamesRequired: number
  triviaRequired: number
  skillRequired: number
  labFreeRequired: number
  bonusPoints: number
  achieved: boolean
}

export interface PrizeTierData {
  name: string
  minPoints: number
  description: string
  color: string
  achieved: boolean
  current: boolean
}

export interface ActiveBadgeData {
  id: string
  name: string
  imageUrl: string
  type: 'Game' | 'Sprint'
  deadline: string
  points: number
  link: string
  earnedByUser: boolean
}

export interface ProfileData {
  name: string
  avatarUrl: string
  profileUrl: string
  league: string
  rank: number | null
  memberSince: string
  badges: BadgeData[]        // ALL badges on profile (for display)
  seasonBadges: BadgeData[]  // only Season 1 badges (for points/counts)
  // raw counts (season only)
  arcadeCount: number
  triviaCount: number
  skillCount: number
  labFreeCount: number
  // points breakdown
  arcadePoints: number
  triviaPoints: number
  skillPoints: number
  totalPoints: number
  // milestone
  milestones: MilestoneData[]
  currentMilestone: string
  nextMilestone: string
  milestoneBonus: number
  // prize / swag
  prizeTiers: PrizeTierData[]
  currentPrizeTier: string
  nextPrizeTier: string
  pointsToNextPrize: number
  prizeProgress: number
  // legacy compat
  currentSwagLevel: string
  nextSwagLevel: string
  pointsToNext: number
  swagProgress: number
  // badge counts
  badgesEarned: number
  completedBadgesCount: number
  incompleteBadgesCount: number
  // active badges this month
  activeBadges: ActiveBadgeData[]
  // response time
  responseTime: number
  // season
  season: string
}

// ─── 2025 Season 1 Prize Tiers ────────────────────────────────────────────────
// Novice=25, Trooper=45, Ranger=65, Champion=75, Legend=95
const PRIZE_TIERS: Omit<PrizeTierData, 'achieved' | 'current'>[] = [
  { name: 'Novice',   minPoints: 25, description: 'Novice tier prize for 25 points',   color: '#60a5fa' },
  { name: 'Trooper',  minPoints: 45, description: 'Trooper tier prize for 45 points',  color: '#a78bfa' },
  { name: 'Ranger',   minPoints: 65, description: 'Ranger tier prize for 65 points',   color: '#34d399' },
  { name: 'Champion', minPoints: 75, description: 'Champion tier prize for 75 points', color: '#f59e0b' },
  { name: 'Legend',   minPoints: 95, description: 'Legend tier prize for 95 points',   color: '#f43f5e' },
]

// ─── 2025 Facilitator Milestones ──────────────────────────────────────────────
const MILESTONES: Omit<MilestoneData, 'achieved'>[] = [
  { name: 'Milestone 1', gamesRequired: 2,  triviaRequired: 2,  skillRequired: 8,  labFreeRequired: 1, bonusPoints: 2  },
  { name: 'Milestone 2', gamesRequired: 4,  triviaRequired: 4,  skillRequired: 20, labFreeRequired: 2, bonusPoints: 8  },
  { name: 'Milestone 3', gamesRequired: 6,  triviaRequired: 5,  skillRequired: 30, labFreeRequired: 3, bonusPoints: 15 },
  { name: 'Ultimate',    gamesRequired: 8,  triviaRequired: 6,  skillRequired: 42, labFreeRequired: 4, bonusPoints: 25 },
]

// ─── Active February 2026 badges ─────────────────────────────────────────────
const ACTIVE_BADGES: Omit<ActiveBadgeData, 'earnedByUser'>[] = [
  { id: '1q-valentine-14301', name: 'From Foundations To Wonders',               imageUrl: '', type: 'Game',   deadline: '28/02/26, 11:59 AM', points: 3, link: 'https://www.cloudskillsboost.google/games/1q-valentine-14301' },
  { id: '1q-valentine-14300', name: 'Skills At The Pitch',                        imageUrl: '', type: 'Game',   deadline: '28/02/26, 08:59 PM', points: 3, link: 'https://www.cloudskillsboost.google/games/1q-valentine-14300' },
  { id: '1q-analytics-25017', name: 'Arcade Adventure: Analytics and Automation', imageUrl: '', type: 'Game',   deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-analytics-25017' },
  { id: '1q-data-06203',      name: 'Arcade Voyage: Data Tools',                  imageUrl: '', type: 'Game',   deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-data-06203' },
  { id: '1q-appdev-39130',    name: 'Arcade Trail: Application Development',      imageUrl: '', type: 'Game',   deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-appdev-39130' },
  { id: '1q-basecamp-28025',  name: 'Arcade Base Camp February 2026',             imageUrl: '', type: 'Game',   deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-basecamp-28025' },
  { id: '1q-worknplay-01319', name: 'Work Meets Play: Journeys Made Easy',        imageUrl: '', type: 'Game',   deadline: '01/03/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-worknplay-01319' },
  { id: '1q-sprint-02293',    name: 'Arcade February 2026 Sprint 1',              imageUrl: '', type: 'Sprint', deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-sprint-02293' },
  { id: '1q-sprint-02285',    name: 'Arcade February 2026 Sprint 2',              imageUrl: '', type: 'Sprint', deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-sprint-02285' },
  { id: '1q-sprint-02273',    name: 'Arcade February 2026 Sprint 3',              imageUrl: '', type: 'Sprint', deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-sprint-02273' },
  { id: '1q-sprint-02261',    name: 'Arcade February 2026 Sprint 4',              imageUrl: '', type: 'Sprint', deadline: '28/02/26, 11:59 PM', points: 1, link: 'https://www.cloudskillsboost.google/games/1q-sprint-02261' },
]

// ─── Season 1 date range: Jan 1 2026 – Jun 30 2026 ───────────────────────────
const SEASON_START = new Date('2026-01-01T00:00:00Z')
const SEASON_END   = new Date('2026-06-30T23:59:59Z')

/**
 * Robustly parse an earned-date string from the profile page.
 * Formats seen: "Jan 10, 2025" | "January 3, 2026" | "2025-11-03" | "3 Nov 2025"
 * Returns null if it cannot confidently extract a year.
 */
function parseEarnedDate(raw?: string): Date | null {
  if (!raw || !raw.trim()) return null
  const s = raw.trim()

  // ISO: 2025-11-03
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const d = new Date(s)
    return isNaN(d.getTime()) ? null : d
  }

  // "Jan 10, 2025" or "January 3, 2026"
  if (/[a-z]/i.test(s) && /\d{4}/.test(s)) {
    const d = new Date(s)
    if (!isNaN(d.getTime())) return d
  }

  // "3 Nov 2025" → rearrange to "Nov 3, 2025"
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/)
  if (dmy) {
    const d = new Date(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`)
    if (!isNaN(d.getTime())) return d
  }

  // Extract a 4-digit year — if we only know the year, use Jan 1 of that year
  const yearMatch = s.match(/\b(20\d{2})\b/)
  if (yearMatch) {
    return new Date(`${yearMatch[1]}-01-01`)
  }

  return null  // completely unparseable — can't determine season
}

/**
 * Returns true if the badge was earned during Season 1 (Jan–Jun 2026).
 * Badges whose date CANNOT be parsed are treated as non-season (excluded from counts)
 * to avoid inflating points with old badges that lost their date in scraping.
 */
function isCurrentSeasonBadge(earnedDate?: string): boolean {
  const d = parseEarnedDate(earnedDate)
  if (!d) return false  // unknown date → exclude from season counts (conservative)
  return d >= SEASON_START && d <= SEASON_END
}

// ─── Badge type detection ─────────────────────────────────────────────────────
function detectBadgeType(name: string): BadgeData['type'] {
  const l = name.toLowerCase()

  // Trivia: any badge with "trivia" or "sprint" in name
  if (l.includes('trivia') || l.includes('sprint')) return 'trivia'

  // Arcade game badges: "arcade", "voyage", "trail", "base camp", "foundations", "skills at", "work meets play"
  if (
    l.includes('arcade') ||
    l.includes('voyage') ||
    l.includes('trail:') ||
    l.includes('base camp') ||
    l.includes('foundations to') ||
    l.includes('skills at the') ||
    l.includes('work meets play') ||
    l.includes('adventure:') ||
    l.includes('1q-')
  ) return 'arcade'

  // Lab-free courses
  if (l.includes('lab-free') || l.includes('lab free') || (l.includes('course') && !l.includes('skill'))) return 'course'

  // Everything else is a skill badge
  return 'skill'
}

// Point value per badge
function getBadgePoints(type: BadgeData['type']): number {
  if (type === 'arcade') return 1
  if (type === 'trivia')  return 1
  if (type === 'skill')   return 0  // aggregated: floor(count/2)
  return 0
}

// ─── Fetch with redirect following ────────────────────────────────────────────
async function fetchProfile(url: string): Promise<string> {
  let currentUrl = url
  let redirects = 0

  while (redirects < 8) {
    const res = await fetch(currentUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        Referer: 'https://www.cloudskillsboost.google/',
      },
    })

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location') ?? ''
      const next = location.startsWith('http') ? location : new URL(location, currentUrl).href

      // Redirected away from a profile — profile is invalid/private
      if (!next.includes('public_profiles')) {
        throw new Error(
          'Profile not found or is private. Please make sure your profile URL is correct and your profile is set to public.'
        )
      }
      currentUrl = next
      redirects++
      continue
    }

    if (!res.ok) {
      throw new Error(`Failed to load profile (HTTP ${res.status}). Make sure the profile is public.`)
    }

    return res.text()
  }

  throw new Error('Too many redirects. The profile could not be loaded.')
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const t0 = Date.now()

  try {
    const body = await req.json()
    const { url } = body as { url?: string }

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const cleanUrl = url.trim()

    // Validate domain
    const validDomains = ['cloudskillsboost.google', 'skills.google', 'qwiklabs.com']
    const isValidDomain = validDomains.some(d => cleanUrl.includes(d))
    if (!isValidDomain || !cleanUrl.includes('public_profiles')) {
      return NextResponse.json(
        { error: 'Please enter a valid Google Cloud Skills Boost public profile URL.\nExample: https://www.cloudskillsboost.google/public_profiles/YOUR-ID' },
        { status: 400 }
      )
    }

    // Normalize to cloudskillsboost.google
    let fetchUrl = cleanUrl
    if (cleanUrl.includes('skills.google') && !cleanUrl.includes('cloudskillsboost')) {
      fetchUrl = cleanUrl.replace('skills.google', 'cloudskillsboost.google')
    }
    if (!fetchUrl.includes('locale=')) {
      fetchUrl += (fetchUrl.includes('?') ? '&' : '?') + 'locale=en'
    }

    // Fetch HTML
    let html: string
    try {
      html = await fetchProfile(fetchUrl)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch profile'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const $ = cheerio.load(html)

    // Private profile check
    const bodyText = $('body').text().toLowerCase()
    if (bodyText.includes('private profile') || bodyText.includes('this profile is private')) {
      return NextResponse.json(
        { error: 'This profile is set to private. Go to your profile settings and set it to public.' },
        { status: 400 }
      )
    }

    // ── Name ──────────────────────────────────────────────────────────────────
    const name =
      $('h1.ql-display-small').first().text().trim() ||
      $('.public-profile__hero h1').first().text().trim() ||
      $('[data-profile-name]').first().text().trim() ||
      $('h1').filter((_, el) => {
        const t = $(el).text().trim()
        return t.length > 1 && t.length < 80 && !/cloud|skills|arcade|google/i.test(t)
      }).first().text().trim() ||
      'Unknown User'

    // ── Avatar ────────────────────────────────────────────────────────────────
    const avatarUrl =
      $('img.profile-avatar').first().attr('src') ||
      $('.public-profile__hero img').first().attr('src') ||
      $('[class*="avatar"] img').first().attr('src') ||
      $('img[alt*="avatar" i]').first().attr('src') ||
      ''

    // ── League / Rank / Member Since ─────────────────────────────────────────
    // Try to find league info from page text
    const fullText = $('body').text()
    const leagueMatch = fullText.match(/(Diamond|Platinum|Gold|Silver|Bronze)\s+League/i)
    const league = leagueMatch ? leagueMatch[0] : ''

    const rankMatch = fullText.match(/Rank\s*#?\s*(\d[\d,]*)/i)
    const rank = rankMatch ? parseInt(rankMatch[1].replace(/,/g, '')) : null

    const memberMatch = fullText.match(/Member\s+since\s+(\d{4})/i)
    const memberSince = memberMatch ? memberMatch[1] : ''

    // ── Badges ────────────────────────────────────────────────────────────────
    const earnedBadges: BadgeData[] = []
    const seenNames = new Set<string>()

    // Primary: .profile-badge elements
    $('.profile-badge').each((_, el) => {
      const badgeName =
        $(el).find('.ql-title-medium').first().text().trim() ||
        $(el).find('h3, h4, [class*="title"], [class*="name"]').first().text().trim() ||
        $(el).find('img').first().attr('alt') ||
        $(el).attr('aria-label') ||
        ''

      const badgeImg =
        $(el).find('img').first().attr('src') ||
        $(el).find('img').first().attr('data-src') ||
        ''

      let earnedDate = ''
      const bodyMedium = $(el).find('.ql-body-medium').first().text().trim()
      if (/earned/i.test(bodyMedium)) {
        earnedDate = bodyMedium.replace(/^earned\s*/i, '').trim()
      } else if (/\d{4}/.test(bodyMedium)) {
        earnedDate = bodyMedium
      }

      if (badgeName && badgeName.length > 2 && !seenNames.has(badgeName.toLowerCase())) {
        seenNames.add(badgeName.toLowerCase())
        const type = detectBadgeType(badgeName)
        earnedBadges.push({
          id: `earned-${earnedBadges.length}`,
          name: badgeName,
          imageUrl: badgeImg,
          earnedDate: earnedDate || undefined,
          type,
          points: getBadgePoints(type),
          isActive: true,
          isCampaign: type === 'arcade' || type === 'trivia',
        })
      }
    })

    // Fallback: scan qwiklabs/skills CDN images
    if (earnedBadges.length === 0) {
      $('img').each((_, img) => {
        const src = $(img).attr('src') || ''
        const alt = $(img).attr('alt') || ''
        if (
          (src.includes('cdn.qwiklabs.com') ||
           src.includes('storage.googleapis.com') ||
           src.includes('badges')) &&
          alt && alt.length > 3 &&
          !seenNames.has(alt.toLowerCase())
        ) {
          seenNames.add(alt.toLowerCase())
          const type = detectBadgeType(alt)
          earnedBadges.push({
            id: `earned-${earnedBadges.length}`,
            name: alt,
            imageUrl: src,
            type,
            points: getBadgePoints(type),
            isActive: true,
            isCampaign: type === 'arcade' || type === 'trivia',
          })
        }
      })
    }

      // ── Season filter — only count badges from Season 1 (Jan-Jun 2026) ─────────
      // Show all badges in the grid, but only count season-1 badges for points
      const seasonBadges = earnedBadges.filter(b => isCurrentSeasonBadge(b.earnedDate))

      // ── Counts (season only) ──────────────────────────────────────────────────
      const arcadeCount  = seasonBadges.filter(b => b.type === 'arcade').length
      const triviaCount  = seasonBadges.filter(b => b.type === 'trivia').length
      const skillCount   = seasonBadges.filter(b => b.type === 'skill').length
      const labFreeCount = seasonBadges.filter(b => b.type === 'course' || b.type === 'lab').length

      // ── Point Calculation (season 1 rules) ───────────────────────────────────
      // Arcade Games: 1 pt each | Sprint/Trivia: 1 pt each | Skill: floor(count/2) | Lab-free: 0 pts
      const arcadePoints = arcadeCount
      const triviaPoints = triviaCount
      const skillPoints  = Math.floor(skillCount / 2)
      const basePoints   = arcadePoints + triviaPoints + skillPoints

    // ── Milestones ────────────────────────────────────────────────────────────
    const milestones: MilestoneData[] = MILESTONES.map(m => ({
      ...m,
      achieved:
        arcadeCount  >= m.gamesRequired  &&
        triviaCount  >= m.triviaRequired &&
        skillCount   >= m.skillRequired  &&
        labFreeCount >= m.labFreeRequired,
    }))

    const achievedMilestones = milestones.filter(m => m.achieved)
    const topMilestone       = achievedMilestones[achievedMilestones.length - 1]
    const milestoneBonus     = topMilestone?.bonusPoints ?? 0
    const totalPoints        = basePoints + milestoneBonus
    const currentMilestone   = topMilestone?.name ?? 'No Milestone Yet'
    const nextMilestoneObj   = milestones[achievedMilestones.length]
    const nextMilestone      = nextMilestoneObj?.name ?? 'Ultimate Achieved!'

    // ── Prize Tiers ───────────────────────────────────────────────────────────
    const prizeTiers: PrizeTierData[] = PRIZE_TIERS.map((tier, i) => ({
      ...tier,
      achieved: totalPoints >= tier.minPoints,
      current:
        totalPoints >= tier.minPoints &&
        (i === PRIZE_TIERS.length - 1 || totalPoints < PRIZE_TIERS[i + 1].minPoints),
    }))

    const currentTier       = prizeTiers.find(t => t.current)
    const nextTierObj       = prizeTiers.find(t => !t.achieved)
    const currentPrizeTier  = currentTier?.name ?? (totalPoints < 25 ? 'Not Eligible Yet' : 'Legend')
    const nextPrizeTier     = nextTierObj?.name ?? 'Max Tier!'
    const pointsToNextPrize = nextTierObj ? nextTierObj.minPoints - totalPoints : 0
    const prizeProgress     =
      totalPoints < 25
        ? Math.round((totalPoints / 25) * 100)
        : currentTier && nextTierObj
          ? Math.round(((totalPoints - currentTier.minPoints) / (nextTierObj.minPoints - currentTier.minPoints)) * 100)
          : 100

    // ── Active badges (mark which ones user has earned) ───────────────────────
    const earnedNames = new Set(earnedBadges.map(b => b.name.toLowerCase().trim()))
    const activeBadges: ActiveBadgeData[] = ACTIVE_BADGES.map(ab => ({
      ...ab,
      earnedByUser: earnedNames.has(ab.name.toLowerCase().trim()),
    }))

    const responseTime = +(((Date.now() - t0) / 1000).toFixed(2))

      const result: ProfileData = {
        name,
        avatarUrl,
        profileUrl: cleanUrl,
        league,
        rank,
        memberSince,
        badges: earnedBadges,
        seasonBadges,
        // counts (season 1 only)
        arcadeCount,
        triviaCount,
        skillCount,
        labFreeCount,
        // points
        arcadePoints,
        triviaPoints,
        skillPoints,
        totalPoints,
        // milestones
        milestones,
        currentMilestone,
        nextMilestone,
        milestoneBonus,
        // prize
        prizeTiers,
        currentPrizeTier,
        nextPrizeTier,
        pointsToNextPrize,
        prizeProgress,
        // legacy compat
        currentSwagLevel: currentPrizeTier,
        nextSwagLevel: nextPrizeTier,
        pointsToNext: pointsToNextPrize,
        swagProgress: prizeProgress,
        // badge counts — use season count for main metric, total for display
        badgesEarned: seasonBadges.length,
        completedBadgesCount: seasonBadges.length,
        incompleteBadgesCount: earnedBadges.length - seasonBadges.length,
        // active badges
        activeBadges,
        responseTime,
        season: 'The Arcade Season 1 · January, 2026 - June, 2026',
      }

    return NextResponse.json(result)
  } catch (err) {
    console.error('[scrape] error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch profile. The profile might be private or unavailable.' },
      { status: 500 }
    )
  }
}
