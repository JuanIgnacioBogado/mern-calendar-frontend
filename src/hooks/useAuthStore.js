import { useMemo } from 'react';

import { calendarApi } from '../api';

import { useSelectorStore } from './';

export const useAuthStore = () => {
  const { auth, onChecking, onLogin, onLogout, clearErrorMessage, clearCalendar } = useSelectorStore();

  const showErrorMessage = (data = 'Credenciales Incorrectas') => {
    if (data?.errors) {
      onLogout(
        Object.values(data?.errors)
          .map(({ msg }) => msg)
          .join('<br><br>')
      );
    } else {
      onLogout(data?.msg || data);
    }
    setTimeout(() => clearErrorMessage(), 10);
  };

  // eslint-disable-next-line no-unused-vars
  const setUserAndToken = ({ token, ok, ...user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());
    onLogin(user);
  };

  const startLogin = async formState => {
    onChecking();
    try {
      const { data } = await calendarApi.post('/auth', formState);

      setUserAndToken(data);
    } catch ({ response: { data } }) {
      console.log('data', data?.msg || data?.errors);
      showErrorMessage();
    }
  };

  const startRegister = async formState => {
    onChecking();
    try {
      const { data } = await calendarApi.post('/auth/new', formState);

      setUserAndToken(data);
    } catch ({ response: { data } }) {
      showErrorMessage(data);
    }
  };

  const checkAuthToken = async () => {
    if (!localStorage.getItem('token')) return startLogout();

    onChecking();
    try {
      const { data } = await calendarApi.get('/auth/renew');

      setUserAndToken(data);
    } catch ({ response: { data } }) {
      showErrorMessage(data);
      startLogout();
    }
  };

  const startLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    onLogout();
    clearCalendar();
  };

  const isAuthenticated = useMemo(() => auth.status === 'authenticated', [auth.status]);
  const isChecking = useMemo(() => auth.status === 'checking', [auth.status]);

  return {
    ...auth,
    checkAuthToken,
    isAuthenticated,
    isChecking,
    showErrorMessage,
    startLogin,
    startRegister,
    startLogout
  };
};
