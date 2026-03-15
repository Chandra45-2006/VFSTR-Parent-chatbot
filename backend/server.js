require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
