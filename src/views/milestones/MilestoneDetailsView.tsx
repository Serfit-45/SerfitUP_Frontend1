import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMilestoneById } from "@/api/MilestoneApi";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import AddTaskModal from "@/components/tasks/AddTaskModel";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

export default function MilestoneDetailsView() {
    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const { projectId, milestoneId } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['milestone', milestoneId],
        queryFn: () => getMilestoneById({ projectId: projectId!, milestoneId: milestoneId! }),
        retry: false
    })

    const canEdit = useMemo(() => data?.project !== undefined, [data])

    if (isLoading && authLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    if (isError) return <Navigate to='/404' />
    if (data && user) return (
        <>
            <div className="mb-8">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver al Proyecto
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
                <p className="mt-1 text-sm text-slate-500">{data.description}</p>

                <div className="flex flex-wrap gap-3 mt-5">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >
                        <PlusIcon className="w-4 h-4" />
                        Agregar Tarea
                    </button>
                </div>
            </div>

            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
