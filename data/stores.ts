export interface Product {
  slug: string
  name: string
  price: string
  imageUrl: string
  images: string[]
  description?: string
}

export interface Store {
  id: string
  name: string
  logoPath: string
  category: string
  description?: string
  products: Product[]
}

type RawProduct = Omit<Product, 'slug' | 'images'>
interface RawStore extends Omit<Store, 'products'> {
  products: RawProduct[]
}

export const STORE_CATEGORIES: Record<string, string> = {
  zara: 'Moda',
  hm: 'Moda',
  nike: 'Deportes',
  adidas: 'Deportes',
  apple: 'Tecnología',
  sephora: 'Belleza',
  miniso: 'Lifestyle',
  'atelier-forge': 'Electrodomésticos',
  'cave-noire': 'Electrodomésticos',
  'maison-bruhl': 'Electrodomésticos',
  'nordline-audio': 'Tecnología',
  'optik-werk': 'Tecnología',
  'vesper-digital': 'Tecnología',
  'studio-lumen': 'Muebles',
  'marble-oak': 'Muebles',
  'aqua-lume': 'Baño',
  'pietra-bagno': 'Baño',
  'maison-veste': 'Ropa',
  'atelier-noir': 'Ropa',
}

function u(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&q=80`
}

function uLarge(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`
}

