import { Link, useLocation, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { toast } from "react-toastify";
import { confirmAccount } from "@/api/AuthAPI";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const navigate = useNavigate()
  const location = useLocation()

  const { mutate, isPending } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/auth/login')
    }
  })

  // Si el enlace del email trae ?token=XXXX, confirmar automáticamente
  const tokenFromUrl = new URLSearchParams(location.search).get('token')

  useEffect(() => {
    if (tokenFromUrl) {
      mutate({ token: tokenFromUrl })
    }
  }, [tokenFromUrl, mutate])

  const handleChange = (token: ConfirmToken['token']) => setToken(token)
  const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Confirma tu Cuenta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ingresa el código que recibiste{' '}
          <span className="font-semibold text-violet-600">por e-mail</span>
        </p>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-8 gap-3 text-sm text-slate-500">
          <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
          Verificando código...
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 text-center">
            Código de 6 dígitos
          </label>
          <div className="flex justify-center gap-3">
            <PinInput otp size='lg' autoFocus value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
              <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
            </PinInput>
          </div>
        </div>
      )}

      <nav className="flex flex-col mt-6 space-y-3">
        <Link
          to='/auth/request-code'
          className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}
