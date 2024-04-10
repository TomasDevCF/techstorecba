import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProductInfo } from "../Inicio/App";
import PriceFilterSkeleton from "../Skeleton/PriceFilterSkeleton";
import MobileSelection from "../Movil/MobileSelection";
import ProductsList from "./ProductsList";
import queryString from "query-string";
import MobileSelectionComponent from "../Movil/MobileSelection";

export interface IFormInfo {
  search_query: string
  category: number
  brand: number
  order: Orders
  price: Price
}

export interface IPriceFilter {
  filter1: {
    min_price: number
    max_price: number
  }
  filter2: {
    min_price: number
    max_price: number
  }
  filter3: {
    min_price: number
    max_price: number
  }
}

export type MobileSelection = null | "filter" | "order" | "search"

type Orders = "" | "product_price%20DESC" | "product_price%20ASC" | "product_descuent"
type Price = {
  max_price: number,
  min_price: number
}

export function formatStringWithPoints(num: number | string): string {
  let tempString = String(num);

  let reverseString = tempString.split('').reverse().join('');

  let stringWithPoints = (reverseString.match(/.{1,3}/g) as RegExpMatchArray).join('.');

  return stringWithPoints.split('').reverse().join('');
}

export function pagination(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newPageNumber: number, setPage: (value: React.SetStateAction<number>) => void, page: number) {
  e.preventDefault()

  setPage(page + newPageNumber)
}

export function changeFormInfo(propiertyToChange: keyof IFormInfo, newValue: string | number | Price, formInfo: IFormInfo, setFormInfo: React.Dispatch<React.SetStateAction<IFormInfo>>, e?: any) {
  const defaultFormInfo: IFormInfo = {
    search_query: "",
    category: 0,
    brand: 0,
    order: "",
    price: {
      max_price: 0,
      min_price: 0
    }
  }
  let newFormInfo: IFormInfo = defaultFormInfo

  if (e) {
    e.preventDefault()
  }

  if (formInfo[propiertyToChange] === newValue) {
    newFormInfo = { ...formInfo, [propiertyToChange]: defaultFormInfo[propiertyToChange] }
  } else {
    newFormInfo = { ...formInfo, [propiertyToChange]: newValue }
  }

  if (propiertyToChange === "brand" || propiertyToChange === "category" || propiertyToChange === "search_query" || propiertyToChange === "order") {
    newFormInfo = { ...newFormInfo, price: { max_price: 0, min_price: 0 } }
  }

  setFormInfo(newFormInfo)

}

export function verifyValue(propierty: keyof IFormInfo, value: string | number | Price, valueToReturn: boolean | string, defaultReturn: boolean | string, formInfo: IFormInfo): any {
  if (formInfo[propierty] === value) {
    return valueToReturn
  } else {
    return defaultReturn
  }
}

