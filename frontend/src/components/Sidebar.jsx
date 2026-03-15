import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardList, CreditCard, FileText, Bot, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/academic', icon: BookOpen, label: 'Academic' },
  { to: '/attendance', icon: ClipboardList, label: 'Attendance' },
  { to: '/fees', icon: CreditCard, label: 'Fees' },
  { to: '/exams', icon: FileText, label: 'Exams' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const name = student.name || 'Student';
  const regNo = student.regNo || '---';
  const branch = student.branch || 'CSE';
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-40">
      <div className="px-5 py-5 border-b border-slate-200 flex items-center gap-3">
        <img src="/campus.png" alt="VFSTR Logo" className="h-9 w-9 object-contain" />
        <div>
          <p className="text-slate-900 font-bold text-sm leading-tight">VFSTR</p>
          <p className="text-slate-500 text-[11px]">Parent Portal</p>
        </div>
      </div>
      <div className="mx-4 mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
          <div className="min-w-0">
            <p className="text-slate-900 font-semibold text-sm truncate">{name}</p>
            <p className="text-slate-500 text-[11px] truncate">{regNo} · {branch}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`
            }>
            <Icon className="size-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-5 border-t border-slate-200 pt-3">
        <button onClick={() => { localStorage.clear(); navigate('/'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}