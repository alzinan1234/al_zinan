'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
import gsap from 'gsap'

/* ─────────────────────────────────────────
   Education Data
   👉 logo: '/logos/your-file.png' রাখো /public/logos/ folder-এ
───────────────────────────────────────── */
const educations = [
  {
    id: '01',
    degree: 'SSC',
    field: 'Science',
    institution: 'Cantonment Board High School',
    location: 'Mymensingh',
    batch: 'Batch 2020',
    duration: '2018 – 2020',
    status: 'Completed',
    initials: 'CB',
    logo: '/cbhsm.png',       // ← তোমার logo path
    accentColor: 'rgba(255, 255, 255, 0.9)',
    tags: ['Science', 'SSC', 'Batch-20'],
  },
  {
    id: '02',
    degree: 'Diploma',
    field: 'Computer Science & Technology',
    institution: 'Mymensingh Polytechnic Institute',
    location: 'Mymensingh',
    batch: '4 Years Program',
    duration: '2020 – 2024',
    status: 'Completed',
    initials: 'MPI',
    logo: '/mpi.png', // ← তোমার logo path
    accentColor: 'rgba(0, 210, 255, 0.9)',
    tags: ['CST', 'Diploma', 'Engineering'],
  },
  {
    id: '03',
    degree: 'B.Sc',
    field: 'Computer Science & Engineering',
    institution: 'Uttara University',
    location: 'Dhaka',
    batch: 'Expected 2028',
    duration: '2024 – 2028',
    status: 'Running',
    initials: 'UU',
    logo: '/uu.png',      // ← তোমার logo path
    accentColor: 'rgba(255, 30, 80, 0.9)',
    tags: ['CSE', 'B.Sc', 'University'],
  },
]

