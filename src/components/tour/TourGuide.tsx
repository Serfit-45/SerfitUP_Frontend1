import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTour } from '@/hooks/useTour'
import type { TourStep, TourPlacement } from './tourSteps'

type TourGuideProps = {
  steps: TourStep[]
  seenKey: string
}

const PADDING = 8
const TOOLTIP_WIDTH = 320
const OFFSET = 16

function computeTooltipPosition(rect: DOMRect, placement: TourPlacement): React.CSSProperties {
  const clampLeft = (x: number) =>
    Math.max(16, Math.min(window.innerWidth - TOOLTIP_WIDTH - 16, x))

  switch (placement) {
    case 'bottom':
      return {
        top: rect.bottom + PADDING + OFFSET,
        left: clampLeft(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2),
      }
    case 'top':
      return {
        bottom: window.innerHeight - rect.top + PADDING + OFFSET,
        left: clampLeft(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2),
      }
    case 'left':
      return {
        top: Math.max(16, rect.top + rect.height / 2 - 80),
        left: Math.max(16, rect.left - TOOLTIP_WIDTH - PADDING - OFFSET),
      }
    case 'right':
      return {
        top: Math.max(16, rect.top + rect.height / 2 - 80),
        left: Math.min(window.innerWidth - TOOLTIP_WIDTH - 16, rect.right + PADDING + OFFSET),
      }
  }
}

function slideVariants(placement: TourPlacement) {
  const offsets: Record<TourPlacement, object> = {
    bottom: { y: -8 },
    top: { y: 8 },
    left: { x: 8 },
    right: { x: -8 },
  }
  return {
    initial: { opacity: 0, ...offsets[placement] },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...offsets[placement] },
  }
}

export default function TourGuide({ steps, seenKey }: TourGuideProps) {
  const { isVisible, currentStep, currentIndex, totalSteps, isLastStep, goNext, skipTour } =
    useTour(steps, seenKey)
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!isVisible) return
    const el = document.querySelector(`[data-tour="${currentStep.id}"]`) as HTMLElement | null
    if (!el) {
      if (currentStep.optional) { goNext(); return }
      setRect(null)
      return
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    requestAnimationFrame(() => setRect(el.getBoundingClientRect()))
  }, [currentStep, isVisible, goNext])

  useEffect(() => {
    if (!isVisible) return
    const update = () => {
      const el = document.querySelector(`[data-tour="${currentStep.id}"]`) as HTMLElement | null
      if (el) setRect(el.getBoundingClientRect())
    }
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [currentStep, isVisible])

  const spotlightStyle: React.CSSProperties = rect
    ? {
        position: 'fixed',
        top: rect.top - PADDING,
        left: rect.left - PADDING,
        width: rect.width + PADDING * 2,
        height: rect.height + PADDING * 2,
        borderRadius: 8,
        boxShadow: '0 0 0 9999px rgba(15,23,42,0.75), 0 0 0 2px rgba(139,92,246,0.8)',
        zIndex: 9999,
        pointerEvents: 'none',
      }
    : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        boxShadow: '0 0 0 9999px rgba(15,23,42,0.75)',
        zIndex: 9999,
        pointerEvents: 'none',
      }

  const tooltipPos: React.CSSProperties = rect
    ? computeTooltipPosition(rect, currentStep.placement)
    : { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }

  const variants = slideVariants(currentStep.placement)

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Fondo oscuro — bloquea clics en el resto de la UI */}
          <motion.div
            key="overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Spotlight — box-shadow crea el recorte oscuro + borde violeta */}
          <div style={spotlightStyle} />

          {/* Tooltip */}
          <motion.div
            key={currentIndex}
            style={{ position: 'fixed', width: TOOLTIP_WIDTH, zIndex: 10000, ...tooltipPos }}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-2xl ring-1 ring-slate-900/10 p-5"
          >
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">
              Paso {currentIndex + 1} de {totalSteps}
            </p>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              {currentStep.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              {currentStep.description}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={skipTour}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Omitir tour
              </button>
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                {isLastStep ? 'Finalizar' : 'Siguiente'}
                {!isLastStep && <ChevronRightIcon className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
