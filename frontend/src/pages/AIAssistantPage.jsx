import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";
import { Send, Bot, User, Sparkles, Globe } from "lucide-react";
import { cn } from "../lib/utils.js";
import { attendanceAPI, academicAPI, feesAPI, examsAPI } from "../lib/api.js";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "te", label: "Telugu" },
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
  { code: "sd", label: "Sindhi" },
];

const SUGGESTIONS = {
  en: ["What is my child's CGPA?", "Show attendance summary", "Check pending fees", "Show exam marks"],
  te: ["నా పిల్లల CGPA ఎంత?", "హాజరు వివరాలు చూపించు", "పెండింగ్ ఫీజులు చెక్ చేయి", "పరీక్ష మార్కులు చూపించు"],
  hi: ["मेरे बच्चे का CGPA क्या है?", "उपस्थिति सारांश दिखाएं", "बकाया फीस जांचें", "परीक्षा अंक दिखाएं"],
  ta: ["என் குழந்தையின் CGPA என்ன?", "வருகை சுருக்கம் காட்டு", "நிலுவை கட்டணம் சரிபார்", "தேர்வு மதிப்பெண்கள் காட்டு"],
  sd: ["منهنجي ٻار جو CGPA ڇا آهي؟", "حاضري خلاصو ڏيکاريو", "باقي في چيڪ ڪريو", "امتحان نمبر ڏيکاريو"],
};

