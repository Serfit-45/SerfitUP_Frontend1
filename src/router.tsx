import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import RegisterView from './views/auth/RegisterViews'
import ConfirAccountView from './views/auth/ConfirAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileView from './views/profile/ProfileView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/404/NotFound'
import NewLogin from './views/auth/New-Login'
import NewLoginLayout from './layouts/NewLoginLayout'
import AboutView from './views/about/AboutView'

/** Componente de enrutamiento principal de la aplicación, que define las rutas y los layouts para las diferentes vistas de la aplicación utilizando React Router.
 * El componente utiliza BrowserRouter para envolver las rutas de la aplicación, y Routes para definir las rutas específicas. 
 * El layout AppLayout se utiliza para las rutas principales de la aplicación, mientras que el layout AuthLayout se utiliza para las rutas relacionadas con la autenticación. 
 * El layout ProfileLayout se utiliza para las rutas relacionadas con el perfil del usuario. 
 * Cada ruta está asociada a una vista específica que se renderiza cuando se accede a esa ruta. 
 * Este componente centraliza la configuración de las rutas y los layouts de la aplicación, facilitando la navegación y la organización de las vistas en la aplicación. */

export default function Router() {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />}/>
                    <Route path='/projects/:projectId' element={<ProjectDetailsView />}/>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView />}/>
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView />}/>
                    <Route path='/about' element={<AboutView />}/>
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />}/>
                        <Route path='/profile/password' element={<ChangePasswordView />}/>
                    </Route>
                </Route>
                <Route element={<NewLoginLayout />}>
                    <Route path='/auth/login' element={<NewLogin />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    {/* Add your auth routes here */}
                    <Route path='/auth/register' element={<RegisterView />}/>
                    <Route path='/auth/confirm-account' element={<ConfirAccountView />}/>
                    <Route path='/auth/request-code' element={<RequestNewCodeView />}/>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />}/>
                    <Route path='/auth/new-password' element={<NewPasswordView />}/>
                </Route>

                <Route element={<AppLayout />}>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}