import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar productos',
  description:
    'Buscá y filtrá entre todos los productos disponibles en ROTSIS: moda, tecnología, muebles, electrodomésticos y más.',
  openGraph: {
    title: 'Buscar productos | ROTSIS',
    description:
      'Buscá y filtrá entre todos los productos disponibles en ROTSIS.',
  },
}

export default function BuscarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
