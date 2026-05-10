export const TOUR_SEEN_DASHBOARD = 'SERFIT_TOUR_DASHBOARD'
export const TOUR_SEEN_DETAILS = 'SERFIT_TOUR_DETAILS'

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TourStep {
  id: string
  title: string
  description: string
  placement: TourPlacement
  optional?: boolean
}

export const DASHBOARD_STEPS: TourStep[] = [
  {
    id: 'nuevo-proyecto',
    title: 'Crear un proyecto',
    description: 'Haz clic aquí para crear tu primer proyecto. Podrás asignarle nombre, cliente y descripción.',
    placement: 'bottom',
  },
  {
    id: 'proyecto-card',
    title: 'Tus proyectos',
    description: 'Cada tarjeta es un proyecto. Haz clic en el nombre para ver su tablero de tareas.',
    placement: 'bottom',
    optional: true,
  },
  {
    id: 'proyecto-menu',
    title: 'Opciones del proyecto',
    description: 'El menú de tres puntos permite editar o eliminar el proyecto si eres administrador.',
    placement: 'left',
    optional: true,
  },
]

export const DETAILS_STEPS: TourStep[] = [
  {
    id: 'agregar-tarea',
    title: 'Agregar una tarea',
    description: 'Crea nuevas tareas dentro del proyecto. Solo los administradores pueden agregar tareas.',
    placement: 'bottom',
    optional: true,
  },
  {
    id: 'colaboradores',
    title: 'Gestión de colaboradores',
    description: 'Invita a otros usuarios para que colaboren en este proyecto.',
    placement: 'bottom',
    optional: true,
  },
  {
    id: 'kanban-board',
    title: 'Tablero Kanban',
    description: 'Arrastra las tarjetas entre columnas para actualizar el estado: Pendiente, En Progreso, Completado.',
    placement: 'top',
  },
  {
    id: 'task-card-menu',
    title: 'Opciones de la tarea',
    description: 'El menú ⋮ de cada tarea permite Ver, Editar o Eliminar. Al ver una tarea puedes cambiar su estado, agregar notas y revisar el historial de cambios de estado.',
    placement: 'left',
    optional: true,
  },
]
