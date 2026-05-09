import { useState } from 'react'
import ExerciseModal from '../components/ExerciseModal'
import { useIsMobile } from '../hooks/useIsMobile'

const GROUPS = [
  { parts: ['chest', 'shoulders', 'triceps', 'back', 'biceps', 'forearms', 'neck', 'abs', 'quads', 'hamstrings', 'glutes', 'adductors', 'hip_flexors', 'calves'] },
]

const PART_LABELS = {
  chest: 'Chest', shoulders: 'Shoulders', triceps: 'Triceps',
  back: 'Back', biceps: 'Biceps', forearms: 'Forearms',
  neck: 'Neck', abs: 'Abs / Core',
  quads: 'Quads', hamstrings: 'Hamstrings', glutes: 'Glutes',
  adductors: 'Adductors', hip_flexors: 'Hip Flexors', calves: 'Calves',
}

const DATA = {
  chest: [
    {
      name: 'Pectoralis Major', subtitle: 'Clavicular & Sternal heads',
      badge: 'Primary Mover',
      desc: 'The largest chest muscle, responsible for horizontal adduction and flexion of the arm. The clavicular head handles upper-chest pressing, while the sternal head dominates flat and decline movements.',
      exercises: ['Bench Press', 'Incline Press', 'Cable Fly', 'Dumbbell Fly', 'Push-Up'],
    },
    {
      name: 'Pectoralis Minor', subtitle: 'Deep stabiliser',
      badge: 'Stabiliser',
      desc: 'A small muscle beneath the pec major that protracts and depresses the scapula. Key for shoulder health and proper pressing mechanics.',
      exercises: ['Dip', 'Push-Up Plus', 'Serratus Crunch'],
    },
  ],
  shoulders: [
    {
      name: 'Anterior Deltoid', subtitle: 'Front head',
      badge: 'Primary Mover',
      desc: 'Drives shoulder flexion and internal rotation. Heavily recruited during overhead pressing and front raises. Often over-developed relative to other delt heads.',
      exercises: ['Overhead Press', 'Front Raise', 'Arnold Press', 'Incline Press'],
    },
    {
      name: 'Lateral Deltoid', subtitle: 'Middle head',
      badge: 'Primary Mover',
      desc: 'Creates shoulder width and is the target of lateral raises. Only active during abduction above the horizontal plane when the arm is internally rotated.',
      exercises: ['Lateral Raise', 'Upright Row', 'Machine Lateral', 'Cable Lateral'],
    },
    {
      name: 'Posterior Deltoid', subtitle: 'Rear head',
      badge: 'Often Neglected',
      desc: 'Critical for shoulder health and posture. Retracts and externally rotates the arm. Commonly undertrained, leading to rounded-shoulder posture.',
      exercises: ['Face Pull', 'Rear Delt Fly', 'Reverse Pec Deck', 'Band Pull-Apart'],
    },
  ],
  triceps: [
    {
      name: 'Triceps Long Head', subtitle: 'Largest of three heads',
      badge: 'Mass Builder',
      desc: 'The only tri-articular head, crossing both the shoulder and elbow. Best stretched and loaded with overhead extensions. Accounts for ~60% of triceps mass.',
      exercises: ['Overhead Triceps Extension', 'Skull Crusher', 'Close-Grip Bench'],
    },
    {
      name: 'Triceps Lateral Head', subtitle: 'Outer head',
      badge: 'Definition',
      desc: 'Gives the triceps its horseshoe shape when developed. Most active during pushdowns with a pronated grip. Does not cross the shoulder joint.',
      exercises: ['Pushdown', 'Dip', 'Bench Press Lockout'],
    },
    {
      name: 'Triceps Medial Head', subtitle: 'Deep inner head',
      badge: 'Stabiliser',
      desc: 'Active throughout the entire range of elbow extension. Provides the foundation for all triceps movements, especially the final degrees of lockout.',
      exercises: ['Reverse Grip Pushdown', 'Diamond Push-Up', 'Close-Grip Bench'],
    },
  ],
  back: [
    {
      name: 'Latissimus Dorsi', subtitle: 'Wing muscle',
      badge: 'Primary Mover',
      desc: 'The widest muscle in the body. Responsible for shoulder adduction, extension, and internal rotation. Determines back width and the coveted V-taper.',
      exercises: ['Pull-Up', 'Lat Pulldown', 'Barbell Row', 'Seated Cable Row', 'Single-Arm Row'],
    },
    {
      name: 'Trapezius', subtitle: 'Upper, middle, lower fibres',
      badge: 'Multi-Function',
      desc: 'A large diamond-shaped muscle with three distinct regions. Upper traps elevate the scapula; middle traps retract it; lower traps depress it. Critical for all overhead movements.',
      exercises: ['Shrug', 'Face Pull', 'Bent-Over Row', 'Y-Raise'],
    },
    {
      name: 'Rhomboids', subtitle: 'Scapular retractors',
      badge: 'Posture',
      desc: 'Retract and rotate the scapula downward. Counteract the forward pull of the pecs and anterior deltoids. Essential for good posture and shoulder health.',
      exercises: ['Seated Cable Row', 'Band Pull-Apart', 'Face Pull', 'Bent-Over Row'],
    },
    {
      name: 'Teres Major', subtitle: "Lat's little helper",
      badge: 'Mass Builder',
      desc: "Often grouped with the lats, the teres major assists in shoulder extension, adduction, and internal rotation. It contributes meaningfully to back thickness and activates heavily in any pulling movement where the elbow drives toward the hip.",
      exercises: ['Pull-Up', 'Lat Pulldown', 'Single-Arm Row', 'Straight-Arm Pulldown'],
    },
    {
      name: 'Rotator Cuff', subtitle: 'Supraspinatus, Infraspinatus, Teres Minor, Subscapularis',
      badge: 'Foundation',
      desc: 'Four deep muscles that stabilise the humeral head in the shoulder socket. The supraspinatus initiates abduction; the infraspinatus and teres minor externally rotate; the subscapularis internally rotates. Neglecting them is the leading cause of shoulder injuries in pressing athletes.',
      exercises: ['Face Pull', 'Band External Rotation', 'Cable External Rotation', 'Cuban Press', 'Y-T-W Raise'],
    },
    {
      name: 'Erector Spinae', subtitle: 'Spinal stabilisers',
      badge: 'Foundation',
      desc: 'Three columns of muscle running along the spine. Extend and laterally flex the trunk. The foundation of all compound lifts — they keep the spine neutral under load.',
      exercises: ['Deadlift', 'Romanian Deadlift', 'Back Extension', 'Good Morning'],
    },
  ],
  biceps: [
    {
      name: 'Biceps Brachii', subtitle: 'Long & short head',
      badge: 'Primary Mover',
      desc: 'A two-headed muscle that flexes the elbow and supinates the forearm. The long head creates the peak; the short head builds width. Best developed with supination under load.',
      exercises: ['Barbell Curl', 'Dumbbell Curl', 'Incline Curl', 'Cable Curl', 'Chin-Up'],
    },
    {
      name: 'Brachialis', subtitle: 'Deep elbow flexor',
      badge: 'Thickness',
      desc: 'Lies beneath the biceps and is the strongest elbow flexor. Developed with neutral-grip movements. Building it pushes the biceps up, increasing peak height.',
      exercises: ['Hammer Curl', 'Neutral-Grip Chin-Up', 'Cross-Body Curl'],
    },
  ],
  forearms: [
    {
      name: 'Forearm Flexor Group', subtitle: 'Wrist & finger flexors',
      badge: 'Primary Mover',
      desc: 'Includes flexor carpi radialis/ulnaris, palmaris longus, and flexor digitorum muscles. Responsible for wrist flexion and gripping strength.',
      exercises: ['Wrist Curl', 'Behind-the-Back Wrist Curl', 'Farmer Carry', 'Towel Pull-Up'],
    },
    {
      name: 'Forearm Extensor Group', subtitle: 'Wrist & finger extensors',
      badge: 'Often Neglected',
      desc: 'Extensor carpi radialis longus/brevis, extensor carpi ulnaris, and extensor digitorum. Balances the flexors and protects the elbow and wrist.',
      exercises: ['Reverse Wrist Curl', 'Rubber Band Finger Extension', 'EZ-Bar Reverse Curl'],
    },
    {
      name: 'Brachioradialis', subtitle: 'Forearm elbow flexor',
      badge: 'Mass Builder',
      desc: 'Thickens the top of the forearm and assists elbow flexion in neutral grips. Highly active in hammer-style movements.',
      exercises: ['Hammer Curl', 'Cross-Body Curl', 'Reverse Curl'],
    },
    {
      name: 'Pronators & Supinator', subtitle: 'Rotation control',
      badge: 'Stabiliser',
      desc: 'Pronator teres/quadratus and the supinator rotate the forearm. Essential for elbow stability and wrist health in pressing and pulling.',
      exercises: ['Dumbbell Pronation/Supination', 'Hammer Rotation', 'Cable Pronation'],
    },
  ],
  neck: [
    {
      name: 'Sternocleidomastoid', subtitle: 'SCM — primary neck flexor',
      badge: 'Primary Mover',
      desc: 'The large paired muscle running from the sternum and clavicle to the mastoid process behind the ear. Flexes and rotates the head and neck. Visible from the front as the defining neck muscle. Trained by resisted neck flexion and wrestler bridges.',
      exercises: ['Neck Flexion (plate/band)', 'Wrestler Bridge', 'Neck Harness Flexion'],
    },
    {
      name: 'Splenius Capitis & Cervicis', subtitle: 'Neck extensors',
      badge: 'Often Neglected',
      desc: 'Run diagonally from the upper thoracic spine to the base of the skull. Extend and rotate the head and neck. Often undertrained despite being directly loaded during heavy deadlifts and squats.',
      exercises: ['Neck Extension (plate/band)', 'Neck Harness Extension', 'Deadlift', 'Back Squat'],
    },
    {
      name: 'Levator Scapulae', subtitle: 'Neck-to-shoulder connector',
      badge: 'Posture',
      desc: 'Connects the upper cervical vertebrae to the scapula. Elevates and downwardly rotates the scapula and laterally flexes the neck. Chronically tight in desk workers; a common source of neck and shoulder stiffness.',
      exercises: ['Neck Lateral Flexion Stretch', 'Shrug', 'Farmer Carry', 'Band Neck Lateral'],
    },
  ],
  abs: [
    {
      name: 'Rectus Abdominis', subtitle: 'The "six-pack" muscle',
      badge: 'Primary Mover',
      desc: 'A long paired muscle running vertically from the pubis to the sternum. Its primary action is spinal flexion. The visible segmentation is created by tendinous intersections, not by having separate muscles. Best trained through full spinal flexion under load.',
      exercises: ['Crunch', 'Cable Crunch', 'Hanging Leg Raise', 'Ab Wheel Rollout', 'Decline Sit-Up'],
    },
    {
      name: 'External Obliques', subtitle: 'Outer rotators',
      badge: 'Multi-Function',
      desc: 'The outermost abdominal layer, running diagonally from the lower ribs to the iliac crest. Produce trunk rotation toward the opposite side, lateral flexion, and assist in spinal flexion. The largest of the abdominal muscles.',
      exercises: ['Woodchop', 'Russian Twist', 'Side Plank', 'Pallof Press', 'Bicycle Crunch'],
    },
    {
      name: 'Internal Obliques', subtitle: 'Deep rotators',
      badge: 'Stabiliser',
      desc: 'Run perpendicular to the external obliques, just beneath them. Rotate the trunk toward the same side and laterally flex the spine. Work synergistically with the opposite external oblique in all rotational movements.',
      exercises: ['Woodchop', 'Pallof Press', 'Side Plank', 'Cable Rotation', 'Landmine Twist'],
    },
    {
      name: 'Transverse Abdominis', subtitle: 'Deep core stabiliser',
      badge: 'Foundation',
      desc: 'The deepest abdominal muscle, wrapping around the trunk like a corset. Does not produce visible movement — instead it increases intra-abdominal pressure and stiffens the lumbar spine. The first muscle to activate before any limb movement. Essential for spinal protection under heavy load.',
      exercises: ['Dead Bug', 'Plank', 'Pallof Press', 'Vacuum Hold', 'Bird Dog'],
    },
    {
      name: 'Serratus Anterior', subtitle: 'Rib cage serrations',
      badge: 'Often Neglected',
      desc: 'Originates from the lateral ribs and inserts on the medial border of the scapula. Protracts and upwardly rotates the scapula — critical for keeping it flush against the rib cage. Weakness causes "winging" of the scapula and disrupts all pressing and overhead movement patterns.',
      exercises: ['Push-Up Plus', 'Serratus Crunch', 'Overhead Press', 'Ab Wheel Rollout', 'Cable Serratus Crunch'],
    },
  ],
  quads: [
    {
      name: 'Rectus Femoris', subtitle: 'Central quad head',
      badge: 'Primary Mover',
      desc: 'The only quad head that crosses the hip joint, making it a hip flexor as well. Best targeted with leg extensions and hack squats with a forward lean.',
      exercises: ['Leg Extension', 'Hack Squat', 'Bulgarian Split Squat'],
    },
    {
      name: 'Vastus Lateralis', subtitle: 'Outer sweep',
      badge: 'Mass & Width',
      desc: 'The largest of the four quad heads, located on the outer thigh. Creates the teardrop shape from the side. Best loaded in the lengthened position with a deeper squat.',
      exercises: ['Squat', 'Leg Press', 'Walking Lunge', 'Leg Extension'],
    },
    {
      name: 'Vastus Medialis', subtitle: 'Teardrop muscle',
      badge: 'Knee Health',
      desc: 'The inner quad head that creates the teardrop near the knee. Critical for knee tracking and patellar stability. Best targeted with terminal knee extension and narrow stances.',
      exercises: ['Terminal Knee Extension', 'Step-Up', 'Narrow Squat', 'Leg Extension (final 30°)'],
    },
    {
      name: 'Vastus Intermedius', subtitle: 'Deep middle head',
      badge: 'Stabiliser',
      desc: 'The deepest of the four quad heads, lying beneath the rectus femoris directly on the femur. It cannot be isolated and is only accessible through compound knee extension. Contributes to overall quad mass and is trained proportionally by all squatting and pressing patterns.',
      exercises: ['Squat', 'Leg Press', 'Hack Squat', 'Leg Extension'],
    },
  ],
  hamstrings: [
    {
      name: 'Biceps Femoris', subtitle: 'Long & short head',
      badge: 'Primary Mover',
      desc: 'The lateral hamstring muscle. The long head is bi-articular (crosses hip and knee) and is key for hip extension in deadlifts. Best trained with hip-hinge movements.',
      exercises: ['Romanian Deadlift', 'Deadlift', 'Lying Leg Curl', 'Nordic Curl'],
    },
    {
      name: 'Semimembranosus & Semitendinosus', subtitle: 'Medial hamstrings',
      badge: 'Mass Builder',
      desc: 'The two medial hamstring muscles that form the inner thigh. Also bi-articular. Best targeted with hip-hinge patterns and lying leg curls at full hip extension.',
      exercises: ['Romanian Deadlift', 'Lying Leg Curl', 'Good Morning', 'Nordic Curl'],
    },
  ],
  glutes: [
    {
      name: 'Gluteus Maximus', subtitle: 'Largest muscle in the body',
      badge: 'Power',
      desc: 'The primary hip extensor and the largest muscle in the human body. Responsible for explosive hip extension. Maximally activated when the hip is flexed — think deep squats and hip thrusts at full range.',
      exercises: ['Hip Thrust', 'Romanian Deadlift', 'Bulgarian Split Squat', 'Glute Bridge', 'Step-Up'],
    },
    {
      name: 'Gluteus Medius', subtitle: 'Hip abductor',
      badge: 'Stability',
      desc: 'Abducts and internally rotates the hip. Critical for single-leg stability and lateral movement. Weakness leads to knee valgus and hip drop in gait.',
      exercises: ['Lateral Band Walk', 'Cable Abduction', 'Single-Leg Squat', 'Clamshell'],
    },
    {
      name: 'Gluteus Minimus', subtitle: 'Deepest glute muscle',
      badge: 'Stabiliser',
      desc: 'The smallest and deepest of the three glute muscles, lying directly beneath the medius. Assists in hip abduction and internal rotation and plays a key role in stabilising the pelvis during single-leg stance. Trained by the same movements as the medius but benefits most from full hip abduction with internal rotation.',
      exercises: ['Clamshell', 'Cable Abduction', 'Single-Leg Squat', 'Lateral Band Walk', 'Side-Lying Hip Abduction'],
    },
  ],
  adductors: [
    {
      name: 'Adductor Magnus', subtitle: 'Largest adductor',
      badge: 'Mass Builder',
      desc: 'The largest and most powerful adductor, with two distinct portions — an adductor part (femoral) and a hamstring part (tibial). The hamstring portion acts as an additional hip extensor and is heavily loaded in deep squats and Romanian deadlifts. Responsible for most of the inner-thigh mass.',
      exercises: ['Romanian Deadlift', 'Sumo Squat', 'Cable Adduction', 'Copenhagen Plank', 'Wide-Stance Leg Press'],
    },
    {
      name: 'Adductor Longus & Brevis', subtitle: 'Middle adductors',
      badge: 'Often Neglected',
      desc: 'Located in the middle layer of the inner thigh. Primarily adduct the hip and assist in hip flexion. Often undertrained but highly susceptible to groin strains in athletes who neglect them. Best loaded in the lengthened position.',
      exercises: ['Cable Adduction', 'Machine Adduction', 'Sumo Squat', 'Copenhagen Plank'],
    },
    {
      name: 'Gracilis', subtitle: 'Long medial thigh muscle',
      badge: 'Stabiliser',
      desc: 'A long, thin muscle running from the pubis to the medial tibia. The only adductor to cross both the hip and knee joints. Adducts the hip and assists knee flexion. Important for medial knee stability and often involved in groin strains.',
      exercises: ['Copenhagen Plank', 'Cable Adduction', 'Sumo Squat', 'Single-Leg Press'],
    },
    {
      name: 'Pectineus', subtitle: 'Upper inner thigh',
      badge: 'Stabiliser',
      desc: 'A short, flat muscle at the top of the inner thigh connecting the pubis to the femur. Adducts and flexes the hip. Often the site of deep groin pain when strained. Best addressed with adductor stretching and controlled hip flexion under load.',
      exercises: ['Cable Adduction', 'Machine Adduction', 'Hip Flexion (cable)', 'Sumo Deadlift'],
    },
  ],
  hip_flexors: [
    {
      name: 'Iliopsoas', subtitle: 'Iliacus + Psoas Major',
      badge: 'Primary Mover',
      desc: 'The most powerful hip flexor in the body, composed of two muscles that merge into one tendon. The psoas originates from the lumbar vertebrae; the iliacus from the inner pelvis. Together they flex the hip and externally rotate the femur. Chronically shortened in people who sit for long periods, leading to anterior pelvic tilt and lower-back pain.',
      exercises: ['Hanging Knee Raise', 'Cable Hip Flexion', 'Reverse Crunch', 'Dragon Flag', 'Hip Flexor Stretch'],
    },
    {
      name: 'Tensor Fasciae Latae', subtitle: 'TFL — IT band tensioner',
      badge: 'Stabiliser',
      desc: 'A short muscle at the top of the outer hip that feeds into the iliotibial (IT) band. Assists in hip flexion, abduction, and internal rotation, and stabilises the pelvis in single-leg stance. Commonly overactive and tight in runners, contributing to IT band syndrome and lateral knee pain.',
      exercises: ['Side-Lying Hip Abduction', 'Clamshell', 'Hip Hinge', 'TFL Stretch', 'Single-Leg Squat'],
    },
    {
      name: 'Rectus Femoris', subtitle: 'Quad head / hip flexor',
      badge: 'Multi-Function',
      desc: 'Though classified as a quad, the rectus femoris is the only quad head that crosses the hip joint, making it a secondary hip flexor. It is often the limiting factor in hip flexor tightness. Stretching it requires simultaneously extending the hip and flexing the knee.',
      exercises: ['Leg Extension', 'Bulgarian Split Squat', 'Couch Stretch', 'Reverse Nordic Curl'],
    },
  ],
  calves: [
    {
      name: 'Gastrocnemius', subtitle: 'Two-headed calf muscle',
      badge: 'Power',
      desc: 'The large, visible calf muscle with a medial and lateral head. Crosses both the knee and ankle joints. Best trained with straight-knee plantarflexion (standing calf raises).',
      exercises: ['Standing Calf Raise', 'Calf Press on Leg Press', 'Jump Rope'],
    },
    {
      name: 'Soleus', subtitle: 'Deep calf muscle',
      badge: 'Endurance',
      desc: 'A flat, wide muscle beneath the gastrocnemius. Does not cross the knee joint and is composed largely of slow-twitch fibres. Best trained with bent-knee calf raises under load.',
      exercises: ['Seated Calf Raise', 'Bent-Knee Calf Raise', 'Leg Press Calf Raise'],
    },
    {
      name: 'Tibialis Anterior', subtitle: 'Front of the shin',
      badge: 'Often Neglected',
      desc: 'Runs along the lateral surface of the tibia and dorsiflexes the ankle (pulls the foot up). The antagonist to the calf muscles. Critically important for ankle stability, running economy, and shin splint prevention. Virtually never trained in gym programs despite being stressed heavily in walking and running.',
      exercises: ['Tibialis Raise', 'Band Dorsiflexion', 'Reverse Calf Raise', 'Toe Walk'],
    },
    {
      name: 'Peroneals', subtitle: 'Fibularis Longus & Brevis',
      badge: 'Stability',
      desc: 'Run along the outer lower leg from the fibula to the foot. Evert the ankle (roll outward) and assist in plantarflexion. The primary restraints against ankle inversion sprains. Frequently weakened after ankle sprains, increasing re-injury risk if not rehabilitated.',
      exercises: ['Band Eversion', 'Single-Leg Balance', 'Lateral Step-Up', 'Bosu Squat', 'Ankle Circle'],
    },
  ],
}

