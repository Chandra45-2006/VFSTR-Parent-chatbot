import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Header } from '../components/Header.jsx';
import { CheckCircle2, Receipt, CreditCard } from 'lucide-react';
import { feesAPI } from '../lib/api.js';

const fallbackPayments = [
  { sno: 1, receipt: '586011', challan: '125588542208', date: '19-07-2025', mode: 'UPI', amount: 90000 },
  { sno: 2, receipt: '606382', challan: '26680732353', date: '03-01-2026', mode: 'Net Banking', amount: 80000 },
  { sno: 3, receipt: '586433', challan: '439342493068', date: '21-07-2025', mode: 'UPI', amount: 47100 },
];

export default function FeesPage() {
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const [feeData, setFeeData] = useState(null);

  useEffect(() => {
    if (student?.regNo) {
      feesAPI.get(student.regNo)
        .then(res => setFeeData(res.data))
        .catch(() => setFeeData(null));
    }
  }, []);

  const payments = feeData?.transactions?.filter(t => t.type === 'credit' || t.status === 'paid').map((t, i) => ({
    sno: i + 1,
    receipt: t.receiptNo || '-',
    challan: t.receiptNo || '-',
    date: t.date,
    mode: 'UPI',
    amount: t.amount,
  })) || fallbackPayments;

  const balance = feeData?.balance ?? 0;
  const totalPaid = feeData?.totalPaid ?? 217100;
  const regNo = student?.regNo || '231FA04D90';
  const studentName = student?.name || 'GADDAM NAGA CHANDRA';

  return (
    <div className="flex min-h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header />
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-slate-900 text-2xl font-black">Fee Details</h2>
            <p className="text-slate-500 text-sm mt-0.5">Academic Year 2025-2026 · Fee Management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Student Information</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  { label: 'Register No', value: regNo },
                  { label: 'VUID', value: 'VU23CS-1073' },
                  { label: 'Student Name', value: studentName },
                  { label: 'Father Name', value: 'GADDAM SRI HARI BABU' },
                  { label: 'Course', value: 'B.Tech - CSE' },
                  { label: 'Mother Name', value: 'GADDAM ARUNA KUMARI' },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-slate-400 text-xs">{f.label}</span>
                    <span className="text-slate-800 font-semibold">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-blue-600/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="size-4 text-blue-200" />
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Balance Due</p>
                </div>
                <p className="text-white text-4xl font-black mt-2">{'\u20B9'} {balance}</p>
              </div>
              <p className="text-blue-200 text-xs mt-4">All dues cleared for current semester</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200 flex items-center gap-2">
              <CreditCard className="size-4 text-slate-400" />
              <h3 className="text-slate-900 font-bold">Fixed Fee Structure</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Open Balance','Admission Fee','CDA Fee','Insurance','Exam Fee','Tuition Fee','Concession','Fee Receivable'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {['\u20B9 0','\u20B9 0','\u20B9 5,000','\u20B9 100','\u20B9 4,000','\u20B9 2,60,000','\u20B9 1,04,000'].map((v, i) => (
                      <td key={i} className="px-5 py-4 text-slate-600">{v}</td>
                    ))}
                    <td className="px-5 py-4 text-blue-600 font-black">{'\u20B9'} 1,65,100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200 flex items-center gap-2">
              <Receipt className="size-4 text-slate-400" />
              <h3 className="text-slate-900 font-bold">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['S.No','Receipt No','Challan No','Date','Mode','Amount'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-slate-400">{p.sno}</td>
                      <td className="px-5 py-4 text-slate-700 font-mono text-xs">{p.receipt}</td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">{p.challan}</td>
                      <td className="px-5 py-4 text-slate-600">{p.date}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-[10px] font-bold">{p.mode}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-900 font-bold">{'\u20B9'} {p.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 border-t border-blue-100">
                    <td colSpan={5} className="px-5 py-4 text-slate-600 text-sm font-semibold text-right">Total Paid:</td>
                    <td className="px-5 py-4 text-blue-600 font-black">{'\u20B9'} {totalPaid.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Refund Information</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Refund Amount', value: '\u20B9 52,000' },
                { label: 'Date', value: '11-08-2025' },
                { label: 'Cheque No', value: '884980' },
              ].map((f, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-slate-400 text-xs mb-1">{f.label}</p>
                  <p className="text-slate-800 font-bold">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}