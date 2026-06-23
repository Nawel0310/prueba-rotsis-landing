import Image from 'next/image'

export default function ProductCard({
  name,
  brandLine,
  price,
  imageUrl,
  aspect = 'portrait',
  theme = 'dark',
  className = '',
  onClick,
}: {
  name: string
  brandLine?: string
  price: string
  imageUrl: string
  aspect?: 'portrait' | 'square'
  theme?: 'dark' | 'light'
  className?: string
  onClick?: () => void
}) {
  const isLight = theme === 'light'

  return (
    <div
      onClick={onClick}
      className={`product-card-base group relative backdrop-blur-sm rounded-md overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 ${
        isLight
          ? 'bg-white/80 border border-black/10 hover:bg-white hover:border-black/25 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]'
          : 'bg-black/45 border border-white/15 hover:bg-black/60 hover:border-white/50'
      } ${className}`}
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
          <p
            className={`font-sans text-[10px] tracking-[0.25em] uppercase mb-1.5 ${
              isLight ? 'text-black/45' : 'text-white/45'
            }`}
          >
            {brandLine}
          </p>
        )}
        <p
          className={`text-[15px] leading-snug tracking-[0.01em] line-clamp-2 min-h-[2.6em] font-sans ${
            isLight ? 'text-black/80' : 'text-white/90'
          }`}
        >
          {name}
        </p>
        <p
          className={`font-sans font-semibold text-base tracking-[0.03em] mt-2 leading-none ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {price}
        </p>
      </div>
    </div>
  )
}
