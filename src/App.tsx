/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_USER_STATS, INITIAL_ROUTINES, INITIAL_WORKOUT_LOGS, INITIAL_GROUP_CLASSES, INITIAL_AMENITIES, INITIAL_SERVICE_BOOKINGS } from './data';
import { UserStats, Routine, WorkoutLog, ExerciseSet, Exercise, GroupClass, Amenity, ServiceBooking } from './types';
import SignInView from './components/SignInView';
import HomeView from './components/HomeView';
import RoutineDetailView from './components/RoutineDetailView';
import ActiveWorkoutView from './components/ActiveWorkoutView';
import ProgressView from './components/ProgressView';
import ProfileView from './components/ProfileView';
import ServicesView from './components/ServicesView';
import FloatingNav from './components/FloatingNav';
import { Button } from './components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Dumbbell, Trophy, RotateCcw } from 'lucide-react';

export default function App() {
  // Load initial settings or initialize from localStorage
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('gym_user_email') || '';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('gym_logged_in') === 'true';
  });

  const [routines, setRoutines] = useState<Routine[]>(() => {
    const saved = localStorage.getItem('gym_routines');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('gym_stats');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATS;
  });

  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('gym_workout_logs');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUT_LOGS;
  });

  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(() => {
    return localStorage.getItem('gym_selected_routine_id') || 'pecho-triceps';
  });

  // Services state (classes & amenities)
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>(() => {
    const saved = localStorage.getItem('gym_group_classes');
    return saved ? JSON.parse(saved) : INITIAL_GROUP_CLASSES;
  });

  const [amenities, setAmenities] = useState<Amenity[]>(() => {
    const saved = localStorage.getItem('gym_amenities');
    return saved ? JSON.parse(saved) : INITIAL_AMENITIES;
  });

  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('gym_service_bookings');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_BOOKINGS;
  });

  // Navigation tab Router state
  const [activeTab, setActiveTab] = useState<'home' | 'routine' | 'progress' | 'profile' | 'services'>('home');

  // Workout state tracking
  const [activeExerciseLog, setActiveExerciseLog] = useState<{
    routineId: string;
    exerciseId: string;
  } | null>(() => {
    const saved = localStorage.getItem('gym_active_exercise_log');
    return saved ? JSON.parse(saved) : null;
  });

  // Highlight confirmation banner when a session ends!
  const [showFinishedAlert, setShowFinishedAlert] = useState<{
    show: boolean;
    routineName: string;
    volumeKg: number;
    setsCount: number;
  } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gym_user_email', userEmail);
    localStorage.setItem('gym_logged_in', isLoggedIn ? 'true' : 'false');
  }, [userEmail, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('gym_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('gym_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('gym_workout_logs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('gym_selected_routine_id', selectedRoutineId);
  }, [selectedRoutineId]);

  useEffect(() => {
    if (activeExerciseLog) {
      localStorage.setItem('gym_active_exercise_log', JSON.stringify(activeExerciseLog));
    } else {
      localStorage.removeItem('gym_active_exercise_log');
    }
  }, [activeExerciseLog]);

  useEffect(() => {
    localStorage.setItem('gym_group_classes', JSON.stringify(groupClasses));
  }, [groupClasses]);

  useEffect(() => {
    localStorage.setItem('gym_amenities', JSON.stringify(amenities));
  }, [amenities]);

  useEffect(() => {
    localStorage.setItem('gym_service_bookings', JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  // Auth Callout Action Handler
  const handleSignInSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    // Extract first name for display if applicable
    const baseName = email.split('@')[0];
    const uppercaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    setStats(prev => ({
      ...prev,
      name: uppercaseName || 'Alex'
    }));
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      setIsLoggedIn(false);
      setUserEmail('');
      localStorage.clear();
      // Reload initial defaults to not crash on re-login
      setRoutines(INITIAL_ROUTINES);
      setStats(INITIAL_USER_STATS);
      setWorkoutLogs(INITIAL_WORKOUT_LOGS);
      setSelectedRoutineId('pecho-triceps');
      setActiveTab('home');
    };
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setRoutines(INITIAL_ROUTINES);
    setStats(INITIAL_USER_STATS);
    setWorkoutLogs(INITIAL_WORKOUT_LOGS);
    setSelectedRoutineId('pecho-triceps');
    setActiveTab('home');
    setActiveExerciseLog(null);
    setGroupClasses(INITIAL_GROUP_CLASSES);
    setAmenities(INITIAL_AMENITIES);
    setServiceBookings(INITIAL_SERVICE_BOOKINGS);
    alert('¡La base de datos se ha restablecido a los valores iniciales de fábrica!');
  };

  // Handle booking a group class
  const handleBookClass = (classItem: GroupClass) => {
    const isAlreadyBooked = serviceBookings.some(
      b => b.type === 'class' && b.serviceId === classItem.id
    );

    if (isAlreadyBooked) {
      // Cancel booking
      setServiceBookings(prev => prev.filter(
        b => !(b.type === 'class' && b.serviceId === classItem.id)
      ));
      // Update enrolled count
      setGroupClasses(prev => prev.map(c => 
        c.id === classItem.id ? { ...c, enrolledCount: c.enrolledCount - 1 } : c
      ));
      alert(`Inscripción cancelada para ${classItem.name}`);
    } else {
      // Book class
      const newBooking: ServiceBooking = {
        id: `booking-${Date.now()}`,
        type: 'class',
        serviceId: classItem.id,
        serviceName: classItem.name,
        dateString: `${classItem.schedule.dayOfWeek} ${classItem.schedule.time}`,
        timestamp: new Date().toISOString()
      };
      setServiceBookings(prev => [...prev, newBooking]);
      // Update enrolled count
      setGroupClasses(prev => prev.map(c => 
        c.id === classItem.id ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
      ));
      alert(`¡Inscripción confirmada para ${classItem.name}!`);
    }
  };

  // Handle using an amenity
  const handleUseAmenity = (amenity: Amenity) => {
    const newBooking: ServiceBooking = {
      id: `booking-${Date.now()}`,
      type: 'amenity',
      serviceId: amenity.id,
      serviceName: amenity.name,
      dateString: new Date().toLocaleString([], { 
        weekday: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: new Date().toISOString()
    };
    setServiceBookings(prev => [...prev, newBooking]);
    alert(`Uso de ${amenity.name} registrado. ¡Disfruta tu tiempo de relajación!`);
  };

  // Navigations tab switcher
  const handleTabChange = (tab: 'home' | 'routine' | 'progress' | 'profile' | 'services') => {
    setActiveTab(tab);
  };

  // Trigger from home page banner
  const handleStartRoutineFromHome = (routineId: string) => {
    setSelectedRoutineId(routineId);
    setActiveTab('routine');
  };

  const handleStartExerciseLogging = (routineId: string, exerciseId: string) => {
    setActiveExerciseLog({ routineId, exerciseId });
  };

  // Log a specific training set belonging to an exercise
  const handleSaveSet = (
    routineId: string,
    exerciseId: string,
    setData: Omit<ExerciseSet, 'id' | 'timestamp'>
  ) => {
    setRoutines(prevRoutines => {
      const updated = prevRoutines.map(routine => {
        if (routine.id !== routineId) return routine;

        const updatedExercises = routine.exercises.map(exercise => {
          if (exercise.id !== exerciseId) return exercise;

          const newSet: ExerciseSet = {
            ...setData,
            id: `set-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            timestamp: new Date().toISOString()
          };

          // Append or replace existing set indexes to ensure no duplicating set rows
          const existingSets = exercise.sets || [];
          const relativeSets = existingSets.filter(s => s.setIndex !== setData.setIndex);
          const finalSets = [...relativeSets, newSet].sort((a,b) => a.setIndex - b.setIndex);

          // Update Personal Record PR if the logged weight is higher
          const isNewPr = setData.weight > exercise.maxWeightPr;
          const finalMaxPR = isNewPr ? setData.weight : exercise.maxWeightPr;

          return {
            ...exercise,
            maxWeightPr: finalMaxPR,
            sets: finalSets
          };
        });

        return {
          ...routine,
          exercises: updatedExercises
        };
      });
      return updated;
    });

    // Update individual active muscle target if needed
    const routine = routines.find(r => r.id === routineId);
    const exercise = routine?.exercises.find(e => e.id === exerciseId);
    if (exercise) {
      setStats(prevStats => {
        // Boost experience percent slowly for tracking
        const addedXp = prevStats.currentExperienceProgressPercent + 5;
        const levelUp = addedXp >= 100;
        const nextXp = levelUp ? (addedXp - 100) : addedXp;
        const nextLvl = levelUp ? (prevStats.currentLevel + 1) : prevStats.currentLevel;

        return {
          ...prevStats,
          currentExperienceProgressPercent: nextXp,
          currentLevel: nextLvl
        };
      });
    }
  };

  // Restart sets logs
  const handleClearSets = (routineId: string, exerciseId: string) => {
    setRoutines(prev => prev.map(rot => {
      if (rot.id !== routineId) return rot;
      return {
        ...rot,
        exercises: rot.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          return { ...ex, sets: [] };
        })
      };
    }));
  };

  // Complete Training Actions
  const handleFinishWorkout = (routineId: string) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;

    // Calculate sum metrics across all exercises
    let totalVolumeKg = 0;
    let setsLoggedCount = 0;
    const completedExercisesNames: string[] = [];

    routine.exercises.forEach(ex => {
      const doneSets = ex.sets || [];
      if (doneSets.length > 0) {
        completedExercisesNames.push(ex.name);
        doneSets.forEach(s => {
          totalVolumeKg += s.volume;
          setsLoggedCount++;
        });
      }
    });

    if (setsLoggedCount === 0) {
      alert('Debes registrar al menos una serie en cualquier ejercicio para finalizar tu sesión.');
      return;
    }

    // Generate Date Label (E.g. Today, 17:40 PM)
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateLabel = `Hoy, ${timeString}`;

    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      routineId,
      routineName: routine.name,
      durationMin: routine.durationMin,
      calories: routine.calories,
      totalVolumeKg,
      setsLoggedCount,
      timestamp: now.toISOString(),
      dateString: dateLabel,
      exercisesSummary: completedExercisesNames
    };

    // Update history listings
    setWorkoutLogs(prev => [newLog, ...prev]);

    // Boost stats indicators
    setStats(prevStats => {
      const nextWorkedCount = prevStats.weeklyWorkedCount + 1;
      const finishedWeeklyGoal = nextWorkedCount >= prevStats.weeklyGoalCount;
      const experienceBoost = prevStats.currentExperienceProgressPercent + 20;
      const levelUp = experienceBoost >= 100;

      return {
        ...prevStats,
        weeklyWorkedCount: nextWorkedCount,
        activeMinutesThisWeek: prevStats.activeMinutesThisWeek + routine.durationMin,
        estimatedCaloriesThisWeek: prevStats.estimatedCaloriesThisWeek + routine.calories,
        currentStreakDays: prevStats.currentStreakDays + 1,
        currentLevel: levelUp ? prevStats.currentLevel + 1 : prevStats.currentLevel,
        currentExperienceProgressPercent: levelUp ? (experienceBoost - 100) : experienceBoost
      };
    });

    // Clear active working series logged for that routine to keep clean next workout
    setRoutines(prev => prev.map(r => {
      if (r.id !== routineId) return r;
      return {
        ...r,
        exercises: r.exercises.map(ex => ({ ...ex, sets: [] }))
      };
    }));

    // Trigger confirmation overlay block
    setShowFinishedAlert({
      show: true,
      routineName: routine.name,
      volumeKg: totalVolumeKg,
      setsCount: setsLoggedCount
    });

    // Navigate to Progress
    setActiveTab('progress');
  };

  // Add customized exercise
  const handleAddExerciseToRoutine = (
    routineId: string,
    name: string,
    series: number,
    repsRange: string,
    weight: number,
    muscle: string
  ) => {
    setRoutines(prev => prev.map(r => {
      if (r.id !== routineId) return r;

      const newExercise: Exercise = {
        id: `ex-${Date.now()}`,
        name,
        seriesCount: series,
        repsRange,
        defaultWeight: weight,
        targetMuscle: muscle,
        maxWeightPr: weight,
        sets: []
      };

      return {
        ...r,
        exercises: [...r.exercises, newExercise]
      };
    }));
  };

  // Create full custom routines
  const handleCreateCustomRoutine = (name: string, muscles: string[], duration: number, calories: number) => {
    const newRoutineId = `rot-custom-${Date.now()}`;
    const newRoutine: Routine = {
      id: newRoutineId,
      name,
      durationMin: duration,
      calories,
      difficulty: 'Media',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      targetMuscles: muscles,
      exercises: []
    };

    setRoutines(prev => [...prev, newRoutine]);
    setSelectedRoutineId(newRoutineId);
    setActiveTab('routine');
  };

  const handleDeleteRoutine = (routineId: string) => {
    setRoutines(prev => prev.filter(r => r.id !== routineId));
    // Default fallback routine
    setSelectedRoutineId('pecho-triceps');
  };

  const handleUpdateStatsDirectly = (newStats: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  // Auth routing fallback
  if (!isLoggedIn) {
    return <SignInView onSignInSuccess={handleSignInSuccess} />;
  }

  // Active workout view rendering overrides typical tab navigator
  if (activeExerciseLog) {
    const activeRoutine = routines.find(r => r.id === activeExerciseLog.routineId);
    if (activeRoutine) {
      return (
        <ActiveWorkoutView
          routine={activeRoutine}
          exerciseId={activeExerciseLog.exerciseId}
          onGoBack={() => setActiveExerciseLog(null)}
          onSaveSet={handleSaveSet}
          onClearSets={handleClearSets}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-between select-none">
      
      {/* Content tabs renders inside animations wrapper */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <HomeView
                stats={stats}
                routines={routines}
                onStartRoutine={handleStartRoutineFromHome}
                onNavigateToRoutineTab={() => setActiveTab('routine')}
              />
            </motion.div>
          )}

          {activeTab === 'routine' && (
            <motion.div
              key="routine"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <RoutineDetailView
                routines={routines}
                selectedRoutineId={selectedRoutineId}
                onSelectRoutine={setSelectedRoutineId}
                onStartExerciseLogging={handleStartExerciseLogging}
                onFinishWorkout={handleFinishWorkout}
                onAddExerciseToRoutine={handleAddExerciseToRoutine}
                onCreateCustomRoutine={handleCreateCustomRoutine}
                onDeleteRoutine={handleDeleteRoutine}
              />
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ProgressView
                stats={stats}
                workoutLogs={workoutLogs}
                onResetLogs={() => setWorkoutLogs(INITIAL_WORKOUT_LOGS)}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ProfileView
                stats={stats}
                email={userEmail}
                onLogout={handleLogout}
                onUpdateStats={handleUpdateStatsDirectly}
                onResetAllData={handleResetAllData}
              />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ServicesView
                classes={groupClasses}
                amenities={amenities}
                bookings={serviceBookings}
                onBookClass={handleBookClass}
                onUseAmenity={handleUseAmenity}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistence / Workout Finished Success Modal dialog overlay */}
      <AnimatePresence>
        {showFinishedAlert && showFinishedAlert.show && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-3xl w-full max-w-sm text-center space-y-6 shadow-2xl relative"
            >
              {/* Golden Trophy illustration bubble */}
              <div className="w-16 h-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                <Trophy className="w-8 h-8 fill-current" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-white uppercase">
                  ¡Rutina Completada!
                </h3>
                <p className="text-blue-400 font-bold text-sm tracking-wide">
                  {showFinishedAlert.routineName}
                </p>
                <p className="text-xs text-white/60 leading-relaxed px-4">
                  Has registrado tu sesión con éxito. Tus estadísticas en el panel general han sido actualizadas.
                </p>
              </div>

              {/* Training logs recap metrics */}
              <div className="glass border border-white/5 p-4 rounded-2xl grid grid-cols-2 gap-4">
                <div className="text-center space-y-0.5">
                  <span className="text-[10px] text-white/40 font-bold uppercase block">Series</span>
                  <p className="text-lg font-black text-white">{showFinishedAlert.setsCount}</p>
                </div>
                <div className="text-center space-y-0.5 border-l border-white/10">
                  <span className="text-[10px] text-white/40 font-bold uppercase block">Volumen</span>
                  <p className="text-lg font-black text-white">{showFinishedAlert.volumeKg.toLocaleString()} kg</p>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => setShowFinishedAlert(null)}
                className="w-full font-extrabold rounded-xl text-sm uppercase tracking-wider transition-colors active:scale-95 shadow-lg shadow-blue-600/30"
              >
                Ver Mi Progreso
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Solid Black Capsule Custom Nav */}
      <FloatingNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
