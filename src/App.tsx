/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CLIENTS_MOCK_DATA } from './data';
import { ClientProfile } from './types';
import SignInView from './components/SignInView';
import ClientHeader from './components/ClientHeader';
import BottomNav, { PortalTab } from './components/BottomNav';
import MembershipView from './components/MembershipView';
import PaymentHistoryView from './components/PaymentHistoryView';
import AttendanceView from './components/AttendanceView';
import MeasurementsView from './components/MeasurementsView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [clientCode, setClientCode] = useState<string>(() => {
    return localStorage.getItem('gym_client_code') || '';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('gym_logged_in') === 'true';
  });

  const [activeTab, setActiveTab] = useState<PortalTab>('membership');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gym_client_code', clientCode);
    localStorage.setItem('gym_logged_in', isLoggedIn ? 'true' : 'false');
  }, [clientCode, isLoggedIn]);

  const handleSignInSuccess = (code: string) => {
    setClientCode(code);
    setIsLoggedIn(true);
    setActiveTab('membership');
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      setIsLoggedIn(false);
      setClientCode('');
      localStorage.removeItem('gym_client_code');
      localStorage.removeItem('gym_logged_in');
    }
  };

  // Auth routing fallback
  if (!isLoggedIn) {
    return <SignInView onSignInSuccess={handleSignInSuccess} />;
  }

  // Find active client profile
  const currentClient = CLIENTS_MOCK_DATA.find(
    c => c.clientCode === clientCode.toUpperCase()
  ) || CLIENTS_MOCK_DATA[0]; // fallback to first just in case

  return (
    <div className="min-h-screen bg-[#070707] flex flex-col justify-between select-none overflow-x-hidden text-white font-sans">
      {/* Header */}
      <ClientHeader client={currentClient} onLogout={handleLogout} />
      
      {/* View routing */}
      <main className="flex-1 overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'membership' && (
            <motion.div
              key="membership"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MembershipView client={currentClient} />
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <PaymentHistoryView client={currentClient} />
            </motion.div>
          )}

          {activeTab === 'attendance' && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <AttendanceView client={currentClient} />
            </motion.div>
          )}

          {activeTab === 'measurements' && (
            <motion.div
              key="measurements"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MeasurementsView client={currentClient} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Capsule Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
