import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { type UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  });

  const password = watch('password');
  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Crear Cuenta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Llena el formulario para{' '}
          <span className="font-semibold text-violet-600">crear tu cuenta</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-4"
        noValidate
      >
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                       focus:border-violet-500 focus:ring-violet-500 transition-colors"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre de Registro"
            className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                       focus:border-violet-500 focus:ring-violet-500 transition-colors"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="password">
            Password
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
          value='Registrarme'
          className="w-full py-2.5 font-semibold text-sm text-white uppercase tracking-wide
                     bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
        />
      </form>

      <nav className="flex flex-col mt-6 space-y-3">
        <Link
          to="/auth/login"
          className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
        >
          ¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  )
}
