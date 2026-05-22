import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMilestoneById } from "@/api/MilestoneApi";
import { getFullProject } from "@/api/ProjectApi";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import AddTaskModal from "@/components/tasks/AddTaskModel";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
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

    const { data: project } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId!),
        retry: false
    })

    const canEdit = useMemo(() => !!(project && user && isManager(project.manager, user._id)), [project, user])

    if (isLoading && authLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 rounded-full border-violet-600 border-t-transparent animate-spin" />
        </div>
    )
    if (isError) return <Navigate to='/404' />
    if (data && user) return (
        <>
            <div className="mb-8">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 mb-4 text-sm font-medium transition-colors text-slate-500 hover:text-violet-600"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver a Hitos
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
                <p className="mt-1 text-sm text-slate-500">{data.description}</p>

                {canEdit && (
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
                )}
            </div>

            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
