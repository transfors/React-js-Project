import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"
import { useEffect } from "react"
import { toast } from "react-toastify"

function Pagar() {

  const { usuario, cerrarSesion } = useAuthContext()
  const { cart, clearCart } = useCartContext()

  const location = useLocation()
  const navigate = useNavigate()

  const total = cart
    .reduce((acc, item) => acc + item.precio * item.quantity, 0)
    .toFixed(2)

  const comprar = () => {
    toast.success("¡Compra realizada con éxito!")
    clearCart()
    navigate("/")
  }

  useEffect(() => {
    if (!usuario) {
      navigate("/iniciar-sesion", { state: { carrito: cart } })
    }
  }, [usuario])

  return (
    <div>
      <div className="text-center fs-6 mx-auto d-block">
        <h2 className="text-center fs-6 mx-auto d-block">
          <strong>Usuario:</strong> {usuario.nombre}
        </h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <button
          onClick={cerrarSesion}
          className="btn btn-secondary text-center mb-5 rounded fs-6 mx-auto d-block"
        >
          Cerrar sesión
        </button>
        <hr />
      </div>    

      <div>
        <button
          onClick={comprar}
          className="btn btn-success fw-bold rounded fs-6 mx-auto d-block"
          style={{ width: "200px" }}
        >
          Confirmar y Pagar
        </button>

        <button
          onClick={() => navigate("/carrito")}
          className="btn btn-secondary mt-3 fw-bold rounded fs-6 mx-auto d-block"
          style={{ width: "200px" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default Pagar
