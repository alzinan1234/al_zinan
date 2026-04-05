'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import SectionTag from '@/components/ui/SectionTag'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

/* ─────────────────────────────────────────
   Projects Data — add up to 24+ projects
───────────────────────────────────────── */
const projects = [
  {
    num: '01',
    name: 'E-Commerce Platform',
    desc: 'Full-stack shopping platform with real-time inventory, WebSocket-powered cart, and seamless payment integration.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'WebSocket'],
    image: '/e-project.png',
    color: '#1a0a00',
    accent: '#ff6b00',
    link: 'https://hypertouchofficial.com/',
    github: 'https://github.com/alzinan1234/hyperTouch.com',
  },
  {
    num: '02',
    name: 'HRlynx — AI-powered HR Dashboard',
    desc: 'Real-time analytics dashboard with beautiful data visualizations, live updates and push notifications.',
    tags: ['Next.js', 'Framer Motion', 'WebSocket', 'Tailwind CSS'],
    image: '/hrlynx.png',
    color: '#000d1a',
    accent: '#00b4ff',
    link: 'https://dashboard.hrlynx.ai/',
    github: 'https://github.com/alzinan1234/hrai-admin',
  },
  {
    num: '03',
    name: 'TermSheetGenie FinTech',
    desc: 'Professional FinTech platform for venture capital firms to simulate investment scenarios and manage cap tables.',
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
    desc: 'Premium footwear collection with pixel-perfect visuals, dynamic hero sections, and interactive story cards.',
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
    desc: 'Comprehensive logistics platform connecting businesses with verified transporters for real-time shipment monitoring.',
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
    desc: 'Data-driven admin dashboard for talent scouting with real-time analytics, video moderation and user growth tracking.',
    tags: ['Next.js', 'GSAP', 'React.js'],
    image: '/south-link.png',
    color: '#001a1a',
    accent: '#00e5ff',
    link: 'https://scout-link.vercel.app/admin',
    github: 'https://github.com/alzinan1234/ScoutLink',
  },
  // ── Add more projects below — copy & paste the block ──
  // {
  //   num: '07',
  //   name: 'Project Name',
  //   desc: 'Short description of the project.',
  //   tags: ['Tag1', 'Tag2'],
  //   image: '/images/project7.png',
  //   color: '#0a0a1a',
  //   accent: '#ff0080',
  //   link: 'https://your-live-link.com',
  //   github: 'https://github.com/your-repo',
  // },
]

