import { createContext, useContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {

    const [cart, setCart] = useState([])

    // Agregar al carrito
    const addToCart = (gato) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.nombre === gato.nombre)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.nombre === gato.nombre
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { ...gato, quantity: 1 }]
            }
        })
    }

    // Vaciar carrito
    const clearCart = () => setCart([])

    // Eliminar items del carrito
    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) =>
            prevCart
                .map((item, index) =>
                    index === indexToRemove
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }    

    // Calcular total
    const total = cart
        .reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2)     

    const value = {
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        total
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCartContext debe usarse dentro de CartProvider")
    }
    return context
}