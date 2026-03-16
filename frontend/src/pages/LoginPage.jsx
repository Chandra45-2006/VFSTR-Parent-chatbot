import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart3, Bot, BadgeCheck, Smartphone, ArrowRight, HelpCircle, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { authAPI } from '../lib/api.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [regNumber, setRegNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const VALID_STUDENTS = {
    '231FA04D90': { phone: '8374654918', name: 'G.NAGA CHANDRA',   branch: 'CSE', year: 3, section: 'A', cgpa: 7.71 },
    '231FA04268': { phone: '8639319956', name: 'G.NAGA SURYA',     branch: 'CSE', year: 3, section: 'B', cgpa: 7.45 },
    '231FA04D94': { phone: '9390233652', name: 'SK.NISSAR AHAMAD', branch: 'CSE', year: 3, section: 'C', cgpa: 8.50 },
    '231FA04406': { phone: '9392682603', name: 'P.THARUNASRI',     branch: 'CSE', year: 3, section: 'C', cgpa: 7.98 },
    '231FA04263': { phone: '6302093005', name: 'D.LOKESH',         branch: 'CSE', year: 3, section: 'C', cgpa: 7.35 },
    '231FA04D52': { phone: '7013033238', name: 'K.SAI PRANEETH',   branch: 'CSE', year: 3, section: 'C', cgpa: 7.60 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const reg = regNumber.toUpperCase().trim();
    const phone = mobile.trim();
    const found = VALID_STUDENTS[reg];
    if (!found || found.phone !== phone) {
      setError('Invalid credentials. Please check your Registration Number and Phone Number and try again.');
      setLoading(false);
      return;
    }
    try {
      const { data } = await authAPI.login(reg, phone);
      localStorage.setItem('token', data.token);
      localStorage.setItem('student', JSON.stringify(data.student));
    } catch {
      localStorage.setItem('token', 'local-' + Date.now());
      localStorage.setItem('student', JSON.stringify({ regNo: reg, name: found.name, branch: found.branch, year: found.year, section: found.section, cgpa: found.cgpa }));
    }
    setLoading(false);
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-[#f5f6f8]">
      {/* Left Side */}
      <div className="relative w-full lg:w-7/12 bg-gradient-to-br from-blue-700 via-indigo-600 to-violet-600 p-8 lg:p-20 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

        <Link to="/" className="flex items-center gap-3 relative z-10 group">
          <div className="bg-white p-1 rounded-lg shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
            <img src="/campus.png" alt="VFSTR Logo" className="size-10 object-contain" />
          </div>
          <span className="text-white text-2xl font-black tracking-tight">VFSTR</span>
        </Link>

        <div className="relative z-10 max-w-2xl">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-white text-5xl lg:text-7xl font-black leading-[1.1] mb-6">
            Stay connected with your child's progress
          </motion.h1>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="text-white/80 text-lg lg:text-xl leading-relaxed mb-12 max-w-lg">
            Access real-time academic information through our intelligent parent portal.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: BarChart3, title: 'Real-Time Statistics', desc: 'Monitor academic performance and attendance instantly.' },
              { icon: Bot, title: 'AI Assistant', desc: 'Get intelligent insights and predictions for student growth.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
                <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">{f.title}</h3>
                  <p className="text-white/60 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 hidden lg:block relative z-10">
          <div className="w-full h-64 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img className="w-full h-full object-cover" src="/vfstr-logo.png" alt="Vignan's University Campus" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[480px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 border border-slate-200">
            <div className="mb-10">
              <h2 className="text-slate-900 text-3xl font-black mb-2">Welcome Back</h2>
              <p className="text-slate-500">Please enter the details below to access the student portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">Student Registration Number</label>
                <div className="relative">
                  <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <input required value={regNumber} onChange={(e) => setRegNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. 231FA04D90" type="text" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">Registered Parent Mobile Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <input required value={mobile} onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                    placeholder="+91 00000 00000" type="tel" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group">
                <span>{loading ? 'Please wait, logging in...' : 'Verify Student'}</span>
                {!loading && <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs leading-relaxed px-4">
                By continuing, you agree to <a className="text-blue-600 hover:underline font-semibold" href="#">VFSTR Terms</a> &amp; <a className="text-blue-600 hover:underline font-semibold" href="#">Privacy Policy</a>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-6">
            <a className="text-slate-500 hover:text-blue-600 text-sm flex items-center gap-1 font-medium transition-colors" href="#">
              <HelpCircle className="size-4" /> Need Help?
            </a>
            <a className="text-slate-500 hover:text-blue-600 text-sm flex items-center gap-1 font-medium transition-colors" href="#">
              <Headphones className="size-4" /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}




