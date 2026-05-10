import { useState, useCallback } from 'react'
import type { TourStep } from '@/components/tour/tourSteps'

export function useTour(steps: TourStep[], seenKey: string) {
  const alreadySeen = localStorage.getItem(seenKey) === 'true'
  const [isVisible, setIsVisible] = useState(!alreadySeen)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentStep = steps[currentIndex]
  const isLastStep = currentIndex === steps.length - 1

  const goNext = useCallback(() => {
    if (isLastStep) {
      localStorage.setItem(seenKey, 'true')
      setIsVisible(false)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }, [isLastStep, seenKey])

  const skipTour = useCallback(() => {
    localStorage.setItem(seenKey, 'true')
    setIsVisible(false)
  }, [seenKey])

  return { isVisible, currentStep, currentIndex, totalSteps: steps.length, isLastStep, goNext, skipTour }
}
