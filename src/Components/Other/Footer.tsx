import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="d-flex flex-column align-items-center justify-content-center py-2 ">
      <section className="d-flex text-black text-start">
        <div className="px-4">
          <b>Atencion al cliente</b>
          <p>Lunes a Sabados</p>
          <p>08 a 20hs</p>
          <p>351 231-0685</p>
          <p>ontiverotomas0@gmail.com</p>
          <p>Av. Córdoba 456 PB</p>
        </div>
        <div className="px-4 d-flex flex-column">
          <b>Marcas</b>
          <Link to="/">Apple</Link>
          <Link to="/">Samsung</Link>
          <Link to="/">Xiaomi</Link>
          <Link to="/">Motorola</Link>
          <Link to="/">Huawei</Link>
        </div>
        <div className="px-4 d-flex flex-column">
          <b>Categorias</b>
          <Link to="/">Celulares</Link>
          <Link to="/">Tablets</Link>
          <Link to="/">Notebooks</Link>
          <Link to="/">Relojes</Link>
          <Link to="/">Cargadores</Link>
        </div>
      </section>
      <section className="d-flex footer-social-media text-black pt-2">
        <i className="fa-brands fa-whatsapp text-success"></i>
        <Link to="/">Whatsapp</Link>
        <i className="fa-brands fa-facebook-f"></i>
        <Link to="/">Facebook</Link>
        <i className="fa-brands fa-instagram"></i>
        <Link to="/">Instagram</Link>
      </section>
    </footer>
  )
}