'use client'

import { useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { categories } from '@/data/categories'
import ProductCard from './ProductCard'
import { useProductModal } from './ProductModalProvider'

export default function CategoryShowcase() {
  const { open } = useProductModal()
  const sectionRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const reducedMotionRef = useRef(false)
  const activeTlRef = useRef<gsap.core.Timeline | null>(null)
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const category = categories[activeIndex]

  const switchCategory = useCallback((newIndex: number) => {
    if (newIndex === activeIndexRef.current) return
    const section = sectionRef.current
    if (!section) return

    const prevIndex = activeIndexRef.current
    activeIndexRef.current = newIndex

    activeTlRef.current?.kill()
    const q = (sel: string) => section.querySelectorAll<HTMLElement>(sel)
    const tl = gsap.timeline()
    activeTlRef.current = tl

    gsap.to(underlineRefs.current[prevIndex], { scaleX: 0, duration: 0.35, ease: 'power2.inOut' })
    gsap.to(underlineRefs.current[newIndex], { scaleX: 1, duration: 0.5, ease: 'power3.out' })

    if (reducedMotionRef.current) {
      tl.to(q('.category-product-card'), { opacity: 0, duration: 0.2 }).call(() => {
        flushSync(() => setActiveIndex(newIndex))
        tl.fromTo(
          q('.category-product-card'),
          { opacity: 0 },
          { opacity: 1, duration: 0.35 }
        )
      })
      return
    }

    tl.to(q('.category-product-card'), {
      clipPath: 'inset(0% 0% 100% 0%)',
      stagger: { each: 0.035 },
      duration: 0.5,
      ease: 'power2.inOut',
    }).call(() => {
      flushSync(() => setActiveIndex(newIndex))

      tl.fromTo(
        q('.category-product-card'),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: { each: 0.07 },
          duration: 1.0,
          ease: 'power4.out',
        }
      ).fromTo(
        q('.category-product-card .product-card-img'),
        { scale: 1.18 },
        { scale: 1, stagger: { each: 0.07 }, duration: 1.4, ease: 'power3.out' },
        '<'
      )
    })
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const q = (sel: string) => section.querySelectorAll<HTMLElement>(sel)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        reducedMotionRef.current = true
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reducedMotionRef.current = false

        gsap.set(q('.category-fade-in'), { y: 24, autoAlpha: 0 })
        gsap.set(q('.category-divider'), { scaleX: 0 })
        gsap.set(q('.category-chip'), { y: 16, autoAlpha: 0 })
        gsap.set(q('.category-product-card'), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(q('.category-product-card .product-card-img'), { scale: 1.18 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        })
        tl.to(q('.category-fade-in'), {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          ease: 'power4.out',
        })
          .to(q('.category-divider'), { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '<0.2')
          .to(q('.category-chip'), { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, '<0.1')
          .to(
            q('.category-product-card'),
            { clipPath: 'inset(0% 0% 0% 0%)', stagger: { each: 0.07 }, duration: 1.0, ease: 'power4.out' },
            '<0.15'
          )
          .to(
            q('.category-product-card .product-card-img'),
            { scale: 1, stagger: { each: 0.07 }, duration: 1.4, ease: 'power3.out' },
            '<'
          )

        return () => {
          tl.kill()
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="categorias" ref={sectionRef} className="bg-black py-28 lg:py-36 px-4 lg:px-6">
      <div className="max-w-[1400px] mx-auto">
        <p className="category-fade-in font-sans text-[11px] tracking-[0.35em] text-white/45 uppercase mb-4">
          Explora por categoría
        </p>
        <h2 className="category-fade-in font-cormorant font-light text-white uppercase tracking-[0.15em] text-4xl lg:text-6xl mb-8">
          Categorías
        </h2>
        <div className="category-divider w-full max-w-3xl flex items-center mb-14 origin-left">
          <div className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
          <div className="mx-3 w-1 h-1 rotate-45 bg-white/60 shrink-0" />
        </div>

        {/* Category switcher */}
        <div role="tablist" className="flex items-center gap-8 lg:gap-12 overflow-x-auto pb-1 mb-12 lg:mb-16">
          {categories.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => switchCategory(i)}
              className={`category-chip shrink-0 whitespace-nowrap relative font-sans text-sm lg:text-base tracking-[0.15em] uppercase px-1 pb-3 cursor-pointer transition-colors duration-500 ${
                i === activeIndex ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {c.label}
              <span
                ref={(el) => {
                  underlineRefs.current[i] = el
                }}
                className="absolute bottom-0 left-0 h-px w-full bg-white origin-left"
                style={{ transform: `scaleX(${i === activeIndex ? 1 : 0})` }}
              />
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {category.products.map((product, i) => (
            <ProductCard
              key={`${category.id}-${i}`}
              name={product.name}
              brandLine={product.brandLine}
              price={product.price}
              imageUrl={product.imageUrl}
              aspect="portrait"
              theme="light"
              className="category-product-card"
              onClick={() =>
                open({
                  name: product.name,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  storeName: product.brandLine,
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
