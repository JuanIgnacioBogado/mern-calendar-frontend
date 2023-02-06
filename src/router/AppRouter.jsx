import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../hooks';
import { LoginPage } from '../auth';
import { CalendarPage, Spinner } from '../calendar';

export const AppRouter = () => {
  const { isAuthenticated, checkAuthToken, isChecking } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (isChecking) return <Spinner />;

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};
