import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { checkpassword } from '@/api/AuthAPI';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CheckPasswordForm } from '@/types/index';
import { deleteProject } from '@/api/ProjectApi';

export default function DeleteProjectModal() {
    const initialValues = { password: '' }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const chackUserPasswordMutation = useMutation({
        mutationFn: checkpassword,
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            toast.success(data)
            navigate(location.pathname, { replace: true })
        }
    })

    const handleForm = async (formData: CheckPasswordForm) => {
        await chackUserPasswordMutation.mutateAsync(formData)
        await deleteProjectMutation.mutateAsync(deleteProjectId)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md overflow-hidden text-left bg-white shadow-xl rounded-2xl">
                                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <DialogTitle as="h3" className="text-lg font-semibold text-slate-900">
                                                Eliminar Proyecto
                                            </DialogTitle>
                                            <p className="text-xs text-slate-500">Esta acción no se puede deshacer</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Cerrar modal"
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                    >
                                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <form
                                    className="p-6 space-y-4"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <p className="text-sm text-slate-600">
                                        Confirma la eliminación ingresando tu{' '}
                                        <span className="font-semibold text-slate-800">contraseña</span>
                                    </p>

                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password de Inicio de Sesión"
                                            className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                                                       focus:border-red-500 focus:ring-red-500 transition-colors"
                                            {...register("password", {
                                                required: "El password es obligatorio",
                                            })}
                                        />
                                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                                    </div>

                                    <input
                                        type="submit"
                                        className="w-full py-2.5 font-semibold text-sm text-white uppercase tracking-wide
                                                   bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
