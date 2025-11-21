import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const emailGuardado = localStorage.getItem("authEmail")
        if (token) {
            const username = token.replace("fake-token-", "")
            setUsuario({
                nombre: username,
                email: emailGuardado || "",          
            })
    }   
    }, [])

    const iniciarSesion = (username) => {
        const token = `fake-token-${username}`
        localStorage.setItem("authToken", token)
        
        const emailGuardado = localStorage.getItem("authEmail")      
        setUsuario({
            nombre: username,
            email: emailGuardado || "",
        })
    }

    const cerrarSesion = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("authEmail")
        setUsuario(null)
    }

    const value = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        isAuthenticated: !!usuario, 
        esAdmin: usuario?.nombre === "admin",
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext debe usarse dentro de AuthProvider")
    }
    return context
}