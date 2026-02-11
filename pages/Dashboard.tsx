
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, MoodEntry, RiskLevel } from '../types';
import { detectPatterns } from '../utils/riskEngine';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Activity, Moon, Zap, Heart, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CounselorDashboard from './CounselorDashboard';
import AdminDashboard from './AdminDashboard';

const MOCK_DATA: MoodEntry[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `e${i}`,
  anonymizedId: 'anon-1',
  timestamp: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  moodScore: Math.floor(Math.random() * 5) + 3,
  sleepHours: Math.floor(Math.random() * 4) + 4,
  stressLevel: Math.floor(Math.random() * 5) + 5,
  academicPressure: Math.floor(Math.random() * 4) + 6,
  socialIsolation: Math.floor(Math.random() * 5) + 2,
  notes: "Sample note content..."
}));

const StudentDashboard = () => {
  const { level, patterns } = detectPatterns(MOCK_DATA);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Personal Well-being</h1>
          <p className="text-slate-500">Overview of your mental health indicators for the last 14 days.</p>
        </div>
        <Link to="/check-in" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all">
          <Activity size={20} />
          Log Daily Check-in
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Zap size={20} /></div>
            <span className="font-semibold text-slate-500">Current Risk</span>
          </div>
          <p className={`text-2xl font-bold ${
            level === RiskLevel.CRITICAL ? 'text-red-600' :
            level === RiskLevel.HIGH ? 'text-orange-500' :
            'text-green-600'
          }`}>{level}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Moon size={20} /></div>
            <span className="font-semibold text-slate-500">Avg. Sleep</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">5.4h</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Activity size={20} /></div>
            <span className="font-semibold text-slate-500">Academic Load</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">8.2/10</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Heart size={20} /></div>
            <span className="font-semibold text-slate-500">Mood Score</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">4.1/10</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Mood vs Stress Pattern</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="moodScore" stroke="#3b82f6" strokeWidth={3} fill="#3b82f622" />
                  <Area type="monotone" dataKey="stressLevel" stroke="#ef4444" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={20} className="text-blue-400" />
              <h3 className="text-lg font-bold">Risk Engine Insights</h3>
            </div>
            <div className="space-y-4">
              {patterns.map((p, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <AlertCircle className="text-orange-400 shrink-0" size={18} />
                  <p className="text-sm text-slate-300 leading-relaxed">{p}</p>
                </div>
              ))}
              {patterns.length === 0 && (
                <div className="flex gap-3 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <CheckCircle2 className="text-green-400 shrink-0" size={18} />
                  <p className="text-sm text-green-100">Stable patterns detected.</p>
                </div>
              )}
            </div>
            <Link to="/chat" className="w-full mt-8 block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/30">
              Start Anonymous Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case UserRole.STUDENT: return <StudentDashboard />;
    case UserRole.COUNSELOR: return <CounselorDashboard />;
    case UserRole.ADMIN: return <AdminDashboard />;
    case UserRole.AMBASSADOR: return <CounselorDashboard />;
    default: return <div>Role not found</div>;
  }
};

export default Dashboard;
