import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import type { TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createTask } from '@/api/TaskAPI';
import { getProjectTeam } from '@/api/TeamApi';

export default function AddTaskModal() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    const params = useParams();
    const projectId = params.projectId!
    const milestoneId = params.milestoneId!

    const { data: team } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const initialValues: TaskFormData = { name: '', description: '', assignedTo: '' };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['milestone', milestoneId] });
            toast.success(data)
            reset();
            navigate(location.pathname, { replace: true });
        }
    });

    const handleCreateTask = (formData: TaskFormData) => {
        const data = { formData, projectId, milestoneId }
        mutate(data);
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
                            <DialogPanel className="w-full max-w-lg overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
                                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                                    <div>
                                        <DialogTitle as="h3" className="text-lg font-semibold text-slate-900">
                                            Nueva Tarea
                                        </DialogTitle>
                                        <p className="text-sm text-slate-500 mt-0.5">
                                            Completa los datos para crear una{' '}
                                            <span className="text-violet-600 font-medium">tarea</span>
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
                                    onSubmit={handleSubmit(handleCreateTask)}
                                    noValidate
                                >
                                    <TaskForm register={register} errors={errors} team={team ?? []} />
                                    <input
                                        type="submit"
                                        value="Guardar Tarea"
                                        className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                                                   bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
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
