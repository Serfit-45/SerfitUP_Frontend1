import { isAxiosError } from 'axios';
import api from '../lib/axios';
import { type TaskFormData, type Project, type Task, type Milestone, taskSchema } from '../types';

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    milestoneId: Milestone['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({ formData, projectId, milestoneId }: Pick<TaskAPI, 'formData' | 'projectId' | 'milestoneId'>) {
    try {
        const url = `/projects/${projectId}/milestones/${milestoneId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al crear la tarea")
        }
    }
}

export async function getTaskById({ projectId, milestoneId, taskId }: Pick<TaskAPI, 'projectId' | 'milestoneId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if (response.success) return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({ projectId, milestoneId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'milestoneId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({ projectId, milestoneId, taskId }: Pick<TaskAPI, 'projectId' | 'milestoneId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({ projectId, milestoneId, taskId, status }: Pick<TaskAPI, 'projectId' | 'milestoneId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, { status })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
