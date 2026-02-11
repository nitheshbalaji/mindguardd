
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ShieldCheck, Activity, Users, Database, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const campusStressData = [
    { name: 'Week 1', stress: 45, sleep: 6.8 },
    { name: 'Week 2', stress: 48, sleep: 6.5 },
    { name: 'Week 3', stress: 65, sleep: 5.9 },
    { name: 'Week 4', stress: 82, sleep: 5.2 }, // Midterms
    { name: 'Week 5', stress: 78, sleep: 5.5 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Campus Analytics Dashboard</h1>
        <p className="text-slate-500">Executive decision-support view for institutional health monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Campus Wellness Index', val: '68%', change: '+5%', color: 'text-green-600' },
          { label: 'Privacy Uptime', val: '100%', change: 'Stable', color: 'text-blue-600' },
          { label: 'Data Encryption', val: 'AES-256', change: 'Active', color: 'text-slate-600' },
          { label: 'System Load', val: '12%', change: 'Normal', color: 'text-slate-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black text-slate-900">{stat.val}</p>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Campus Peak Stress Period</h3>
            <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full flex items-center gap-1">
              <AlertCircle size={12} /> Midterm Peak
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={campusStressData}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Sleep Deprivation Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campusStressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="sleep" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex gap-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Privacy Architecture Audit</h3>
            <p className="text-slate-400 text-sm max-w-lg">Current system successfully segregates Identity DB from Mental Health DB. Identity logs are currently encrypted and only accessible via Counselor escalation override.</p>
          </div>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all">
          Generate Security Report
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
