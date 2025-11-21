import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <div className="container">
      <h1 className="text-center mb-3" style={{ color: "#1565c0" }}>Servicios</h1>
      <hr style={{ borderTop: "3px solid #1565c0", width: "50px", margin: "0 auto 30px" }} />

      <div className="text-primary fs-5" style={{ lineHeight: "1.8" }}>
        <p>
          En <strong>Adopciones Transfor</strong>, nos preocupamos por el bienestar de cada mascota y de quienes deciden darles un hogar. Por eso, ofrecemos una amplia variedad de servicios pensados para acompañarte en cada etapa de la adopción y el cuidado de tus animales.
        </p>

        <ul className="list-group-flush mb-4">
          <li className="list-group-item border-0 ps-0">
            <strong>1. Orientación para la adopción:</strong> Te ayudamos a elegir la mascota que mejor se adapte a tu estilo de vida, tu hogar y tu familia, asegurando que la experiencia de adopción sea positiva para todos.
          </li>
          <li className="list-group-item border-0 ps-0">
            <strong>2. Salud y bienestar:</strong> Contamos con revisiones básicas de salud, vacunación y desparasitación, para que tu nueva mascota llegue a casa sana y feliz.
          </li>
          <li className="list-group-item border-0 ps-0">
            <strong>3. Educación y entrenamiento:</strong> Ofrecemos talleres y consejos para que puedas enseñarle hábitos básicos, socialización y obediencia, fomentando una convivencia armoniosa.
          </li>
          <li className="list-group-item border-0 ps-0">
            <strong>4. Apoyo post-adopción:</strong> Nuestro compromiso no termina al momento de la adopción. Te acompañamos con seguimiento y orientación, resolviendo dudas y brindando soporte para cualquier situación que pueda surgir.
          </li>
          <li className="list-group-item border-0 ps-0">
            <strong>5. Eventos y actividades:</strong> Organizamos encuentros, charlas y actividades especiales para que los adoptantes y sus mascotas puedan socializar, aprender y disfrutar juntos.
          </li>
        </ul>

        <p>
          En <strong>Adopciones Transfor</strong> creemos que cada mascota merece un hogar lleno de amor y cuidado, y que cada adoptante merece sentirse acompañado en todo el proceso. 💙
        </p>
      </div>

      <div className="text-center mt-4">
        <Link to="/">
          <button className="btn btn-primary fw-bold px-4 py-2" style={{ backgroundColor: "#1565c0", borderColor: "#0d47a1" }}>
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Servicios
