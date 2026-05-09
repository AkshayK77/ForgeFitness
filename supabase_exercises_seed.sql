-- ============================================================
-- FORGE — Exercise seed data
-- Run this in the Supabase SQL Editor after the schema
-- ============================================================

INSERT INTO exercises (name, muscle_groups, equipment_needed, difficulty, is_compound) VALUES

-- CHEST
('Flat Barbell Bench Press',    ARRAY['chest_mid','triceps','anterior_delt'],         'full_gym',      'intermediate', true),
('Incline Barbell Bench Press', ARRAY['chest_upper','triceps','anterior_delt'],        'full_gym',      'intermediate', true),
('Decline Bench Press',         ARRAY['chest_lower','triceps'],                        'full_gym',      'intermediate', true),
('Flat Dumbbell Press',         ARRAY['chest_mid','triceps'],                          'dumbbells_only','beginner',     true),
('Incline Dumbbell Press',      ARRAY['chest_upper','anterior_delt'],                  'dumbbells_only','beginner',     true),
('Dumbbell Fly',                ARRAY['chest_mid'],                                    'dumbbells_only','beginner',     false),
('Incline Dumbbell Fly',        ARRAY['chest_upper'],                                  'dumbbells_only','beginner',     false),
('Cable Crossover',             ARRAY['chest_mid'],                                    'full_gym',      'intermediate', false),
('Low-to-High Cable Fly',       ARRAY['chest_upper'],                                  'full_gym',      'intermediate', false),
('High-to-Low Cable Fly',       ARRAY['chest_lower'],                                  'full_gym',      'intermediate', false),
('Chest Dips',                  ARRAY['chest_lower','triceps'],                        'full_gym',      'intermediate', true),
('Machine Chest Press',         ARRAY['chest_mid','triceps'],                          'full_gym',      'beginner',     true),
('Pushup',                      ARRAY['chest_mid','triceps','anterior_delt'],          'bodyweight',    'beginner',     true),
('Pike Pushup',                 ARRAY['chest_upper','anterior_delt'],                  'bodyweight',    'intermediate', true),

-- SHOULDERS
('Barbell Overhead Press',      ARRAY['anterior_delt','lateral_delt','triceps'],       'full_gym',      'intermediate', true),
('Dumbbell Overhead Press',     ARRAY['anterior_delt','lateral_delt'],                 'dumbbells_only','beginner',     true),
('Arnold Press',                ARRAY['anterior_delt','lateral_delt','posterior_delt'],'dumbbells_only','intermediate', true),
('Lateral Raise',               ARRAY['lateral_delt'],                                 'dumbbells_only','beginner',     false),
('Cable Lateral Raise',         ARRAY['lateral_delt'],                                 'full_gym',      'beginner',     false),
('Front Raise',                 ARRAY['anterior_delt'],                                'dumbbells_only','beginner',     false),
('Upright Row',                 ARRAY['lateral_delt','upper_trap'],                    'full_gym',      'intermediate', false),
('Face Pulls',                  ARRAY['posterior_delt','rotator_cuff'],                'full_gym',      'beginner',     false),
('Reverse Pec Deck',            ARRAY['posterior_delt'],                               'full_gym',      'beginner',     false),
('Bent-Over Rear Delt Raise',   ARRAY['posterior_delt'],                               'dumbbells_only','beginner',     false),
('Band Pull-Aparts',            ARRAY['posterior_delt','rhomboids'],                   'bodyweight',    'beginner',     false),
('Cuban Press',                 ARRAY['rotator_cuff','lateral_delt'],                  'dumbbells_only','intermediate', false),

-- TRICEPS
('Close-Grip Bench Press',      ARRAY['triceps_lateral','triceps_medial'],             'full_gym',      'intermediate', true),
('Skull Crushers',              ARRAY['triceps_long','triceps_lateral'],               'full_gym',      'intermediate', false),
('Overhead Tricep Extension',   ARRAY['triceps_long'],                                 'dumbbells_only','beginner',     false),
('Cable Pushdown',              ARRAY['triceps_lateral'],                              'full_gym',      'beginner',     false),
('Rope Pushdown',               ARRAY['triceps_lateral','triceps_medial'],             'full_gym',      'beginner',     false),
('Reverse-Grip Pushdown',       ARRAY['triceps_medial'],                               'full_gym',      'beginner',     false),
('Bench Dips',                  ARRAY['triceps_lateral'],                              'bodyweight',    'beginner',     false),
('Diamond Pushups',             ARRAY['triceps_lateral','triceps_medial'],             'bodyweight',    'intermediate', false),

