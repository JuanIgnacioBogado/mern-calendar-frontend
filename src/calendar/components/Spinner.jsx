export const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-primary spinner-border-md"
        role="status"
        style={{ width: '20rem', height: '20rem', borderWidth: '2rem' }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
