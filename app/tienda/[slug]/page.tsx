import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { stores, getStoreBySlug } from '@/data/stores'
import StoreProductGrid from '@/components/StoreProductGrid'

export const dynamicParams = false

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.id }))
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const store = getStoreBySlug(slug)
  if (!store) notFound()

  return (
    <main>
      <section className="bg-black px-4 lg:px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="font-sans text-[11px] tracking-[0.3em] text-white/40 hover:text-white/80 transition-colors duration-300 uppercase"
          >
            ← Volver al inicio
          </Link>

          <div className="flex items-start gap-5 mt-8 mb-10">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.12)] shrink-0">
              <Image
                src={store.logoPath}
                alt={store.name}
                width={56}
                height={56}
                className="object-contain max-w-[48px] max-h-[48px] w-full h-full rounded-md"
              />
            </div>
            <div>
              <h1 className="font-cormorant font-light text-white uppercase tracking-[0.15em] text-4xl lg:text-6xl">
                {store.name}
              </h1>
              {store.description && (
                <p className="font-sans text-white/60 text-sm lg:text-base mt-3 max-w-lg">{store.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
            <div className="mx-3 w-1 h-1 rotate-45 bg-white/60 shrink-0" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
          </div>
        </div>
      </section>

      <StoreProductGrid store={store} />
    </main>
  )
}