-- BACK
('Deadlift',                    ARRAY['erector_spinae','lats','glute_max','hamstrings'],'full_gym',     'advanced',     true),
('Barbell Row',                 ARRAY['lats','mid_trap','rhomboids'],                  'full_gym',      'intermediate', true),
('Dumbbell Row',                ARRAY['lats','mid_trap'],                              'dumbbells_only','beginner',     true),
('Cable Row',                   ARRAY['lats','rhomboids','mid_trap'],                  'full_gym',      'beginner',     true),
('Chest-Supported Row',         ARRAY['rhomboids','mid_trap'],                         'full_gym',      'beginner',     true),
('Pull-Up',                     ARRAY['lats','biceps_long','teres_major'],             'bodyweight',    'intermediate', true),
('Lat Pulldown',                ARRAY['lats','biceps_long'],                           'full_gym',      'beginner',     true),
('Wide-Grip Pulldown',          ARRAY['lats','teres_major'],                           'full_gym',      'beginner',     true),
('Straight-Arm Pulldown',       ARRAY['lats'],                                         'full_gym',      'beginner',     false),
('Pullover',                    ARRAY['lats','teres_major'],                           'dumbbells_only','beginner',     false),
('Barbell Shrug',               ARRAY['upper_trap'],                                   'full_gym',      'beginner',     false),
('Y Raise',                     ARRAY['lower_trap'],                                   'dumbbells_only','beginner',     false),
('Back Extension',              ARRAY['erector_spinae','glute_max'],                   'full_gym',      'beginner',     false),
('Good Morning',                ARRAY['erector_spinae','hamstrings'],                  'full_gym',      'intermediate', true),

-- BICEPS
('Barbell Curl',                ARRAY['biceps_long','biceps_short'],                   'full_gym',      'beginner',     false),
('Dumbbell Curl',               ARRAY['biceps_long','biceps_short'],                   'dumbbells_only','beginner',     false),
('Incline Dumbbell Curl',       ARRAY['biceps_long'],                                  'dumbbells_only','beginner',     false),
('Hammer Curl',                 ARRAY['brachialis','biceps_long'],                     'dumbbells_only','beginner',     false),
('Cross-Body Hammer Curl',      ARRAY['brachialis'],                                   'dumbbells_only','beginner',     false),
('Preacher Curl',               ARRAY['biceps_short'],                                 'full_gym',      'beginner',     false),
('Concentration Curl',          ARRAY['biceps_short'],                                 'dumbbells_only','beginner',     false),
('Wide-Grip Barbell Curl',      ARRAY['biceps_short'],                                 'full_gym',      'beginner',     false),
('Reverse Curl',                ARRAY['brachialis'],                                   'full_gym',      'beginner',     false),

-- LEGS
('Barbell Squat',               ARRAY['quads_rf','quads_vl','quads_vmo','glute_max'],  'full_gym',      'intermediate', true),
('Hack Squat',                  ARRAY['quads_vl','quads_vmo'],                         'full_gym',      'intermediate', true),
('Leg Press',                   ARRAY['quads_vl','glute_max'],                         'full_gym',      'beginner',     true),
('Bulgarian Split Squat',       ARRAY['quads_vmo','glute_max'],                        'dumbbells_only','intermediate', true),
('Romanian Deadlift',           ARRAY['hamstrings_bf','glute_max'],                    'dumbbells_only','intermediate', true),
('Sumo Deadlift',               ARRAY['hamstrings_semi','glute_max','quads_vmo'],      'full_gym',      'intermediate', true),
('Lying Leg Curl',              ARRAY['hamstrings_bf'],                                'full_gym',      'beginner',     false),
('Seated Leg Curl',             ARRAY['hamstrings_semi'],                              'full_gym',      'beginner',     false),
('Nordic Curl',                 ARRAY['hamstrings_bf'],                                'bodyweight',    'advanced',     false),
('Leg Extension',               ARRAY['quads_rf','quads_vmo'],                         'full_gym',      'beginner',     false),
('Hip Thrust',                  ARRAY['glute_max'],                                    'full_gym',      'beginner',     false),
('Glute Bridge',                ARRAY['glute_max'],                                    'bodyweight',    'beginner',     false),
('Cable Hip Abduction',         ARRAY['glute_med'],                                    'full_gym',      'beginner',     false),
('Clamshell',                   ARRAY['glute_med','glute_min'],                        'bodyweight',    'beginner',     false),
('Lateral Band Walk',           ARRAY['glute_med'],                                    'bodyweight',    'beginner',     false),
('Standing Calf Raise',         ARRAY['gastrocnemius'],                                'full_gym',      'beginner',     false),
('Seated Calf Raise',           ARRAY['soleus'],                                       'full_gym',      'beginner',     false),
('Donkey Calf Raise',           ARRAY['gastrocnemius'],                                'bodyweight',    'beginner',     false);
