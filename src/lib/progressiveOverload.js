import { supabase } from './supabase'

export async function getProgressionSuggestion(userId, exerciseId) {
  const [{ data: exercise }, { data: sessionSets }] = await Promise.all([
    supabase.from('exercises').select('is_compound').eq('id', exerciseId).single(),
    supabase
      .from('session_sets')
      .select('session_id, weight_kg, reps, created_at')
      .eq('exercise_id', exerciseId)
      .eq('completed', true)
      .order('created_at', { ascending: false })
      .limit(50),
  ])

  if (!sessionSets || sessionSets.length === 0) {
    return { shouldIncrease: false, suggestedWeight: null, reason: 'No previous data' }
  }

  const uniqueSessionIds = [...new Set(sessionSets.map(s => s.session_id))]

  const { data: sessions } = await supabase
    .from('sessions')
    .select('id, date')
    .eq('user_id', userId)
    .in('id', uniqueSessionIds)
    .order('date', { ascending: false })
    .limit(2)

  if (!sessions || sessions.length === 0) {
    return { shouldIncrease: false, suggestedWeight: null, reason: 'No previous data' }
  }

  const lastSessionId = sessions[0].id
  const lastSets = sessionSets.filter(s => s.session_id === lastSessionId)

  if (!lastSets.length) {
    return { shouldIncrease: false, suggestedWeight: null, reason: 'No sets found for last session' }
  }

  const lastWeight = Math.max(...lastSets.map(s => parseFloat(s.weight_kg) || 0))
  const minReps = Math.min(...lastSets.filter(s => s.reps).map(s => parseInt(s.reps) || 0))
  const allHitReps = lastSets.length >= 2 && minReps >= 8

  const increment = exercise?.is_compound ? 5 : 2.5
  const shouldIncrease = allHitReps

  return {
    shouldIncrease,
    suggestedWeight: shouldIncrease ? lastWeight + increment : lastWeight,
    reason: shouldIncrease
      ? `↑ Hit ${lastSets.length}×${minReps}+ reps at ${lastWeight}kg — try ${lastWeight + increment}kg`
      : lastWeight > 0
        ? `Working at ${lastWeight}kg · hit ${lastSets.length}×8+ reps to progress`
        : 'No weight logged yet',
  }
}
