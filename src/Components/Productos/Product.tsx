import { Link } from "react-router-dom"
import { formatStringWithPoints } from "./Products"

type Props = {
  product_id: number
  name: string
  price: number
  discount: number
  className?: string
}

export default function Product({ discount, product_id, name, price, className }: Props) {

  const priceWithDiscount = Math.floor(price - (price * (discount / 100)))

  return (
    <Link to={`/product/${product_id}`} className={`d-block padding-container px-2 py-3 ${className ? className : "col-3"}`}>
      <div className="product-container d-flex position-relative flex-column w-100 p-0 justify-content-between">
        {discount > 0 && <p className="text-white bg-danger position-absolute discount-text">{discount}%</p>}
        <img loading="lazy" src={`https://techstorebackend.vercel.app/get/images/${product_id}/1/0`} alt={name} />
        <div className="product-info-card d-flex flex-column align-items-center">
          <p className="px-2 product-name">{name}</p>
          <div className="d-flex justify-content-around align-items-end">
            {discount > 0 && <p className="text-dark text-decoration-line-through product-discount-price px-2">${formatStringWithPoints(price)}</p>}
            <p className="product-price">${formatStringWithPoints(priceWithDiscount)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}