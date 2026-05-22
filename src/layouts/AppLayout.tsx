import { Link, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if( isLoading ) return 'Cargando...'
    if( isError ) {
        return <Navigate to='/auth/login' />
    }

  if(data) return (
    <div className="flex flex-col min-h-screen">
        <header className='border-b bg-slate-900 border-slate-700/50'>
            <div className='flex flex-col items-center justify-between px-4 py-4 mx-auto max-w-screen-2xl lg:flex-row'>
                <div className="w-40">
                    <Link to="/">
                        <Logo className="w-32 h-auto md:w-36" />
                    </Link>
                </div>
                <NavMenu name={data.name} />
            </div>
        </header>

        <main className='flex-1 w-full px-4 py-10 mx-auto max-w-screen-2xl'>
            <Outlet />
        </main>

        <footer className='py-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-slate-400'>
                <span>Todos los derechos reservados {new Date().getFullYear()}</span>
                <span className='hidden sm:inline'>·</span>
                <Link to='/about' className='font-medium transition-colors text-violet-500 hover:text-violet-600'>
                    Creado por Serfit
                </Link>
            </div>
        </footer>

        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </div>
  )
}
