require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');
const Exam = require('./models/Exam');
const Fee = require('./models/Fee');
const Academic = require('./models/Academic');

async function seed() {
  process.stdout.write('Connecting...\n');
  await mongoose.connect(process.env.MONGO_URI);
  process.stdout.write('Connected. Clearing...\n');
  await Student.deleteMany({});
  await Attendance.deleteMany({});
  await Exam.deleteMany({});
  await Fee.deleteMany({});
  await Academic.deleteMany({});

  // Student 1 - G.NAGA CHANDRA
  const R1 = '232FA04D90';
  await Student.create({ regNo: R1, studentName: 'G.NAGA CHANDRA', parentName: 'G.SRI HARI BABU', phone: '8374654918', branch: 'CSE', year: 3, section: 'A', cgpa: 7.71 });
  await Attendance.create([
    { regNo: R1, subject: 'Mathematics for Science',      presentClasses: 45, totalClasses: 50, percentage: 90.00 },
    { regNo: R1, subject: 'Mobile App Development',       presentClasses: 62, totalClasses: 66, percentage: 93.94 },
    { regNo: R1, subject: 'Computer Networks & Security', presentClasses: 35, totalClasses: 45, percentage: 77.78 },
    { regNo: R1, subject: 'Software Engineering',         presentClasses: 52, totalClasses: 60, percentage: 86.67 },
    { regNo: R1, subject: 'SE Lab',                       presentClasses: 20, totalClasses: 30, percentage: 66.67 },
  ]);
  await Exam.create([
    { regNo: R1, subject: 'Mathematics for Science',      midMarks: 18, labMarks: 0,  finalMarks: 72 },
    { regNo: R1, subject: 'Mobile App Development',       midMarks: 22, labMarks: 0,  finalMarks: 84 },
    { regNo: R1, subject: 'Computer Networks & Security', midMarks: 16, labMarks: 0,  finalMarks: 68 },
    { regNo: R1, subject: 'Software Engineering',         midMarks: 24, labMarks: 0,  finalMarks: 91 },
    { regNo: R1, subject: 'SE Lab',                       midMarks: 0,  labMarks: 38, finalMarks: 0  },
  ]);
  await Fee.create({ regNo: R1, totalFee: 269100, paidFee: 217100, dueFee: 52000, lastPaymentDate: new Date('2025-08-11') });
  await Academic.create([
    { regNo: R1, semester: 1, sgpa: 8.05, cgpa: 8.05 },
    { regNo: R1, semester: 2, sgpa: 7.35, cgpa: 7.70 },
    { regNo: R1, semester: 3, sgpa: 7.56, cgpa: 7.65 },
    { regNo: R1, semester: 4, sgpa: 7.72, cgpa: 7.67 },
    { regNo: R1, semester: 5, sgpa: 7.98, cgpa: 7.71 },
  ]);
  process.stdout.write('Student 1 done.\n');

  // Student 2 - G.NAGA SURYA
  const R2 = '231FA04268';
  await Student.create({ regNo: R2, studentName: 'G.NAGA SURYA', parentName: 'G.SRI HARI BABU', phone: '8639319956', branch: 'CSE', year: 4, section: 'B', cgpa: 7.45 });
  await Attendance.create([
    { regNo: R2, subject: 'Machine Learning',             presentClasses: 48, totalClasses: 55, percentage: 87.27 },
    { regNo: R2, subject: 'Cloud Computing',              presentClasses: 40, totalClasses: 50, percentage: 80.00 },
    { regNo: R2, subject: 'Information Security',         presentClasses: 33, totalClasses: 44, percentage: 75.00 },
    { regNo: R2, subject: 'Big Data Analytics',           presentClasses: 55, totalClasses: 60, percentage: 91.67 },
    { regNo: R2, subject: 'ML Lab',                       presentClasses: 22, totalClasses: 28, percentage: 78.57 },
  ]);
  await Exam.create([
    { regNo: R2, subject: 'Machine Learning',             midMarks: 20, labMarks: 0,  finalMarks: 76 },
    { regNo: R2, subject: 'Cloud Computing',              midMarks: 17, labMarks: 0,  finalMarks: 70 },
    { regNo: R2, subject: 'Information Security',         midMarks: 15, labMarks: 0,  finalMarks: 65 },
    { regNo: R2, subject: 'Big Data Analytics',           midMarks: 23, labMarks: 0,  finalMarks: 88 },
    { regNo: R2, subject: 'ML Lab',                       midMarks: 0,  labMarks: 36, finalMarks: 0  },
  ]);
  await Fee.create({ regNo: R2, totalFee: 269100, paidFee: 269100, dueFee: 0, lastPaymentDate: new Date('2025-07-15') });
  await Academic.create([
    { regNo: R2, semester: 1, sgpa: 7.80, cgpa: 7.80 },
    { regNo: R2, semester: 2, sgpa: 7.10, cgpa: 7.45 },
    { regNo: R2, semester: 3, sgpa: 7.30, cgpa: 7.40 },
    { regNo: R2, semester: 4, sgpa: 7.55, cgpa: 7.44 },
    { regNo: R2, semester: 5, sgpa: 7.62, cgpa: 7.45 },
    { regNo: R2, semester: 6, sgpa: 7.48, cgpa: 7.45 },
  ]);
  process.stdout.write('Student 2 done.\n');

  // Student 3 - K.VENKATA RAMESH
  const R3 = '233FA05112';
  await Student.create({ regNo: R3, studentName: 'K.VENKATA RAMESH', parentName: 'K.SURESH BABU', phone: '9848012345', branch: 'CSE', year: 2, section: 'C', cgpa: 8.12 });
  await Attendance.create([
    { regNo: R3, subject: 'Data Structures',              presentClasses: 53, totalClasses: 58, percentage: 91.38 },
    { regNo: R3, subject: 'Operating Systems',            presentClasses: 44, totalClasses: 50, percentage: 88.00 },
    { regNo: R3, subject: 'Computer Organization',        presentClasses: 38, totalClasses: 46, percentage: 82.61 },
    { regNo: R3, subject: 'Discrete Mathematics',         presentClasses: 50, totalClasses: 55, percentage: 90.91 },
    { regNo: R3, subject: 'DS Lab',                       presentClasses: 26, totalClasses: 28, percentage: 92.86 },
  ]);
  await Exam.create([
    { regNo: R3, subject: 'Data Structures',              midMarks: 24, labMarks: 0,  finalMarks: 85 },
    { regNo: R3, subject: 'Operating Systems',            midMarks: 21, labMarks: 0,  finalMarks: 80 },
    { regNo: R3, subject: 'Computer Organization',        midMarks: 19, labMarks: 0,  finalMarks: 74 },
    { regNo: R3, subject: 'Discrete Mathematics',         midMarks: 25, labMarks: 0,  finalMarks: 90 },
    { regNo: R3, subject: 'DS Lab',                       midMarks: 0,  labMarks: 42, finalMarks: 0  },
  ]);
  await Fee.create({ regNo: R3, totalFee: 269100, paidFee: 150000, dueFee: 119100, lastPaymentDate: new Date('2025-06-20') });
  await Academic.create([
    { regNo: R3, semester: 1, sgpa: 8.20, cgpa: 8.20 },
    { regNo: R3, semester: 2, sgpa: 8.05, cgpa: 8.12 },
    { regNo: R3, semester: 3, sgpa: 8.10, cgpa: 8.12 },
  ]);
  process.stdout.write('Student 3 done.\n');

  // Student 4 - SK.NISSAR AHAMAD
  const R4 = '231FA04D94';
  await Student.create({ regNo: R4, studentName: 'SK.NISSAR AHAMAD', parentName: 'SK.ASHRAFALI', phone: '9390233652', branch: 'CSE', year: 3, section: 'C', cgpa: 8.50 });
  await Attendance.create([
    { regNo: R4, subject: 'Mathematics for Science',      presentClasses: 48, totalClasses: 52, percentage: 92.31 },
    { regNo: R4, subject: 'Mobile App Development',       presentClasses: 60, totalClasses: 64, percentage: 93.75 },
    { regNo: R4, subject: 'Computer Networks & Security', presentClasses: 42, totalClasses: 46, percentage: 91.30 },
    { regNo: R4, subject: 'Software Engineering',         presentClasses: 55, totalClasses: 60, percentage: 91.67 },
    { regNo: R4, subject: 'SE Lab',                       presentClasses: 27, totalClasses: 30, percentage: 90.00 },
  ]);
  await Exam.create([
    { regNo: R4, subject: 'Mathematics for Science',      midMarks: 23, labMarks: 0,  finalMarks: 82 },
    { regNo: R4, subject: 'Mobile App Development',       midMarks: 24, labMarks: 0,  finalMarks: 88 },
    { regNo: R4, subject: 'Computer Networks & Security', midMarks: 22, labMarks: 0,  finalMarks: 85 },
    { regNo: R4, subject: 'Software Engineering',         midMarks: 25, labMarks: 0,  finalMarks: 90 },
    { regNo: R4, subject: 'SE Lab',                       midMarks: 0,  labMarks: 44, finalMarks: 0  },
  ]);
  await Fee.create({ regNo: R4, totalFee: 269100, paidFee: 269100, dueFee: 0, lastPaymentDate: new Date('2025-07-01') });
  await Academic.create([
    { regNo: R4, semester: 1, sgpa: 8.60, cgpa: 8.60 },
    { regNo: R4, semester: 2, sgpa: 8.40, cgpa: 8.50 },
    { regNo: R4, semester: 3, sgpa: 8.55, cgpa: 8.52 },
    { regNo: R4, semester: 4, sgpa: 8.45, cgpa: 8.50 },
    { regNo: R4, semester: 5, sgpa: 8.50, cgpa: 8.50 },
  ]);
  process.stdout.write('Student 4 done.\n');


  // Student 5 - P.THARUNASRI
  const R5 = '231FA04406';
  await Student.create({ regNo: R5, studentName: 'P.THARUNASRI', parentName: 'P.GEETA SREENIVASARAO', phone: '9392682603', branch: 'CSE', year: 3, section: 'C', cgpa: 7.98 });
  await Attendance.create([
    { regNo: R5, subject: 'Mathematics for Science',      presentClasses: 47, totalClasses: 52, percentage: 90.38 },
    { regNo: R5, subject: 'Mobile App Development',       presentClasses: 58, totalClasses: 64, percentage: 90.63 },
    { regNo: R5, subject: 'Computer Networks & Security', presentClasses: 38, totalClasses: 46, percentage: 82.61 },
    { regNo: R5, subject: 'Software Engineering',         presentClasses: 50, totalClasses: 58, percentage: 86.21 },
    { regNo: R5, subject: 'SE Lab',                       presentClasses: 25, totalClasses: 28, percentage: 89.29 },
  ]);
  await Exam.create([
    { regNo: R5, subject: 'Mathematics for Science',      midMarks: 21, labMarks: 0,  finalMarks: 78 },
    { regNo: R5, subject: 'Mobile App Development',       midMarks: 22, labMarks: 0,  finalMarks: 80 },
    { regNo: R5, subject: 'Computer Networks & Security', midMarks: 19, labMarks: 0,  finalMarks: 74 },
    { regNo: R5, subject: 'Software Engineering',         midMarks: 23, labMarks: 0,  finalMarks: 82 },
    { regNo: R5, subject: 'SE Lab',                       midMarks: 0,  labMarks: 40, finalMarks: 0  },
  ]);
  await Fee.create({ regNo: R5, totalFee: 269100, paidFee: 200000, dueFee: 69100, lastPaymentDate: new Date('2025-07-20') });
  await Academic.create([
    { regNo: R5, semester: 1, sgpa: 8.10, cgpa: 8.10 },
    { regNo: R5, semester: 2, sgpa: 7.85, cgpa: 7.98 },
    { regNo: R5, semester: 3, sgpa: 7.90, cgpa: 7.95 },
    { regNo: R5, semester: 4, sgpa: 8.00, cgpa: 7.96 },
    { regNo: R5, semester: 5, sgpa: 7.98, cgpa: 7.98 },
  ]);
  process.stdout.write('Student 5 done.\n');
  process.stdout.write('Database Seeded Successfully\n');
  process.exit(0);
}
seed().catch(err => { process.stdout.write('ERROR: ' + err.message + '\n'); process.exit(1); });




