import { useEffect, createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/Inicio/App.tsx'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Header from './Components/Other/Header.tsx'
import Products from './Components/Productos/Products.tsx'
import Us from './Components/Other/Us.tsx'
import Error from './Components/Other/Error.tsx'
import ProductInfo from './Components/Productos/ProductInfo.tsx'
import AdminCode from './Components/Admin/AdminCode.tsx'
import AdminPanel from './Components/Admin/AdminPanel.tsx'

interface CartContextInterface {
  cart: CartProductInterface[]
  setCart: (newCart: CartProductInterface[]) => void
}

const defaultCart: CartContextInterface = {
  cart: [],
  setCart: () => { }
}

export interface CartProductInterface {
  id: number
  name: string
  category_name: string
  price: number
}

interface Props {
  children: JSX.Element
}

export const cartContext = createContext<CartContextInterface>(defaultCart)


function CartProvider({ children }: Props) {

  let newCart: CartProductInterface[] = []

  if (localStorage.getItem("cart")) {
    newCart = JSON.parse(localStorage.getItem("cart") as string)
  }

  const [cart, setCart] = useState<CartProductInterface[]>(newCart)

  const value = { cart, setCart }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <cartContext.Provider value={value}>{children}</cartContext.Provider>
  )
}


function Main() {

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location]);

  return (
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/products' element={<Products />}></Route>
      <Route path='/search/:query' element={<Products />}></Route>
      <Route path='/us' element={<Us />}></Route>
      <Route path='/product/:product_id' element={<ProductInfo />}></Route>
      <Route path='/admin' element={<AdminCode />}></Route>
      <Route path='/panel/:option' element={<AdminPanel />}></Route>
      <Route path='/panel/:option/:product_id' element={<AdminPanel />}></Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Router>
    <CartProvider>
      <>
        <Header />
        <Main />
      </>
    </CartProvider>
  </Router>,
)
