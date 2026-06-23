export interface CategoryProduct {
  name: string
  brandLine: string
  price: string
  imageUrl: string
}

export interface Category {
  id: string
  label: string
  shortLabel: string
  products: CategoryProduct[]
}

function u(id: string, w = 480, h = 600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`
}

export const categories: Category[] = [
  {
    id: 'electrodomesticos',
    label: 'Electrodomésticos',
    shortLabel: 'ELECTRO',
    products: [
      { name: 'Induction Range Élite 90', brandLine: 'ATELIER FORGE', price: '$8.450,00', imageUrl: u('1556911220-bff31c812dba') },
      { name: 'Built-In Wine Cellar 180', brandLine: 'CAVE NOIRE', price: '$6.200,00', imageUrl: u('1556909190-eccf4a8bf97a') },
      { name: 'Integrated Coffee System', brandLine: 'MAISON BRÜHL', price: '$3.180,00', imageUrl: u('1556909114-f6e7ad7d3136') },
      { name: 'French Door Refrigerator Pro', brandLine: 'ATELIER FORGE', price: '$9.900,00', imageUrl: u('1565183997392-2f6f122e5912') },
      { name: 'Steam Combination Oven', brandLine: 'MAISON BRÜHL', price: '$4.750,00', imageUrl: u('1556909172-54557c7e4fb7') },
      { name: 'Sculpted Range Hood Vertex', brandLine: 'ATELIER FORGE', price: '$2.890,00', imageUrl: u('1556911220-bff31c812dba') },
    ],
  },
  {
    id: 'tecnologia',
    label: 'Tecnología',
    shortLabel: 'TECH',
    products: [
      { name: 'Studio Reference Headphones', brandLine: 'NORDLINE AUDIO', price: '$1.450,00', imageUrl: u('1505740420928-5e560c06d30e') },
      { name: 'Heritage Leather Headphones', brandLine: 'NORDLINE AUDIO', price: '$1.680,00', imageUrl: u('1484704849700-f032a568e944') },
      { name: 'Full-Frame Mirrorless Body', brandLine: 'OPTIK WERK', price: '$6.900,00', imageUrl: u('1502920917128-1aa500764cbd') },
      { name: 'Titanium Processing Core', brandLine: 'OPTIK WERK', price: '$3.250,00', imageUrl: u('1518770660439-4636190af475') },
      { name: 'Reference Tablet Pro 14"', brandLine: 'VESPER DIGITAL', price: '$2.340,00', imageUrl: u('1542751110-97427bbecf20') },
      { name: 'Noise-Isolating Headphones', brandLine: 'NORDLINE AUDIO', price: '$1.290,00', imageUrl: u('1546435770-a3e426bf472b') },
    ],
  },
  {
    id: 'muebles',
    label: 'Muebles',
    shortLabel: 'MUEBLES',
    products: [
      { name: 'Velvet Cantilever Sofa', brandLine: 'STUDIO LUMEN', price: '$7.200,00', imageUrl: u('1555041469-a586c61ea9bc') },
      { name: 'Sculpted Lounge Chair', brandLine: 'STUDIO LUMEN', price: '$4.850,00', imageUrl: u('1586023492125-27b2c045efd7') },
      { name: 'Curved Two-Seat Sofa', brandLine: 'STUDIO LUMEN', price: '$6.400,00', imageUrl: u('1567016432779-094069958ea5') },
      { name: 'Upholstered Platform Bed', brandLine: 'MARBLE & OAK', price: '$5.900,00', imageUrl: u('1586105251261-72a756497a11') },
      { name: 'Channel-Tufted Sofa', brandLine: 'MARBLE & OAK', price: '$8.100,00', imageUrl: u('1493663284031-b7e3aefcae8e') },
      { name: 'Hand-Carved Accent Chair', brandLine: 'MARBLE & OAK', price: '$3.600,00', imageUrl: u('1567538096630-e0c55bd6374c') },
    ],
  },
  {
    id: 'bano',
    label: 'Baño',
    shortLabel: 'BAÑO',
    products: [
      { name: 'Rainfall Shower Tower', brandLine: 'AQUA LUME', price: '$4.200,00', imageUrl: u('1584622650111-993a426fbf0a') },
      { name: 'Sculptural Freestanding Tub', brandLine: 'AQUA LUME', price: '$9.500,00', imageUrl: u('1620626011761-996317b8d101') },
      { name: 'Brass Framed Vanity Mirror', brandLine: 'AQUA LUME', price: '$1.850,00', imageUrl: u('1564540583246-934409427776') },
      { name: 'Matte Black Faucet Set', brandLine: 'PIETRA BAGNO', price: '$1.420,00', imageUrl: u('1600566752355-35792bedcfea') },
      { name: 'Floating Vanity Suite', brandLine: 'PIETRA BAGNO', price: '$6.700,00', imageUrl: u('1604709177225-055f99402ea3') },
      { name: 'Heated Towel Rail System', brandLine: 'PIETRA BAGNO', price: '$980,00', imageUrl: u('1584622650111-993a426fbf0a') },
    ],
  },
  {
    id: 'ropa',
    label: 'Ropa',
    shortLabel: 'ROPA',
    products: [
      { name: 'Cashmere Overcoat', brandLine: 'MAISON VESTE', price: '$2.450,00', imageUrl: u('1490481651871-ab68de25d43d') },
      { name: 'Hand-Finished Tailored Suit', brandLine: 'MAISON VESTE', price: '$3.800,00', imageUrl: u('1490114538077-0a7f8cb49891') },
      { name: 'Merino Crewneck Sweater', brandLine: 'ATELIER NOIR', price: '$680,00', imageUrl: u('1503341504253-dff4815485f1') },
      { name: 'Belted Wool Trench', brandLine: 'ATELIER NOIR', price: '$1.950,00', imageUrl: u('1539109136881-3be0616acf4b') },
      { name: 'Silk Tailored Trousers', brandLine: 'ATELIER NOIR', price: '$890,00', imageUrl: u('1485968579580-b6d095142e6e') },
      { name: 'Leather Bomber Jacket', brandLine: 'MAISON VESTE', price: '$2.100,00', imageUrl: u('1551488831-00ddcb6c6bd3') },
    ],
  },
]

export function getCategoryIndex(id: string) {
  return categories.findIndex((c) => c.id === id)
}
