import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updateProfile } from "@/api/ProfileAPI"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Mi Perfil</h1>
                <p className="mt-1 text-sm text-slate-500">Actualiza tu información personal</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="space-y-5"
                    noValidate
                >
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                                       focus:border-violet-500 focus:ring-violet-500 transition-colors"
                            {...register("name", {
                                required: "Nombre de usuario es obligatorio",
                            })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                                       focus:border-violet-500 focus:ring-violet-500 transition-colors"
                            {...register("email", {
                                required: "El e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
                    />
                </form>
            </div>
        </div>
    )
}
