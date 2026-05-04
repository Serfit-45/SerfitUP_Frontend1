import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import type { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "@/api/ProfileAPI";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })

  const password = watch('password');
  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Cambiar Password</h1>
        <p className="mt-1 text-sm text-slate-500">Utiliza este formulario para actualizar tu contraseña</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="current_password">
              Password Actual
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                         focus:border-violet-500 focus:ring-violet-500 transition-colors"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="password">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                         focus:border-violet-500 focus:ring-violet-500 transition-colors"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
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
              placeholder="Repetir Password"
              className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                         focus:border-violet-500 focus:ring-violet-500 transition-colors"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                       bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
          />
        </form>
      </div>
    </div>
  )
}
