import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IProduct } from "../Inicio/App";
import { obtainImages } from "../Productos/ProductInfo";

interface EditFormInfo {
  product_name: string
  product_quality: string
  product_category: number
  product_brand: number
  product_price: number
  product_descuent: number
}

export default function AdminEdit() {

  const [imagesPreview, setImagesPreview] = useState<(string | File)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  const [formInfo, setFormInfo] = useState<EditFormInfo>({
    product_name: "",
    product_quality: "Nuevo",
    product_category: 1,
    product_brand: 1,
    product_price: 0,
    product_descuent: 0,
  })

  const { product_id } = useParams()

  function changeFormInfo(e: any, propiertyChange: any, value: string | number) {
    e.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    setFormInfo({
      ...formInfo,
      [propiertyChange]: value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    fetch(`https://techstorebackend.vercel.app/edit/product/${product_id}`, {
      method: "PUT",
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(formInfo)
    })
      .then(res => res.json())
      .then(r => setSuccessMessage(r.message))
      .catch(err => setErrorMessage(err.message))
  }

  useEffect(() => {

    if (imagesPreview.length > 4) {
      setImagesPreview(imagesPreview.slice(0, 4))
    }
  }, [imagesPreview]);

  useEffect(() => {
    fetch(`https://techstorebackend.vercel.app/get/product/${product_id}`)
      .then(res => res.json())
      .then((r: IProduct) => {
        setFormInfo({ ...r, product_category: r.product_category.id, product_brand: r.product_brand.id })
        obtainImages([
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/0`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/1`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/2`,
          `https://techstorebackend.vercel.app/get/images/${product_id}/1/3`
        ]).then(images => setImagesPreview(images))
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <div className="d-flex flex-column w-100">
      <h4 className="w-100 p-4 pb-0 bg-secondary m-0 text-start">Agregar productos</h4>
      <form className="add-product d-flex w-100 px-3 py-3 h-100" onSubmit={handleSubmit}>
        <div className="add-product-info col-6 text-black text-start px-2">
          <h5>Informacion del producto</h5>
          <p>Nombre</p>
          <input type="text" required onChange={(e) => changeFormInfo(e, "product_name", e.target.value)} value={formInfo.product_name} />
          <p>Calidad</p>
          <div className="buttons-group w-100 d-flex pt-2">
            <button onClick={(e) => changeFormInfo(e, "product_quality", "Nuevo")} className={formInfo.product_quality == "Nuevo" ? "selected" : ""}>Nuevo</button>
            <button onClick={(e) => changeFormInfo(e, "product_quality", "Usado")} className={formInfo.product_quality == "Usado" ? "selected" : ""}>Usado</button>
          </div>
          <h5 className="pt-4">Categoria del producto</h5>
          <div className="buttons-group w-100 d-flex pt-2 d-flex flex-wrap justify-content-center">
            <button onClick={(e) => changeFormInfo(e, "product_category", 1)} className={formInfo.product_category == 1 ? "selected" : ""} >Celular</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 2)} className={formInfo.product_category == 2 ? "selected" : ""} >Tablet</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 3)} className={formInfo.product_category == 3 ? "selected" : ""} >Notebook</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 4)} className={formInfo.product_category == 4 ? "selected" : ""} >Cargador</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 5)} className={formInfo.product_category == 5 ? "selected" : ""} >Reloj</button>
          </div>
          <h5 className="pt-4">Marca del producto</h5>
          <div className="buttons-group w-100 d-flex pt-2 d-flex flex-wrap justify-content-center">
            <button onClick={(e) => changeFormInfo(e, "product_brand", 1)} className={formInfo.product_brand == 1 ? "selected" : ""} >Apple</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 2)} className={formInfo.product_brand == 2 ? "selected" : ""} >Samsung</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 3)} className={formInfo.product_brand == 3 ? "selected" : ""} >Motorola</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 4)} className={formInfo.product_brand == 4 ? "selected" : ""} >Xiaomi</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 5)} className={formInfo.product_brand == 5 ? "selected" : ""} >Huawei</button>
          </div>
        </div>
        <div className="add-product-other-info col-6 text-black text-start px-2 d-flex flex-column">
          <h5>Imagenes del producto (4 maximo)</h5>

          <div className="images-group row">
            <div className="image col-3">
              {imagesPreview && <img src={imagesPreview[0] as string} className="w-100" />}
            </div>
            <div className="image col-3">
              {imagesPreview[1] && <img src={imagesPreview[1] as string} className="w-100" />}
            </div>
            <div className="image col-3">
              {imagesPreview[2] && <img src={imagesPreview[2] as string} className="w-100" />}
            </div>
            {imagesPreview[3] &&
              <div className="image col-3">
                <img src={imagesPreview[3] as string} className="w-100" />
              </div>
            }
          </div>
          <h5 className="pt-3">Precio del producto</h5>
          <span className="col-6 d-block">
            <i className="fa-solid fa-dollar-sign col-1"></i>
            <input type="number" name="priceProduct" required id="priceProduct" className="col-11 px-1" onChange={(e) => changeFormInfo(e, "product_price", e.target.value)} value={formInfo.product_price} />
          </span>
          <p>Descuento del producto <b>(opcional)</b></p>
          <span className="col-6 d-block">
            <i className="fa-solid fa-percent col-1"></i>
            <input type="number" name="priceProduct" id="priceProduct" className="col-11 px-1" max={100} onChange={(e) => changeFormInfo(e, "product_descuent", e.target.value)} value={formInfo.product_descuent} />
          </span>
          <button type="submit" className="btn btn-success rounded w-50">Agregar producto</button>
          {errorMessage != "" && <b className="text-danger py-2">{errorMessage}</b>}
          {successMessage != "" && <b className="text-success py-2">{successMessage}</b>}
        </div>
      </form>
    </div>
  )
}