import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OTPPage from './pages/OTPPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AcademicPage from './pages/AcademicPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import FeesPage from './pages/FeesPage.jsx';
import ExamsPage from './pages/ExamsPage.jsx';
import AIAssistantPage from './pages/AIAssistantPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/academic" element={<AcademicPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
