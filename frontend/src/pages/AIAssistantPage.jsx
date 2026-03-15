import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Header } from '../components/Header.jsx';
import { Send, Bot, User, Sparkles, Mic, Plus } from 'lucide-react';
import { cn } from '../lib/utils.js';

const suggestions = [
  "What is my child's current CGPA?",
  "Show attendance summary",
  "Any upcoming exams?",
  "Check pending fees",
];

function getBotResponse(input) {
  const q = input.toLowerCase();
  if (q.includes('cgpa') || q.includes('gpa')) return "Your child's current CGPA is 7.68. The latest semester SGPA was 7.98, showing an upward trend of +0.26 from the previous semester.";
  if (q.includes('attendance')) return "Current overall attendance is 85%. Subject-wise: MFS (90%), MAD (93.94%), CNS (77.78%), SE Lab (66.67% — needs attention). Minimum required is 75%.";
  if (q.includes('fee') || q.includes('fees')) return "All fees are cleared for the current semester. Total paid: ₹2,17,100. Current balance: ₹0. A refund of ₹52,000 was processed on 11-08-2025.";
  if (q.includes('exam') || q.includes('exams')) return "Upcoming: Mid-Semester 1 (March 20–28, 2026). T1 Written Exam on Mar 22, T4 Written Exam on Mar 27. Lab exams in June. Final semester exams: June 15–30.";
  if (q.includes('backlog') || q.includes('arrear')) return "Great news — your child has 0 active backlogs. All subjects have been cleared successfully across all 5 completed semesters.";
  if (q.includes('hello') || q.includes('hi')) return "Hello! I'm your VFSTR Academic Assistant. I can help with attendance, grades, fees, exams, and more. What would you like to know?";
  return "I can help you with attendance, CGPA, fee details, exam schedules, and academic performance. Could you be more specific about what you'd like to know?";
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your VFSTR Academic Assistant. I can help you with attendance queries, exam schedules, fee details, or any other academic information. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: msg, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getBotResponse(msg), timestamp: new Date() }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col">
        <Header />

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {messages.length === 1 && (
              <div className="text-center py-8">
                <div className="size-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="size-6 text-blue-600" />
                </div>
                <h2 className="text-slate-900 font-bold text-xl mb-1">VFSTR AI Assistant</h2>
                <p className="text-slate-500 text-sm">Ask anything about your child's academic progress</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}>
                <div className={cn('size-8 rounded-xl flex items-center justify-center flex-shrink-0 border',
                  msg.role === 'assistant'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-200 border-slate-300 text-slate-600')}>
                  {msg.role === 'assistant' ? <Bot className="size-4" /> : <User className="size-4" />}
                </div>
                <div className={cn('max-w-[80%] space-y-1', msg.role === 'user' ? 'items-end' : '')}>
                  {msg.role === 'assistant' && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">VFSTR Assistant</p>
                  )}
                  <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-blue-600 text-white')}>
                    {msg.content}
                  </div>
                  <p className="text-[10px] text-slate-400 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="size-8 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center">
                  <Bot className="size-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <div key={i} className="size-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-2">
            <div className="max-w-2xl mx-auto flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-xs hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 pb-6 pt-2">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-400 transition-all shadow-sm">
              <div className="flex items-center px-3 py-2 border-b border-slate-100 gap-1">
                <button className="size-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                  <Plus className="size-3.5" />
                </button>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-1">VFSTR AI</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-green-400" />
                  <span className="text-slate-400 text-[10px]">Online</span>
                </div>
              </div>
              <div className="flex items-end p-2 gap-2">
                <textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Ask about attendance, grades, fees, exams..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 py-2 px-2 resize-none max-h-32" />
                <div className="flex items-center gap-1 pb-1">
                  <button className="size-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <Mic className="size-4" />
                  </button>
                  <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
                    className={cn('size-8 rounded-xl flex items-center justify-center transition-all',
                      input.trim() && !isLoading
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed')}>
                    <Send className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              AI responses are based on your child's academic data. Verify important info in the portal.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
