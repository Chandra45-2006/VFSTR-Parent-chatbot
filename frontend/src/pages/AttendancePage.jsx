import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.jsx';
import { Header } from '../components/Header.jsx';
import { Download } from 'lucide-react';
import { attendanceAPI } from '../lib/api.js';

const subjectCols = [
  { code: 'SE' }, { code: 'PADCOM' }, { code: 'CNS' }, { code: 'MFS' },
  { code: 'EBI-L' }, { code: 'IIC' }, { code: 'SE Lab' }, { code: 'CNS-L' },
  { code: 'MAD Lab' }, { code: 'QALR' }, { code: 'MAD' }, { code: 'EBI' },
  { code: 'IDP-II' }, { code: 'Library' }, { code: 'Counseling' }, { code: 'TRg' },
];

const conductedHours = {
  'SE': 22, 'PADCOM': 35, 'CNS': 27, 'MFS': 40,
  'EBI-L': '-', 'IIC': '-', 'SE Lab': 14, 'CNS-L': 14,
  'MAD Lab': 8, 'QALR': 15, 'MAD': 25, 'EBI': 31,
  'IDP-II': 8, 'Library': 3, 'Counseling': 33, 'TRg': '-',
};

const attendedInfo = {
  'SE':    { attended: 18, pct: 81.82 },
  'PADCOM':{ attended: 28, pct: 80.00 },
  'CNS':   { attended: 21, pct: 77.78 },
  'MFS':   { attended: 36, pct: 90.00 },
  'EBI-L': { attended: '-', pct: null },
  'IIC':   { attended: '-', pct: null },
  'SE Lab':{ attended: 14, pct: 100.00 },
  'CNS-L': { attended: 14, pct: 77.78 },
  'MAD Lab':{ attended: 8, pct: 100.00 },
  'QALR':  { attended: 15, pct: 100.00 },
  'MAD':   { attended: 26, pct: 92.86 },
  'EBI':   { attended: 31, pct: 83.33 },
  'IDP-II':{ attended: 8,  pct: 93.94 },
  'Library':{ attended: 3, pct: 66.67 },
  'Counseling':{ attended: 33, pct: 100.00 },
  'TRg':   { attended: '-', pct: null },
};

