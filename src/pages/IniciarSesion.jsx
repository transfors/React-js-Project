import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

export default function IniciarSesion() {

  const { iniciarSesion } = useAuthContext()
  
  const navigate = useNavigate()
  const ubicacion = useLocation()

  const [formulario, setFormulario] = useState({ nombre: "", email: "" })

  const manejarEnvio = (e) => {
    e.preventDefault()
    
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email)
      iniciarSesion("admin")
      navigate("/dashboard")
    }
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
      localStorage.setItem("authEmail", formulario.email)
      iniciarSesion(formulario.nombre)
      if (ubicacion.state?.cart) {
        navigate("/pagar", { state: { carrito: ubicacion.state.cart } })
      } else {
        navigate("/")
      }
    } else {

      toast.warn("Credenciales de administrador incorrectas. Usa: admin / 1234@admin")
    }
  }

  return (
    <>
    <div className="d-flex justify-content-center align-items-start">     
      <form 
        onSubmit={manejarEnvio} 
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: '300px', maxWidth: '400px', width: '90%' }}
      >
        <h3 className="fw-bold text-primary mb-4 text-center border-bottom pb-2">Iniciar Sesión</h3>
        <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre: e.target.value })
          }
          className="form-control"
          required
        />
        </div>
        <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) =>
            setFormulario({ ...formulario, email: e.target.value })
          }
          className="form-control"
          required
        />
        </div>
        <button type="submit" className="btn btn-success w-100 mb-2">
          Iniciar Sesión
        </button>
        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary w-100">
          Cancelar
        </button>
      </form>
      
    </div>
    <div>
    <p 
    className="mt-4 text-center text-muted fs-7">    
        <strong>Credenciales de prueba para Dashboard:</strong>
        <br />
        Nombre: admin
        <br />
        Email: 1234@admin
      </p>
      </div>
    </>
  );
}