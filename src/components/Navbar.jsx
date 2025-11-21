import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import "../index.css"
import { useAuthContext } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"


function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext()
  const { cart } = useCartContext()

  let selectValue = ""
  if (location.pathname === "/gatos") selectValue = "gatos"
  else if (location.pathname === "/perros") selectValue = "perros"
  else selectValue = ""

  const totalProductos = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSelectChange = (e) => {
    const value = e.target.value
    switch (value) {
      case "gatos":
        navigate("/gatos")
        break
      case "perros":
        navigate("/perros")
        break
      default:
        navigate("/")
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg fw-bold fixed-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold fs-4 nav-link-azul"
          to="/"
          style={{ color: "#1565c0" }}
        >
          e-commerce Transfor
        </Link>
        <button
          className="navbar-toggler text-primary rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto fs-6 align-items-center">
            <li className="nav-item">
              <Link className={`nav-link nav-link-azul ${location.pathname === '/' ? 'active' : ''}`}
                to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-3">
              <div className={`nav-link nav-link-azul ${location.pathname === '/gatos' || location.pathname === '/perros' ? 'active' : ''}`}>
                <select
                  className="nav-link nav-link-azul fw-semibold border-0 fs-6 bg-transparent"
                  onChange={handleSelectChange}
                  value={selectValue}
                  style={{
                    color: "#1565c0",
                    fontWeight: location.pathname === '/gatos' || location.pathname === '/perros' ? 'bold' : 'normal'
                  }}
                >
                  <option value="">Mascotas</option>
                  <option value="gatos">Gatos</option>
                  <option value="perros">Perros</option>
                </select>
              </div>
            </li>
            <li className="nav-item fs-6">
              <Link
                className={`nav-link nav-link-azul ${location.pathname === '/servicios' ? 'active' : ''}`}
                to="/servicios"
              >
                Servicios
              </Link>
            </li>
            {usuario?.nombre === "admin" && (
              <li>
                <Link className={`nav-link ms-2 nav-link-azul ${location.pathname === '/formulario-gatos' ? 'active' : ''}`}
                to="/formulario-gatos">Agregar Mascota</Link>
              </li>
            )}
            <li className="nav-item d-flex align-items-center">
              <Link
                className={`nav-link position-relative nav-link-azul ${location.pathname === '/carrito' ? 'active' : ''}`}
                to="/carrito"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cart && cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white"
                    style={{ fontSize: "0.75rem", padding: "0.25em 0.5em" }}
                  >
                    {totalProductos}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <span className="ms-2 nav-link-azul">
                    Hola {usuario.nombre}!
                  </span>
                  {usuario.nombre === "admin" && (
                    <Link className={`nav-link position-relative ms-2 nav-link-azul ${location.pathname === '/dashboard' ? 'active' : ''}`}
                      to="/dashboard">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={cerrarSesion}
                    className="btn btn-link nav-link-azul ms-2 p-0 fw-semibold"
                    style={{ textDecoration: "none" }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link className={`nav-link nav-link-azul ms-2 ${location.pathname === '/iniciar-sesion' ? 'active' : ''}`} to="/iniciar-sesion">
                  Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
