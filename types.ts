
export enum UserRole {
  STUDENT = 'STUDENT',
  AMBASSADOR = 'AMBASSADOR',
  COUNSELOR = 'COUNSELOR',
  ADMIN = 'ADMIN'
}

export enum RiskLevel {
  STABLE = 'STABLE',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  specialization?: string[]; // For ambassadors/counselors
}

export interface MoodEntry {
  id: string;
  anonymizedId: string;
  timestamp: string;
  moodScore: number; // 1-10
  sleepHours: number;
  stressLevel: number; // 1-10
  academicPressure: number; // 1-10
  socialIsolation: number; // 1-10
  notes: string;
}

export interface RiskAnalysis {
  riskLevel: RiskLevel;
  patterns: string[];
  recommendation: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Case {
  id: string;
  anonymizedId: string;
  assignedTo: string; // Ambassador/Counselor ID
  category: 'academic' | 'anxiety' | 'loneliness' | 'crisis';
  status: 'open' | 'active' | 'escalated' | 'resolved';
  createdAt: string;
}
