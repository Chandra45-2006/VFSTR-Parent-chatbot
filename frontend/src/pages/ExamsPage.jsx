import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { examsAPI } from "../lib/api.js";
import { Header } from "../components/Header.jsx";
import {
  FileText, Calendar, CheckCircle, BookOpen, FlaskConical,
  ChevronDown, ChevronUp, ClipboardList, GraduationCap, AlertTriangle
} from "lucide-react";

const subjects = ["MFS", "MAD", "CNS", "SE", "DBMS", "OS"];

const mid1 = [
  { code: "Pre-T1", name: "Pre T1 Test", type: "Objective", date: "Feb 10, 2026", marks: "10", scored: "8", status: "completed" },
  { code: "T1", name: "T1 Written Exam", type: "Written", date: "Feb 22, 2026", marks: "30", scored: "24", status: "completed" },
  { code: "R2", name: "R2 Review", type: "Review", date: "Mar 01, 2026", marks: "10", scored: "9", status: "completed" },
  { code: "T3", name: "T3 Extension (T1 Review)", type: "Written", date: "Mar 08, 2026", marks: "20", scored: "16", status: "completed" },
  { code: "T4", name: "T4 Written Exam", type: "Written", date: "Mar 22, 2026", marks: "30", scored: null, status: "upcoming" },
  { code: "T5", name: "T5 Assignments", type: "Assignment", date: "Mar 28, 2026", marks: "10", scored: null, status: "upcoming" },
];

const mid2 = [
  { code: "Pre-T1", name: "Pre T1 Test", type: "Objective", date: "Apr 10, 2026", marks: "10", scored: null, status: "scheduled" },
  { code: "T1", name: "T1 Written Exam", type: "Written", date: "Apr 22, 2026", marks: "30", scored: null, status: "scheduled" },
  { code: "R2", name: "R2 Review", type: "Review", date: "May 01, 2026", marks: "10", scored: null, status: "scheduled" },
  { code: "T3", name: "T3 Extension (T1 Review)", type: "Written", date: "May 08, 2026", marks: "20", scored: null, status: "scheduled" },
  { code: "T4", name: "T4 Written Exam", type: "Written", date: "May 22, 2026", marks: "30", scored: null, status: "scheduled" },
  { code: "T5", name: "T5 Assignments", type: "Assignment", date: "May 28, 2026", marks: "10", scored: null, status: "scheduled" },
];

const labExams = [
  { subject: "SE Lab", type: "Internal", date: "Jun 05, 2026", marks: "25", scored: null, status: "scheduled" },
  { subject: "SE Lab", type: "External", date: "Jun 12, 2026", marks: "50", scored: null, status: "scheduled" },
  { subject: "MAD Lab", type: "Internal", date: "Jun 06, 2026", marks: "25", scored: null, status: "scheduled" },
  { subject: "MAD Lab", type: "External", date: "Jun 13, 2026", marks: "50", scored: null, status: "scheduled" },
];

const finalExams = [
  { subject: "MFS", date: "Jun 15, 2026", time: "10:00 AM", venue: "Block A - 201", marks: "70", status: "scheduled" },
  { subject: "MAD", date: "Jun 17, 2026", time: "10:00 AM", venue: "Block A - 202", marks: "70", status: "scheduled" },
  { subject: "CNS", date: "Jun 19, 2026", time: "10:00 AM", venue: "Block B - 101", marks: "70", status: "scheduled" },
  { subject: "SE", date: "Jun 21, 2026", time: "10:00 AM", venue: "Block B - 102", marks: "70", status: "scheduled" },
  { subject: "DBMS", date: "Jun 23, 2026", time: "10:00 AM", venue: "Block C - 301", marks: "70", status: "scheduled" },
  { subject: "OS", date: "Jun 25, 2026", time: "10:00 AM", venue: "Block C - 302", marks: "70", status: "scheduled" },
];