const rawStores: RawStore[] = [
  {
    id: 'zara',
    name: 'ZARA',
    logoPath: '/images/iconos/zara_icon.webp',
    category: 'Moda',
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
    category: 'Moda',
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
    category: 'Deportes',
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
    category: 'Deportes',
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
    category: 'Tecnología',
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
    category: 'Belleza',
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
    category: 'Lifestyle',
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
  // ─── Editorial brand stores (Category section products) ───────────────────
  {
    id: 'atelier-forge',
    name: 'ATELIER FORGE',
    logoPath: uLarge('1556911220-bff31c812dba'),
    category: 'Electrodomésticos',
    description: 'Electrodomésticos de alto diseño que combinan precisión artesanal con tecnología de vanguardia.',
    products: [
      { name: 'Induction Range Élite 90', price: '$8.450,00', imageUrl: uLarge('1556911220-bff31c812dba'), description: 'Cocina de inducción de 90 cm con 5 zonas, pantalla táctil integrada y control de potencia milimétrico.' },
      { name: 'French Door Refrigerator Pro', price: '$9.900,00', imageUrl: uLarge('1565183997392-2f6f122e5912'), description: 'Refrigerador french door con gestión de temperatura por zonas y acabado acero inoxidable mate.' },
      { name: 'Sculpted Range Hood Vertex', price: '$2.890,00', imageUrl: uLarge('1556911220-bff31c812dba'), description: 'Campana extractora de diseño escultórico, silenciosa y potente, con iluminación LED circadiana.' },
    ],
  },
  {
    id: 'cave-noire',
    name: 'CAVE NOIRE',
    logoPath: uLarge('1556909190-eccf4a8bf97a'),
    category: 'Electrodomésticos',
    description: 'Soluciones de almacenamiento de vinos de precisión para coleccionistas exigentes.',
    products: [
      { name: 'Built-In Wine Cellar 180', price: '$6.200,00', imageUrl: uLarge('1556909190-eccf4a8bf97a'), description: 'Cava integrada para 180 botellas con zonas de temperatura dual y control de humedad automático.' },
    ],
  },
  {
    id: 'maison-bruhl',
    name: 'MAISON BRÜHL',
    logoPath: uLarge('1556909114-f6e7ad7d3136'),
    category: 'Electrodomésticos',
    description: 'Equipamiento de cocina de autor: café de especialidad y cocción al vapor de precisión suiza.',
    products: [
      { name: 'Integrated Coffee System', price: '$3.180,00', imageUrl: uLarge('1556909114-f6e7ad7d3136'), description: 'Sistema integrado de café con molinillo cerámico, extracción por presión y calentador de tazas.' },
      { name: 'Steam Combination Oven', price: '$4.750,00', imageUrl: uLarge('1556909172-54557c7e4fb7'), description: 'Horno combinado de vapor con 12 modos de cocción y sonda de temperatura con precisión de 0,5°C.' },
    ],
  },
  {
    id: 'nordline-audio',
    name: 'NORDLINE AUDIO',
    logoPath: uLarge('1505740420928-5e560c06d30e'),
    category: 'Tecnología',
    description: 'Audiología de referencia escandinava: auriculares de alta fidelidad para los más exigentes.',
    products: [
      { name: 'Studio Reference Headphones', price: '$1.450,00', imageUrl: uLarge('1505740420928-5e560c06d30e'), description: 'Auriculares abiertos de referencia con controlador planar-magnético de 50 mm y carcasa de aluminio mecanizado.' },
      { name: 'Heritage Leather Headphones', price: '$1.680,00', imageUrl: uLarge('1484704849700-f032a568e944'), description: 'Edición Heritage con almohadillas de cuero nappa, cable trenzado desmontable y estuche de nogal.' },
      { name: 'Noise-Isolating Headphones', price: '$1.290,00', imageUrl: uLarge('1546435770-a3e426bf472b'), description: 'ANC híbrida de tres etapas con ecualizador adaptativo y batería de 40 horas con carga rápida.' },
    ],
  },
  {
    id: 'optik-werk',
    name: 'OPTIK WERK',
    logoPath: uLarge('1502920917128-1aa500764cbd'),
    category: 'Tecnología',
    description: 'Óptica y sistemas de imagen de precisión alemana para fotografía y video profesional.',
    products: [
      { name: 'Full-Frame Mirrorless Body', price: '$6.900,00', imageUrl: uLarge('1502920917128-1aa500764cbd'), description: 'Cuerpo mirrorless full-frame de 60 MP con estabilización en sensor de 8 stops y dual CFexpress.' },
      { name: 'Titanium Processing Core', price: '$3.250,00', imageUrl: uLarge('1518770660439-4636190af475'), description: 'Procesador de imagen dedicado en carcasa de titanio para calibración de color y procesamiento RAW.' },
    ],
  },
  {
    id: 'vesper-digital',
    name: 'VESPER DIGITAL',
    logoPath: uLarge('1542751110-97427bbecf20'),
    category: 'Tecnología',
    description: 'Dispositivos digitales de diseño editorial para creativos y profesionales premium.',
    products: [
      { name: 'Reference Tablet Pro 14"', price: '$2.340,00', imageUrl: uLarge('1542751110-97427bbecf20'), description: 'Tablet de 14" con panel OLED 120 Hz, lápiz de presión 8192 niveles y superficie antirreflejo Gorilla Glass.' },
    ],
  },
  {
    id: 'studio-lumen',
    name: 'STUDIO LUMEN',
    logoPath: uLarge('1555041469-a586c61ea9bc'),
    category: 'Muebles',
    description: 'Diseño de interiores contemporáneo: sofás y sillones esculturales de producción limitada.',
    products: [
      { name: 'Velvet Cantilever Sofa', price: '$7.200,00', imageUrl: uLarge('1555041469-a586c61ea9bc'), description: 'Sofá en voladizo tapizado en terciopelo belga con estructura de acero lacado y patas de latón.' },
      { name: 'Sculpted Lounge Chair', price: '$4.850,00', imageUrl: uLarge('1586023492125-27b2c045efd7'), description: 'Sillón lounge de diseño escultórico con asiento de espuma de alta densidad y armazón de madera maciza.' },
      { name: 'Curved Two-Seat Sofa', price: '$6.400,00', imageUrl: uLarge('1567016432779-094069958ea5'), description: 'Sofá de dos plazas con curva continua, disponible en lino natural o boucle premium.' },
    ],
  },
  {
    id: 'marble-oak',
    name: 'MARBLE & OAK',
    logoPath: uLarge('1586105251261-72a756497a11'),
    category: 'Muebles',
    description: 'Mobiliario de dormitorio y salón elaborado con mármol travertino y roble macizo.',
    products: [
      { name: 'Upholstered Platform Bed', price: '$5.900,00', imageUrl: uLarge('1586105251261-72a756497a11'), description: 'Cama plataforma con cabecero tapizado en bouclé y base de roble natural con sistema de almacenamiento.' },
      { name: 'Channel-Tufted Sofa', price: '$8.100,00', imageUrl: uLarge('1493663284031-b7e3aefcae8e'), description: 'Sofá channel-tufted de tres plazas tapizado en cuero full-grain con patas en roble blanco.' },
      { name: 'Hand-Carved Accent Chair', price: '$3.600,00', imageUrl: uLarge('1567538096630-e0c55bd6374c'), description: 'Sillón de acento con estructura tallada a mano en nogal americano y tapicería en tela de lino.' },
    ],
  },
  {
    id: 'aqua-lume',
    name: 'AQUA LUME',
    logoPath: uLarge('1584622650111-993a426fbf0a'),
    category: 'Baño',
    description: 'Experiencias de baño de lujo: columnas de ducha, bañeras y espejos de diseño spa.',
    products: [
      { name: 'Rainfall Shower Tower', price: '$4.200,00', imageUrl: uLarge('1584622650111-993a426fbf0a'), description: 'Columna de ducha lluvia con brazo de techo, ducha manual y jets laterales termostáticos.' },
      { name: 'Sculptural Freestanding Tub', price: '$9.500,00', imageUrl: uLarge('1620626011761-996317b8d101'), description: 'Bañera exenta escultórica en acrílico reforzado con calentador integrado y desagüe centrado.' },
      { name: 'Brass Framed Vanity Mirror', price: '$1.850,00', imageUrl: uLarge('1564540583246-934409427776'), description: 'Espejo con marco de latón pulido, retroiluminación LED regulable y función antivaho.' },
    ],
  },
  {
    id: 'pietra-bagno',
    name: 'PIETRA BAGNO',
    logoPath: uLarge('1600566752355-35792bedcfea'),
    category: 'Baño',
    description: 'Griferías y mobiliario de baño en acabado negro mate y piedra natural de Italia.',
    products: [
      { name: 'Matte Black Faucet Set', price: '$1.420,00', imageUrl: uLarge('1600566752355-35792bedcfea'), description: 'Set de grifería monomando en latón con acabado negro mate PVD y cartucho cerámico italiano.' },
      { name: 'Floating Vanity Suite', price: '$6.700,00', imageUrl: uLarge('1604709177225-055f99402ea3'), description: 'Vanity flotante con encimera de mármol Calacatta, cajones con amortiguación y iluminación integrada.' },
      { name: 'Heated Towel Rail System', price: '$980,00', imageUrl: uLarge('1584622650111-993a426fbf0a'), description: 'Toallero eléctrico con control digital de temperatura, programación semanal y acabado negro mate.' },
    ],
  },
  {
    id: 'maison-veste',
    name: 'MAISON VESTE',
    logoPath: uLarge('1490481651871-ab68de25d43d'),
    category: 'Ropa',
    description: 'Alta costura masculina parisina: abrigos de cachemira y trajes a medida de manufactura artesanal.',
    products: [
      { name: 'Cashmere Overcoat', price: '$2.450,00', imageUrl: uLarge('1490481651871-ab68de25d43d'), description: 'Abrigo de cachemira monge de Escocia, corte largo clásico con forro de seda y botones de cuerno.' },
      { name: 'Hand-Finished Tailored Suit', price: '$3.800,00', imageUrl: uLarge('1490114538077-0a7f8cb49891'), description: 'Traje bespoke confeccionado a mano con lana Super 180s italiana y detalles de costura visible.' },
      { name: 'Leather Bomber Jacket', price: '$2.100,00', imageUrl: uLarge('1551488831-00ddcb6c6bd3'), description: 'Bomber en piel de cordero nappa suave, forro de seda estampado y cremallera YKK de alpaca.' },
    ],
  },
  {
    id: 'atelier-noir',
    name: 'ATELIER NOIR',
    logoPath: uLarge('1503341504253-dff4815485f1'),
    category: 'Ropa',
    description: 'Ropa de autor minimalista: tejidos de merino y seda para el guardarropa intemporal.',
    products: [
      { name: 'Merino Crewneck Sweater', price: '$680,00', imageUrl: uLarge('1503341504253-dff4815485f1'), description: 'Jersey cuello redondo en merino extrafino Zegna, lavable a máquina en frío y de secado natural.' },
      { name: 'Belted Wool Trench', price: '$1.950,00', imageUrl: uLarge('1539109136881-3be0616acf4b'), description: 'Gabardina de lana con cinturón desmontable, costuras impermeables y forro termorregulador.' },
      { name: 'Silk Tailored Trousers', price: '$890,00', imageUrl: uLarge('1485968579580-b6d095142e6e'), description: 'Pantalón de seda cruda con pliegues frontales, cintura ajustable y caída fluida de corte palazzo.' },
    ],
  },
]

export function slugify(name: string) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function gallery(primary: string, name: string): string[] {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))
  return [primary, `https://picsum.photos/seed/${seed}-2/600/600`, `https://picsum.photos/seed/${seed}-3/600/600`]
}

