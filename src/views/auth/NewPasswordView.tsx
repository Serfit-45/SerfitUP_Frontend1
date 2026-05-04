import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Restablecer Password</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ingresa el código que recibiste por correo{' '}
          <span className="font-semibold text-violet-600">para crear tu nueva contraseña</span>
        </p>
      </div>

      {!isValidToken
        ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
        : <NewPasswordForm token={token} />
      }
    </>
  )
}
