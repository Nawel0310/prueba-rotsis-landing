'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

// Template Method: algorithm is fixed (lock → unlock → cleanup); isActive is the variable step.
export function usePreventScroll(isActive: boolean): void {
  const lenis = useLenis()
  useEffect(() => {
    if (isActive) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isActive, lenis])
}
