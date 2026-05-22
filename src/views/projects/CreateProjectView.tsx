import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"

export default function CreateProjectView() {

  const navigate = useNavigate()
  const initialValues : ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: createProject,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess(data) {
      toast.success(data)
      navigate('/')
    },
  })

  const handleForm = (formData : ProjectFormData) => mutate(formData)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to='/'
          className="inline-flex items-center gap-2 mb-4 text-sm font-medium transition-colors text-slate-600 hover:text-violet-600"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver a Proyectos
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Crear Proyecto</h1>
        <p className="mt-1 text-sm text-slate-500">Llena el siguiente formulario para crear un proyecto</p>
      </div>

      <div className="p-8 bg-white border shadow-sm rounded-xl border-slate-200">
        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm
            register={register}
            errors={errors}
          />
          <input
            type="submit"
            value='Crear Proyecto'
            className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                       bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
          />
        </form>
      </div>
    </div>
  )
}
