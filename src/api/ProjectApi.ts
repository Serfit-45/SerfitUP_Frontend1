import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, projectSchema, type Project, type ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

/** API de proyectos, maneja las solicitudes relacionadas con la gestión de proyectos, 
 * como creación, actualización, eliminación y obtención de proyectos */

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al crear el proyecto");        
        }
        throw new Error("Error al crear el proyecto");
    }
}

export async function getProject() {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {       
        const { data } = await api('/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al obtener los proyectos");        
        }
        throw new Error("Error al obtener los proyectos");
    }
}

export async function getProjectById(id: Project['_id']) {
    try {       
        const { data } = await api(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }    
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al obtener el proyecto");        
        }
        throw new Error("Error al obtener el proyecto");
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId?: Project['_id']
}

export async function updateProject({formData, projectId}: ProjectAPIType ) {
    try {       
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data        
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al actualizar el proyecto");        
        }
        throw new Error("Error al actualizar el proyecto");
    }
}

export async function deleteProject(id: Project['_id']) {
    try {       
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data        
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al eliminar el proyecto");        
        }
        throw new Error("Error al eliminar el proyecto");
    }
}

export async function getFullProject(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        const response = projectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        throw new Error("Respuesta del servidor inválida")
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || "Error al obtener el proyecto");
        }
        throw error
    }
}