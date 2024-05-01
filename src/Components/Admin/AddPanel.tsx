import { useEffect, useState } from "react"

export default function AddPanel() {

  const [imagesFile, setImagesFile] = useState<[] | File[]>([])
  const [imagesPreview, setImagesPreview] = useState<(string | File)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  const [formInfo, setFormInfo] = useState([{
    product_name: "",
    product_quality: "Nuevo",
    product_category: 1,
    product_brand: 1,
    product_price: 0,
    product_descuent: 0,
  }])

  function changeFormInfo(e: any, propiertyChange: any, value: string | number) {
    e.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    setFormInfo(prevFormInfo => {
      const updateFormInfo = prevFormInfo.map(item => {

        return {
          ...item,
          [propiertyChange]: value,
        }

      })

      return updateFormInfo
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let product_name = encodeURIComponent(formInfo[0].product_name);

    if (!imagesPreview) {
      return setErrorMessage("Elige al menos una imagen para agregar el producto.")
    }

    fetch("https://techstorebackend-605qk348u-tomas-ontiveros-projects.vercel.app      / add / products", {
      method: "POST",
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(formInfo[0])
    })
      .then(res => {
        if (!res.ok) {
          return setErrorMessage("No pudimos añadir el producto. Intentalo de nuevo.")
        } else {
          fetch(`https://techstorebackend.vercel.app/obtain/product_id?product_name=${product_name}`)
            .then(response => response.json())
            .then(data => {
              if (data.result && data.result.length > 0) {
                const product_id = data.result[0].product_id

                if (imagesFile) {

                  for (let i = 0; i < imagesFile.length; i++) {
                    const formData = new FormData()
                    formData.append("image", imagesFile[i])
                    fetch(`https://techstorebackend-605qk348u-tomas-ontiveros-projects.vercel.app/add/image?product_id=${product_id}`, {
                      method: "POST",
                      body: formData
                    })
                      .then(_ => {
                        setFormInfo([{
                          product_name: "",
                          product_quality: "Nuevo",
                          product_category: 1,
                          product_brand: 1,
                          product_price: 0,
                          product_descuent: 0,
                        }])
                        setImagesFile([])
                        setImagesPreview([])
                        return setSuccessMessage("El producto ha sido agregado con exito.")

                      })
                      .catch(_ => setErrorMessage("Ha ocurrido un error en subir las imagenes del producto."))
                  }
                }
              } else {
                return setErrorMessage("No pudimos obtener el ID del producto. Contactanos para poder solucionar el error.")
              }
            })
            .catch(_ => {
              return setErrorMessage("Hubo un error al intentar obtener el ID del producto. Contactanos para poder solucionar el error.")
            })
        }
      })
      .catch(_ => setErrorMessage("Hubo un error al añadir el producto. COntactanos para poder solucionarlo"))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const filesLength = files?.length;

    if (files && filesLength) {
      if (filesLength === 1) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesPreview(prevImages => [...prevImages, reader.result as string]);
        };
        reader.readAsDataURL(files[0]);

      } else if (filesLength > 1) {
        const newImages: string[] = [];

        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push(reader.result as string);

            if (newImages.length === filesLength) {
              setImagesPreview(prevImages => [...prevImages, ...newImages]);
            }
          };
          reader.readAsDataURL(file);
        });
      }

      if (!imagesFile) {
        setImagesFile([...files])
      } else {
        let newImagesFile: [] | File[] = []
        newImagesFile = [...imagesFile, ...files]
        setImagesFile(newImagesFile)
      }
    }
  }

  function deleteImage(indexImage: number) {
    setImagesPreview(imagesPreview.filter((_, index) => index !== indexImage))
    setImagesFile(imagesFile.filter((_, index) => index !== indexImage))
  }


  useEffect(() => {

    if (imagesPreview.length > 4) {
      setImagesPreview(imagesPreview.slice(0, 4))
    }
  }, [imagesPreview]);

  return (
    <div className="d-flex flex-column w-100">
      <h4 className="w-100 p-4 pb-0 bg-secondary m-0 text-start">Agregar productos</h4>
      <form className="add-product d-flex w-100 px-3 py-3 h-100" onSubmit={handleSubmit}>
        <div className="add-product-info col-6 text-black text-start px-2">
          <h5>Informacion del producto</h5>
          <p>Nombre</p>
          <input type="text" required onChange={(e) => changeFormInfo(e, "product_name", e.target.value)} value={formInfo[0].product_name} />
          <p>Calidad</p>
          <div className="buttons-group w-100 d-flex pt-2">
            <button onClick={(e) => changeFormInfo(e, "product_quality", "Nuevo")} className={formInfo[0].product_quality == "Nuevo" ? "selected" : ""}>Nuevo</button>
            <button onClick={(e) => changeFormInfo(e, "product_quality", "Usado")} className={formInfo[0].product_quality == "Usado" ? "selected" : ""}>Usado</button>
          </div>
          <h5 className="pt-4">Categoria del producto</h5>
          <div className="buttons-group w-100 d-flex pt-2 d-flex flex-wrap justify-content-center">
            <button onClick={(e) => changeFormInfo(e, "product_category", 1)} className={formInfo[0].product_category == 1 ? "selected" : ""} >Celular</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 2)} className={formInfo[0].product_category == 2 ? "selected" : ""} >Tablet</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 3)} className={formInfo[0].product_category == 3 ? "selected" : ""} >Notebook</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 4)} className={formInfo[0].product_category == 4 ? "selected" : ""} >Cargador</button>
            <button onClick={(e) => changeFormInfo(e, "product_category", 5)} className={formInfo[0].product_category == 5 ? "selected" : ""} >Reloj</button>
          </div>
          <h5 className="pt-4">Marca del producto</h5>
          <div className="buttons-group w-100 d-flex pt-2 d-flex flex-wrap justify-content-center">
            <button onClick={(e) => changeFormInfo(e, "product_brand", 1)} className={formInfo[0].product_brand == 1 ? "selected" : ""} >Apple</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 2)} className={formInfo[0].product_brand == 2 ? "selected" : ""} >Samsung</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 3)} className={formInfo[0].product_brand == 3 ? "selected" : ""} >Motorola</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 4)} className={formInfo[0].product_brand == 4 ? "selected" : ""} >Xiaomi</button>
            <button onClick={(e) => changeFormInfo(e, "product_brand", 5)} className={formInfo[0].product_brand == 5 ? "selected" : ""} >Huawei</button>
          </div>
        </div>
        <div className="add-product-other-info col-6 text-black text-start px-2 d-flex flex-column">
          <h5>Imagenes del producto (4 maximo)</h5>

          <div className="images-group row">
            <div className="image col-3">
              {imagesPreview[0] && <><img src={imagesPreview[0] as string} className="w-100" />
                <i onClick={() => deleteImage(0)} className="fas fa-trash-alt"></i></>}
            </div>
            <div className="image col-3">
              {imagesPreview[1] && <><img src={imagesPreview[1] as string} className="w-100" />
                <i onClick={() => deleteImage(1)} className="fas fa-trash-alt"></i></>}
            </div>
            <div className="image col-3">
              {imagesPreview[2] && <><img src={imagesPreview[2] as string} className="w-100" />
                <i onClick={() => deleteImage(2)} className="fas fa-trash-alt"></i></>}
            </div>
            {imagesPreview[3]
              ?
              <div className="image col-3">
                <img src={imagesPreview[3] as string} className="w-100" />
                {imagesPreview[3] && <i onClick={() => deleteImage(3)} className="fas fa-trash-alt"></i>}
              </div>
              : <div className="image add col-3 d-flex flex-column justify-content-center align-items-center">
                <i className="fas fa-file-plus"></i>
                <input type="file" className="form-control opacity-0 position-relative z-1" onChange={handleChange} />
                <input type="button" value="Añadir" className="btn btn-secondary rounded add-file-button position-absolute z-0" />
              </div>}
          </div>
          <h5 className="pt-3">Precio del producto</h5>
          <span className="col-6 d-block">
            <i className="fa-solid fa-dollar-sign col-1"></i>
            <input type="number" name="priceProduct" required id="priceProduct" className="col-11 px-1" onChange={(e) => changeFormInfo(e, "product_price", e.target.value)} value={formInfo[0].product_price} />
          </span>
          <p>Descuento del producto <b>(opcional)</b></p>
          <span className="col-6 d-block">
            <i className="fa-solid fa-percent col-1"></i>
            <input type="number" name="priceProduct" id="priceProduct" className="col-11 px-1" max={100} onChange={(e) => changeFormInfo(e, "product_descuent", e.target.value)} value={formInfo[0].product_descuent} />
          </span>
          <button type="submit" className="btn btn-success rounded w-50">Agregar producto</button>
          {errorMessage != "" && <b className="text-danger py-2">{errorMessage}</b>}
          {successMessage != "" && <b className="text-success py-2">{successMessage}</b>}
        </div>
      </form>
    </div>
  )
}