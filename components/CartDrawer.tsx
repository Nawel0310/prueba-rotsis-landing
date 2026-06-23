'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useCart } from './CartProvider'

function parsePrice(price: string): number {
  const cleaned = price.replace(/[^0-9.,]/g, '')
  const normalized = cleaned.replace(/\./g, '').replace(',', '.')
  return parseFloat(normalized) || 0
}

function formatPrice(n: number): string {
  return `$${n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty } = useCart()
  const lenis = useLenis()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isOpen, lenis])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeDrawer])

  const subtotal = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200]"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeDrawer} />

          <motion.div
            className="absolute inset-y-0 right-0 z-10 w-full max-w-sm sm:max-w-md bg-black border-l border-white/15 shadow-[0_0_70px_rgba(0,0,0,0.8)] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 lg:px-8 py-6 border-b border-white/10">
              <p className="font-sans text-[11px] tracking-[0.35em] text-white/60 uppercase">Tu Selección</p>
              <button
                onClick={closeDrawer}
                aria-label="Cerrar"
                className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <line x1="3" y1="3" x2="17" y2="17" />
                  <line x1="17" y1="3" x2="3" y2="17" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <p className="font-cormorant font-light text-white text-2xl uppercase tracking-[0.1em] mb-3">
                  Tu selección está vacía
                </p>
                <p className="font-sans text-white/40 text-xs tracking-[0.15em] uppercase">
                  Explore nuestras tiendas para comenzar
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={`${item.storeId}:${item.productSlug}`} className="flex gap-4">
                    <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border border-white/10">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase mb-1">
                        {item.storeName}
                      </p>
                      <p className="font-sans text-white/90 text-sm leading-snug line-clamp-2">{item.name}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 border border-white/20 px-2.5 py-1">
                          <button
                            onClick={() => updateQty(item.storeId, item.productSlug, item.qty - 1)}
                            aria-label="Disminuir cantidad"
                            className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer w-4 text-center"
                          >
                            −
                          </button>
                          <span className="font-sans text-xs text-white w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.storeId, item.productSlug, item.qty + 1)}
                            aria-label="Aumentar cantidad"
                            className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer w-4 text-center"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-sans font-semibold text-white text-sm">
                          {formatPrice(parsePrice(item.price) * item.qty)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.storeId, item.productSlug)}
                      aria-label="Quitar del carrito"
                      className="text-white/40 hover:text-white transition-colors duration-300 cursor-pointer self-start"
                    >
                      <svg width="14" height="14" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                        <line x1="3" y1="3" x2="17" y2="17" />
                        <line x1="17" y1="3" x2="3" y2="17" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-5">
                <p className="font-sans text-[11px] tracking-[0.3em] text-white/50 uppercase">Subtotal</p>
                <p className="font-sans font-semibold text-white text-lg">{formatPrice(subtotal)}</p>
              </div>

              <button
                disabled={items.length === 0}
                className="group relative overflow-hidden w-full font-bebas text-sm tracking-[0.4em] px-6 py-4 border border-white/80 text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  SOLICITAR COMPRA
                </span>
              </button>
              <p className="font-sans text-[10px] tracking-[0.15em] text-white/40 uppercase text-center mt-3 leading-relaxed">
                Un asesor de concierge se pondrá en contacto para finalizar su selección
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
