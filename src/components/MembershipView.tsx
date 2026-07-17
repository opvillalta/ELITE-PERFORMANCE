/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Calendar, CreditCard, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ClientProfile } from '../types';
import { Card } from './ui';
import { MEMBERSHIP_CATALOG } from '../data';

interface MembershipViewProps {
  client: ClientProfile;
}

export default function MembershipView({ client }: MembershipViewProps) {
  const { membership } = client;

  // Find plan details from catalog
  const planId = parseInt(membership.id.split('-')[1]) || 100;
  const plan = MEMBERSHIP_CATALOG.find(p => p.id === planId);
  const planName = plan ? plan.name : 'Plan Básico';

  // Format currency helper
  const formatGuarani = (amount: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Status mapping
  const statusConfig = {
    'Activa': {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: ShieldCheck,
      text: 'Membresía Activa'
    },
    'Por vencer': {
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: ShieldAlert,
      text: 'Vence Pronto'
    },
    'Vencida': {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: ShieldX,
      text: 'Membresía Vencida'
    },
    'Suspendida': {
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20',
      icon: ShieldX,
      text: 'Membresía Suspendida'
    }
  };

  const currentStatus = statusConfig[membership.status] || statusConfig['Activa'];
  const StatusIcon = currentStatus.icon;

  // Days remaining percentage logic (max 30 days for month base)
  const maxDays = membership.type === 'Mensual' ? 30 : membership.type === 'Trimestral' ? 90 : membership.type === 'Semestral' ? 180 : 365;
  const pctRemaining = Math.max(0, Math.min(100, (membership.daysRemaining / maxDays) * 100));

  // Circular progress SVG values
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pctRemaining / 100) * circumference;

  const handleRenewClick = () => {
    const message = `Hola NitroGym! Deseo renovar mi membresía de ${planName} (${membership.type}). Mi código es ${client.clientCode}.`;
    const whatsappUrl = `https://wa.me/50688888888?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
      {/* Background gradients */}
      <div className="relative">
        <div className="mesh-gradient gradient-orange" />
      </div>

      {/* Main Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-[#111111]/80 border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="max-w-[65%]">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                Plan Actual
              </span>
              <h2 className="text-2xl font-black text-white italic tracking-tight font-display mb-1 leading-tight">
                {planName.toUpperCase()}
              </h2>
              <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider block">
                Frecuencia: {membership.type}
              </span>
            </div>
            
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold whitespace-nowrap ${currentStatus.color} ${currentStatus.bgColor} ${currentStatus.borderColor}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{currentStatus.text}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide block">
                  Fecha de Inicio
                </span>
                <p className="text-sm font-semibold text-white/80">{membership.startDate}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide block">
                  Fecha de Vencimiento
                </span>
                <p className="text-sm font-semibold text-white/80">{membership.endDate}</p>
              </div>
            </div>

            {/* Circular Progress Days Remaining */}
            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="rgba(255,255,255,0.05)"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="var(--accent)"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="rotate-[-90deg] origin-center transition-all duration-300"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white leading-none">
                  {membership.daysRemaining}
                </span>
                <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider mt-0.5">
                  Días
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next Payment Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-[#111111]/80 border-white/5 backdrop-blur-xl rounded-3xl p-5 shadow-lg">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[var(--accent)]" />
            <span>Detalles del Próximo Pago</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide block mb-1">
                Fecha Límite
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-white/60" />
                <span className="text-sm font-bold text-white/90">
                  {membership.nextPaymentDate}
                </span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide block mb-1">
                Monto Sugerido
              </span>
              <p className="text-lg font-black text-white italic font-bebas">
                {formatGuarani(membership.nextPaymentAmount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions (WhatsApp Renewal) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        <button
          onClick={handleRenewClick}
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[var(--accent)]/15 border-none"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Renovar / Consultar por WhatsApp</span>
        </button>

        <p className="text-[10px] text-center text-white/40 leading-relaxed px-6">
          Recordá que podés abonar tu cuota en efectivo, tarjeta o transferencia bancaria en la recepción de tu sucursal.
        </p>
      </motion.div>
    </div>
  );
}
