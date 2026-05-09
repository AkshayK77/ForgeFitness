import { supabase } from './supabase'
import { getWeekStart } from './workoutPlan'

// Returns the Monday date string for an arbitrary date
function weekStartFor(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z')
  const day = d.getUTCDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setUTCDate(d.getUTCDate() + diff)
  return d.toISOString().split('T')[0]
}

export async function checkDeload(userId) {
  const [{ data: profile }, { data: sessions }] = await Promise.all([
    supabase.from('profiles').select('sessions_per_week').eq('id', userId).single(),
    supabase
      .from('sessions')
      .select('date')
      .eq('user_id', userId)
      .not('completed_at', 'is', null)
      .order('date', { ascending: false })
      .limit(100),
  ])

  if (!profile || !sessions || sessions.length === 0) {
    return { deloadDue: false, weeksCount: 0 }
  }

  const sessionsPerWeek = profile.sessions_per_week || 3

  // Group sessions by week
  const byWeek = {}
  sessions.forEach(s => {
    const wk = weekStartFor(s.date)
    byWeek[wk] = (byWeek[wk] || 0) + 1
  })

  // Sort weeks descending, skip current week (may be in progress)
  const currentWeek = getWeekStart()
  const completedWeeks = Object.entries(byWeek)
    .filter(([wk]) => wk < currentWeek)
    .sort((a, b) => b[0].localeCompare(a[0]))

  // Count consecutive qualifying weeks
  let consecutive = 0
  let prevWeek = null

  for (const [wk, count] of completedWeeks) {
    if (count < sessionsPerWeek) break

    if (prevWeek !== null) {
      // Check weeks are truly consecutive (7 days apart)
      const gap = (new Date(prevWeek) - new Date(wk)) / 86400000
      if (gap !== 7) break
    }

    consecutive++
    prevWeek = wk
  }

  return { deloadDue: consecutive >= 5, weeksCount: consecutive }
}

export async function markDeloadSuggested(userId) {
  // Requires deload_suggested_at column on profiles table
  try {
    await supabase
      .from('profiles')
      .update({ deload_suggested_at: new Date().toISOString() })
      .eq('id', userId)
  } catch {
    // Column may not exist yet — silently skip
  }
}
