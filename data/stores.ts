export interface Product {
  name: string
  price: string
  imageUrl: string
}

export interface Store {
  id: string
  name: string
  logoPath: string
  products: Product[]
}

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/300/300`
}

export const stores: Store[] = [
  {
    id: 'zara',
    name: 'ZARA',
    logoPath: '/images/iconos/zara_icon.webp',
    products: [
      { name: 'Blazer Structured', price: '€79,99', imageUrl: img('zara-blazer') },
      { name: 'Linen Mini Dress', price: '€49,99', imageUrl: img('zara-dress') },
      { name: 'Wide Leg Trousers', price: '€39,99', imageUrl: img('zara-pants') },
      { name: 'Oversized Shirt', price: '€29,99', imageUrl: img('zara-shirt') },
      { name: 'Knit Cardigan', price: '€59,99', imageUrl: img('zara-cardigan') },
      { name: 'Leather Tote Bag', price: '€89,99', imageUrl: img('zara-bag') },
      { name: 'Block Heel Mules', price: '€69,99', imageUrl: img('zara-shoes') },
      { name: 'Silk Scarf', price: '€19,99', imageUrl: img('zara-scarf') },
    ],
  },
  {
    id: 'hm',
    name: 'H&M',
    logoPath: '/images/iconos/h&m_icon.png',
    products: [
      { name: 'Cotton T-Shirt', price: '€12,99', imageUrl: img('hm-tshirt') },
      { name: 'Slim Fit Jeans', price: '€34,99', imageUrl: img('hm-jeans') },
      { name: 'Floral Midi Dress', price: '€24,99', imageUrl: img('hm-dress') },
      { name: 'Puffer Jacket', price: '€49,99', imageUrl: img('hm-jacket') },
      { name: 'Chelsea Boots', price: '€39,99', imageUrl: img('hm-boots') },
      { name: 'Canvas Tote Bag', price: '€14,99', imageUrl: img('hm-bag') },
      { name: 'Ribbed Sweater', price: '€27,99', imageUrl: img('hm-sweater') },
      { name: 'Pleated Mini Skirt', price: '€19,99', imageUrl: img('hm-skirt') },
    ],
  },
  {
    id: 'nike',
    name: 'NIKE',
    logoPath: '/images/iconos/nike_icon.png',
    products: [
      { name: 'Air Max 270', price: '€149,99', imageUrl: img('nike-airmax270') },
      { name: 'Dri-FIT Training Tee', price: '€34,99', imageUrl: img('nike-tee') },
      { name: 'Tech Fleece Hoodie', price: '€119,99', imageUrl: img('nike-hoodie') },
      { name: 'Tempo Shorts', price: '€44,99', imageUrl: img('nike-shorts') },
      { name: 'React Infinity Run', price: '€139,99', imageUrl: img('nike-react') },
      { name: 'Pro Mid-Rise Leggings', price: '€54,99', imageUrl: img('nike-leggings') },
      { name: 'Air Force 1 Low', price: '€109,99', imageUrl: img('nike-af1') },
      { name: 'Windrunner Jacket', price: '€99,99', imageUrl: img('nike-windrunner') },
    ],
  },
  {
    id: 'adidas',
    name: 'ADIDAS',
    logoPath: '/images/iconos/adidas_icon.png',
    products: [
      { name: 'Ultraboost 23', price: '€179,99', imageUrl: img('adidas-ultraboost') },
      { name: 'Tiro 23 Track Pants', price: '€44,99', imageUrl: img('adidas-trackpants') },
      { name: 'Essentials 3-Stripe Hoodie', price: '€54,99', imageUrl: img('adidas-hoodie') },
      { name: 'Stan Smith', price: '€99,99', imageUrl: img('adidas-stansmith') },
      { name: 'Originals Trefoil Tee', price: '€34,99', imageUrl: img('adidas-tee') },
      { name: 'Adilette Aqua Slides', price: '€29,99', imageUrl: img('adidas-slides') },
      { name: 'Supernova 3 Run', price: '€119,99', imageUrl: img('adidas-supernova') },
      { name: 'Linear Duffel Bag', price: '€39,99', imageUrl: img('adidas-duffel') },
    ],
  },
  {
    id: 'apple',
    name: 'APPLE STORE',
    logoPath: '/images/iconos/apple_store_icon.png',
    products: [
      { name: 'iPhone 16 Pro Max', price: '€1.229,00', imageUrl: img('apple-iphone16') },
      { name: 'MacBook Air M3 13"', price: '€1.299,00', imageUrl: img('apple-macbook') },
      { name: 'AirPods Pro 2', price: '€279,00', imageUrl: img('apple-airpods') },
      { name: 'Apple Watch Series 10', price: '€449,00', imageUrl: img('apple-watch') },
      { name: 'iPad Air M2 11"', price: '€699,00', imageUrl: img('apple-ipad') },
      { name: 'MagSafe Charger 25W', price: '€49,00', imageUrl: img('apple-magsafe') },
      { name: 'Apple TV 4K', price: '€149,00', imageUrl: img('apple-tv') },
      { name: 'HomePod Mini', price: '€99,00', imageUrl: img('apple-homepod') },
    ],
  },
  {
    id: 'sephora',
    name: 'SEPHORA',
    logoPath: '/images/iconos/sepora_icon.jpg',
    products: [
      { name: 'Charlotte Tilbury Foundation', price: '€39,99', imageUrl: img('sephora-foundation') },
      { name: 'YSL Rouge Pur Couture', price: '€42,00', imageUrl: img('sephora-lipstick') },
      { name: 'Fenty Beauty Pro Kit', price: '€54,99', imageUrl: img('sephora-fenty') },
      { name: 'Dior Sauvage EDP 100ml', price: '€109,99', imageUrl: img('sephora-dior') },
      { name: 'Drunk Elephant C-Firma', price: '€79,00', imageUrl: img('sephora-serum') },
      { name: 'NARS Blush Orgasm', price: '€34,99', imageUrl: img('sephora-blush') },
      { name: 'Too Faced Better Than Sex Mascara', price: '€27,00', imageUrl: img('sephora-mascara') },
      { name: 'La Mer Moisturizing Cream', price: '€89,99', imageUrl: img('sephora-cream') },
    ],
  },
  {
    id: 'miniso',
    name: 'MINISO',
    logoPath: '/images/iconos/miniso_icon.webp',
    products: [
      { name: 'Aromatherapy Diffuser', price: '€14,99', imageUrl: img('miniso-diffuser') },
      { name: 'True Wireless Earbuds', price: '€19,99', imageUrl: img('miniso-earbuds') },
      { name: 'We Bare Bears Plush', price: '€9,99', imageUrl: img('miniso-plush') },
      { name: 'LED Ambient Night Light', price: '€7,99', imageUrl: img('miniso-light') },
      { name: 'Premium Stationery Set', price: '€5,99', imageUrl: img('miniso-stationery') },
      { name: 'Travel Organizer Bag', price: '€12,99', imageUrl: img('miniso-organizer') },
      { name: 'Adjustable Phone Stand', price: '€8,99', imageUrl: img('miniso-stand') },
      { name: 'Soy Wax Scented Candle', price: '€11,99', imageUrl: img('miniso-candle') },
    ],
  },
]

export function getAdjacentStores(index: number) {
  const total = stores.length
  const mod = (n: number) => ((n % total) + total) % total
  return {
    prev2: stores[mod(index - 2)],
    prev1: stores[mod(index - 1)],
    next1: stores[mod(index + 1)],
    next2: stores[mod(index + 2)],
  }
}

export function cycleDir(from: number, to: number): 'next' | 'prev' {
  const total = stores.length
  const diff = ((to - from) + total) % total
  return diff <= Math.floor(total / 2) ? 'next' : 'prev'
}
