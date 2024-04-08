import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCode() {

  const adminCode = "hola123"
  const navigate = useNavigate()
  const [inputText, setInputText] = useState<string>("")
  const [isWrong, setIsWrong] = useState<boolean>(false)
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value)
    setIsWrong(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (inputText === adminCode) {
      navigate("/panel/products")
    } else {
      setIsWrong(true)
    }
  }



  return (
    <main className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="admin-login text-black d-flex flex-column align-items-center col-4 bg-secondary justify-content-center position-relative">
        <div className="icon position-absolute">
          <i className="fa-solid fa-hammer bg-primary text-white p-4 "></i>
        </div>
        <b className="pt-5">Para entrar a la zona administrativa debes ingresar nuestro codigo.</b>
        <form onSubmit={handleSubmit} className="code-input pt-4 pb-1">
          <span className="bg-white d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-lock bg-primary text-light px-2 d-flex justify-content-center align-items-center"></i>
            <input onChange={handleChange} type="text" name="adminCode" id="adminCode" className="border-0 px-1" placeholder="Ingresar codigo" />
          </span>
        </form>
        {isWrong && <div className="error">
          <p className="text-danger m-0">El codigo es incorrecto.</p>
        </div>}
        <div className="icons pt-3">
          <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-tiktok"></i></a>
        </div>
      </div>
    </main>
  )
}