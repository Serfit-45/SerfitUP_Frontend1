import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import ErrorMessage from "../ErrorMessage";

type NewPasswordTokenProps = {
    token: ConfirmToken['token'];
}

export default function NewPasswordForm({ token }: NewPasswordTokenProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = { formData, token }
        mutate(data)
    }

    const password = watch('password');

    return (
        <form
            onSubmit={handleSubmit(handleNewPassword)}
            className="space-y-4 mt-4"
            noValidate
        >
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                    Nuevo Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    {...register("password", {
                        required: "El Password es obligatorio",
                        minLength: {
                            value: 8,
                            message: 'El Password debe ser mínimo de 8 caracteres'
                        }
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="password_confirmation">
                    Repetir Password
                </label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite el Password"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    {...register("password_confirmation", {
                        required: "Repetir Password es obligatorio",
                        validate: value => value === password || 'Los Passwords no son iguales'
                    })}
                />
                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Establecer Password'
                className="w-full py-2.5 font-semibold text-sm text-white uppercase tracking-wide
                           bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
            />
        </form>
    )
}
