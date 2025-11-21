import { Link, useNavigate } from "react-router-dom"
import { useCartContext } from "../context/CartContext"
import { useAuthContext } from "../context/AuthContext"
import { useProducts } from "../context/GatosContext"

export default function Gatos() {
    const { gatos, cargando, error } = useProducts()
    const { addToCart } = useCartContext()
    const { esAdmin } = useAuthContext()
    const navigate = useNavigate()

    const manejarEliminar = (gato) => {
        navigate('/eliminar-gatos', { state: { gato } })
    }

    const manejarEditar = (gato) => {
        navigate('/formulario-gatos', { state: { gato } })
    }

    if (cargando) return <p>Cargando mascotas...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <h4 className="text-center bg-info-subtle fs-5 fw-bold mb-4 p-3 text-danger">
                LAS MASCOTAS ESTAN EN ADOPCION RESPONSABLE, EL COSTO ES SIMBOLICO PARA LA REALIZACION DE ESTE PROYECTO
            </h4>
            <ul className="d-flex flex-wrap justify-content-center text-center gap-4 list-unstyled p-0">
                {gatos.map((gato) => (
                    <GatoItem
                        key={gato.id}
                        gato={gato}
                        esAdmin={esAdmin}
                        onEditar={() => manejarEditar(gato)}
                        onEliminar={() => manejarEliminar(gato)}
                        onAddToCart={() => addToCart(gato)}
                    />
                ))}
            </ul>
        </>
    )
}

const GatoItem = ({ gato, esAdmin, onEditar, onEliminar, onAddToCart }) => (
    <li className="card shadow-lg fs-6 border-secondary-subtle bg-info-subtle rounded mascota"
        style={{ width: "300px" }}>
        <img className="card-img-top rounded-4 p-2" src={gato.imagen}
            style={{ width: "100%", height: "400px", objectFit: "cover" }} alt={gato.nombre} />
        <span className="fw-bold fs-5 mt-2 pb-1">{gato.nombre}</span>
        <span className="fs-6 px-2 pb-1"><strong>Descripción:</strong> {gato.descripcion}</span>
        <span className="fs-6 pb-1"><strong>Categoría:</strong> {gato.categoria}</span>
        <span className="fw-bold fs-6 pb-3">Precio: $ {(gato.precio)}</span>

        <div className="btn-admin-container pb-3 pt-3 border-bottom border-top border-secondary-subtle">
            <button className="btn text-light bg-success m-2 rounded fs-6"
                onClick={onAddToCart}>Adoptar
            </button>
            <Link to={`/gatos/${gato.id}/${gato.nombre}`}
                state={{ gato }}>
                <button className="btn text-light bg-primary m-2 fs-6 rounded">Más detalles</button>
            </Link>
        </div>

        {esAdmin && (
            <div className="btn-admin-container bg-secondary pt-3">
              
                <button onClick={onEditar} className="btn text-light mb-4 bg-success m-2 fs-6 rounded">
                    Editar
                </button>
                <button onClick={onEliminar} className="btn text-light mb-4 bg-danger m-2 fs-6 rounded">
                    Eliminar
                </button>
            </div>
        )}
    </li>
)