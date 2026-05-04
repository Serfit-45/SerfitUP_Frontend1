# SerfitUp - Frontend

Aplicación web para la gestión de proyectos, tareas y equipos de trabajo, desarrollada con React, TypeScript y Vite.

## Descripción

SerfitUp permite gestionar proyectos con sus tareas y equipos de trabajo. Incluye un sistema completo de autenticación, tablero Kanban con drag & drop, notas por tarea y gestión de perfil de usuario.

## Tecnologías

- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **React Router DOM 7** - Enrutamiento
- **TanStack Query 5** - Gestión de estado del servidor y caché
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos utility-first
- **@dnd-kit/core** - Drag & drop para el tablero Kanban
- **Framer Motion** - Animaciones
- **Headless UI** - Componentes accesibles sin estilos
- **Heroicons** - Iconos SVG
- **React Toastify** - Notificaciones
- **@chakra-ui/pin-input** - Input de código PIN para confirmación de cuenta

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd serfitUp_frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Crea un archivo .env.local con:
VITE_API_URL=http://localhost:4000/api
```

## Comandos

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Estructura del Proyecto

```
src/
├── api/                  # Servicios de llamadas al backend
│   ├── AuthAPI.ts
│   ├── NoteApi.ts
│   ├── ProfileAPI.tsx
│   ├── ProjectApi.ts
│   ├── TaskAPI.ts
│   └── TeamApi.ts
├── components/           # Componentes reutilizables por feature
│   ├── auth/             # Formularios de nueva contraseña
│   ├── notes/            # Panel y detalle de notas
│   ├── profile/          # Formulario de perfil y tabs
│   ├── projects/         # CRUD de proyectos
│   ├── tasks/            # Tarjetas, modales y lista Kanban
│   ├── team/             # Búsqueda y añadir miembros
│   ├── ErrorMessage.tsx
│   ├── Logo.tsx
│   └── NavMenu.tsx
├── hooks/
│   └── useAuth.ts        # Hook de autenticación global
├── layouts/              # Layouts de la aplicación
│   ├── AppLayout.tsx
│   ├── AuthLayout.tsx
│   ├── NewLoginLayout.tsx
│   └── ProfileLayout.tsx
├── lib/
│   └── axios.ts          # Instancia configurada de Axios
├── locales/
│   └── es.ts             # Traducciones en español
├── types/
│   └── index.ts          # Tipos e interfaces globales
├── utils/                # Funciones utilitarias y políticas
├── views/                # Páginas de la aplicación
│   ├── 404/
│   ├── about/
│   ├── auth/             # Login, registro, recuperación de contraseña
│   ├── profile/          # Perfil y cambio de contraseña
│   └── projects/         # Dashboard, detalle, edición y equipo
├── main.css
├── main.tsx
└── router.tsx
```

## Características

- Autenticación completa: registro, login, confirmación de cuenta por código PIN, recuperación de contraseña
- Gestión de proyectos (CRUD) con equipo de colaboradores
- Tablero Kanban con drag & drop para gestionar estados de tareas
- Notas por tarea
- Gestión de perfil y cambio de contraseña
- Interfaz responsiva con animaciones
- Validación de formularios en tiempo real
- Caché y sincronización automática con React Query
- Internacionalización en español

## Estados de Tareas

| Estado | Descripción |
|---|---|
| `pending` | Pendiente |
| `onHold` | En espera |
| `inProgress` | En progreso |
| `underReview` | En revisión |
| `completed` | Completada |

## Backend

Este frontend se comunica con la API REST de SerfitUp. Asegúrate de tener el servidor backend corriendo en el puerto 4000 (o el configurado en `.env.local`).

## Licencia

ISC
