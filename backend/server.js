require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:3001',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/test', (_, res) => {
  res.json({ message: 'Backend connected to MongoDB Atlas successfully' });
});

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/student',    require('./routes/student'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/exams',      require('./routes/exams'));
app.use('/api/fees',       require('./routes/fees'));
app.use('/api/academic',   require('./routes/academic'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// One-time seed route — protected by secret key
app.get('/api/seed', async (req, res) => {
  if (req.query.secret !== process.env.SEED_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const Student    = require('./models/Student');
    const Attendance = require('./models/Attendance');
    const Exam       = require('./models/Exam');
    const Fee        = require('./models/Fee');
    const Academic   = require('./models/Academic');

    await Student.deleteMany({});
    await Attendance.deleteMany({});
    await Exam.deleteMany({});
    await Fee.deleteMany({});
    await Academic.deleteMany({});

    await Student.create([
      { regNo: '231FA04D90', studentName: 'G.NAGA CHANDRA',   parentName: 'G.SRI HARI BABU',           phone: '8374654918', branch: 'CSE', year: 3, section: 'A', cgpa: 7.71 },
      { regNo: '231FA04268', studentName: 'G.NAGA SURYA',     parentName: 'G.SRI HARI BABU',           phone: '8639319956', branch: 'CSE', year: 3, section: 'B', cgpa: 7.45 },
      { regNo: '231FA04D94', studentName: 'SK.NISSAR AHAMAD', parentName: 'SK.ASHRAFALI',              phone: '9390233652', branch: 'CSE', year: 3, section: 'C', cgpa: 8.50 },
      { regNo: '231FA04406', studentName: 'P.THARUNASRI',     parentName: 'P.GEETA SREENIVASARAO',     phone: '9392682603', branch: 'CSE', year: 3, section: 'C', cgpa: 7.98 },
      { regNo: '231FA04263', studentName: 'D.LOKESH',         parentName: 'D.RAVI KUMAR',              phone: '6302093005', branch: 'CSE', year: 3, section: 'C', cgpa: 7.35 },
      { regNo: '231FA04D52', studentName: 'K.SAI PRANEETH',   parentName: 'K.KRISHNA RAO',             phone: '7013033238', branch: 'CSE', year: 3, section: 'C', cgpa: 7.60 },
    ]);

    const attendanceData = [
      { regNo: '231FA04D90', data: [
        { subject: 'Mathematics for Science',      presentClasses: 45, totalClasses: 50, percentage: 90.00 },
        { subject: 'Mobile App Development',       presentClasses: 62, totalClasses: 66, percentage: 93.94 },
        { subject: 'Computer Networks & Security', presentClasses: 35, totalClasses: 45, percentage: 77.78 },
        { subject: 'Software Engineering',         presentClasses: 52, totalClasses: 60, percentage: 86.67 },
        { subject: 'SE Lab',                       presentClasses: 20, totalClasses: 30, percentage: 66.67 },
      ]},
      { regNo: '231FA04268', data: [
        { subject: 'Machine Learning',             presentClasses: 48, totalClasses: 55, percentage: 87.27 },
        { subject: 'Cloud Computing',              presentClasses: 40, totalClasses: 50, percentage: 80.00 },
        { subject: 'Information Security',         presentClasses: 33, totalClasses: 44, percentage: 75.00 },
        { subject: 'Big Data Analytics',           presentClasses: 55, totalClasses: 60, percentage: 91.67 },
        { subject: 'ML Lab',                       presentClasses: 22, totalClasses: 28, percentage: 78.57 },
      ]},
      { regNo: '231FA04D94', data: [
        { subject: 'Mathematics for Science',      presentClasses: 48, totalClasses: 52, percentage: 92.31 },
        { subject: 'Mobile App Development',       presentClasses: 60, totalClasses: 64, percentage: 93.75 },
        { subject: 'Computer Networks & Security', presentClasses: 42, totalClasses: 46, percentage: 91.30 },
        { subject: 'Software Engineering',         presentClasses: 55, totalClasses: 60, percentage: 91.67 },
        { subject: 'SE Lab',                       presentClasses: 27, totalClasses: 30, percentage: 90.00 },
      ]},
      { regNo: '231FA04406', data: [
        { subject: 'Mathematics for Science',      presentClasses: 47, totalClasses: 52, percentage: 90.38 },
        { subject: 'Mobile App Development',       presentClasses: 58, totalClasses: 64, percentage: 90.63 },
        { subject: 'Computer Networks & Security', presentClasses: 38, totalClasses: 46, percentage: 82.61 },
        { subject: 'Software Engineering',         presentClasses: 50, totalClasses: 58, percentage: 86.21 },
        { subject: 'SE Lab',                       presentClasses: 25, totalClasses: 28, percentage: 89.29 },
      ]},
      { regNo: '231FA04263', data: [
        { subject: 'Mathematics for Science',      presentClasses: 42, totalClasses: 52, percentage: 80.77 },
        { subject: 'Mobile App Development',       presentClasses: 55, totalClasses: 64, percentage: 85.94 },
        { subject: 'Computer Networks & Security', presentClasses: 32, totalClasses: 46, percentage: 69.57 },
        { subject: 'Software Engineering',         presentClasses: 48, totalClasses: 58, percentage: 82.76 },
        { subject: 'SE Lab',                       presentClasses: 22, totalClasses: 30, percentage: 73.33 },
      ]},
      { regNo: '231FA04D52', data: [
        { subject: 'Mathematics for Science',      presentClasses: 46, totalClasses: 52, percentage: 88.46 },
        { subject: 'Mobile App Development',       presentClasses: 58, totalClasses: 64, percentage: 90.63 },
        { subject: 'Computer Networks & Security', presentClasses: 36, totalClasses: 46, percentage: 78.26 },
        { subject: 'Software Engineering',         presentClasses: 50, totalClasses: 58, percentage: 86.21 },
        { subject: 'SE Lab',                       presentClasses: 25, totalClasses: 30, percentage: 83.33 },
      ]},
    ];
    for (const s of attendanceData) {
      await Attendance.create(s.data.map(d => ({ regNo: s.regNo, ...d })));
    }

    const examData = [
      { regNo: '231FA04D90', data: [
        { subject: 'Mathematics for Science',      midMarks: 18, labMarks: 0,  finalMarks: 72 },
        { subject: 'Mobile App Development',       midMarks: 22, labMarks: 0,  finalMarks: 84 },
        { subject: 'Computer Networks & Security', midMarks: 16, labMarks: 0,  finalMarks: 68 },
        { subject: 'Software Engineering',         midMarks: 24, labMarks: 0,  finalMarks: 91 },
        { subject: 'SE Lab',                       midMarks: 0,  labMarks: 38, finalMarks: 0  },
      ]},
      { regNo: '231FA04268', data: [
        { subject: 'Machine Learning',             midMarks: 20, labMarks: 0,  finalMarks: 76 },
        { subject: 'Cloud Computing',              midMarks: 17, labMarks: 0,  finalMarks: 70 },
        { subject: 'Information Security',         midMarks: 15, labMarks: 0,  finalMarks: 65 },
        { subject: 'Big Data Analytics',           midMarks: 23, labMarks: 0,  finalMarks: 88 },
        { subject: 'ML Lab',                       midMarks: 0,  labMarks: 36, finalMarks: 0  },
      ]},
      { regNo: '231FA04D94', data: [
        { subject: 'Mathematics for Science',      midMarks: 23, labMarks: 0,  finalMarks: 82 },
        { subject: 'Mobile App Development',       midMarks: 24, labMarks: 0,  finalMarks: 88 },
        { subject: 'Computer Networks & Security', midMarks: 22, labMarks: 0,  finalMarks: 85 },
        { subject: 'Software Engineering',         midMarks: 25, labMarks: 0,  finalMarks: 90 },
        { subject: 'SE Lab',                       midMarks: 0,  labMarks: 44, finalMarks: 0  },
      ]},
      { regNo: '231FA04406', data: [
        { subject: 'Mathematics for Science',      midMarks: 21, labMarks: 0,  finalMarks: 78 },
        { subject: 'Mobile App Development',       midMarks: 22, labMarks: 0,  finalMarks: 80 },
        { subject: 'Computer Networks & Security', midMarks: 19, labMarks: 0,  finalMarks: 74 },
        { subject: 'Software Engineering',         midMarks: 23, labMarks: 0,  finalMarks: 82 },
        { subject: 'SE Lab',                       midMarks: 0,  labMarks: 40, finalMarks: 0  },
      ]},
      { regNo: '231FA04263', data: [
        { subject: 'Mathematics for Science',      midMarks: 16, labMarks: 0,  finalMarks: 65 },
        { subject: 'Mobile App Development',       midMarks: 18, labMarks: 0,  finalMarks: 70 },
        { subject: 'Computer Networks & Security', midMarks: 14, labMarks: 0,  finalMarks: 60 },
        { subject: 'Software Engineering',         midMarks: 17, labMarks: 0,  finalMarks: 68 },
        { subject: 'SE Lab',                       midMarks: 0,  labMarks: 32, finalMarks: 0  },
      ]},
      { regNo: '231FA04D52', data: [
        { subject: 'Mathematics for Science',      midMarks: 19, labMarks: 0,  finalMarks: 74 },
        { subject: 'Mobile App Development',       midMarks: 21, labMarks: 0,  finalMarks: 78 },
        { subject: 'Computer Networks & Security', midMarks: 17, labMarks: 0,  finalMarks: 70 },
        { subject: 'Software Engineering',         midMarks: 20, labMarks: 0,  finalMarks: 76 },
        { subject: 'SE Lab',                       midMarks: 0,  labMarks: 37, finalMarks: 0  },
      ]},
    ];
    for (const s of examData) {
      await Exam.create(s.data.map(d => ({ regNo: s.regNo, ...d })));
    }

    await Fee.create([
      { regNo: '231FA04D90', totalFee: 269100, paidFee: 217100, dueFee: 52000, lastPaymentDate: new Date('2025-08-11') },
      { regNo: '231FA04268', totalFee: 269100, paidFee: 269100, dueFee: 0,     lastPaymentDate: new Date('2025-07-15') },
      { regNo: '231FA04D94', totalFee: 269100, paidFee: 269100, dueFee: 0,     lastPaymentDate: new Date('2025-07-01') },
      { regNo: '231FA04406', totalFee: 269100, paidFee: 200000, dueFee: 69100, lastPaymentDate: new Date('2025-07-20') },
      { regNo: '231FA04263', totalFee: 269100, paidFee: 180000, dueFee: 89100, lastPaymentDate: new Date('2025-07-10') },
      { regNo: '231FA04D52', totalFee: 269100, paidFee: 269100, dueFee: 0,     lastPaymentDate: new Date('2025-06-30') },
    ]);

    await Academic.create([
      { regNo: '231FA04D90', semester: 1, sgpa: 8.05, cgpa: 8.05 },
      { regNo: '231FA04D90', semester: 2, sgpa: 7.35, cgpa: 7.70 },
      { regNo: '231FA04D90', semester: 3, sgpa: 7.56, cgpa: 7.65 },
      { regNo: '231FA04D90', semester: 4, sgpa: 7.72, cgpa: 7.67 },
      { regNo: '231FA04D90', semester: 5, sgpa: 7.98, cgpa: 7.71 },
      { regNo: '231FA04268', semester: 1, sgpa: 7.80, cgpa: 7.80 },
      { regNo: '231FA04268', semester: 2, sgpa: 7.10, cgpa: 7.45 },
      { regNo: '231FA04268', semester: 3, sgpa: 7.30, cgpa: 7.40 },
      { regNo: '231FA04268', semester: 4, sgpa: 7.55, cgpa: 7.44 },
      { regNo: '231FA04268', semester: 5, sgpa: 7.62, cgpa: 7.45 },
      { regNo: '231FA04D94', semester: 1, sgpa: 8.60, cgpa: 8.60 },
      { regNo: '231FA04D94', semester: 2, sgpa: 8.40, cgpa: 8.50 },
      { regNo: '231FA04D94', semester: 3, sgpa: 8.55, cgpa: 8.52 },
      { regNo: '231FA04D94', semester: 4, sgpa: 8.45, cgpa: 8.50 },
      { regNo: '231FA04D94', semester: 5, sgpa: 8.50, cgpa: 8.50 },
      { regNo: '231FA04406', semester: 1, sgpa: 8.10, cgpa: 8.10 },
      { regNo: '231FA04406', semester: 2, sgpa: 7.85, cgpa: 7.98 },
      { regNo: '231FA04406', semester: 3, sgpa: 7.90, cgpa: 7.95 },
      { regNo: '231FA04406', semester: 4, sgpa: 8.00, cgpa: 7.96 },
      { regNo: '231FA04406', semester: 5, sgpa: 7.98, cgpa: 7.98 },
      { regNo: '231FA04263', semester: 1, sgpa: 7.50, cgpa: 7.50 },
      { regNo: '231FA04263', semester: 2, sgpa: 7.20, cgpa: 7.35 },
      { regNo: '231FA04263', semester: 3, sgpa: 7.30, cgpa: 7.33 },
      { regNo: '231FA04263', semester: 4, sgpa: 7.35, cgpa: 7.34 },
      { regNo: '231FA04263', semester: 5, sgpa: 7.35, cgpa: 7.35 },
      { regNo: '231FA04D52', semester: 1, sgpa: 7.70, cgpa: 7.70 },
      { regNo: '231FA04D52', semester: 2, sgpa: 7.50, cgpa: 7.60 },
      { regNo: '231FA04D52', semester: 3, sgpa: 7.55, cgpa: 7.58 },
      { regNo: '231FA04D52', semester: 4, sgpa: 7.60, cgpa: 7.59 },
      { regNo: '231FA04D52', semester: 5, sgpa: 7.60, cgpa: 7.60 },
    ]);

    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
