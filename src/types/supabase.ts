export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          age: number | null
          weight_kg: number | null
          height_cm: number | null
          fitness_goal: 'build_muscle' | 'lose_fat' | 'improve_fitness' | 'maintain' | null
          experience_level: 'beginner' | 'intermediate' | 'advanced' | 'returning' | null
          sessions_per_week: number | null
          equipment_available: 'full_gym' | 'dumbbells_only' | 'bodyweight' | 'bands_and_dbs' | null
          injuries: string | null
          dietary_preference: 'none' | 'vegetarian' | 'vegan' | 'halal_kosher' | null
          allergies: string | null
          daily_calorie_target: number | null
          daily_protein_target: number | null
          onboarding_complete: boolean | null
          avatar_url: string | null
          diet_type: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']>
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      exercises: {
        Row: {
          id: string
          name: string
          muscle_groups: string[]
          equipment_needed: string | null
          difficulty: string | null
          instructions: string | null
          is_compound: boolean | null
        }
        Insert: Omit<Database['public']['Tables']['exercises']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['exercises']['Row']>
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          plan_day_id: string | null
          date: string
          duration_minutes: number | null
          notes: string | null
          name: string | null
          completed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['sessions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['sessions']['Row']>
      }
      session_sets: {
        Row: {
          id: string
          session_id: string
          exercise_id: string | null
          set_number: number
          reps: number | null
          weight_kg: number | null
          rpe: number | null
          completed: boolean | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['session_sets']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['session_sets']['Row']>
      }
      measurements: {
        Row: {
          id: string
          user_id: string
          date: string
          weight_kg: number | null
          chest_cm: number | null
          waist_cm: number | null
          hips_cm: number | null
          arms_cm: number | null
          thighs_cm: number | null
          notes: string | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['measurements']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['measurements']['Row']>
      }
      meal_history: {
        Row: {
          id: string
          user_id: string
          recipe_name: string
          ingredients: string | null
          instructions: string | null
          protein_g: number | null
          carbs_g: number | null
          fat_g: number | null
          calories: number | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['meal_history']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['meal_history']['Row']>
      }
      muscle_volume_log: {
        Row: {
          id: string
          user_id: string
          week_start: string
          muscle_group: string
          total_sets: number | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['muscle_volume_log']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['muscle_volume_log']['Row']>
      }
      workout_plans: {
        Row: {
          id: string
          user_id: string
          name: string
          created_by_ai: boolean | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['workout_plans']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['workout_plans']['Row']>
      }
      plan_days: {
        Row: {
          id: string
          plan_id: string
          day_name: string
          day_order: number
          exercise_ids: Json
        }
        Insert: Omit<Database['public']['Tables']['plan_days']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['plan_days']['Row']>
      }
      progress_photos: {
        Row: {
          id: string
          user_id: string
          storage_path: string
          date: string
          notes: string | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['progress_photos']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['progress_photos']['Row']>
      }
      indian_foods: {
        Row: {
          id: string
          food_code: string | null
          food_name: string
          primary_source: string | null
          energy_kcal: number | null
          carb_g: number | null
          protein_g: number | null
          fat_g: number | null
          fibre_g: number | null
          freesugar_g: number | null
          calcium_mg: number | null
          iron_mg: number | null
          sodium_mg: number | null
          potassium_mg: number | null
          servings_unit: string | null
          unit_serving_energy_kcal: number | null
          unit_serving_carb_g: number | null
          unit_serving_protein_g: number | null
          unit_serving_fat_g: number | null
          unit_serving_fibre_g: number | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['indian_foods']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['indian_foods']['Row']>
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Exercise = Database['public']['Tables']['exercises']['Row']
export type Session = Database['public']['Tables']['sessions']['Row']
export type SessionSet = Database['public']['Tables']['session_sets']['Row']
export type Measurement = Database['public']['Tables']['measurements']['Row']
export type MealHistory = Database['public']['Tables']['meal_history']['Row']
export type MuscleVolumeLog = Database['public']['Tables']['muscle_volume_log']['Row']
export type WorkoutPlan = Database['public']['Tables']['workout_plans']['Row']
export type PlanDay = Database['public']['Tables']['plan_days']['Row']
export type ProgressPhoto = Database['public']['Tables']['progress_photos']['Row']
export type IndianFood = Database['public']['Tables']['indian_foods']['Row']
