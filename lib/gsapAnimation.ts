import { gsap } from '@/lib/gsap'

type QueryHelper = (sel: string) => NodeListOf<HTMLElement>
type CleanupFn = () => void

interface SectionAnimationHandlers {
  full: (q: QueryHelper, section: HTMLElement) => CleanupFn | void
  reduced: (q: QueryHelper, section: HTMLElement) => void
  pointer?: (q: QueryHelper, section: HTMLElement) => CleanupFn | void
  // Callback for components that track reduced motion in other callbacks (e.g. transitionToStore).
  onReducedMotionChange?: (isReduced: boolean) => void
}

// Facade: hides the triple gsap.matchMedia() setup repeated across 6 components.
export function createSectionAnimation(
  section: HTMLElement,
  handlers: SectionAnimationHandlers,
): void {
  const q: QueryHelper = (sel) => section.querySelectorAll<HTMLElement>(sel)
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: reduce)', () => {
    handlers.onReducedMotionChange?.(true)
    handlers.reduced(q, section)
  })

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    handlers.onReducedMotionChange?.(false)
    return handlers.full(q, section) ?? undefined
  })

  if (handlers.pointer) {
    const pointer = handlers.pointer
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      return pointer(q, section) ?? undefined
    })
  }
}
