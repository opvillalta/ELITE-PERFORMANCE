/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Check, Clock, Plus, Minus, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { Routine, Exercise, ExerciseSet } from '../types';
import { Button, Card, Input } from './ui';

interface ActiveWorkoutProps {
  routine: Routine;
  exerciseId: string;
  onGoBack: () => void;
  onSaveSet: (routineId: string, exerciseId: string, set: Omit<ExerciseSet, 'id' | 'timestamp'>) => void;
  onClearSets: (routineId: string, exerciseId: string) => void;
}

export default function ActiveWorkoutView({
  routine,
  exerciseId,
  onGoBack,
  onSaveSet,
  onClearSets
}: ActiveWorkoutProps) {
  const exercise = routine.exercises.find(e => e.id === exerciseId);

  if (!exercise) {
    return (
      <div className="p-8 text-center text-white">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-sm font-medium">No se encontró el ejercicio.</p>
        <Button onClick={onGoBack} variant="ghost" size="sm" className="mt-4 text-lime-400 font-bold">
          Atrás
        </Button>
      </div>
    );
  }

  // Active inputs states
  const [weight, setWeight] = useState(exercise.defaultWeight);
  const [reps, setReps] = useState(12);

  // Stats
  const [currentSetIndex, setCurrentSetIndex] = useState(() => {
    return (exercise.sets?.length || 0) + 1;
  });

  // Keep state updated if exercise changes or resets
  useEffect(() => {
    setCurrentSetIndex((exercise.sets?.length || 0) + 1);
  }, [exercise.sets]);

  // Timer states (ticks up of exercise duration)
  const [timeElapsed, setTimeElapsed] = useState(45); // start at 45 seconds to match screen 4's "00:45"
  const [timerIsActive, setTimerIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerIsActive]);

  // Format Elapsed Time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pace estimation
  const currentPaceSec = 2.4; // standard concentric/eccentric duration matching screenshot
  // Volume calculation
  const calculatedVolume = weight * reps;

  // Handle saving
  const handleSaveSetSubmit = () => {
    onSaveSet(routine.id, exercise.id, {
      setIndex: currentSetIndex,
      weight,
      reps,
      completed: true,
      volume: calculatedVolume,
      paceSec: currentPaceSec,
      restSec: 120 // 2 minutes break
    });

    // Alert completion
    if (currentSetIndex >= exercise.seriesCount) {
      alert(`¡Completaste las ${exercise.seriesCount} series de ${exercise.name}!`);
    } else {
      // Prompt break and reset
      setTimeElapsed(0); // restart elapsed timer to log next set rest break
    }
  };

  // Adjusters
  const adjustWeight = (amount: number) => {
    setWeight(prev => Math.max(0, prev + amount));
  };
  const adjustReps = (amount: number) => {
    setReps(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-24 font-sans select-none overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      {/* Top action bar */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 relative z-10">
        <Button
          onClick={onGoBack}
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full flex items-center justify-center"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <span className="text-[17px] font-black tracking-tight uppercase">Rutina en Curso</span>
        <Button
          onClick={() => {
            if (confirm('¿Reiniciar todas las series registradas de este ejercicio?')) {
              onClearSets(routine.id, exercise.id);
            }
          }}
          title="Reiniciar series"
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-5 mt-4 space-y-5 relative z-10">
        {/* Spot Light Hero Backdrop Identical to screen 4 */}
        <div className="relative h-60 rounded-3xl overflow-hidden bg-[#1C1C1E] border border-[#2C2C2E]">
          <img
            src={routine.image}
            alt="Bench press coach"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
            <h3 className="text-2xl font-black text-[#BFFF00] tracking-tight uppercase leading-none drop-shadow-md">
              {exercise.name}
            </h3>
            <p className="text-white/60 uppercase font-black text-[13px] tracking-widest mt-1.5 leading-none">
              SET {Math.min(currentSetIndex, exercise.seriesCount)} de {exercise.seriesCount}
            </p>
          </div>
        </div>

        {/* Circular Countdown/Pedometer clock in clean SVG layout to match screen 4 dial */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Timer visual path */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="65"
                className="stroke-white/10"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="65"
                className="stroke-blue-400"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 65}
                strokeDashoffset={((timeElapsed % 60) / 60) * (2 * Math.PI * 65)}
                strokeLinecap="round"
              />
            </svg>
            
            <Button
              type="button"
              onClick={() => setTimerIsActive(!timerIsActive)}
              variant="ghost"
              size="sm"
              className="absolute flex flex-col items-center justify-center focus:outline-none"
              aria-pressed={!timerIsActive}
            >
              <span className="text-3xl font-black text-white tracking-widest leading-none cursor-pointer">
                {formatTime(timeElapsed)}
              </span>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-1.5">
                TIEMPO{!timerIsActive && " (PAUSA)"}
              </span>
            </Button>
          </div>
        </div>

        {/* Interaction Loggers row (inputs / buttons adjustments) */}
        <div className="grid grid-cols-2 gap-4">
          {/* PESO (KG) Selector Card */}
          <div className="glass rounded-3xl p-5 text-center flex flex-col justify-between">
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
              PESO (KG)
            </span>
            <div className="flex items-center justify-center gap-2 my-2.5">
              <Button onClick={() => adjustWeight(-5)} variant="ghost" size="sm" className="w-8 h-8 rounded-full flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-4xl font-extrabold text-white tracking-tight min-w-[70px]">
                {weight}
              </span>
              <Button onClick={() => adjustWeight(5)} variant="ghost" size="sm" className="w-8 h-8 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {/* Quick selectors */}
            <div className="flex gap-2 justify-center">
              <Button onClick={() => adjustWeight(-2.5)} variant="ghost" size="sm" className="text-[10px] text-white/60 px-1.5 py-0.5 rounded">-2.5</Button>
              <Button onClick={() => adjustWeight(2.5)} variant="ghost" size="sm" className="text-[10px] text-white/60 px-1.5 py-0.5 rounded">+2.5</Button>
            </div>
          </div>

          {/* REPS Selector Card */}
          <div className="glass rounded-3xl p-5 text-center flex flex-col justify-between">
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
              REPS
            </span>
            <div className="flex items-center justify-center gap-2 my-2.5">
              <Button onClick={() => adjustReps(-1)} variant="ghost" size="sm" className="w-8 h-8 rounded-full flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-4xl font-extrabold text-white tracking-tight min-w-[60px]">
                {reps}
              </span>
              <Button onClick={() => adjustReps(1)} variant="ghost" size="sm" className="w-8 h-8 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {/* Quick selectors targets */}
            <div className="flex gap-2 justify-center text-[10px] text-white/60 font-bold">
              <Button onClick={() => setReps(8)} variant="ghost" size="sm" className="px-2 py-0.5 rounded">8</Button>
              <Button onClick={() => setReps(10)} variant="ghost" size="sm" className="px-2 py-0.5 rounded">10</Button>
              <Button onClick={() => setReps(12)} variant="ghost" size="sm" className="px-2 py-0.5 rounded">12</Button>
            </div>
          </div>
        </div>

        {/* Triple At-A-Glance Stat Row from screen 4 */}
        <div className="glass rounded-2xl py-4.5 px-6 grid grid-cols-3 gap-2.5 text-center">
          {/* VOLUMEN */}
          <div className="space-y-1 text-center">
            <span className="text-[10px] text-white/40 font-semibold tracking-wider block">VOLUMEN</span>
            <p className="text-sm font-black text-white uppercase tracking-tight">
              {calculatedVolume.toLocaleString()} <span className="text-xs text-white/50 font-semibold">kg</span>
            </p>
          </div>

          {/* PACE */}
          <div className="space-y-1 text-center border-x border-white/10">
            <span className="text-[10px] text-white/40 font-semibold tracking-wider block">PACE</span>
            <p className="text-sm font-black text-white uppercase tracking-tight">
              {currentPaceSec} <span className="text-xs text-white/50 font-semibold">s</span>
            </p>
          </div>

          {/* DESCANSO */}
          <div className="space-y-1 text-center">
            <span className="text-[10px] text-white/40 font-semibold tracking-wider block">DESCANSO</span>
            <p className="text-sm font-black text-white uppercase tracking-tight">
              02:00
            </p>
          </div>
        </div>

        {/* Primary Save Set Lime Button with Check */}
        <Button
          id="btn-guardar-serie"
          type="button"
          onClick={handleSaveSetSubmit}
          variant="primary"
          size="lg"
          className="w-full py-4 px-6 rounded-full uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-600/30 mt-4"
        >
          <span>GUARDAR SERIE</span>
          <Check className="w-5 h-5 stroke-[3.5px]" />
        </Button>

        {/* History of logged series in this active exercise */}
        {exercise.sets && exercise.sets.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-white/10">
            <span className="text-xs font-extrabold uppercase text-white/50 tracking-wider text-left block">
              Series registradas esta sesión
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {exercise.sets.map((set, idx) => (
                  <Card key={set.id} className="px-4 py-2.5 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white/80">Serie {set.setIndex}</span>
                    <p className="text-white/60">
                      <span className="font-black text-white">{set.weight} kg</span> × <span className="font-black text-white">{set.reps} reps</span>
                    </p>
                    <span className="bg-blue-950/50 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-blue-500/10">
                      +{set.volume} kg vol
                    </span>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
