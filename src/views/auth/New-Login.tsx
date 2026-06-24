import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { type UserLoginForm, type UserRegistrationForm } from "@/types/index";

import { Link, useNavigate } from "react-router-dom";
import { authenticateUser, createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import './new-login.css';
import Logo from '@/components/Logo';

function NewLogin() {
  
    const initialValues: UserLoginForm = {
  email: "",
  password: "",
};

const initialValuesRegister: UserRegistrationForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const loginForm = useForm<UserLoginForm>({
  defaultValues: initialValues,
});

const registerForm = useForm<UserRegistrationForm>({
  defaultValues: initialValuesRegister,
});

const {
  register: registerLogin,
  handleSubmit: handleSubmitLogin,
  formState: { errors: loginErrors },
} = loginForm;

const {
  register: registerRegister,
  handleSubmit: handleSubmitRegister,
  watch: watchRegister,
  reset: resetRegister,
  formState: { errors: registerErrors },
} = registerForm;
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

   const { mutate: mutateRegister } = useMutation({
      mutationFn: createAccount,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          toast.success(data)
          resetRegister()
      }
    });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  const password = watchRegister('password');

  const handleRegister = (formData: UserRegistrationForm) => mutateRegister(formData)


  const [isActive, setIsActive] = useState(false)
  return (
    <div className="new-login-page">
    <div className={`login-container${isActive ? ' active' : ''}`} id="container">

      <div className="form-container sign-up">
        <form onSubmit={handleSubmitRegister(handleRegister)}>
          <h1>Create Account</h1>
          <div className="">
            <Logo className="w-20 h-auto" />
          </div>
          
          <input
            type="text"
            placeholder="Nombre"
            className={registerErrors.name ? 'input-error' : ''}
            {...registerRegister("name", { required: "El Nombre de usuario es obligatorio" })}
          />
          <p className="field-error">{registerErrors.name?.message ?? ''}</p>

          <input
            type="email"
            placeholder="Email"
            className={registerErrors.email ? 'input-error' : ''}
            {...registerRegister("email", {
              required: "El Email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
            })}
          />
          <p className="field-error">{registerErrors.email?.message ?? ''}</p>

          <input
            type="password"
            placeholder="Password"
            className={registerErrors.password ? 'input-error' : ''}
            {...registerRegister("password", {
              required: "El Password es obligatorio",
              minLength: { value: 8, message: 'El Password debe ser mínimo de 8 caracteres' }
            })}
          />
          <p className="field-error">{registerErrors.password?.message ?? ''}</p>

          <input
            id='password_confirmation'
            type="password"
            placeholder="Repite Password"
            className={registerErrors.password_confirmation ? 'input-error' : ''}
            {...registerRegister("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />
          <p className="field-error">{registerErrors.password_confirmation?.message ?? ''}</p>
          <button 
            type="submit"  
           >
            Sign Up
          </button>
        </form>
        <Link
          to={`/auth/forgot-password`}
          className="text-center text-gray-500 hover:text-gray-700"
        > ¿olvidaste tu contraseña? Restablecer</Link>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSubmitLogin(handleLogin)}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <Logo className="w-24 h-auto" />
          </div>
          <span>or use your email password</span>
          <input
            id='email'
            type="email"
            placeholder="Email"
            className={loginErrors.email ? 'input-error' : ''}
            {...registerLogin("email", {
              required: "El Email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
            })}
          />
          <p className="field-error">{loginErrors.email?.message ?? ''}</p>

          <input
            type="password"
            placeholder="Password"
            className={loginErrors.password ? 'input-error' : ''}
            {...registerLogin("password", { required: "El Password es obligatorio" })}
          />
          <p className="field-error">{loginErrors.password?.message ?? ''}</p>
          
          
        <Link
          to={`/auth/forgot-password`}
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {" "}
          ¿olvidaste tu contraseña? Restablecer
        </Link>
          <button type="submit">Sign In test de prueba </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Ingresa tus datos personales para usar todas las funciones del sitio</p>
            <button className="btn-outline" type="button" onClick={() => setIsActive(false)}>
              Inicia Sesión
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>¡Hola, amigo!</h1>
            <p>Regístrate con tus datos personales para usar todas las funciones del sitio.</p>
            <button className="btn-outline" type="button" onClick={() => setIsActive(true)}>
              Registrate
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default NewLogin
