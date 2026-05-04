import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon, FolderIcon, ArrowRightStartOnRectangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import type { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
    name: User['name']
}

export default function NavMenu({ name }: NavMenuProps) {

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
        <Bars3Icon className='w-5 h-5' />
        <span className="hidden sm:inline">{name}</span>
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 z-20 mt-2 w-56">
          <div className="rounded-xl bg-white shadow-xl ring-1 ring-slate-900/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className='text-xs text-slate-400 font-medium uppercase tracking-wide'>Cuenta</p>
              <p className='text-sm font-semibold text-slate-800 mt-0.5 truncate'>{name}</p>
            </div>
            <div className="py-1">
              <Link
                to='/profile'
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors'
              >
                <UserCircleIcon className="w-4 h-4 text-slate-400" />
                Mi Perfil
              </Link>
              <Link
                to='/'
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors'
              >
                <FolderIcon className="w-4 h-4 text-slate-400" />
                Mis Proyectos
              </Link>
            </div>
            <div className="py-1 border-t border-slate-100">
              <Link
                to='/about'
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors'
              >
                <InformationCircleIcon className="w-4 h-4 text-slate-400" />
                Acerca de Serfit
              </Link>
            </div>
            <div className="py-1 border-t border-slate-100">
              <button
                className='flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors'
                type='button'
                onClick={logout}
              >
                <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
