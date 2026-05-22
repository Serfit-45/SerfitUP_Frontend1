import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TaskFormData, TeamMember } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
    team?: TeamMember[]
}

export default function TaskForm({ errors, register, team }: TaskFormProps) {
    return (
        <>
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="name">
                    Nombre de la tarea
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="description">
                    Descripción de la tarea
                </label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    rows={4}
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors resize-none"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>

            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="assignedTo">
                    Asignar a
                </label>
                <select
                    id="assignedTo"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    {...register("assignedTo")}
                >
                    <option value="">Sin asignar</option>
                    {team?.map((member) => (
                        <option key={member._id} value={member._id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
