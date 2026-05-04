import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import type { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status }
        mutate(data)
    }

    if (isError) {
        toast.error(error.message, { toastId: 'error' })
        return <Navigate to={`/projects/${projectId}`} />
    }

    if (data) return (
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
                            <DialogPanel className="w-full max-w-2xl overflow-hidden text-left bg-white shadow-xl rounded-2xl">
                                <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                            <ClockIcon className="w-3.5 h-3.5" />
                                            <span>Agregada el {formatDate(data.createdAt)}</span>
                                            <span>·</span>
                                            <span>Actualizada el {formatDate(data.updatedAt)}</span>
                                        </div>
                                        <DialogTitle as="h3" className="text-xl font-bold text-slate-900 leading-snug">
                                            {data.name}
                                        </DialogTitle>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Cerrar modal"
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                    >
                                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                                    <p className='text-sm text-slate-600'>{data.description}</p>

                                    {data.completedBy.length > 0 && (
                                        <div>
                                            <p className='text-sm font-semibold text-slate-700 mb-3'>Historial de cambios</p>
                                            <ul className='space-y-2'>
                                                {data.completedBy.map((activityLog) => (
                                                    <li key={activityLog._id} className="flex items-center gap-2 text-sm text-slate-600">
                                                        <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                                                        <span className='font-medium text-slate-700'>
                                                            {statusTranslations[activityLog.status]}
                                                        </span>
                                                        <span className="text-slate-400">por</span>
                                                        <span>{activityLog.user.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className='space-y-1.5'>
                                        <label className='block text-sm font-medium text-slate-700'>Estado Actual</label>
                                        <select
                                            className='w-full rounded-lg border-slate-300 shadow-sm text-sm
                                                       focus:border-violet-500 focus:ring-violet-500 transition-colors'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="border-t border-slate-100 pt-6">
                                        <NotesPanel notes={data.notes} />
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
