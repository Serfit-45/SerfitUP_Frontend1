import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { userSchema, type CheckPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";

/** API de autenticación, maneja las solicitudes relacionadas con la autenticación de usuarios, como creación de cuentas, 
 * inicio de sesión, confirmación de cuenta y restablecimiento de contraseña */
export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = ('/auth/create-account')
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear la cuenta');
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al crear la cuenta');
        }   
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = ('/auth/confirm-account')
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al confirmar la cuenta');
        }   
        
    }
}
    export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = ('/auth/request-code')
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al solicitar el código de confirmación');
        }   
        
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = ('/auth/login')
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al crear la cuenta');
        }   
        
    }
}
export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = ('/auth/forgot-password')
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al reestablecer la contraseña');
        }   
        
    }
}
export async function validateToken(formData: ConfirmToken) {
    try {
        const url = ('/auth/validate-token')
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al reestablecer la contraseña');
        }   
        
    }
}
export async function updatePasswordWithToken({formData, token }: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al reestablecer la contraseña');
        }   
        
    }
}

export async function getUser() {
    try {
        const {data} = await api('/auth/user')
        const response = userSchema.safeParse(data)
        if( response.success ) {
            return response.data
        }
    }catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al obtener el usuario');
        }   
    }
}

export async function checkpassword(formData: CheckPasswordForm) {
    try {
        const url = '/auth/check-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error);
        } else {
            console.error('Error inesperado:', error);
            throw new Error('Error inesperado al verificar la contraseña');
        } 
    }
}