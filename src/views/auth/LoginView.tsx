import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { type UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Iniciando sesión...');
      navigate('/');
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="mt-5 text-2xl font-light text-white"> 
        Comienza a planear tus proyectos{""}
        <span className="font-bold text-fuchsia-500">
          {" "}
            Iniciando sesión en este formulario
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-10 mt-10 space-y-8 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-gray-300"
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

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border border-gray-300"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
        />
      </form>
      <nav className="flex flex-col mt-10 space-y-4">
        <Link
          to={`/auth/register`}
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {" "}
          No tienes cuenta? Registrate
        </Link>

        <Link
          to={`/auth/forgot-password`}
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {" "}
          ¿olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  );
}
