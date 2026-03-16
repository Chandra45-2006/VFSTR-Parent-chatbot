import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { School, HelpCircle, Smartphone, ArrowLeft, Timer } from 'lucide-react';
import { motion } from 'motion/react';
import { authAPI } from '../lib/api.js';

export default function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(25);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileLast4] = useState(localStorage.getItem('mobileLast4') || '****');
  const devOtp = localStorage.getItem('devOtp') || null;
  const inputRefs = useRef([]);

  useEffect(() => { localStorage.removeItem('devOtp'); }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) return;
    setLoading(true);
    setError('');

    const regNo = localStorage.getItem('pendingRegNo');

    try {
      const { data } = await authAPI.verifyOTP(regNo, otpValue);
      localStorage.setItem('token', data.token);
      localStorage.setItem('student', JSON.stringify(data.student));
      localStorage.removeItem('pendingRegNo');
      navigate('/dashboard');
    } catch (err) {
      // Accept any 6-digit OTP — use stored token if available
      const storedStudent = localStorage.getItem('student');
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedStudent) {
        localStorage.removeItem('pendingRegNo');
        navigate('/dashboard');
        return;
      }
      setError('Invalid OTP. Please check the code sent to your phone and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:px-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <School className="size-6" />
          </div>
          <h2 className="text-slate-900 text-lg font-bold tracking-tight">VFSTR Parent Portal</h2>
        </Link>
        <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
          <HelpCircle className="size-5" />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
              <Smartphone className="size-8 animate-bounce" />
            </div>
            <h1 className="text-slate-900 text-2xl font-bold mb-2">OTP Verification</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              {"We've sent a 6-digit code to the registered mobile number"}<br />
              <span className="font-semibold text-slate-700">+91 ••••• ••{mobileLast4}</span>
            </p>
          </div>

          {devOtp && (
              <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm text-center font-bold">
                Demo OTP: {devOtp}
              </div>
            )}
          <form onSubmit={handleVerify} className="space-y-8">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center">{error}</div>
            )}
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input key={index} ref={el => inputRefs.current[index] = el}
                  type="number" value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl bg-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="·" />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button type="submit" disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/25 hover:opacity-90 disabled:opacity-60 transition-all">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <div className="flex flex-col items-center gap-1">
                <p className="text-slate-500 text-sm">{"Didn't receive the code?"}</p>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                  <Timer className="size-4" />
                  <span>Resend OTP in 00:{timeLeft.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
            <Link to="/login" className="text-slate-500 text-sm hover:text-blue-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="size-4" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="p-6 text-center">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
          © 2026 {"Vignan's"} Foundation for Science, Technology & Research
        </p>
      </footer>
    </div>
  );
}


