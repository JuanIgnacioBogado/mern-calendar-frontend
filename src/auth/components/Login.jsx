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
          onChange={handleInputChange}
          value={email}
          name="email"
          type="email"
          className="form-control"
          placeholder="Correo"
        />
        <input
          onChange={handleInputChange}
          value={password}
          name="password"
          type="password"
          autoComplete="off"
          className="form-control"
          placeholder="Contraseña"
        />
        <input type="submit" className="btnSubmit" value="Login" disabled={isChecking} />
      </form>
    </div>
  );
};