function getReply(q, lang, data) {
  const { student, attendance, academic, fees, exams } = data;
  const name = student ? (student.name || student.studentName || "your child") : "your child";
  const ql = q.toLowerCase();

  const isCgpa = ql.includes("cgpa") || ql.includes("gpa") || ql.includes("grade") || ql.includes("గ్రేడ్") || ql.includes("ग्रेड");
  const isAtt = ql.includes("attend") || ql.includes("హాజరు") || ql.includes("उपस्थिति") || ql.includes("வருகை") || ql.includes("حاضري");
  const isFee = ql.includes("fee") || ql.includes("ఫీజు") || ql.includes("फीस") || ql.includes("கட்டண") || ql.includes("في");
  const isExam = ql.includes("exam") || ql.includes("mark") || ql.includes("పరీక్ష") || ql.includes("परीक्षा") || ql.includes("தேர்வு") || ql.includes("امتحان");
  const isAcad = ql.includes("academic") || ql.includes("semester") || ql.includes("sgpa") || ql.includes("history") || ql.includes("సెమిస్టర్");
  const isHi = ql.includes("hello") || ql.includes("hi") || ql.includes("నమస్కారం") || ql.includes("नमस्ते") || ql.includes("வணக்கம்");

  const cgpa = student ? student.cgpa : null;
  const lastSem = academic && academic.length ? academic[academic.length - 1] : null;
  const lowAtt = attendance ? attendance.filter(a => a.percentage < 75) : [];

  if (lang === "te") {
    if (isHi) return `నమస్కారం! నేను ${name} ఖాతా కోసం VFSTR అసిస్టెంట్. హాజరు, CGPA, ఫీజులు గురించి అడగండి.`;
    if (isCgpa) return cgpa ? `${name} యొక్క ప్రస్తుత CGPA ${cgpa}. ${lastSem ? "చివరి సెమిస్టర్ (సెమ్ " + lastSem.semester + ") SGPA: " + lastSem.sgpa + "." : ""}` : `${name} కోసం CGPA డేటా లేదు.`;
    if (isAtt) return attendance && attendance.length ? `${name} హాజరు వివరాలు:\n${attendance.map(a => "• " + a.subject + ": " + a.percentage + "%").join("\n")}${lowAtt.length ? "\n⚠️ తక్కువ హాజరు: " + lowAtt.map(a => a.subject).join(", ") : "\n✅ అన్ని సబ్జెక్టులు 75% పైన."}` : `${name} కోసం హాజరు డేటా లేదు.`;
    if (isFee) return fees ? `${name} ఫీజు వివరాలు:\n• మొత్తం: ₹${fees.totalFee ? fees.totalFee.toLocaleString() : 0}\n• చెల్లించారు: ₹${fees.paidFee ? fees.paidFee.toLocaleString() : 0}\n• బాకీ: ₹${fees.dueFee ? fees.dueFee.toLocaleString() : 0}${fees.dueFee > 0 ? "\n⚠️ బాకీ ఫీజు చెల్లించండి." : "\n✅ అన్ని ఫీజులు క్లియర్."}` : `${name} కోసం ఫీజు డేటా లేదు.`;
    if (isExam) return exams && exams.length ? `${name} పరీక్ష మార్కులు:\n${exams.map(e => "• " + e.subject + " — మిడ్: " + e.midMarks + ", ఫైనల్: " + e.finalMarks + (e.labMarks ? ", లాబ్: " + e.labMarks : "")).join("\n")}` : `${name} కోసం పరీక్ష డేటా లేదు.`;
    if (isAcad) return academic && academic.length ? `${name} అకడమిక్ చరిత్ర:\n${academic.map(a => "• సెమ్ " + a.semester + ": SGPA " + a.sgpa + ", CGPA " + a.cgpa).join("\n")}` : `${name} కోసం అకడమిక్ రికార్డులు లేవు.`;
    return `నేను ${name} యొక్క హాజరు, CGPA, ఫీజు మరియు పరీక్ష మార్కుల గురించి సహాయం చేయగలను. దయచేసి నిర్దిష్ట ప్రశ్న అడగండి.`;
  }

  if (lang === "hi") {
    if (isHi) return `नमस्ते! मैं ${name} के खाते के लिए VFSTR सहायक हूं। उपस्थिति, CGPA, फीस के बारे में पूछें।`;
    if (isCgpa) return cgpa ? `${name} का वर्तमान CGPA ${cgpa} है। ${lastSem ? "अंतिम सेमेस्टर (सेम " + lastSem.semester + ") SGPA: " + lastSem.sgpa + "." : ""}` : `${name} के लिए CGPA डेटा नहीं।`;
    if (isAtt) return attendance && attendance.length ? `${name} की उपस्थिति:\n${attendance.map(a => "• " + a.subject + ": " + a.percentage + "%").join("\n")}${lowAtt.length ? "\n⚠️ कम उपस्थिति: " + lowAtt.map(a => a.subject).join(", ") : "\n✅ सभी विषयों में 75% से अधिक।"}` : `${name} के लिए उपस्थिति डेटा नहीं।`;
    if (isFee) return fees ? `${name} की फीस:\n• कुल: ₹${fees.totalFee ? fees.totalFee.toLocaleString() : 0}\n• भुगतान: ₹${fees.paidFee ? fees.paidFee.toLocaleString() : 0}\n• बकाया: ₹${fees.dueFee ? fees.dueFee.toLocaleString() : 0}${fees.dueFee > 0 ? "\n⚠️ बकाया फीस जमा करें।" : "\n✅ सभी फीस क्लियर।"}` : `${name} के लिए फीस डेटा नहीं।`;
    if (isExam) return exams && exams.length ? `${name} के परीक्षा अंक:\n${exams.map(e => "• " + e.subject + " — मिड: " + e.midMarks + ", फाइनल: " + e.finalMarks + (e.labMarks ? ", लैब: " + e.labMarks : "")).join("\n")}` : `${name} के लिए परीक्षा डेटा नहीं।`;
    if (isAcad) return academic && academic.length ? `${name} का अकादमिक इतिहास:\n${academic.map(a => "• सेम " + a.semester + ": SGPA " + a.sgpa + ", CGPA " + a.cgpa).join("\n")}` : `${name} के लिए अकादमिक रिकॉर्ड नहीं।`;
    return `मैं ${name} की उपस्थिति, CGPA, फीस और परीक्षा अंकों में मदद कर सकता हूं।`;
  }

  if (lang === "ta") {
    if (isHi) return `வணக்கம்! நான் ${name} கணக்கிற்கான VFSTR உதவியாளர். வருகை, CGPA, கட்டணம் பற்றி கேளுங்கள்.`;
    if (isCgpa) return cgpa ? `${name} இன் தற்போதைய CGPA ${cgpa}. ${lastSem ? "கடைசி செமஸ்டர் (செம் " + lastSem.semester + ") SGPA: " + lastSem.sgpa + "." : ""}` : `${name} க்கான CGPA தரவு இல்லை.`;
    if (isAtt) return attendance && attendance.length ? `${name} வருகை:\n${attendance.map(a => "• " + a.subject + ": " + a.percentage + "%").join("\n")}${lowAtt.length ? "\n⚠️ குறைந்த வருகை: " + lowAtt.map(a => a.subject).join(", ") : "\n✅ அனைத்தும் 75% மேல்."}` : `${name} க்கான வருகை தரவு இல்லை.`;
    if (isFee) return fees ? `${name} கட்டணம்:\n• மொத்தம்: ₹${fees.totalFee ? fees.totalFee.toLocaleString() : 0}\n• செலுத்தியது: ₹${fees.paidFee ? fees.paidFee.toLocaleString() : 0}\n• நிலுவை: ₹${fees.dueFee ? fees.dueFee.toLocaleString() : 0}${fees.dueFee > 0 ? "\n⚠️ நிலுவை செலுத்துங்கள்." : "\n✅ அனைத்தும் செலுத்தப்பட்டன."}` : `${name} க்கான கட்டண தரவு இல்லை.`;
    if (isExam) return exams && exams.length ? `${name} தேர்வு மதிப்பெண்கள்:\n${exams.map(e => "• " + e.subject + " — மிட்: " + e.midMarks + ", இறுதி: " + e.finalMarks + (e.labMarks ? ", லேப்: " + e.labMarks : "")).join("\n")}` : `${name} க்கான தேர்வு தரவு இல்லை.`;
    if (isAcad) return academic && academic.length ? `${name} கல்வி வரலாறு:\n${academic.map(a => "• செம் " + a.semester + ": SGPA " + a.sgpa + ", CGPA " + a.cgpa).join("\n")}` : `${name} க்கான கல்வி பதிவுகள் இல்லை.`;
    return `நான் ${name} இன் வருகை, CGPA, கட்டணம் மற்றும் தேர்வு மதிப்பெண்களில் உதவ முடியும்.`;
  }

  if (lang === "sd") {
    if (isHi) return `السلام عليڪم! آئون ${name} جي اڪائونٽ لاءِ VFSTR مددگار آهيان.`;
    if (isCgpa) return cgpa ? `${name} جو CGPA ${cgpa} آهي. ${lastSem ? "آخري سيمسٽر SGPA: " + lastSem.sgpa + "." : ""}` : `${name} لاءِ CGPA ڊيٽا نه مليو.`;
    if (isAtt) return attendance && attendance.length ? `${name} حاضري:\n${attendance.map(a => "• " + a.subject + ": " + a.percentage + "%").join("\n")}` : `${name} لاءِ حاضري ڊيٽا نه مليو.`;
    if (isFee) return fees ? `${name} في:\n• ڪل: ₹${fees.totalFee ? fees.totalFee.toLocaleString() : 0}\n• ادا: ₹${fees.paidFee ? fees.paidFee.toLocaleString() : 0}\n• باقي: ₹${fees.dueFee ? fees.dueFee.toLocaleString() : 0}` : `${name} لاءِ في ڊيٽا نه مليو.`;
    if (isExam) return exams && exams.length ? `${name} امتحان نمبر:\n${exams.map(e => "• " + e.subject + " مڊ: " + e.midMarks + ", فائنل: " + e.finalMarks).join("\n")}` : `${name} لاءِ امتحان ڊيٽا نه مليو.`;
    if (isAcad) return academic && academic.length ? `${name} تعليمي تاريخ:\n${academic.map(a => "• سيم " + a.semester + ": SGPA " + a.sgpa).join("\n")}` : `${name} لاءِ تعليمي رڪارڊ نه مليا.`;
    return `آئون ${name} جي حاضري، CGPA، في ۽ امتحان نمبرن ۾ مدد ڪري سگهان ٿو.`;
  }

  // English (default)
  if (isHi) return `Hello! I am the VFSTR Academic Assistant for ${name}'s account. Ask me about attendance, CGPA, fees, or exam marks.`;
  if (isCgpa) return cgpa ? `${name}'s current CGPA is ${cgpa}. ${lastSem ? "Latest semester (Sem " + lastSem.semester + ") SGPA: " + lastSem.sgpa + "." : ""}` : `No CGPA data found for ${name}.`;
  if (isAtt) return attendance && attendance.length ? `Attendance for ${name}:\n${attendance.map(a => "• " + a.subject + ": " + a.percentage + "%").join("\n")}${lowAtt.length ? "\n⚠️ Low attendance in: " + lowAtt.map(a => a.subject).join(", ") + "." : "\n✅ All subjects above 75%."}` : `No attendance data found for ${name}.`;
  if (isFee) return fees ? `Fee details for ${name}:\n• Total: ₹${fees.totalFee ? fees.totalFee.toLocaleString() : 0}\n• Paid: ₹${fees.paidFee ? fees.paidFee.toLocaleString() : 0}\n• Due: ₹${fees.dueFee ? fees.dueFee.toLocaleString() : 0}${fees.dueFee > 0 ? "\n⚠️ Please clear pending dues." : "\n✅ All fees cleared."}` : `No fee data found for ${name}.`;
  if (isExam) return exams && exams.length ? `Exam marks for ${name}:\n${exams.map(e => "• " + e.subject + " — Mid: " + e.midMarks + ", Final: " + e.finalMarks + (e.labMarks ? ", Lab: " + e.labMarks : "")).join("\n")}` : `No exam data found for ${name}.`;
  if (isAcad) return academic && academic.length ? `Academic history for ${name}:\n${academic.map(a => "• Sem " + a.semester + ": SGPA " + a.sgpa + ", CGPA " + a.cgpa).join("\n")}` : `No academic records found for ${name}.`;
  return `I can help with ${name}'s attendance, CGPA, fee details, and exam marks. Try asking: "What is the CGPA?" or "Show attendance".`;
}

