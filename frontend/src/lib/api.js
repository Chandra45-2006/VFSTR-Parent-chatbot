import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000, // 60 seconds — handles Render free tier cold start
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (regNo, phone) => api.post('/auth/login', { regNo, phone }),
  verifyOTP: (regNo, otp) => api.post('/auth/verify-otp', { regNo, otp }),
};

// All data routes use JWT token — no regNo in URL
export const studentAPI  = { get: () => api.get('/student/profile') };
export const attendanceAPI = { get: () => api.get('/attendance') };
export const examsAPI    = { get: () => api.get('/exams') };
export const feesAPI     = { get: () => api.get('/fees') };
export const academicAPI = { get: () => api.get('/academic') };

export default api;