const BADGE_COLORS = {
  'Primary Mover': { bg: 'rgba(200,245,90,0.15)', color: '#C8F55A', border: 'rgba(200,245,90,0.3)' },
  'Stabiliser': { bg: 'rgba(100,180,255,0.15)', color: '#64B4FF', border: 'rgba(100,180,255,0.3)' },
  'Mass Builder': { bg: 'rgba(255,160,80,0.15)', color: '#FFA050', border: 'rgba(255,160,80,0.3)' },
  'Often Neglected': { bg: 'rgba(255,90,90,0.15)', color: '#FF5A5A', border: 'rgba(255,90,90,0.3)' },
  'Multi-Function': { bg: 'rgba(180,100,255,0.15)', color: '#B464FF', border: 'rgba(180,100,255,0.3)' },
  'Posture': { bg: 'rgba(100,220,180,0.15)', color: '#64DCB4', border: 'rgba(100,220,180,0.3)' },
  'Foundation': { bg: 'rgba(255,200,50,0.15)', color: '#FFC832', border: 'rgba(255,200,50,0.3)' },
  'Thickness': { bg: 'rgba(200,245,90,0.15)', color: '#C8F55A', border: 'rgba(200,245,90,0.3)' },
  'Definition': { bg: 'rgba(100,180,255,0.15)', color: '#64B4FF', border: 'rgba(100,180,255,0.3)' },
  'Mass & Width': { bg: 'rgba(255,160,80,0.15)', color: '#FFA050', border: 'rgba(255,160,80,0.3)' },
  'Knee Health': { bg: 'rgba(100,220,180,0.15)', color: '#64DCB4', border: 'rgba(100,220,180,0.3)' },
  'Power': { bg: 'rgba(200,245,90,0.15)', color: '#C8F55A', border: 'rgba(200,245,90,0.3)' },
  'Stability': { bg: 'rgba(100,180,255,0.15)', color: '#64B4FF', border: 'rgba(100,180,255,0.3)' },
  'Endurance': { bg: 'rgba(180,100,255,0.15)', color: '#B464FF', border: 'rgba(180,100,255,0.3)' },
}

