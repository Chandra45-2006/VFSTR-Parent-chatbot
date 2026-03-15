import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar.jsx';
import { Header } from '../components/Header.jsx';
import { CheckCircle2, Star, Wallet, Clock, TrendingUp, History, MessageCircle, Send, Bot, FileText, ClipboardCheck, Calendar, X, BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { cn } from '../lib/utils.js';
import { useStudent, useAttendance } from '../lib/useStudentData.js';

const attendanceData = [
  { name: 'Jan', attendance: 85 }, { name: 'Feb', attendance: 92 },
  { name: 'Mar', attendance: 88 }, { name: 'Apr', attendance: 95 }, { name: 'May', attendance: 82 },
];
const performanceData = [
  { name: 'Sem 1', gpa: 8.2 }, { name: 'Sem 2', gpa: 8.5 },
  { name: 'Sem 3', gpa: 7.9 }, { name: 'Sem 4', gpa: 8.8 }, { name: 'Sem 5', gpa: 8.4 },
];
const subjectDistribution = [
  { name: 'Present', value: 87, color: '#2563eb' },
  { name: 'Absent', value: 8, color: '#ef4444' },
  { name: 'On Leave', value: 5, color: '#10b981' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showActivity, setShowActivity] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const { student: lsStudent } = useStudent();
  const { data: attData } = useAttendance();
  const student = lsStudent || JSON.parse(localStorage.getItem('student') || 'null') || {};
  const parentName = student.name ? ('Hello, ' + student.name + '!') : 'Hello, G.Sri Hari Babu!';
  const studentRegNo = student.regNo || '231FA04000';
  const overallAttendance = attData ? attData.overall : 87;

  return (
    <div className="flex min-h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header />
        <div className="p-8 space-y-8">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">Student ID: {studentRegNo}</span>
                <h2 className="text-4xl font-black">{parentName}</h2>
                <p className="text-white/80 max-w-md text-lg">{"Here's an overview of your child's academic progress."}</p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <TrendingUp className="size-16 text-white/50" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Attendance', value: overallAttendance + '%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', desc: 'Current semester average' },
              { label: 'Performance', value: (student.cgpa || '8.4') + ' CGPA', icon: Star, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Cumulative Index' },
              { label: 'Fee Details', value: '\u20B90 Pending', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'No dues remaining', success: true },
              { label: 'Exams', value: '5 Upcoming', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Next: Artificial Intelligence' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={cn('p-2 rounded-xl', stat.bg)}>
                    <stat.icon className={cn('size-6', stat.color)} />
                  </div>
                </div>
                <p className={cn('text-xs mt-4 font-medium', stat.success ? 'text-green-500' : 'text-slate-400')}>{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900">Current Semester Progress (III-II)</h3>
                  <button className="text-blue-600 text-sm font-bold hover:underline">View Syllabus</button>
                </div>
                <div className="space-y-8">
                  {[
                    { name: 'Artificial Intelligence', progress: 85 },
                    { name: 'Data Mining Techniques', progress: 72 },
                    { name: 'Compiler Design', progress: 90 },
                    { name: 'Computer Networks', progress: 68 },
                    { name: 'Machine Learning', progress: 75 },
                  ].map((subject, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-700">{subject.name}</span>
                        <span className="text-blue-600">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: subject.progress + '%' }} transition={{ duration: 1, delay: i * 0.1 }}
                          className="bg-blue-600 h-full rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: FileText, label: 'View Results', path: '/academic' },
                  { icon: ClipboardCheck, label: 'Attendance', path: '/attendance' },
                  { icon: History, label: 'Fee History', path: '/fees' },
                  { icon: Calendar, label: 'Exam Schedule', path: '/exams' },
                ].map((item, i) => (
                  <button key={i} onClick={() => navigate(item.path)}
                    className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center gap-4 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/5 transition-all group">
                    <item.icon className="size-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
                <History className="size-5 text-slate-400" />
              </div>
              <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                {[
                  { title: 'Mid-term results published', time: 'Today at 10:45 AM', active: true },
                  { title: 'Attendance updated', time: 'Yesterday at 4:30 PM' },
                  { title: 'Fee receipt generated', time: 'May 8, 2025' },
                  { title: 'Academic calendar updated', time: 'May 5, 2025' },
                  { title: 'Assignment deadline extension', time: 'May 2, 2025' },
                ].map((activity, i) => (
                  <div key={i} className="relative pl-8 group">
                    <div className={cn('absolute left-0 top-1 w-[24px] h-[24px] bg-white border-2 rounded-full flex items-center justify-center z-10',
                      activity.active ? 'border-blue-600' : 'border-slate-200')}>
                      <div className={cn('w-2 h-2 rounded-full', activity.active ? 'bg-blue-600' : 'bg-slate-200')} />
                    </div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowActivity(true)}
                className="w-full mt-8 py-3 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-600">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showActivity && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowActivity(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Academic & Attendance Activity</h2>
                    <p className="text-slate-500 text-sm mt-1">Detailed visual breakdown of student performance</p>
                  </div>
                  <button onClick={() => setShowActivity(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="size-6 text-slate-400" />
                  </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><BarChartIcon className="size-5" /></div>
                        <h3 className="text-lg font-black text-slate-900">Monthly Attendance</h3>
                      </div>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="attendance" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="size-5" /></div>
                        <h3 className="text-lg font-black text-slate-900">Semester GPA Trend</h3>
                      </div>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} dy={10} />
                            <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="gpa" fill="#9333ea" radius={[6, 6, 0, 0]} barSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={subjectDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                              {subjectDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><PieChartIcon className="size-5" /></div>
                          <h3 className="text-lg font-black text-slate-900">Attendance Distribution</h3>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">The student has maintained a consistent attendance record of {overallAttendance}%.</p>
                        <div className="grid grid-cols-3 gap-4">
                          {subjectDistribution.map((item, i) => (
                            <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100">
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{item.name}</p>
                              <p className="text-xl font-black text-slate-900">{item.value}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex flex-col items-end gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 w-72 md:w-80 hidden md:block">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="text-blue-600 size-5" />
                <span className="font-bold text-sm text-slate-900">AI Education Assistant</span>
              </div>
              <div className="relative">
                <input className="w-full bg-slate-100 border-none rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  placeholder="Ask about attendance, grades..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                <button className="absolute right-3 top-2.5 text-blue-600 hover:scale-110 transition-transform">
                  <Send className="size-4" />
                </button>
              </div>
            </motion.div>
            <button onClick={() => navigate('/ai-assistant')}
              className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 transition-transform active:scale-95">
              <MessageCircle className="size-8" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}