
import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Activity, 
  Shield, 
  LayoutDashboard, 
  UserCircle,
  AlertTriangle,
  Moon,
  Zap
} from 'lucide-react';
import { UserRole } from './types';

export const COLORS = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#3b82f6',
  stable: '#10b981',
  low: '#fbbf24',
  moderate: '#f59e0b',
  high: '#ef4444',
  critical: '#7f1d1d'
};

export const NAVIGATION_ITEMS = {
  [UserRole.STUDENT]: [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { label: 'Check-in', icon: <Activity size={20} />, path: '/check-in' },
    { label: 'Support Chat', icon: <MessageSquare size={20} />, path: '/chat' },
  ],
  [UserRole.AMBASSADOR]: [
    { label: 'My Cases', icon: <Activity size={20} />, path: '/' },
    { label: 'Support Chat', icon: <MessageSquare size={20} />, path: '/chat' },
  ],
  [UserRole.COUNSELOR]: [
    { label: 'Crisis Monitor', icon: <AlertTriangle size={20} />, path: '/' },
    { label: 'Student Insights', icon: <Activity size={20} />, path: '/insights' },
  ],
  [UserRole.ADMIN]: [
    { label: 'Campus Analytics', icon: <LayoutDashboard size={20} />, path: '/' },
    { label: 'Security Logs', icon: <Shield size={20} />, path: '/security' },
  ]
};
