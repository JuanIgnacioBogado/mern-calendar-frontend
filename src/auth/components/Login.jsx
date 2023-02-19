import { useAuthStore, useForm } from '../../hooks';

const initialForm = {
  email: '',
  password: ''
};

export const Login = () => {
  const { startLogin, showErrorMessage, isChecking } = useAuthStore();
  const { formState, email, password, handleInputChange } = useForm(initialForm);

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.values(formState).some(v => !v.trim())) {
      return showErrorMessage('Ambos campos son obligatorios');
    }
    startLogin(formState);
  };

  return (
    <div className="col-md-6 login-form-1">
      <h3>Ingreso</h3>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          className="form-control"
          name="email"
          placeholder="Correo"
          type="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          autoComplete="off"
          className="form-control"
          name="password"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={handleInputChange}
        />
        <input className="btnSubmit" disabled={isChecking} type="submit" value="Login" />
      </form>
    </div>
  );
};
