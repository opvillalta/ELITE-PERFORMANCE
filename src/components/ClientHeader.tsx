/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogOut } from 'lucide-react';
import { ClientProfile } from '../types';

interface ClientHeaderProps {
  client: ClientProfile;
  onLogout: () => void;
}

export default function ClientHeader({ client, onLogout }: ClientHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#070707]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo Icon and Text */}
        <div className="flex flex-col">
          <span className="text-2xl font-black italic tracking-tighter uppercase font-display leading-none text-white">
            NITRO<span className="text-[var(--accent)]">GYM</span>
          </span>
          <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">
            CLIENT PORTAL
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Card */}
        <div className="flex items-center gap-2.5 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-tight">
              {client.name} {client.lastName}
            </span>
            <span className="text-[10px] font-mono text-[var(--accent)] font-semibold uppercase">
              {client.clientCode}
            </span>
          </div>
          
          {/* Avatar Bubble */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-strong)] to-[var(--accent)] flex items-center justify-center text-white font-black text-xs shadow-md shadow-[var(--accent)]/15">
            {client.avatarInitials}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 border border-white/5 hover:border-red-500/15 transition-all duration-200"
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
