import { FingerPrintIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Mi Cuenta', href: '/profile', icon: UserIcon },
    { name: 'Cambiar Password', href: '/profile/password', icon: FingerPrintIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
    const navigate = useNavigate()
    const location = useLocation()
    const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href

    return (
        <div className='mb-8'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-lg border-slate-300 focus:border-violet-500 focus:ring-violet-500 text-sm"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
                    value={currentTab}
                >
                    {tabs.map((tab) => (
                        <option value={tab.href} key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-slate-200">
                    <nav className="flex -mb-px space-x-6" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-violet-600 text-violet-600'
                                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
                                    'group inline-flex items-center gap-2 border-b-2 py-3 px-1 text-sm font-medium transition-colors'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-500',
                                        'h-4 w-4 transition-colors'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
