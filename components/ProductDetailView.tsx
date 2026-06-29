'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLenis } from 'lenis/react'
import type { Product, Store } from '@/data/stores'
import { useCart } from './CartProvider'
import ProductCard from './ProductCard'

export default function ProductDetailView({
  store,
  product,
  related,
}: {
  store: Store
  product: Product
  related: Product[]
}) {
  const { addItem, openDrawer } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      document.documentElement.scrollTop = 0
    }
    setActiveImage(0)
  }, [product.slug])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.pdp-gallery', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('.pdp-info', { y: 16, autoAlpha: 0 })

        gsap
          .timeline()
          .to('.pdp-gallery', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.out' })
          .to('.pdp-info', { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, '<0.15')
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.pdp-gallery', { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set('.pdp-info', { autoAlpha: 1 })
      })
    },
    { scope: sectionRef, dependencies: [product.slug] }
  )

  const handleAddToCart = () => {
    addItem({
      storeId: store.id,
      storeName: store.name,
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    })
    openDrawer()
  }

  return (
    <main ref={sectionRef} className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pt-10 lg:pt-14 pb-24 lg:pb-32">
        <Link
          href={`/tienda/${store.id}`}
          className="font-sans text-[11px] tracking-[0.3em] text-black/40 hover:text-black/80 transition-colors duration-300 uppercase"
        >
          ← Volver a {store.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8">
          <div className="pdp-gallery">
            <div className="relative w-full aspect-square overflow-hidden rounded-md border border-black/10 bg-black/5">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                preload={true}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border cursor-pointer transition-colors duration-300 ${
                      i === activeImage ? 'border-black/70' : 'border-black/15 hover:border-black/40'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-info flex flex-col">
            <p className="font-sans text-[11px] tracking-[0.3em] text-black/45 uppercase mb-3">{store.name}</p>
            <h1 className="font-cormorant font-light text-black uppercase tracking-[0.1em] text-3xl lg:text-5xl leading-tight mb-5">
              {product.name}
            </h1>

            {product.description && (
              <p className="font-sans text-black/60 text-sm lg:text-base leading-relaxed mb-6 max-w-md">
                {product.description}
              </p>
            )}

            <p className="font-sans font-semibold text-black text-2xl lg:text-3xl tracking-[0.02em] mb-8">
              {product.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="group relative overflow-hidden w-full sm:w-auto font-bebas text-base tracking-[0.4em] px-12 py-4 border border-black/80 text-black cursor-pointer"
            >
              <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                AÑADIR AL CARRITO
              </span>
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 lg:mt-32">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
              <p className="font-sans text-[11px] tracking-[0.3em] text-black/45 uppercase mx-4">
                También en {store.name}
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-black/20 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/tienda/${store.id}/producto/${p.slug}`}>
                  <ProductCard name={p.name} price={p.price} imageUrl={p.imageUrl} aspect="portrait" theme="light" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
