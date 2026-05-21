import { createNote } from "@/api/NoteApi";
import type { NoteFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddNoteForm() {

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const milestoneId = params.milestoneId!
  const taskId = queryParams.get("viewTask")!
  const initialValues: NoteFormData = { content: '' }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      reset()
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ formData, projectId, milestoneId, taskId })
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-2"
      noValidate
    >
      <label className="block text-sm font-semibold text-slate-700" htmlFor="content">
        Agregar Nota
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="content"
          {...register("content", { required: "El contenido es obligatorio" })}
          className="flex-1 rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                     focus:border-violet-500 focus:ring-violet-500 transition-colors"
          placeholder="Escribe el contenido de la nota..."
        />
        <input
          type="submit"
          value="Agregar"
          className="px-4 py-2 font-semibold text-sm text-white bg-violet-600 hover:bg-violet-700
                     rounded-lg transition-colors cursor-pointer flex-shrink-0"
        />
      </div>
      {errors.content && <p className="text-xs text-red-600 font-medium">{errors.content.message}</p>}
    </form>
  )
}
