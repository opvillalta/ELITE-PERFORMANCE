/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserStats, Routine, WorkoutLog, GroupClass, Amenity, ServiceBooking } from './types';

// Let's use the exact image paths configured by the image-generation tool
const BG_BENCH_PRESS = '/src/assets/images/gym_bench_press_background_1779816922119.png';
const USER_AVATAR = '/src/assets/images/athlete_profile_1779816941368.png';
const BG_YOGA = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80';
const BG_SPINNING = 'https://images.unsplash.com/photo-1534258936925-c48947387603?auto=format&fit=crop&w=600&q=80';
const BG_SAUNA = 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80';
const BG_PISCINA = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80';

export const INITIAL_USER_STATS: UserStats = {
  name: 'Alex',
  avatar: USER_AVATAR,
  currentStreakDays: 5,
  weeklyWorkedCount: 3,
  weeklyGoalCount: 4,
  activeMinutesThisWeek: 52,
  estimatedCaloriesThisWeek: 608,
  currentLevel: 4,
  currentExperienceProgressPercent: 75,
  nextGoal: {
    exerciseName: 'Bench Press',
    targetWeight: 110,
    differenceVsPrev: 5
  },
  recoveryState: {
    muscleName: 'Pecho',
    state: 'Listo',
    hoursRemaining: 48
  }
};

export const INITIAL_ROUTINES: Routine[] = [
  {
    id: 'full-body-power',
    name: 'Full Body Power',
    durationMin: 45,
    calories: 380,
    difficulty: 'Alta',
    image: BG_BENCH_PRESS,
    targetMuscles: ['Pecho', 'Pierna', 'Espalda', 'Hombro'],
    exercises: [
      {
        id: 'ex-bench-press-fb',
        name: 'Press de Banca',
        seriesCount: 4,
        repsRange: '8-12',
        defaultWeight: 85,
        targetMuscle: 'Pecho',
        maxWeightPr: 105,
        sets: []
      },
      {
        id: 'ex-squat-fb',
        name: 'Sentadilla con Barra',
        seriesCount: 4,
        repsRange: '6-8',
        defaultWeight: 120,
        targetMuscle: 'Pierna',
        maxWeightPr: 145,
        sets: []
      },
      {
        id: 'ex-deadlift-fb',
        name: 'Peso Muerto',
        seriesCount: 3,
        repsRange: '5',
        defaultWeight: 150,
        targetMuscle: 'Espalda',
        maxWeightPr: 180,
        sets: []
      }
    ]
  },
  {
    id: 'pecho-triceps',
    name: 'Pecho y Tríceps',
    durationMin: 65,
    calories: 420,
    difficulty: 'Alta',
    image: BG_BENCH_PRESS,
    targetMuscles: ['Pecho', 'Tríceps'],
    exercises: [
      {
        id: 'ex-bench-press',
        name: 'Press de Banca',
        seriesCount: 4,
        repsRange: '8-10',
        defaultWeight: 85,
        targetMuscle: 'Pecho',
        maxWeightPr: 105,
        sets: []
      },
      {
        id: 'ex-cable-flyes',
        name: 'Aperturas con Polea',
        seriesCount: 3,
        repsRange: '12-15',
        defaultWeight: 25,
        targetMuscle: 'Pecho',
        maxWeightPr: 35,
        sets: []
      },
      {
        id: 'ex-tricep-pushdown',
        name: 'Extensión de Tríceps',
        seriesCount: 3,
        repsRange: '10-12',
        defaultWeight: 30,
        targetMuscle: 'Tríceps',
        maxWeightPr: 45,
        sets: []
      }
    ]
  },
  {
    id: 'piernas-hombros',
    name: 'Piernas y Hombros',
    durationMin: 50,
    calories: 390,
    difficulty: 'Media',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    targetMuscles: ['Piernas', 'Hombros'],
    exercises: [
      {
        id: 'ex-shoulder-press',
        name: 'Press Militar',
        seriesCount: 4,
        repsRange: '8-10',
        defaultWeight: 45,
        targetMuscle: 'Hombros',
        maxWeightPr: 65,
        sets: []
      },
      {
        id: 'ex-leg-press',
        name: 'Prensa de Piernas',
        seriesCount: 3,
        repsRange: '10-12',
        defaultWeight: 200,
        targetMuscle: 'Piernas',
        maxWeightPr: 260,
        sets: []
      },
      {
        id: 'ex-lateral-raises',
        name: 'Elevaciones Laterales',
        seriesCount: 3,
        repsRange: '12-15',
        defaultWeight: 12,
        targetMuscle: 'Hombros',
        maxWeightPr: 16,
        sets: []
      }
    ]
  }
];

