import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, FolderPlusIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/api/ProjectApi";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { getInitials, daysSince, avatarColor } from "@/utils/utils";
import RadialProgress from "@/components/RadialProgress";
import DeleteProjectModal from "@/components/projects/DeletProjectModal";
import TourGuide from "@/components/tour/TourGuide";
import { DASHBOARD_STEPS, TOUR_SEEN_DASHBOARD } from "@/components/tour/tourSteps";

export default function DashboardView() {

  const location = useLocation()
  const navigate = useNavigate()

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProject
  });

  if (isLoading && authLoading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-4 rounded-full border-violet-600 border-t-transparent animate-spin" />
    </div>
  );

  if (data && user) return (
    <>
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mis Proyectos</h1>
          <p className="mt-1 text-sm text-slate-500">Maneja y administra tus proyectos</p>
        </div>
        <Link
          data-tour="nuevo-proyecto"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          to="/projects/create"
        >
          <FolderPlusIcon className="w-4 h-4" />
          Nuevo Proyecto
        </Link>
      </div>

      {data.length ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {data.map((project, index) => (
            <li
              key={project._id}
              data-tour={index === 0 ? 'proyecto-card' : undefined}
              className="flex flex-col transition-shadow duration-200 bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md"
            >
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      {isManager(project.manager, user._id) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
                          Administrador
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          Colaborador
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="block text-lg font-semibold truncate transition-colors text-slate-900 hover:text-violet-600"
                    >
                      {project.projectName}
                    </Link>
                    <p className="mt-1 text-xs font-medium tracking-wide uppercase text-slate-400">
                      {project.clientName}
                    </p>
                  </div>

                  <Menu as="div" className="relative flex-none">
                    <MenuButton
                      data-tour={index === 0 ? 'proyecto-menu' : undefined}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
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
                      <MenuItems className="absolute right-0 z-10 w-48 mt-1 overflow-hidden origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-slate-900/10 focus:outline-none">
                        <div className="py-1">
                          <MenuItem>
                            <Link
                              to={`/projects/${project._id}`}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600"
                            >
                              Ver Proyecto
                            </Link>
                          </MenuItem>
                          {isManager(project.manager, user._id) && (
                            <>
                              <MenuItem>
                                <Link
                                  to={`/projects/${project._id}/edit`}
                                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600"
                                >
                                  Editar Proyecto
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  type="button"
                                  className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                                  onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                >
                                  Eliminar Proyecto
                                </button>
                              </MenuItem>
                            </>
                          )}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <p className="mt-4 text-sm text-slate-500 line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-4">
                  <RadialProgress milestones={project.milestoneProgress} />
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-3 border-t bg-slate-50 rounded-b-xl border-slate-100">
                {/* Team avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.teamDetails.slice(0, 4).map((member) => (
                      <div
                        key={member._id}
                        title={member.name}
                        className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center ${avatarColor(member.name)}`}
                      >
                        <span className="text-[10px] font-bold text-white">{getInitials(member.name)}</span>
                      </div>
                    ))}
                    {project.teamDetails.length > 4 && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-slate-600">+{project.teamDetails.length - 4}</span>
                      </div>
                    )}
                  </div>
                  {project.teamDetails.length === 0 && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <UsersIcon className="w-3.5 h-3.5" />
                      <span>Sin colaboradores</span>
                    </div>
                  )}
                </div>

                {/* Days since creation */}
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>{daysSince(project.createdAt)}d</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-violet-100">
            <FolderPlusIcon className="w-8 h-8 text-violet-500" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-slate-700">No hay proyectos aún</h3>
          <p className="mb-6 text-sm text-slate-400">Crea tu primer proyecto para empezar a trabajar</p>
          <Link
            to='/projects/create'
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          >
            <FolderPlusIcon className="w-4 h-4" />
            Crear Proyecto
          </Link>
        </div>
      )}
      <DeleteProjectModal />
      <TourGuide steps={DASHBOARD_STEPS} seenKey={TOUR_SEEN_DASHBOARD} />
    </>
  );
}
