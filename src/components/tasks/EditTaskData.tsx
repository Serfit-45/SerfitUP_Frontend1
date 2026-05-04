import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

/** Componente que se encarga de mostrar el modal para editar una tarea existente.
 * Utiliza React Query para obtener los datos de la tarea a editar, y React Router para manejar la navegación y los parámetros de la URL. 
 * Si la tarea no existe o hay un error al obtener los datos, redirige a una página de error 404. */

export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!


    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId, //!! convierte a booleano, si taskId es null o undefined, enabled será false y la consulta no se ejecutará
        retry: false
    })
    
    if(isError) return <Navigate to='/404' />

    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}
