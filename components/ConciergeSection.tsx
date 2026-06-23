'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'

const COLUMNS = [
  {
    title: 'Autenticación Garantizada',
    description: 'Cada pieza es verificada por nuestro equipo de especialistas antes de llegar a sus manos.',
    glyph: (
      <path d="M24 4 40 10 40 24C40 34 33 41 24 44 15 41 8 34 8 24L8 10Z M17 24 22 29 31 18" />
    ),
  },
  {
    title: 'Envío Asegurado',
    description: 'Logística privada con seguro integral y manejo especializado de principio a fin.',
    glyph: (
      <path d="M6 16 24 8 42 16 24 24Z M6 16 6 34 24 42 24 24 M42 16 42 34 24 42" />
    ),
  },
  {
    title: 'Servicio Concierge',
    description: 'Asesoría personalizada y atención dedicada antes, durante y después de su compra.',
    glyph: (
      <path d="M24 6C18 6 14 11 14 17L14 26 9 33 39 33 34 26 34 17C34 11 30 6 24 6Z M19 36C19 39 21 41 24 41 27 41 29 39 29 36" />
    ),
  },
]

export default function ConciergeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const q = (sel: string) => section.querySelectorAll<HTMLElement>(sel)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(q('.concierge-bg'), {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.set(q('.concierge-col'), { y: 30, autoAlpha: 0 })
        gsap.to(q('.concierge-col'), {
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('.concierge-col'), { autoAlpha: 1 })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden py-28 lg:py-40 px-4 lg:px-6">
      <div className="absolute -top-[10%] inset-x-0 h-[120%]">
        <div className="concierge-bg relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&h=1200&fit=crop&q=80"
            alt=""
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.35)' }}
            sizes="100vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 lg:divide-x lg:divide-white/10">
        {COLUMNS.map((col) => (
          <div key={col.title} className="concierge-col px-2 lg:px-6 text-center md:text-left">
            <svg
              viewBox="0 0 48 48"
              width="44"
              height="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/70 mx-auto md:mx-0 mb-6"
            >
              {col.glyph}
            </svg>
            <h3 className="font-cormorant font-light uppercase tracking-[0.15em] text-2xl lg:text-3xl text-white mb-4">
              {col.title}
            </h3>
            <p className="font-sans text-white/60 text-sm lg:text-base leading-relaxed">{col.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