// Day & period wise data — each row: date + attendance per subject slot
const dayWise = [
  { date: '22-12-2025', data: { 'SE': 'A', 'PADCOM': 'A', 'CNS': 'P', 'MFS': 'P', 'SE Lab': 'P', 'MAD': 'P' } },
  { date: '23-12-2025', data: { 'SE': 'A', 'PADCOM': 'A', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '24-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '26-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '27-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '29-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '30-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '31-12-2025', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'A', 'MFS': 'A', 'MAD': 'P' } },
  { date: '02-01-2026', data: { 'SE': 'A', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '03-01-2026', data: { 'SE': 'P', 'PADCOM': 'A', 'CNS': 'P', 'MFS': 'A', 'MAD': 'A', 'SE Lab': 'P' } },
  { date: '05-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '06-01-2026', data: { 'SE': 'A', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'A' } },
  { date: '07-01-2026', data: { 'SE': 'P', 'PADCOM': 'A', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '08-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'A', 'MFS': 'A', 'MAD': 'P' } },
  { date: '09-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P', 'SE Lab': 'P' } },
  { date: '10-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '12-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'A' } },
  { date: '19-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '20-01-2026', data: { 'SE': 'A', 'PADCOM': 'A', 'CNS': 'P', 'MFS': 'P', 'MAD': 'P' } },
  { date: '21-01-2026', data: { 'SE': 'P', 'PADCOM': 'P', 'CNS': 'P', 'MFS': 'P' } },
];

const cellColor = (v) => {
  if (v === 'P') return 'bg-sky-200 text-sky-800';
  if (v === 'A') return 'bg-red-500 text-white';
  return 'bg-slate-100 text-slate-400';
};

const pctColor = (p) => {
  if (p === null) return 'text-slate-400';
  if (p >= 90) return 'text-emerald-700 font-bold';
  if (p >= 75) return 'text-blue-700 font-bold';
  return 'text-red-600 font-bold';
};

function downloadCSV(student, dayWise, subjectCols) {
  const headers = ['Date', ...subjectCols.map(s => s.code)];
  const rows = dayWise.map(r => [r.date, ...subjectCols.map(s => r.data[s.code] || '-')]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (student?.regNo || 'attendance') + '_report.csv';
  a.click();
  URL.revokeObjectURL(url);
}
export default function AttendancePage() {
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (student?.regNo) {
      attendanceAPI.get(student.regNo)
        .then(res => setApiData(res.data))
        .catch(() => setApiData(null));
    }
  }, []);

  const overall = apiData?.overall || 85;
  const regNo = student?.regNo || '232FA04D90';
  const studentName = student?.name || 'G.NAGA CHANDRA';

  return (
    <div className="flex min-h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header />
        <div className="p-4 space-y-4">

          {/* Title */}
          <div className="text-center">
            <h2 className="text-slate-900 text-lg font-black">VFSTR :: Vadlamudi</h2>
            <p className="text-slate-600 text-sm font-semibold">B.Tech, Computer Science & Engineering, III Year - II Semester, 19 Section</p>
            <p className="text-slate-500 text-xs">Attendance report from 22-12-2025 to 09-03-2026</p>
          </div>

          {/* Main attendance table */}
          <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  {/* Header row 1 */}
                  <tr className="bg-slate-800 text-white">
                    <th className="border border-slate-600 px-2 py-2 text-center w-6">Sl.</th>
                    <th className="border border-slate-600 px-2 py-2 text-center w-24">REGD.NO</th>
                    <th className="border border-slate-600 px-2 py-2 text-center w-32">NAME</th>
                    {subjectCols.map(s => (
                      <th key={s.code} className="border border-slate-600 px-1 py-2 text-center min-w-[52px]">{s.code}</th>
                    ))}
                    <th className="border border-slate-600 px-2 py-2 text-center w-16">TOTAL %</th>
                  </tr>
                  {/* Conducted hours row */}
                  <tr className="bg-slate-100">
                    <td className="border border-slate-300 px-1 py-1 text-center text-slate-500" colSpan={3}>
                      <span className="font-semibold text-slate-700">No. Of Conducted Hours -&gt;</span>
                    </td>
                    {subjectCols.map(s => (
                      <td key={s.code} className="border border-slate-300 px-1 py-1 text-center font-semibold text-slate-700">
                        {conductedHours[s.code]}
                      </td>
                    ))}
                    <td className="border border-slate-300 px-1 py-1"></td>
                  </tr>
                  {/* Student row with attended/pct */}
                  <tr className="bg-white">
                    <td className="border border-slate-300 px-1 py-2 text-center font-bold">1</td>
                    <td className="border border-slate-300 px-2 py-2 text-center font-bold text-blue-700">{regNo}</td>
                    <td className="border border-slate-300 px-2 py-2 font-bold text-slate-900">{studentName}</td>
                    {subjectCols.map(s => {
                      const info = attendedInfo[s.code];
                      return (
                        <td key={s.code} className="border border-slate-300 px-1 py-1 text-center">
                          <div className="text-slate-700">{info.attended !== '-' ? `${info.attended}(${conductedHours[s.code]})` : '-'}</div>
                          <div className={pctColor(info.pct)}>{info.pct !== null ? info.pct : '-'}</div>
                        </td>
                      );
                    })}
                    <td className="border border-slate-300 px-1 py-2 text-center font-black text-blue-700 text-sm">{overall}%</td>
                  </tr>
                </thead>

                {/* Day & Period wise section header */}
                <tbody>
                  <tr className="bg-slate-700 text-white">
                    <td colSpan={3} className="border border-slate-600 px-2 py-1.5 text-center font-bold text-xs">Date</td>
                    <td colSpan={subjectCols.length + 1} className="border border-slate-600 px-2 py-1.5 text-center font-bold text-xs">
                      Day & Period wise Attendance
                    </td>
                  </tr>

                  {/* Day rows */}
                  {dayWise.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="border border-slate-200 px-1 py-1 text-center text-slate-500" colSpan={3}>{row.date}</td>
                      {subjectCols.map(s => {
                        const v = row.data[s.code];
                        return (
                          <td key={s.code} className="border border-slate-200 px-1 py-1 text-center">
                            {v ? (
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-black ${cellColor(v)}`}>
                                {v}
                              </span>
                            ) : (
                              <span className="text-slate-200">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="border border-slate-200 px-1 py-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Download button */}
          <div className="flex justify-end">
            <button onClick={() => downloadCSV(student, dayWise, subjectCols)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="size-4" />
              Download CSV
            </button>
          </div>

          {/* Subject summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {subjectCols.filter(s => attendedInfo[s.code].pct !== null).map((s, i) => {
              const info = attendedInfo[s.code];
              const pct = info.pct;
              const barColor = pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-blue-500' : 'bg-red-500';
              const textColor = pct >= 90 ? 'text-emerald-700' : pct >= 75 ? 'text-blue-700' : 'text-red-600';
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-slate-700 text-xs font-bold">{s.code}</span>
                    <span className={`text-xs font-black ${textColor}`}>{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: pct + '%' }} />
                  </div>
                  <p className="text-slate-400 text-[10px]">{info.attended}/{conductedHours[s.code]} classes</p>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}