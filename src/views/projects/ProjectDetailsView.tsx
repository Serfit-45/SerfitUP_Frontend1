import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectApi";
import { PlusIcon, UsersIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import AddTaskModal from "@/components/tasks/AddTaskModel";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { useMemo } from "react";
import TourGuide from "@/components/tour/TourGuide";
import { DETAILS_STEPS, TOUR_SEEN_DETAILS } from "@/components/tour/tourSteps";

export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading && authLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );
    if (isError) return <Navigate to='/404' />
    if (data && user) return (
        <>
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Mis Proyectos
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">{data.projectName}</h1>
                <p className="mt-1 text-sm text-slate-500">{data.description}</p>

                {isManager(data.manager, user._id) && (
                    <div className="flex flex-wrap gap-3 mt-5">
                        <button
                            data-tour="agregar-tarea"
                            type="button"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                                       bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                            onClick={() => navigate(location.pathname + '?newTask=true')}
                        >
                            <PlusIcon className="w-4 h-4" />
                            Agregar Tarea
                        </button>

                        <Link
                            data-tour="colaboradores"
                            to={'team'}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                                       border border-violet-300 text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
                        >
                            <UsersIcon className="w-4 h-4" />
                            Colaboradores
                        </Link>
                    </div>
                )}
            </div>

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
            <TourGuide steps={DETAILS_STEPS} seenKey={TOUR_SEEN_DETAILS} />
        </>
    )
}
