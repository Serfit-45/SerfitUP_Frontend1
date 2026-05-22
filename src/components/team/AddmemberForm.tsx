import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "@/types/index";
import { addUserToProject, findUserByEmail, getAllSystemUsers, getProjectTeam } from "@/api/TeamApi";
import SearchResult from "./SearchResult";
import { CheckCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = { email: '' }
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { data: team } = useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const { data: allUsers } = useQuery({
        queryKey: ["systemUsers", projectId],
        queryFn: () => getAllSystemUsers(projectId),
        retry: false
    })

    const searchMutation = useMutation({
        mutationFn: findUserByEmail
    })

    const queryClient = useQueryClient()
    const addMutation = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
            navigate(location.pathname, { replace: true })
        }
    })

    const handleSearchUser = (formData: TeamMemberForm) => {
        searchMutation.mutate({ projectId, formData })
    }

    const resetData = () => {
        reset()
        searchMutation.reset()
    }

    const teamIds = new Set(team?.map((m) => m._id) ?? [])

    return (
        <>
            <form
                className="space-y-4"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                        E-mail del Usuario
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="E-mail del usuario a agregar"
                        className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                                   focus:border-violet-500 focus:ring-violet-500 transition-colors"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="w-full py-2.5 font-semibold text-sm text-white uppercase tracking-wide
                               bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            {searchMutation.isPending && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                    Buscando usuario...
                </div>
            )}
            {searchMutation.isError && (
                <div className="mt-4">
                    <ErrorMessage>{searchMutation.error instanceof Error ? searchMutation.error.message : "Error al buscar usuario"}</ErrorMessage>
                </div>
            )}
            {searchMutation.data && <SearchResult user={searchMutation.data} reset={resetData} team={team ?? []} />}

            {allUsers && allUsers.length > 0 && (
                <div className="mt-6">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                        Usuarios en el sistema ({allUsers.length})
                    </p>
                    <ul className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                        {allUsers.map((user) => {
                            const isMember = teamIds.has(user._id)
                            return (
                                <li
                                    key={user._id}
                                    className={`flex items-center justify-between gap-3 p-2 rounded-lg transition-colors
                                        ${isMember
                                            ? 'bg-slate-50 cursor-default'
                                            : 'bg-slate-50 hover:bg-violet-50 cursor-pointer'
                                        }`}
                                    onClick={() => !isMember && addMutation.mutate({ projectId, id: user._id })}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                                            ${isMember ? 'bg-green-100' : 'bg-violet-100'}`}>
                                            <span className={`text-xs font-semibold ${isMember ? 'text-green-600' : 'text-violet-600'}`}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {isMember ? (
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <UserPlusIcon className="w-4 h-4 text-slate-300 group-hover:text-violet-500 flex-shrink-0" />
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}
