/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClientProfile } from './types';

export const CLIENTS_MOCK_DATA: ClientProfile[] = [
  {
    clientCode: 'NITRO-001',
    name: 'Juan',
    lastName: 'Pérez',
    phone: '+595 981 123456',
    avatarInitials: 'JP',
    membership: {
      id: 'memb-101',
      type: 'Mensual', // Periodic type
      status: 'Activa',
      startDate: '2026-07-10',
      endDate: '2026-08-10',
      nextPaymentDate: '2026-08-10',
      nextPaymentAmount: 200000, // Musculacion + Cardio (200,000 Gs.)
      daysRemaining: 25
    },
    payments: [
      {
        id: 'pay-001',
        date: '2026-07-10',
        amount: 200000,
        method: 'Tarjeta',
        status: 'Pagado',
        period: 'Julio - Agosto 2026',
        receiptId: 'REC-2026-0710'
      },
      {
        id: 'pay-002',
        date: '2026-06-10',
        amount: 200000,
        method: 'Efectivo',
        status: 'Pagado',
        period: 'Junio - Julio 2026',
        receiptId: 'REC-2026-0610'
      },
      {
        id: 'pay-003',
        date: '2026-05-10',
        amount: 200000,
        method: 'Transferencia',
        status: 'Pagado',
        period: 'Mayo - Junio 2026',
        receiptId: 'REC-2026-0510'
      }
    ],
    attendance: {
      totalDaysThisMonth: 8,
      totalDaysAllTime: 42,
      currentStreak: 4,
      bestStreak: 7,
      records: [
        { date: '2026-07-16', checkinTime: '07:15', checkoutTime: '08:45' },
        { date: '2026-07-15', checkinTime: '07:20', checkoutTime: '08:30' },
        { date: '2026-07-14', checkinTime: '07:10', checkoutTime: '08:50' },
        { date: '2026-07-13', checkinTime: '07:05', checkoutTime: '08:20' },
        { date: '2026-07-10', checkinTime: '07:30', checkoutTime: '09:00' },
        { date: '2026-07-08', checkinTime: '07:12', checkoutTime: '08:40' },
        { date: '2026-07-06', checkinTime: '07:00', checkoutTime: '08:30' },
        { date: '2026-07-03', checkinTime: '07:15', checkoutTime: '08:55' },
        // Junio
        { date: '2026-06-29', checkinTime: '07:10', checkoutTime: '08:30' },
        { date: '2026-06-26', checkinTime: '07:22', checkoutTime: '08:45' },
        { date: '2026-06-24', checkinTime: '07:05', checkoutTime: '08:20' },
        { date: '2026-06-22', checkinTime: '07:15', checkoutTime: '08:50' },
        { date: '2026-06-19', checkinTime: '07:30', checkoutTime: '09:05' }
      ]
    },
    measurements: [
      {
        id: 'meas-003',
        date: '2026-07-15',
        weight: 78.5,
        height: 178,
        bodyFat: 14.8,
        chest: 104,
        waist: 82,
        hips: 96,
        arms: 38,
        thighs: 56
      },
      {
        id: 'meas-002',
        date: '2026-06-15',
        weight: 79.8,
        height: 178,
        bodyFat: 15.6,
        chest: 103,
        waist: 84,
        hips: 97,
        arms: 37.5,
        thighs: 56.5
      },
      {
        id: 'meas-001',
        date: '2026-05-15',
        weight: 81.2,
        height: 178,
        bodyFat: 16.8,
        chest: 101,
        waist: 86,
        hips: 99,
        arms: 37,
        thighs: 57
      }
    ]
  },
  {
    clientCode: 'NITRO-002',
    name: 'María',
    lastName: 'García',
    phone: '+595 981 654321',
    avatarInitials: 'MG',
    membership: {
      id: 'memb-102',
      type: 'Mensual',
      status: 'Por vencer',
      startDate: '2026-06-18',
      endDate: '2026-07-18',
      nextPaymentDate: '2026-07-18',
      nextPaymentAmount: 200000, // Entrenamiento Funcional (200,000 Gs.)
      daysRemaining: 2
    },
    payments: [
      {
        id: 'pay-004',
        date: '2026-06-18',
        amount: 200000,
        method: 'Tarjeta',
        status: 'Pagado',
        period: 'Junio - Julio 2026',
        receiptId: 'REC-2026-0618'
      }
    ],
    attendance: {
      totalDaysThisMonth: 5,
      totalDaysAllTime: 28,
      currentStreak: 0,
      bestStreak: 5,
      records: [
        { date: '2026-07-14', checkinTime: '18:30', checkoutTime: '19:45' },
        { date: '2026-07-12', checkinTime: '18:15', checkoutTime: '19:30' },
        { date: '2026-07-09', checkinTime: '18:40', checkoutTime: '19:50' },
        { date: '2026-07-07', checkinTime: '18:00', checkoutTime: '19:15' },
        { date: '2026-07-02', checkinTime: '18:25', checkoutTime: '19:40' },
        // Junio
        { date: '2026-06-28', checkinTime: '18:30', checkoutTime: '19:45' },
        { date: '2026-06-25', checkinTime: '18:15', checkoutTime: '19:30' }
      ]
    },
    measurements: [
      {
        id: 'meas-004',
        date: '2026-07-01',
        weight: 62.1,
        height: 165,
        bodyFat: 21.2,
        chest: 92,
        waist: 68,
        hips: 94,
        arms: 28.5,
        thighs: 52
      },
      {
        id: 'meas-005',
        date: '2026-05-02',
        weight: 63.5,
        height: 165,
        bodyFat: 22.8,
        chest: 90,
        waist: 70,
        hips: 95,
        arms: 28.0,
        thighs: 53
      }
    ]
  },
  {
    clientCode: 'NITRO-003',
    name: 'Carlos',
    lastName: 'Ruiz',
    phone: '+595 981 987654',
    avatarInitials: 'CR',
    membership: {
      id: 'memb-100',
      type: 'Mensual',
      status: 'Vencida',
      startDate: '2026-05-30',
      endDate: '2026-06-30',
      nextPaymentDate: '2026-06-30',
      nextPaymentAmount: 150000, // Plan Basico (150,000 Gs.)
      daysRemaining: 0
    },
    payments: [
      {
        id: 'pay-005',
        date: '2026-05-30',
        amount: 150000,
        method: 'Transferencia',
        status: 'Pagado',
        period: 'Mayo - Junio 2026',
        receiptId: 'REC-2026-0530'
      }
    ],
    attendance: {
      totalDaysThisMonth: 0,
      totalDaysAllTime: 110,
      currentStreak: 0,
      bestStreak: 12,
      records: [
        { date: '2026-06-28', checkinTime: '06:00', checkoutTime: '07:30' },
        { date: '2026-06-25', checkinTime: '06:15', checkoutTime: '07:45' },
        { date: '2026-06-23', checkinTime: '06:00', checkoutTime: '07:15' },
        { date: '2026-06-21', checkinTime: '06:05', checkoutTime: '07:30' }
      ]
    },
    measurements: [
      {
        id: 'meas-006',
        date: '2026-06-15',
        weight: 85.0,
        height: 182,
        bodyFat: 18.5,
        chest: 108,
        waist: 88,
        hips: 102,
        arms: 40.5,
        thighs: 58
      }
    ]
  }
];

export const MEMBERSHIP_CATALOG = [
  { id: 100, name: 'Plan Basico', price: 150000 },
  { id: 101, name: 'Musculacion + Cardio', price: 200000 },
  { id: 102, name: 'Entrenamiento Funcional', price: 200000 },
  { id: 103, name: 'Rehabilitacion', price: 300000 },
  { id: 104, name: 'Funcional Kids', price: 300000 },
  { id: 105, name: 'Musculacion Dia', price: 20000 },
  { id: 106, name: 'Musculacion + Cardio Dia', price: 25000 },
  { id: 107, name: 'Gratis', price: 0 },
  { id: 108, name: 'Familiar', price: 130000 },
  { id: 109, name: 'funcional KIDS II', price: 200000 },
  { id: 110, name: 'Zumba Fitness', price: 25000 },
  { id: 111, name: 'Zumba Fitness Promo', price: 20000 },
  { id: 112, name: 'Plan cooperativo', price: 180000 }
];
