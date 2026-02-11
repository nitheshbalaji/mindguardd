
import React from 'react';
import { RiskLevel } from '../types';
import { AlertTriangle, UserCheck, ShieldAlert, History, Filter } from 'lucide-react';

const CounselorDashboard: React.FC = () => {
  const highRiskCases = [
    { id: 'anon-8x3', risk: RiskLevel.CRITICAL, pattern: 'Extreme Burnout', time: '10m ago', flags: ['Sleep Deprivation', 'Mood Drop'] },
    { id: 'anon-y2p', risk: RiskLevel.HIGH, pattern: 'Sleep-Depression Link', time: '1h ago', flags: ['Consistent Insomnia'] },
    { id: 'anon-4k1', risk: RiskLevel.HIGH, pattern: 'Academic Pressure', time: '3h ago', flags: ['Exam Stress'] },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campus Crisis Hub</h1>
          <p className="text-slate-500">Prioritized overview of students showing critical risk patterns.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            Filter Risks
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800">
            <History size={18} />
            Audit Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
          <ShieldAlert className="text-red-600 mb-2" size={24} />
          <p className="text-2xl font-bold text-red-900">4</p>
          <p className="text-sm font-medium text-red-700">Critical Escalations</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
          <AlertTriangle className="text-orange-600 mb-2" size={24} />
          <p className="text-2xl font-bold text-orange-900">12</p>
          <p className="text-sm font-medium text-orange-700">High Risk Patterns</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
          <UserCheck className="text-blue-600 mb-2" size={24} />
          <p className="text-2xl font-bold text-blue-900">48</p>
          <p className="text-sm font-medium text-blue-700">Active Peer Sessions</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Risk Queue (Anonymized)</h3>
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Live Monitoring</span>
        </div>
        <div className="divide-y divide-slate-100">
          {highRiskCases.map((caseItem) => (
            <div key={caseItem.id} className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50 transition-all">
              <div className="flex items-start gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  caseItem.risk === RiskLevel.CRITICAL ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                }`}>
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-lg text-slate-800">{caseItem.id}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      caseItem.risk === RiskLevel.CRITICAL ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>{caseItem.risk}</span>
                  </div>
                  <p className="text-slate-600 font-medium mb-3">{caseItem.pattern}</p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.flags.map(f => (
                      <span key={f} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end lg:self-center">
                <span className="text-sm text-slate-400">{caseItem.time}</span>
                <div className="flex gap-2">
                  <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg">
                    Intervene
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    View Trends
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
