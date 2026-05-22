import { useEffect, useRef } from 'react'

type ProgressBarProps = {
    percent: number
}

export default function ProgressBar({ percent }: ProgressBarProps) {
    const fillRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (fillRef.current) {
            fillRef.current.style.width = `${percent}%`
        }
    }, [percent])

    return (
        <div className="w-full h-1.5 rounded-full bg-slate-100">
            <div ref={fillRef} className="h-1.5 rounded-full bg-violet-500 transition-all duration-300" />
        </div>
    )
}
