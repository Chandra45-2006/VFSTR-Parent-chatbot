import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Calendar, MessageSquare, GraduationCap, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LandingPage() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6f8] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-20 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/campus.png" alt="VFSTR Logo" className="size-10 object-contain" />
          <span className="text-xl font-black tracking-tight text-slate-900">VFSTR</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          <Link to="/login" className="hover:text-blue-600 transition-colors">Portal</Link>
          <button onClick={() => setShowHelp(true)} className="hover:text-blue-600 transition-colors">Help</button>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            Login
          </Link>
        </div>
      </nav>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
                <div>
                  <h2 className="text-2xl font-black">How to Use VFSTR Portal</h2>
                  <p className="text-blue-100 text-sm mt-1">Quick guide for parents and students</p>
                </div>
                <button onClick={() => setShowHelp(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="size-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {[
                  { title: 'Accessing the Portal', desc: 'Click on the "Portal" or "Login" button in the navigation bar to go to the secure login page.' },
                  { title: 'Secure Login', desc: 'Enter your Student Registration Number (e.g., 231FA04D90) and your registered parent mobile number.' },
                  { title: 'OTP Verification', desc: 'After entering your credentials, you will receive an OTP on your registered mobile number for secure access.' },
                  { title: 'Dashboard Overview', desc: 'Once logged in, view a summary of academic performance, attendance, and fee status on your dashboard.' },
                  { title: 'Academic Performance', desc: 'Navigate to the "Academic" section to see semester-wise SGPA, credits, and detailed subject grades.' },
                  { title: 'Attendance Tracking', desc: 'Check the "Attendance" section for a color-coded daily grid: Blue for Present, Red for Absent.' },
                  { title: 'Fee Management', desc: 'View detailed fee structures, payment history, and pending balances in the "Fees" section.' },
                  { title: 'AI Assistant', desc: 'Use our intelligent chatbot for instant answers about student progress and campus information.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button onClick={() => setShowHelp(false)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Secure Parent Portal
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
            VFSTR Parent <br />
            <span className="text-blue-600">Chatbot System</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stay connected with your child's academic journey. Get real-time updates on attendance, grades, and campus activities through our AI-powered assistant.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group">
              Login to Access Information
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => setShowHelp(true)} className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all">
              View Tutorial
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-slate-500">Powerful tools to keep you informed about your child's progress.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Real-time Updates', desc: 'Instant notifications about attendance, grades, and important academic events.', color: 'bg-blue-50 text-blue-600' },
              { icon: Calendar, title: 'Attendance Tracking', desc: 'Monitor daily attendance records and receive alerts for absences or low attendance.', color: 'bg-green-50 text-green-600' },
              { icon: MessageSquare, title: 'Direct Communication', desc: "Chat with our AI assistant to get instant answers about your child's academic status.", color: 'bg-purple-50 text-purple-600' },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">About Vignan's Foundation</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Vignan's Foundation for Science, Technology & Research (VFSTR) is a Deemed University committed to excellence in education and research.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '10,000+ Students', icon: GraduationCap },
                { label: '50+ Programs', icon: GraduationCap },
                { label: '500+ Faculty', icon: GraduationCap },
                { label: 'NAAC A+ Grade', icon: Zap },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <stat.icon className="size-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
            <img src="/vfstr-logo.png" alt="Vignan Campus" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/campus.png" alt="VFSTR Logo" className="size-12 object-contain" />
              <span className="text-2xl font-black tracking-tight">VFSTR</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Vignan's Foundation for Science, Technology & Research. Empowering parents with real-time student insights.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>support@vfstr.edu.in</li>
              <li>+91 8632 344 700</li>
              <li>Vadlamudi, Guntur, AP</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2026 VFSTR Parent Chatbot System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
