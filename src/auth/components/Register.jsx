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
          name="name"
          value={name}
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Nombre"
        />
        <input
          name="email"
          value={email}
          onChange={handleInputChange}
          type="email"
          className="form-control"
          placeholder="Correo"
        />
        <input
          name="password"
          value={password}
          onChange={handleInputChange}
          type="password"
          autoComplete="off"
          className="form-control"
          placeholder="Contraseña"
        />
        <input
          name="password2"
          value={password2}
          onChange={handleInputChange}
          type="password"
          autoComplete="off"
          className="form-control"
          placeholder="Repita la contraseña"
        />
        <input type="submit" className="btnSubmit" value="Crear cuenta" disabled={isChecking} />
      </form>
    </div>
  );
};
