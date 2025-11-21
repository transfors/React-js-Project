import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import datosPerros from "../assets/perros.json"
import { useCartContext } from "../context/CartContext"

const Perros = () => {
    const [perros, setPerros] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const { addToCart } = useCartContext()

    useEffect(() => {

        console.log("COMPONENTE Perros MONTADO")

        const timeout = setTimeout(() => {
            console.log("TIMEOUT EJECUTADO")


            try {
                setPerros(datosPerros.perros);
                setCargando(false);

            } catch (error) {
                console.error("Error:", error);
                setError("Hubo un problema al cargar la imagen")
                setCargando(false);
            }
        }, 2000);

        return () => {
            clearTimeout(timeout)
            console.log("LIMPIEZA EJECUTADA")
            console.log("COMPONENTE Gatos DESMONTADO")
        }

    }, [])

    if (cargando)
        return (
            <div
                className="text-center mt-6 fs-5"
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-secondary">Cargando imagenes...</p>
            </div>
        )
    if (error)
        return (
            <p className="text-center text-danger fs-5 mt-5">
                {error}
            </p>
        )

    return (
        <>
            <h4 className="text-center bg-info-subtle fs-5 fw-bold mb-4 p-3 text-danger">
                LAS MASCOTAS ESTAN EN ADOPCION RESPONSABLE, EL COSTO ES SIMBOLICO PARA LA REALIZACION DE ESTE PROYECTO
            </h4>
            <ul className="d-flex flex-wrap justify-content-center text-center gap-4 list-unstyled p-0">
                {perros.map((perro) => (
                    <li key={perro.id} className="card shadow-lg fs-6 border-secondary-subtle bg-info-subtle rounded mascota"
                        style= {{ width: "300px"}}>
                        <img
                            src={perro.imagen}
                            className="card-img-top rounded-4 p-2"
                            alt={perro.nombre}
                            style={{ width: "100%", height: "400px", objectFit: "cover" }}
                        ></img>
                        <br />
                        <span className="fw-bold fs-5 mt-2 pb-1">{perro.nombre}</span>
                        <span className="fs-6 px-2 pb-1">{perro.descripcion}</span>
                        <span className="fw-bold fs-6 pb-1">$ {perro.precio}</span>
                        <button
                            className="btn btn-success m-1 rounded fs-6 d-block mx-auto"
                            onClick={() => addToCart(perro)}
                        >
                            Adoptar
                        </button>
                        <Link
                            to={`/perros/${perro.id}/${perro.nombre}`}
                            state={{ perro }}
                        >
                            <button
                                className="btn text-light bg-primary m-2 fs-6 rounded">
                                Más detalles
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Perros
