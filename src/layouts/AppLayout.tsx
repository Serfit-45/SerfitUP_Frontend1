import { Link, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if( isLoading ) return '<p>Cargando...</p>'
    if( isError ) {
        return <Navigate to='/auth/login' />
    }

  if(data) return (
    <div className="min-h-screen flex flex-col">
        <header className='bg-slate-900 border-b border-slate-700/50'>
            <div className='flex flex-col items-center justify-between px-4 py-4 mx-auto max-w-screen-2xl lg:flex-row'>
                <div className="w-40">
                    <Link to="/">
                        <Logo className="w-32 md:w-36 h-auto" />
                    </Link>
                </div>
                <NavMenu name={data.name} />
            </div>
        </header>

        <main className='flex-1 px-4 py-10 mx-auto w-full max-w-screen-2xl'>
            <Outlet />
        </main>

        <footer className='border-t border-slate-200 py-6'>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-slate-400'>
                <span>Todos los derechos reservados {new Date().getFullYear()}</span>
                <span className='hidden sm:inline'>·</span>
                <Link to='/about' className='text-violet-500 hover:text-violet-600 font-medium transition-colors'>
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
