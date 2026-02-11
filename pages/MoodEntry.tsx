
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeMoodEntry } from '../services/geminiService';
import { Activity, Moon, Zap, Brain, MessageSquare, Loader2, Sparkles, CheckCircle } from 'lucide-react';

const MoodEntry: React.FC = () => {
  const [mood, setMood] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate Gemini API Analysis
    const result = await analyzeMoodEntry(notes, `Mood: ${mood}, Sleep: ${sleep}, Stress: ${stress}`);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const Slider = ({ label, value, min, max, onChange, icon }: any) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold text-slate-700">{label}</span>
        </div>
        <span className="text-blue-600 font-bold text-lg">{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  if (analysisResult) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Entry Analyzed</h2>
          <p className="text-slate-500 mb-10">Our AI has reviewed your check-in for risk patterns.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Risk Level</span>
              <p className={`text-xl font-extrabold ${
                analysisResult.riskLevel === 'STABLE' ? 'text-green-600' : 'text-orange-500'
              }`}>{analysisResult.riskLevel}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Patterns Found</span>
              <p className="text-slate-800 font-bold">{analysisResult.patterns.join(', ') || 'Normal Activity'}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl md:col-span-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1 block">AI Recommendation</span>
              <p className="text-blue-800 font-medium leading-relaxed">{analysisResult.recommendation}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30"
            >
              Talk to an Ambassador
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mental Health Check-in</h1>
        <p className="text-slate-500">Your data is anonymized and only used for risk detection.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 space-y-10">
        <Slider 
          label="Overall Mood" min="1" max="10" value={mood} 
          onChange={setMood} icon={<Activity className="text-blue-500" size={20} />} 
        />
        <Slider 
          label="Hours Slept" min="0" max="12" value={sleep} 
          onChange={setSleep} icon={<Moon className="text-indigo-500" size={20} />} 
        />
        <Slider 
          label="Stress Level" min="1" max="10" value={stress} 
          onChange={setStress} icon={<Zap className="text-orange-500" size={20} />} 
        />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="text-purple-500" size={20} />
            <span className="font-bold text-slate-700">Any specific thoughts or triggers?</span>
          </div>
          <textarea 
            className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all resize-none text-slate-700 outline-none"
            placeholder="I've been feeling overwhelmed with my upcoming finals and haven't been sleeping well..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button 
          disabled={isAnalyzing}
          type="submit" 
          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              AI Analyzing Patterns...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Submit & Analyze
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
          <MessageSquare size={14} />
          <span>Privacy Guaranteed: Your name is not attached to this health data in the database.</span>
        </div>
      </form>
    </div>
  );
};

export default MoodEntry;
