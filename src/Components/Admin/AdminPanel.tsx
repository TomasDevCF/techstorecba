import { Link, useParams } from "react-router-dom"
import ProductsPanel from "./ProductsPanel"
import AddPanel from "./AddPanel"
import AdminEdit from "./AdminEdit"

export default function AdminPanel() {

  const {option, product_id} = useParams()

  return (
    <main className="d-flex h-100 w-100 text-black padding-header">
      <div className="admin-options d-flex flex-column col-2 position-relative z-0">
        <b className="pt-3">Panel administrativo</b>
        <Link to="/panel/products" className="btn btn-primary fs-6"><i className="far fa-shopping-cart"></i>  Productos</Link >
        <Link to="/panel/add" className="btn btn-primary fs-6"><i className="fal fa-plus-circle fs-6"></i>  Agregar producto</Link >
      </div>
        {option == "products" && !product_id && <ProductsPanel/> }
        {option == "add" && !product_id && <AddPanel/>}
        {option == "edit" && <AdminEdit/>}
    </main>
  )
}