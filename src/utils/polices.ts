import type { Project, TeamMember } from "../types";

/** Verifica si el usuario es el manager del proyecto */
export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId
