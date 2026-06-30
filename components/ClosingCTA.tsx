'use client'

import { useRef, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { createSectionAnimation } from '@/lib/gsapAnimation'
import { Button } from '@/components/ui/Button'

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const ctaQuickRef = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      createSectionAnimation(section, {
        full: (q, s) => {
          gsap.set(q('.closing-fade-in'), { y: 20, autoAlpha: 0 })
          gsap.set(q('.closing-watermark'), { autoAlpha: 0, x: 40 })
          gsap.set(q('.closing-glow'), { autoAlpha: 0, scale: 0.9 })
          gsap.set(q('.closing-ring'), { autoAlpha: 0, scale: 0.85 })

          const tl = gsap.timeline({
            scrollTrigger: { trigger: s, start: 'top 70%', toggleActions: 'play none none none' },
          })
          tl.to(q('.closing-glow'), { autoAlpha: 1, scale: 1, duration: 1.8, ease: 'power2.out' })
            .to(q('.closing-ring'), { autoAlpha: 1, scale: 1, duration: 1.6, ease: 'power3.out' }, '<0.1')
            .to(q('.closing-watermark'), { autoAlpha: 1, x: 0, duration: 1.4, ease: 'power3.out' }, '<')
            .to(q('.closing-fade-in'), { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out' }, '<0.2')

          const breathe = gsap.to(q('.closing-glow'), {
            scale: 1.1,
            duration: 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          const rotate = gsap.to(q('.closing-ring'), {
            rotation: 360,
            duration: 50,
            ease: 'none',
            repeat: -1,
          })

          return () => {
            tl.kill()
            breathe.kill()
            rotate.kill()
          }
        },
        reduced: (q) => {
          gsap.set(q('.closing-fade-in, .closing-watermark, .closing-glow'), { autoAlpha: 1 })
        },
        pointer: (q) => {
          ctaQuickRef.current = {
            x: gsap.quickTo(ctaRef.current, 'x', { duration: 0.4, ease: 'power3.out' }),
            y: gsap.quickTo(ctaRef.current, 'y', { duration: 0.4, ease: 'power3.out' }),
          }

          const glowX = gsap.quickTo(q('.closing-glow'), 'x', { duration: 1.6, ease: 'power3.out' })
          const glowY = gsap.quickTo(q('.closing-glow'), 'y', { duration: 1.6, ease: 'power3.out' })

          const onMove = (e: MouseEvent) => {
            const rect = sectionRef.current!.getBoundingClientRect()
            const nx = (e.clientX - rect.left) / rect.width - 0.5
            const ny = (e.clientY - rect.top) / rect.height - 0.5
            glowX(nx * 40)
            glowY(ny * 32)
          }
          sectionRef.current!.addEventListener('mousemove', onMove)

          return () => {
            sectionRef.current?.removeEventListener('mousemove', onMove)
            ctaQuickRef.current = null
          }
        },
      })
    },
    { scope: sectionRef },
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
        <div className="closing-glow absolute w-[560px] h-[560px] lg:w-[680px] lg:h-[680px] rounded-full bg-white/[0.07] blur-[120px]" />
        <div className="closing-ring absolute w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] rounded-full border border-white/10" />
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

        <Button
          ref={ctaRef}
          theme="dark"
          onMouseMove={onCtaMove}
          onMouseLeave={onCtaLeave}
          className="closing-fade-in font-bebas text-lg lg:text-xl xl:text-2xl tracking-[0.5em] px-16 lg:px-24 py-4 lg:py-5 border border-white/80 text-white mt-4"
        >
          SOLICITAR ACCESO
        </Button>
      </div>
    </section>
  )
}
