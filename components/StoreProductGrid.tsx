'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/gsap'
import type { Store } from '@/data/stores'
import ProductCard from './ProductCard'

export default function StoreProductGrid({ store }: { store: Store }) {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.store-grid-card', sectionRef.current)
        gsap.set(cards, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(gsap.utils.toArray('.product-card-img', sectionRef.current), { scale: 1.18 })

        const tl = gsap.timeline()
        tl.to(cards, { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.07, duration: 1.0, ease: 'power4.out' }).to(
          gsap.utils.toArray('.product-card-img', sectionRef.current),
          { scale: 1, stagger: 0.07, duration: 1.4, ease: 'power3.out' },
          '<'
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.store-grid-card', { clipPath: 'inset(0% 0% 0% 0%)' })
      })
    },
    { scope: sectionRef, dependencies: [store.id] }
  )

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28 px-4 lg:px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {store.products.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            aspect="portrait"
            theme="light"
            className="store-grid-card"
            onClick={() => router.push(`/tienda/${store.id}/producto/${product.slug}`)}
          />
        ))}
      </div>
    </section>
  )
}
