import './LoginPage.css';

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form className="d-flex flex-column gap-3">
            <input type="text" className="form-control" placeholder="Correo" />
            <input type="password" autoComplete="off" className="form-control" placeholder="Contraseña" />
            <input type="submit" className="btnSubmit" value="Login" />
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form className="d-flex flex-column gap-3">
            <input type="text" className="form-control" placeholder="Nombre" />
            <input type="email" className="form-control" placeholder="Correo" />
            <input type="password" autoComplete="off" className="form-control" placeholder="Contraseña" />
            <input type="password" autoComplete="off" className="form-control" placeholder="Repita la contraseña" />
            <input type="submit" className="btnSubmit" value="Crear cuenta" />
          </form>
        </div>
      </div>
    </div>
  );
};
