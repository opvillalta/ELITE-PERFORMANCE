/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Dumbbell, BarChart2, User, Calendar } from 'lucide-react';
import { Button } from './ui';
import { useRef } from 'react';

interface FloatingNavProps {
  activeTab: 'home' | 'routine' | 'progress' | 'profile' | 'services';
  onTabChange: (tab: 'home' | 'routine' | 'progress' | 'profile' | 'services') => void;
}

export default function FloatingNav({ activeTab, onTabChange }: FloatingNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tabOrder: FloatingNavProps['activeTab'][] = ['home', 'routine', 'progress', 'services', 'profile'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const idx = tabOrder.indexOf(activeTab as any);
      if (idx === -1) return;
      const nextIdx = e.key === 'ArrowLeft' ? (idx - 1 + tabOrder.length) % tabOrder.length : (idx + 1) % tabOrder.length;
      onTabChange(tabOrder[nextIdx]);
      // focus the corresponding button if present
      const btnIdMap: Record<string, string> = {
        home: 'nav-btn-home',
        routine: 'nav-btn-routine',
        progress: 'nav-btn-progress',
        services: 'nav-btn-services',
        profile: 'nav-btn-profile'
      };
      const nextBtn = containerRef.current?.querySelector<HTMLButtonElement>(`#${btnIdMap[tabOrder[nextIdx]]}`);
      nextBtn?.focus();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40 select-none">
      <div ref={containerRef} onKeyDown={handleKeyDown} role="navigation" aria-label="Navegación principal" tabIndex={0} className="glass backdrop-blur-xl border border-white/10 rounded-full py-2.5 px-4 shadow-2xl flex items-center justify-between text-white/50 bg-slate-950/50">
        
        {/* HOME BUTTON */}
        <Button
          id="nav-btn-home"
          onClick={() => onTabChange('home')}
          variant={activeTab === 'home' ? 'secondary' : 'ghost'}
          size="sm"
          aria-pressed={activeTab === 'home'}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          aria-label="Ir a inicio"
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wide uppercase">Home</span>
        </Button>

        {/* RUTINA BUTTON */}
        <Button
          id="nav-btn-routine"
          onClick={() => onTabChange('routine')}
          variant={activeTab === 'routine' ? 'secondary' : 'ghost'}
          size="sm"
          aria-pressed={activeTab === 'routine'}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          aria-label="Ir a rutinas"
          aria-current={activeTab === 'routine' ? 'page' : undefined}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wide uppercase">Rutina</span>
        </Button>

        {/* PROGRESO BUTTON */}
        <Button
          id="nav-btn-progress"
          onClick={() => onTabChange('progress')}
          variant={activeTab === 'progress' ? 'secondary' : 'ghost'}
          size="sm"
          aria-pressed={activeTab === 'progress'}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          aria-label="Ir a progreso"
          aria-current={activeTab === 'progress' ? 'page' : undefined}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wide uppercase">Progreso</span>
        </Button>

        {/* SERVICIOS BUTTON */}
        <Button
          id="nav-btn-services"
          onClick={() => onTabChange('services')}
          variant={activeTab === 'services' ? 'secondary' : 'ghost'}
          size="sm"
          aria-pressed={activeTab === 'services'}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          aria-label="Ir a servicios"
          aria-current={activeTab === 'services' ? 'page' : undefined}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wide uppercase">Servicios</span>
        </Button>

        {/* PERFIL / USER BUTTON */}
        <Button
          id="nav-btn-profile"
          onClick={() => onTabChange('profile')}
          variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
          size="sm"
          aria-pressed={activeTab === 'profile'}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          aria-label="Ir a perfil"
          aria-current={activeTab === 'profile' ? 'page' : undefined}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wide uppercase">Perfil</span>
        </Button>

      </div>
    </div>
  );
}
