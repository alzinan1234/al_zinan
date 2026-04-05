'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import SectionTag from '@/components/ui/SectionTag'
import { FiExternalLink, FiGithub, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

// ── Update this array with your real screenshot paths & links ──
const projects = [
  {
    num: '01',
    name: 'E-Commerce Platform',
    desc: 'Full-stack shopping platform with real-time inventory, WebSocket-powered cart, and seamless payment integration.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'WebSocket'],
    // Replace with your real screenshot: '/images/projects/ecommerce.png'
    image: '/e-project.png',
    color: '#1a0a00',
    accent: '#ff6b00',
    link: 'https://hypertouchofficial.com/',
    github: 'https://github.com/alzinan1234/hyperTouch.com',
  },
  {
    num: '02',
    name: 'HRlynx — AI-powered HR Dashboard',
    desc: 'Real-time analytics dashboard with beautiful data visualizations, live updates and push notifications for collaborative features.',
    tags: ['Next.js', 'Framer Motion', 'WebSocket', 'Tailwind CSS'],
    image: "/hrlynx.png",
    color: '#000d1a',
    accent: '#00b4ff',
    link: 'https://dashboard.hrlynx.ai/',
    github: 'https://github.com/alzinan1234/hrai-admin',
  },
  {
    num: '03',
    name: 'TermSheetGenie FinTech platform',
    desc: 'TermSheetGenie is a professional FinTech platform designed for venture capital firms and startups to simulate investment scenarios and manage cap tables with precision. It streamlines the investment process by providing real-time data analysis, fund tracking, and clear projections on ownership and dilution.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/trem-sheet.png',
    color: '#0a001a',
    accent: '#9b59ff',
    link: 'https://tsg-application.vercel.app/',
    github: 'https://github.com/alzinan1234/tsg-application',
  },
  {
    num: '04',
    name: 'Nike Adapt 2.0',
    desc: 's premium footwear collection with a focus on a "pixel-perfect" visual experience. It features dynamic hero sections, vibrant product grids, and interactive story cards to provide an engaging and seamless shopping journey',
    tags: ['Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion'],
    image: '/nike.png',
    color: '#001a0a',
    accent: '#00e676',
    link: 'https://your-nike-world.netlify.app/',
    github: 'https://github.com/alzinan1234/nike-world',
  },
  {
    num: '05',
    name: 'Lawapan Truck',
    desc: 'Lawapan Truck is a comprehensive logistics and shipping platform designed to streamline regional transport across West Africa. It connects businesses with verified transporters, offering a seamless process for booking trucks and monitoring shipments in real-time.',
    tags: ['Next.js', 'WebSocket', 'Tailwind CSS', 'JavaScript'],
    image: '/lawapan.png',
    color: '#1a001a',
    accent: '#ff4db8',
    link: 'https://lawapan-logistics.vercel.app/',
    github: 'https://github.com/alzinan1234/lawapan-logistics',
  },
  {
    num: '06',
    name: 'ScoutLink MENA',
    desc: 'ScoutLink MENA is a robust, data-driven administrative dashboard designed for managing a high-traffic talent scouting or media platform. It features a dark-themed, "pixel-perfect" UI that provides real-time analytics, video moderation tools, and user growth tracking to streamline platform operations.',
    tags: ['Next.js', 'GSAP', 'React.js'],
    image: '/south-link.png',
    color: '#001a1a',
    accent: '#00e5ff',
    link: 'https://scout-link.vercel.app/admin',
    github: 'https://github.com/alzinan1234/ScoutLink',
  },
]

export default function Projects() {
  const [active, setActive]     = useState(0)
  const [prev, setPrev]         = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const selectedRef  = useRef<HTMLSpanElement>(null)
  const workRef      = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const imageRef     = useRef<HTMLDivElement>(null)
  const infoRef      = useRef<HTMLDivElement>(null)

  // slide to next/prev
  const goTo = (idx: number) => {
    if (animating || idx === active) return
    setAnimating(true)
    setPrev(active)

    // animate out current image + info
    if (imageRef.current && infoRef.current) {
      gsap.timeline()
        .to(imageRef.current, { x: -40, opacity: 0, duration: 0.3, ease: 'power2.in' })
        .to(infoRef.current,  { x: -20, opacity: 0, duration: 0.25, ease: 'power2.in' }, '<')
        .call(() => {
          setActive(idx)
          setPrev(null)
        })
        .set(imageRef.current, { x: 60 })
        .set(infoRef.current,  { x: 30 })
        .to(imageRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .to(infoRef.current,  { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.35')
        .call(() => setAnimating(false))
    }
  }

  const next = () => goTo((active + 1) % projects.length)
  const prev_ = () => goTo((active - 1 + projects.length) % projects.length)

  // ── same GSAP pattern as Hero ──
  useEffect(() => {
    gsap.set([selectedRef.current, workRef.current], { y: '110%' })
    gsap.set([tagRef.current, contentRef.current], { opacity: 0, y: 28 })

    const tl = gsap.timeline()
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      tl.to(tagRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(selectedRef.current, { y: '0%',          duration: 1.1, ease: 'power4.out' }, '-=0.3')
        .to(workRef.current,     { y: '0%',          duration: 1.1, ease: 'power4.out' }, '-=0.75')
        .to(contentRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    }, { threshold: 0.1 })
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
      const shakeInterval = setInterval(shakeBurst, 5000)

      const glitchBurst = () => {
        if (!glitchBarRef.current) return
        gsap.timeline()
          .set(glitchBarRef.current, { opacity: 1, scaleY: 0.04, y: `${10 + Math.random() * 70}%`, background: 'rgba(255,30,80,0.2)' })
          .to(glitchBarRef.current,  { opacity: 0, duration: 0.07 })
          .set(glitchBarRef.current, { opacity: 0.8, scaleY: 0.02, y: `${10 + Math.random() * 70}%`, background: 'rgba(0,210,255,0.15)' })
          .to(glitchBarRef.current,  { opacity: 0, duration: 0.09 })
      }
      const glitchInterval = setInterval(glitchBurst, 3000)

      if (scanlineRef.current) {
        gsap.fromTo(scanlineRef.current, { y: '-2px' }, { y: '100%', duration: 3.5, ease: 'none', repeat: -1, delay: 0.5 })
      }

      return () => { clearInterval(shakeInterval); clearInterval(glitchInterval); observer.disconnect() }
    }
    return () => observer.disconnect()
  }, [])

  // ── Autoplay effect ──
  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      goTo((active + 1) % projects.length)
    }, 5000)

    return () => clearInterval(autoplayTimer)
  }, [active, animating])

  const p = projects[active]

  return (
    <>
      <style>{`
        .proj-selected { display:block; color:#fff; animation: alFlicker 8s infinite; }
        @keyframes alFlicker {
          0%,94%,100%{opacity:1;} 95%{opacity:0.5;} 95.4%{opacity:1;} 95.8%{opacity:0.2;} 96.2%{opacity:1;}
        }
        .proj-work {
          position:relative; display:block;
          -webkit-text-stroke:1px rgba(255,255,255,0.2); color:transparent;
        }
        .proj-work::before,.proj-work::after {
          content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%; -webkit-text-stroke:0;
        }
        .proj-work::before { color:rgba(255,30,80,0.8); animation:rgbLeft 7s infinite; clip-path:polygon(0 10%,100% 10%,100% 38%,0 38%); }
        .proj-work::after  { color:rgba(0,210,255,0.8); animation:rgbRight 7s infinite; clip-path:polygon(0 58%,100% 58%,100% 82%,0 82%); }
        @keyframes rgbLeft  { 0%,85%,100%{transform:none;opacity:0;} 86%{transform:translateX(-8px) skewX(-3deg);opacity:1;} 88%{transform:translateX(4px);opacity:0.7;} 90%{transform:translateX(-3px);opacity:1;} 92%{transform:none;opacity:0;} }
        @keyframes rgbRight { 0%,87%,100%{transform:none;opacity:0;} 88%{transform:translateX(8px) skewX(3deg);opacity:1;} 90%{transform:translateX(-5px);opacity:0.7;} 92%{transform:translateX(2px);opacity:1;} 94%{transform:none;opacity:0;} }

        .proj-scanline   { position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(to right,transparent,rgba(255,255,255,0.06) 40%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 60%,transparent);pointer-events:none;z-index:5; }
        .proj-glitch-bar { position:absolute;left:-10%;width:120%;height:12px;pointer-events:none;z-index:6;opacity:0;mix-blend-mode:screen;top:0; }
        .proj-corner     { position:absolute;width:32px;height:32px;pointer-events:none;z-index:4; }
        .proj-corner.tl  { top:40px;left:60px;border-top:1px solid rgba(255,255,255,0.15);border-left:1px solid rgba(255,255,255,0.15); }
        .proj-corner.br  { bottom:40px;right:60px;border-bottom:1px solid rgba(255,255,255,0.15);border-right:1px solid rgba(255,255,255,0.15); }
        .proj-line       { display:block;overflow:hidden; }

        /* ── Image panel ── */
        .proj-image-panel {
          position:relative; width:100%; aspect-ratio:16/10;
          overflow:hidden; border:1px solid rgba(255,255,255,0.08);
        }
        .proj-image-panel .img-overlay {
          position:absolute;inset:0;z-index:2;
          background:linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%);
        }
        .proj-image-panel .img-num {
          position:absolute;bottom:16px;left:20px;z-index:3;
          font-family:var(--font-bebas);font-size:80px;line-height:1;
          color:rgba(255,255,255,0.06);pointer-events:none;user-select:none;
        }
        /* placeholder when no image */
        .proj-image-panel .img-placeholder {
          position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;
        }
        .proj-image-panel .img-placeholder p {
          font-family:var(--font-mono);font-size:10px;letter-spacing:3px;
          color:rgba(255,255,255,0.2);text-transform:uppercase;
        }
        /* accent glow bar at bottom of image */
        .proj-image-panel .img-accent {
          position:absolute;bottom:0;left:0;right:0;height:2px;z-index:4;
          transition:background 0.5s;
        }

        /* ── Tag pills ── */
        .proj-tag {
          font-family:var(--font-mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;
          padding:4px 12px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.35);
          transition:border-color 0.3s,color 0.3s;
        }
        .proj-tag:hover { border-color:rgba(255,255,255,0.35);color:rgba(255,255,255,0.8); }

        /* ── Nav buttons ── */
        .proj-nav-btn {
          width:48px;height:48px;border:1px solid rgba(255,255,255,0.15);
          display:flex;align-items:center;justify-content:center;
          background:transparent;cursor:none;
          transition:background 0.3s,border-color 0.3s,transform 0.2s;color:#fff;
        }
        .proj-nav-btn:hover { background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.4);transform:scale(1.05); }
        .proj-nav-btn:disabled { opacity:0.3;pointer-events:none; }

        /* ── Dot indicators ── */
        .proj-dot {
          height:2px;background:rgba(255,255,255,0.2);cursor:none;
          transition:background 0.3s,width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .proj-dot.active { background:#fff; }

        /* ── Link buttons ── */
        .proj-link-btn {
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;
          padding:12px 24px;text-decoration:none;
          transition:all 0.3s;position:relative;overflow:hidden;
        }
        .proj-link-btn.primary { background:#fff;color:#000; }
        .proj-link-btn.primary:hover { background:rgba(255,255,255,0.88);transform:translateY(-2px); }
        .proj-link-btn.outline { border:1px solid rgba(255,255,255,0.25);color:#fff; }
        .proj-link-btn.outline:hover { border-color:#fff;transform:translateY(-2px); }
        .proj-link-btn::after {
          content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          transition:left 0.5s ease;pointer-events:none;
        }
        .proj-link-btn:hover::after { left:150%; }

        /* ── Thumbnail strip ── */
        .proj-thumb {
          width:60px;height:40px;border:1px solid rgba(255,255,255,0.08);
          overflow:hidden;cursor:none;flex-shrink:0;
          transition:border-color 0.3s,transform 0.2s,opacity 0.3s;
          position:relative;opacity:0.45;
        }
        .proj-thumb:hover { opacity:0.75;transform:scale(1.05); }
        .proj-thumb.active-thumb { border-color:rgba(255,255,255,0.5);opacity:1; }

        @media(max-width:768px){
          .proj-corner.tl{left:24px;} .proj-corner.br{right:24px;}
          .proj-layout{grid-template-columns:1fr!important;}
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-[#050505]"
        style={{ position:'relative', overflow:'hidden' }}
      >
        <div ref={scanlineRef} className="proj-scanline" />
        <div ref={glitchBarRef} className="proj-glitch-bar" />
        <div className="proj-corner tl" />
        <div className="proj-corner br" />

        {/* tag */}
        <div ref={tagRef}><SectionTag label="Portfolio" /></div>

        {/* heading */}
        <h2
          ref={headingRef}
          style={{ fontFamily:'var(--font-bebas)', fontSize:'clamp(52px,7vw,100px)', lineHeight:1, letterSpacing:'-1px', marginBottom:'48px', willChange:'transform' }}
        >
          <span className="proj-line"><span ref={selectedRef} className="proj-selected">SELECTED</span></span>
          <span className="proj-line"><span ref={workRef} className="proj-work" data-text="WORK">WORK</span></span>
        </h2>

        {/* ── MAIN CONTENT ── */}
        <div ref={contentRef}>

          {/* Layout: image left, info right */}
          <div
            className="proj-layout grid gap-8 md:gap-12 items-start"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >

            {/* ── LEFT: Image panel ── */}
            <div ref={imageRef} className="proj-image-panel" style={{ background: p.color }}>
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  style={{ objectFit:'cover', objectPosition:'top' }}
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              ) : (
                /* Placeholder — remove once you add real images */
                <div className="img-placeholder" style={{ background: p.color }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity:0.12 }}>
                    <rect x="8" y="14" width="48" height="36" rx="2" stroke="white" strokeWidth="1.5"/>
                    <circle cx="22" cy="26" r="5" stroke="white" strokeWidth="1.5"/>
                    <path d="M8 40l14-10 10 8 8-6 14 10" stroke="white" strokeWidth="1.5"/>
                  </svg>
                  <p>Add screenshot here</p>
                  <p style={{ fontSize:8, opacity:0.5 }}>projects[{active}].image = &apos;/images/projects/...&apos;</p>
                </div>
              )}

              <div className="img-overlay" />
              <div className="img-num">{p.num}</div>
              <div className="img-accent" style={{ background: p.accent }} />
            </div>

            {/* ── RIGHT: Info panel ── */}
            <div ref={infoRef} style={{ display:'flex', flexDirection:'column', gap:24 }}>

              {/* counter */}
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', textTransform:'uppercase' }}>
                {String(active + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
              </div>

              {/* name */}
              <div style={{ fontFamily:'var(--font-bebas)', fontSize:'clamp(32px,3.5vw,52px)', lineHeight:1, letterSpacing:1, color:'#fff' }}>
                {p.name}
              </div>

              {/* accent line */}
              <div style={{ width:40, height:1, background: p.accent }} />

              {/* desc */}
              <p style={{ fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.45)', maxWidth:440 }}>
                {p.desc}
              </p>

              {/* tags */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {p.tags.map(tag => (
                  <span key={tag} className="proj-tag">{tag}</span>
                ))}
              </div>

              {/* links */}
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <a href={p.link} className="proj-link-btn primary" target="_blank" rel="noopener noreferrer">
                  <FiExternalLink size={13} /> Live Preview
                </a>
                <a href={p.github} className="proj-link-btn outline" target="_blank" rel="noopener noreferrer">
                  <FiGithub size={13} /> View Code
                </a>
              </div>

              {/* ── Nav controls ── */}
              <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:8 }}>
                <button className="proj-nav-btn" onClick={prev_} aria-label="Previous">
                  <FiArrowLeft size={18} />
                </button>
                <button className="proj-nav-btn" onClick={next} aria-label="Next">
                  <FiArrowRight size={18} />
                </button>

                {/* dot indicators */}
                <div style={{ display:'flex', gap:6, alignItems:'center', flex:1 }}>
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      className={`proj-dot ${i === active ? 'active' : ''}`}
                      style={{ width: i === active ? 24 : 12, border:'none', padding:0, cursor:'none' }}
                      onClick={() => goTo(i)}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── THUMBNAIL STRIP ── */}
          <div style={{ display:'flex', gap:8, marginTop:32, alignItems:'center' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.2)', textTransform:'uppercase', marginRight:8, whiteSpace:'nowrap' }}>
              All Projects
            </span>
            {projects.map((proj, i) => (
              <button
                key={i}
                className={`proj-thumb ${i === active ? 'active-thumb' : ''}`}
                onClick={() => goTo(i)}
                aria-label={proj.name}
                style={{ background: proj.color }}
              >
                {proj.image ? (
                  <Image src={proj.image} alt={proj.name} fill style={{ objectFit:'cover', objectPosition:'top' }} sizes="60px" />
                ) : (
                  <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:2, height:2, background: proj.accent, borderRadius:'50%', boxShadow:`0 0 6px ${proj.accent}` }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}