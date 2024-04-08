import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

type Props = {
  name: string
  price: number
  discount: number
  id: number
}

export default function AdminProduct({ discount, name, price, id }: Props) {

  const priceWithDiscount = Math.floor(price - (price * (discount / 100)))

  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://techstorebackend.vercel.app/get/images/${id}/1/0`)
      .then(async res => {

        const blob = await res.blob();
        const imgUrl = URL.createObjectURL(blob);

        setImageURL(imgUrl);
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <div className="padding-container col-md-3 col-sm-4 col-6 p-3 ">
      <div className="product-container admin-product d-flex flex-column w-100 p-0">
        {imageURL ? <img loading="lazy" src={imageURL} alt={name} /> : <div className="load-img"></div>}
        <div className="product-info d-flex flex-column align-items-center">
          <p className="fs-5">{name}</p>
          <p className="text-success fs-4">${discount > 0 ? priceWithDiscount : price}</p>
          {discount > 0 && <div className="product-discount d-flex justify-content-around w-75">
            <p className="text-black text-decoration-line-through">${price}</p>
            <p className="text-danger">%{discount} OFF</p>
          </div>}
        </div>
        <div className="edit-product d-flex bg-primary p-2">
          <Link to={`/panel/edit/${id}`} className="fas fa-pencil col-4"></Link>
          <Link to={`/product/${id}`} className="far fa-eye col-4"></Link>
          <Link to="delete" className="fas fa-trash-alt col-4"></Link>
        </div>
      </div>
    </div>
  )
}