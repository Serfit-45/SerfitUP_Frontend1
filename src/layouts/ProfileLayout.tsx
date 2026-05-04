import Tabs from "@/components/profile/Tabs";
import { Outlet } from "react-router-dom";

/** Componente de layout para la vista de perfil del usuario, que incluye una estructura básica 
 * con un área de pestañas para navegar entre las diferentes secciones del perfil, 
 * y un área para renderizar las vistas hijas correspondientes a cada sección del perfil utilizando Outlet. 
 * El layout utiliza el componente Tabs para mostrar las pestañas de navegación entre las secciones del perfil, 
 * y el componente Outlet para renderizar las vistas hijas correspondientes a cada sección del perfil. */
export default function ProfileLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  )
}
