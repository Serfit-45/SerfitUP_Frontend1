import { Fragment } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectApi";
import { deleteMilestone } from "@/api/MilestoneApi";
import { PlusIcon, UsersIcon, ArrowLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

export default function ProjectDetailsView() {
    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    const { mutate: removeMilestone } = useMutation({
        mutationFn: deleteMilestone,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        }
    })

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
                    to="/"
                    className="inline-flex items-center gap-2 mb-4 text-sm font-medium transition-colors text-slate-500 hover:text-violet-600"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver a Mis Proyectos
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">{data.projectName}</h1>
                <p className="mt-1 text-sm text-slate-500">{data.description}</p>

                {isManager(data.manager, user._id) && (
                    <div className="flex flex-wrap gap-3 mt-5">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                                       bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                            onClick={() => navigate(`/projects/${projectId}/milestones/create`)}
                        >
                            <PlusIcon className="w-4 h-4" />
                            Agregar Hito
                        </button>
                        <Link
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

            <h2 className="mb-5 text-xl font-semibold text-slate-800">Hitos</h2>

            {data.milestones.length ? (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {data.milestones.map((milestone) => (
                        <li
                            key={milestone._id}
                            className="flex flex-col transition-shadow duration-200 bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md"
                        >
                            <div className="flex-1 p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/projects/${projectId}/milestones/${milestone._id}`}
                                            className="block text-lg font-semibold truncate transition-colors text-slate-900 hover:text-violet-600"
                                        >
                                            {milestone.name}
                                        </Link>
                                        <p className="mt-2 text-sm text-slate-500 line-clamp-2">{milestone.description}</p>
                                    </div>

                                    {canEdit && (
                                        <Menu as="div" className="relative flex-none">
                                            <MenuButton className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                                <EllipsisVerticalIcon className="w-5 h-5" />
                                            </MenuButton>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <MenuItems className="absolute right-0 z-10 w-48 mt-1 overflow-hidden origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-slate-900/10 focus:outline-none">
                                                    <div className="py-1">
                                                        <MenuItem>
                                                            <Link
                                                                to={`/projects/${projectId}/milestones/${milestone._id}`}
                                                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600"
                                                            >
                                                                Ver Hito
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <Link
                                                                to={`/projects/${projectId}/milestones/${milestone._id}/edit`}
                                                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600"
                                                            >
                                                                Editar Hito
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <button
                                                                type="button"
                                                                className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                                                                onClick={() => removeMilestone({ projectId, milestoneId: milestone._id })}
                                                            >
                                                                Eliminar Hito
                                                            </button>
                                                        </MenuItem>
                                                    </div>
                                                </MenuItems>
                                            </Transition>
                                        </Menu>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-3 border-t bg-slate-50 rounded-b-xl border-slate-100">
                                <Link
                                    to={`/projects/${projectId}/milestones/${milestone._id}`}
                                    className="text-sm font-medium transition-colors text-violet-600 hover:text-violet-700"
                                >
                                    Ver Tareas →
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-violet-100">
                        <PlusIcon className="w-8 h-8 text-violet-500" />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-slate-700">No hay hitos aún</h3>
                    <p className="mb-6 text-sm text-slate-400">Crea el primer hito para organizar las tareas</p>
                    {canEdit && (
                        <button
                            type="button"
                            onClick={() => navigate(`/projects/${projectId}/milestones/create`)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Crear Hito
                        </button>
                    )}
                </div>
            )}
        </>
    )
}
