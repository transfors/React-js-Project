import { Link, useParams, useLocation } from "react-router-dom"

const DetalleGatos = () => {
  const { id, nombre } = useParams()
  const location = useLocation()
  const gato = location.state?.gato

  if (!gato) {
    return (
      <>
        <p className="fs-5 fw-bold text-center">No se pudo cargar la mascota</p>
        <Link to={"/gatos"}>
            <button className="btn px-5 fs-5 fw-bold bg-success-subtle rounded">
              Mostrar otras mascotas
            </button>
          </Link>
      </>
    )
  }

  return (
    <>    
      <h2 className="text-center fs-4 fw-bold mb-3">Detalles mascota { [id,": ", nombre] } </h2>
      <div className="container rounded">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm rounded-3">
              <div key={gato.id} className="card-body bg-info-subtle rounded mascota">
                <img
                  src={gato.imagen}
                  className="card-img-top img-fluid rounded"
                  alt={gato.nombre}
                />
                <div className="mt-3 text-center bg-secondary-subtle rounded pt-3 pb-3">
                  <h3 className="card-title fw-bold fs-5">{gato.nombre}</h3>
                  <hr />
                  <p className="card-text fs-6 px-1"><strong>Descripción: </strong>{gato.descripcion}</p>
                  <hr />
                  <p className="card-text fs-6 px-1"><strong>Categoría: </strong>{gato.categoria}</p>
                  <p className="bg-info-subtle mb-1 p-2 fs-6">
                    <strong>Precio: $ </strong>{gato.precio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={`/gatos`}>
            <button className="btn px-5 fw-bold fs-6 bg-success-subtle rounded">
              Ver otras mascotas
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DetalleGatos