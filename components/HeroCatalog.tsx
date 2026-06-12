'use client'

import { useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { stores, getAdjacentStores, cycleDir, type Store } from '@/data/stores'

const pad = (n: number) => String(n).padStart(2, '0')

// ─── Side logo panel ─────────────────────────────────────────────────────────
function SideLogoPanel({
  store,
  perspStyle,
  far,
  onClick,
}: {
  store: Store
  perspStyle: React.CSSProperties
  far?: boolean
  onClick: () => void
}) {
  return (
    <div
      style={perspStyle}
      className="side-logo-panel flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-full h-full bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.65)] border border-white/10 flex items-center justify-center p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(0,0,0,0.8)] ${
          far ? 'brightness-[0.78]' : 'brightness-95 hover:brightness-100'
        }`}
      >
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const currentIndexRef = useRef(0)
  const activeTlRef = useRef<gsap.core.Timeline | null>(null)
  const reducedMotionRef = useRef(false)
  const ctaQuickRef = useRef<{
    x: gsap.QuickToFunc
    y: gsap.QuickToFunc
  } | null>(null)
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

    // Reduced motion: plain crossfade, no movement
    if (reducedMotionRef.current) {
      const sel = '.product-card, .side-logo-panel, .store-logo-img, .store-name-char, .store-counter-num, .watermark-text'
      tl.to(hero.querySelectorAll<HTMLElement>(sel), { opacity: 0, duration: 0.2 })
        .call(() => {
          flushSync(() => setCurrentIndex(newIndex))
          tl.fromTo(
            hero.querySelectorAll<HTMLElement>(sel),
            { opacity: 0 },
            { opacity: 1, duration: 0.35 }
          )
        })
      return
    }

    // ── EXIT (old nodes, resolved now) ──────────────────────────────────────
    tl
      .to(q('product-card'), {
        clipPath: 'inset(0% 0% 100% 0%)',
        stagger: { each: 0.035, from: dir === 'next' ? 'end' : 'start' },
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to(q('side-logo-panel'), {
        x: dir === 'next' ? -20 : 20,
        scale: 0.96,
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      }, '<')
      .to(q('store-name-char'), {
        rotateX: dir === 'next' ? 65 : -65,
        y: -12,
        autoAlpha: 0,
        filter: 'blur(6px)',
        stagger: { each: 0.03, from: dir === 'next' ? 'start' : 'end' },
        duration: 0.45,
        ease: 'power2.inOut',
        transformPerspective: 900,
      }, '<0.05')
      .to(q('store-counter-num'), {
        yPercent: -110,
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power3.in',
      }, '<')
      .to(q('store-logo-img'), {
        scale: 0.88,
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 0.4,
        ease: 'power2.inOut',
      }, '<0.05')
      .to(q('watermark-text'), {
        x: dir === 'next' ? -40 : 40,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<')

      // ── STATE SWAP + ENTER ────────────────────────────────────────────────
      // Enter tweens are appended inside the callback so selectors resolve
      // the freshly mounted (keyed) nodes, not the detached pre-swap ones.
      .call(() => {
        flushSync(() => setCurrentIndex(newIndex))

        tl
          .fromTo(q('store-logo-img'),
            { scale: 0.9, autoAlpha: 0, filter: 'blur(8px)' },
            { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(q('store-name-char'),
            {
              rotateX: dir === 'next' ? -78 : 78,
              y: 14,
              autoAlpha: 0,
              filter: 'blur(6px)',
              transformPerspective: 900,
            },
            {
              rotateX: 0,
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              stagger: { each: 0.05, from: dir === 'next' ? 'start' : 'end' },
              duration: 0.9,
              ease: 'power4.out',
            },
            '<0.08'
          )
          .fromTo(q('store-counter-num'),
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
            '<'
          )
          .fromTo(q('product-card'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              stagger: { each: 0.07, from: dir === 'next' ? 'start' : 'end' },
              duration: 1.0,
              ease: 'power4.out',
            },
            '<0.1'
          )
          .fromTo(q('product-img'),
            { scale: 1.18 },
            {
              scale: 1,
              stagger: { each: 0.07, from: dir === 'next' ? 'start' : 'end' },
              duration: 1.4,
              ease: 'power3.out',
            },
            '<'
          )
          .fromTo(q('side-logo-panel'),
            { x: dir === 'next' ? 24 : -24, scale: 0.96, autoAlpha: 0 },
            {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
            },
            '<0.15'
          )
          .fromTo(q('watermark-text'),
            { x: dir === 'next' ? 40 : -40, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out' },
            '<'
          )
      })
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

  // ── ScrollTrigger + intro + micro-interactions ─────────────────────────────
  useGSAP(() => {
    const outer = outerRef.current
    const hero = heroRef.current
    if (!outer || !hero) return

    ScrollTrigger.create({
      trigger: outer,
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

    const q = (sel: string) => hero.querySelectorAll<HTMLElement>(sel)
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      reducedMotionRef.current = true
      gsap.set(q('.intro-veil'), { autoAlpha: 0 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      reducedMotionRef.current = false

      // Background depth: slow vertical drift while the hero is pinned
      gsap.fromTo(videoRef.current,
        { yPercent: -3, scale: 1.12 },
        {
          yPercent: 3,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )

      // ── Orchestrated intro ────────────────────────────────────────────────
      const panels = gsap.utils.toArray<HTMLElement>(q('.side-logo-panel'))
      gsap.set(q('.store-logo-img'), { scale: 0.92, autoAlpha: 0, filter: 'blur(8px)' })
      gsap.set(q('.store-name-char'), { y: 28, autoAlpha: 0, filter: 'blur(6px)' })
      gsap.set(q('.hero-divider'), { scaleX: 0 })
      gsap.set(q('.product-card'), { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(q('.product-img'), { scale: 1.18 })
      gsap.set(panels, { x: (i) => (i < 2 ? -40 : 40), autoAlpha: 0 })
      gsap.set(q('.hero-fade-in'), { y: 12, autoAlpha: 0 })

      const intro = gsap.timeline()
      intro
        .to(q('.intro-veil'), { autoAlpha: 0, duration: 1.1, ease: 'power2.inOut' })
        .to(q('.store-logo-img'), {
          scale: 1, autoAlpha: 1, filter: 'blur(0px)',
          duration: 1.0, ease: 'power3.out',
        }, '-=0.55')
        .to(q('.store-name-char'), {
          y: 0, autoAlpha: 1, filter: 'blur(0px)',
          stagger: 0.045, duration: 1.0, ease: 'power4.out',
        }, '<0.1')
        .to(q('.hero-divider'), { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '<0.2')
        .to(q('.product-card'), {
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: 0.08, duration: 1.0, ease: 'power4.out',
        }, '<0.15')
        .to(q('.product-img'), {
          scale: 1, stagger: 0.08, duration: 1.4, ease: 'power3.out',
        }, '<')
        .to(panels, {
          x: 0, autoAlpha: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        }, '<0.2')
        .to(q('.hero-fade-in'), {
          y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        }, '<0.3')

      return () => {
        intro.kill()
      }
    })

    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      // Mouse parallax: center drifts with the cursor, background drifts
      // against it for depth
      const centerX = gsap.quickTo(centerRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
      const centerY = gsap.quickTo(centerRef.current, 'y', { duration: 1.2, ease: 'power3.out' })
      const videoX = gsap.quickTo(videoRef.current, 'x', { duration: 1.6, ease: 'power3.out' })
      const videoY = gsap.quickTo(videoRef.current, 'y', { duration: 1.6, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        centerX(nx * 14)
        centerY(ny * 10)
        videoX(nx * -22)
        videoY(ny * -14)
      }
      hero.addEventListener('mousemove', onMove)

      // Magnetic CTA
      ctaQuickRef.current = {
        x: gsap.quickTo(ctaRef.current, 'x', { duration: 0.4, ease: 'power3.out' }),
        y: gsap.quickTo(ctaRef.current, 'y', { duration: 0.4, ease: 'power3.out' }),
      }

      return () => {
        hero.removeEventListener('mousemove', onMove)
        ctaQuickRef.current = null
      }
    })
  }, { scope: outerRef, dependencies: [transitionToStore] })

  const onCtaMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const quick = ctaQuickRef.current
    const cta = ctaRef.current
    if (!quick || !cta) return
    const { left, top, width, height } = cta.getBoundingClientRect()
    quick.x((e.clientX - left - width / 2) * 0.25)
    quick.y((e.clientY - top - height / 2) * 0.25)
  }, [])

  const onCtaLeave = useCallback(() => {
    if (!ctaQuickRef.current || !ctaRef.current) return
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' })
  }, [])

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
        {/* ── Background video ─────────────────────────────────────────── */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.12]"
          style={{ filter: "blur(4px) brightness(0.38)" }}
          src="/images/1.mp4"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

        {/* ── Editorial counter ────────────────────────────────────────── */}
        <div className="hero-fade-in absolute top-8 left-8 lg:left-10 z-20 flex items-baseline gap-2 font-sans text-[10px] tracking-[0.3em] pointer-events-none select-none">
          <span className="inline-flex overflow-hidden">
            <span
              key={`counter-${currentIndex}`}
              className="store-counter-num inline-block text-white/85"
            >
              {pad(currentIndex + 1)}
            </span>
          </span>
          <span className="text-white/30">—</span>
          <span className="text-white/30">{pad(stores.length)}</span>
        </div>

        {/* ── Grid layout ──────────────────────────────────────────────── */}
        <div className="relative z-10 h-full grid grid-cols-[90px_115px_1fr_115px_90px] xl:grid-cols-[110px_140px_1fr_140px_110px] 2xl:grid-cols-[130px_160px_1fr_160px_130px] items-center gap-3 px-4 lg:px-6">
          {/* Left far — prev2 */}
          <div className="h-[44vh] flex items-center justify-center">
            <SideLogoPanel
              store={prev2}
              far
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
          <div
            ref={centerRef}
            className="h-full flex flex-col items-center justify-center gap-5 py-6"
          >
            {/* Logo + store name — perspective wrapper for 3D char flip */}
            <div className="flex items-center gap-4 lg:gap-5">
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] bg-white rounded-lg flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.12)] shrink-0">
                <Image
                  src={store.logoPath}
                  alt={store.name}
                  width={52}
                  height={52}
                  className="store-logo-img object-contain w-[46px] h-[46px] lg:w-[52px] lg:h-[52px]"
                  preload
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

            {/* Divider — couture detail */}
            <div className="hero-divider w-full max-w-3xl flex items-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
              <div className="mx-3 w-1 h-1 rotate-45 bg-white/60 shrink-0" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
            </div>

            {/* Products 4×2 */}
            <div className="grid grid-cols-4 gap-2 lg:gap-3 w-full max-w-3xl xl:max-w-[880px]">
              {store.products.map((product, i) => (
                <div
                  key={`${currentIndex}-p${i}`}
                  className="product-card group relative bg-white/[0.06] border border-white/15 rounded-md overflow-hidden cursor-pointer hover:bg-white/[0.09] hover:border-white/50 transition-all duration-500 ease-out"
                  style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                >
                  <div className="relative w-full aspect-[5/4] overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="product-img object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                      sizes="(max-width: 1280px) 18vw, 180px"
                    />
                    {/* Legibility gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
                  </div>
                  {/* Info area */}
                  <div className="px-4 pt-3.5 pb-4">
                    <p className="text-white/90 text-[15px] leading-snug tracking-[0.01em] line-clamp-2 font-sans">
                      {product.name}
                    </p>
                    <p className="font-sans font-semibold text-white text-lg tracking-[0.03em] mt-2 leading-none">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — magnetic, fill sweep on hover */}
            <button
              ref={ctaRef}
              onMouseMove={onCtaMove}
              onMouseLeave={onCtaLeave}
              className="hero-fade-in group relative overflow-hidden font-bebas text-lg lg:text-xl xl:text-2xl tracking-[0.5em] px-16 lg:px-24 py-4 lg:py-5 border border-white/80 text-white cursor-pointer"
            >
              <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                ACCEDER A LA TIENDA
              </span>
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
              far
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

        {/* ── Progress lines ───────────────────────────────────────────── */}
        <div className="hero-fade-in absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {stores.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToStore(i)}
              aria-label={`Ir a ${s.name}`}
              className={`transition-all duration-500 ease-out cursor-pointer ${
                i === currentIndex
                  ? "w-8 h-px bg-white"
                  : "w-2 h-px bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
        {currentIndex === 0 && (
          <div className="hero-fade-in absolute bottom-14 right-8 z-20 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-white/40 text-[9px] font-light tracking-[0.25em] uppercase">
              scroll
            </span>
            <div className="w-px h-8 bg-white/40 animate-scroll-line" />
          </div>
        )}

        {/* ── Watermark ───────────────────────────────────────────────── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none overflow-hidden w-full flex justify-center">
          <p className="watermark-text font-cormorant font-light text-white/[0.05] tracking-[0.4em] uppercase select-none leading-none whitespace-nowrap text-[12vw]">
            {store.name}
          </p>
        </div>

        {/* ── Intro veil — covers everything until the intro runs ──────── */}
        <div className="intro-veil absolute inset-0 z-50 bg-black pointer-events-none" />
      </div>
    </div>
  );
}
