import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

/** Custom hook que se encarga de obtener los datos del usuario autenticado utilizando React Query.
 * El hook realiza una consulta para obtener los datos del usuario autenticado, y devuelve el resultado de la consulta, 
 * incluyendo los datos del usuario, un indicador de error y un indicador de carga. 
 * Este hook se puede utilizar en cualquier componente que necesite acceder a los datos del usuario autenticado, 
 * proporcionando una forma centralizada de manejar la lógica de autenticación y el estado del usuario en la aplicación. */
export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    })

     return { data, isError, isLoading }
}  
