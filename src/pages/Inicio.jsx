function Inicio() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 className="mt-5"><strong>Mascotas Transfor:</strong> adopción responsable de animales</h1>
      <video
        src="videos/Video_Gatos.mp4"
        controls
        autoPlay
        loop
        muted
        style={{ width: '80%', maxWidth: '600px', borderRadius: '10px', marginTop: '20px' }}
      >
        Tu navegador no soporta la reproducción de video.
      </video>
      <div style={{ marginTop: '20px', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '700px', margin: '20px auto' }}>
        <p>Adoptar un gato es darle un hogar lleno de amor y cuidado. Antes de traer un compañero peludo a tu vida, 
        asegúrate de poder brindarle atención, cariño y un ambiente seguro.</p>
        <p>La adopción responsable salva vidas 
        y ayuda a construir un mundo más compasivo para nuestros amigos felinos. Brindarles amor ayuda a su bienestar</p>
      </div>
    </div>
  )
}

export default Inicio