export default function Products() {
  const defaultFormInfo: IFormInfo = {
    search_query: "",
    category: 0,
    brand: 0,
    order: "",
    price: {
      max_price: 0,
      min_price: 0
    }
  }

  const defaultPriceFilter: IPriceFilter = {
    filter1: {
      min_price: 0,
      max_price: 0
    },
    filter2: {
      min_price: 0,
      max_price: 0
    },
    filter3: {
      min_price: 0,
      max_price: 0
    }
  }

  const [formInfo, setFormInfo] = useState<IFormInfo>(defaultFormInfo)
  const [priceFilter, setPriceFilter] = useState<IPriceFilter>(defaultPriceFilter)
  const [data, setData] = useState<IProductInfo[] | null>(null)
  const [page, setPage] = useState<number>(1)
  const [urlQuery, setUrlQuery] = useState<any>(null);
  const [maxPage, setMaxPage] = useState<number | null>(null)

  const location = useLocation()

  function priceFilterAlgorithm(r: IProductInfo[]) {
    console.log(r)
    const productsCount = r.length
    const x = Math.floor(productsCount / 4)

    const maxPrice1 = obtainMaxPriceFilter(x, r, 1)
    const maxPrice2 = obtainMaxPriceFilter(x, r, 2)
    const maxPrice3 = obtainMaxPriceFilter(x, r, 3)

    setPriceFilter({
      filter1: { max_price: maxPrice1, min_price: 1 },
      filter2: { max_price: maxPrice2, min_price: maxPrice1 },
      filter3: { max_price: maxPrice3, min_price: maxPrice2 }
    })

  }

  function obtainMaxPriceFilter(x: number, r: IProductInfo[], multiplier: number = 1): number {
    const TempMaxPrice = r[x].product_price * multiplier
    const leftPartOfMaxPrice = TempMaxPrice.toString().substring(0, 2)

    let MaxPriceZeros = ""

    for (let i = 0; i < TempMaxPrice.toString().length - 2; i++) {
      MaxPriceZeros += "0"
    }


    return parseInt(leftPartOfMaxPrice + MaxPriceZeros)
  }


  useEffect(() => {
    const queryParams = queryString.parseUrl(window.location.href.replace("#", "")).query;
    setUrlQuery(queryParams);
  }, []);

  useEffect(() => {
    console.log(urlQuery && JSON.stringify(urlQuery) != "{}" && JSON.stringify(formInfo) === JSON.stringify(defaultFormInfo))
    if (urlQuery && JSON.stringify(urlQuery) != "{}" && JSON.stringify(formInfo) === JSON.stringify(defaultFormInfo)) {
      const newFormInfo: IFormInfo = defaultFormInfo;
      for (let key in urlQuery) {
        switch (key) {
          case "brand":
            newFormInfo.brand = parseInt(urlQuery.brand as string);
            break;
          case "category":
            newFormInfo.category = parseInt(urlQuery.category as string);
            break;
          case "order":
            newFormInfo.order = urlQuery.order as Orders;
            break;
          case "price":
            newFormInfo.price.max_price = parseInt(urlQuery.max_price as string);
            newFormInfo.price.min_price = parseInt(urlQuery.min_price as string);
            break;
          case "search_query":
            newFormInfo.search_query = urlQuery.search_query as string;
            break;
          default:
            break;
        }
      }
      console.log(newFormInfo)
      setFormInfo(newFormInfo);
    }
  }, [urlQuery]);

  useEffect(() => {
    let queryFromPriceAlgorithm = "?"
    console.log(formInfo, urlQuery)

    if (formInfo != defaultFormInfo) {
      let fetchVisualDataQuery = "?"
      console.log(formInfo)
      for (let key in formInfo) {
        if (formInfo[key as keyof IFormInfo] !== defaultFormInfo[key as keyof IFormInfo]) {
          switch (key as keyof IFormInfo) {
            case "brand":
              fetchVisualDataQuery += `&brand=${formInfo.brand}`
              queryFromPriceAlgorithm += `&brand=${formInfo.brand}`
              break;
            case "category":
              fetchVisualDataQuery += `&category=${formInfo.category}`
              queryFromPriceAlgorithm += `&category=${formInfo.category}`
              break;
            case "order":
              fetchVisualDataQuery += `&order=${formInfo.order}`
              break;
            case "price":
              if (formInfo.price.min_price !== defaultFormInfo.price.min_price && formInfo.price.max_price !== defaultFormInfo.price.max_price) {
                fetchVisualDataQuery += `&min_price=${formInfo.price.min_price}&max_price=${formInfo.price.max_price}`
              }
              break;
            case "search_query":
              fetchVisualDataQuery += `&search_query=${formInfo.search_query}`
              queryFromPriceAlgorithm += `&search_query=${formInfo.search_query}`
              break;
          }
        }
      }

      setPriceFilter(defaultPriceFilter)

      fetch("https://techstorebackend.vercel.app/get/products" + queryFromPriceAlgorithm + "&limit=100&offset=0&order=product_price%20ASC")
        .then(r => r.json())
        .then(res => {
          priceFilterAlgorithm(res.result)

        })
        .catch(err => console.error(err));

      setData(null)

      fetch("https://techstorebackend.vercel.app/get/products" + fetchVisualDataQuery + `&limit=16&offset=${15 * (page - 1)}`) // * Fetch for obtain products data
        .then(r => r.json())
        .then(res => {
          window.history.pushState({}, '', window.location.protocol + "//" + window.location.host + window.location.pathname + fetchVisualDataQuery + window.location.hash.replace(fetchVisualDataQuery, ""));
          console.log(fetchVisualDataQuery, queryFromPriceAlgorithm)
          setData(res.result)
          setMaxPage(res.max_page)
        })
        .catch(err => console.error(err));


    } else {
      console.log(formInfo)
      fetch("https://techstorebackend.vercel.app/get/products?limit=100&offset=0&order=product_price%20ASC")
        .then(r => r.json())
        .then(res => {
          priceFilterAlgorithm(res.result)
        })
        .catch(err => console.error(err));

      fetch(`https://techstorebackend.vercel.app/get/products?limit=16&offset=${15 * (page - 1)}`)
        .then(r => r.json())
        .then(res => {

          if (formInfo == defaultFormInfo) {
            console.log(res);
            setData(res.result)
            setMaxPage(res.max_page)
          }
        })
        .catch(err => console.error(err))
    }
  }, [formInfo, page]);

  useEffect(() => {
    setPage(1)

  }, [formInfo]);

  useEffect(() => {
    window.scrollTo(0, 300);
  }, [location, formInfo, page]);

  return (
    <main className="w-100">
      <div className="sign-container position-relative px-5 pt-5 py-3 d-flex">
        <div className="pt-3">
          <ol className="breadcrumb m-0 pb-2">
            <Link to="/" className="breadcrumb-item">Inicio</Link>
            <li className="breadcrumb-item active">Productos</li>
          </ol>
          <h1 className="fs-4 text-start m-0 ps-1 text-black">Bienvenido a nuestro catalogo</h1>
          <p className="text-black text-start ps-1 py-3">En <b>Tech Store Córdoba</b>, te damos la bienvenida a un mundo de tecnología y accesorios. Explora nuestra amplia selección de productos electrónicos y mucho más.</p>

          <h5 className="text-start ps-1 m-0 pb-2">¿Qué espero de este catálogo?</h5>
          <div className="d-flex">
            <div className="d-flex extra-sign flex-column px-1 text-start">
              <span className="text-black"><i className="fa-solid fa-filter"></i> Filtrado por dispositivo</span>
              <span className="text-black"><i className="fa-solid fa-arrow-down-short-wide"></i> Ordena los resultados</span>
            </div>
            <div className="d-flex extra-sign flex-column px-1 text-start">
              <span className="text-black"><i className="fa-solid fa-magnifying-glass"></i> Búsqueda Rápida</span>
              <span className="text-black"><i className="fas fa-badge-check"></i> Marcas Destacadas</span>
            </div>

          </div>

          <h5 className="m-0 text-start text-black ps-1 pt-3">¡Comienza con tu compra!</h5>

        </div>
        <div className=" image-sign-container overflow-hidden h-100">
          <img loading='lazy' src="/techstoreimg4.png" alt="" className="w-100 sign-image" />
        </div>
      </div>

      <section className="products-section d-flex flex-column w-100 text-black px-5 py-3">
        <div className="order d-flex justify-content-between w-100 align-items-center">
          <b className="">Productos</b>
          <div className="order-options">
            <Link to="/" onClick={(e) => changeFormInfo("order", "", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "", "selected", "", formInfo)}`}>No ordenar</Link>
            <Link to="/" onClick={(e) => changeFormInfo("order", "product_price DESC", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_price DESC", "selected", "", formInfo)}`}>Mayor precio</Link>
            <Link to="/" onClick={(e) => changeFormInfo("order", "product_price ASC", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_price ASC", "selected", "", formInfo)}`}>Menor precio</Link>
            <Link to="/" onClick={(e) => changeFormInfo("order", "product_descuent", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_descuent", "selected", "", formInfo)}`}>Descuentos</Link>
          </div>
          <div className="order-search">
            <span className="d-flex align-items-center p-1 rounded rounded-1">
              <i className="fa-solid fa-magnifying-glass text-black" />
              <input type="search" name="search_products" id="search_products" className="border-0 bg-transparent ps-2" placeholder="Buscar productos" autoFocus onChange={(e) => changeFormInfo("search_query", e.target.value, formInfo, setFormInfo)} />
            </span>
          </div>
        </div>
        <div className="filter-products d-flex w-100 pt-3">
          <section className="filter-section col-2 pe-3">
            <div className="brands-filter py-2 d-flex flex-column text-start">
              <b>Marcas</b>
              <div className="filter d-flex justify-content-between w-100">
                <div className="filter-name d-flex flex-column">
                  <Link to="/" onClick={(e) => changeFormInfo("brand", 1, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 1, "selected", "", formInfo)}`}>Apple</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("brand", 2, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 2, "selected", "", formInfo)}`}>Samsung</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("brand", 3, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 3, "selected", "", formInfo)}`}>Xiaomi</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("brand", 4, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 4, "selected", "", formInfo)}`}>Motorola</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("brand", 5, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 5, "selected", "", formInfo)}`}>Huawei</Link>
                </div>
                <div className="filter-quantity">
                  <p>21</p>
                  <p>21</p>
                  <p>17</p>
                  <p>10</p>
                  <p>9</p>
                </div>
              </div>
            </div>
            <div className="category-filter py-2 d-flex flex-column text-start">
              <b>Categorias</b>
              <div className="filter d-flex justify-content-between w-100">
                <div className="filter-name d-flex flex-column">
                  <Link to="/" onClick={(e) => changeFormInfo("category", 1, formInfo, setFormInfo, e)} className={`${verifyValue("category", 1, "selected", "", formInfo)}`}>Celulares</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("category", 2, formInfo, setFormInfo, e)} className={`${verifyValue("category", 2, "selected", "", formInfo)}`}>Tablets</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("category", 3, formInfo, setFormInfo, e)} className={`${verifyValue("category", 3, "selected", "", formInfo)}`}>Notebooks</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("category", 4, formInfo, setFormInfo, e)} className={`${verifyValue("category", 4, "selected", "", formInfo)}`}>Cargadores</Link>
                  <Link to="/" onClick={(e) => changeFormInfo("category", 5, formInfo, setFormInfo, e)} className={`${verifyValue("category", 5, "selected", "", formInfo)}`}>Relojes</Link>
                </div>
                <div className="filter-quantity">
                  <p>34</p>
                  <p>11</p>
                  <p>7</p>
                  <p>9</p>
                  <p>17</p>
                </div>
              </div>
            </div>
            <div className="price-filter py-2 d-flex flex-column text-start">
              <b>Precio</b>

              {priceFilter.filter1.min_price != 0 ? <>
                <span>
                  <input onClick={() => {
                    changeFormInfo("price", {
                      min_price: 0,
                      max_price: 0
                    }, formInfo, setFormInfo)
                  }} type="radio" defaultChecked={0 === formInfo.price.min_price} name="priceFilter" id="" />
                  <p>Cualquier precio</p>
                </span>
                <span>
                  <input onClick={() => {
                    changeFormInfo("price", {
                      min_price: priceFilter.filter1.min_price,
                      max_price: priceFilter.filter1.max_price
                    }, formInfo, setFormInfo)
                  }} type="radio" defaultChecked={priceFilter.filter1.min_price === formInfo.price.min_price} name="priceFilter" id="" />
                  <p>$0 - ${formatStringWithPoints(priceFilter.filter1.max_price)}</p>
                </span>
                <span>
                  <input onClick={() => {
                    changeFormInfo("price", {
                      min_price: priceFilter.filter2.min_price,
                      max_price: priceFilter.filter2.max_price
                    }, formInfo, setFormInfo)
                  }} type="radio" defaultChecked={priceFilter.filter2.min_price === formInfo.price.min_price} name="priceFilter" id="" />
                  <p>${formatStringWithPoints(priceFilter.filter2.min_price)} - ${formatStringWithPoints(priceFilter.filter2.max_price)}</p>
                </span>
                <span>
                  <input onClick={() => {
                    changeFormInfo("price", {
                      min_price: priceFilter.filter3.min_price,
                      max_price: priceFilter.filter3.max_price
                    }, formInfo, setFormInfo)
                  }} type="radio" defaultChecked={priceFilter.filter3.min_price === formInfo.price.min_price} name="priceFilter" id="" />
                  <p>${formatStringWithPoints(priceFilter.filter3.min_price)} - ${formatStringWithPoints(priceFilter.filter3.max_price)}</p>
                </span>
                <span>
                  <input onClick={() => {
                    changeFormInfo("price", {
                      min_price: priceFilter.filter3.max_price,
                      max_price: 999999999
                    }, formInfo, setFormInfo)
                  }} type="radio" defaultChecked={priceFilter.filter3.max_price === formInfo.price.min_price} name="priceFilter" id="" />
                  <p>+ ${formatStringWithPoints(priceFilter.filter3.max_price)}</p>
                </span>
              </> : <PriceFilterSkeleton />}
            </div>
            <div className="admin-zone text-start">
              <Link to="/admin"><b>Administracion</b></Link>
            </div>
          </section>
          <ProductsList data={data} maxPage={maxPage} page={page} setPage={setPage} skeletonQuantity={16} />
        </div>
      </section>
      <section className="d-none flex-column w-100 py-3 position-relative mobile-products-section">

        <MobileSelectionComponent formInfo={formInfo} setFormInfo={setFormInfo} priceFilter={priceFilter} />
        <ProductsList data={data} maxPage={maxPage} page={page} setPage={setPage} skeletonQuantity={16} />
      </section>
    </main>
  )
}