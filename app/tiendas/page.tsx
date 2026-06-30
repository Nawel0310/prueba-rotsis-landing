'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { stores } from '@/data/stores'
import { RUBROS } from '@/data/constants'
import { Button } from '@/components/ui/Button'

const STORES_PER_PAGE = 5

export default function TiendasPage() {
  const router = useRouter()
  const [rubroFilter, setRubroFilter] = useState('Todos')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => rubroFilter === 'Todos' ? stores : stores.filter((s) => s.category === rubroFilter),
    [rubroFilter]
  )

  const totalPages = Math.ceil(filtered.length / STORES_PER_PAGE)
  const paginated = useMemo(() => {
    const start = (page - 1) * STORES_PER_PAGE
    return filtered.slice(start, start + STORES_PER_PAGE)
  }, [filtered, page])

  const handleRubro = useCallback((rubro: string) => {
    setRubroFilter(rubro)
    setPage(1)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="border-b border-black/8 px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-sans text-[10px] tracking-[0.35em] text-black/90 uppercase mb-6">
            <button onClick={() => router.push('/')} className="hover:text-black/90 transition-colors cursor-pointer">Inicio</button>
            {' / '}
            <span>Tiendas</span>
          </p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-cormorant font-light text-black text-4xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase leading-none">
                Todas las Tiendas
              </h1>
              <p className="font-sans text-black/90 text-sm mt-3 tracking-[0.02em]">
                {filtered.length} tienda{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Rubro filter ────────────────────────────────────────────── */}
      <div className="border-b border-black/8 px-4 lg:px-8 py-5">
        <div className="max-w-[1000px] mx-auto flex items-center gap-2 flex-wrap">
          <span className="font-sans text-[9px] tracking-[0.3em] text-black/90 uppercase mr-2 shrink-0">Rubro</span>
          {RUBROS.map((rubro) => (
            <button
              key={rubro}
              onClick={() => handleRubro(rubro)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border transition-all duration-300 cursor-pointer ${
                rubroFilter === rubro
                  ? 'bg-black text-white border-black'
                  : 'border-black/50 text-black/90 hover:border-black/55 hover:text-black'
              }`}
            >
              {rubro}
            </button>
          ))}
        </div>
      </div>

      {/* ── Store list ──────────────────────────────────────────────── */}
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {paginated.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-cormorant font-light text-black/90 text-4xl tracking-[0.15em] uppercase mb-3">Sin tiendas</p>
            <p className="font-sans text-black/90 text-sm">No hay tiendas en este rubro</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-5">
            {paginated.map((store, i) => (
              <div
                key={store.id}
                className="group flex items-center gap-5 sm:gap-7 p-5 sm:p-6 border border-black/10 bg-white hover:border-black/45 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-400 ease-out"
              >
                {/* Index + Logo */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-sans text-[11px] text-black/85 tabular-nums w-5 text-right">
                    {String((page - 1) * STORES_PER_PAGE + i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border border-black/10 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src={store.logoPath}
                        alt={store.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-black/90 block mb-0.5">
                        {store.category}
                      </span>
                      <h2 className="font-cormorant font-light text-black text-xl sm:text-2xl tracking-[0.12em] uppercase leading-none truncate">
                        {store.name}
                      </h2>
                    </div>
                  </div>
                  {store.description && (
                    <p className="font-sans text-black/90 text-sm mt-2 leading-relaxed line-clamp-2 max-w-md">
                      {store.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-4">
                    <span className="font-sans text-[10px] tracking-[0.15em] text-black/90">
                      {store.products.length} producto{store.products.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  theme="light"
                  onClick={() => router.push(`/tienda/${store.id}`)}
                  className="font-bebas text-[11px] sm:text-sm tracking-[0.35em] px-6 sm:px-8 py-3 sm:py-3.5 border border-black/50 text-black shrink-0"
                >
                  ACCEDER
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="font-sans text-xs tracking-[0.2em] uppercase border border-black/50 px-5 py-2.5 text-black/90 hover:text-black hover:border-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              ← Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 font-sans text-sm border transition-all duration-300 cursor-pointer ${
                  p === page
                    ? 'bg-black text-white border-black'
                    : 'border-black/50 text-black/90 hover:border-black/65 hover:text-black'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="font-sans text-xs tracking-[0.2em] uppercase border border-black/50 px-5 py-2.5 text-black/90 hover:text-black hover:border-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
