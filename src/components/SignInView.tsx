/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { motion } from 'motion/react';
import { Button, Card, Input } from './ui';

interface SignInProps {
  onSignInSuccess: (email: string) => void;
}

export default function SignInView({ onSignInSuccess }: SignInProps) {
  const [email, setEmail] = useState('nombre@ejemplo.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onSignInSuccess(email);
    }, 850);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignInSuccess('google.user@gmail.com');
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-between px-6 py-12 font-sans overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4FF00]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4FF00]/5 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-6 w-full z-10"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 mt-2 uppercase">
          ELITE PERFORMANCE
        </h1>
        <p className="text-white/50 text-sm md:text-base font-normal tracking-wide">
          Unlock your true potential today.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#121212] border-white/5 backdrop-blur-xl rounded-3xl p-8 my-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-left tracking-tight">Sign In</h2>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="secondary"
            size="lg"
            className="w-full justify-center gap-3 text-[15px] py-4 mb-5 bg-white text-black hover:bg-gray-100 border-none"
          >
            <Chrome className="w-5 h-5" />
            Continuar con Google
          </Button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-[10px] text-white/40 font-bold tracking-widest uppercase">O CON CORREO</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 text-red-300 text-xs py-2 px-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <Input
              id="sign-in-email"
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white/70">Contraseña</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => alert('Recuperación de contraseña simulada: Reestablece tu clave.')}
                  className="text-xs text-[#BFFF00] hover:text-[#A8E600] font-bold transition-colors"
                >
                  ¿Olvidaste?
                </Button>
              </div>
              <Input
                id="sign-in-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5 text-white/40" />}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center py-4 mt-2 bg-[#BFFF00] text-black hover:bg-[#A8E600] font-black uppercase tracking-wider border-none">
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
              ) : (
                'INGRESAR'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50 font-normal">
            ¿No tienes cuenta?{' '}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[#BFFF00] hover:text-[#A8E600] font-bold"
              onClick={() => {
                setEmail('admin.gym@elite.com');
                setPassword('gym123');
                alert('Cuenta de demostración automática cargada. ¡Usa Ingresar!');
              }}
            >
              Regístrate gratis
            </Button>
          </div>
        </Card>
      </motion.div>

      <div className="w-full max-w-sm text-center z-10">
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex flex-col items-center gap-1.5">
            <Button type="button" variant="ghost" size="sm" className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white hover:bg-white/10 border border-white/10">
              <span className="text-[10px] font-bold">iOS</span>
            </Button>
            <span className="text-xs text-white/60 font-medium">Apple</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Button type="button" variant="ghost" size="sm" className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white hover:bg-white/10 border border-white/10">
              <span className="text-lg font-bold text-[#BFFF00]">f</span>
            </Button>
            <span className="text-xs text-white/60 font-medium">Facebook</span>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-white/40 px-4">
          Al continuar, aceptas nuestros{' '}
          <span className="underline hover:text-white/60 cursor-pointer">Términos de Servicio</span> y{' '}
          <span className="underline hover:text-white/60 cursor-pointer">Política de Privacidad</span>.
        </p>
      </div>
    </div>
  );
}
