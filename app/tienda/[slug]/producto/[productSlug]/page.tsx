import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { stores, getProductBySlug, getRelatedProducts } from '@/data/stores'
import ProductDetailView from '@/components/ProductDetailView'

export const dynamicParams = false

export function generateStaticParams() {
  return stores.flatMap((s) => s.products.map((p) => ({ slug: s.id, productSlug: p.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>
}): Promise<Metadata> {
  const { slug, productSlug } = await params
  const found = getProductBySlug(slug, productSlug)
  if (!found) return {}
  const { store, product } = found
  return {
    title: product.name,
    description:
      product.description ??
      `${product.name} de ${store.name} — disponible en ROTSIS.`,
    openGraph: {
      title: `${product.name} | ${store.name} — ROTSIS`,
      description:
        product.description ??
        `${product.name} de ${store.name} — disponible en ROTSIS.`,
      images: [{ url: product.imageUrl, alt: product.name }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>
}) {
  const { slug, productSlug } = await params
  const found = getProductBySlug(slug, productSlug)
  if (!found) notFound()
  const { store, product } = found
  const related = getRelatedProducts(slug, productSlug)

  return <ProductDetailView store={store} product={product} related={related} />
}
