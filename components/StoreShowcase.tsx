'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { getFeaturedStores } from '@/data/stores'
import ProductCard from './ProductCard'

const RUBROS = ['Todos', 'Moda', 'Deportes', 'Tecnología', 'Belleza', 'Lifestyle']

const STORE_BACKGROUNDS: Record<string, string> = {
  zara: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop&q=80',
  nike: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=900&fit=crop&q=80',
  adidas: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=900&fit=crop&q=80',
  apple: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=80',
  sephora: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&h=900&fit=crop&q=80',
}

export default function StoreShowcase() {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const [rubroFilter, setRubroFilter] = useState('Todos')
  const allStores = getFeaturedStores()
  const stores = rubroFilter === 'Todos' ? allStores : allStores.filter((s) => s.category === rubroFilter)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const triggers: ScrollTrigger[] = []

        blockRefs.current.forEach((block) => {
          if (!block) return
          const q = (sel: string) => block.querySelectorAll<HTMLElement>(sel)
          gsap.set(q('.store-block-fade'), { y: 20, autoAlpha: 0 })
          gsap.set(q('.store-block-card'), { clipPath: 'inset(100% 0% 0% 0%)' })
          gsap.set(q('.store-block-card .product-card-img'), { scale: 1.18 })

          const tl = gsap.timeline({
            scrollTrigger: { trigger: block, start: 'top 82%', toggleActions: 'play none none none' },
          })
          tl.to(q('.store-block-fade'), { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' })
            .to(
              q('.store-block-card'),
              { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.07, duration: 1.0, ease: 'power4.out' },
              '<0.15'
            )
            .to(
              q('.store-block-card .product-card-img'),
              { scale: 1, stagger: 0.07, duration: 1.4, ease: 'power3.out' },
              '<'
            )
          if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
        })

        return () => {
          triggers.forEach((t) => t.kill())
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.store-block-fade, .store-block-card', { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      })
    },
    { scope: sectionRef, dependencies: [stores.length] }
  )

  return (
    <section id="tiendas" ref={sectionRef} className="bg-white py-28 lg:py-36 px-4 lg:px-6">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-sans text-[11px] tracking-[0.35em] text-black/45 uppercase mb-4">Tiendas Seleccionadas</p>
        <h2 className="font-cormorant font-light text-black uppercase tracking-[0.15em] text-4xl lg:text-6xl mb-10 lg:mb-14">
          Nuestras Tiendas
        </h2>

        {/* Rubro filter chips */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-16 lg:mb-24">
          {RUBROS.map((r) => (
            <button
              key={r}
              onClick={() => setRubroFilter(r)}
              className={`font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 sm:px-4 py-2 border transition-all duration-300 cursor-pointer ${
                r === rubroFilter
                  ? 'bg-black text-white border-black'
                  : 'border-black/25 text-black/45 hover:border-black/50 hover:text-black/70'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {stores.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-cormorant font-light text-black/30 text-3xl tracking-[0.15em] uppercase">Sin tiendas en esta categoría</p>
            </div>
          )}
          {stores.map((store, si) => (
            <div
              key={store.id}
              ref={(el) => {
                blockRefs.current[si] = el
              }}
              className="relative overflow-hidden rounded-lg border border-black/10 p-6 sm:p-8 lg:p-12"
            >
              <div className="absolute inset-0">
                <Image
                  src={STORE_BACKGROUNDS[store.id]}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ filter: 'blur(3px) brightness(1.05)' }}
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/82 to-white/90" />

              <div className="relative z-10">
                <div className="store-block-fade flex items-start gap-4 lg:gap-5 mb-8">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-xl flex items-center justify-center border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] shrink-0">
                    <Image
                      src={store.logoPath}
                      alt={store.name}
                      width={48}
                      height={48}
                      className="object-contain max-w-[40px] max-h-[40px] w-full h-full rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-cormorant font-light text-black uppercase tracking-[0.2em] text-3xl lg:text-4xl">
                      {store.name}
                    </h3>
                    {store.description && (
                      <p className="font-sans text-black/60 text-sm lg:text-base mt-2 max-w-md">
                        {store.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="store-block-fade w-full flex items-center mb-10">
                  <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="mx-3 w-1 h-1 rotate-45 bg-black/40 shrink-0" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
                  {store.products.slice(0, 4).map((product, pi) => (
                    <ProductCard
                      key={`${store.id}-${pi}`}
                      name={product.name}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      aspect="square"
                      theme="light"
                      className="store-block-card"
                      onClick={() => router.push(`/tienda/${store.id}/producto/${product.slug}`)}
                    />
                  ))}
                </div>

                <div className="store-block-fade flex justify-center mt-10 lg:mt-12">
                  <button
                    onClick={() => router.push(`/tienda/${store.id}`)}
                    className="group relative overflow-hidden font-bebas text-base lg:text-lg tracking-[0.4em] px-12 lg:px-16 py-3.5 lg:py-4 border border-black/80 text-black cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      ACCEDER A LA TIENDA
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mostrar todas las tiendas */}
        <div className="flex justify-center mt-16 lg:mt-20">
          <button
            onClick={() => router.push('/tiendas')}
            className="group relative overflow-hidden font-bebas text-sm lg:text-base tracking-[0.4em] px-10 lg:px-14 py-3 lg:py-3.5 border border-black/50 text-black cursor-pointer"
          >
            <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              MOSTRAR TODAS LAS TIENDAS
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
