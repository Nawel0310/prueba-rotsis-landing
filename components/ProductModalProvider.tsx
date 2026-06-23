'use client'

import { createContext, useContext, useState } from 'react'
import ProductModal, { type ProductModalData } from './ProductModal'

const ProductModalContext = createContext<{ open: (data: ProductModalData) => void } | null>(null)

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ProductModalData | null>(null)

  return (
    <ProductModalContext.Provider value={{ open: setData }}>
      {children}
      <ProductModal data={data} onClose={() => setData(null)} />
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const ctx = useContext(ProductModalContext)
  if (!ctx) throw new Error('useProductModal must be used within ProductModalProvider')
  return ctx
}
