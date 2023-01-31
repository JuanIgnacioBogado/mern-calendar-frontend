export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i>
          &nbsp; Nacho
        </span>

        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>
    </div>
  );
};