export const INITIAL_WORKOUT_LOGS: WorkoutLog[] = [
  {
    id: 'log-1',
    routineId: 'pecho-triceps',
    routineName: 'Pecho y Tríceps',
    durationMin: 65,
    calories: 420,
    totalVolumeKg: 3420,
    setsLoggedCount: 10,
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    dateString: 'Ayer, 18:20 PM',
    exercisesSummary: ['Press de Banca', 'Aperturas con Polea', 'Extensión de Tríceps']
  },
  {
    id: 'log-2',
    routineId: 'piernas-hombros',
    routineName: 'Piernas y Hombros',
    durationMin: 50,
    calories: 390,
    totalVolumeKg: 4120,
    setsLoggedCount: 10,
    timestamp: new Date(Date.now() - 3600000 * 96).toISOString(), // 4 days ago
    dateString: '22 May, 07:00 AM',
    exercisesSummary: ['Press Militar', 'Prensa de Piernas', 'Elevaciones Laterales']
  },
  {
    id: 'log-3',
    routineId: 'full-body-power',
    routineName: 'Full Body Power',
    durationMin: 45,
    calories: 380,
    totalVolumeKg: 3800,
    setsLoggedCount: 11,
    timestamp: new Date(Date.now() - 3600000 * 144).toISOString(), // 6 days ago
    dateString: '19 May, 08:30 AM',
    exercisesSummary: ['Press de Banca', 'Sentadilla con Barra', 'Peso Muerto']
  }
];

export const AVAILABLE_EXERCISES_LIST = [
  { name: 'Press de Banca', targetMuscle: 'Pecho' },
  { name: 'Aperturas con Polea', targetMuscle: 'Pecho' },
  { name: 'Aperturas con Mancuernas', targetMuscle: 'Pecho' },
  { name: 'Press Inclinado con Barra', targetMuscle: 'Pecho' },
  { name: 'Extensión de Tríceps', targetMuscle: 'Tríceps' },
  { name: 'Fondos de Tríceps', targetMuscle: 'Tríceps' },
  { name: 'Copa de Tríceps', targetMuscle: 'Tríceps' },
  { name: 'Sentadilla de Pecho/Barra', targetMuscle: 'Pierna' },
  { name: 'Prensa de Piernas', targetMuscle: 'Pierna' },
  { name: 'Extensión de Piernas', targetMuscle: 'Pierna' },
  { name: 'Curl de Piernas Acostado', targetMuscle: 'Pierna' },
  { name: 'Peso Muerto', targetMuscle: 'Espalda' },
  { name: 'Remo con Barra', targetMuscle: 'Espalda' },
  { name: 'Jalón al Pecho', targetMuscle: 'Espalda' },
  { name: 'Dominadas', targetMuscle: 'Espalda' },
  { name: 'Press Militar', targetMuscle: 'Hombros' },
  { name: 'Elevaciones Laterales', targetMuscle: 'Hombros' },
  { name: 'Pájaros (Hombro Posterior)', targetMuscle: 'Hombros' },
  { name: 'Curl de Bíceps con Barra', targetMuscle: 'Bíceps' },
  { name: 'Curl de Bíceps Martillo', targetMuscle: 'Bíceps' },
  { name: 'Plancha Abdominal', targetMuscle: 'Core' },
  { name: 'Crunches', targetMuscle: 'Core' }
];

