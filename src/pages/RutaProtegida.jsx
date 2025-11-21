import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function RutaProtegida({ children, soloAdmin = false }) {

  const { usuario } = useAuthContext()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" state={location.state} replace />
  }

  if (soloAdmin && usuario.nombre !== "admin") {
    return <Navigate to="/gatos" replace />
  }
 
  return children
}

export default RutaProtegida