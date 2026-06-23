'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { getFeaturedStores, type Product } from '@/data/stores'
import ProductCard from './ProductCard'
import ProductModal, { type ProductModalData } from './ProductModal'

export default function StoreShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selected, setSelected] = useState<ProductModalData | null>(null)
  const stores = getFeaturedStores()

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

  const openProduct = (storeName: string, product: Product) => {
    setSelected({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      storeName,
    })
  }

  return (
    <section ref={sectionRef} className="bg-black py-28 lg:py-36 px-4 lg:px-6">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-sans text-[11px] tracking-[0.35em] text-white/45 uppercase mb-4">Tiendas Seleccionadas</p>
        <h2 className="font-cormorant font-light text-white uppercase tracking-[0.15em] text-4xl lg:text-6xl mb-20 lg:mb-28">
          Nuestras Tiendas
        </h2>

        <div className="flex flex-col gap-24 lg:gap-32">
          {stores.map((store, si) => (
            <div
              key={store.id}
              ref={(el) => {
                blockRefs.current[si] = el
              }}
            >
              <div className="store-block-fade flex items-center gap-4 lg:gap-5 mb-8">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0">
                  <Image
                    src={store.logoPath}
                    alt={store.name}
                    width={48}
                    height={48}
                    className="object-contain max-w-[40px] max-h-[40px] w-full h-full rounded-md"
                  />
                </div>
                <h3 className="font-cormorant font-light text-white uppercase tracking-[0.2em] text-3xl lg:text-4xl">
                  {store.name}
                </h3>
              </div>
              <div className="store-block-fade w-full flex items-center mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="mx-3 w-1 h-1 rotate-45 bg-white/50 shrink-0" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
                {store.products.slice(0, 4).map((product, pi) => (
                  <button
                    key={`${store.id}-${pi}`}
                    onClick={() => openProduct(store.name, product)}
                    className="store-block-card w-full text-left cursor-pointer"
                  >
                    <ProductCard
                      name={product.name}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      aspect="square"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal data={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
