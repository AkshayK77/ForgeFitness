import { supabase } from './supabase'
import { getWeekStart } from './workoutPlan'

export async function buildAgentContext(userId) {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  const weekStart = getWeekStart()

  const [
    { data: profile },
    { data: recentSessionRows },
    { data: volumeRows },
    { data: meals },
    planResult,
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase
      .from('sessions')
      .select('id, date, duration_minutes, completed_at')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(10),
    supabase
      .from('muscle_volume_log')
      .select('muscle_group, total_sets, updated_at')
      .eq('user_id', userId)
      .eq('week_start', weekStart),
    supabase
      .from('meal_history')
      .select('protein_g, calories')
      .eq('user_id', userId)
      .gte('created_at', start.toISOString())
      .lt('created_at', end.toISOString()),
    supabase
      .from('workout_plans')
      .select('id, name, plan_days(id, day_name, day_order, exercise_ids)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  // Enrich sessions with sets and exercise names
  let recentSessions = []
  if (recentSessionRows?.length > 0) {
    const sessionIds = recentSessionRows.map(s => s.id)
    const { data: sets } = await supabase
      .from('session_sets')
      .select('session_id, exercise_id, set_number, weight_kg, reps, completed')
      .in('session_id', sessionIds)
      .eq('completed', true)
      .order('set_number')

    const exerciseIds = [...new Set((sets || []).map(s => s.exercise_id))]
    let exerciseMap = {}
    if (exerciseIds.length > 0) {
      const { data: exercises } = await supabase
        .from('exercises')
        .select('id, name, muscle_groups')
        .in('id', exerciseIds)
      exercises?.forEach(e => { exerciseMap[e.id] = e })
    }

    recentSessions = recentSessionRows.map(sess => {
      const sessSets = (sets || []).filter(s => s.session_id === sess.id)
      const byEx = {}
      sessSets.forEach(s => {
        if (!byEx[s.exercise_id]) {
          byEx[s.exercise_id] = { name: exerciseMap[s.exercise_id]?.name ?? s.exercise_id, sets: [] }
        }
        byEx[s.exercise_id].sets.push({ set: s.set_number, weight_kg: s.weight_kg, reps: s.reps })
      })
      return {
        date: sess.date,
        duration_minutes: sess.duration_minutes,
        exercises: Object.values(byEx),
      }
    })
  }

  // Today's scheduled plan day
  let todayDay = null
  if (planResult.data) {
    const days = (planResult.data.plan_days || []).sort((a, b) => a.day_order - b.day_order)
    const dow = new Date().getDay()
    const idx = dow === 0 ? days.length - 1 : Math.min(dow - 1, days.length - 1)
    const day = days[idx] ?? days[0]
    if (day) {
      const ids = (day.exercise_ids || []).map(e => e.exerciseId || e).filter(Boolean)
      let exerciseNames = []
      if (ids.length > 0) {
        const { data: exercises } = await supabase
          .from('exercises')
          .select('name')
          .in('id', ids)
        exerciseNames = exercises?.map(e => e.name) ?? []
      }
      todayDay = { dayName: day.day_name, exercises: exerciseNames }
    }
  }

  const todayNutrition = {
    calories: Math.round((meals || []).reduce((s, m) => s + (m.calories || 0), 0)),
    protein: Math.round((meals || []).reduce((s, m) => s + (m.protein_g || 0), 0)),
    calorieTarget: profile?.daily_calorie_target ?? null,
    proteinTarget: profile?.daily_protein_target ?? null,
  }

  return { profile, recentSessions, weeklyVolume: volumeRows || [], todayNutrition, todayDay }
}
