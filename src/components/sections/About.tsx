'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const facts = [
  { val: '30+', key: 'Projects Built' },
  { val: '4yr', key: 'Experience' },
  { val: '15+', key: 'Technologies' },
  { val: '100%', key: 'Dedication' },
]

const bars = [
  { label: 'Frontend', width: 98 },
  { label: 'Backend', width: 50 },
  
]

function SkillBar({ label, width }: { label: string; width: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mt-6">
      <div
        className="flex justify-between mb-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        <span>{label}</span>
        <span>{width}%</span>
      </div>
      <div className="h-px bg-white/10 relative">
        <div className="exp-fill" style={{ width: inView ? `${width}%` : '0%' }} />
      </div>
    </div>
  )
}

export default function About() {
  // ── same refs as Hero ──
  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const whoRef       = useRef<HTMLSpanElement>(null)    // same as line1Ref (AL)
  const iamRef       = useRef<HTMLSpanElement>(null)    // same as line2Ref (ZINAN)
  const tagRef       = useRef<HTMLDivElement>(null)
  const bioRef       = useRef<HTMLDivElement>(null)
  const factsRef     = useRef<HTMLDivElement>(null)
  const barsRef      = useRef<HTMLDivElement>(null)
  const photoRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── 1. Set initial states — exactly like Hero ──
    gsap.set([whoRef.current, iamRef.current], { y: '110%' })
    gsap.set([tagRef.current, bioRef.current, factsRef.current, barsRef.current, photoRef.current], {
      opacity: 0, y: 28,
    })

    // ── 2. Entrance timeline — exactly like Hero ──
    const tl = gsap.timeline({
      scrollTrigger: undefined, // fires when section enters viewport via IntersectionObserver below
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        tl.to(tagRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to(whoRef.current,   { y: '0%',   duration: 1.1, ease: 'power4.out' }, '-=0.3')
          .to(iamRef.current,   { y: '0%',   duration: 1.1, ease: 'power4.out' }, '-=0.75')
          .to(bioRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .to(factsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .to(barsRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .to(photoRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8')
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    // ── 3. Idle vibration on heading — exactly like Hero ──
    if (headingRef.current) {
      gsap.to(headingRef.current, {
        x: () => (Math.random() - 0.5) * 1.5,
        y: () => (Math.random() - 0.5) * 0.8,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })

      // Shake burst every 5s — exactly like Hero
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

      // ── 4. Glitch bar flash — exactly like Hero ──
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

      // ── 5. Scanline sweep — exactly like Hero ──
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
        /* WHO — same as .hero-al flicker */
        .about-who {
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

        /* I AM — same as .hero-zinan RGB split */
        .about-iam {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .about-iam::before,
        .about-iam::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .about-iam::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .about-iam::after {
          color: rgba(0, 210, 255, 0.8);
          animation: rgbRight 7s infinite;
          clip-path: polygon(0 58%, 100% 58%, 100% 82%, 0 82%);
        }
        @keyframes rgbLeft {
          0%,85%,100% { transform: none; opacity: 0; }
          86%          { transform: translateX(-8px) skewX(-3deg); opacity: 1; }
          88%          { transform: translateX(4px);               opacity: 0.7; }
          90%          { transform: translateX(-3px);              opacity: 1; }
          92%          { transform: none; opacity: 0; }
        }
        @keyframes rgbRight {
          0%,87%,100% { transform: none; opacity: 0; }
          88%          { transform: translateX(8px) skewX(3deg);   opacity: 1; }
          90%          { transform: translateX(-5px);              opacity: 0.7; }
          92%          { transform: translateX(2px);               opacity: 1; }
          94%          { transform: none; opacity: 0; }
        }

        /* scanline — same as .hero-scanline */
        .about-scanline {
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

        /* glitch bar — same as .hero-glitch-bar */
        .about-glitch-bar {
          position: absolute;
          left: -10%; width: 120%;
          height: 12px;
          pointer-events: none;
          z-index: 6;
          opacity: 0;
          mix-blend-mode: screen;
          top: 0;
        }

        /* corner marks — same as .hero-corner */
        .about-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .about-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .about-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* exp-fill */
        .exp-fill {
          height: 1px;
          background: #fff;
          transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* fact card shimmer — same as .btn-shimmer */
        .fact-card {
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .fact-card:hover { border-color: rgba(255,255,255,0.2) !important; }
        .fact-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transition: left 0.5s ease;
        }
        .fact-card:hover::after { left: 150%; }

        /* about heading .line clip — same as .hero-name .line */
        .about-line {
          display: block;
          overflow: hidden;
        }

        @media(max-width:768px){
          .about-corner.tl { left: 24px; }
          .about-corner.br { right: 24px; }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-[#050505]"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* same decorative elements as Hero */}
        <div ref={scanlineRef} className="about-scanline" />
        <div ref={glitchBarRef} className="about-glitch-bar" />
        <div className="about-corner tl" />
        <div className="about-corner br" />

        {/* section tag */}
        <div ref={tagRef}>
          <SectionTag label="About Me" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* ── LEFT ── */}
          <div>

            {/* Heading — same structure as Hero h1 */}
            <h2
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(52px, 7vw, 100px)',
                lineHeight: 1,
                letterSpacing: '-1px',
                marginBottom: '40px',
                willChange: 'transform',
              }}
            >
              {/* WHO — .line wrapper + inner span, same as AL */}
              <span className="about-line">
                <span ref={whoRef} className="about-who">WHO</span>
              </span>

              {/* I AM — .line wrapper + inner span with RGB split, same as ZINAN */}
              <span className="about-line">
                <span ref={iamRef} className="about-iam" data-text="I AM">I AM</span>
              </span>
            </h2>

            {/* Bio paragraphs */}
            <div ref={bioRef}>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 300,
                  marginBottom: 24,
                }}
              >
                I&apos;m{' '}
                <strong style={{ color: '#fff', fontWeight: 500 }}>Al Zinan</strong>, a passionate{' '}
                <strong style={{ color: '#fff', fontWeight: 500 }}>Full Stack Web Developer</strong>{' '}
                based in Dhaka, Bangladesh. With{' '}
                <strong style={{ color: '#fff', fontWeight: 500 }}>3–4 years</strong> of hands-on
                experience, I build scalable, performant, and visually stunning web applications.
              </p>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 300,
                }}
              >
                From pixel-perfect frontends with React &amp; Next.js to robust backends with
                Node.js &amp; MongoDB — I bring complete digital products to life. I&apos;m also
                deeply passionate about{' '}
                <strong style={{ color: '#fff', fontWeight: 500 }}>UI/UX design</strong>, using
                Figma to design before I code.
              </p>
            </div>

            {/* Facts */}
            <div ref={factsRef} className="grid grid-cols-2 gap-6 mt-10">
              {facts.map((f) => (
                <div
                  key={f.key}
                  className="fact-card p-5 border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36 }}>{f.val}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      letterSpacing: 2,
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      marginTop: 4,
                    }}
                  >
                    {f.key}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Bars */}
            <div ref={barsRef} className="mt-10">
              {bars.map((b) => (
                <SkillBar key={b.label} {...b} />
              ))}
            </div>
          </div>

          {/* ── RIGHT — Photo ── */}
          <div ref={photoRef}>
            <div className="relative w-full max-w-[400px] aspect-[3/4]">
              <div
                className="w-full h-full border overflow-hidden"
                id="photoTarget"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#111' }}
              >
                <Image
                  src="/professional_bw.jpg"
                  alt="Al Zinan - Professional Photo"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={90}
                />
              </div>
              <div
                className="absolute -bottom-5 -right-5 w-full h-full -z-10"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}