'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'

export interface ProductModalData {
  name: string
  price: string
  imageUrl: string
  description?: string
  storeName: string
}

export default function ProductModal({
  data,
  onClose,
}: {
  data: ProductModalData | null
  onClose: () => void
}) {
  const lenis = useLenis()
  const open = Boolean(data)

  useEffect(() => {
    if (open) {
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
  }, [open, lenis])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={data.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-3xl bg-black border border-white/15 rounded-md overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.8)] grid grid-cols-1 sm:grid-cols-2"
            initial={{ scale: 0.95, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <line x1="3" y1="3" x2="17" y2="17" />
                <line x1="17" y1="3" x2="3" y2="17" />
              </svg>
            </button>

            <div className="relative aspect-square sm:aspect-auto sm:h-full min-h-[280px]">
              <Image
                src={data.imageUrl}
                alt={data.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="font-sans text-[11px] tracking-[0.3em] text-white/45 uppercase mb-3">{data.storeName}</p>
              <h3 className="font-cormorant font-light text-white uppercase tracking-[0.1em] text-3xl lg:text-4xl mb-4 leading-tight">
                {data.name}
              </h3>
              {data.description && (
                <p className="font-sans text-white/60 text-sm lg:text-base leading-relaxed mb-6">{data.description}</p>
              )}
              <p className="font-sans font-semibold text-white text-2xl tracking-[0.03em]">{data.price}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
