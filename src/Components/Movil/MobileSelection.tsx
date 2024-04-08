import { Link } from "react-router-dom"
import { useState } from "react"
import { IFormInfo, IPriceFilter, MobileSelection, changeFormInfo, formatStringWithPoints, verifyValue } from "../Productos/Products"
import PriceFilterSkeleton from "../Skeleton/PriceFilterSkeleton"

interface Props {
  formInfo: IFormInfo
  setFormInfo: React.Dispatch<React.SetStateAction<IFormInfo>>
  priceFilter: IPriceFilter
}

export default function MobileSelectionComponent({ formInfo, setFormInfo, priceFilter }: Props) {

  const [mobileSelection, setMobileSelection] = useState<MobileSelection>(null)

  function SelectFilter() {
    if (mobileSelection === "order") {
      return (
        <div className="d-flex flex-wrap text-center justify-content-center">
          <Link to="/" onClick={(e) => changeFormInfo("order", "", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "", "selected", "", formInfo)}`}>No ordenar</Link>
          <Link to="/" onClick={(e) => changeFormInfo("order", "product_price DESC", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_price DESC", "selected", "", formInfo)}`}>Mayor precio</Link>
          <Link to="/" onClick={(e) => changeFormInfo("order", "product_price ASC", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_price ASC", "selected", "", formInfo)}`}>Menor precio</Link>
          <Link to="/" onClick={(e) => changeFormInfo("order", "product_descuent", formInfo, setFormInfo, e)} className={`px-2 ${verifyValue("order", "product_descuent", "selected", "", formInfo)}`}>Descuentos</Link>
        </div>
      )
    } else if (mobileSelection === "search") {
      return (
        <div className="order-search ">
          <span className="d-flex align-items-center p-1 rounded rounded-1">
            <i className="fa-solid fa-magnifying-glass text-black" />
            <input type="search" name="search_products" id="search_products" className="border-0 bg-transparent ps-2 w-100" autoFocus placeholder="Buscar productos" onChange={(e) => changeFormInfo("search_query", e.target.value, formInfo, setFormInfo)} />
          </span>
        </div>
      )
    } else if (mobileSelection === "filter") {
      return (
        <div className="d-flex justify-content-between px-1 fs-6 text-start mobile-filter">
          <div className="filter-name d-flex flex-column">
            <b>Categoria</b>
            <Link to="/" onClick={(e) => changeFormInfo("category", 1, formInfo, setFormInfo, e)} className={`${verifyValue("category", 1, "selected", "", formInfo)}`}>Celulares</Link>
            <Link to="/" onClick={(e) => changeFormInfo("category", 2, formInfo, setFormInfo, e)} className={`${verifyValue("category", 2, "selected", "", formInfo)}`}>Tablets</Link>
            <Link to="/" onClick={(e) => changeFormInfo("category", 3, formInfo, setFormInfo, e)} className={`${verifyValue("category", 3, "selected", "", formInfo)}`}>Notebooks</Link>
            <Link to="/" onClick={(e) => changeFormInfo("category", 4, formInfo, setFormInfo, e)} className={`${verifyValue("category", 4, "selected", "", formInfo)}`}>Cargadores</Link>
            <Link to="/" onClick={(e) => changeFormInfo("category", 5, formInfo, setFormInfo, e)} className={`${verifyValue("category", 5, "selected", "", formInfo)}`}>Relojes</Link>
          </div>
          <div className="filter-name d-flex flex-column">
            <b>Marca</b>
            <Link to="/" onClick={(e) => changeFormInfo("brand", 1, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 1, "selected", "", formInfo)}`}>Apple</Link>
            <Link to="/" onClick={(e) => changeFormInfo("brand", 2, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 2, "selected", "", formInfo)}`}>Samsung</Link>
            <Link to="/" onClick={(e) => changeFormInfo("brand", 3, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 3, "selected", "", formInfo)}`}>Xiaomi</Link>
            <Link to="/" onClick={(e) => changeFormInfo("brand", 4, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 4, "selected", "", formInfo)}`}>Motorola</Link>
            <Link to="/" onClick={(e) => changeFormInfo("brand", 5, formInfo, setFormInfo, e)} className={`${verifyValue("brand", 5, "selected", "", formInfo)}`}>Huawei</Link>
          </div>
          <div className="price-filter d-flex flex-column text-start">
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
        </div>
      )
    }
  }

  function changeMobileSelection(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newValue: MobileSelection) {
    e.preventDefault()

    if (mobileSelection == newValue) {
      setMobileSelection(null)
    } else {
      setMobileSelection(newValue)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-evenly w-100">
        <a href="#" onClick={(e) => changeMobileSelection(e, "order")}><i className="fa-solid fa-arrow-down-short-wide"></i> Ordenar</a>
        <a href="#" onClick={(e) => changeMobileSelection(e, "filter")}><i className="fa-solid fa-filter"></i> Filtrar</a>
        <a href="#" onClick={(e) => changeMobileSelection(e, "search")}><i className="fa-solid fa-magnifying-glass"></i> Buscar</a>
      </div>
      <div className={`position-absolute w-100 mobile-selection z-2 bg-white py-2 border-top ${!mobileSelection ? "d-none" : ""}`}>
        <SelectFilter />
      </div>
    </>
  )
}