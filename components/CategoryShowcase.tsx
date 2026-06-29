'use client'

import { useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/gsap'
import { categories } from '@/data/categories'
import ProductCard from './ProductCard'
import { parsePrice } from '@/lib/search'
import { slugify } from '@/data/stores'

const BRAND_STORE_ID: Record<string, string> = {
  'ATELIER FORGE': 'atelier-forge',
  'CAVE NOIRE': 'cave-noire',
  'MAISON BRÜHL': 'maison-bruhl',
  'NORDLINE AUDIO': 'nordline-audio',
  'OPTIK WERK': 'optik-werk',
  'VESPER DIGITAL': 'vesper-digital',
  'STUDIO LUMEN': 'studio-lumen',
  'MARBLE & OAK': 'marble-oak',
  'AQUA LUME': 'aqua-lume',
  'PIETRA BAGNO': 'pietra-bagno',
  'MAISON VESTE': 'maison-veste',
  'ATELIER NOIR': 'atelier-noir',
}

export default function CategoryShowcase() {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const reducedMotionRef = useRef(false)
  const activeTlRef = useRef<gsap.core.Timeline | null>(null)
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default')

  const category = categories[activeIndex]

  const filteredProducts = category.products
    .filter((p) => {
      const n = parsePrice(p.price)
      if (minPrice && n < parseFloat(minPrice)) return false
      if (maxPrice && n > parseFloat(maxPrice)) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'asc') return parsePrice(a.price) - parsePrice(b.price)
      if (sort === 'desc') return parsePrice(b.price) - parsePrice(a.price)
      return 0
    })

  const switchCategory = useCallback((newIndex: number) => {
    if (newIndex === activeIndexRef.current) return
    const section = sectionRef.current
    if (!section) return

    setMinPrice('')
    setMaxPrice('')
    setSort('default')

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

    tl.to(q('.category-watermark'), { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' })
      .to(q('.category-product-card'), {
        clipPath: 'inset(0% 0% 100% 0%)',
        stagger: { each: 0.035 },
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<')
      .call(() => {
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
        ).to(
          q('.category-watermark'),
          { autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
          '<0.1'
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
        gsap.set(q('.category-watermark'), { autoAlpha: 0, scale: 1.06 })
        gsap.set(q('.category-glow'), { autoAlpha: 0 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        })
        tl.to(q('.category-glow'), { autoAlpha: 1, duration: 1.6, ease: 'power2.out' })
          .to(q('.category-watermark'), { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, '<')
          .to(q('.category-fade-in'), {
            y: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power4.out',
          }, '<0.2')
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

        const breathe = gsap.to(q('.category-glow'), {
          scale: 1.08,
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        return () => {
          tl.kill()
          breathe.kill()
        }
      })

      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const glowX = gsap.quickTo(q('.category-glow'), 'x', { duration: 1.4, ease: 'power3.out' })
        const glowY = gsap.quickTo(q('.category-glow'), 'y', { duration: 1.4, ease: 'power3.out' })

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect()
          const nx = (e.clientX - rect.left) / rect.width - 0.5
          const ny = (e.clientY - rect.top) / rect.height - 0.5
          glowX(nx * 36)
          glowY(ny * 28)
        }
        section.addEventListener('mousemove', onMove)

        return () => {
          section.removeEventListener('mousemove', onMove)
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="categorias"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 lg:py-36 px-4 lg:px-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="category-glow absolute top-[-12%] left-[-8%] w-[460px] h-[460px] rounded-full bg-white/[0.07] blur-[100px]" />
        <div className="category-glow absolute bottom-[-18%] right-[-10%] w-[520px] h-[520px] rounded-full bg-white/[0.05] blur-[110px]" />
        <p className="category-watermark absolute inset-0 flex items-center justify-center font-cormorant font-light text-white/[0.045] tracking-[0.35em] uppercase select-none leading-none whitespace-nowrap text-[11vw]">
          {category.label}
        </p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
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
        <div role="tablist" className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-10 lg:gap-x-14 pb-1 mb-12 lg:mb-16">
          {categories.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => switchCategory(i)}
              className={`category-chip shrink-0 whitespace-nowrap relative font-sans text-xs sm:text-sm lg:text-base tracking-[0.12em] sm:tracking-[0.15em] uppercase px-1 pb-2.5 sm:pb-3 cursor-pointer transition-colors duration-500 ${
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

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-10 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-[10px] tracking-[0.3em] text-white/40 uppercase shrink-0">Precio</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Mín"
              className="w-20 bg-transparent border-b border-white/20 focus:border-white/60 outline-none font-sans text-sm text-white placeholder:text-white/25 py-1 transition-colors duration-300"
            />
            <span className="text-white/25 text-xs">—</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Máx"
              className="w-20 bg-transparent border-b border-white/20 focus:border-white/60 outline-none font-sans text-sm text-white placeholder:text-white/25 py-1 transition-colors duration-300"
            />
          </div>
          <div className="flex items-center gap-2">
            {([['default', 'Relevancia'], ['asc', 'Menor precio'], ['desc', 'Mayor precio']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSort(val)}
                className={`font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all duration-300 cursor-pointer ${
                  sort === val
                    ? 'border-white/60 text-white bg-white/10'
                    : 'border-white/15 text-white/35 hover:border-white/35 hover:text-white/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {(minPrice || maxPrice || sort !== 'default') && (
            <button
              onClick={() => { setMinPrice(''); setMaxPrice(''); setSort('default') }}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <p className="font-cormorant font-light text-white/40 text-2xl tracking-[0.15em] uppercase">Sin resultados</p>
              <p className="font-sans text-white/25 text-sm mt-2">Intentá con otro rango de precio</p>
            </div>
          ) : null}
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={`${category.id}-${i}`}
              name={product.name}
              brandLine={product.brandLine}
              price={product.price}
              imageUrl={product.imageUrl}
              aspect="portrait"
              theme="light"
              className="category-product-card"
              onClick={() => {
                const storeId = BRAND_STORE_ID[product.brandLine]
                if (storeId) {
                  router.push(`/tienda/${storeId}/producto/${slugify(product.name)}`)
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
