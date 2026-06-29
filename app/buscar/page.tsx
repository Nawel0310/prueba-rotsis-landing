'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  getAllProducts,
  searchProducts,
  parsePrice,
  getUniqueCategories,
  getUniqueStores,
  type SearchProduct,
} from '@/lib/search'
import { useProductModal } from '@/components/ProductModalProvider'

const PAGE_SIZE = 12

type SortOption = 'relevance' | 'asc' | 'desc'
type FilterTab = 'sort' | 'price' | 'categories' | 'stores'

// ─── Filter section (renders ONE section based on tab) ────────────────────────

function FilterSection({
  tab,
  sort, setSort,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  selectedCats, toggleCat,
  selectedStores, toggleStore,
  allCategories, allStores,
}: {
  tab: FilterTab
  sort: SortOption
  setSort: (v: SortOption) => void
  minPrice: string
  setMinPrice: (v: string) => void
  maxPrice: string
  setMaxPrice: (v: string) => void
  selectedCats: string[]
  toggleCat: (c: string) => void
  selectedStores: string[]
  toggleStore: (s: string) => void
  allCategories: string[]
  allStores: string[]
}) {
  const checkboxClass = (active: boolean) =>
    `w-3.5 h-3.5 border flex-shrink-0 transition-all duration-200 flex items-center justify-center ${
      active ? 'bg-black border-black' : 'border-black/40 group-hover:border-black/65'
    }`
  const labelClass = (active: boolean) =>
    `font-sans text-sm transition-colors duration-200 ${active ? 'text-black' : 'text-black/65 group-hover:text-black/90'}`

  if (tab === 'sort') {
    return (
      <div className="flex flex-col gap-3">
        {([
          ['relevance', 'Relevancia'],
          ['asc', 'Menor precio primero'],
          ['desc', 'Mayor precio primero'],
        ] as const).map(([val, label]) => (
          <button key={val} onClick={() => setSort(val)} className="flex items-center gap-3 cursor-pointer group text-left">
            <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all duration-200 ${
              sort === val ? 'bg-black border-black' : 'border-black/40 group-hover:border-black/65'
            }`} />
            <span className={labelClass(sort === val)}>{label}</span>
          </button>
        ))}
      </div>
    )
  }

  if (tab === 'price') {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-sans text-xs text-black/60">Rango de precios (ARS)</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Mínimo"
            className="w-full border-b border-black/20 focus:border-black outline-none font-sans text-sm text-black placeholder:text-black/40 py-1.5 bg-transparent transition-colors duration-200"
          />
          <span className="text-black/40 text-xs shrink-0">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Máximo"
            className="w-full border-b border-black/20 focus:border-black outline-none font-sans text-sm text-black placeholder:text-black/40 py-1.5 bg-transparent transition-colors duration-200"
          />
        </div>
      </div>
    )
  }

  if (tab === 'categories') {
    return (
      <div className="flex flex-col gap-2.5">
        {allCategories.map((cat) => (
          <button key={cat} onClick={() => toggleCat(cat)} className="flex items-center gap-3 cursor-pointer group text-left">
            <span className={checkboxClass(selectedCats.includes(cat))}>
              {selectedCats.includes(cat) && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <polyline points="1 3 3 5 7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className={labelClass(selectedCats.includes(cat))}>{cat}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5 overflow-y-auto">
      {allStores.map((store) => (
        <button key={store} onClick={() => toggleStore(store)} className="flex items-center gap-3 cursor-pointer group text-left">
          <span className={checkboxClass(selectedStores.includes(store))}>
            {selectedStores.includes(store) && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <polyline points="1 3 3 5 7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
          <span className={labelClass(selectedStores.includes(store))}>{store}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Desktop sidebar (all sections stacked) ───────────────────────────────────

function DesktopSidebar({
  sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice,
  selectedCats, toggleCat, selectedStores, toggleStore,
  allCategories, allStores, onClear, hasActiveFilters,
}: {
  sort: SortOption; setSort: (v: SortOption) => void
  minPrice: string; setMinPrice: (v: string) => void
  maxPrice: string; setMaxPrice: (v: string) => void
  selectedCats: string[]; toggleCat: (c: string) => void
  selectedStores: string[]; toggleStore: (s: string) => void
  allCategories: string[]; allStores: string[]
  onClear: () => void; hasActiveFilters: boolean
}) {
  const sectionTitle = (label: string) => (
    <p className="font-sans text-[10px] tracking-[0.3em] text-black/60 uppercase mb-4">{label}</p>
  )

  return (
    <aside className="hidden lg:block w-52 xl:w-60 shrink-0 sticky top-24 self-start">
      <p className="font-sans text-[10px] tracking-[0.35em] text-black/60 uppercase mb-8">Filtros</p>

      <div className="flex flex-col gap-8">
        <div>
          {sectionTitle('Ordenar')}
          <FilterSection tab="sort" sort={sort} setSort={setSort} minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCats={selectedCats} toggleCat={toggleCat}
            selectedStores={selectedStores} toggleStore={toggleStore} allCategories={allCategories} allStores={allStores} />
        </div>
        <div>
          {sectionTitle('Precio')}
          <FilterSection tab="price" sort={sort} setSort={setSort} minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCats={selectedCats} toggleCat={toggleCat}
            selectedStores={selectedStores} toggleStore={toggleStore} allCategories={allCategories} allStores={allStores} />
        </div>
        <div>
          {sectionTitle('Categorías')}
          <FilterSection tab="categories" sort={sort} setSort={setSort} minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCats={selectedCats} toggleCat={toggleCat}
            selectedStores={selectedStores} toggleStore={toggleStore} allCategories={allCategories} allStores={allStores} />
        </div>
        <div>
          {sectionTitle('Tiendas')}
          <FilterSection tab="stores" sort={sort} setSort={setSort} minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCats={selectedCats} toggleCat={toggleCat}
            selectedStores={selectedStores} toggleStore={toggleStore} allCategories={allCategories} allStores={allStores} />
        </div>
        {hasActiveFilters && (
          <button onClick={onClear} className="font-sans text-[10px] tracking-[0.25em] uppercase text-black/55 hover:text-black/90 transition-colors duration-300 cursor-pointer text-left border-t border-black/15 pt-4">
            Limpiar filtros
          </button>
        )}
      </div>
    </aside>
  )
}

// ─── Product result card ──────────────────────────────────────────────────────

function ResultCard({ product, onNavigate }: { product: SearchProduct; onNavigate: () => void }) {
  return (
    <div
      onClick={onNavigate}
      className="group relative bg-white border border-black/8 rounded-md overflow-hidden cursor-pointer hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-0.5"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black/5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
        <span className="absolute top-2 left-2 font-sans text-[9px] tracking-[0.2em] uppercase text-black/55 bg-white/80 backdrop-blur-sm px-2 py-1">
          {product.category}
        </span>
      </div>
      <div className="px-3 pt-3 pb-4">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/60 mb-1">{product.storeName}</p>
        <p className="font-sans text-sm text-black/80 leading-snug line-clamp-2 min-h-[2.5em]">{product.name}</p>
        <p className="font-sans font-semibold text-black text-sm tracking-[0.02em] mt-2">{product.price}</p>
      </div>
    </div>
  )
}

// ─── Pagination controls ──────────────────────────────────────────────────────

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visible = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        className="font-sans text-xs tracking-[0.2em] uppercase border border-black/25 px-4 py-2.5 text-black/70 hover:text-black hover:border-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
      >
        ← Anterior
      </button>

      {visible.map((p, i) => {
        const prev = visible[i - 1]
        return (
          <span key={p} className="flex items-center gap-2">
            {prev && p - prev > 1 && <span className="text-black/45 text-xs">…</span>}
            <button
              onClick={() => onPage(p)}
              className={`w-9 h-9 font-sans text-sm border transition-all duration-300 cursor-pointer ${
                p === page
                  ? 'bg-black text-white border-black'
                  : 'border-black/25 text-black/65 hover:border-black/65 hover:text-black'
              }`}
            >
              {p}
            </button>
          </span>
        )
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
        className="font-sans text-xs tracking-[0.2em] uppercase border border-black/25 px-4 py-2.5 text-black/70 hover:text-black hover:border-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
      >
        Siguiente →
      </button>
    </div>
  )
}

// ─── Main search client ───────────────────────────────────────────────────────

function BuscarClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { open } = useProductModal()

  const initialQuery = searchParams.get('q') ?? ''

  const [inputValue, setInputValue] = useState(initialQuery)
  const [sort, setSort] = useState<SortOption>('relevance')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<FilterTab>('sort')
  const [page, setPage] = useState(1)

  const allProducts = useMemo(() => getAllProducts(), [])

  const searchResults = useMemo(
    () => searchProducts(initialQuery, allProducts),
    [initialQuery, allProducts]
  )

  const allCategories = useMemo(() => getUniqueCategories(allProducts), [allProducts])
  const allStores = useMemo(() => getUniqueStores(allProducts), [allProducts])

  const filtered = useMemo(() => {
    let res = searchResults
    if (selectedCats.length > 0) res = res.filter((p) => selectedCats.includes(p.category))
    if (selectedStores.length > 0) res = res.filter((p) => selectedStores.includes(p.storeName))
    if (minPrice) res = res.filter((p) => p.priceNum >= parseFloat(minPrice))
    if (maxPrice) res = res.filter((p) => p.priceNum <= parseFloat(maxPrice))
    if (sort === 'asc') res = [...res].sort((a, b) => a.priceNum - b.priceNum)
    if (sort === 'desc') res = [...res].sort((a, b) => b.priceNum - a.priceNum)
    return res
  }, [searchResults, selectedCats, selectedStores, minPrice, maxPrice, sort])

  useEffect(() => { setPage(1) }, [filtered.length, initialQuery])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  const hasActiveFilters =
    sort !== 'relevance' || !!minPrice || !!maxPrice || selectedCats.length > 0 || selectedStores.length > 0

  const toggleCat = (c: string) =>
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const toggleStore = (s: string) =>
    setSelectedStores((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const clearFilters = () => {
    setSort('relevance')
    setMinPrice('')
    setMaxPrice('')
    setSelectedCats([])
    setSelectedStores([])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(inputValue.trim() ? `/buscar?q=${encodeURIComponent(inputValue.trim())}` : '/buscar')
  }

  const handleNavigate = (product: SearchProduct) => {
    if (product.storeId && product.productSlug) {
      router.push(`/tienda/${product.storeId}/producto/${product.productSlug}`)
    } else {
      open({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
        storeName: product.storeName,
      })
    }
  }

  const filterProps = {
    sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice,
    selectedCats, toggleCat, selectedStores, toggleStore,
    allCategories, allStores,
  }

  const showingAll = !initialQuery.trim()
  const resultLabel = showingAll
    ? `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`
    : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para "${initialQuery}"`

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-black/8 px-4 lg:px-8 py-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-sans text-[10px] tracking-[0.35em] text-black/60 uppercase mb-3">
            <button onClick={() => router.push('/')} className="hover:text-black/60 transition-colors cursor-pointer">Inicio</button>
            {' / '}
            <span>Búsqueda</span>
          </p>

          <form onSubmit={handleSearch} className="flex items-end gap-4">
            <div className="flex-1 max-w-xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar productos, tiendas, categorías..."
                className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none font-cormorant font-light text-2xl sm:text-3xl text-black placeholder:text-black/20 pb-2 transition-colors duration-300"
                autoFocus={!!initialQuery}
              />
            </div>
            <button
              type="submit"
              className="group relative overflow-hidden font-bebas text-sm tracking-[0.3em] px-6 py-2.5 border border-black/50 text-black cursor-pointer shrink-0 mb-0.5"
            >
              <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">BUSCAR</span>
            </button>
          </form>

          <p className="font-sans text-sm text-black/65 mt-4">{resultLabel}</p>
        </div>
      </div>

      {/* ── Layout ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="font-sans text-xs text-black/65 tracking-widest uppercase">
            Página {page} de {totalPages || 1}
          </p>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border border-black/20 px-4 py-2 text-black/70 hover:text-black hover:border-black/60 transition-all duration-300 cursor-pointer"
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <line x1="1" y1="2" x2="13" y2="2" />
              <line x1="3" y1="6" x2="11" y2="6" />
              <line x1="5" y1="10" x2="9" y2="10" />
            </svg>
            Filtros
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />}
          </button>
        </div>

        <div className="flex gap-10 lg:gap-14 items-start">
          {/* Desktop sidebar */}
          <DesktopSidebar
            {...filterProps}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Results */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-cormorant font-light text-black/50 text-4xl tracking-[0.15em] uppercase mb-4">
                  Sin resultados
                </p>
                <p className="font-sans text-black/60 text-sm">
                  {hasActiveFilters ? 'Intentá ajustar los filtros' : `No encontramos nada para "${initialQuery}"`}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-6 font-sans text-xs tracking-[0.2em] uppercase border border-black/25 px-5 py-2 text-black/60 hover:text-black hover:border-black/60 transition-all duration-300 cursor-pointer"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {paginated.map((product) => (
                    <ResultCard
                      key={product.id}
                      product={product}
                      onNavigate={() => handleNavigate(product)}
                    />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onPage={setPage} />
              </>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile filter drawer with tabs ─────────────────────────────── */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] flex flex-col bg-white border-t border-black/10 lg:hidden rounded-t-2xl overflow-hidden">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/8 shrink-0">
              <p className="font-sans text-[10px] tracking-[0.35em] text-black/65 uppercase">Filtros</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-black/60 hover:text-black transition-colors cursor-pointer"
                aria-label="Cerrar filtros"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="2" y1="2" x2="14" y2="14" />
                  <line x1="14" y1="2" x2="2" y2="14" />
                </svg>
              </button>
            </div>

            {/* Tab navbar */}
            <div className="flex border-b border-black/8 shrink-0">
              {([
                ['sort', 'Ordenar'],
                ['price', 'Precio'],
                ['categories', 'Categorías'],
                ['stores', 'Tiendas'],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setActiveTab(val)}
                  className={`flex-1 py-3 font-sans text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === val
                      ? 'border-black text-black'
                      : 'border-transparent text-black/55 hover:text-black/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Active section content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterSection tab={activeTab} {...filterProps} />
            </div>

            {/* Actions */}
            <div className="px-5 pb-6 pt-3 border-t border-black/8 shrink-0 flex gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex-1 font-sans text-xs tracking-[0.2em] uppercase border border-black/20 py-3 text-black/65 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Limpiar
                </button>
              )}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 group relative overflow-hidden font-bebas text-sm tracking-[0.3em] py-3 border border-black/60 text-black cursor-pointer"
              >
                <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">VER RESULTADOS</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BuscarClient />
    </Suspense>
  )
}
