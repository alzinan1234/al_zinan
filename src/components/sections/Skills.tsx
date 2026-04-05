'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SectionTag from '@/components/ui/SectionTag'
import {
  SiHtml5, SiTailwindcss, SiBootstrap, SiJavascript,
  SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiSocketdotio,
  SiFigma, SiGsap, SiThreedotjs, SiAntdesign, SiFramer,
} from 'react-icons/si'
import { TbBrandCss3 } from 'react-icons/tb'

const skills = [
  { name: 'HTML5',         icon: SiHtml5,       color: '#E34F26', cat: 'Markup',    level: 94 },
  { name: 'CSS3',          icon: TbBrandCss3,        color: '#1572B6', cat: 'Styling',   level: 92 },
  { name: 'Tailwind CSS',  icon: SiTailwindcss, color: '#06B6D4', cat: 'Framework', level: 90 },
  { name: 'Bootstrap',     icon: SiBootstrap,   color: '#7952B3', cat: 'Framework', level: 85 },
  { name: 'JavaScript',    icon: SiJavascript,  color: '#F7DF1E', cat: 'Language',  level: 96 },
  { name: 'React.js',      icon: SiReact,       color: '#61DAFB', cat: 'Library',   level: 93 },
  { name: 'Next.js',       icon: SiNextdotjs,   color: '#ffffff', cat: 'Framework', level: 89 },
  { name: 'Node.js',       icon: SiNodedotjs,   color: '#339933', cat: 'Backend',   level: 82 },
  { name: 'MongoDB',       icon: SiMongodb,     color: '#47A248', cat: 'Database',  level: 80 },
  { name: 'WebSocket',     icon: SiSocketdotio, color: '#ffffff', cat: 'Real-time', level: 78 },
  { name: 'Figma',         icon: SiFigma,       color: '#F24E1E', cat: 'Design',    level: 88 },
  { name: 'GSAP',          icon: SiGsap,        color: '#88CE02', cat: 'Animation', level: 87 },
  { name: 'Framer Motion', icon: SiFramer,      color: '#0055FF', cat: 'Animation', level: 85 },
  { name: 'Three.js',      icon: SiThreedotjs,  color: '#ffffff', cat: '3D',        level: 75 },
  { name: 'Ant Design',    icon: SiAntdesign,   color: '#0170FE', cat: 'UI Library',level: 80 },
]

export default function Skills() {
  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const myRef        = useRef<HTMLSpanElement>(null)
  const skillsRef    = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── same initial states as Hero ──
    gsap.set([myRef.current, skillsRef.current], { y: '110%' })
    gsap.set([tagRef.current, gridRef.current], { opacity: 0, y: 28 })

    const tl = gsap.timeline()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        tl.to(tagRef.current,    { opacity: 1, y: 0,   duration: 0.7,  ease: 'power3.out' })
          .to(myRef.current,     { y: '0%',            duration: 1.1,  ease: 'power4.out' }, '-=0.3')
          .to(skillsRef.current, { y: '0%',            duration: 1.1,  ease: 'power4.out' }, '-=0.75')
          .to(gridRef.current,   { opacity: 1, y: 0,   duration: 0.8,  ease: 'power3.out' }, '-=0.4')

        // stagger each card in
        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll('.skill-card-item')
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.6 }
          )
        }
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
        /* MY — same flicker as AL / WHO */
        .skills-my {
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

        /* SKILLS — same RGB split as ZINAN / I AM */
        .skills-title {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .skills-title::before,
        .skills-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .skills-title::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .skills-title::after {
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
        .skills-scanline {
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
        .skills-glitch-bar {
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
        .skills-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .skills-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .skills-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* clip-reveal line */
        .skills-line {
          display: block;
          overflow: hidden;
        }

        /* skill card */
        .skill-card-item {
          position: relative;
          background: #000;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow: hidden;
          transition: background 0.4s;
        }
        .skill-card-item:hover {
          background: rgba(255,255,255,0.04);
        }
        .skill-card-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .skill-card-item:hover::before { opacity: 1; }

        /* icon box */
        .skill-icon-box {
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s, transform 0.3s;
          font-size: 26px;
        }
        .skill-card-item:hover .skill-icon-box {
          border-color: rgba(255,255,255,0.35);
          transform: scale(1.06);
        }

        /* shimmer on card hover */
        .skill-card-item::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .skill-card-item:hover::after { left: 150%; }

        @media(max-width:768px){
          .skills-corner.tl { left: 24px; }
          .skills-corner.br { right: 24px; }
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-black"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* same decorative elements as Hero */}
        <div ref={scanlineRef} className="skills-scanline" />
        <div ref={glitchBarRef} className="skills-glitch-bar" />
        <div className="skills-corner tl" />
        <div className="skills-corner br" />

        {/* tag */}
        <div ref={tagRef}>
          <SectionTag label="Tech Stack" />
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
          <span className="skills-line">
            <span ref={myRef} className="skills-my">MY</span>
          </span>

          {/* SKILLS — clip-reveal + RGB split */}
          <span className="skills-line">
            <span ref={skillsRef} className="skills-title" data-text="SKILLS">SKILLS</span>
          </span>
        </h2>

        {/* grid */}
        <div
          ref={gridRef}
          className="grid border"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            borderColor: 'rgba(255,255,255,0.06)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div key={skill.name} className="skill-card-item skill-card">
                {/* icon */}
                <div className="skill-icon-box">
                  <Icon color={skill.color} size={26} />
                </div>

                {/* text */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      letterSpacing: 1,
                      color: '#fff',
                    }}
                  >
                    {skill.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.25)',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      marginTop: 4,
                    }}
                  >
                    {skill.cat}
                  </div>
                </div>

                {/* big bg level number */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16, right: 16,
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 36,
                    color: 'rgba(255,255,255,0.05)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {skill.level}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}