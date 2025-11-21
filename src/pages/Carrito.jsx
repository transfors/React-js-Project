import { Link, useNavigate } from "react-router-dom"
import { useCartContext } from "../context/CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Carrito() {
    const { cart, clearCart, removeFromCart, total } = useCartContext()
    const navigate = useNavigate()

    const irAPagar = () => {
        navigate("/pagar", { state: { cart } })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h2 className="text-center mb-4 fw-bold bg-primary-subtle text-primary rounded p-2">
                            Ticket de Compras
                        </h2>

                        {cart.length === 0 ? (
                            <div className="empty-cart d-flex flex-column align-items-center justify-content-center min-height-400">
                                <p className="text-center fw-bold text-muted font-italic mb-4">
                                    <strong>El carrito está vacío</strong>
                                </p>
                                <Link
                                    to="/gatos"
                                    className="text-decoration-none"
                                >
                                    <button
                                        className="btn btn-secondary mt-3 text-center d-block mx-auto fw-bold rounded fs-6 w-200"
                                    >
                                        Ver otras mascotas
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="products-list">
                                    {cart.map((item, index) => (
                                        <div
                                            key={index}
                                            className="product-item d-flex border-bottom border-secondary-subtle rounded py-3 align-items-center"
                                        >
                                            <img
                                                src={item.imagen}
                                                alt={item.nombre}
                                                width="70"
                                                height="100"
                                                className="rounded me-3 border object-fit-cover"
                                            />
                                            <div className="product-info">
                                                <strong>
                                                    {item.nombre.split(' ')[0]}
                                                    <span className="d-inline d-sm-none"><br /></span>
                                                    {" " + item.nombre.split(' ').slice(1).join(' ')}
                                                </strong>
                                                <span className="mx-2">x {item.quantity}</span>
                                            </div>
                                            <div className="price-section ms-auto d-flex align-items-center">
                                                <span className="me-2">$ {(item.precio * item.quantity)}</span>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="text-danger cursor-pointer"
                                                    onClick={() => removeFromCart(index)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="total-section mt-4">
                                    <div className="total-container bg-primary text-light border border-2 border-primary-subtle rounded-2 fw-bold p-2 fs-5 mb-4 text-center">
                                        Total: $ {total}

                                    </div>

                                    <div className="buttons-container text-center gap-3">
                                        <button
                                            onClick={clearCart}
                                            className="btn btn-danger fw-bold rounded fs-6 w-200"
                                        >
                                            Vaciar Carrito
                                        </button>

                                        <div className="d-flex gap-3 flex-wrap justify-content-center border-secondary-subtle border-top pt-3 mt-4">
                                            <button
                                                onClick={irAPagar}
                                                className="btn btn-success fw-bold mt-3 rounded fs-6 w-200"
                                            >
                                                Pagar
                                            </button>
                                            <Link
                                                to="/gatos"
                                                className="text-decoration-none"
                                            >
                                                <button
                                                    className="btn btn-secondary mt-3 text-center fw-bold rounded fs-6 w-200"
                                                >
                                                    Ver más mascotas
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}