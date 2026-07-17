/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle2, AlertTriangle, Receipt } from 'lucide-react';
import { motion } from 'motion/react';
import { ClientProfile, Payment } from '../types';
import { Card } from './ui';

interface PaymentHistoryViewProps {
  client: ClientProfile;
}

export default function PaymentHistoryView({ client }: PaymentHistoryViewProps) {
  const { payments } = client;

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'Pagado':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Pagado</span>
          </span>
        );
      case 'Pendiente':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            <span>Pendiente</span>
          </span>
        );
      case 'Vencido':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            <span>Vencido</span>
          </span>
        );
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'Pagado')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
      {/* Background glow */}
      <div className="relative">
        <div className="mesh-gradient gradient-dark-orange" />
      </div>

      {/* Payment Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-[#111111] to-[#161616] border-white/5 p-5 rounded-3xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/15">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                Historial de Transacciones
              </span>
              <span className="text-sm font-semibold text-white/80">
                {payments.length} Facturas registradas
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-white/40 uppercase block">Total Abonado</span>
            <span className="text-xl font-black text-white italic font-display">
              ${totalPaid.toFixed(2)}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Payment History List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">
          Últimos Pagos
        </h3>

        <div className="space-y-3">
          {payments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-[#111111]/90 border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    {/* Icon matching payment method */}
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 border border-white/5">
                      <Receipt className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white leading-tight">
                          NITRO {client.membership.type}
                        </span>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-[11px] text-white/40 font-medium">
                        Periodo: {payment.period}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
                        <span>Ref: {payment.receiptId || payment.id}</span>
                        <span>•</span>
                        <span>{payment.method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="text-base font-black text-white leading-none">
                      ${payment.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-white/40 block">
                      {payment.date}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
