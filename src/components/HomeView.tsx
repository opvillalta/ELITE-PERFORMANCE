/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, CheckCircle, Award, Clock, Search, TrendingUp, RefreshCw, Play, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, Button } from './ui';
import { UserStats, Routine } from '../types';

interface HomeViewProps {
  stats: UserStats;
  routines: Routine[];
  onStartRoutine: (routineId: string) => void;
  onNavigateToRoutineTab: () => void;
}

export default function HomeView({ stats, routines, onStartRoutine, onNavigateToRoutineTab }: HomeViewProps) {
  // Find "Full Body Power" or default to the first routine
  const todayRoutine = routines.find(r => r.id === 'full-body-power') || routines[0];

  // Calculate coordinates for SVG circle progression
  const percentage = stats.currentExperienceProgressPercent;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-24 font-sans select-none overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      {/* Top Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <img
            src={stats.avatar}
            alt="Profile Avatar"
            className="w-12 h-12 rounded-full border border-white/10 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <p className="text-xs text-white/50 font-medium">Hola, {stats.name}!</p>
            <h2 className="text-xl font-black tracking-tight text-white">Ready to workout?</h2>
          </div>
        </div>
        <Button
          onClick={onNavigateToRoutineTab}
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full p-0 text-white/60 hover:text-white hover:bg-white/10"
          aria-label="Buscar rutinas"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-5 space-y-4 relative z-10">
        {/* Progreso Diario Section Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-[#1C1C1E] border-[#2C2C2E] p-5 shadow-none relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[17px] font-bold text-white tracking-tight">Progreso diario</h3>
            <Button variant="ghost" size="sm" className="text-white/40 hover:text-white p-0 w-8 h-8 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4 flex-1">
              {/* Active Streak */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 flex items-center justify-center text-[#BFFF00]">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Racha actual</p>
                  <p className="text-lg font-black text-white">
                    <span className="text-[#BFFF00] text-xl">{stats.currentStreakDays}</span> Días
                  </p>
                </div>
              </div>

              {/* Weekly Goal */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Meta Semanal</p>
                  <p className="text-lg font-black text-white">
                    <span className="text-[#BFFF00] text-xl">{stats.weeklyWorkedCount}</span> / {stats.weeklyGoalCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative flex items-center justify-center p-1">
              <svg className="w-24 h-24 transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className="stroke-[#2C2C2E]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Active Ring */}
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className="stroke-[#BFFF00]"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-black text-white tracking-tight">
                  {percentage}%
                </span>
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest text-center mt-0.5">
                  META
                </span>
              </div>
            </div>
          </div>
          </Card>
        </motion.div>

        {/* 3 Widgets Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Calories widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1.5">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-sm font-black tracking-tight text-white">
                {stats.estimatedCaloriesThisWeek}
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider leading-snug">
                Cal. Estimadas
              </span>
            </Card>
          </motion.div>

          {/* Level Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 }}
          >
            <Card className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1.5">
              <div className="w-9 h-9 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 flex items-center justify-center text-[#BFFF00]">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-sm font-black tracking-tight text-white">
                Nivel {stats.currentLevel}
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider leading-snug">
                Rango Actual
              </span>
            </Card>
          </motion.div>

          {/* Active Time Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.11 }}
          >
            <Card className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1.5">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm font-black tracking-tight text-white">
                {stats.activeMinutesThisWeek} min
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider leading-snug">
                Tiempo Activo
              </span>
            </Card>
          </motion.div>
        </div>

        {/* 2 Grid Columns for Status and Goals */}
        <div className="grid grid-cols-2 gap-3">
          {/* Target Bench Press goal */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 }}
            className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 text-left relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase block">
              Siguiente Objetivo
            </span>
            <h4 className="text-sm font-black text-white mt-0.5 leading-snug">
              {stats.nextGoal.exerciseName}
            </h4>
            <p className="text-2xl font-black text-[#BFFF00] mt-2">
              {stats.nextGoal.targetWeight} kg
            </p>
            <span className="text-[10px] font-bold text-white/40">
              +{stats.nextGoal.differenceVsPrev}kg vs anterior
            </span>
          </motion.div>

          {/* Muscle recovery state */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 }}
            className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 text-left relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-2">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase block">
              Estado Recuperación
            </span>
            <h4 className="text-sm font-black text-white mt-0.5 leading-snug">
              {stats.recoveryState.muscleName}
            </h4>
            <p className="text-2xl font-black text-white mt-2">
              {stats.recoveryState.state}
            </p>
            <span className="text-[10px] font-bold text-white/40">
              {stats.recoveryState.hoursRemaining}h descanso
            </span>
          </motion.div>
        </div>

        {/* RUTINA DE HOY Hero Banner */}
        {todayRoutine && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            onClick={() => onNavigateToRoutineTab()}
          >
          <Card className="group overflow-hidden relative">
            {/* Background image under black overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={todayRoutine.image}
                alt="Gym Routines Background"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
            </div>

            {/* Content overlay */}
            <div className="p-6 relative z-10 space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                  RUTINA RECOMENDADA
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                  {todayRoutine.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-white/70 font-medium mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-white/50" />
                    {todayRoutine.durationMin} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-white/50" />
                    {todayRoutine.difficulty}
                  </span>
                </div>
              </div>

              {/* Start Routine Pill Button */}
              <Button
                id="btn-iniciar-rutina-today"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartRoutine(todayRoutine.id);
                }}
                variant="primary"
                className="w-full justify-center text-sm"
              >
                <Play className="w-5 h-5 fill-current" />
                INICIAR RUTINA
              </Button>
            </div>
          </Card>
        </motion.div>
        )}
      </div>
    </div>
  );
}
