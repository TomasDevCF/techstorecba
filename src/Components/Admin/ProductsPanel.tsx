import { useState, useEffect } from "react";
import { IProduct } from "../Inicio/App";
import ProductsList from "../Productos/ProductsList";

export default function ProductsPanel() {
  const [data, setData] = useState<IProduct[] | null>(null)
  const [maxPage, setMaxPage] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [category, setCategory] = useState<string>("")
  const [search, setSearch] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const value = e.target.value
    if (value != "") {
      setSearch(`&search_query=${value}`)
    }
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, value: string) {
    e.preventDefault()
    if (category == value) {
      setCategory("")
    } else {
      setCategory(value)
    }
  }

  useEffect(() => {
    fetch(`https://techstorebackend.vercel.app/get/products?limit=12&offset=${16 * (page - 1)}${search}${category}`)
      .then(r => r.json())
      .then(res => {
        setData(res.result)
        setMaxPage(res.max_page)
      })
      .catch(err => console.error(err));
  }, [page, search, category]);

  useEffect(() => {
    setPage(1)
  }, [search, category])

  return (
    <div className="d-flex col-10">
      <div className="categories d-flex flex-column text-start col-2 p-3 bg-primary ">
        <h5 className="text-white">Categorias</h5>
        <a href="#" onClick={e => handleClick(e, "&category=1")} className="text-white py-1">Celulares</a>
        <a href="#" onClick={e => handleClick(e, "&category=2")} className="text-white py-1">Tablets</a>
        <a href="#" onClick={e => handleClick(e, "&category=3")} className="text-white py-1">Notebooks</a>
        <a href="#" onClick={e => handleClick(e, "&category=4")} className="text-white py-1">Cargadores</a>
        <a href="#" onClick={e => handleClick(e, "&category=5")} className="text-white py-1">Relojes</a>
      </div>
      <div className="products-panel d-flex flex-column col-10">
        <div className="search-product-panel w-100 d-flex p-4 pb-2 justify-content-center align-items-center">
          <h5 className="m-0 px-2">Productos</h5>
          <span className="d-flex align-items-center p-1 rounded rounded-1 col-9">
            <i className="fa-solid fa-magnifying-glass text-black" />
            <input type="search" name="search_products" id="search_products" className="border-0 bg-transparent ps-2 w-100" placeholder="Buscar productos" onChange={handleChange} />
          </span>
        </div>
        <div className="products-info row">
          <ProductsList isAdminProduct data={data} maxPage={maxPage} page={page} setPage={setPage} skeletonQuantity={12} />
        </div>
      </div>
    </div>
  )
}