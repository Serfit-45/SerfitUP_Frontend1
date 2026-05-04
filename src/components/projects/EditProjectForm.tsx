import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      toast.success(data)
      navigate("/")
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = { formData, projectId };
    mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver a Proyectos
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Editar Proyecto</h1>
        <p className="mt-1 text-sm text-slate-500">Modifica los datos del proyecto</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar Cambios"
            className="w-full py-2.5 px-6 font-semibold text-sm text-white uppercase tracking-wide
                       bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer mt-2"
          />
        </form>
      </div>
    </div>
  );
}
