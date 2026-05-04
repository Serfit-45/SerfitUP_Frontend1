import { isAxiosError } from "axios";
import type { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

/** API de perfil, maneja las solicitudes relacionadas con la actualización del perfil del usuario y el cambio de contraseña */

export async function updateProfile(formData: UserProfileForm) {
    try {
       const { data } = await api.put<string>('auth/profile', formData)
       return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al actualizar el perfil");
    }
        throw new Error("Error al actualizar el perfil");
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
       const { data } = await api.post<string>('auth/update-password', formData)
       return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al cambiar la contraseña");
    }
        throw new Error("Error al cambiar la contraseña");
    }
}