import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useAuthStore } from '../../hooks';
import { Login, Register } from '../';

import './LoginPage.css';

export const LoginPage = () => {
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container animate__animated animate__fadeIn animate__faster">
      <div className="row">
        <Login />
        <Register />
      </div>
    </div>
  );
};