/* ─────────────────────────────────────────
   Project Card — used inside SwiperSlide
───────────────────────────────────────── */
function ProjectCard({ p }: { p: (typeof projects)[0] }) {
  return (
    <div className="proj-card">
      {/* ── Image ── */}
      <div className="proj-card-img" style={{ background: p.color }}>
        {p.image && (
          <Image
            src={p.image}
            alt={p.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
        {/* overlay */}
        <div className="proj-card-overlay" />
        {/* accent glow */}
        <div className="proj-card-accent" style={{ background: p.accent }} />
        {/* num watermark */}
        <div className="proj-card-num">{p.num}</div>
        {/* hover links */}
        <div className="proj-card-links">
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-icon-btn"
            onClick={e => e.stopPropagation()}
          >
            <FiExternalLink size={16} />
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-icon-btn"
            onClick={e => e.stopPropagation()}
          >
            <FiGithub size={16} />
          </a>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="proj-card-info">
        {/* accent line */}
        <div className="proj-card-info-accent" style={{ background: p.accent }} />

        <h3 className="proj-card-title">{p.name}</h3>
        <p className="proj-card-desc">{p.desc}</p>

        {/* tags */}
        <div className="proj-card-tags">
          {p.tags.map(t => (
            <span key={t} className="proj-tag" style={{ borderColor: p.accent + '44', color: p.accent }}>
              {t}
            </span>
          ))}
        </div>

        {/* bottom row */}
        <div className="proj-card-bottom">
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-live-btn">
            <FiExternalLink size={12} /> Live
          </a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-github-btn">
            <FiGithub size={12} /> Code
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
export default function Projects() {
  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const selectedRef  = useRef<HTMLSpanElement>(null)
  const workRef      = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set([selectedRef.current, workRef.current], { y: '110%' })
    gsap.set([tagRef.current, contentRef.current], { opacity: 0, y: 28 })

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      gsap.timeline()
        .to(tagRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
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
        /* ── Section decorative ── */
        .proj-scanline   { position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(to right,transparent,rgba(255,255,255,0.06) 40%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 60%,transparent);pointer-events:none;z-index:5; }
        .proj-glitch-bar { position:absolute;left:-10%;width:120%;height:12px;pointer-events:none;z-index:6;opacity:0;mix-blend-mode:screen;top:0; }
        .proj-corner     { position:absolute;width:32px;height:32px;pointer-events:none;z-index:4; }
        .proj-corner.tl  { top:40px;left:60px;border-top:1px solid rgba(255,255,255,0.15);border-left:1px solid rgba(255,255,255,0.15); }
        .proj-corner.br  { bottom:40px;right:60px;border-bottom:1px solid rgba(255,255,255,0.15);border-right:1px solid rgba(255,255,255,0.15); }
        .proj-line       { display:block;overflow:hidden; }

        /* ── Heading animations — identical to original ── */
        .proj-selected { display:block;color:#fff;animation:alFlicker 8s infinite; }
        @keyframes alFlicker { 0%,94%,100%{opacity:1;} 95%{opacity:0.5;} 95.4%{opacity:1;} 95.8%{opacity:0.2;} 96.2%{opacity:1;} }
        .proj-work { position:relative;display:block;-webkit-text-stroke:1px rgba(255,255,255,0.2);color:transparent; }
        .proj-work::before,.proj-work::after { content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;-webkit-text-stroke:0; }
        .proj-work::before { color:rgba(255,30,80,0.8);animation:rgbLeft 7s infinite;clip-path:polygon(0 10%,100% 10%,100% 38%,0 38%); }
        .proj-work::after  { color:rgba(0,210,255,0.8);animation:rgbRight 7s infinite;clip-path:polygon(0 58%,100% 58%,100% 82%,0 82%); }
        @keyframes rgbLeft  { 0%,85%,100%{transform:none;opacity:0;} 86%{transform:translateX(-8px) skewX(-3deg);opacity:1;} 88%{transform:translateX(4px);opacity:0.7;} 90%{transform:translateX(-3px);opacity:1;} 92%{transform:none;opacity:0;} }
        @keyframes rgbRight { 0%,87%,100%{transform:none;opacity:0;} 88%{transform:translateX(8px) skewX(3deg);opacity:1;} 90%{transform:translateX(-5px);opacity:0.7;} 92%{transform:translateX(2px);opacity:1;} 94%{transform:none;opacity:0;} }

        /* ── Swiper custom styles ── */
        .proj-swiper {
          width: 100%;
          padding: 20px 0 60px !important;
        }
        .proj-swiper .swiper-slide {
          height: auto;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .proj-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.55;
        }

        /* custom pagination */
        .proj-swiper .swiper-pagination {
          bottom: 8px !important;
        }
        .proj-swiper .swiper-pagination-bullet {
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.25);
          border-radius: 0;
          opacity: 1;
          transition: width 0.3s, background 0.3s;
        }
        .proj-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #fff;
          border-radius: 0;
        }

        /* custom nav arrows */
        .proj-swiper .swiper-button-prev,
        .proj-swiper .swiper-button-next {
          width: 48px; height: 48px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          color: #fff !important;
          transition: background 0.3s, border-color 0.3s;
          top: 38%;
        }
        .proj-swiper .swiper-button-prev:hover,
        .proj-swiper .swiper-button-next:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
        }
        .proj-swiper .swiper-button-prev::after,
        .proj-swiper .swiper-button-next::after {
          font-size: 14px !important;
          font-weight: 700;
        }

        /* ── Project Card ── */
        .proj-card {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.35s, transform 0.35s;
          height: 100%;
        }
        .proj-card:hover {
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-6px);
        }

        /* image container */
        .proj-card-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .proj-card-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.92) 100%);
          transition: opacity 0.3s;
        }
        .proj-card:hover .proj-card-overlay { opacity: 0.7; }
        .proj-card-accent {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; z-index: 4;
        }
        .proj-card-num {
          position: absolute; bottom: 10px; left: 16px; z-index: 3;
          font-family: var(--font-bebas); font-size: 64px; line-height: 1;
          color: rgba(255,255,255,0.06); pointer-events: none; user-select: none;
        }
        /* hover links over image */
        .proj-card-links {
          position: absolute; inset: 0; z-index: 5;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          opacity: 0; transition: opacity 0.3s;
        }
        .proj-card:hover .proj-card-links { opacity: 1; }
        .proj-icon-btn {
          width: 42px; height: 42px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .proj-icon-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: #fff;
          transform: scale(1.1);
        }

        /* info area */
        .proj-card-info {
          padding: 20px 20px 18px;
          display: flex; flex-direction: column; gap: 10px;
          flex: 1; position: relative;
        }
        .proj-card-info-accent {
          position: absolute; top: 0; left: 0;
          width: 40px; height: 2px; opacity: 0.8;
        }
        .proj-card-title {
          font-family: var(--font-bebas);
          font-size: clamp(20px, 2.2vw, 26px);
          line-height: 1.1; color: #fff; letter-spacing: 0.5px;
          margin: 0;
        }
        .proj-card-desc {
          font-size: 12px; line-height: 1.75;
          color: rgba(255,255,255,0.4);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .proj-card-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .proj-tag {
          font-family: var(--font-mono); font-size: 8px;
          letter-spacing: 2px; text-transform: uppercase;
          border: 1px solid; padding: 3px 8px;
        }
        .proj-card-bottom {
          display: flex; gap: 10px; margin-top: auto; padding-top: 4px;
        }
        .proj-live-btn, .proj-github-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none; padding: 8px 16px;
          transition: all 0.3s; border: 1px solid;
        }
        .proj-live-btn {
          background: #fff; color: #000; border-color: #fff;
        }
        .proj-live-btn:hover { background: rgba(255,255,255,0.85); transform: translateY(-2px); }
        .proj-github-btn {
          background: transparent; color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.2);
        }
        .proj-github-btn:hover {
          border-color: rgba(255,255,255,0.6);
          color: #fff; transform: translateY(-2px);
        }

        /* ── Counter ── */
        .proj-counter {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 3px; color: rgba(255,255,255,0.2);
          text-transform: uppercase; margin-bottom: 8px;
        }

        @media(max-width:640px){
          .proj-corner.tl { left: 24px; }
          .proj-corner.br { right: 24px; }
          .proj-swiper .swiper-button-prev,
          .proj-swiper .swiper-button-next { display: none; }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-[#050505]"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div ref={scanlineRef} className="proj-scanline" />
        <div ref={glitchBarRef} className="proj-glitch-bar" />
        <div className="proj-corner tl" />
        <div className="proj-corner br" />

        {/* ── Tag ── */}
        <div ref={tagRef}><SectionTag label="Portfolio" /></div>

        {/* ── Heading — identical to original ── */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(52px,7vw,100px)',
            lineHeight: 1,
            letterSpacing: '-1px',
            marginBottom: '12px',
            willChange: 'transform',
          }}
        >
          <span className="proj-line"><span ref={selectedRef} className="proj-selected">SELECTED</span></span>
          <span className="proj-line"><span ref={workRef} className="proj-work" data-text="WORK">WORK</span></span>
        </h2>

        {/* counter */}
        <p className="proj-counter">{String(projects.length).padStart(2,'0')} Projects</p>

        {/* ── Swiper Content ── */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <Swiper
            className="proj-swiper"
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 1.5,
              slideShadows: false,
            }}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            breakpoints={{
              640:  { slidesPerView: 1.2, spaceBetween: 20 },
              768:  { slidesPerView: 2,   spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 28 },
              1280: { slidesPerView: 3,   spaceBetween: 28 },
            }}
          >
            {projects.map((p, i) => (
              <SwiperSlide key={i} style={{ height: 'auto' }}>
                <ProjectCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}