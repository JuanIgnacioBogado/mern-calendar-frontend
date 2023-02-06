import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand" style={{textTransform: 'capitalize'}}>
          <i className="fas fa-calendar-alt"></i>
          &nbsp; {user?.name}
        </span>

        <button className="btn btn-outline-danger" onClick={startLogout}>
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>
    </div>
  );
};
