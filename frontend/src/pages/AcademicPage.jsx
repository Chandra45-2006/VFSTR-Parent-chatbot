import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { academicAPI } from "../lib/api.js";
import { Header } from "../components/Header.jsx";
import { TrendingUp, CalendarCheck, AlertCircle, ChevronUp, BookOpen } from "lucide-react";

const sgpaData = [
  { label: "I Year - I Sem", value: 8.05, credits: 20, month: "DECEMBER-2023", status: "PASSED" },
  { label: "I Year - II Sem", value: 7.35, credits: 23, month: "MAY-2024", status: "PASSED" },
  { label: "II Year - I Sem", value: 7.56, credits: 24, month: "NOVEMBER-2024", status: "PASSED" },
  { label: "II Year - II Sem", value: 7.72, credits: 21, month: "APRIL-2025", status: "PASSED" },
  { label: "III Year - I Sem", value: 7.98, credits: 22, month: "NOVEMBER-2025", status: "PASSED" },
];

const semesterDetails = {
  "I Year - I Sem": [
    { sno: 1, code: "22CS103", name: "IT WORKSHOP & TOOLS", cr: 3, lg: "A", gp: 8.01, month: "DECEMBER-2023" },
    { sno: 2, code: "22EE101", name: "BASICS OF ELECTRICAL & ELECTRONICS ENGINEERING", cr: 3, lg: "A", gp: 7.86, month: "DECEMBER-2023" },
    { sno: 3, code: "22EN102", name: "ENGLISH PROFICIENCY & COMMUNICATION SKILLS", cr: 1, lg: "A", gp: 7.81, month: "DECEMBER-2023" },
    { sno: 4, code: "22ME101", name: "ENGINEERING GRAPHICS", cr: 3, lg: "A", gp: 8.17, month: "DECEMBER-2023" },
    { sno: 5, code: "22MT102", name: "LINEAR ALGEBRA", cr: 4, lg: "S", gp: 8.63, month: "DECEMBER-2023" },
    { sno: 6, code: "22SA101", name: "PHYSICAL FITNESS, SPORTS & GAMES-I*", cr: 1, lg: "--", gp: "--", month: "DECEMBER-2023" },
    { sno: 7, code: "22TP101", name: "CONSTITUTION OF INDIA*", cr: 1, lg: "--", gp: "--", month: "DECEMBER-2023" },
    { sno: 8, code: "22TP103", name: "PROGRAMMING IN C", cr: 4, lg: "A", gp: 7.61, month: "DECEMBER-2023" },
  ],
  "I Year - II Sem": [
    { sno: 1, code: "22CS104", name: "PYTHON PROGRAMMING", cr: 3, lg: "A", gp: 7.61, month: "MAY-2024" },
    { sno: 2, code: "22EN104", name: "TECHNICAL ENGLISH COMMUNICATION", cr: 3, lg: "A", gp: 7.84, month: "MAY-2024" },
    { sno: 3, code: "22MT107", name: "DISCRETE MATHEMATICAL STRUCTURES", cr: 3, lg: "B", gp: 6.54, month: "MAY-2024" },
    { sno: 4, code: "22MT115", name: "CALCULUS", cr: 4, lg: "A", gp: 7.58, month: "MAY-2024" },
    { sno: 5, code: "22PY105", name: "SEMICONDUCTOR PHYSICS & ELECTROMAGNETICS", cr: 3, lg: "A", gp: 7.2, month: "MAY-2024" },
    { sno: 6, code: "22SA102", name: "ORIENTATION SESSION*", cr: 3, lg: "--", gp: "--", month: "MAY-2024" },
    { sno: 7, code: "22SA103", name: "PHYSICAL FITNESS, SPORTS & GAMES-II*", cr: 1, lg: "--", gp: "--", month: "MAY-2024" },
    { sno: 8, code: "22TP106", name: "PROBLEM SOLVING THROUGH PROGRAMMING-II", cr: 3, lg: "B", gp: 6.84, month: "MAY-2024" },
  ],
  "II Year - I Sem": [
    { sno: 1, code: "22CS201", name: "DATABASE MANAGEMENT SYSTEMS", cr: 4, lg: "B", gp: 6.6, month: "NOVEMBER-2024" },
    { sno: 2, code: "22CS202", name: "DIGITAL LOGIC DESIGN", cr: 3, lg: "A", gp: 8.07, month: "NOVEMBER-2024" },
    { sno: 3, code: "22CS203", name: "OBJECT ORIENTED PROGRAMMING THROUGH JAVA", cr: 4, lg: "A", gp: 7.12, month: "NOVEMBER-2024" },
    { sno: 4, code: "22CT201", name: "ENVIRONMENTAL STUDIES", cr: 1, lg: "A", gp: 7.28, month: "NOVEMBER-2024" },
    { sno: 5, code: "22MS201", name: "MANAGEMENT SCIENCE", cr: 3, lg: "A", gp: 7.67, month: "NOVEMBER-2024" },
    { sno: 6, code: "22SA212", name: "FRENCH*", cr: 1, lg: "--", gp: "--", month: "NOVEMBER-2024" },
    { sno: 7, code: "22ST202", name: "PROBABILITY & STATISTICS", cr: 4, lg: "A", gp: 7.69, month: "NOVEMBER-2024" },
    { sno: 8, code: "22TP201", name: "DATA STRUCTURES", cr: 4, lg: "A", gp: 8.0, month: "NOVEMBER-2024" },
  ],
  "II Year - II Sem": [
    { sno: 1, code: "22CS205", name: "COMPUTER ORGANIZATION & ARCHITECTURE", cr: 3, lg: "A", gp: 7.77, month: "APRIL-2025" },
    { sno: 2, code: "22CS206", name: "DESIGN & ANALYSIS OF ALGORITHMS", cr: 4, lg: "A", gp: 7.3, month: "APRIL-2025" },
    { sno: 3, code: "22CS207", name: "OPERATING SYSTEMS", cr: 3, lg: "A", gp: 7.71, month: "APRIL-2025" },
    { sno: 4, code: "22CS208", name: "THEORY OF COMPUTATION", cr: 4, lg: "S", gp: 8.52, month: "APRIL-2025" },
    { sno: 5, code: "22CS960", name: "COMPETITIVE CODING (H*)", cr: 4, lg: "B", gp: 6.82, month: "APRIL-2025" },
    { sno: 6, code: "22TP204", name: "PROFESSIONAL COMMUNICATION", cr: 1, lg: "A", gp: 7.22, month: "APRIL-2025" },
    { sno: 7, code: "22TP205", name: "FRONT-END APPLICATION DEVELOPMENT", cr: 1, lg: "A", gp: 8.28, month: "APRIL-2025" },
    { sno: 8, code: "24CS201", name: "FIELD PROJECTS", cr: 1, lg: "A", gp: 7.39, month: "APRIL-2025" },
  ],
  "III Year - I Sem": [
    { sno: 1, code: "22CS301", name: "INTRODUCTION TO ARTIFICIAL INTELLIGENCE", cr: 3, lg: "A", gp: 7.19, month: "NOVEMBER-2025" },
    { sno: 2, code: "22CS306", name: "DATA MINING TECHNIQUES", cr: 3, lg: "A", gp: 7.9, month: "NOVEMBER-2025" },
    { sno: 3, code: "22CS312", name: "COMPILER DESIGN", cr: 3, lg: "S", gp: 8.51, month: "NOVEMBER-2025" },
    { sno: 4, code: "22CS313", name: "WEB TECHNOLOGIES", cr: 1, lg: "S", gp: 8.67, month: "NOVEMBER-2025" },
    { sno: 5, code: "22CS314", name: "COMPUTER NETWORKS", cr: 3, lg: "A", gp: 8.47, month: "NOVEMBER-2025" },
    { sno: 6, code: "22CS806", name: "MACHINE LEARNING", cr: 4, lg: "A", gp: 7.83, month: "NOVEMBER-2025" },
    { sno: 7, code: "22CS961", name: "FULL STACK DEVELOPMENT (H*)", cr: 4, lg: "B", gp: 6.71, month: "NOVEMBER-2025" },
    { sno: 8, code: "22TP301", name: "SOFT SKILLS LAB", cr: 1, lg: "A", gp: 8.4, month: "NOVEMBER-2025" },
  ],
};

