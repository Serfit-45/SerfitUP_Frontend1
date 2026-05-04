import type { Project, TeamMember } from "../types";

/** Función que verifica si un usuario es el gerente de un proyecto, comparando el ID del gerente con el ID del usuario.
 * Esta función se utiliza para determinar si un usuario tiene permisos de gerente en un proyecto, 
 * lo que puede afectar la visibilidad y las acciones disponibles para ese usuario en la aplicación. 
 * Devuelve true si el ID del gerente coincide con el ID del usuario, y false en caso contrario. */

export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId 