export const INITIAL_GROUP_CLASSES: GroupClass[] = [
  {
    id: 'class-spinning-am',
    name: 'Spinning Matutino',
    instructor: 'Carlos Mendoza',
    durationMin: 45,
    capacity: 20,
    enrolledCount: 14,
    schedule: { dayOfWeek: 'Lunes', time: '07:00' },
    difficulty: 'Intermedio',
    category: 'Spinning',
    image: BG_SPINNING,
    description: 'Sesión intensa de spinning para quema de calorías y resistencia cardiovascular.'
  },
  {
    id: 'class-yoga-manana',
    name: 'Yoga Flow',
    instructor: 'María González',
    durationMin: 60,
    capacity: 15,
    enrolledCount: 8,
    schedule: { dayOfWeek: 'Lunes', time: '08:30' },
    difficulty: 'Principiante',
    category: 'Yoga',
    image: BG_YOGA,
    description: 'Yoga dinámico para mejorar flexibilidad y relajación mental.'
  },
  {
    id: 'class-hiit-tarde',
    name: 'HIIT Explosivo',
    instructor: 'Pedro Sánchez',
    durationMin: 30,
    capacity: 18,
    enrolledCount: 16,
    schedule: { dayOfWeek: 'Lunes', time: '18:00' },
    difficulty: 'Avanzado',
    category: 'HIIT',
    image: BG_SPINNING,
    description: 'Entrenamiento intervalado de alta intensidad para máxima quema de grasa.'
  },
  {
    id: 'class-zumba',
    name: 'Zumba Party',
    instructor: 'Ana López',
    durationMin: 50,
    capacity: 25,
    enrolledCount: 20,
    schedule: { dayOfWeek: 'Martes', time: '19:00' },
    difficulty: 'Principiante',
    category: 'Zumba',
    image: BG_YOGA,
    description: 'Baila y quema calorías con ritmos latinos y ejercicios aeróbicos.'
  },
  {
    id: 'class-pilates',
    name: 'Pilates Reformer',
    instructor: 'María González',
    durationMin: 55,
    capacity: 10,
    enrolledCount: 6,
    schedule: { dayOfWeek: 'Miércoles', time: '07:00' },
    difficulty: 'Intermedio',
    category: 'Pilates',
    image: BG_YOGA,
    description: 'Ejercicios de pilates en reformer para fortalecer core y postura.'
  },
  {
    id: 'class-box',
    name: 'Boxeo Fit',
    instructor: 'Jorge Ramírez',
    durationMin: 45,
    capacity: 16,
    enrolledCount: 12,
    schedule: { dayOfWeek: 'Jueves', time: '18:30' },
    difficulty: 'Avanzado',
    category: 'Box',
    image: BG_SPINNING,
    description: 'Técnicas de boxeo combinadas con entrenamiento funcional.'
  }
];

export const INITIAL_AMENITIES: Amenity[] = [
  {
    id: 'amenity-sauna',
    name: 'Sauna Seco',
    type: 'Sauna',
    description: 'Sauna de piedras calientes para relajación muscular y desintoxicación.',
    available: true,
    schedule: '06:00 - 22:00',
    temperature: '80°C',
    image: BG_SAUNA
  },
  {
    id: 'amenity-vapor',
    name: 'Baño de Vapor',
    type: 'Vapor',
    description: 'Sala de vapor para limpiar poros y mejorar circulación.',
    available: true,
    schedule: '06:00 - 22:00',
    temperature: '45°C',
    image: BG_SAUNA
  },
  {
    id: 'amenity-jacuzzi',
    name: 'Jacuzzi',
    type: 'Jacuzzi',
    description: 'Jacuzzi con hidromasaje para relajación y recuperación muscular.',
    available: true,
    schedule: '06:00 - 22:00',
    temperature: '38°C',
    image: BG_SAUNA
  },
  {
    id: 'amenity-piscina',
    name: 'Piscina Climatizada',
    type: 'Piscina',
    description: 'Piscina de 25m climatizada para natación y ejercicios acuáticos.',
    available: true,
    schedule: '07:00 - 21:00',
    image: BG_PISCINA
  },
  {
    id: 'amenity-turco',
    name: 'Baño Turco',
    type: 'Baño Turco',
    description: 'Sala de vapor turco con aromaterapia para relajación total.',
    available: false,
    schedule: '08:00 - 20:00',
    temperature: '40°C',
    image: BG_SAUNA
  }
];

export const INITIAL_SERVICE_BOOKINGS: ServiceBooking[] = [];
