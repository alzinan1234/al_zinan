'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const roles = [
  'Frontend Developer',
  'Web Developer',
  'React Specialist',
  "Next.js Enthusiast",
  'Full Stack Developer',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const heroNameRef = useRef<HTMLHeadingElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)

  // Three.js
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let animId: number
    let cleanup: (() => void) | undefined

    import('three').then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 30

      const count = 2000
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 100
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.5 })
      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      const grid = new THREE.GridHelper(80, 20, 0x111111, 0x111111)
      grid.position.y = -10
      scene.add(grid)

      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => {

        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2

      }
      window.addEventListener('mousemove', onMouse)

      const animate = () => {
        
        animId = requestAnimationFrame(animate)
        particles.rotation.y += 0.0008
        particles.rotation.x += 0.0002
        camera.position.x += (mx * 3 - camera.position.x) * 0.03
        camera.position.y += (-my * 2 - camera.position.y) * 0.03
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(animId)
        renderer.dispose()
      }
    })

    return () => {
      cancelAnimationFrame(animId)
      cleanup?.()
    }
  }, [])

  // GSAP Hero Entrance + Advanced Animations
  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current], { y: '110%' })
    gsap.set([tagRef.current, descRef.current, btnsRef.current], { opacity: 0, y: 28 })
    gsap.set(roleRef.current, { opacity: 0 })
    if (statsRef.current?.children) {
      gsap.set(Array.from(statsRef.current.children), { opacity: 0, y: 20 })
    }

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(line1Ref.current, { y: '0%', duration: 1.1, ease: 'power4.out' }, '-=0.3')
      .to(line2Ref.current, { y: '0%', duration: 1.1, ease: 'power4.out' }, '-=0.75')
      .to(roleRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')

    if (statsRef.current?.children) {
      tl.to(Array.from(statsRef.current.children), {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
      }, '-=0.5')
    }

    // ── Subtle idle vibration on hero name ──
    tl.call(() => {
      if (!heroNameRef.current) return
      gsap.to(heroNameRef.current, {
        x: () => (Math.random() - 0.5) * 1.5,
        y: () => (Math.random() - 0.5) * 0.8,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })

      // Intense shake burst every 5s
      const shakeBurst = () => {
        if (!heroNameRef.current) return
        gsap.timeline()
          .to(heroNameRef.current, { x: -8, skewX: -1, duration: 0.05, ease: 'none' })
          .to(heroNameRef.current, { x: 8, skewX: 1, duration: 0.05, ease: 'none' })
          .to(heroNameRef.current, { x: -5, skewX: 0, duration: 0.05, ease: 'none' })
          .to(heroNameRef.current, { x: 5, duration: 0.05, ease: 'none' })
          .to(heroNameRef.current, { x: -2, duration: 0.04, ease: 'none' })
          .to(heroNameRef.current, { x: 0, duration: 0.04, ease: 'none' })
      }

      const shakeInterval = setInterval(shakeBurst, 5000)
      return () => clearInterval(shakeInterval)
    }, [], '+=0.3')

    // ── Glitch bar flash ──
    const glitchBurst = () => {
      if (!glitchBarRef.current) return
      gsap.timeline()
        .set(glitchBarRef.current, { opacity: 1, scaleY: 0.04, y: `${10 + Math.random() * 70}%`, background: 'rgba(255,50,100,0.2)' })
        .to(glitchBarRef.current, { opacity: 0, duration: 0.07 })
        .set(glitchBarRef.current, { opacity: 0.8, scaleY: 0.02, y: `${10 + Math.random() * 70}%`, background: 'rgba(0,200,255,0.15)' })
        .to(glitchBarRef.current, { opacity: 0, duration: 0.09 })
    }
    const glitchInterval = setInterval(glitchBurst, 3000)

    // ── Scanline sweep ──
    if (scanlineRef.current) {
      gsap.fromTo(scanlineRef.current,
        { y: '-2px' },
        { y: '100vh', duration: 3.5, ease: 'none', repeat: -1, delay: 0.8 }
      )
    }

    // Typing role
    let ri = 0
    const typeRole = () => {
      if (!roleRef.current) return
      const role = roles[ri % roles.length]
      gsap.to(roleRef.current, {
        duration: 0.05 * role.length,
        text: role,
        ease: 'none',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(roleRef.current, {
              duration: 0.03 * role.length,
              text: '',
              ease: 'none',
              onComplete: () => { ri++; typeRole() },
            })
          }, 1800)
        },
      })
    }
    setTimeout(typeRole, 2200)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <>
      <style>{`
        /* ─── RGB SPLIT — ZINAN ─── */
        .hero-zinan {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.45);
          color: transparent;
        }
        .hero-zinan::before,
        .hero-zinan::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .hero-zinan::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .hero-zinan::after {
          color: rgba(0, 210, 255, 0.8);
          animation: rgbRight 7s infinite;
          clip-path: polygon(0 58%, 100% 58%, 100% 82%, 0 82%);
        }
        @keyframes rgbLeft {
          0%,85%,100% { transform: none; opacity: 0; }
          86%          { transform: translateX(-8px) skewX(-3deg); opacity: 1; }
          88%          { transform: translateX(4px); opacity: 0.7; }
          90%          { transform: translateX(-3px); opacity: 1; }
          92%          { transform: none; opacity: 0; }
        }
        @keyframes rgbRight {
          0%,87%,100% { transform: none; opacity: 0; }
          88%         { transform: translateX(8px) skewX(3deg); opacity: 1; }
          90%         { transform: translateX(-5px); opacity: 0.7; }
          92%         { transform: translateX(2px); opacity: 1; }
          94%         { transform: none; opacity: 0; }
        }

        /* ─── AL flicker ─── */
        .hero-al {
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

        /* ─── Scanline ─── */
        .hero-scanline {
          position: absolute;
          left: 0; right: 0;
          top: 0;
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

        /* ─── Glitch bar ─── */
        .hero-glitch-bar {
          position: absolute;
          left: -10%;
          width: 120%;
          height: 12px;
          pointer-events: none;
          z-index: 6;
          opacity: 0;
          mix-blend-mode: screen;
          top: 0;
        }

        /* ─── Role cursor ─── */
        .role-type::after {
          content: '_';
          display: inline-block;
          animation: cursorBlink 0.75s step-end infinite;
          color: rgba(255,255,255,0.5);
          margin-left: 1px;
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* ─── Button shimmer ─── */
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .btn-shimmer:hover::after { left: 150%; }

        /* ─── Corner marks ─── */
        .hero-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .hero-corner.tl {
          top: 84px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.18);
          border-left: 1px solid rgba(255,255,255,0.18);
        }
        .hero-corner.br {
          bottom: 84px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          border-right: 1px solid rgba(255,255,255,0.18);
        }

        /* ─── scrollLine ─── */
        @keyframes scrollLine {
          0%,100% { transform: scaleY(0); transform-origin: top; }
          50%      { transform: scaleY(1); transform-origin: top; }
        }

        /* ─── Stat hover shake ─── */
        .stat-num-wrap:hover {
          animation: statPunch 0.25s ease;
        }
        @keyframes statPunch {
          0%,100% { transform: none; }
          30%      { transform: translateX(-4px); }
          70%      { transform: translateX(4px); }
        }

        /* mobile */
        @media(max-width:768px){
          .hero-corner.tl { left:24px; }
          .hero-corner.br { right:24px; }
        }
      `}</style>

      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* Three.js Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0.6, zIndex: 0 }} />

        {/* Scanline */}
        <div ref={scanlineRef} className="hero-scanline" />

        {/* Glitch bar */}
        <div ref={glitchBarRef} className="hero-glitch-bar" />

        {/* Corner marks */}
        <div className="hero-corner tl" />
        <div className="hero-corner br" />

        {/* ── CONTENT ── */}
        <div style={{ position: 'relative', zIndex: 10 }}>

          {/* Tag */}
          <div
            ref={tagRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '4px',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(255,255,255,0.25)' }} />
           Web Developer
            <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          </div>

          {/* NAME */}
          <h1
            ref={heroNameRef}
            className="hero-name"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(80px, 12vw, 180px)',
              lineHeight: 0.9,
              letterSpacing: '-2px',
              margin: 0,
              willChange: 'transform',
            }}
          >
            {/* AL */}
            <span className="line" id="heroLine1" style={{ display: 'block', overflow: 'hidden' }}>
              <span ref={line1Ref} className="hero-al">AL</span>
            </span>

            {/* ZINAN with RGB split */}
            <span className="line stroke glitch" style={{ display: 'block', overflow: 'hidden' }}>
              <span
                ref={line2Ref}
                className="hero-zinan glitch"
                data-text="ZINAN"
              >
                ZINAN
              </span>
            </span>
          </h1>

          {/* Role */}
          <div
            ref={roleRef}
            className="hero-role role-type"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              letterSpacing: '3px',
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
              marginTop: '24px',
              minHeight: '20px',
            }}
          />

          {/* Desc */}
          <p
            ref={descRef}
            style={{
              maxWidth: 480,
              marginTop: 32,
              fontSize: 15,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 300,
            }}
          >
            Crafting digital experiences with clean code, bold design,
            and modern technologies. 3–4 years turning ideas into production-ready products.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} style={{ display: 'flex', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              className="btn-shimmer btn-primary"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '16px 36px',
                background: '#fff',
                color: '#000',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'transform 0.3s, opacity 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="btn-shimmer btn-outline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '16px 36px',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          ref={statsRef}
          className="hero-stats"
          style={{
            position: 'absolute',
            right: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            zIndex: 10,
          }}
        >
          {[
            { num: '30+', label: 'Projects' },
            { num: '4yr', label: 'Experience' },
            { num: '15+', label: 'Technologies' },
          ].map((s) => (
            <div key={s.label} className="stat" style={{ textAlign: 'right' }}>
              <div
                className="stat-num stat-num-wrap"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', lineHeight: 1, color: '#fff', cursor: 'default' }}
              >
                {s.num}
              </div>
              <div
                className="stat-label"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── SCROLL HINT ── */}
        <div
          className="hero-scroll"
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '3px',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            zIndex: 10,
          }}
        >
          Scroll
          <span
            style={{
              display: 'block',
              width: 1,
              height: 60,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>
    </>
  )
}