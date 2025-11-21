import { createContext, useState, useContext, useEffect } from 'react'

export const GatosContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [gatos, setGatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const validarGatos = (gato) => {
    const errores = {}

    if (!gato.nombre?.trim()) {
      errores.nombre = 'El nombre es obligatorio.'
    }

    if (!gato.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.'
    } else {
      const precioLimpio = gato.precio.toString().replace(/\./g, '').replace(',', '.')
      const precioNumerico = parseFloat(precioLimpio)
     
      if (!/^[\d.,]+$/.test(gato.precio.toString().replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.'
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.'
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.'
      }
    }

    if (!gato.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.'
    } else if (gato.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.'
    } else if (gato.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.'
    }

    return errores
  }

  const validar = (gato) => {
    const errores = validarGatos(gato)
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    }
  }

  useEffect(() => {
    const cargarGatos = async () => {
      try {
        const respuesta = await fetch('https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos');
        if (!respuesta.ok) throw new Error('Error al cargar mascotas')
        const datos = await respuesta.json()
        setGatos(datos)
      } catch (error) {
        console.error('Error al cargar mascotas:', error)
        setError("Hubo un problema al cargar las mascotas.")
      } finally {
        setCargando(false)
      }
    }
    cargarGatos()
  }, [])

  const agregarGatos = async (nuevoGato) => {
    try {
      const respuesta = await fetch('https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoGato),
      })

      if (!respuesta.ok) throw new Error('Error al agregar la mascota')

      const data = await respuesta.json()
      setGatos(prev => [...prev, data])
      return data
    } catch (error) {
      console.error('Error al agregar la mascota:', error)
      throw error
    }
  }

  const editarGatos = async (gatoActualizado) => {
    try {
      const respuesta = await fetch(`https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos/${gatoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gatoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar la mascota')
      const data = await respuesta.json();
      setGatos(prev =>
        prev.map(gato =>
          gato.id === gatoActualizado.id ? data : gato
        )
      )
      return data;
    } catch (error) {
      console.error('Error al editar la mascota:', error)
      throw error
    }
  }

  return (
    <GatosContext.Provider
      value={{
        gatos,
        cargando,
        error,
        agregarGatos,
        editarGatos,
        validarGatos,
        validar
      }}>
      {children}
    </GatosContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(GatosContext)
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider')
  }
  return context
}

