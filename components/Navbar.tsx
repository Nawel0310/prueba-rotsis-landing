'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'

const LINKS = [
  { id: 'categorias', label: 'Categorías' },
  { id: 'tiendas', label: 'Tiendas' },
  { id: 'concierge', label: 'Concierge' },
]

export default function Navbar() {
  const lenis = useLenis()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

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

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) {
      lenis.scrollTo(el, { offset: -96, duration: 1.3 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-[1600px] mx-auto h-20 px-4 lg:px-8 flex items-center justify-between gap-6">
        <a
          href="#"
          onClick={goTop}
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
              if (e.key === 'Enter') setSearchOpen(false)
            }}
            placeholder="Buscar productos, tiendas, categorías"
            className={`font-sans text-sm text-white placeholder:text-white/35 bg-transparent border-b border-white/30 focus:border-white outline-none transition-all duration-500 ease-out ${
              searchOpen ? 'w-44 sm:w-64 opacity-100 mr-3' : 'w-0 opacity-0 mr-0 pointer-events-none'
            }`}
          />
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer shrink-0"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <circle cx="8" cy="8" r="6.2" />
              <line x1="12.6" y1="12.6" x2="17.5" y2="17.5" />
            </svg>
          </button>

          <button className="hidden lg:inline-flex group relative overflow-hidden font-bebas text-[11px] tracking-[0.3em] px-6 py-2.5 border border-white/70 text-white cursor-pointer shrink-0 ml-5">
            <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              ACCEDER AL SISTEMA
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
