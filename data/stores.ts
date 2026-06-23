export interface Product {
  name: string
  price: string
  imageUrl: string
  description?: string
}

export interface Store {
  id: string
  name: string
  logoPath: string
  description?: string
  products: Product[]
}

function u(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&q=80`
}

export const stores: Store[] = [
  {
    id: 'zara',
    name: 'ZARA',
    logoPath: '/images/iconos/zara_icon.webp',
    description: 'Moda contemporánea con líneas atemporales y materiales de calidad superior.',
    products: [
      // 1594938298603 → 404, replaced with windrunner jacket (fashion outerwear)
      { name: 'Blazer Structured', price: '$79,99', imageUrl: u('1476480862126-209bfaa8edc8'), description: 'Corte sastre con hombros marcados y forro interior en satén.' },
      { name: 'Linen Mini Dress', price: '$49,99', imageUrl: u('1539008835657-9e8e9680c956'), description: 'Lino europeo de peso ligero, ideal para entornos cálidos.' },
      // 1495105787522 → 404, replaced with fitted fashion bottom
      { name: 'Wide Leg Trousers', price: '$39,99', imageUrl: u('1515886657613-9f3515b0c78f'), description: 'Caída fluida con pinzas frontales y cintura alta ajustable.' },
      { name: 'Oversized Shirt', price: '$29,99', imageUrl: u('1484981138541-3d074aa97716'), description: 'Algodón popelín con silueta relajada y botonadura en nácar.' },
      { name: 'Knit Cardigan', price: '$59,99', imageUrl: u('1576566588028-4147f3842f27') },
      // 1548036161 → 404, replaced with organizer bag
      { name: 'Leather Tote Bag', price: '$89,99', imageUrl: u('1553062407-98eeb64c6a62') },
      { name: 'Block Heel Mules', price: '$69,99', imageUrl: u('1543163521-1bf539c55dd2') },
      // 1601924357840 → 404, replaced with clean white fashion item
      { name: 'Silk Scarf', price: '$19,99', imageUrl: u('1521572163474-6864f9cf17ab') },
    ],
  },
  {
    id: 'hm',
    name: 'H&M',
    logoPath: '/images/iconos/h&m_icon.png',
    products: [
      { name: 'Cotton T-Shirt', price: '$12,99', imageUrl: u('1521572163474-6864f9cf17ab') },
      // 1542621334 → 404, replaced with casual pants (track pants)
      { name: 'Slim Fit Jeans', price: '$34,99', imageUrl: u('1586363104862-3a5e2ab60d99') },
      { name: 'Floral Midi Dress', price: '$24,99', imageUrl: u('1555529669-e69e7aa0ba9a') },
      { name: 'Puffer Jacket', price: '$49,99', imageUrl: u('1591047139829-d91aecb6caea') },
      // 1605812830455 → 404, replaced with heels/shoes
      { name: 'Chelsea Boots', price: '$39,99', imageUrl: u('1543163521-1bf539c55dd2') },
      // 1544816155 → 404, replaced with bag/organizer
      { name: 'Canvas Tote Bag', price: '$14,99', imageUrl: u('1553062407-98eeb64c6a62') },
      // 1556821840 → 404, replaced with knit texture
      { name: 'Ribbed Sweater', price: '$27,99', imageUrl: u('1576566588028-4147f3842f27') },
      { name: 'Pleated Mini Skirt', price: '$19,99', imageUrl: u('1515886657613-9f3515b0c78f') },
    ],
  },
  {
    id: 'nike',
    name: 'NIKE',
    logoPath: '/images/iconos/nike_icon.png',
    description: 'Innovación deportiva de alto rendimiento para atletas y estilo de vida activo.',
    products: [
      { name: 'Air Max 270', price: '$149,99', imageUrl: u('1542291026-7eec264c27ff'), description: 'Unidad Air de gran volumen para máxima absorción de impacto.' },
      { name: 'Dri-FIT Training Tee', price: '$34,99', imageUrl: u('1552902865-b72c031ac5ea'), description: 'Tejido de secado rápido con paneles de ventilación estratégicos.' },
      // 1556821840 → 404, replaced with jacket outerwear
      { name: 'Tech Fleece Hoodie', price: '$119,99', imageUrl: u('1591047139829-d91aecb6caea'), description: 'Aislamiento térmico sin volumen, tejido de doble capa.' },
      // 1530095254262 → 404, replaced with Stan Smith (athletic)
      { name: 'Tempo Shorts', price: '$44,99', imageUrl: u('1526947425960-945c6e72858f'), description: 'Malla interior con bolsillo trasero con cierre de seguridad.' },
      // 1600185365483 → 404, replaced with colorful running shoes
      { name: 'React Infinity Run', price: '$139,99', imageUrl: u('1560769629-975ec94e6a86') },
      // 1541534741688 → 404, replaced with fitted clothing
      { name: 'Pro Mid-Rise Leggings', price: '$54,99', imageUrl: u('1515886657613-9f3515b0c78f') },
      { name: 'Air Force 1 Low', price: '$109,99', imageUrl: u('1491553895911-0055eca6402d') },
      { name: 'Windrunner Jacket', price: '$99,99', imageUrl: u('1476480862126-209bfaa8edc8') },
    ],
  },
  {
    id: 'adidas',
    name: 'ADIDAS',
    logoPath: '/images/iconos/adidas_icon.png',
    description: 'Diseño deportivo icónico que fusiona herencia de marca y tecnología de punta.',
    products: [
      // 1606890737304 → 404, replaced with white athletic shoe
      { name: 'Ultraboost 23', price: '$179,99', imageUrl: u('1526947425960-945c6e72858f'), description: 'Entresuela Boost con retorno de energía en cada pisada.' },
      { name: 'Tiro 23 Track Pants', price: '$44,99', imageUrl: u('1586363104862-3a5e2ab60d99'), description: 'Corte ajustado con cierres en tobillo, tejido elástico.' },
      { name: 'Essentials Hoodie', price: '$54,99', imageUrl: u('1576566588028-4147f3842f27'), description: 'Algodón perchado con capucha forrada y bolsillo canguro.' },
      { name: 'Stan Smith', price: '$99,99', imageUrl: u('1491553895911-0055eca6402d'), description: 'Diseño icónico en cuero, suela de goma vulcanizada.' },
      { name: 'Originals Trefoil Tee', price: '$34,99', imageUrl: u('1552902865-b72c031ac5ea') },
      { name: 'Adilette Slides', price: '$29,99', imageUrl: u('1560769629-975ec94e6a86') },
      // 1600185365483 → 404, replaced with Nike Air Max (athletic shoe)
      { name: 'Supernova 3', price: '$119,99', imageUrl: u('1542291026-7eec264c27ff') },
      // 1548036161 → 404, replaced with organizer bag
      { name: 'Linear Duffel Bag', price: '$39,99', imageUrl: u('1553062407-98eeb64c6a62') },
    ],
  },
  {
    id: 'apple',
    name: 'APPLE STORE',
    logoPath: '/images/iconos/apple_store_icon.png',
    description: 'Tecnología de precisión con diseño minimalista y experiencia premium.',
    products: [
      // 1556742111 → 404, replaced with iPad (tablet = phone-like device)
      { name: 'iPhone 16 Pro Max', price: '$1.229,00', imageUrl: u('1544244015-0df4b3ffc6b0'), description: 'Chasis de titanio grado aeroespacial, sistema de cámaras Pro.' },
      { name: 'MacBook Air M3 13"', price: '$1.299,00', imageUrl: u('1517336714731-489689fd1ca8'), description: 'Chip M3, pantalla Liquid Retina, hasta 18 horas de batería.' },
      // 1572286258217 → 404, replaced with HomePod/smart speaker (audio)
      { name: 'AirPods Pro 2', price: '$279,00', imageUrl: u('1519558260268-cde7e03a0152'), description: 'Cancelación activa de ruido adaptativa y audio espacial personalizado.' },
      // 1559033144 → 404, replaced with charging cable (accessories)
      { name: 'Apple Watch Series 10', price: '$449,00', imageUrl: u('1512499617640-c74ae3a79d37'), description: 'Pantalla más grande hasta la fecha, sensor de profundidad de agua.' },
      { name: 'iPad Air M2 11"', price: '$699,00', imageUrl: u('1544244015-0df4b3ffc6b0') },
      { name: 'MagSafe Charger 25W', price: '$49,00', imageUrl: u('1512499617640-c74ae3a79d37') },
      // 1593640408182 → 404, replaced with MacBook (clean tech)
      { name: 'Apple TV 4K', price: '$149,00', imageUrl: u('1517336714731-489689fd1ca8') },
      { name: 'HomePod Mini', price: '$99,00', imageUrl: u('1519558260268-cde7e03a0152') },
    ],
  },
  {
    id: 'sephora',
    name: 'SEPHORA',
    logoPath: '/images/iconos/sepora_icon.jpg',
    description: 'Belleza de lujo curada de las casas más exclusivas del mundo.',
    products: [
      { name: 'Charlotte Tilbury Foundation', price: '$39,99', imageUrl: u('1596462502278-27bfdc403348'), description: 'Cobertura media buildable con acabado luminoso natural.' },
      // 1616683693104 → 404, replaced with beauty flat lay
      { name: 'YSL Rouge Pur Couture', price: '$42,00', imageUrl: u('1522335789203-aabd1fc54bc9'), description: 'Fórmula cremosa de alta pigmentación con acabado satinado.' },
      { name: 'Fenty Beauty Pro Kit', price: '$54,99', imageUrl: u('1556228578-8c89e6adf883'), description: 'Set profesional con 12 tonos universales de alta cobertura.' },
      // 1541643600914 → 404, replaced with skincare cream jar
      { name: 'Dior Sauvage EDP', price: '$109,99', imageUrl: u('1556228720-195a672e8a03'), description: 'Notas amaderadas y especiadas, fijación de larga duración.' },
      { name: 'Drunk Elephant C-Firma', price: '$79,00', imageUrl: u('1556228578-8c89e6adf883') },
      // 1512496522153 → 404, replaced with makeup palette
      { name: 'NARS Blush Orgasm', price: '$34,99', imageUrl: u('1596462502278-27bfdc403348') },
      // 1631729371192 → 404, replaced with beauty flat lay
      { name: 'Too Faced Mascara', price: '$27,00', imageUrl: u('1522335789203-aabd1fc54bc9') },
      { name: 'La Mer Moisturizing Cream', price: '$89,99', imageUrl: u('1556228720-195a672e8a03') },
    ],
  },
  {
    id: 'miniso',
    name: 'MINISO',
    logoPath: '/images/iconos/miniso_icon.webp',
    products: [
      // 1608571423939 → 404, replaced with smart speaker (device shape similar to diffuser)
      { name: 'Aromatherapy Diffuser', price: '$14,99', imageUrl: u('1519558260268-cde7e03a0152') },
      // 1572286258217 → 404, replaced with tech cable/small device
      { name: 'True Wireless Earbuds', price: '$19,99', imageUrl: u('1512499617640-c74ae3a79d37') },
      { name: 'We Bare Bears Plush', price: '$9,99', imageUrl: u('1558618666-fcd25c85cd64') },
      { name: 'LED Ambient Night Light', price: '$7,99', imageUrl: u('1544244015-0df4b3ffc6b0') },
      { name: 'Premium Stationery Set', price: '$5,99', imageUrl: u('1455390582262-044cdead277a') },
      { name: 'Travel Organizer Bag', price: '$12,99', imageUrl: u('1553062407-98eeb64c6a62') },
      // 1616348436168 → 404, replaced with MacBook/tech on desk
      { name: 'Adjustable Phone Stand', price: '$8,99', imageUrl: u('1517336714731-489689fd1ca8') },
      // 1601924357840 → 404, replaced with cream jar (small round vessel like candle)
      { name: 'Soy Wax Scented Candle', price: '$11,99', imageUrl: u('1556228720-195a672e8a03') },
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

export const featuredStoreIds = ['zara', 'nike', 'adidas', 'apple', 'sephora']

export function getFeaturedStores() {
  return featuredStoreIds
    .map((id) => stores.find((s) => s.id === id))
    .filter((s): s is Store => Boolean(s))
}

export function cycleDir(from: number, to: number): 'next' | 'prev' {
  const total = stores.length
  const diff = ((to - from) + total) % total
  return diff <= Math.floor(total / 2) ? 'next' : 'prev'
}
