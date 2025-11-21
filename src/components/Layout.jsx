import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useCartContext } from "../context/CartContext"

function Layout() {

  const { cart } = useCartContext()

  return (
    <>
      <Navbar cart={cart} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