const gradeColor = (lg) => {
  if (lg === "S") return "bg-violet-50 text-violet-700 border-violet-200";
  if (lg === "A") return "bg-blue-50 text-blue-700 border-blue-200";
  if (lg === "B") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-500 border-slate-200";
};

export default function AcademicPage() {
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const [acadData, setAcadData] = useState(null);

  useEffect(() => {
    if (student?.regNo) {
      academicAPI.get(student.regNo)
        .then(res => setAcadData(res.data))
        .catch(() => setAcadData(null));
    }
  }, []);

  const cgpa = acadData?.cgpa || 7.68;
  const regNo = student?.regNo || '231FA04268';
  const studentName = student?.name || 'GADDAM NAGA SURYA';
  const [selectedSem, setSelectedSem] = useState("III Year - I Sem");

  return (
    <div className="flex h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Academic Performance</h1>
            <p className="text-slate-500 text-sm mt-0.5">B.Tech Computer Science & Engineering</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Current CGPA", value: String(cgpa), sub: "+0.26 from last sem", icon: TrendingUp, positive: true },
              { label: "Avg Attendance", value: "87%", icon: CalendarCheck },
              { label: "Active Backlogs", value: "0", sub: "All subjects cleared", icon: AlertCircle },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{c.label}</span>
                  <div className="bg-blue-50 p-2 rounded-xl"><c.icon className="size-4 text-blue-600" /></div>
                </div>
                <p className="text-3xl font-bold text-slate-900">{c.value}</p>
                {c.sub && (
                  <p className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${c.positive ? "text-emerald-600" : "text-slate-500"}`}>
                    {c.positive && <ChevronUp className="size-3" />}{c.sub}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Semester Overview Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-blue-600" />
                <h2 className="font-semibold text-slate-900">Semester-wise Performance</h2>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">CGPA: {cgpa}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Semester</th>
                    <th className="text-center px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">SGPA</th>
                    <th className="text-center px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Credits</th>
                    <th className="text-center px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Month & Year</th>
                    <th className="text-center px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Status</th>
                    <th className="text-center px-5 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {sgpaData.map((item, i) => (
                    <tr key={i} className={`border-b border-slate-100 transition-colors ${selectedSem === item.label ? "bg-blue-50/40" : "hover:bg-slate-50"}`}>
                      <td className="px-5 py-3.5 font-semibold text-slate-900">{item.label}</td>
                      <td className="px-5 py-3.5 text-center font-bold text-blue-600 text-base">{item.value}</td>
                      <td className="px-5 py-3.5 text-center text-slate-600">{item.credits}</td>
                      <td className="px-5 py-3.5 text-center text-slate-500 text-xs">{item.month}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">{item.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button onClick={() => setSelectedSem(item.label)}
                          className="text-blue-600 hover:underline text-xs font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Grades */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">{selectedSem} — Subject-wise Grades</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-center px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">S.No</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Subject Code</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Subject Name</th>
                    <th className="text-center px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">CR</th>
                    <th className="text-center px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">LG</th>
                    <th className="text-center px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">GP</th>
                    <th className="text-center px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wide">Month & Year</th>
                  </tr>
                </thead>
                <tbody>
                  {semesterDetails[selectedSem].map((item) => (
                    <tr key={item.sno} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3.5 text-center text-slate-400 text-xs">{item.sno}</td>
                      <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">{item.code}</td>
                      <td className="px-4 py-3.5 text-slate-900 font-medium">{item.name}</td>
                      <td className="px-4 py-3.5 text-center text-slate-700 font-semibold">{item.cr}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${gradeColor(item.lg)}`}>{item.lg}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center font-semibold text-slate-700">{item.gp}</td>
                      <td className="px-4 py-3.5 text-center text-slate-400 text-xs">{item.month}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}


