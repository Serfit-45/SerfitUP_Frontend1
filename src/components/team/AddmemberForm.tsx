import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamApi";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = { email: '' }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData }
        mutation.mutate(data)
    }

    const resetData = () => {
        reset()
        mutation.reset()
    }

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

            {mutation.isPending && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                    Buscando usuario...
                </div>
            )}
            {mutation.isError && (
                <div className="mt-4">
                    <ErrorMessage>{mutation.error instanceof Error ? mutation.error.message : "Error al buscar usuario"}</ErrorMessage>
                </div>
            )}
            {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
        </>
    )
}
