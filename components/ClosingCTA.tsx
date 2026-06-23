'use client'

import { useRef, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const ctaQuickRef = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const q = (sel: string) => section.querySelectorAll<HTMLElement>(sel)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('.closing-fade-in'), { y: 20, autoAlpha: 0 })
        gsap.set(q('.closing-watermark'), { autoAlpha: 0, x: 40 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        })
        tl.to(q('.closing-watermark'), { autoAlpha: 1, x: 0, duration: 1.4, ease: 'power3.out' }).to(
          q('.closing-fade-in'),
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out' },
          '<0.2'
        )

        return () => {
          tl.kill()
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('.closing-fade-in, .closing-watermark'), { autoAlpha: 1 })
      })

      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        ctaQuickRef.current = {
          x: gsap.quickTo(ctaRef.current, 'x', { duration: 0.4, ease: 'power3.out' }),
          y: gsap.quickTo(ctaRef.current, 'y', { duration: 0.4, ease: 'power3.out' }),
        }

        return () => {
          ctaQuickRef.current = null
        }
      })
    },
    { scope: sectionRef }
  )

  const onCtaMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const quick = ctaQuickRef.current
    const cta = ctaRef.current
    if (!quick || !cta) return
    const { left, top, width, height } = cta.getBoundingClientRect()
    quick.x((e.clientX - left - width / 2) * 0.25)
    quick.y((e.clientY - top - height / 2) * 0.25)
  }, [])

  const onCtaLeave = useCallback(() => {
    if (!ctaQuickRef.current || !ctaRef.current) return
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] lg:min-h-screen flex items-center justify-center bg-black overflow-hidden px-4"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full flex items-center justify-center">
        <p className="closing-watermark font-cormorant font-light text-white/[0.05] tracking-[0.4em] uppercase select-none leading-none whitespace-nowrap text-[14vw]">
          EXCLUSIVO
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl">
        <p className="closing-fade-in font-sans text-[11px] tracking-[0.35em] text-white/45 uppercase">
          Acceso por invitación
        </p>
        <h2 className="closing-fade-in font-cormorant font-light text-white uppercase tracking-[0.15em] text-5xl lg:text-7xl">
          Únase a la Selección
        </h2>
        <p className="closing-fade-in font-sans text-white/60 text-base lg:text-lg max-w-xl">
          Acceda a una curaduría privada de piezas excepcionales, con servicio concierge dedicado
          a cada detalle de su experiencia.
        </p>

        <button
          ref={ctaRef}
          onMouseMove={onCtaMove}
          onMouseLeave={onCtaLeave}
          className="closing-fade-in group relative overflow-hidden font-bebas text-lg lg:text-xl xl:text-2xl tracking-[0.5em] px-16 lg:px-24 py-4 lg:py-5 border border-white/80 text-white cursor-pointer mt-4"
        >
          <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">
            SOLICITAR ACCESO
          </span>
        </button>
      </div>
    </section>
  )
}
