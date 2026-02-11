
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, HeartHandshake, UserCog, Building } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/');
  };

  const roles = [
    { type: UserRole.STUDENT, icon: <GraduationCap size={24} />, desc: 'Check in mood, track patterns, seek peer support.' },
    { type: UserRole.AMBASSADOR, icon: <HeartHandshake size={24} />, desc: 'Mentor peers anonymously, manage case overload.' },
    { type: UserRole.COUNSELOR, icon: <UserCog size={24} />, desc: 'Review high-risk cases, monitor campus trends.' },
    { type: UserRole.ADMIN, icon: <Building size={24} />, desc: 'System analytics, peak stress index, security audits.' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white">MindGuard AI</h1>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Intelligent Student <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Mental Health</span> Monitoring
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            A secure, role-based platform designed to bridge the gap between students and support through AI risk analysis and privacy-first architecture.
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900" src={`https://picsum.photos/seed/${i+10}/100`} alt="User" />
              ))}
            </div>
            <p className="text-slate-500 text-sm">Trusted by 2,500+ students & faculty</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h3>
          <p className="text-slate-500 mb-8">Select your role to explore the MindGuard environment.</p>
          
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.type}
                onClick={() => handleLogin(role.type)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {role.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 capitalize">{role.type.toLowerCase()} Portal</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>
          
          <p className="mt-8 text-center text-xs text-slate-400">
            MindGuard uses a dual-database architecture to ensure mental health data is never linked to identity without authorization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
