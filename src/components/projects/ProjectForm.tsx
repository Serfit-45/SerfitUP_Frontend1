import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import type { ProjectFormData } from '@/types/index'

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({errors, register} : ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-1.5">
                <label htmlFor="projectName" className="block text-sm font-medium text-slate-700">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />
                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-1.5">
                <label htmlFor="clientName" className="block text-sm font-medium text-slate-700">
                    Nombre del Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-1.5">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors resize-none"
                    rows={4}
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