/* ─────────────────────────────────────────
   Logo Badge — image with initials fallback
───────────────────────────────────────── */
function LogoBadge({
  logo,
  initials,
  accentColor,
  institution,
}: {
  logo: string
  initials: string
  accentColor: string
  institution: string
}) {
  const hasLogo = logo && logo.trim() !== ''

  return (
    <div
      className="edu-logo-badge"
      style={{ borderColor: accentColor + '44' }}
    >
      {hasLogo ? (
        <div style={{ position: 'relative', width: 32, height: 32 }}>
          <Image
            src={logo}
            alt={institution}
            fill
            className="object-contain"
            // style={{
            //   filter: 'brightness(0) invert(1)',
            //   opacity: 0.85,
            // }}
            onError={(e) => {
              // fallback to initials if image fails
              const parent = e.currentTarget.parentElement?.parentElement
              if (parent) {
                e.currentTarget.style.display = 'none'
                const span = document.createElement('span')
                span.textContent = initials
                span.style.cssText = `font-family: var(--font-bebas); font-size: 13px; letter-spacing: 2px; color: ${accentColor}`
                parent.appendChild(span)
              }
            }}
          />
        </div>
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 13,
            letterSpacing: 2,
            color: accentColor,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   Single Card
───────────────────────────────────────── */
function EduCard({
  edu,
  index,
}: {
  edu: (typeof educations)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || !cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: index * 0.18 }
    )
  }, [inView, index])

  return (
    <div ref={cardRef} style={{ opacity: 0, width: '100%' }}>
      <div
        className="edu-card edu-card-hover"
        style={{ borderColor: 'rgba(255,255,255,0.07)', height: '100%' }}
      >
        {/* Shimmer */}
        <div className="edu-shimmer" />

        {/* Accent top border */}
        <div className="edu-accent-line" style={{ background: edu.accentColor }} />

        {/* Header */}
        <div className="edu-card-header">
          <LogoBadge
            logo={edu.logo}
            initials={edu.initials}
            accentColor={edu.accentColor}
            institution={edu.institution}
          />

          <div className="edu-header-right">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.15)',
                fontSize: 10,
                letterSpacing: 3,
              }}
            >
              {edu.id}
            </span>
            <span
              className="edu-status-badge"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 2,
                color:
                  edu.status === 'Running'
                    ? edu.accentColor
                    : 'rgba(255,255,255,0.35)',
                borderColor:
                  edu.status === 'Running'
                    ? edu.accentColor + '55'
                    : 'rgba(255,255,255,0.1)',
                background:
                  edu.status === 'Running'
                    ? edu.accentColor + '11'
                    : 'transparent',
              }}
            >
              {edu.status === 'Running' ? '● ONGOING' : '✓ COMPLETED'}
            </span>
          </div>
        </div>

        {/* Degree + Field */}
        <h3
          className="edu-degree"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '-0.5px' }}
        >
          <span style={{ color: '#fff' }}>{edu.degree}</span>
          <br />
          <span style={{ color: edu.accentColor, fontSize: '0.6em', letterSpacing: 1 }}>
            {edu.field}
          </span>
        </h3>

        {/* Institution */}
        <p
          className="edu-institution"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 11,
            letterSpacing: 1.5,
          }}
        >
          {edu.institution}
        </p>

        {/* Meta */}
        <div className="edu-meta-row">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            📍 {edu.location}
          </span>
          <span className="edu-meta-sep" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            🗓 {edu.duration}
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.2)',
            marginBottom: 16,
          }}
        >
          {edu.batch}
        </div>

        {/* Tags */}
        <div className="edu-tags-row">
          {edu.tags.map((t) => (
            <span
              key={t}
              className="edu-tag"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: 2,
                color: edu.accentColor,
                borderColor: edu.accentColor + '33',
                background: edu.accentColor + '0d',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
export default function Education() {
  const sectionRef  = useRef<HTMLElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const glitchRef   = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const tagRef      = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current], { y: '110%' })
    gsap.set([tagRef.current, subRef.current], { opacity: 0, y: 28 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        gsap.timeline()
          .to(tagRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to(line1Ref.current, { y: '0%', duration: 1.1, ease: 'power4.out' }, '-=0.3')
          .to(line2Ref.current, { y: '0%', duration: 1.1, ease: 'power4.out' }, '-=0.75')
          .to(subRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

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
      const shakeInt = setInterval(shakeBurst, 5000)

      const glitchBurst = () => {
        if (!glitchRef.current) return
        gsap.timeline()
          .set(glitchRef.current, {
            opacity: 1, scaleY: 0.04,
            y: `${10 + Math.random() * 70}%`,
            background: 'rgba(255,30,80,0.2)',
          })
          .to(glitchRef.current, { opacity: 0, duration: 0.07 })
          .set(glitchRef.current, {
            opacity: 0.8, scaleY: 0.02,
            y: `${10 + Math.random() * 70}%`,
            background: 'rgba(0,210,255,0.15)',
          })
          .to(glitchRef.current, { opacity: 0, duration: 0.09 })
      }
      const glitchInt = setInterval(glitchBurst, 3000)

      if (scanlineRef.current) {
        gsap.fromTo(
          scanlineRef.current,
          { y: '-2px' },
          { y: '100%', duration: 3.5, ease: 'none', repeat: -1, delay: 0.5 }
        )
      }

      return () => {
        clearInterval(shakeInt)
        clearInterval(glitchInt)
        observer.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .edu-section { position: relative; overflow: hidden; }

        .edu-scanline {
          position: absolute; left: 0; right: 0; top: 0; height: 3px;
          background: linear-gradient(to right,
            transparent, rgba(255,255,255,0.06) 40%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 60%, transparent);
          pointer-events: none; z-index: 5;
        }
        .edu-glitch-bar {
          position: absolute; left: -10%; width: 120%; height: 12px;
          pointer-events: none; z-index: 6; opacity: 0;
          mix-blend-mode: screen; top: 0;
        }
        .edu-corner {
          position: absolute; width: 32px; height: 32px;
          pointer-events: none; z-index: 4;
        }
        .edu-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .edu-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* ── Centered heading ── */
        .edu-heading-wrap {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .edu-line { display: block; overflow: hidden; }

        /* Line 1 "MY" — flicker */
        .edu-h-line1 {
          display: block; color: #fff;
          animation: eduFlicker 8s infinite;
        }
        @keyframes eduFlicker {
          0%,94%,100% { opacity: 1; }
          95%   { opacity: 0.5; }
          95.4% { opacity: 1; }
          95.8% { opacity: 0.2; }
          96.2% { opacity: 1; }
        }

        /* Line 2 "EDUCATION" — RGB split */
        .edu-h-line2 {
          position: relative; display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .edu-h-line2::before,
        .edu-h-line2::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .edu-h-line2::before {
          color: rgba(255,30,80,0.8);
          animation: eduRgbL 7s infinite;
          clip-path: polygon(0 10%,100% 10%,100% 38%,0 38%);
        }
        .edu-h-line2::after {
          color: rgba(0,210,255,0.8);
          animation: eduRgbR 7s infinite;
          clip-path: polygon(0 58%,100% 58%,100% 82%,0 82%);
        }
        @keyframes eduRgbL {
          0%,85%,100%{ transform:none; opacity:0; }
          86%  { transform:translateX(-8px) skewX(-3deg); opacity:1; }
          88%  { transform:translateX(4px); opacity:0.7; }
          90%  { transform:translateX(-3px); opacity:1; }
          92%  { transform:none; opacity:0; }
        }
        @keyframes eduRgbR {
          0%,87%,100%{ transform:none; opacity:0; }
          88%  { transform:translateX(8px) skewX(3deg); opacity:1; }
          90%  { transform:translateX(-5px); opacity:0.7; }
          92%  { transform:translateX(2px); opacity:1; }
          94%  { transform:none; opacity:0; }
        }

        /* ── 3-column grid ── */
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media(max-width: 900px) {
          .edu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media(max-width: 580px) {
          .edu-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .edu-card {
          border: 1px solid;
          background: rgba(255,255,255,0.015);
          padding: 28px 24px 22px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s;
        }
        .edu-card-hover:hover {
          background: rgba(255,255,255,0.03) !important;
          border-color: rgba(255,255,255,0.14) !important;
        }
        .edu-shimmer {
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .edu-card-hover:hover .edu-shimmer { left: 150%; }
        .edu-accent-line {
          position: absolute; top: 0; left: 0;
          width: 48px; height: 2px; opacity: 0.8;
        }

        .edu-card-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        /* Logo badge — slightly larger for image */
        .edu-logo-badge {
          width: 48px; height: 48px; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.03);
          overflow: hidden;
          flex-shrink: 0;
        }

        .edu-header-right {
          display: flex; align-items: center;
          gap: 10px; flex-wrap: wrap; justify-content: flex-end;
        }
        .edu-status-badge {
          border: 1px solid; padding: 4px 10px;
          text-transform: uppercase; white-space: nowrap;
        }

        .edu-degree {
          font-size: clamp(26px, 3.5vw, 38px);
          line-height: 1.1; margin: 0 0 10px;
        }
        .edu-institution { margin: 0 0 12px; text-transform: uppercase; }

        .edu-meta-row {
          display: flex; align-items: center;
          flex-wrap: wrap; gap: 8px; margin-bottom: 8px;
        }
        .edu-meta-sep {
          width: 3px; height: 3px;
          background: rgba(255,255,255,0.15); border-radius: 50%;
        }
        .edu-tags-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .edu-tag { border: 1px solid; padding: 4px 10px; text-transform: uppercase; }

        .edu-sub {
          font-size: 14px; line-height: 1.8;
          color: rgba(255,255,255,0.35);
          font-weight: 300; margin-top: 8px;
          text-align: center; max-width: 520px;
        }

        @media(max-width:640px){
          .edu-corner.tl { left: 24px; }
          .edu-corner.br { right: 24px; }
          .edu-card { padding: 20px 18px 18px; }
        }
      `}</style>

      <section
        id="education"
        ref={sectionRef}
        className="edu-section px-6 md:px-[60px] py-28 md:py-[120px] bg-[#050505]"
      >
        {/* Decorative */}
        <div ref={scanlineRef} className="edu-scanline" />
        <div ref={glitchRef}   className="edu-glitch-bar" />
        <div className="edu-corner tl" />
        <div className="edu-corner br" />

        {/* ── Centered heading ── */}
        <div className="edu-heading-wrap">
          <div ref={tagRef} style={{ opacity: 0 }}>
            <SectionTag label="Education" />
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(52px, 7vw, 100px)',
              lineHeight: 1,
              letterSpacing: '-1px',
              marginBottom: '16px',
              marginTop: '20px',
              willChange: 'transform',
            }}
          >
            <span className="edu-line">
              <span ref={line1Ref} className="edu-h-line1">MY</span>
            </span>
            <span className="edu-line">
              <span ref={line2Ref} className="edu-h-line2" data-text="EDUCATION">EDUCATION</span>
            </span>
          </h2>

          <p ref={subRef} className="edu-sub" style={{ opacity: 0 }}>
            From school corridors to university labs — a continuous pursuit of knowledge in computing &amp; technology.
          </p>
        </div>

        {/* ── 3-column Cards Grid ── */}
        <div className="edu-grid mt-16 md:mt-20">
          {educations.map((edu, i) => (
            <EduCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}