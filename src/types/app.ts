export type FitnessGoal = 'build_muscle' | 'lose_fat' | 'improve_fitness' | 'maintain'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'returning'

export type EquipmentAvailable = 'full_gym' | 'dumbbells_only' | 'bodyweight' | 'bands_and_dbs'

export type EnergyLevel = 'fresh' | 'normal' | 'tired'

export type MuscleGroup =
  | 'chest_mid'
  | 'chest_upper'
  | 'chest_lower'
  | 'anterior_delt'
  | 'lateral_delt'
  | 'posterior_delt'
  | 'rotator_cuff'
  | 'triceps_long'
  | 'triceps_lateral'
  | 'triceps_medial'
  | 'lats'
  | 'mid_trap'
  | 'upper_trap'
  | 'lower_trap'
  | 'rhomboids'
  | 'erector_spinae'
  | 'teres_major'
  | 'biceps_long'
  | 'biceps_short'
  | 'brachialis'
  | 'quads_rf'
  | 'quads_vl'
  | 'quads_vmo'
  | 'hamstrings_bf'
  | 'hamstrings_semi'
  | 'glute_max'
  | 'glute_med'
  | 'glute_min'
  | 'gastrocnemius'
  | 'soleus'

export type VolumeStatus = 'none' | 'low' | 'optimal' | 'high'

export type ToastVariant = 'success' | 'warning' | 'error'

export type AgentSpecialMode = 'flags' | 'recipe' | 'workout' | 'grocery' | 'warmup' | 'summary'

export interface SessionPreferences {
  muscleGroups: string[]
  durationMinutes: number
  energyLevel: EnergyLevel
}

export interface GeneratedExercise {
  exerciseName: string
  exerciseId?: string
  sets: number
  repRange: string
  targetWeight: number
  notes?: string
}

export interface GeneratedSession {
  sessionName: string
  estimatedDuration: number
  exercises: GeneratedExercise[]
}

export interface AgentFlag {
  message: string
  severity: 'info' | 'warning' | 'success'
}

export interface MacroSummary {
  protein: number
  carbs: number
  fat: number
  calories: number
}

export interface WeeklyVolumeEntry {
  muscleGroup: string
  totalSets: number
  status: VolumeStatus
  targetMin: number
  targetMax: number
}
