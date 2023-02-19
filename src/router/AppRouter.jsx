import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../hooks';
import { LoginPage } from '../auth';
import { CalendarPage, Spinner } from '../calendar';

export const AppRouter = () => {
  const { isAuthenticated, checkAuthToken, isChecking } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) return <Spinner />;

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route element={<LoginPage />} path="/auth/*" />
          <Route element={<Navigate replace to="/auth/login" />} path="*" />
        </>
      ) : (
        <>
          <Route element={<CalendarPage />} path="/" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </>
      )}
    </Routes>
  );
};
