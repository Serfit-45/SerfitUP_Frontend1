import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { type ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "react-toastify";
import { forgotPassword } from "@/api/AuthAPI";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = { email: "" };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Restablecer contraseña</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ingresa tu e-mail y{' '}
          <span className="font-semibold text-violet-600">te enviaremos instrucciones</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
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
            placeholder="Email de registro"
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

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full py-2.5 font-semibold text-sm text-white uppercase tracking-wide
                     bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
        />
      </form>

      <nav className="flex flex-col mt-6 space-y-3">
        <Link
          to="/auth/login"
          className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/register"
          className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
