import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todas las Tiendas',
  description:
    'Explorá todas las tiendas disponibles en ROTSIS: moda, deportes, tecnología, belleza, muebles y más.',
  openGraph: {
    title: 'Todas las Tiendas | ROTSIS',
    description:
      'Explorá todas las tiendas disponibles en ROTSIS.',
  },
}

export default function TiendasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
