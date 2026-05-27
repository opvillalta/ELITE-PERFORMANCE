/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExerciseSet {
  id: string;
  setIndex: number; // 1-based index (e.g. Set 1, 2, 3...)
  weight: number;    // in kg
  reps: number;
  completed: boolean;
  volume: number;    // weight * reps
  paceSec: number;   // pace in seconds (e.g., 2.4s)
  restSec: number;   // rest duration in seconds (e.g. 120s)
  timestamp: string; // ISO string
}

export interface Exercise {
  id: string;
  name: string;
  seriesCount: number;
  repsRange: string; // e.g. "8-10", "10-12"
  defaultWeight: number; // starting weight suggestions
  targetMuscle: string; // e.g. "Pecho", "Tríceps", "Espalda", "Pierna"
  maxWeightPr: number; // Personal Record (PR) weight
  sets: ExerciseSet[]; // logged sets for the current workout
}

export interface Routine {
  id: string;
  name: string;
  durationMin: number;
  calories: number;
  difficulty: 'Fácil' | 'Media' | 'Alta';
  image: string;
  targetMuscles: string[]; // e.g. ["Pecho", "Tríceps"]
  exercises: Exercise[];
}

export interface WorkoutLog {
  id: string;
  routineId: string;
  routineName: string;
  durationMin: number;
  calories: number;
  totalVolumeKg: number;
  setsLoggedCount: number;
  timestamp: string; // ISO string
  dateString: string; // e.g. "Hoy, 09:45 AM"
  exercisesSummary: string[]; // e.g. ["Press de Banca", "Aperturas con Polea"]
}

export interface GroupClass {
  id: string;
  name: string;
  instructor: string;
  durationMin: number;
  capacity: number;
  enrolledCount: number;
  schedule: {
    dayOfWeek: string; // e.g., "Lunes", "Martes"
    time: string; // e.g., "08:00", "18:30"
  };
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: 'Spinning' | 'Yoga' | 'Zumba' | 'HIIT' | 'Pilates' | 'Box';
  image: string;
  description: string;
}

export interface Amenity {
  id: string;
  name: string;
  type: 'Sauna' | 'Vapor' | 'Jacuzzi' | 'Piscina' | 'Baño Turco';
  description: string;
  available: boolean;
  schedule: string; // e.g., "06:00 - 22:00"
  temperature?: string; // e.g., "80°C", "40°C"
  image: string;
}

export interface ServiceBooking {
  id: string;
  type: 'class' | 'amenity';
  serviceId: string;
  serviceName: string;
  dateString: string;
  timestamp: string;
}

export interface UserStats {
  name: string;
  avatar: string;
  currentStreakDays: number;
  weeklyWorkedCount: number;
  weeklyGoalCount: number;
  activeMinutesThisWeek: number;
  estimatedCaloriesThisWeek: number;
  currentLevel: number;
  currentExperienceProgressPercent: number; // e.g. 75%
  nextGoal: {
    exerciseName: string;
    targetWeight: number; // e.g. 110 kg
    differenceVsPrev: number; // e.g. +5 kg
  };
  recoveryState: {
    muscleName: string;
    state: 'Listo' | 'En recuperación' | 'Fatigado';
    hoursRemaining: number;
  };
}

export interface UserAccount {
  email: string;
  isLoggedIn: boolean;
}
