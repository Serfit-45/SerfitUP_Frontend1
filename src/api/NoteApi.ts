import { isAxiosError } from "axios";
import type { Note, NoteFormData, Project, Task, Milestone } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
    formData: NoteFormData
    projectId: Project['_id']
    milestoneId: Milestone['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function createNote({ formData, projectId, milestoneId, taskId }: Pick<NoteAPIType, 'formData' | 'projectId' | 'milestoneId' | 'taskId'>) {
    try {
        const url = `projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al crear la nota")
        }
        throw new Error("Error al crear la nota")
    }
}

export async function deleteNote({ projectId, milestoneId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'milestoneId' | 'taskId' | 'noteId'>) {
    try {
        const url = `projects/${projectId}/milestones/${milestoneId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al eliminar la nota")
        }
        throw new Error("Error al eliminar la nota")
    }
}
