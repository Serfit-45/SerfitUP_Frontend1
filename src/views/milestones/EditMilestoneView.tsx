import { Navigate, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMilestoneById, updateMilestone } from "@/api/MilestoneApi"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import MilestoneForm from "@/components/milestones/MilestoneForm"
import type { MilestoneFormData } from "@/types/index"

export default function EditMilestoneView() {
    const { projectId, milestoneId } = useParams()
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editMilestone', milestoneId],
        queryFn: () => getMilestoneById({ projectId: projectId!, milestoneId: milestoneId! }),
        retry: false
    })

    const { register, handleSubmit, formState: { errors } } = useForm<MilestoneFormData>({
        defaultValues: data ? { name: data.name, description: data.description } : undefined
    })

    const { mutate } = useMutation({
        mutationFn: updateMilestone,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['milestone', milestoneId] })
            queryClient.invalidateQueries({ queryKey: ['editMilestone', milestoneId] })
        }
    })

    const handleForm = (formData: MilestoneFormData) =>
        mutate({ formData, projectId: projectId!, milestoneId: milestoneId! })

    if (isLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    if (isError) return <Navigate to='/404' />
    if (data) return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver al Proyecto
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">Editar Hito</h1>
                <p className="mt-1 text-sm text-slate-500">Modifica los datos del hito</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <MilestoneForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
                    />
                </form>
            </div>
        </div>
    )
}
