/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, LogOut, Heart, Trophy, Shield, Dumbbell, Award, Flame, RefreshCw, Moon, Sun } from 'lucide-react';
import { Button } from './ui';
import { UserStats } from '../types';
import { useTheme } from '../theme';

interface ProfileViewProps {
  stats: UserStats;
  email: string;
  onLogout: () => void;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onResetAllData: () => void;
}

export default function ProfileView({ stats, email, onLogout, onUpdateStats, onResetAllData }: ProfileViewProps) {
  const { theme, toggleTheme } = useTheme();

  const handleBoostStreak = () => {
    onUpdateStats({
      currentStreakDays: stats.currentStreakDays + 1
    });
  };

  const handleLevelUp = () => {
    onUpdateStats({
      currentLevel: stats.currentLevel + 1,
      currentExperienceProgressPercent: Math.min(100, stats.currentExperienceProgressPercent + 10)
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-28 font-sans overflow-y-auto overflow-x-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      {/* Header */}
      <div className="px-6 pt-6 pb-2 text-left relative z-10">
        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Ajustes & Cuenta</span>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase mt-1">
          MI PERFIL
        </h2>
      </div>

      <div className="px-5 space-y-5 text-left relative z-10">
        {/* Profile Card Summary */}
        <div className="bg-[#1C1C1E] border-[#2C2C2E] rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <img
              src={stats.avatar}
              alt="Avatar Profile"
              className="w-16 h-16 rounded-full border-2 border-[#BFFF00] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-1.5 leading-tight">
                {stats.name}
                <span className="bg-[#BFFF00]/10 text-[#BFFF00] text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-[#BFFF00]/20">
                  Nivel {stats.currentLevel}
                </span>
              </h3>
              <p className="text-xs text-white/40 font-medium">{email}</p>
              <p className="text-xs text-white/60 font-semibold">{stats.recoveryState.muscleName} • Recuperación Listo</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs text-white/40 font-bold uppercase tracking-wider">
              <span>EXP de Nivel</span>
              <span>{stats.currentExperienceProgressPercent}%</span>
            </div>
            {/* XP bar */}
            <div className="w-full bg-black/20 h-2 rounded-full mt-2 overflow-hidden border border-white/10">
              <div 
                className="bg-[#BFFF00] h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.currentExperienceProgressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Theme switcher */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase tracking-widest text-white/40 block px-1">
            Tema de la aplicación
          </span>

          <div className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Modo de color</p>
                <p className="text-sm font-black text-white">{theme === 'dark' ? 'Oscuro' : 'Claro'}</p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Claro' : 'Oscuro'}
              </Button>
            </div>
          </div>
        </div>

        {/* Demo Simulator Boost Actions */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase tracking-widest text-white/40 block px-1">
            Simulador de Rendimiento
          </span>

          <div className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl p-4 space-y-3">
            <p className="text-xs text-white/40 leading-snug">
              Utiliza estas herramientas para simular tu fuerza, subir de rango o reiniciar tu progreso inmediatamente:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBoostStreak}
                className="bg-white/5 hover:bg-white/10 text-xs font-black py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-white/60 border border-white/10"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>+1 Racha Día</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleLevelUp}
                className="bg-white/5 hover:bg-white/10 text-xs font-black py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-white/60 border border-white/10"
              >
                <Award className="w-4 h-4" />
                <span>+EXP Rango</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Accountability guidelines lists */}
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-white/40 block px-1 mb-2">
            Membresía & Soporte
          </span>

          <div className="bg-[#1C1C1E] border-[#2C2C2E] rounded-2xl divide-y divide-white/10 overflow-hidden text-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-white/60" />
                <span className="font-black text-white">Plan Elite Mensual</span>
              </div>
              <span className="text-xs text-[#BFFF00] font-black uppercase">ACTIVO</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-white/40" />
                <span className="font-black text-white">Logros del Perfil</span>
              </div>
              <span className="text-xs text-white/40 font-bold">12 Desbloqueados</span>
            </div>
          </div>
        </div>

        {/* Hard Logout / Reset Actions */}
        <div className="space-y-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm('¿Desea borrar todo el progreso local y regresar a configuraciones iniciales de fábrica?')) {
                onResetAllData();
              }
            }}
            className="w-full bg-white/5 hover:bg-white/10 text-white/80 font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-white/10"
          >
            <RefreshCw className="w-4 h-4 text-white/40" />
            <span>Restablecer Datos de Demostración</span>
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogout}
            className="w-full border border-red-900/30 hover:bg-red-950/40 text-red-400 font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
