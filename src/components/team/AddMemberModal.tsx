import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import AddMemberForm from './AddmemberForm';

export default function AddMemberModal() {

    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');
    const show = addMember ? true : false

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
                                    <div>
                                        <DialogTitle as="h3" className="text-lg font-semibold text-slate-900">
                                            Agregar Integrante
                                        </DialogTitle>
                                        <p className="text-sm text-slate-500 mt-0.5">
                                            Busca por email para{' '}
                                            <span className="text-violet-600 font-medium">agregarlo al proyecto</span>
                                        </p>
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
                                <div className="p-6">
                                    <AddMemberForm />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
