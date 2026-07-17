/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Flame, Trophy, Watch } from 'lucide-react';
import { motion } from 'motion/react';
import { ClientProfile } from '../types';
import { Card } from './ui';

interface AttendanceViewProps {
  client: ClientProfile;
}

export default function AttendanceView({ client }: AttendanceViewProps) {
  const { attendance } = client;

  // We'll show July 2026 by default, as the mock data is around July 2026.
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed (6 = July)

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Helper to get number of days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate calendar cells (blanks for padding + day numbers)
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push(i);
  }

  // Format helper to check if a day was checked in
  const isDateCheckedIn = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const targetDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    return attendance.records.some(r => r.date === targetDateStr);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Filter records for detailed listing
  const sortedRecords = [...attendance.records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
      {/* Streaks Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 gap-4"
      >
        <Card className="bg-[#111111]/80 border-white/5 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/15">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase block">Racha Actual</span>
            <span className="text-xl font-black text-white italic font-display">
              {attendance.currentStreak} días
            </span>
          </div>
        </Card>

        <Card className="bg-[#111111]/80 border-white/5 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/15">
            <Trophy className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase block">Mejor Racha</span>
            <span className="text-xl font-black text-white italic font-display">
              {attendance.bestStreak} días
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-[#111111]/90 border-white/5 p-5 rounded-3xl shadow-xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent)]" />
              <span>Días Asistidos</span>
            </h3>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-white min-w-[70px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/40 uppercase mb-2">
            <span>Dom</span>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {cells.map((cell, idx) => {
              if (cell === null) {
                return <div key={`empty-${idx}`} />;
              }

              const checked = isDateCheckedIn(cell);

              return (
                <div
                  key={`day-${cell}`}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all relative ${checked ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  {cell}
                  {checked && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white opacity-80" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats foot */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/60 px-1">
            <span>Días este mes:</span>
            <span className="text-[var(--accent)] font-bold">
              {attendance.records.filter(r => {
                const parts = r.date.split('-');
                return parseInt(parts[0]) === currentYear && parseInt(parts[1]) === currentMonth + 1;
              }).length} asistencias
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Attendance log details list */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">
          Historial de Visitas
        </h3>

        <div className="space-y-2">
          {sortedRecords.slice(0, 5).map((record, index) => (
            <motion.div
              key={record.date}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between bg-[#111111]/70 border border-white/5 px-4 py-3 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/60">
                  <Watch className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/90">{record.date}</p>
                  <p className="text-[10px] text-white/40">Check-in de Asistencia</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs font-bold text-white/80">
                  {record.checkinTime} - {record.checkoutTime || 'En curso'}
                </p>
                <p className="text-[9px] text-white/40">Duración simulada</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
