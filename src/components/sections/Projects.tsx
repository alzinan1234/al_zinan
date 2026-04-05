'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SectionTag from '@/components/ui/SectionTag'
import { projects } from '@/data'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function Projects() {
  const swiperRef    = useRef<any>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const selectedRef  = useRef<HTMLSpanElement>(null)
  const workRef      = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const sliderRef    = useRef<HTMLDivElement>(null)

  // ── same GSAP animation pattern as Hero / About / Skills ──
  useEffect(() => {
    gsap.set([selectedRef.current, workRef.current], { y: '110%' })
    gsap.set([tagRef.current, sliderRef.current], { opacity: 0, y: 28 })

    const tl = gsap.timeline()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        tl.to(tagRef.current,      { opacity: 1, y: 0,  duration: 0.7,  ease: 'power3.out' })
          .to(selectedRef.current, { y: '0%',           duration: 1.1,  ease: 'power4.out' }, '-=0.3')
          .to(workRef.current,     { y: '0%',           duration: 1.1,  ease: 'power4.out' }, '-=0.75')
          .to(sliderRef.current,   { opacity: 1, y: 0,  duration: 0.8,  ease: 'power3.out' }, '-=0.4')

        // stagger cards
        if (sliderRef.current) {
          const cards = sliderRef.current.querySelectorAll('.project-card-item')
          gsap.fromTo(
            cards,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.5 }
          )
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    // idle vibration — same as Hero
    if (headingRef.current) {
      gsap.to(headingRef.current, {
        x: () => (Math.random() - 0.5) * 1.5,
        y: () => (Math.random() - 0.5) * 0.8,
        duration: 0.1, repeat: -1, yoyo: true, ease: 'none',
      })

      const shakeBurst = () => {
        if (!headingRef.current) return
        gsap.timeline()
          .to(headingRef.current, { x: -8, skewX: -1, duration: 0.05, ease: 'none' })
          .to(headingRef.current, { x:  8, skewX:  1, duration: 0.05, ease: 'none' })
          .to(headingRef.current, { x: -5, skewX:  0, duration: 0.05, ease: 'none' })
          .to(headingRef.current, { x:  5,             duration: 0.05, ease: 'none' })
          .to(headingRef.current, { x: -2,             duration: 0.04, ease: 'none' })
          .to(headingRef.current, { x:  0,             duration: 0.04, ease: 'none' })
      }
      const shakeInterval = setInterval(shakeBurst, 5000)

      // glitch bar — same as Hero
      const glitchBurst = () => {
        if (!glitchBarRef.current) return
        gsap.timeline()
          .set(glitchBarRef.current, {
            opacity: 1, scaleY: 0.04,
            y: `${10 + Math.random() * 70}%`,
            background: 'rgba(255,30,80,0.2)',
          })
          .to(glitchBarRef.current, { opacity: 0, duration: 0.07 })
          .set(glitchBarRef.current, {
            opacity: 0.8, scaleY: 0.02,
            y: `${10 + Math.random() * 70}%`,
            background: 'rgba(0,210,255,0.15)',
          })
          .to(glitchBarRef.current, { opacity: 0, duration: 0.09 })
      }
      const glitchInterval = setInterval(glitchBurst, 3000)

      // scanline — same as Hero
      if (scanlineRef.current) {
        gsap.fromTo(
          scanlineRef.current,
          { y: '-2px' },
          { y: '100%', duration: 3.5, ease: 'none', repeat: -1, delay: 0.5 }
        )
      }

      return () => {
        clearInterval(shakeInterval)
        clearInterval(glitchInterval)
        observer.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  // Swiper init
  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper')
      const { Navigation, Pagination, FreeMode, Mousewheel, Keyboard } = await import('swiper/modules')
      await import('swiper/css')
      await import('swiper/css/navigation')
      await import('swiper/css/pagination')
      if (swiperRef.current) return
      swiperRef.current = new Swiper('.projectSwiper', {
        modules: [Navigation, Pagination, FreeMode, Mousewheel, Keyboard],
        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: true,
        grabCursor: true,
        keyboard: { enabled: true },
        mousewheel: { forceToAxis: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { spaceBetween: 32 } },
      })
    }
    initSwiper()
    return () => {
      swiperRef.current?.destroy?.()
      swiperRef.current = null
    }
  }, [])

  return (
    <>
      <style>{`
        /* SELECTED — same flicker as AL / WHO / MY */
        .proj-selected {
          display: block;
          color: #fff;
          animation: alFlicker 8s infinite;
        }
        @keyframes alFlicker {
          0%,94%,100% { opacity: 1; }
          95%          { opacity: 0.5; }
          95.4%        { opacity: 1; }
          95.8%        { opacity: 0.2; }
          96.2%        { opacity: 1; }
        }

        /* WORK — same RGB split as ZINAN / I AM / SKILLS */
        .proj-work {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .proj-work::before,
        .proj-work::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .proj-work::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .proj-work::after {
          color: rgba(0, 210, 255, 0.8);
          animation: rgbRight 7s infinite;
          clip-path: polygon(0 58%, 100% 58%, 100% 82%, 0 82%);
        }
        @keyframes rgbLeft {
          0%,85%,100% { transform: none; opacity: 0; }
          86% { transform: translateX(-8px) skewX(-3deg); opacity: 1; }
          88% { transform: translateX(4px); opacity: 0.7; }
          90% { transform: translateX(-3px); opacity: 1; }
          92% { transform: none; opacity: 0; }
        }
        @keyframes rgbRight {
          0%,87%,100% { transform: none; opacity: 0; }
          88% { transform: translateX(8px) skewX(3deg); opacity: 1; }
          90% { transform: translateX(-5px); opacity: 0.7; }
          92% { transform: translateX(2px); opacity: 1; }
          94% { transform: none; opacity: 0; }
        }

        /* scanline */
        .proj-scanline {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 3px;
          background: linear-gradient(to right,
            transparent,
            rgba(255,255,255,0.06) 40%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 60%,
            transparent
          );
          pointer-events: none;
          z-index: 5;
        }

        /* glitch bar */
        .proj-glitch-bar {
          position: absolute;
          left: -10%; width: 120%;
          height: 12px;
          pointer-events: none;
          z-index: 6;
          opacity: 0;
          mix-blend-mode: screen;
          top: 0;
        }

        /* corner marks */
        .proj-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .proj-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .proj-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* clip-reveal line */
        .proj-line {
          display: block;
          overflow: hidden;
        }

        /* project card */
        .project-card-item {
          width: 380px;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      border-color 0.3s;
        }
        .project-card-item:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.12);
        }

        /* card shimmer */
        .project-card-item .card-img {
          position: relative;
          overflow: hidden;
        }
        .project-card-item .card-img::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .project-card-item:hover .card-img::after { left: 150%; }

        /* swiper overrides */
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.2) !important;
          width: 4px !important; height: 4px !important;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
          width: 20px !important;
          border-radius: 2px !important;
        }
        .swiper-button-prev,
        .swiper-button-next {
          width: 48px !important; height: 48px !important;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.8) !important;
          color: #fff !important;
          top: auto !important; bottom: 0 !important;
        }
        .swiper-button-prev { right: 60px !important; left: auto !important; }
        .swiper-button-next { right: 0 !important; }
        .swiper-button-prev::after,
        .swiper-button-next::after { font-size: 12px !important; }

        @media(max-width:768px){
          .proj-corner.tl { left: 24px; }
          .proj-corner.br { right: 24px; }
          .project-card-item { width: 300px; }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="py-28 md:py-[120px] bg-[#050505]"
        style={{ position: 'relative', overflow: 'hidden', paddingRight: 0 }}
      >
        {/* same decorative elements as Hero */}
        <div ref={scanlineRef} className="proj-scanline" />
        <div ref={glitchBarRef} className="proj-glitch-bar" />
        <div className="proj-corner tl" />
        <div className="proj-corner br" />

        {/* header */}
        <div className="px-6 md:px-[60px]">
          <div ref={tagRef}>
            <SectionTag label="Portfolio" />
          </div>

          {/* heading — exact same structure as Hero h1 */}
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(52px, 7vw, 100px)',
              lineHeight: 1,
              letterSpacing: '-1px',
              marginBottom: '48px',
              willChange: 'transform',
            }}
          >
            {/* SELECTED — clip-reveal + flicker */}
            <span className="proj-line">
              <span ref={selectedRef} className="proj-selected">SELECTED</span>
            </span>

            {/* WORK — clip-reveal + RGB split */}
            <span className="proj-line">
              <span ref={workRef} className="proj-work" data-text="WORK">WORK</span>
            </span>
          </h2>
        </div>

        {/* swiper */}
        <div ref={sliderRef} className="swiper projectSwiper pl-6 md:pl-[60px]">
          <div className="swiper-wrapper">
            {projects.map((project) => (
              <div key={project.num} className="swiper-slide" style={{ width: 'auto' }}>
                <div className="project-card-item project-card">

                  {/* image area */}
                  <div
                    className="card-img flex items-center justify-center"
                    style={{
                      height: 220,
                      background: 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)',
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to bottom,transparent,rgba(0,0,0,0.6))' }}
                    />
                    <div
                      className="absolute right-4 bottom-0 leading-none select-none pointer-events-none"
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: 100,
                        color: 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {project.num}
                    </div>
                    <div className="relative z-10 text-5xl opacity-20 transition-opacity duration-500 group-hover:opacity-40">
                      {project.icon}
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-7">
                    {/* tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 9,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            padding: '4px 10px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.35)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* name */}
                    <div
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: 28,
                        letterSpacing: 1,
                        color: '#fff',
                        marginBottom: 12,
                        lineHeight: 1.1,
                      }}
                    >
                      {project.name}
                    </div>

                    {/* desc */}
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 24,
                      }}
                    >
                      {project.desc}
                    </p>

                    {/* links */}
                    <div className="flex items-center gap-5">
                      <a
                        href={project.link}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.5)',
                          textDecoration: 'none',
                          transition: 'color 0.3s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                      >
                        <FiExternalLink size={13} /> Live
                      </a>
                      <a
                        href={project.github}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.5)',
                          textDecoration: 'none',
                          transition: 'color 0.3s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                      >
                        <FiGithub size={13} /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination" />
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
      </section>
    </>
  )
}