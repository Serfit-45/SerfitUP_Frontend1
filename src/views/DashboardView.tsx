import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/api/ProjectApi";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
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
      <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (data && user) return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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
              className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
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
                      className="block text-lg font-semibold text-slate-900 hover:text-violet-600 transition-colors truncate"
                    >
                      {project.projectName}
                    </Link>
                    <p className="mt-1 text-xs font-medium text-slate-400 uppercase tracking-wide">
                      {project.clientName}
                    </p>
                  </div>

                  <Menu as="div" className="relative flex-none">
                    <MenuButton
                      data-tour={index === 0 ? 'proyecto-menu' : undefined}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                      <MenuItems className="absolute right-0 z-10 w-48 mt-1 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-slate-900/10 focus:outline-none overflow-hidden">
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
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
              </div>

              <div className="px-6 py-3 bg-slate-50 rounded-b-xl border-t border-slate-100">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                >
                  Ver proyecto →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
            <FolderPlusIcon className="w-8 h-8 text-violet-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No hay proyectos aún</h3>
          <p className="text-sm text-slate-400 mb-6">Crea tu primer proyecto para empezar a trabajar</p>
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
