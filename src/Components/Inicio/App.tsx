import '../../App.css'
import { Link } from 'react-router-dom'

export interface IProduct {
  product_id: number
  product_name: string
  product_quality: string
  product_category: {
    name: string
    id: number
  }
  product_brand: {
    name: string
    id: number
  }
  product_price: number
  product_descuent: number
}

export interface IProductInfo {
  product_id: number
  product_name: string
  product_price: number
  product_descuent: number
}

function App() {

  return (
    <main>
      <div className="sign-container position-relative px-5 pt-5 py-3 d-flex">
        <div className=" pt-3">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item active">Inicio</li>
          </ol>
          <h1 className="fs-4 text-start m-0 ps-1 text-black">Bienvenido a Tech Store Cba</h1>
          <p className="text-black text-start ps-1 py-3">En <b>Tech Store Córdoba</b>, no solo vendemos productos electrónicos y accesorios; creamos experiencias. Somos más que una tienda, somos tu socio tecnológico. Permítenos guiarte a través de un mundo de innovación y posibilidades.</p>

          <h5 className="text-start ps-1 m-0 pb-2">¿Por que comprar aqui?</h5>
          <div className="d-flex extra-sign">
            <div className="d-flex flex-column px-1 text-start">
              <span className="text-black"><i className="fa-regular fa-circle-check text-success"></i> Calidad garantizada</span>
              <span className="text-black"><i className="fa-regular fa-circle-check text-success"></i> Excelente asesoramiento</span>
            </div>
            <div className="d-flex flex-column px-1 text-start">
              <span className="text-black"><i className="fa-regular fa-circle-check text-success"></i> Servicio técnico confiable</span>
              <span className="text-black"><i className="fa-regular fa-circle-check text-success"></i> Promociones exclusivas</span>
            </div>

          </div>

          <h5 className="m-0 text-start text-black ps-1 pt-3">Comienza tu compra</h5>
          <div className="d-flex ps-1 extra-sign">
            <Link to="/products" className="btn btn-primary text-center d-block my-2 me-2">Ver productos</Link>
            <Link to="/us" className="btn btn-secondary text-center d-block my-2 me-2">Conocenos</Link>
          </div>

        </div>
        <div className="image-sign-container overflow-hidden h-100">
          <img loading='lazy' src="/techstoreimg.png" alt="" className="w-100 sign-image" />
        </div>
      </div>
      <div className="sign-container bg-black position-relative px-5 py-3 d-flex z-1">

        <div className="image-sign-container overflow-hidden h-100">
          <img loading='lazy' src="/techstoreimg3.png" alt="Mackbook pro" className="w-100 pe-5" />
        </div>
        <div className="">
          <h1 className="fs-4 text-start m-0 ps-1 text-white">Explora las nuevas Tecnologías</h1>
          <p className="text-white text-start ps-1 py-3">En nuestra tienda, destacamos los productos más innovadores y vanguardistas que ofrecemos en Tech Store Córdoba. Desde dispositivos comunes hasta relojes inteligentes, invitaremos a los visitantes a explorar la tecnología que está transformando nuestras vidas.</p>

          <h5 className="text-start ps-1 m-0 pb-2 text-white">¿Que son los smartwatches?</h5>
          <p className="text-white text-start ps-1 pb-3 pt-1">Los relojes inteligentes o smartwatches son dispositivos portátiles que se llevan en la muñeca y ofrecen mucho más que simplemente mostrar la hora.</p>
          <h5 className="text-start ps-1 m-0 pb-2 text-white">Compra nuestros relojes</h5>
          <div className="d-flex  extra-sign">
            <Link to={"/products"} className="btn btn-secondary text-start d-block my-2 me-2">Ver relojes</Link>
          </div>
        </div>
      </div>
      <div className="sign-container position-relative px-5 py-3 d-flex">
        <div className="">
          <h1 className="fs-4 text-start m-0 ps-1 text-black">Ofertas y descuentos especiales</h1>
          <p className="text-black text-start ps-1 py-3">Resaltaremos las promociones exclusivas que Tech Store Córdoba ofrece a sus clientes. Desde descuentos en productos hasta paquetes especiales, queremos que los visitantes se sientan tentados a comprar con nosotros.</p>

          <h5 className="text-start ps-1 m-0 pb-2 text-black">¿Como consigo los descuentos exclusivos?</h5>
          <p className="text-black text-start ps-1 pt-1">¡Consigue los descuentos semanales y mensuales siguiendonos en nuestro Instagram o Facebook, donde publicamos impresionantes descuentos para tus compras!</p>
          <div className="d-flex extra-sign">
            <a href='https://instagram.com/tomasontivero10' target='_blank' className="btn btn-primary text-start d-block my-2 me-2">Ver nuestro Instagram</a>
            <a href='https://instagram.com/tomasontivero10' target='_blank' className="btn btn-secondary text-start d-block my-2 me-2">Ver nuestro Facebook</a>
          </div>
        </div>

        <div className="image-sign-container overflow-hidden">
          <img loading='lazy' src="/techstoreimg2.png" alt="Mackbook pro" className="w-100 pe-5" />
        </div>
      </div>
    </main>
  )
}

export default App
