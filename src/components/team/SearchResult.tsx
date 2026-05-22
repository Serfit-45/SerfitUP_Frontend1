import { addUserToProject } from "@/api/TeamApi"
import type { TeamMember } from "@/types/index"
import { UserPlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
    team: TeamMember[]
}

export default function SearchResult({ user, reset, team }: SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const isAlreadyMember = team.some((member) => member._id === user._id)

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
        }
    })

    const handleAddUserToProject = () => {
        const data = { projectId, id: user._id }
        mutate(data)
    }

    return (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Usuario encontrado</p>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-violet-600">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                </div>

                {isAlreadyMember ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg flex-shrink-0">
                        <CheckCircleIcon className="w-4 h-4" />
                        Ya es colaborador
                    </span>
                ) : (
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex-shrink-0"
                        onClick={handleAddUserToProject}
                    >
                        <UserPlusIcon className="w-4 h-4" aria-hidden="true" />
                        Agregar
                    </button>
                )}
            </div>
        </div>
    )
}
