import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import { cartContext } from "../../main";
import { formatStringWithPoints } from "../Productos/Products";
import CartProduct from "../Cart/CartProduct";

export default function Header() {

  const [cartGui, setCartGui] = useState(false)

  const { cart } = useContext(cartContext)

  function calculateSubTotal(): number {
    let subTotal = 0

    for (let i = 0; i < cart.length; i++) {
      subTotal += cart[i].price
    }

    return subTotal
  }

  return (
    <>
      <header className="container-fluid d-flex justify-content-between align-items-center py-1">
        <div className="header-logo d-flex align-items-center col-4">
          <img src="/public/techstore.jpg" className="logo rounded-5 " alt="Tech store Cordoba" />
          <p className="px-2 text-black ">Tech Store Cordoba</p>
        </div>
        <nav className="d-flex col-4 justify-content-center">
          <Link className="px-2" to="/"><i className="fa-solid fa-house"></i> <span>INICIO</span></Link>
          <Link className="px-2" to="/products"><i className="fa-solid fa-bag-shopping"></i> <span>PRODUCTOS</span></Link>
          <Link className="px-2" to="/us"><i className="fa-solid fa-user-group"></i> <span>NOSOTROS</span></Link>
        </nav>
        <div className="header-cart col-4 d-flex justify-content-end ">
          <i onClick={() => setCartGui(!cartGui)} className="text-black far fa-cart-shopping fs-3"></i>
        </div>
      </header>
      {cartGui && <div className="cart d-flex flex-column justify-content-between">
        <section className="cart-product-section">
          <h5 className="py-2">Tu carrito:</h5>
          {
          cart.map((p) => <CartProduct category_name={p.category_name} name={p.name} id={p.id} price={p.price} key={p.id}/>)
          }
        </section>

        <div className="w-100 border-top border-2">
          <p className="py-3 fw-bold text-black fs-6">SubTotal <span className="text-dark">(sin descuentos mayoristas)</span> ${formatStringWithPoints(calculateSubTotal())}</p>
          <div className="d-flex">
            <button onClick={() => setCartGui(false)} className="btn btn-secondary w-50 px-0">Continuar comprando</button>
            <button className="btn btn-dark w-50 px-0">Comprar ahora</button>
          </div>
        </div>
      </div>}
    </>
  )
}