export default function AIAssistantPage() {
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ student: null, attendance: null, academic: null, fees: null, exams: null });
  const messagesEndRef = useRef(null);

  const student = JSON.parse(localStorage.getItem("student") || "null");

  // Load greeting when lang changes
  useEffect(() => {
    const n = student ? (student.name || student.studentName || "your child") : "your child";
    const greet = {
      en: `Hello! I am the VFSTR Academic Assistant for ${n}'s account. Ask me about attendance, CGPA, fees, or exam marks.`,
      te: `నమస్కారం! నేను ${n} ఖాతా కోసం VFSTR అకడమిక్ అసిస్టెంట్. హాజరు, CGPA, ఫీజులు గురించి అడగండి.`,
      hi: `नमस्ते! मैं ${n} के खाते के लिए VFSTR अकादमिक सहायक हूं। उपस्थिति, CGPA, फीस के बारे में पूछें।`,
      ta: `வணக்கம்! நான் ${n} கணக்கிற்கான VFSTR கல்வி உதவியாளர். வருகை, CGPA, கட்டணம் பற்றி கேளுங்கள்.`,
      sd: `السلام عليڪم! آئون ${n} جي اڪائونٽ لاءِ VFSTR مددگار آهيان.`,
    };
    setMessages([{ role: "assistant", content: greet[lang] || greet.en, timestamp: new Date() }]);
  }, [lang]);

  // Load student data from API once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setData(d => ({ ...d, student })); return; }
    Promise.all([
      attendanceAPI.get().catch(() => ({ data: [] })),
      academicAPI.get().catch(() => ({ data: [] })),
      feesAPI.get().catch(() => ({ data: null })),
      examsAPI.get().catch(() => ({ data: [] })),
    ]).then(([att, acad, fee, exam]) => {
      setData({ student, attendance: att.data, academic: acad.data, fees: fee.data, exams: exam.data });
    }).catch(() => {
      setData({ student, attendance: [], academic: [], fees: null, exams: [] });
    });
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;
    const userMsg = { role: "user", content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      try {
        const reply = getReply(msg, lang, data);
        setMessages(prev => [...prev, { role: "assistant", content: reply, timestamp: new Date() }]);
      } catch (e) {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: new Date() }]);
      }
      setIsLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const suggestions = SUGGESTIONS[lang] || SUGGESTIONS.en;
  const studentName = student ? (student.name || student.studentName || "your child") : "your child";

  return (
    <div className="flex h-screen bg-[#f5f6f8]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col overflow-hidden">
        <Header />

        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2 flex-wrap">
            <Globe className="size-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500 font-medium">Language:</span>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                className={cn("px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
                  lang === l.code ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600")}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.length === 1 && (
              <div className="text-center py-8">
                <div className="size-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="size-7 text-blue-600" />
                </div>
                <h2 className="text-slate-900 font-bold text-xl mb-1">VFSTR AI Assistant</h2>
                <p className="text-slate-500 text-sm">Asking about <span className="font-semibold text-slate-700">{studentName}</span>'s academic progress</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
                <div className={cn("size-8 rounded-xl flex items-center justify-center flex-shrink-0 border",
                  msg.role === "assistant" ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-200 border-slate-300 text-slate-600")}>
                  {msg.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
                </div>
                <div className={cn("max-w-[80%] space-y-1", msg.role === "user" ? "items-end flex flex-col" : "")}>
                  {msg.role === "assistant" && <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">VFSTR Assistant</p>}
                  <div className={cn("px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                    msg.role === "assistant" ? "bg-white border border-slate-200 text-slate-800 shadow-sm" : "bg-blue-600 text-white")}>
                    {msg.content}
                  </div>
                  <p className="text-[10px] text-slate-400 px-1">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="size-8 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center">
                  <Bot className="size-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex items-center gap-1.5 shadow-sm">
                  {[0, 0.15, 0.3].map((d, i) => <div key={i} className="size-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: d + "s" }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-2">
            <div className="max-w-2xl mx-auto flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-xs hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 pb-5 pt-2">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-400 focus-within:shadow-md transition-all shadow-sm">
              <div className="flex items-center px-4 py-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">VFSTR AI</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-green-400" />
                  <span className="text-slate-400 text-[10px]">Online</span>
                </div>
              </div>
              <div className="flex items-end p-3 gap-2">
                <textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Ask about attendance, CGPA, fees, exams..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 py-1 px-1 resize-none max-h-32" />
                <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
                  className={cn("size-9 rounded-xl flex items-center justify-center transition-all",
                    input.trim() && !isLoading ? "bg-blue-600 text-white hover:bg-blue-500 shadow-sm" : "bg-slate-100 text-slate-400 cursor-not-allowed")}>
                  <Send className="size-4" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Responses are based on {studentName}'s live academic data from VFSTR portal.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
