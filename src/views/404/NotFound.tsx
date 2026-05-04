import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl font-black text-center text-black">404 - Página no encontrada</h1>
      <p className="mt-10 text-center text-gray-600">
        Lo sentimos, la página que estás buscando no existe.
        Tal vez quieras volver al {' '}
        <Link className="text-violet-600 hover:text-violet-700 font-medium" to={'/'}>inicio</Link>        
      </p> 
    </>
  )
}
