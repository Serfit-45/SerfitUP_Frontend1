import { Link } from "react-router-dom"
import {
  CodeBracketIcon,
  ServerIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

const techStack = [
  { label: "React 19", icon: CodeBracketIcon, bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  { label: "TypeScript", icon: ShieldCheckIcon, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  { label: "Node.js & Express", icon: ServerIcon, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  { label: "MongoDB", icon: CpuChipIcon, bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  { label: "Tailwind CSS", icon: SparklesIcon, bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  { label: "React Query", icon: CodeBracketIcon, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  { label: "Zod + RHF", icon: ShieldCheckIcon, bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  { label: "Vite", icon: CpuChipIcon, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
]

const socialLinks = [
  { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/serfit", color: "hover:text-slate-900" },
  { label: "LinkedIn", icon: "fa-brands fa-linkedin", href: "https://linkedin.com/in/serfit", color: "hover:text-blue-600" },
  { label: "Instagram", icon: "fa-brands fa-instagram", href: "https://instagram.com/serfit", color: "hover:text-pink-600" },
  { label: "Email", icon: "fa-regular fa-envelope", href: "mailto:contacto@serfit.com", color: "hover:text-violet-600" },
]

export default function AboutView() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">

      {/* Back link */}
      <div className="w-full max-w-3xl mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Main card */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

        {/* Hero gradient banner */}
        <div className="relative h-40 bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-500">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          {/* Avatar */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center">
              <span className="text-3xl font-black bg-gradient-to-br from-violet-600 to-indigo-500 bg-clip-text text-transparent select-none">
                S
              </span>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="pt-16 pb-8 px-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Serfit</h1>
          <p className="text-violet-600 font-semibold text-sm mt-1 uppercase tracking-widest">
            Desarrollador Full Stack
          </p>

          <p className="mt-5 text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
            Apasionado por construir herramientas digitales que potencian la productividad de equipos.
            <strong className="text-slate-700"> SerfitUp</strong> nació con la visión de simplificar
            la gestión de proyectos y colaboración en equipos de trabajo modernos.
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {socialLinks.map(({ label, icon, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 ${color} transition-colors hover:border-current hover:bg-slate-50`}
              >
                <i className={`${icon} text-base`} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 border-t border-slate-100" />

        {/* About SerfitUp section */}
        <div className="px-8 py-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Acerca de SerfitUp
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Gestión de proyectos", desc: "Organiza y administra tus proyectos en un solo lugar con total claridad." },
              { title: "Trabajo en equipo", desc: "Colabora con tus compañeros, asigna roles y mantén a todos sincronizados." },
              { title: "Kanban visual", desc: "Tablero drag-and-drop para visualizar el flujo de tareas en tiempo real." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 border-t border-slate-100" />

        {/* Tech stack */}
        <div className="px-8 py-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Stack tecnológico
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map(({ label, icon: Icon, bg, text, border }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${bg} ${text} border ${border}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mx-8 mb-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 p-px">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-500 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-sm">¿Listo para organizar tu equipo?</p>
              <p className="text-violet-200 text-xs mt-0.5">Comienza a usar SerfitUp hoy mismo.</p>
            </div>
            <Link
              to="/"
              className="shrink-0 bg-white text-violet-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors"
            >
              Ir al Dashboard
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom credit */}
      <p className="mt-8 text-xs text-slate-400">
        Hecho con <span className="text-red-400">♥</span> por{" "}
        <span className="font-semibold text-slate-500">Serfit</span> — {new Date().getFullYear()}
      </p>
    </div>
  )
}
