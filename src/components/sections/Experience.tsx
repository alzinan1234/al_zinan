'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SectionTag from '@/components/ui/SectionTag'
import { timeline } from '@/data'

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, x: -32 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: index * 0.12,
          ease: 'power3.out',
        })
      },
      { threshold: 0.1, rootMargin: '-80px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className="relative pl-10 mb-16 last:mb-0 group">
      {/* dot */}
      <div
        className="absolute left-0 top-[6px] w-2 h-2 border transition-all duration-300 group-hover:bg-white group-hover:border-white"
        style={{ borderColor: 'rgba(255,255,255,0.4)', background: '#000', borderRadius: 0 }}
      />

      {/* year */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
        color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 12,
      }}>
        {item.year}
      </div>

      {/* title */}
      <div style={{
        fontFamily: 'var(--font-bebas)', fontSize: 32,
        color: '#fff', letterSpacing: 1, marginBottom: 6,
      }}>
        {item.title}
      </div>

      {/* company */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'rgba(255,255,255,0.35)', letterSpacing: 2, marginBottom: 16,
      }}>
        {item.company}
      </div>

      {/* desc */}
      <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', maxWidth: 600 }}>
        {item.desc}
      </p>
    </div>
  )
}

export default function Experience() {
  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const myRef        = useRef<HTMLSpanElement>(null)
  const journeyRef   = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── same initial states as Hero ──
    gsap.set([myRef.current, journeyRef.current], { y: '110%' })
    gsap.set([tagRef.current, timelineRef.current], { opacity: 0, y: 28 })

    const tl = gsap.timeline()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        tl.to(tagRef.current,     { opacity: 1, y: 0,  duration: 0.7,  ease: 'power3.out' })
          .to(myRef.current,      { y: '0%',           duration: 1.1,  ease: 'power4.out' }, '-=0.3')
          .to(journeyRef.current, { y: '0%',           duration: 1.1,  ease: 'power4.out' }, '-=0.75')
          .to(timelineRef.current,{ opacity: 1, y: 0,  duration: 0.8,  ease: 'power3.out' }, '-=0.4')
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    // ── idle vibration — same as Hero ──
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

      // ── glitch bar — same as Hero ──
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

      // ── scanline — same as Hero ──
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

  return (
    <>
      <style>{`
        /* MY — same flicker as AL / WHO / MY */
        .exp-my {
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

        /* JOURNEY — same RGB split as ZINAN / I AM / SKILLS / WORK */
        .exp-journey {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .exp-journey::before,
        .exp-journey::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .exp-journey::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .exp-journey::after {
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
        .exp-scanline {
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
        .exp-glitch-bar {
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
        .exp-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .exp-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .exp-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* clip-reveal line */
        .exp-line {
          display: block;
          overflow: hidden;
        }

        @media(max-width:768px){
          .exp-corner.tl { left: 24px; }
          .exp-corner.br { right: 24px; }
        }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-black"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* same decorative elements as Hero */}
        <div ref={scanlineRef} className="exp-scanline" />
        <div ref={glitchBarRef} className="exp-glitch-bar" />
        <div className="exp-corner tl" />
        <div className="exp-corner br" />

        {/* tag */}
        <div ref={tagRef}>
          <SectionTag label="Journey" />
        </div>

        {/* heading — exact same structure as Hero h1 */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(52px, 7vw, 100px)',
            lineHeight: 1,
            letterSpacing: '-1px',
            marginBottom: '60px',
            willChange: 'transform',
          }}
        >
          {/* MY — clip-reveal + flicker */}
          <span className="exp-line">
            <span ref={myRef} className="exp-my">MY</span>
          </span>

          {/* JOURNEY — clip-reveal + RGB split */}
          <span className="exp-line">
            <span ref={journeyRef} className="exp-journey" data-text="JOURNEY">JOURNEY</span>
          </span>
        </h2>

        {/* timeline */}
        <div
          ref={timelineRef}
          className="relative"
          style={{ paddingLeft: 40 }}
        >
          {/* vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}
          />

          {timeline.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}