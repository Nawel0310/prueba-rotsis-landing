'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { useCart } from './CartProvider'
import { Button } from '@/components/ui/Button'

const LINKS = [
  { id: 'categorias', label: 'Categorías' },
  { id: 'tiendas', label: 'Tiendas' },
  { id: 'nosotros', label: 'Sobre Nosotros' },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const { itemCount, openDrawer } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const doSearch = useCallback(() => {
    if (!query.trim()) return
    router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setQuery('')
  }, [query, router])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen])

  const goTo = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      if (id === 'categorias') { router.push('/buscar'); return }
      if (id === 'tiendas') { router.push('/tiendas'); return }
      if (id === 'nosotros') {
        if (pathname === '/') {
          const el = document.getElementById('nosotros')
          if (el) {
            if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.3 })
            else el.scrollIntoView({ behavior: 'smooth' })
          }
        } else {
          router.push('/#nosotros')
        }
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.3 })
      else el.scrollIntoView({ behavior: 'smooth' })
    },
    [lenis, pathname, router],
  )

  const goHome = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (pathname === '/') {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/')
      }
    },
    [lenis, pathname, router],
  )

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-[1600px] mx-auto h-20 px-4 lg:px-8 flex items-center justify-between gap-6">
        <a
          href="#"
          onClick={goHome}
          className="font-bebas text-lg lg:text-xl tracking-[0.35em] text-white shrink-0 cursor-pointer"
        >
          ROTSIS
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={goTo(l.id)}
              className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div ref={wrapRef} className="flex items-center justify-end">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') doSearch()
            }}
            placeholder="Buscar productos, tiendas, categorías"
            className={`font-sans text-sm text-white placeholder:text-white/35 bg-transparent border-b border-white/30 focus:border-white outline-none transition-all duration-500 ease-out ${
              searchOpen ? 'w-44 sm:w-64 opacity-100 mr-3' : 'w-0 opacity-0 mr-0 pointer-events-none'
            }`}
          />
          <button
            aria-label="Buscar"
            onClick={() => {
              if (query.trim()) {
                doSearch()
              } else {
                setSearchOpen((v) => !v)
              }
            }}
            className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer shrink-0"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <circle cx="8" cy="8" r="6.2" />
              <line x1="12.6" y1="12.6" x2="17.5" y2="17.5" />
            </svg>
          </button>

          <button
            aria-label="Ver carrito"
            onClick={openDrawer}
            className="relative text-white/70 hover:text-white transition-colors duration-300 cursor-pointer shrink-0 ml-5"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5h2l1.4 9.2A2 2 0 0 0 8.4 16h7.2a2 2 0 0 0 2-1.7L19 7H5" />
              <circle cx="8" cy="18" r="1" />
              <circle cx="16" cy="18" r="1" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full border border-white text-white text-[10px] font-sans leading-none bg-black">
                {itemCount}
              </span>
            )}
          </button>

          <Button
            theme="dark"
            className="hidden lg:inline-flex font-bebas text-[11px] tracking-[0.3em] px-6 py-2.5 border border-white/70 text-white shrink-0 ml-5"
          >
            ACCEDER AL SISTEMA
          </Button>
        </div>
      </div>
    </header>
  )
}
