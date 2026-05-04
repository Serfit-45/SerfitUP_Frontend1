import type { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import type React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateToken } from '@/api/AuthAPI';

type NewPasswordTokenProps = {
    token: ConfirmToken['token'];
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            setIsValidToken(true);
        }
    })

    const handleChange = (token: ConfirmToken['token']) => setToken(token)
    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

    return (
        <>
            <div className="space-y-4">
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700 text-center">
                        Código de 6 dígitos
                    </label>
                    <div className="flex justify-center gap-3">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                            <PinInputField className="w-11 h-11 text-center border border-slate-300 rounded-lg focus:border-violet-500 focus:ring-violet-500" />
                        </PinInput>
                    </div>
                </div>
            </div>
            <nav className="flex flex-col mt-6 space-y-3">
                <Link
                    to='/auth/forgot-password'
                    className="text-sm text-center text-slate-500 hover:text-violet-600 transition-colors"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}
