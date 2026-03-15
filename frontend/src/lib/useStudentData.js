import { useState, useEffect } from 'react';
import { studentAPI, attendanceAPI, academicAPI, feesAPI, examsAPI } from './api.js';

// Returns { data, loading, error }
function useFetch(apiFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    apiFn()
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useStudent() {
  const student = JSON.parse(localStorage.getItem('student') || 'null');
  return { ...useFetch(studentAPI.get), student };
}

export function useAttendance() {
  return useFetch(attendanceAPI.get);
}

export function useAcademic() {
  return useFetch(academicAPI.get);
}

export function useFees() {
  return useFetch(feesAPI.get);
}

export function useExams() {
  return useFetch(examsAPI.get);
}
