import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProducts } from '../context/GatosContext'
import { toast } from "react-toastify"

function FormularioGatos() {
  const navigate = useNavigate()
  const location = useLocation()
  const { agregarGatos, editarGatos, validar } = useProducts()

  const gatoRecibido = location.state?.gato

  const modo = gatoRecibido ? "editar" : "agregar"

  const [gatos, setGatos] = useState({
    id: '',
    imagen: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: ''
  })

  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (modo === "editar" && gatoRecibido) {
      setGatos({
        id: gatoRecibido.id || '',
        imagen: gatoRecibido.imagen || '',
        nombre: gatoRecibido.nombre || '',
        descripcion: gatoRecibido.descripcion || '',
        categoria: gatoRecibido.categoria || '',
        precio: gatoRecibido.precio || ''
      })
    }
  }, [modo, gatoRecibido])

  const manejarCambio = (e) => {
    const { name, value } = e.target

    if (name === 'descripcion' && value.length > 200) return

    setGatos(prev => ({ ...prev, [name]: value }))

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validarFormulario = () => {
    const resultado = validar(gatos)
    setErrores(resultado.errores)
    return resultado.esValido
  }

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return

    setCargando(true)
    try {
      const gatoEnviar = {
        ...gatos,
        precio: gatos.precio.toString().replace(',', '.')
      }
      if (modo === "agregar") {
        const nuevoGato = await agregarGatos(gatoEnviar)
        toast.success(`Gato "${nuevoGato.nombre}" agregado correctamente con ID: ${nuevoGato.id}`)

        setGatos({
          id: '',
          imagen: '',
          nombre: '',
          descripcion: '',
          categoria: '',
          precio: ''
        })

        setTimeout(() => {
          navigate('/gatos')
        }, 100)

      } else {
        await editarGatos(gatoEnviar)
        toast.success("Mascota actualizada correctamente!")

        setTimeout(() => {
          navigate('/gatos')
        }, 100)
      }

      setErrores({})

    } catch (error) {
      toast.warn(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} la mascota.`)
      console.error('Error:', error)
    } finally {
      setCargando(false)
    }
  }

  const cancelarEdicion = () => {
    if (modo === "editar") {
      toast('Edición cancelada')
      navigate('/gatos')
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="mx-auto p-4 border rounded-3 shadow-sm w-100 w-md-75 w-lg-50">
      <h2 className="fw-bold mb-4 text-center text-primary">{modo === "editar" ? 'Editar' : 'Agregar'} Mascota (gato)</h2>

      {modo === "editar" && gatoRecibido && (
        <p className="text-center text-secondary mb-4">
          Editando: {gatoRecibido.nombre} (ID: {gatoRecibido.id})
        </p>
      )}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Nombre: *
        </label>
        <input
          type="text"
          name="nombre"
          value={gatos.nombre}
          onChange={manejarCambio}
          disabled={cargando}
          className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
          placeholder="Ingrese el nombre de la mascota (gato)"
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Precio: *
        </label>
        <input
          type="text"
          name="precio"
          value={gatos.precio}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ej: 40.000 o 40.000,50"
          inputMode="decimal"
          className={`form-control ${errores.precio ? "is-invalid" : ""}`}
        />
        <div className="form-text text-muted">
          Formato argentino: punto para miles, sin decimales.
        </div>
        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Categoría:
        </label>
        <input
          type="text"
          name="categoria"
          value={gatos.categoria}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ej: Pelo semilargo, Pelo corto oriental, etc."
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Imagen (URL):
        </label>
        <input
          type="text"
          name="imagen"
          value={gatos.imagen}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="https://i.imgur.com/JriKJW5.png"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Descripción: *
        </label>
        <textarea
          name="descripcion"
          value={gatos.descripcion}
          onChange={manejarCambio}
          rows="4"
          disabled={cargando}
          maxLength="200"
          placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
          className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
        />
        <div className={`form-text ${gatos.descripcion.length > 200 ? "text-danger" : "text-muted"}`}>
          {gatos.descripcion.length}/200 caracteres
        </div>
        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
      </div>

      <div className="mb-3 d-flex gap-3 justify-content-center flex-column flex-md-row">
        <button
          type="submit"
          disabled={cargando}
          className={`btn btn-secondary fw-bold flex-fill py-2 mt-4 rounded-2 ${cargando ? "btn-secondary" : "btn-success"}`}
        >
          {cargando
            ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
            : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Mascota')
          }
        </button>

        {modo === "editar" && (
          <button
            type="button"
            onClick={cancelarEdicion}
            className="btn btn-secondary fw-bold flex-fill py-2 mt-4 rounded-2"
          >
            Cancelar
          </button>
        )}
      </div>

      <p>(*) Campos obligatorios</p>
    </form>
  )
} export default FormularioGatos