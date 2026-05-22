const CARD_ACCENTS = [
    { border: 'border-t-violet-500', bg: 'bg-violet-50', text: 'text-violet-700', badge: 'bg-violet-100' },
    { border: 'border-t-blue-500',   bg: 'bg-blue-50',   text: 'text-blue-700',   badge: 'bg-blue-100'   },
    { border: 'border-t-emerald-500',bg: 'bg-emerald-50',text: 'text-emerald-700',badge: 'bg-emerald-100'},
    { border: 'border-t-rose-500',   bg: 'bg-rose-50',   text: 'text-rose-700',   badge: 'bg-rose-100'   },
    { border: 'border-t-amber-500',  bg: 'bg-amber-50',  text: 'text-amber-700',  badge: 'bg-amber-100'  },
    { border: 'border-t-teal-500',   bg: 'bg-teal-50',   text: 'text-teal-700',   badge: 'bg-teal-100'   },
    { border: 'border-t-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
    { border: 'border-t-sky-500',    bg: 'bg-sky-50',    text: 'text-sky-700',    badge: 'bg-sky-100'    },
]

export function cardAccent(name: string) {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return CARD_ACCENTS[Math.abs(hash) % CARD_ACCENTS.length]
}

const AVATAR_COLORS = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-pink-500',
]

export function avatarColor(name: string): string {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function getInitials(name: string): string {
    const parts = name.trim().split(' ').filter(Boolean)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function daysSince(isoString: string): number {
    const diff = Date.now() - new Date(isoString).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function formatDate(isoString: string) : string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return formatter.format(date);
}