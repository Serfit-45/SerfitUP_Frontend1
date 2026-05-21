import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Milestone, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[],
  canEdit: boolean
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  undeReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: 'border-t-slate-400',
  onHold: 'border-t-amber-500',
  inProgress: 'border-t-blue-500',
  undeReview: 'border-t-violet-500',
  completed: 'border-t-emerald-500',
}

const statusDotColors: { [key: string]: string } = {
  pending: 'bg-slate-400',
  onHold: 'bg-amber-500',
  inProgress: 'bg-blue-500',
  undeReview: 'bg-violet-500',
  completed: 'bg-emerald-500',
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {

  const params = useParams()
  const projectId = params.projectId!
  const milestoneId = params.milestoneId!
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['milestone', milestoneId] })
    }
  })

  const firstTaskId = tasks[0]?._id

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e
    if (over && over.id) {
      const taskId = active.id.toString()
      const status = over.id as TaskStatus
      mutate({ projectId, milestoneId, taskId, status })

      queryClient.setQueryData(['milestone', milestoneId], (prevData: Milestone) => {
        const updatedTasks = prevData.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status }
          }
          return task
        })
        return { ...prevData, tasks: updatedTasks }
      })
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-slate-800 mb-5">Tareas</h2>

      <div data-tour="kanban-board" className="flex gap-4 pb-32 overflow-x-scroll 2xl:overflow-auto">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[270px] 2xl:min-w-0 2xl:w-1/5 flex flex-col">
              <div className={`flex items-center gap-2 bg-white rounded-t-xl border border-slate-200 border-t-4 px-4 py-3 ${statusStyles[status]}`}>
                <span className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {statusTranslations[status]}
                </h3>
                <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                  {tasks.length}
                </span>
              </div>

              <div className="flex-1 bg-slate-50 rounded-b-xl border border-t-0 border-slate-200 p-3 min-h-[120px]">
                <DropTask status={status} />
                <ul className="space-y-3">
                  {tasks.length === 0 ? (
                    <li className="py-6 text-center text-xs text-slate-400">
                      Sin tareas
                    </li>
                  ) : (
                    tasks.map((task) => (
                      <TaskCard key={task._id} task={task} canEdit={canEdit} isFirstTask={task._id === firstTaskId} />
                    ))
                  )}
                </ul>
              </div>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