function MuscleCard({ muscle, defaultOpen, onExerciseClick }) {
  const [open, setOpen] = useState(defaultOpen || false)
  const bColor = BADGE_COLORS[muscle.badge] || BADGE_COLORS['Stabiliser']

  return (
    <div style={s.card}>
      <button style={s.cardHeader} onClick={() => setOpen(o => !o)}>
        <div style={s.cardHeaderLeft}>
          <span style={s.muscleName}>{muscle.name}</span>
          <span style={s.muscleSubtitle}>{muscle.subtitle}</span>
        </div>
        <div style={s.cardHeaderRight}>
          <span style={{ ...s.badge, background: bColor.bg, color: bColor.color, borderColor: bColor.border }}>
            {muscle.badge}
          </span>
          <span style={{ ...s.chevron, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={s.cardBody}>
          <p style={s.muscleDesc}>{muscle.desc}</p>
          <div style={s.exerciseChips}>
            {muscle.exercises.map(ex => (
              <button
                key={ex}
                style={s.exChip}
                onClick={() => onExerciseClick(ex)}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AnatomyPage() {
  const [activePart, setActivePart] = useState('chest')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const isMobile = useIsMobile()

  const muscles = DATA[activePart] || []
  const allParts = GROUPS[0].parts

  return (
    <div style={{ ...s.layout, flexDirection: isMobile ? 'column' : 'row' }}>
      {selectedExercise && (
        <ExerciseModal
          exerciseName={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* Desktop sidebar / Mobile horizontal scroll strip */}
      {isMobile ? (
        <div style={s.mobileTabStrip}>
          {allParts.map(part => (
            <button
              key={part}
              style={{ ...s.mobileTab, ...(activePart === part ? s.mobileTabActive : {}) }}
              onClick={() => setActivePart(part)}
            >
              {PART_LABELS[part]}
            </button>
          ))}
        </div>
      ) : (
        <aside style={s.sidebar}>
          {GROUPS.map((group, index) => (
            <div key={`group-${index}`} style={s.group}>
              {group.parts.map(part => (
                <button
                  key={part}
                  style={{ ...s.sideTab, ...(activePart === part ? s.sideTabActive : {}) }}
                  onClick={() => setActivePart(part)}
                >
                  {PART_LABELS[part]}
                </button>
              ))}
            </div>
          ))}
        </aside>
      )}

      {/* Content */}
      <main style={{ ...s.content, padding: isMobile ? '16px' : '24px 28px' }}>
        <div style={s.contentHeader}>
          <h1 style={{ ...s.pageTitle, fontSize: isMobile ? '24px' : '28px' }}>
            {PART_LABELS[activePart]}
          </h1>
          <span style={s.muscleCount}>{muscles.length} muscles</span>
        </div>
        <div style={s.cards}>
          {muscles.map((muscle, i) => (
            <MuscleCard
              key={muscle.name}
              muscle={muscle}
              defaultOpen={i === 0}
              onExerciseClick={setSelectedExercise}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

const s = {
  layout: { display: 'flex', height: '100%', overflow: 'hidden' },
  mobileTabStrip: {
    display: 'flex', flexDirection: 'row',
    overflowX: 'auto', flexShrink: 0,
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)',
    padding: '10px 12px', gap: '6px',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
  },
  mobileTab: {
    flexShrink: 0, padding: '6px 14px',
    borderRadius: '20px', border: '1px solid var(--border)',
    background: 'none', color: 'var(--muted)',
    fontSize: '12px', cursor: 'pointer',
    whiteSpace: 'nowrap', transition: 'all 0.15s',
  },
  mobileTabActive: {
    background: 'var(--accent-dim)', borderColor: 'rgba(200,245,90,0.4)',
    color: 'var(--accent)',
  },
  sidebar: {
    width: '160px', flexShrink: 0,
    borderRight: '1px solid var(--border)',
    overflowY: 'auto', padding: '16px 0',
    background: 'var(--surface)',
  },
  group: { marginBottom: '16px' },
  sideTab: {
    display: 'block', width: '100%', textAlign: 'left',
    padding: '7px 14px', background: 'none', border: 'none',
    borderLeftWidth: '2px', borderLeftStyle: 'solid', borderLeftColor: 'transparent',
    color: 'var(--muted)', fontSize: '13px', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  sideTabActive: {
    color: 'var(--accent)', background: 'var(--accent-dim)',
    borderLeftColor: 'var(--accent)',
  },
  content: { flex: 1, overflowY: 'auto', padding: '24px 28px' },
  contentHeader: {
    display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px',
  },
  pageTitle: {
    fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px',
    color: 'var(--text)', letterSpacing: '0.05em', margin: 0,
  },
  muscleCount: { fontSize: '12px', color: 'var(--dim)' },
  cards: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '10px', overflow: 'hidden',
  },
  cardHeader: {
    width: '100%', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '12px 14px',
    background: 'none', border: 'none', cursor: 'pointer',
    textAlign: 'left',
  },
  cardHeaderLeft: { display: 'flex', flexDirection: 'column', gap: '2px' },
  cardHeaderRight: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 },
  muscleName: { fontSize: '14px', fontWeight: '600', color: 'var(--text)' },
  muscleSubtitle: { fontSize: '11px', color: 'var(--dim)' },
  badge: {
    fontSize: '10px', fontWeight: '600', padding: '2px 8px',
    borderRadius: '20px', border: '1px solid', whiteSpace: 'nowrap',
  },
  chevron: {
    color: 'var(--dim)', fontSize: '14px',
    transition: 'transform 0.2s', userSelect: 'none',
  },
  cardBody: {
    padding: '0 14px 14px', borderTop: '1px solid var(--border)',
    paddingTop: '12px',
  },
  muscleDesc: {
    fontSize: '12px', color: 'var(--muted)', lineHeight: '1.7',
    margin: '0 0 10px',
  },
  exerciseChips: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  exChip: {
    fontSize: '11px', padding: '4px 10px',
    background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: '20px', color: 'var(--muted)', cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s',
  },
}
