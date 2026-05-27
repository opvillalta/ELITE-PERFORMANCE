/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Plus, Clock, Flame, Check, Trash, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routine, Exercise } from '../types';
import { AVAILABLE_EXERCISES_LIST } from '../data';
import { Button, Card, Input } from './ui';

interface RoutineDetailProps {
  routines: Routine[];
  selectedRoutineId: string;
  onSelectRoutine: (routineId: string) => void;
  onStartExerciseLogging: (routineId: string, exerciseId: string) => void;
  onFinishWorkout: (routineId: string) => void;
  onAddExerciseToRoutine: (routineId: string, name: string, series: number, repsRange: string, weight: number, muscle: string) => void;
  onCreateCustomRoutine: (name: string, muscles: string[], duration: number, calories: number) => void;
  onDeleteRoutine?: (routineId: string) => void;
}

export default function RoutineDetailView({
  routines,
  selectedRoutineId,
  onSelectRoutine,
  onStartExerciseLogging,
  onFinishWorkout,
  onAddExerciseToRoutine,
  onCreateCustomRoutine,
  onDeleteRoutine
}: RoutineDetailProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCreateRoutineModal, setShowCreateRoutineModal] = useState(false);

  const [newExName, setNewExName] = useState('');
  const [newExSeries, setNewExSeries] = useState(4);
  const [newExReps, setNewExReps] = useState('10-12');
  const [newExWeight, setNewExWeight] = useState(60);
  const [newExMuscle, setNewExMuscle] = useState('Pecho');

  const [newRotName, setNewRotName] = useState('');
  const [newRotMuscles, setNewRotMuscles] = useState('Espalda y Bíceps');
  const [newRotDuration, setNewRotDuration] = useState(50);
  const [newRotCalories, setNewRotCalories] = useState(350);

  const activeRoutine = routines.find(r => r.id === selectedRoutineId) || routines[0];

  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExName.trim()) return;
    onAddExerciseToRoutine(activeRoutine.id, newExName, newExSeries, newExReps, newExWeight, newExMuscle);
    setNewExName('');
    setNewExSeries(4);
    setNewExReps('10-12');
    setNewExWeight(60);
    setNewExMuscle('Pecho');
    setShowAddModal(false);
  };

  const handleCreateRoutineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRotName.trim()) return;
    const musclesList = newRotMuscles.split(',').map(m => m.trim());
    onCreateCustomRoutine(newRotName, musclesList, newRotDuration, newRotCalories);
    setNewRotName('');
    setShowCreateRoutineModal(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-28 font-sans overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      <div className="px-6 pt-6 pb-4 relative z-10">
        <p className="text-xs text-white/40 font-bold uppercase tracking-widest text-left">ESTÁS LISTANDO</p>
        <div className="flex justify-between items-center mt-1">
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
            {activeRoutine ? activeRoutine.name : 'Rutinas'}
          </h2>
          <Button
            type="button"
            onClick={() => setShowCreateRoutineModal(true)}
            variant="secondary"
            size="sm"
            className="text-white/60 font-bold py-1.5 px-3 rounded-full border-white/10"
          >
            Nueva Rutina
          </Button>
        </div>
      </div>

      <div className="px-6 overflow-x-auto scrollbar-none pb-2 flex gap-2 relative z-10">
        {routines.map((r) => (
          <Button
            key={r.id}
            type="button"
            onClick={() => onSelectRoutine(r.id)}
            variant={r.id === selectedRoutineId ? 'primary' : 'ghost'}
            size="sm"
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${r.id === selectedRoutineId ? 'shadow-md shadow-[#BFFF00]/30' : 'text-white/60 hover:bg-white/10'}`}
          >
            {r.name}
          </Button>
        ))}
      </div>

      {activeRoutine ? (
        <div className="px-5 mt-4 space-y-5 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-5 text-left">
              <div className="text-white/60 flex items-center gap-1.5 mb-2 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Duración</span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">
                {activeRoutine.durationMin}
                <span className="text-sm font-bold text-white/40 ml-1">min</span>
              </p>
            </Card>

            <Card className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-5 text-left">
              <div className="text-white/60 flex items-center gap-1.5 mb-2 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Calorías</span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">
                {activeRoutine.calories}
                <span className="text-sm font-bold text-white/40 ml-1">cal</span>
              </p>
            </Card>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-xs font-black uppercase tracking-widest text-white/40">
              Ejercicios ({activeRoutine.exercises.length})
            </span>
            <Button
              type="button"
              onClick={() => setShowAddModal(true)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs uppercase tracking-wide border-white/10"
            >
              <Plus className="w-4 h-4" />
              Agregar Ejercicio
            </Button>
          </div>

          <div className="space-y-3">
            {activeRoutine.exercises.map((exercise) => {
              const completedSetsCount = exercise.sets?.filter(s => s.completed).length || 0;
              const hasWorkLogged = completedSetsCount > 0;

              return (
                <Card
                  key={exercise.id}
                  className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 flex items-center justify-between transition-all hover:bg-white/5"
                >
                  <div className="space-y-1 text-left">
                    <h4 className="text-[17px] font-black text-white tracking-tight flex items-center gap-2">
                      {exercise.name}
                      {hasWorkLogged && (
                        <span className="bg-[#BFFF00]/10 text-[#BFFF00] border border-[#BFFF00]/20 text-[9px] font-black rounded-full px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 stroke-[4px]" />
                          <span>{completedSetsCount}/{exercise.seriesCount} series</span>
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-white/40 font-medium leading-relaxed">
                      {exercise.seriesCount} series <span className="mx-1">•</span> {exercise.repsRange} reps
                      {exercise.maxWeightPr > 0 && (
                        <span className="text-[10px] text-[#BFFF00] font-semibold block mt-0.5">
                          PR: {exercise.maxWeightPr} kg
                        </span>
                      )}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => onStartExerciseLogging(activeRoutine.id, exercise.id)}
                    variant="primary"
                    size="sm"
                    className="w-10 h-10 rounded-full p-0 shadow-md shadow-[#BFFF00]/30"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </Card>
              );
            })}

            {activeRoutine.exercises.length === 0 && (
              <Card className="text-center p-6 bg-[#1C1C1E] border border-dashed border-white/20 rounded-2xl text-white/50">
                <p className="text-sm font-medium">No hay ejercicios en esta rutina.</p>
                <Button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-[#BFFF00]"
                >
                  ¡Haz clic aquí para agregar uno!
                </Button>
              </Card>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <Button
              type="button"
              onClick={() => onFinishWorkout(activeRoutine.id)}
              variant="primary"
              size="lg"
              className="w-full rounded-full text-sm tracking-widest gap-2 py-4"
            >
              <Check className="w-5 h-5 stroke-[3px]" />
              FINALIZAR ENTRENAMIENTO
            </Button>

            {onDeleteRoutine && !['full-body-power', 'pecho-triceps', 'piernas-hombros'].includes(activeRoutine.id) && (
              <Button
                type="button"
                onClick={() => onDeleteRoutine(activeRoutine.id)}
                variant="ghost"
                size="md"
                className="w-full text-red-400 py-3 rounded-full font-bold text-xs uppercase tracking-wider"
              >
                Eliminar esta rutina
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="px-5 py-12 text-center text-white/50 relative z-10">
          Seleccione o cree una rutina para comenzar.
        </div>
      )}

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/85 flex items-end justify-center z-50">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-heavy rounded-t-3xl w-full max-w-md p-6 overflow-y-auto max-h-[85vh] relative"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-5"></div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">Agregar Ejercicio</h3>

              <form onSubmit={handleAddExerciseSubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs text-white/60 font-bold uppercase tracking-wider block">Catálogo</label>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto glass bg-black/30 rounded-xl p-2 scrollbar-none">
                    {AVAILABLE_EXERCISES_LIST.map((item) => (
                      <Button
                        key={item.name}
                        type="button"
                        onClick={() => setNewExName(item.name)}
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-3 py-1 text-white/70 hover:text-white"
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Nombre</label>
                  <Input
                    id="new-ex-name"
                    value={newExName}
                    onChange={(e) => setNewExName(e.target.value)}
                    placeholder="Press de pecho"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Series</label>
                  <Input
                    id="new-ex-series"
                    type="number"
                    value={newExSeries}
                    min={1}
                    onChange={(e) => setNewExSeries(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Reps</label>
                  <Input
                    id="new-ex-reps"
                    value={newExReps}
                    onChange={(e) => setNewExReps(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Peso</label>
                  <Input
                    id="new-ex-weight"
                    type="number"
                    value={newExWeight}
                    min={0}
                    onChange={(e) => setNewExWeight(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Músculo</label>
                  <Input
                    id="new-ex-muscle"
                    value={newExMuscle}
                    onChange={(e) => setNewExMuscle(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Añadir
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateRoutineModal && (
          <div className="fixed inset-0 bg-black/85 flex items-end justify-center z-50">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-heavy rounded-t-3xl w-full max-w-md p-6 overflow-y-auto max-h-[85vh] relative"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-5"></div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold tracking-tight">Crear Rutina</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowCreateRoutineModal(false)}>
                  Cerrar
                </Button>
              </div>

              <form onSubmit={handleCreateRoutineSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Nombre</label>
                  <Input
                    id="new-rot-name"
                    value={newRotName}
                    onChange={(e) => setNewRotName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Músculos</label>
                  <Input
                    id="new-rot-muscles"
                    value={newRotMuscles}
                    onChange={(e) => setNewRotMuscles(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Duración</label>
                  <Input
                    id="new-rot-duration"
                    type="number"
                    value={newRotDuration}
                    min={10}
                    onChange={(e) => setNewRotDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-left text-sm text-white/70">Calorías</label>
                  <Input
                    id="new-rot-calories"
                    type="number"
                    value={newRotCalories}
                    min={0}
                    onChange={(e) => setNewRotCalories(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowCreateRoutineModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Crear
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
