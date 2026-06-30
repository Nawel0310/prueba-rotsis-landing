import { stores } from '@/data/stores'
import { categories } from '@/data/categories'
import { parsePrice } from '@/lib/utils'

export type SearchProduct = {
  id: string
  name: string
  price: string
  priceNum: number
  imageUrl: string
  category: string
  storeName: string
  storeId?: string
  productSlug?: string
  description?: string
}

let _cache: SearchProduct[] | null = null

export function getAllProducts(): SearchProduct[] {
  if (_cache) return _cache

  const result: SearchProduct[] = []

  for (const store of stores) {
    for (const product of store.products) {
      result.push({
        id: `store-${store.id}-${product.slug}`,
        name: product.name,
        price: product.price,
        priceNum: parsePrice(product.price),
        imageUrl: product.imageUrl,
        category: store.category,
        storeName: store.name,
        storeId: store.id,
        productSlug: product.slug,
        description: product.description,
      })
    }
  }

  for (const category of categories) {
    for (let i = 0; i < category.products.length; i++) {
      const product = category.products[i]
      result.push({
        id: `cat-${category.id}-${i}`,
        name: product.name,
        price: product.price,
        priceNum: parsePrice(product.price),
        imageUrl: product.imageUrl,
        category: category.label,
        storeName: product.brandLine,
        description: undefined,
      })
    }
  }

  _cache = result
  return result
}

export function searchProducts(query: string, all: SearchProduct[]): SearchProduct[] {
  if (!query.trim()) return all
  const q = query.toLowerCase().trim()
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.storeName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
}

export function getUniqueCategories(products: SearchProduct[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort()
}

export function getUniqueStores(products: SearchProduct[]): string[] {
  return [...new Set(products.map((p) => p.storeName))].sort()
}
