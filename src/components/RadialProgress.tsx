import { useEffect, useRef } from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis, Tooltip } from 'recharts'
import type { TooltipProps } from 'recharts'
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

type MilestoneProgress = {
    name: string
    total: number
    completed: number
    percent: number
}

type RadialProgressProps = {
    milestones: MilestoneProgress[]
}

const BAR_COLORS = [
    { hex: '#8b5cf6', tw: 'bg-violet-500' },
    { hex: '#3b82f6', tw: 'bg-blue-500' },
    { hex: '#10b981', tw: 'bg-emerald-500' },
    { hex: '#f59e0b', tw: 'bg-amber-500' },
    { hex: '#ef4444', tw: 'bg-red-500' },
    { hex: '#06b6d4', tw: 'bg-cyan-500' },
    { hex: '#6366f1', tw: 'bg-indigo-500' },
    { hex: '#ec4899', tw: 'bg-pink-500' },
]

export default function RadialProgress({ milestones }: RadialProgressProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const count = milestones.length
    const size = 56 + count * 18
    const cx = size / 2
    const cy = size / 2
    const outerRadius = cx - 4
    const innerRadius = Math.max(outerRadius - count * 14, 10)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.width = `${size}px`
            containerRef.current.style.height = `${size}px`
        }
    }, [size])

    if (count === 0) {
        return <p className="text-xs text-slate-400 py-2">Sin hitos creados</p>
    }

    const data = milestones.map((ms, i) => ({
        name: ms.name,
        value: ms.percent,
        total: ms.total,
        completed: ms.completed,
        fill: BAR_COLORS[i % BAR_COLORS.length].hex,
        tw: BAR_COLORS[i % BAR_COLORS.length].tw,
    }))

    return (
        <div className="flex items-center gap-4 mt-2">
            <div ref={containerRef} className="relative flex-shrink-0">
                <RadialBarChart
                    width={size}
                    height={size}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={90}
                    endAngle={-270}
                    data={data}
                    barSize={10}
                    barGap={2}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <Tooltip
                        content={({ active, payload }: TooltipProps<ValueType, NameType>) => {
                            if (!active || !payload?.length) return null
                            const d = payload[0].payload
                            return (
                                <div className="bg-white border border-slate-200 rounded-lg shadow px-3 py-2 text-xs">
                                    <p className="font-semibold text-slate-800 truncate max-w-[140px]">{d.name}</p>
                                    <p className="text-slate-500 mt-0.5">
                                        {d.completed} de {d.total} tareas —{' '}
                                        <span className="font-medium text-slate-700">{d.value}%</span>
                                    </p>
                                </div>
                            )
                        }}
                    />
                    <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={6} />
                </RadialBarChart>
            </div>

            <ul className="space-y-1.5 min-w-0 flex-1">
                {data.map((ms) => (
                    <li key={ms.name} className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ms.tw}`} />
                        <span className="text-xs text-slate-600 truncate flex-1">{ms.name}</span>
                        <span className="text-xs font-semibold text-slate-700 flex-shrink-0">{ms.value}%</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
