
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users for different roles
const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.STUDENT]: {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@uni.edu',
    role: UserRole.STUDENT,
    avatar: 'https://picsum.photos/seed/alex/200'
  },
  [UserRole.AMBASSADOR]: {
    id: 'a1',
    name: 'Sarah Peer',
    email: 'sarah@uni.edu',
    role: UserRole.AMBASSADOR,
    avatar: 'https://picsum.photos/seed/sarah/200',
    specialization: ['Anxiety', 'Loneliness']
  },
  [UserRole.COUNSELOR]: {
    id: 'c1',
    name: 'Dr. Miller',
    email: 'miller@uni.edu',
    role: UserRole.COUNSELOR,
    avatar: 'https://picsum.photos/seed/miller/200'
  },
  [UserRole.ADMIN]: {
    id: 'ad1',
    name: 'Admin User',
    email: 'admin@uni.edu',
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/seed/admin/200'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('mindguard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const selectedUser = MOCK_USERS[role];
    setUser(selectedUser);
    localStorage.setItem('mindguard_user', JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindguard_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
