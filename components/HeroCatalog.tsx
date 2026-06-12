'use client'

import { useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { stores, getAdjacentStores, cycleDir, type Store } from '@/data/stores'

// ─── Side logo panel ─────────────────────────────────────────────────────────
function SideLogoPanel({
  store,
  perspStyle,
  onClick,
}: {
  store: Store
  perspStyle: React.CSSProperties
  onClick: () => void
}) {
  return (
    <div
      style={perspStyle}
      className="side-logo-panel flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-full bg-white/95 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-white/15 flex items-center justify-center p-5 transition-all duration-300 hover:border-white/50">
        <Image
          src={store.logoPath}
          alt={store.name}
          width={90}
          height={90}
          className="object-contain max-w-[76px] max-h-[76px] w-full h-full"
        />
      </div>
    </div>
  )
}

// ─── Main hero ───────────────────────────────────────────────────────────────
export default function HeroCatalog() {
  const outerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  const activeTlRef = useRef<gsap.core.Timeline | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const store = stores[currentIndex]
  const { prev2, prev1, next1, next2 } = getAdjacentStores(currentIndex)

  // ── Core transition ────────────────────────────────────────────────────────
  const transitionToStore = useCallback((newIndex: number, dir: 'next' | 'prev') => {
    const hero = heroRef.current
    if (!hero) return

    // Kill any running animation so new store is always reachable
    activeTlRef.current?.kill()

    const q = (cls: string) => hero.querySelectorAll<HTMLElement>(`.${cls}`)
    const tl = gsap.timeline()
    activeTlRef.current = tl

    // Exit — fast fade+slide out
    tl
      .to(q('store-name-char'), {
        opacity: 0,
        y: dir === 'next' ? 18 : -18,
        stagger: { each: 0.018, from: dir === 'next' ? 'start' : 'end' },
        duration: 0.22,
        ease: 'power2.in',
      })
      .to(q('store-logo-img'), {
        opacity: 0, scale: 0.82, duration: 0.2, ease: 'power2.in',
      }, '<0.04')
      .to(q('product-card'), {
        opacity: 0,
        y: dir === 'next' ? -18 : 18,
        scale: 0.96,
        stagger: { each: 0.022, from: dir === 'next' ? 'end' : 'start' },
        duration: 0.18,
        ease: 'power2.in',
      }, '<0.04')
      .to(q('side-logo-panel'), { opacity: 0, duration: 0.15 }, '<')

      // Swap state synchronously mid-timeline
      .call(() => {
        flushSync(() => setCurrentIndex(newIndex))
      })

      // Enter — cinematic reveal
      .fromTo(q('store-logo-img'),
        { opacity: 0, scale: 0.82, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '+=0'
      )
      .fromTo(q('store-name-char'),
        { opacity: 0, y: dir === 'next' ? -26 : 26 },
        {
          opacity: 1, y: 0,
          stagger: { each: 0.038, from: dir === 'next' ? 'start' : 'end' },
          duration: 0.36,
          ease: 'back.out(2)',
        },
        '<0.06'
      )
      .fromTo(q('product-card'),
        { opacity: 0, y: 34, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: { each: 0.038, from: dir === 'next' ? 'start' : 'end' },
          duration: 0.42,
          ease: 'power2.out',
        },
        '<0.08'
      )
      .fromTo(q('side-logo-panel'),
        { opacity: 0, x: dir === 'next' ? -14 : 14 },
        {
          opacity: 1, x: 0,
          stagger: 0.06,
          duration: 0.36,
          ease: 'power2.out',
        },
        '<0.06'
      )
  }, [])

  // ── Click navigation ───────────────────────────────────────────────────────
  const goToStore = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndexRef.current) return
    const dir = cycleDir(currentIndexRef.current, targetIndex)
    currentIndexRef.current = targetIndex
    transitionToStore(targetIndex, dir)

    const outer = outerRef.current
    if (!outer) return
    const scrollRange = outer.offsetHeight - window.innerHeight
    const targetScroll = outer.offsetTop + (targetIndex / (stores.length - 1)) * scrollRange
    window.scrollTo({ top: targetScroll })
  }, [transitionToStore])

  // ── ScrollTrigger ──────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!outerRef.current) return

    ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const newIndex = Math.round(self.progress * (stores.length - 1))
        if (newIndex !== currentIndexRef.current) {
          const dir = cycleDir(currentIndexRef.current, newIndex)
          currentIndexRef.current = newIndex
          transitionToStore(newIndex, dir)
        }
      },
    })
  }, { scope: outerRef, dependencies: [transitionToStore] })

  const prevIndex2 = ((currentIndex - 2) + stores.length) % stores.length
  const prevIndex1 = ((currentIndex - 1) + stores.length) % stores.length
  const nextIndex1 = (currentIndex + 1) % stores.length
  const nextIndex2 = (currentIndex + 2) % stores.length

  return (
    <div ref={outerRef} className="h-[700vh]">
      <div ref={heroRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ── Blurred video background ─────────────────────────────────── */}
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
          style={{ filter: 'blur(12px) brightness(0.3)' }}
          src="/images/1.mp4"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

        {/* ── Grid layout ──────────────────────────────────────────────── */}
        <div className="relative z-10 h-full grid grid-cols-[90px_115px_1fr_115px_90px] xl:grid-cols-[110px_140px_1fr_140px_110px] 2xl:grid-cols-[130px_160px_1fr_160px_130px] items-center gap-3 px-4 lg:px-6">

          {/* Left far — prev2 */}
          <div className="h-[44vh] flex items-center justify-center">
            <SideLogoPanel
              store={prev2}
              perspStyle={{
                transform: 'perspective(400px) rotateY(46deg) scaleY(0.68)',
                transformOrigin: 'right center',
                width: '100%', height: '100%',
              }}
              onClick={() => goToStore(prevIndex2)}
            />
          </div>

          {/* Left near — prev1 */}
          <div className="h-[58vh] flex items-center justify-center">
            <SideLogoPanel
              store={prev1}
              perspStyle={{
                transform: 'perspective(400px) rotateY(28deg) scaleY(0.83)',
                transformOrigin: 'right center',
                width: '100%', height: '100%',
              }}
              onClick={() => goToStore(prevIndex1)}
            />
          </div>

          {/* ── Center content ────────────────────────────────────────── */}
          <div className="h-full flex flex-col items-center justify-center gap-4 py-6">

            {/* Logo + store name */}
            <div className="flex items-center gap-4 lg:gap-5">
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] shrink-0">
                <Image
                  src={store.logoPath}
                  alt={store.name}
                  width={52}
                  height={52}
                  className="store-logo-img object-contain w-[46px] h-[46px] lg:w-[52px] lg:h-[52px]"
                  priority
                />
              </div>

              <h1 className="font-cormorant font-light text-white uppercase leading-none tracking-[0.2em] lg:tracking-[0.28em] text-4xl lg:text-5xl xl:text-[3.5rem] whitespace-nowrap">
                {store.name.split('').map((char, i) => (
                  <span key={`${currentIndex}-${i}`} className="store-name-char inline-block">
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Divider */}
            <div className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Products 4×2 */}
            <div className="grid grid-cols-4 gap-2 lg:gap-2.5 w-full max-w-3xl xl:max-w-[860px]">
              {store.products.map((product, i) => (
                <div
                  key={`${currentIndex}-p${i}`}
                  className="product-card group relative bg-black/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md cursor-pointer hover:border-white/30 hover:bg-black/60 transition-colors duration-300"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      sizes="(max-width: 1280px) 18vw, 175px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="text-white/60 text-[10px] lg:text-[11px] leading-tight line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-white font-semibold text-xs lg:text-sm mt-0.5 tracking-wide">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="font-bebas text-lg lg:text-xl xl:text-2xl tracking-[0.4em] px-10 lg:px-14 py-3 lg:py-4 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer">
              ACCEDER A LA TIENDA
            </button>
          </div>

          {/* Right near — next1 */}
          <div className="h-[58vh] flex items-center justify-center">
            <SideLogoPanel
              store={next1}
              perspStyle={{
                transform: 'perspective(400px) rotateY(-28deg) scaleY(0.83)',
                transformOrigin: 'left center',
                width: '100%', height: '100%',
              }}
              onClick={() => goToStore(nextIndex1)}
            />
          </div>

          {/* Right far — next2 */}
          <div className="h-[44vh] flex items-center justify-center">
            <SideLogoPanel
              store={next2}
              perspStyle={{
                transform: 'perspective(400px) rotateY(-46deg) scaleY(0.68)',
                transformOrigin: 'left center',
                width: '100%', height: '100%',
              }}
              onClick={() => goToStore(nextIndex2)}
            />
          </div>
        </div>

        {/* ── Progress dots ────────────────────────────────────────────── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {stores.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToStore(i)}
              aria-label={`Ir a ${s.name}`}
              className={`rounded-full transition-all duration-400 cursor-pointer ${
                i === currentIndex
                  ? 'w-5 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/55'
              }`}
            />
          ))}
        </div>

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
        {currentIndex === 0 && (
          <div className="absolute bottom-14 right-8 z-20 flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
            <span className="text-white text-[9px] font-light tracking-[0.25em] uppercase">scroll</span>
            <div className="w-px h-7 bg-white animate-pulse" />
          </div>
        )}

        {/* ── Watermark ───────────────────────────────────────────────── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none overflow-hidden w-full flex justify-center">
          <p className="font-cormorant font-light text-white/[0.04] tracking-[0.4em] uppercase select-none leading-none whitespace-nowrap text-[12vw]">
            {store.name}
          </p>
        </div>
      </div>
    </div>
  )
}
