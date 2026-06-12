const basePath = "/prueba-rotsis-landing";

export default function videoLoader(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${basePath}${src}`;
}
