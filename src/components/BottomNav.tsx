/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, CreditCard, Calendar, Ruler } from 'lucide-react';
import { motion } from 'motion/react';

export type PortalTab = 'membership' | 'payments' | 'attendance' | 'measurements';

interface BottomNavProps {
  activeTab: PortalTab;
  onTabChange: (tab: PortalTab) => void;
}

interface NavItem {
  id: PortalTab;
  label: string;
  icon: React.ComponentType<any>;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const items: NavItem[] = [
    { id: 'membership', label: 'Membresía', icon: User },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'attendance', label: 'Asistencia', icon: Calendar },
    { id: 'measurements', label: 'Medidas', icon: Ruler },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-[#111111]/90 border border-white/5 backdrop-blur-xl rounded-2xl px-3 py-2 flex items-center justify-between shadow-2xl pointer-events-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex-1 flex flex-col items-center gap-1.5 py-1.5 transition-all text-white/50 hover:text-white"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[var(--accent)]/10 border-t-2 border-[var(--accent)] rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'text-[var(--accent)] scale-110' : 'text-white/60'}`} />
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
