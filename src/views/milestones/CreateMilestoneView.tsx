import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import MilestoneForm from "@/components/milestones/MilestoneForm"
import type { MilestoneFormData } from "@/types/index"
import { createMilestone } from "@/api/MilestoneApi"

export default function CreateMilestoneView() {
    const { projectId } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const initialValues: MilestoneFormData = { name: "", description: "" }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createMilestone,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            navigate(`/projects/${projectId}`)
        },
    })

    const handleForm = (formData: MilestoneFormData) => mutate({ formData, projectId: projectId! })

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 mb-4 text-sm font-medium transition-colors text-slate-600 hover:text-violet-600"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver a Hitos
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">Crear Hito</h1>
                <p className="mt-1 text-sm text-slate-500">Llena el siguiente formulario para crear un hito</p>
            </div>

            <div className="p-8 bg-white border shadow-sm rounded-xl border-slate-200">
                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <MilestoneForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value='Crear Hito'
                        className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
                    />
                </form>
            </div>
        </div>
    )
}
