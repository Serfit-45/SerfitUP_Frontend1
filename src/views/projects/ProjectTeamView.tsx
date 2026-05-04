import { getProjectTeam, removeUserFromProject } from "@/api/TeamApi";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, UserPlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

export default function ProjectTeamView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: removeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
        }
    })

    if (isLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );
    if (isError) return <Navigate to={'/404'} />

    if (data) return (
        <>
            <div className="mb-8">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Volver al Proyecto
                </Link>
                <h1 className="text-3xl font-bold text-slate-900">Equipo del Proyecto</h1>
                <p className="mt-1 text-sm text-slate-500">Administra los colaboradores de este proyecto</p>

                <div className="mt-5">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                        onClick={() => navigate(location.pathname + "?addMember=true")}
                    >
                        <UserPlusIcon className="w-4 h-4" />
                        Agregar Colaborador
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                    Miembros actuales
                    {data.length > 0 && (
                        <span className="ml-2 text-sm font-medium text-slate-400">({data.length})</span>
                    )}
                </h2>

                {data.length ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        <ul role="list" className="divide-y divide-slate-100">
                            {data.map((member) => (
                                <li key={member._id} className="flex items-center justify-between px-6 py-4 first:rounded-t-xl last:rounded-b-xl">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold text-violet-600">
                                                {member.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{member.email}</p>
                                        </div>
                                    </div>

                                    <Menu as="div" className="relative flex-none">
                                        <MenuButton className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                            <MenuItems className="absolute right-0 z-10 w-48 mt-1 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-slate-900/10 focus:outline-none overflow-hidden">
                                                <div className="py-1">
                                                    <MenuItem>
                                                        <button
                                                            type='button'
                                                            className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                                                            onClick={() => mutate({ projectId, userId: member._id })}
                                                        >
                                                            Eliminar del Proyecto
                                                        </button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
                        <p className='text-sm text-slate-400'>No hay miembros en este equipo</p>
                    </div>
                )}
            </div>
            <AddMemberModal />
        </>
    );
}
