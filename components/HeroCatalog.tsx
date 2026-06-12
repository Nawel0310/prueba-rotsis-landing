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
      <div className="w-full h-full bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-white/20 flex items-center justify-center p-5 transition-all duration-300 hover:shadow-[0_12px_50px_rgba(255,255,255,0.15)]">
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

    activeTlRef.current?.kill()

    const q = (cls: string) => hero.querySelectorAll<HTMLElement>(`.${cls}`)
    const tl = gsap.timeline()
    activeTlRef.current = tl

    // ── EXIT ────────────────────────────────────────────────────────────────
    tl
      // Products: wipe to top with clip-path
      .to(q('product-card'), {
        clipPath: 'inset(0% 0% 100% 0%)',
        stagger: { each: 0.022, from: dir === 'next' ? 'end' : 'start' },
        duration: 0.26,
        ease: 'power3.in',
      })
      // Side logos: shrink + fade simultaneously
      .to(q('side-logo-panel'), {
        scale: 0.88,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
      }, '<')
      // Store name: 3D rotateX flip out
      .to(q('store-name-char'), {
        rotateX: dir === 'next' ? 65 : -65,
        opacity: 0,
        stagger: { each: 0.018, from: dir === 'next' ? 'start' : 'end' },
        duration: 0.22,
        ease: 'power3.in',
        transformPerspective: 900,
      }, '<0.04')
      // Logo: rotate + scale out
      .to(q('store-logo-img'), {
        scale: 0.7,
        opacity: 0,
        rotate: dir === 'next' ? -12 : 12,
        duration: 0.2,
        ease: 'power2.in',
      }, '<0.04')

      // ── STATE SWAP ─────────────────────────────────────────────────────
      .call(() => {
        flushSync(() => setCurrentIndex(newIndex))
      })

      // ── ENTER ──────────────────────────────────────────────────────────
      // Logo: elastic bounce pop-in with counter-rotate
      .fromTo(q('store-logo-img'),
        { scale: 0.55, opacity: 0, rotate: dir === 'next' ? 12 : -12 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.55)' },
        '+=0'
      )
      // Store name: 3D flip characters in
      .fromTo(q('store-name-char'),
        { rotateX: dir === 'next' ? -78 : 78, opacity: 0, transformPerspective: 900 },
        {
          rotateX: 0,
          opacity: 1,
          stagger: { each: 0.042, from: dir === 'next' ? 'start' : 'end' },
          duration: 0.48,
          ease: 'power3.out',
        },
        '<0.1'
      )
      // Products: wipe up from bottom with clip-path
      .fromTo(q('product-card'),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: { each: 0.048, from: dir === 'next' ? 'start' : 'end' },
          duration: 0.52,
          ease: 'power3.out',
        },
        '<0.14'
      )
      // Side logos: scale in from slightly small
      .fromTo(q('side-logo-panel'),
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.075,
          duration: 0.42,
          ease: 'power2.out',
        },
        '<0.1'
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
      <div
        ref={heroRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        {/* ── Background video — reduced blur ─────────────────────────── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.06]"
          style={{ filter: "blur(4px) brightness(0.4)" }}
          src="/images/1.mp4"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45 pointer-events-none" />

        {/* ── Grid layout ──────────────────────────────────────────────── */}
        <div className="relative z-10 h-full grid grid-cols-[90px_115px_1fr_115px_90px] xl:grid-cols-[110px_140px_1fr_140px_110px] 2xl:grid-cols-[130px_160px_1fr_160px_130px] items-center gap-3 px-4 lg:px-6">
          {/* Left far — prev2 */}
          <div className="h-[44vh] flex items-center justify-center">
            <SideLogoPanel
              store={prev2}
              perspStyle={{
                transform: "perspective(400px) rotateY(46deg) scaleY(0.68)",
                transformOrigin: "right center",
                width: "100%",
                height: "100%",
              }}
              onClick={() => goToStore(prevIndex2)}
            />
          </div>

          {/* Left near — prev1 */}
          <div className="h-[58vh] flex items-center justify-center">
            <SideLogoPanel
              store={prev1}
              perspStyle={{
                transform: "perspective(400px) rotateY(28deg) scaleY(0.83)",
                transformOrigin: "right center",
                width: "100%",
                height: "100%",
              }}
              onClick={() => goToStore(prevIndex1)}
            />
          </div>

          {/* ── Center content ────────────────────────────────────────── */}
          <div className="h-full flex flex-col items-center justify-center gap-4 py-6">
            {/* Logo + store name — perspective wrapper for 3D char flip */}
            <div className="flex items-center gap-4 lg:gap-5">
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.18)] shrink-0">
                <Image
                  src={store.logoPath}
                  alt={store.name}
                  width={52}
                  height={52}
                  className="store-logo-img object-contain w-[46px] h-[46px] lg:w-[52px] lg:h-[52px]"
                  priority
                />
              </div>

              {/* perspective on this div enables 3D rotateX on children */}
              <div style={{ perspective: "900px" }}>
                <h1 className="font-cormorant font-light text-white uppercase leading-none tracking-[0.2em] lg:tracking-[0.28em] text-4xl lg:text-5xl xl:text-[3.5rem] whitespace-nowrap">
                  {store.name.split("").map((char, i) => (
                    <span
                      key={`${currentIndex}-${i}`}
                      className="store-name-char inline-block"
                      style={{ display: "inline-block" }}
                    >
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Products 4×2 — white cards */}
            <div className="grid grid-cols-4 gap-2 lg:gap-3 w-full max-w-3xl xl:max-w-[880px]">
              {store.products.map((product, i) => (
                <div
                  key={`${currentIndex}-p${i}`}
                  className="product-card group relative bg-white/10 backdrop-blur-md border border-white/70 rounded-xl overflow-hidden cursor-pointer hover:bg-white/15 hover:border-white hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
                  style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-[1.07] transition-transform duration-500"
                      sizes="(max-width: 1280px) 18vw, 180px"
                    />
                  </div>
                  {/* Glass info area */}
                  <div className="px-4 py-4">
                    <div className="px-2">
                      <p className="text-white/75 text-sm font-semibold line-clamp-2">
                        {product.name}
                      </p>

                      <p className="text-white text-xl mt-1">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — generous padding */}
            <button className="font-bebas text-lg lg:text-xl xl:text-2xl tracking-[0.5em] px-16 lg:px-24 py-4 lg:py-5 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer">
              ACCEDER A LA TIENDA
            </button>
          </div>

          {/* Right near — next1 */}
          <div className="h-[58vh] flex items-center justify-center">
            <SideLogoPanel
              store={next1}
              perspStyle={{
                transform: "perspective(400px) rotateY(-28deg) scaleY(0.83)",
                transformOrigin: "left center",
                width: "100%",
                height: "100%",
              }}
              onClick={() => goToStore(nextIndex1)}
            />
          </div>

          {/* Right far — next2 */}
          <div className="h-[44vh] flex items-center justify-center">
            <SideLogoPanel
              store={next2}
              perspStyle={{
                transform: "perspective(400px) rotateY(-46deg) scaleY(0.68)",
                transformOrigin: "left center",
                width: "100%",
                height: "100%",
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
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/55"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
        {currentIndex === 0 && (
          <div className="absolute bottom-14 right-8 z-20 flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
            <span className="text-white text-[9px] font-light tracking-[0.25em] uppercase">
              scroll
            </span>
            <div className="w-px h-7 bg-white animate-pulse" />
          </div>
        )}

        {/* ── Watermark ───────────────────────────────────────────────── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none overflow-hidden w-full flex justify-center">
          <p className="font-cormorant font-light text-white/[0.05] tracking-[0.4em] uppercase select-none leading-none whitespace-nowrap text-[12vw]">
            {store.name}
          </p>
        </div>
      </div>
    </div>
  );
}
