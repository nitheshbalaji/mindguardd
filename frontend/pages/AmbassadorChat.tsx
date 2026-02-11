
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSmartCaseAssignment } from '../services/geminiService';
import { Send, Shield, User, Heart, AlertCircle, Loader2 } from 'lucide-react';

const MOCK_AMBASSADORS = [
  { id: 'a1', name: 'Sarah', specialization: 'Anxiety & Loneliness', load: 0.4 },
  { id: 'a2', name: 'Mike', specialization: 'Academic Stress', load: 0.8 },
  { id: 'a3', name: 'Elena', specialization: 'Burnout & Fatigue', load: 0.2 }
];

const AmbassadorChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [concern, setConcern] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStartMatch = async () => {
    setIsMatching(true);
    // AI Matching Logic
    const result = await getSmartCaseAssignment(concern, MOCK_AMBASSADORS);
    setTimeout(() => {
      setMatchResult(result);
      setIsMatching(false);
      setMessages([
        { id: '1', sender: 'system', text: `Connected with Peer Ambassador ${result.assignedAmbassadorId.slice(0, 2)} (Specialist). Your session is 100% anonymous.` }
      ]);
    }, 1500);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now().toString(), sender: 'me', text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simple automated response simulation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ambassador',
        text: "I'm here to listen. Tell me more about what's been on your mind lately.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  if (!matchResult && !isMatching) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Anonymous Peer Support</h2>
          <p className="text-slate-500 mb-8">Before we connect you, please briefly describe what's bothering you. Our AI will match you with the best available ambassador based on their specialization.</p>
          
          <div className="space-y-6">
            <textarea 
              className="w-full h-40 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
              placeholder="e.g. I'm feeling really lonely lately and finding it hard to focus on my coursework..."
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
            <button 
              disabled={!concern.trim()}
              onClick={handleStartMatch}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
            >
              Request Smart Match
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isMatching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900">AI Routing Engine Active</h3>
          <p className="text-slate-500">Matching concern: "{concern.slice(0, 30)}..." with available ambassadors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">A</div>
          <div>
            <h3 className="font-bold">Peer Ambassador (Specialist)</h3>
            <p className="text-xs text-blue-400">Anonymous Encryption Active</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold">
          <AlertCircle size={14} className="text-orange-400" />
          <span>Case ID: {matchResult?.assignedAmbassadorId}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-2xl ${
              msg.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 
              msg.sender === 'system' ? 'bg-slate-100 text-slate-500 text-xs text-center w-full max-w-none' : 
              'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {msg.timestamp && <span className="text-[10px] opacity-50 block mt-1">{msg.timestamp}</span>}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-6 border-t bg-slate-50 flex gap-4">
        <input 
          type="text"
          className="flex-1 p-4 rounded-2xl border-2 border-slate-200 outline-none focus:border-blue-500"
          placeholder="Type your message anonymously..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AmbassadorChat;
