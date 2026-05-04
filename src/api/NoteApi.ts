import { isAxiosError } from "axios";
import type { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

/** API de notas, maneja las solicitudes relacionadas con la creación y eliminación de notas en tareas de proyectos */
type NoteAPIType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function createNote({ formData, projectId, taskId }: Pick<NoteAPIType, 'formData' | 'projectId' | 'taskId'>    ) {
    try {
        const url =`projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al crear la nota");
        }
        throw new Error("Error al crear la nota");
    }
}
export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const url =`projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.error || "Error al eliminar la nota");
    }
        throw new Error("Error al eliminar la nota");
    }
}