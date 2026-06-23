'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CartDrawer from './CartDrawer'

export interface CartItem {
  storeId: string
  storeName: string
  productSlug: string
  name: string
  price: string
  imageUrl: string
  qty: number
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void
  removeItem: (storeId: string, productSlug: string) => void
  updateQty: (storeId: string, productSlug: string, qty: number) => void
  openDrawer: () => void
  closeDrawer: () => void
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'rotsis-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // Deliberately deferred to an effect (not a lazy useState initializer):
      // reading localStorage during render would mismatch the static-export
      // server HTML, which always has an empty cart.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.storeId === item.storeId && i.productSlug === item.productSlug)
      if (existing) {
        return prev.map((i) =>
          i.storeId === item.storeId && i.productSlug === item.productSlug
            ? { ...i, qty: i.qty + (item.qty ?? 1) }
            : i
        )
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }]
    })
  }, [])

  const removeItem = useCallback((storeId: string, productSlug: string) => {
    setItems((prev) => prev.filter((i) => !(i.storeId === storeId && i.productSlug === productSlug)))
  }, [])

  const updateQty = useCallback((storeId: string, productSlug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.storeId === storeId && i.productSlug === productSlug))
        : prev.map((i) => (i.storeId === storeId && i.productSlug === productSlug ? { ...i, qty } : i))
    )
  }, [])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      addItem,
      removeItem,
      updateQty,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
      itemCount,
    }),
    [items, isOpen, addItem, removeItem, updateQty, itemCount]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
