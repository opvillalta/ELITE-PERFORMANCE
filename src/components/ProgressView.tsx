/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Trophy, Dumbbell, Calendar, TrendingUp, Minus, Star, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui';
import { WorkoutLog, UserStats } from '../types';

interface ProgressViewProps {
  stats: UserStats;
  workoutLogs: WorkoutLog[];
  onResetLogs: () => void;
}

export default function ProgressView({ stats, workoutLogs, onResetLogs }: ProgressViewProps) {
  // Let's compute some values based on workout logs if available
  const totalLogs = workoutLogs.length;
  const totalVolumeSumKg = workoutLogs.reduce((acc, log) => acc + log.totalVolumeKg, 0);
  
  // Base total volume to 12.5 tons + newly logged session volumes
  const totalWeightTon = (12.5 + (totalVolumeSumKg / 1000)).toFixed(1);

  // Hardcode 1RM history entries but let them evolve based on workout logs if available
  const initialPRHistory = [
    { exercise: 'Bench Press', weight: 105, date: 'Hoy, 09:45 AM', status: '¡Subiste 5kg!', change: 'positive' },
    { exercise: 'Deadlift', weight: 180, date: 'Ayer, 18:20 PM', status: 'Estable', change: 'neutral' },
    { exercise: 'Overhead Press', weight: 65, date: '22 May, 07:00 AM', status: '¡Nuevo récord!', change: 'best' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-28 font-sans overflow-y-auto overflow-x-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      {/* Header */}
      <div className="px-6 pt-6 pb-2 text-left relative z-10">
        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Tu rendimiento actual</p>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase mt-1">
          PROGRESO GENERAL
        </h2>
      </div>

      <div className="px-5 space-y-4 relative z-10">
        {/* Core PR Card - PR SQUAT 145kg in screen 5 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1C1C1E] border-[#2C2C2E] rounded-3xl p-5 shadow-none relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="bg-white/5 border border-white/10 text-white/60 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
              PR SQUAT
            </span>
            <span className="bg-[#BFFF00]/10 text-[#BFFF00] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+5kg</span>
            </span>
          </div>

          <p className="text-6xl font-black text-white mt-3 tracking-tighter">
            145<span className="text-xl font-bold text-white/40 ml-1">kg</span>
          </p>

          {/* Simulated progress bars */}
          <div className="flex items-end justify-between gap-1.5 h-12 mt-6">
            <div className="flex-1 bg-white/5 h-5 rounded-md"></div>
            <div className="flex-1 bg-white/5 h-7 rounded-md"></div>
            <div className="flex-1 bg-white/5 h-6 rounded-md"></div>
            <div className="flex-1 bg-white/5 h-8 rounded-md"></div>
            <div className="flex-1 bg-white/5 h-7 rounded-md"></div>
            <div className="flex-1 bg-[#BFFF00] h-10 rounded-md shadow-lg shadow-[#BFFF00]/30"></div>
          </div>
        </motion.div>

        {/* Multi Metric Cards Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Peso Total card */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4.5 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-3">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
              Peso Total
            </span>
            <p className="text-2xl font-black text-white tracking-tight mt-0.5">
              {totalWeightTon} <span className="text-xs font-bold text-white/40">ton</span>
            </p>
            <span className="text-[10px] font-bold text-[#BFFF00] flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 12% esta sem.</span>
            </span>
          </motion.div>

          {/* Consistencia card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4.5 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
              Consistencia
            </span>
            <p className="text-2xl font-black text-white tracking-tight mt-0.5">
              24 <span className="text-xs font-bold text-white/40">días</span>
            </p>
            <span className="text-[10px] font-black text-[#BFFF00] block mt-1.5 uppercase tracking-widest animate-pulse font-mono">
              ¡Nuevo récord!
            </span>
          </motion.div>
        </div>

        {/* Historial 1RM Section List */}
        <div className="pt-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[17px] font-black text-white uppercase tracking-tight">
              Historial 1RM
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('¿Desea restablecer el historial acumulado en esta demostración?')) {
                  onResetLogs();
                }
              }}
              className="text-[10px] text-white/40 hover:text-white font-bold uppercase tracking-wider transition-colors"
            >
              Resetear Historial
            </Button>
          </div>

          <div className="space-y-3">
            {initialPRHistory.map((pr, index) => (
              <motion.div
                key={pr.exercise}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-[16px] font-black text-white tracking-tight leading-none">
                      {pr.exercise}
                    </h4>
                    <span className="text-[11px] text-white/40 font-medium block">
                      {pr.date}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-[17px] font-black text-white leading-none">
                    {pr.weight} <span className="text-xs font-bold text-white/40">kg</span>
                  </p>
                  
                  {/* Performance Indicators */}
                  {pr.change === 'positive' && (
                    <span className="text-[9px] bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-[#BFFF00] font-black px-2 py-0.5 rounded-full uppercase tracking-wider block text-center max-w-fit ml-auto">
                      {pr.status}
                    </span>
                  )}
                  {pr.change === 'neutral' && (
                    <span className="text-[9px] bg-white/5 border border-white/10 text-white/60 font-black px-2 py-0.5 rounded-full uppercase tracking-wider block text-center max-w-fit ml-auto">
                      {pr.status}
                    </span>
                  )}
                  {pr.change === 'best' && (
                    <span className="text-[9px] bg-[#BFFF00]/20 border border-[#BFFF00]/30 text-[#BFFF00] font-black px-2 py-0.5 rounded-full uppercase tracking-wider block text-center max-w-fit ml-auto flex items-center gap-0.5 animate-pulse">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{pr.status}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Golden Trophy Motivation Card bottom identical to screenshot 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl bg-[#1C1C1E] border-[#2C2C2E] p-5 mt-6 relative overflow-hidden"
        >
          {/* Watermark fitness pattern */}
          <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12">
            <Dumbbell className="w-32 h-32" />
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#BFFF00] flex items-center justify-center text-black flex-shrink-0 shadow-lg shadow-[#BFFF00]/35">
              <Trophy className="w-6 h-6 fill-current" />
            </div>
            <div className="text-left space-y-1">
              <h4 className="text-lg font-black text-[#BFFF00] leading-tight">
                ¡Hiciste historia esta semana!
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Has superado 3 de tus mejores marcas personales en los últimos 7 días. Sigue así, el Olimpo te espera.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Workout History log counter */}
        {workoutLogs.length > 0 && (
          <div className="pt-2 text-left space-y-2">
            <span className="text-xs font-extrabold uppercase text-white/50 tracking-wider">
              Sesiones guardadas ({totalLogs})
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {workoutLogs.map((log) => (
                <div key={log.id} className="bg-[#1C1C1E] border border-white/5 p-3.5 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-white text-[13px]">{log.routineName}</span>
                    <span className="text-white/40 font-normal">{log.dateString}</span>
                  </div>
                  <div className="flex justify-between pr-1 text-[11px] text-white/60">
                    <span>{log.durationMin} min • {log.calories} cal</span>
                    <span className="text-[#BFFF00] font-bold">Vol: {log.totalVolumeKg.toLocaleString()} kg</span>
                  </div>
                  <p className="text-[10px] text-white/40 truncate">
                    {log.exercisesSummary.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
