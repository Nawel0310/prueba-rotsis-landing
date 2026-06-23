import Image from 'next/image'

export default function ProductCard({
  name,
  brandLine,
  price,
  imageUrl,
  aspect = 'portrait',
  className = '',
}: {
  name: string
  brandLine?: string
  price: string
  imageUrl: string
  aspect?: 'portrait' | 'square'
  className?: string
}) {
  return (
    <div
      className={`product-card-base group relative bg-black/45 backdrop-blur-sm border border-white/15 rounded-md overflow-hidden cursor-pointer hover:bg-black/60 hover:border-white/50 transition-all duration-500 ease-out hover:-translate-y-1 ${className}`}
    >
      <div className={`relative w-full ${aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[5/4]'} overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="product-card-img object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 45vw, (max-width: 1280px) 22vw, 220px"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
      </div>
      <div className="px-4 pt-3 pb-4">
        {brandLine && (
          <p className="font-sans text-[10px] tracking-[0.25em] text-white/45 uppercase mb-1.5">
            {brandLine}
          </p>
        )}
        <p className="text-white/90 text-[15px] leading-snug tracking-[0.01em] line-clamp-2 min-h-[2.6em] font-sans">
          {name}
        </p>
        <p className="font-sans font-semibold text-white text-base tracking-[0.03em] mt-2 leading-none">
          {price}
        </p>
      </div>
    </div>
  )
}
