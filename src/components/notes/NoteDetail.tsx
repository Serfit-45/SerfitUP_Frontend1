import { deleteNote } from "@/api/NoteApi"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const param = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = param.projectId!
    const taskId = queryParams.get("viewTask")!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    if (isLoading) return null

    return (
        <div className="flex items-start justify-between py-3 gap-3">
            <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                    {note.content}{' '}
                    <span className="font-semibold text-slate-900">— {note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{formatDate(note.createdAt)}</p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    aria-label="Eliminar nota"
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >
                    <TrashIcon className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </div>
    )
}