export const stores: Store[] = rawStores.map((store) => ({
  ...store,
  products: store.products.map((product) => ({
    ...product,
    slug: slugify(product.name),
    images: gallery(product.imageUrl, product.name),
  })),
}))

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.id === slug)
}

export function getProductBySlug(storeSlug: string, productSlug: string) {
  const store = getStoreBySlug(storeSlug)
  const product = store?.products.find((p) => p.slug === productSlug)
  return store && product ? { store, product } : undefined
}

export function getRelatedProducts(storeSlug: string, productSlug: string, count = 4): Product[] {
  const store = getStoreBySlug(storeSlug)
  if (!store) return []
  return store.products.filter((p) => p.slug !== productSlug).slice(0, count)
}

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

export const heroStoreIds = ['zara', 'hm', 'nike', 'adidas', 'apple', 'sephora', 'miniso']

export const heroStores = stores.filter((s) => heroStoreIds.includes(s.id))

export function getAdjacentHeroStores(index: number) {
  const total = heroStores.length
  const mod = (n: number) => ((n % total) + total) % total
  return {
    prev2: heroStores[mod(index - 2)],
    prev1: heroStores[mod(index - 1)],
    next1: heroStores[mod(index + 1)],
    next2: heroStores[mod(index + 2)],
  }
}

export function cycleDir(from: number, to: number, total = stores.length): 'next' | 'prev' {
  const diff = ((to - from) + total) % total
  return diff <= Math.floor(total / 2) ? 'next' : 'prev'
}
