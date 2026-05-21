import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateTask } from '@/api/TaskAPI';

type EditTaskModalProps = {
    data: Task
    taskId: Task['_id']
}

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!
    const milestoneId = params.milestoneId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
        defaultValues: {
            name: data.name,
            description: data.description
        }
    });

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['milestone', milestoneId] });
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true });
        }
    });

    const handleEditTask = (formData: TaskFormData) => {
        const data = { projectId, milestoneId, taskId, formData }
        mutate(data);
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                            <DialogPanel className="w-full max-w-lg overflow-hidden text-left bg-white shadow-xl rounded-2xl">
                                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                                    <div>
                                        <DialogTitle as="h3" className="text-lg font-semibold text-slate-900">
                                            Editar Tarea
                                        </DialogTitle>
                                        <p className="text-sm text-slate-500 mt-0.5">
                                            Modifica los datos en{' '}
                                            <span className="text-violet-600 font-medium">este formulario</span>
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

                                <form
                                    className="p-6 space-y-5"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                                    <TaskForm register={register} errors={errors} />
                                    <input
                                        type="submit"
                                        className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