const statusBadge = (s) => {
  if (s === "completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "upcoming") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-slate-100 text-slate-500 border-slate-200";
};

const typeBadge = (t) => {
  if (t === "Written") return "bg-violet-50 text-violet-700 border-violet-200";
  if (t === "Objective") return "bg-amber-50 text-amber-700 border-amber-200";
  if (t === "Assignment") return "bg-teal-50 text-teal-700 border-teal-200";
  if (t === "Review") return "bg-pink-50 text-pink-700 border-pink-200";
  return "bg-slate-100 text-slate-500 border-slate-200";
};

function Section({ title, icon: Icon, iconColor, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className={`size-4 ${iconColor}`} />
          <h2 className="font-semibold text-slate-900 text-sm">{title}</h2>
        </div>
        {open ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

function MidTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Component</th>
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Type</th>
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Date</th>
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Max Marks</th>
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Scored</th>
            <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-900 text-sm">{row.code}</p>
                <p className="text-slate-500 text-xs">{row.name}</p>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeBadge(row.type)}`}>{row.type}</span>
              </td>
              <td className="px-4 py-3 text-slate-600 text-sm">{row.date}</td>
              <td className="px-4 py-3 text-slate-700 font-medium text-sm">{row.marks}</td>
              <td className="px-4 py-3">
                {row.scored !== null
                  ? <span className="text-emerald-700 font-semibold text-sm">{row.scored}</span>
                  : <span className="text-slate-400 text-xs">—</span>}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(row.status)}`}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExamsPage() {
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    if (student?.regNo) {
      examsAPI.get(student.regNo)
        .then(res => setExamData(res.data))
        .catch(() => setExamData(null));
    }
  }, []);

  const backlogs = examData?.backlogs ?? 0;
  const completed = mid1.filter(e => e.status === "completed").length;
  const upcoming = mid1.filter(e => e.status === "upcoming").length;

  return (
    <div className="flex h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Exams</h1>
            <p className="text-slate-500 text-sm mt-0.5">Semester 5 · 2025-26 · Full exam schedule and results</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Mid Components Done", value: `${completed}/6`, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
              { label: "Upcoming This Mid", value: `${upcoming}`, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
              { label: "Lab Exams", value: "4", icon: FlaskConical, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
              { label: "Final Exams", value: "6", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
            ].map(({ label, value, icon: Icon, color, bg, border }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
                <div className={`size-11 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                  <Icon className={`size-5 ${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-xs leading-relaxed">
              Carry Hall Ticket and College ID for all exams. Report 15 minutes early. Electronic devices not permitted in exam halls.
            </p>
          </div>

          {/* Mid 1 */}
          <Section title="Mid Semester 1 — Components" icon={ClipboardList} iconColor="text-blue-600" defaultOpen={true}>
            <p className="text-xs text-slate-500 mb-3">Pre-T1 → T1 Written → R2 Review → T3 Extension → T4 Written → T5 Assignments</p>
            <MidTable data={mid1} />
          </Section>

          {/* Mid 2 */}
          <Section title="Mid Semester 2 — Components" icon={ClipboardList} iconColor="text-violet-600" defaultOpen={false}>
            <p className="text-xs text-slate-500 mb-3">Pre-T1 → T1 Written → R2 Review → T3 Extension → T4 Written → T5 Assignments</p>
            <MidTable data={mid2} />
          </Section>

          {/* Lab Exams */}
          <Section title="Lab Exams — Internal & External" icon={FlaskConical} iconColor="text-teal-600" defaultOpen={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Subject</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Type</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Date</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Max Marks</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labExams.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.subject}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${row.type === "Internal" ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.date}</td>
                      <td className="px-4 py-3 text-slate-700 font-medium">{row.marks}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(row.status)}`}>Scheduled</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Final Exams */}
          <Section title="Final Semester Exams" icon={GraduationCap} iconColor="text-amber-600" defaultOpen={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Subject</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Date</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Time</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Venue</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Max Marks</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {finalExams.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.subject}</td>
                      <td className="px-4 py-3 text-slate-600">{row.date}</td>
                      <td className="px-4 py-3 text-slate-600">{row.time}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{row.venue}</td>
                      <td className="px-4 py-3 text-slate-700 font-medium">{row.marks}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-100 text-slate-500 border-slate-200">Scheduled</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </div>
      </main>
    </div>
  );
}

