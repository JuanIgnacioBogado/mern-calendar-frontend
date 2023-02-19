import { useAuthStore, useForm } from '../../hooks';

const initialForm = {
  name: '',
  email: '',
  password: '',
  password2: ''
};

export const Register = () => {
  const { startRegister, showErrorMessage, isChecking } = useAuthStore();
  const { formState, name, email, password, password2, handleInputChange } = useForm(initialForm);

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.values(formState).some(v => !v.trim())) {
      return showErrorMessage('Todos los campos son obligatorios');
    }
    if (password !== password2) {
      return showErrorMessage('Las contraseñas deben ser iguales');
    }
    startRegister(formState);
  };

  return (
    <div className="col-md-6 login-form-2">
      <h3>Registro</h3>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          className="form-control"
          name="name"
          placeholder="Nombre"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          autoComplete="off"
          className="form-control"
          name="password2"
          placeholder="Repita la contraseña"
          type="password"
          value={password2}
          onChange={handleInputChange}
        />
        <input className="btnSubmit" disabled={isChecking} type="submit" value="Crear cuenta" />
      </form>
    </div>
  );
};
