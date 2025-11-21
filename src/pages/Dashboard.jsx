import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext()

  const tokenActual = localStorage.getItem('authToken')

  return (
    <div className="justify-content-center align-items-center"
    >
      <h3 className="fw-bold text-primary mb-4 text-center border-bottom pb-2">Dashboard Administrativo</h3>
      <div className="bg-light-subtle p-4 fs-7 rounded">
        <p><strong>Sesión iniciada como: </strong> {usuario.nombre}</p>
        <div className="bg-secondary-subtle fs-7 mt-3 mb-3 p-2 rounded"
        >
          <strong>Token de autenticación:</strong>
          <br />
          <code className="text-danger-subtle fs-7">{tokenActual}</code>
        </div>
        <div style={{ margin: '20px 0' }}>
          <h4 className="fw-bold text-primary mb-4 text-center border-bottom pb-2">Acciones:</h4>
          <div className="d-flex col-12 flex-wrap gap-3 justify-content-between rounded-3">
            <Link className="text-decoration-none d-flex flex-wrap bg-success text-light p-2 justify-content-between rounded"
              to="/formulario-gatos"
            >
              Agregar Mascota
            </Link>
            <Link className="text-decoration-none d-flex flex-wrap bg-success text-light p-2 justify-content-between rounded"
              to="/gatos"
            >
              Editar/Eliminar todas las Mascotas
            </Link>
          </div>
        </div>
        <hr></hr>
        <button className="bg-danger text-center border-none rounded-3"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}