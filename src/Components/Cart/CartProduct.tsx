import { cartContext } from "../../main"
import { transformImageToString } from "../Productos/ProductInfo"
import { formatStringWithPoints } from "../Productos/Products"
import { useState, useEffect, useContext } from "react"

interface Props {
  id: number
  name: string
  category_name: string
  price: number
}

async function fetchImage(id: number) {
  try {
    const res = await fetch(`https://techstorebackend.vercel.app/get/images/${id}/1/0`)
    try {
      await res.json()
    } catch (jsonError) {
      const response = await fetch(`https://techstorebackend.vercel.app/get/images/${id}/1/0`)
      return transformImageToString(response);
    }
  } catch (err) {
    console.error(err)
  }
}

export default function CartProduct({ id, name, category_name, price }: Props) {

  const [image, setImage] = useState<string | null>(null)

  const { cart, setCart } = useContext(cartContext)

  function handleDelete() {
    const newCart = cart.filter((p) => p.id !== id)

    localStorage.setItem("cart", JSON.stringify(newCart))
    setCart(newCart)
  }

  useEffect(() => {
    fetchImage(id).then(img => {
      if (img) {
        setImage(img)
      } else {
        console.error(img)
      }
    })
  }, []);

  return (
    <div key={id} className="cart-product w-100 d-flex justify-content-between px-2">
      {image && <>
        <div className="r h-100 d-flex align-items-center ">
          <img src={image} alt={name} className="h-100 p-2" />
          <div className="d-flex flex-column ">
            <p className="fw-bold text-black text-start cart-p-name fs-6">{name}</p>
            <p className="fs-6 text-start">{category_name}</p>
          </div>
        </div>
        <div className="l d-flex align-items-center ">
          <p className="text-black px-2">${formatStringWithPoints(price)}</p>
          <i className="fa-solid fa-xmark text-black fs-4 ps-1" onClick={handleDelete}></i>
        </div>
      </>}
    </div>
  )
}