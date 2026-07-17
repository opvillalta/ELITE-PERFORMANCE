/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ruler, Sparkles, TrendingDown, TrendingUp, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClientProfile, BodyMeasurement } from '../types';
import { Card } from './ui';

interface MeasurementsViewProps {
  client: ClientProfile;
}

export default function MeasurementsView({ client }: MeasurementsViewProps) {
  const { measurements } = client;
  const [expandedId, setExpandedId] = useState<string | null>(
    measurements.length > 0 ? measurements[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Helper to calculate difference between a measurement and the next chronologically older one
  const getDelta = (current: BodyMeasurement, index: number, key: keyof Omit<BodyMeasurement, 'id' | 'date'>) => {
    // Since measurements are sorted newest first, the chronologically older one is at index + 1
    const older = measurements[index + 1];
    if (!older || current[key] === undefined || older[key] === undefined) return null;

    const diff = (current[key] as number) - (older[key] as number);
    if (diff === 0) return { text: '0', type: 'neutral' };
    
    // For weight/fat, down is usually good (green), for muscle/chest up is good, but let's keep it simple: green for down, orange/red for up, or vice versa depending on common goals.
    // Let's use simple colors: green for weight/fat loss, red/orange for weight/fat gain, and blue/neutral for muscle.
    let isGood = diff < 0; // weight loss is good by default
    if (key === 'chest' || key === 'arms') {
      isGood = diff > 0; // muscle gain is good
    }

    const sign = diff > 0 ? '+' : '';
    const formatted = `${sign}${diff.toFixed(1)}`;

    return {
      text: formatted,
      isPositive: diff > 0,
      color: isGood ? 'text-green-500 bg-green-500/10' : 'text-red-400 bg-red-400/10'
    };
  };

  // Latest measurements block summary
  const latest = measurements[0];

  return (
    <div className="w-full max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
      {/* Background glow */}
      <div className="relative">
        <div className="mesh-gradient gradient-orange" />
      </div>

      {/* Latest Stats summary card */}
      {latest && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-[#111111] to-[#161616] border border-white/5 p-5 rounded-3xl shadow-lg relative overflow-hidden">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Último Reporte</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-white/5 rounded-2xl py-3 border border-white/5">
                <span className="text-[10px] text-white/40 font-bold block mb-1">PESO</span>
                <span className="text-lg font-black text-white italic font-bebas tracking-tight">
                  {latest.weight} kg
                </span>
                {getDelta(latest, 0, 'weight') && (
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1.5 ${getDelta(latest, 0, 'weight')?.color}`}>
                    {getDelta(latest, 0, 'weight')?.text}
                  </span>
                )}
              </div>

              <div className="text-center bg-white/5 rounded-2xl py-3 border border-white/5">
                <span className="text-[10px] text-white/40 font-bold block mb-1">GRASA</span>
                <span className="text-lg font-black text-white italic font-bebas tracking-tight">
                  {latest.bodyFat}%
                </span>
                {getDelta(latest, 0, 'bodyFat') && (
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1.5 ${getDelta(latest, 0, 'bodyFat')?.color}`}>
                    {getDelta(latest, 0, 'bodyFat')?.text}
                  </span>
                )}
              </div>

              <div className="text-center bg-white/5 rounded-2xl py-3 border border-white/5">
                <span className="text-[10px] text-white/40 font-bold block mb-1">ALTURA</span>
                <span className="text-lg font-black text-white italic font-bebas tracking-tight">
                  {latest.height} cm
                </span>
                <span className="block text-[8px] text-white/30 font-medium mt-2">Fijo</span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* History timeline list */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">
          Evolución de Medidas
        </h3>

        {measurements.length === 0 ? (
          <p className="text-sm text-white/40 text-center py-6">No hay registros de medidas disponibles.</p>
        ) : (
          <div className="space-y-3">
            {measurements.map((m, idx) => {
              const isExpanded = expandedId === m.id;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Card className="bg-[#111111]/90 border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleExpand(m.id)}
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/15">
                          <Ruler className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">
                            Control Corporal
                          </p>
                          <p className="text-[10px] text-white/40 font-semibold flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-white/30" />
                            <span>{m.date}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-sm font-black text-white italic font-bebas">
                            {m.weight} kg
                          </span>
                          <span className="text-[10px] text-white/40 block">Grasa: {m.bodyFat}%</span>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-white/60" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/60" />
                        )}
                      </div>
                    </button>

                    {/* Detailed list expansion */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-white/5 bg-black/20"
                        >
                          <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-white/40 text-xs font-semibold">Pecho:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white/90">{m.chest || '--'} cm</span>
                                {getDelta(m, idx, 'chest') && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getDelta(m, idx, 'chest')?.color}`}>
                                    {getDelta(m, idx, 'chest')?.text}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-white/40 text-xs font-semibold">Cintura:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white/90">{m.waist || '--'} cm</span>
                                {getDelta(m, idx, 'waist') && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getDelta(m, idx, 'waist')?.color}`}>
                                    {getDelta(m, idx, 'waist')?.text}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-white/40 text-xs font-semibold">Cadera:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white/90">{m.hips || '--'} cm</span>
                                {getDelta(m, idx, 'hips') && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getDelta(m, idx, 'hips')?.color}`}>
                                    {getDelta(m, idx, 'hips')?.text}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-white/40 text-xs font-semibold">Brazos:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white/90">{m.arms || '--'} cm</span>
                                {getDelta(m, idx, 'arms') && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getDelta(m, idx, 'arms')?.color}`}>
                                    {getDelta(m, idx, 'arms')?.text}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-white/40 text-xs font-semibold">Muslos:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white/90">{m.thighs || '--'} cm</span>
                                {getDelta(m, idx, 'thighs') && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getDelta(m, idx, 'thighs')?.color}`}>
                                    {getDelta(m, idx, 'thighs')?.text}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
