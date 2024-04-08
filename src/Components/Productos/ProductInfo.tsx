import { useEffect, useState, useContext } from "react"
import {  useParams } from "react-router-dom";
import { IProduct } from "../Inicio/App";
import ListOfProductSkeleton from "../Skeleton/ListOfProductSkeleton";
import Product from "./Product";
import { formatStringWithPoints } from "./Products";
import { CartProductInterface, cartContext } from "../../main";

export async function transformImageToString(res: Response) {
  const blob = await res.blob();
  const imgUrl = URL.createObjectURL(blob);
  return imgUrl
}

export async function obtainImages(URLS: string[]): Promise<string[]> {
  const allImages: string[] = [];

  const fetchImages = async (url: string) => {
    try {
      const response = await fetch(url);

      try {
        await response.json();
      } catch (jsonError) {
        const res = await fetch(url);
        const image = await transformImageToString(res);
        allImages.push(image);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const imageUrls = URLS;

  await Promise.all(imageUrls.map(url => fetchImages(url)));

  return allImages;
}

export default function ProductInfo() {

  const [images, setImages] = useState<string[] | null>(null)
  const [productData, setProductData] = useState<IProduct | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [priceWithDiscount, setPriceWithDiscount] = useState<null | number>(null)

  const [suggestionsData, setSuggestionsData] = useState<IProduct[] | null>(null)

  const { product_id } = useParams()
  const { setCart } = useContext(cartContext)

  function changeSelectedImage(index: number) {
    if (images) {
      setSelectedImage(images[index])
    }
  }

  function filterSuggestions(res: IProduct[]) {
    let newResponse: IProduct[] = []

    for (let i = 0; i < res.length; i++) {
      if (product_id && res[i].product_id !== parseInt(product_id)) {
        newResponse.push(res[i])
      }
    }

    setSuggestionsData(newResponse)
  }

  function addProduct() {
    if (productData && images && priceWithDiscount) {
      const prevCart = localStorage.getItem("cart")
      const newProduct: CartProductInterface = {
        name: productData.product_name,
        category_name: productData.product_category.name,
        id: productData.product_id,
        price: priceWithDiscount
      }

      if (prevCart) {
        const newCart: CartProductInterface[] = JSON.parse(prevCart)

        for (let i = 0; i < newCart.length; i++) {
          if (newCart[i].id === newProduct.id) {
            return
          }
        }

        localStorage.setItem("cart", JSON.stringify([...newCart, newProduct]))
        setCart([...newCart, newProduct])
      } else {
        localStorage.setItem("cart", JSON.stringify([newProduct]))
        setCart([newProduct])
      }
    }
  }

  useEffect(() => {
    setProductData(null)
    setImages(null)
    setSelectedImage(null)
    setSuggestionsData(null)
    fetch(`https://techstorebackend.vercel.app/get/product/${product_id}`)
      .then(res => res.json())
      .then(r => {
        setProductData(r)
        obtainImages([
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/0`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/1`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/2`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/3`
        ]).then(images => setImages(images))
        setPriceWithDiscount(Math.floor(r.product_price - (r.product_price * (r.product_descuent / 100))))
      })
      .catch(err => console.error(err))
  }, [product_id]);

  useEffect(() => {
    if (productData && images) {
      fetch(`https://techstorebackend.vercel.app/get/products/?&category=${productData.product_category.id}&limit=3&offset=0&order=product_descuent&min_price=${productData.product_price - (productData.product_price / 2)}&max_price=${productData.product_price * 2}`)
        .then(r => r.json())
        .then(res => filterSuggestions(res.result as IProduct[]))
        .catch(err => console.error(err))
    }
  }, [productData, images])

  useEffect(() => {
    if (images) {
      setSelectedImage(images[0])
    }
  }, [images]);

  return (
    <main className="py-5 vh-100">
      {images && selectedImage && <div className="product-info-page d-flex w-100 px-5">
        <div className="images d-flex w-50 align-items-center justify-content-center">
          <img className="main-image" src={selectedImage} alt={productData?.product_name} />
          <div className="other-images justify-content-center d-flex flex-column">
            {images.map((image, i) => <img className="other-image" key={i} onClick={() => changeSelectedImage(i)} src={image} alt={productData?.product_name} />)}
          </div>
        </div>
        <div className="w-50 py-4 px-1">
          <h1 className="text-start">{productData?.product_name}</h1>
          <span className="line"></span>
          <div className="d-flex align-items-center">
            <h2 className="text-start text-danger py-2 m-0">${productData && priceWithDiscount && formatStringWithPoints(priceWithDiscount)}</h2>
            <h4 className="m-0 p-2 text-start text-decoration-line-through">{productData && productData.product_descuent > 0 && "$" + formatStringWithPoints(productData.product_price)}</h4>
          </div>
          <p className="text-start fw-bold">Categoria: <b>{productData?.product_category.name}</b></p>
          <p className="text-start fw-bold">Marca:  <b>{productData?.product_brand.name}</b></p>
          <div className="d-flex flex-column flex-lg-row">
            <a className="btn btn-primary my-2 me-lg-1 me-0 px-0 w-50" href="#"><i className="fab fa-whatsapp"></i> Comprar producto</a>
            <a onClick={addProduct} className="btn btn-dark my-2 ms-lg-1 ms-0 px-0 w-50" href="#"><i className="far fa-cart-plus"></i> Agregar al carrito</a>
          </div>
          <div className="d-flex product-info-aclaration">
            <span className="d-block w-50"></span>
            <p className="text-start fw-bold w-50 fs-6">(Descuento por mayorista)</p>
          </div>
          <div className="row">
            {suggestionsData ? suggestionsData.slice(0, 2).map((p, i) => <Product discount={p.product_descuent} name={p.product_name} price={p.product_price} product_id={p.product_id} className="col-6" key={i} />) : <ListOfProductSkeleton quantityOfProducts={2} className="col-6" />}
          </div>
        </div>
      </div>
      }
    </main>
  )
}

