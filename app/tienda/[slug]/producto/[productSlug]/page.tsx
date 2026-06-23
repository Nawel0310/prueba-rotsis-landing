import { notFound } from 'next/navigation'
import { stores, getProductBySlug, getRelatedProducts } from '@/data/stores'
import ProductDetailView from '@/components/ProductDetailView'

export const dynamicParams = false

export function generateStaticParams() {
  return stores.flatMap((s) => s.products.map((p) => ({ slug: s.id, productSlug: p.slug })))
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
