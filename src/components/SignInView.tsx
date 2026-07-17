/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, KeyRound, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button, Card, Input } from './ui';
import { CLIENTS_MOCK_DATA } from '../data';

interface SignInProps {
  onSignInSuccess: (clientCode: string) => void;
}

export default function SignInView({ onSignInSuccess }: SignInProps) {
  const [clientCode, setClientCode] = useState('NITRO-001');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCode.trim()) {
      setError('Por favor ingresa tu código de cliente.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      const codeUpper = clientCode.trim().toUpperCase();
      const clientExists = CLIENTS_MOCK_DATA.some(c => c.clientCode === codeUpper);

      setLoading(false);
      if (clientExists) {
        onSignInSuccess(codeUpper);
      } else {
        setError('Código inválido. Usá NITRO-001, NITRO-002 o NITRO-003.');
      }
    }, 700);
  };

  const handleSelectDemo = (code: string) => {
    setClientCode(code);
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex flex-col items-center justify-between px-6 py-12 font-sans overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[var(--accent)]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[var(--accent)]/5 blur-[130px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-6 w-full z-10"
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2 mt-2 uppercase font-display italic">
          NITRO <span className="text-[var(--accent)]">GYM</span>
        </h1>
        <p className="text-white/40 text-xs md:text-sm font-bold tracking-widest uppercase">
          Portal de Consulta para Clientes
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#111111] border-white/5 backdrop-blur-xl rounded-3xl p-8 my-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <KeyRound className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-white tracking-tight">Acceso Clientes</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 text-red-400 text-xs py-3 px-4 rounded-xl border border-red-500/20 font-semibold"
              >
                {error}
              </motion.div>
            )}

            <Input
              id="client-code-input"
              label="Ingresá tu Código de Cliente"
              type="text"
              value={clientCode}
              onChange={(e) => setClientCode(e.target.value)}
              placeholder="Ej: NITRO-001"
              icon={<Shield className="w-5 h-5 text-white/40" />}
              className="w-full"
              autoComplete="off"
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full justify-center py-4 mt-2 bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] font-black uppercase tracking-wider border-none rounded-2xl shadow-lg"
              loading={loading}
            >
              INGRESAR AL PORTAL
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-1.5 mb-3 text-white/40 text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Códigos de Prueba (Demo)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectDemo('NITRO-001')}
                className={`py-2 px-1 text-xs rounded-xl font-semibold border transition-all ${clientCode.toUpperCase() === 'NITRO-001' ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-white' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                NITRO-001
                <span className="block text-[8px] text-white/40 font-normal">Activa</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('NITRO-002')}
                className={`py-2 px-1 text-xs rounded-xl font-semibold border transition-all ${clientCode.toUpperCase() === 'NITRO-002' ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-white' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                NITRO-002
                <span className="block text-[8px] text-white/40 font-normal">Por vencer</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('NITRO-003')}
                className={`py-2 px-1 text-xs rounded-xl font-semibold border transition-all ${clientCode.toUpperCase() === 'NITRO-003' ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-white' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                NITRO-003
                <span className="block text-[8px] text-white/40 font-normal">Vencida</span>
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="w-full max-w-sm text-center z-10">
        <p className="text-[11px] leading-relaxed text-white/40 px-4">
          Si tenés dudas con tu código de acceso, consultá en la recepción de tu sucursal.
        </p>
      </div>
    </div>
  );
}
