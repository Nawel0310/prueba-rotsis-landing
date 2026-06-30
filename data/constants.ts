export const RUBROS = ['Todos', 'Moda', 'Deportes', 'Tecnología', 'Belleza', 'Lifestyle'] as const
export type Rubro = typeof RUBROS[number]

export const BRAND_STORE_ID: Record<string, string> = {
  'ATELIER FORGE': 'atelier-forge',
  'CAVE NOIRE': 'cave-noire',
  'MAISON BRÜHL': 'maison-bruhl',
  'NORDLINE AUDIO': 'nordline-audio',
  'OPTIK WERK': 'optik-werk',
  'VESPER DIGITAL': 'vesper-digital',
  'STUDIO LUMEN': 'studio-lumen',
  'MARBLE & OAK': 'marble-oak',
  'AQUA LUME': 'aqua-lume',
  'PIETRA BAGNO': 'pietra-bagno',
  'MAISON VESTE': 'maison-veste',
  'ATELIER NOIR': 'atelier-noir',
}
