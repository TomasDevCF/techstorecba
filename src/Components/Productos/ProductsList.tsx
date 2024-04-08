import { IProduct } from "../Inicio/App"
import AdminProduct from "../Admin/AdminProduct"
import ListOfProductSkeleton from "../Skeleton/ListOfProductSkeleton"
import Product from "./Product"
import { pagination } from "./Products"

interface Props {
  data: IProduct[] | null
  maxPage: number | null
  page: number
  setPage?: (value: React.SetStateAction<number>) => void
  skeletonQuantity: number
  isAdminProduct?: boolean
}

export default function ProductsList({ data, maxPage, page, setPage, skeletonQuantity, isAdminProduct}: Props) {
  return (
      <section className={`product-section row ${isAdminProduct ? "col-12" : "col-lg-10 col-12"}`}>

      {data ? (!isAdminProduct ? 
      data.map((p) => <Product discount={p.product_descuent} name={p.product_name} price={p.product_price} key={p.product_id} className='col-md-3 col-sm-4 col-6' product_id={p.product_id} />)
      : 
      data.map((p) => <AdminProduct discount={p.product_descuent} name={p.product_name} price={p.product_price} key={p.product_id} id={p.product_id} />)) 
      : <ListOfProductSkeleton quantityOfProducts={skeletonQuantity} />}

      {setPage && <div className="pagination-section col-12 py-2">
        <nav aria-label="Page navigation">
          {maxPage &&
            <ul className="pagination justify-content-end">
              <li className={`page-item ${page === 1 && "disabled"}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, -1, setPage, page)}>Ant.</a></li>
              {page - 2 >= 1 && <li className={`page-item ${page - 2}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, -2, setPage, page)}>{page - 2}</a></li>}
              {page - 1 >= 1 && <li className={`page-item ${page - 1}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, -1, setPage, page)}>{page - 1}</a></li>}

              <li className={`page-item ${page && "active"}`}><a className="px-3 page-link" href="#">{page}</a></li>

              {page + 1 <= maxPage && <li className={`page-item ${page + 1}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, 1, setPage, page)}>{page + 1}</a></li>}
              {page + 2 <= maxPage && <li className={`page-item ${page + 2}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, 2, setPage, page)}>{page + 2}</a></li>}
              <li className={`page-item ${page === maxPage && "disabled"}`}><a className="px-3 page-link" href="#" onClick={e => pagination(e, 1, setPage, page)}>Sig.</a></li>
            </ul>}
        </nav>
      </div>}
    </section>
  )
}