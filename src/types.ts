/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Membership {
  id: string;
  type: 'Mensual' | 'Trimestral' | 'Semestral' | 'Anual';
  status: 'Activa' | 'Vencida' | 'Suspendida' | 'Por vencer';
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  daysRemaining: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  status: 'Pagado' | 'Pendiente' | 'Vencido';
  period: string; // e.g. "Julio 2025"
  receiptId?: string;
}

export interface AttendanceRecord {
  date: string;       // ISO date YYYY-MM-DD
  checkinTime?: string;
  checkoutTime?: string;
}

export interface AttendanceSummary {
  totalDaysThisMonth: number;
  totalDaysAllTime: number;
  currentStreak: number;
  bestStreak: number;
  records: AttendanceRecord[];
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight?: number;     // kg
  height?: number;     // cm
  bodyFat?: number;    // %
  chest?: number;      // cm
  waist?: number;      // cm
  hips?: number;       // cm
  arms?: number;       // cm
  thighs?: number;     // cm
}

export interface ClientProfile {
  clientCode: string;  // login key (e.g. NITRO-001)
  name: string;
  lastName: string;
  phone?: string;
  avatarInitials: string;
  membership: Membership;
  payments: Payment[];
  attendance: AttendanceSummary;
  measurements: BodyMeasurement[];
}

export interface UserAccount {
  clientCode: string;
  isLoggedIn: boolean;
}
