import { Link, useParams, useLocation } from "react-router-dom"

const DetallePerros = () => {
  const { id, nombre } = useParams()
  const location = useLocation()
  const perro = location.state?.perro

  if (!perro) {
    return (
      <>
        <p className="fs-5 fw-bold text-center">No se pudo cargar la mascota</p>
        <Link to={"/perros"}>
            <button className="btn px-5 fs-5 fw-bold bg-success-subtle rounded">
              Mostrar otras mascotas
            </button>
          </Link>
      </>
    )
  }

  return (
    <>    
      <h2 
      style={{ paddingTop: '70px' }}
      className="text-center fs-4 fw-bold mt-3">Detalles mascota { [id,": ", nombre] } </h2>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm rounded">
              <div key={perro.id} className="card-body bg-info-subtle rounded">
                <img
                  src={perro.imagen}
                  className="card-img-top img-fluid rounded"
                  alt={perro.nombre}
                />
                <div className="mt-3 text-center bg-secondary-subtle rounded pt-3 pb-3">
                  <h3 className="card-title fw-bold fs-5">{perro.nombre}</h3>
                  <p className="card-text fs-5">{perro.descripcion}</p>
                  <p className="text-muted fw-bold bg-info-subtle fs-5">
                    $ {perro.precio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={`/perros`}>
            <button className="btn px-5 fs-5 fw-bold bg-success-subtle rounded">
              Ver otras mascotas
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DetallePerros