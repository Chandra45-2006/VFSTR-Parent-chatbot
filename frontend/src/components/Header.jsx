import { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';

const notifications = [
  { title: 'Mid-term results published', time: '10 min ago', dot: 'bg-blue-500' },
  { title: 'Attendance updated for today', time: '1 hr ago', dot: 'bg-green-500' },
  { title: 'Fee receipt generated', time: 'Yesterday', dot: 'bg-purple-500' },
];

export function Header() {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">Academic Year: 2025-26</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-11 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100">
                <p className="text-slate-900 text-sm font-bold">Notifications</p>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                  <span className={`size-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-slate-700 text-xs font-medium">{n.title}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">G.Sri Hari Babu</p>
            <p className="text-xs text-slate-500">Parent</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600/20 bg-cover bg-center border-2 border-blue-600/10"
            style={{ backgroundImage: "url('https://picsum.photos/seed/parent/100/100')" }} />
          <ChevronDown className="size-4 text-slate-400" />
        </div>

        <div className="pl-4 border-l border-slate-200 flex items-center">
          <img src="/campus.png" alt="VFSTR" className="h-10 w-auto object-contain" />
        </div>
      </div>
    </header>
  );
}
