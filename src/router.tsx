import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import MilestoneDetailsView from './views/milestones/MilestoneDetailsView'
import CreateMilestoneView from './views/milestones/CreateMilestoneView'
import EditMilestoneView from './views/milestones/EditMilestoneView'
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

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />} />
                    <Route path='/projects/:projectId' element={<ProjectDetailsView />} />
                    <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView />} />
                    <Route path='/projects/:projectId/milestones/create' element={<CreateMilestoneView />} />
                    <Route path='/projects/:projectId/milestones/:milestoneId' element={<MilestoneDetailsView />} />
                    <Route path='/projects/:projectId/milestones/:milestoneId/edit' element={<EditMilestoneView />} />
                    <Route path='/about' element={<AboutView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<NewLoginLayout />}>
                    <Route path='/auth/login' element={<NewLogin />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/register' element={<RegisterView />} />
                    <Route path='/auth/confirm-account' element={<ConfirAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}