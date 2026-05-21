import api from "@/lib/axios";
import { milestoneSchema, type Milestone, type MilestoneFormData, type Project } from "@/types/index";
import { isAxiosError } from "axios";

type MilestoneAPI = {
    formData: MilestoneFormData
    projectId: Project['_id']
    milestoneId: Milestone['_id']
}

export async function createMilestone({ formData, projectId }: Pick<MilestoneAPI, 'formData' | 'projectId'>) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/milestones`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al crear el hito")
        }
        throw new Error("Error al crear el hito")
    }
}

export async function getMilestones(projectId: Project['_id']) {
    try {
        const { data } = await api(`/projects/${projectId}/milestones`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener los hitos")
        }
        throw new Error("Error al obtener los hitos")
    }
}

export async function getMilestoneById({ projectId, milestoneId }: Pick<MilestoneAPI, 'projectId' | 'milestoneId'>) {
    try {
        const { data } = await api(`/projects/${projectId}/milestones/${milestoneId}`)
        const response = milestoneSchema.safeParse(data)
        if (response.success) return response.data
        throw new Error("Respuesta del servidor inválida")
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener el hito")
        }
        throw error
    }
}

export async function updateMilestone({ formData, projectId, milestoneId }: MilestoneAPI) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}/milestones/${milestoneId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al actualizar el hito")
        }
        throw new Error("Error al actualizar el hito")
    }
}

export async function deleteMilestone({ projectId, milestoneId }: Pick<MilestoneAPI, 'projectId' | 'milestoneId'>) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/milestones/${milestoneId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al eliminar el hito")
        }
        throw new Error("Error al eliminar el hito")
    }
}
