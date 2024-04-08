import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="vh-100 d-flex justify-content-center align-items-center">
      <div className="error-container  h-50 d-flex p-3 align-items-center flex-column justify-content-center">
        <h2><i className="fas fa-exclamation-triangle"></i></h2>
        <h2>ERROR 404</h2>
        <p className="fs-3 text-black pb-3">La pagina que buscas no existe.</p>
        <Link to="/" className="btn btn-primary rounded"><i className="fs-5 fas fa-arrow-alt-to-left"></i> Volver al inicio</Link>
      </div>
    </main>
  )
}