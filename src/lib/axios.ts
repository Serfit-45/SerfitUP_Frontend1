import axios from 'axios'

/** Configuración de una instancia de Axios para realizar solicitudes HTTP a la API de la aplicación,
 * con una URL base definida en las variables de entorno. La instancia de Axios también incluye 
 * un interceptor de solicitudes que agrega un token de autenticación a las cabeceras de las solicitudes si el token 
 * está presente en el almacenamiento local del navegador. 
 * Esta configuración permite centralizar la lógica de autenticación y la URL base para todas las solicitudes HTTP 
 * realizadas a través de esta instancia de Axios, facilitando la gestión de la comunicación con la API en toda la aplicación. */

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default api  