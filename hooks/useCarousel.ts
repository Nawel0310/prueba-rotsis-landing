'use client'

import { useRef, useCallback } from 'react'

type Dir = 'next' | 'prev'

interface UseCarouselOptions {
  count: number
  // Template Method: algorithm skeleton is fixed (index wrapping, direction, touch); onNavigate is the variable step.
  onNavigate: (toIndex: number, dir: Dir) => void
}

function cycleDir(from: number, to: number, count: number): Dir {
  const forward = (to - from + count) % count
  return forward <= Math.floor(count / 2) ? 'next' : 'prev'
}

const SWIPE_THRESHOLD = 44

export function useCarousel({ count, onNavigate }: UseCarouselOptions) {
  const currentIndexRef = useRef(0)
  const touchStartX = useRef(0)
  // Always-current ref avoids including onNavigate as dep in callbacks
  const onNavigateRef = useRef(onNavigate)
  onNavigateRef.current = onNavigate

  const goTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndexRef.current) return
      const dir = cycleDir(currentIndexRef.current, targetIndex, count)
      currentIndexRef.current = targetIndex
      onNavigateRef.current(targetIndex, dir)
    },
    [count],
  )

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(delta) < SWIPE_THRESHOLD) return
      if (delta < 0) {
        const ni = (currentIndexRef.current + 1) % count
        currentIndexRef.current = ni
        onNavigateRef.current(ni, 'next')
      } else {
        const ni = ((currentIndexRef.current - 1) + count) % count
        currentIndexRef.current = ni
        onNavigateRef.current(ni, 'prev')
      }
    },
    [count],
  )

  return {
    currentIndexRef,
    goTo,
    touchHandlers: { onTouchStart, onTouchEnd },
  }
}
