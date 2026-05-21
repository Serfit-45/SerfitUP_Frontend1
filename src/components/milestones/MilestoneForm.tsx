import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import type { MilestoneFormData } from '@/types/index'

type MilestoneFormProps = {
    register: UseFormRegister<MilestoneFormData>
    errors: FieldErrors<MilestoneFormData>
}

export default function MilestoneForm({ errors, register }: MilestoneFormProps) {
    return (
        <>
            <div className="mb-5 space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Nombre del Hito
                </label>
                <input
                    id="name"
                    className="w-full rounded-lg border-slate-300 shadow-sm text-sm placeholder:text-slate-400
                               focus:border-violet-500 focus:ring-violet-500 transition-colors"
                    type="text"
                    placeholder="Nombre del Hito"
                    {...register("name", {
                        required: "El nombre del hito es obligatorio",
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
                    placeholder="Descripción del Hito"
                    {...register("description", {
                        required: "La descripción del hito es obligatoria"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
        </>
    )
}
