import type { TaskProject } from "@/types/index";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { deleteTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: TaskProject,
  canEdit: boolean
};

export default function TaskCard({ task, canEdit }: TaskCardProps) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  })
  const navigate = useNavigate();
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  const dragStyle = {
    '--drag-x': transform ? `${transform.x}px` : '0px',
    '--drag-y': transform ? `${transform.y}px` : '0px',
  } as React.CSSProperties

  return (
    <li className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start gap-2 p-3">
        <div
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          style={dragStyle}
          className="task-draggable flex-1 min-w-0 cursor-grab active:cursor-grabbing"
        >
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {task.name}
          </p>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
        </div>

        <Menu as="div" className="relative flex-none">
          <MenuButton className="p-1 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded transition-colors">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-4 w-4" aria-hidden="true" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 w-44 mt-1 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-slate-900/10 focus:outline-none overflow-hidden">
              <div className="py-1">
                <MenuItem>
                  <button
                    type='button'
                    className='block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600'
                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                  >
                    Ver Tarea
                  </button>
                </MenuItem>
                {canEdit && (
                  <>
                    <MenuItem>
                      <button
                        type='button'
                        className='block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600'
                        onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                      >
                        Editar Tarea
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        type='button'
                        className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                        onClick={() => mutate({ projectId, taskId: task._id })}
                      >
                        Eliminar Tarea
                      </button>
                    </MenuItem>
                  </>
                )}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
