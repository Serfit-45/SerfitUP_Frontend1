import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/** Layout exclusivo para New-Login. No impone ancho fijo ni fondo,
 * permitiendo que el componente use sus propios estilos de pantalla completa. */
export default function NewLoginLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
