'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { navLinks } from '@/data'

gsap.registerPlugin(TextPlugin)

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  // refs — same pattern as Hero
  const logoRef      = useRef<HTMLAnchorElement>(null)
  const alRef        = useRef<HTMLSpanElement>(null)
  const zinanRef     = useRef<HTMLSpanElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)

  // scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Logo animations — clip-reveal entrance only ──
  useEffect(() => {
    // clip-reveal entrance — same y:'110%' pattern
    gsap.set([alRef.current, zinanRef.current], { y: '110%' })

    gsap.timeline({ delay: 0.1 })
      .to(alRef.current,    { y: '0%', duration: 1.0, ease: 'power4.out' })
      .to(zinanRef.current, { y: '0%', duration: 1.0, ease: 'power4.out' }, '-=0.7')
  }, [])

  return (
    <>
      <style>{`
        /* ── AL — same flicker as hero-al ── */
        .logo-al {
          display: inline-block;
          color: #fff;
          animation: alFlicker 8s infinite;
        }
        @keyframes alFlicker {
          0%,94%,100% { opacity: 1; }
          95%          { opacity: 0.4; }
          95.4%        { opacity: 1; }
          95.8%        { opacity: 0.15; }
          96.2%        { opacity: 1; }
        }

        /* ── ZINAN — same RGB split as hero-zinan ── */
        .logo-zinan {
          position: relative;
          display: inline-block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.35);
          color: transparent;
        }
        .logo-zinan::before,
        .logo-zinan::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .logo-zinan::before {
          color: rgba(255, 30, 80, 0.85);
          animation: logoRgbLeft 7s infinite;
          clip-path: polygon(0 5%, 100% 5%, 100% 45%, 0 45%);
        }
        .logo-zinan::after {
          color: rgba(0, 210, 255, 0.85);
          animation: logoRgbRight 7s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 95%, 0 95%);
        }
        @keyframes logoRgbLeft {
          0%,85%,100% { transform: none; opacity: 0; }
          86%          { transform: translateX(-5px) skewX(-2deg); opacity: 1; }
          88%          { transform: translateX(3px); opacity: 0.7; }
          90%          { transform: translateX(-2px); opacity: 1; }
          92%          { transform: none; opacity: 0; }
        }
        @keyframes logoRgbRight {
          0%,87%,100% { transform: none; opacity: 0; }
          88%          { transform: translateX(5px) skewX(2deg); opacity: 1; }
          90%          { transform: translateX(-3px); opacity: 0.7; }
          92%          { transform: translateX(1px); opacity: 1; }
          94%          { transform: none; opacity: 0; }
        }

        /* ── separator dash ── */
        .logo-dash {
          display: inline-block;
          color: rgba(255,255,255,0.25);
          animation: dashPulse 4s ease-in-out infinite;
          margin: 0 1px;
        }
        @keyframes dashPulse {
          0%,100% { opacity: 0.25; }
          50%      { opacity: 0.6; }
        }

        /* ── logo clip lines (overflow:hidden wrappers) ── */
        .logo-line { display: inline-block; overflow: hidden; vertical-align: bottom; }

        /* ── glitch bar on logo hover zone ── */
        .logo-glitch-bar {
          position: absolute;
          left: -4px; right: -4px;
          height: 6px;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: screen;
          top: 0;
        }

        /* ── nav link active underline ── */
        .nav-link-wrap {
          position: relative;
          display: inline-block;
        }
        .nav-link-wrap::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #fff;
          transition: width 0.3s ease;
        }
        .nav-link-wrap:hover::after { width: 100%; }

        /* ── mobile menu ── */
        .mobile-menu {
          position: fixed; inset: 0;
          background: #000;
          z-index: 999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 32px;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.77,0,0.175,1);
        }
        .mobile-menu.open { transform: translateX(0); }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center transition-all duration-500 ${
          scrolled ? 'px-6 md:px-[60px] py-4 border-b border-white/5'
                   : 'px-6 md:px-[60px] py-6 border-b border-transparent'
        }`}
        style={{
          background:    scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        {/* ── LOGO ── */}
        <a
          ref={logoRef}
          href="#"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '28px',
            letterSpacing: '4px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 0,
            position: 'relative',
            willChange: 'transform',
          }}
        >
          {/* glitch bar inside logo */}
          <div ref={glitchBarRef} className="logo-glitch-bar" />

          {/* AL — clip-reveal + flicker */}
          <span className="logo-line">
            <span ref={alRef} className="logo-al">AL</span>
          </span>

          {/* dash */}
          <span className="logo-dash">-</span>

          {/* ZINAN — clip-reveal + RGB split */}
          <span className="logo-line">
            <span ref={zinanRef} className="logo-zinan" data-text="ZINAN">ZINAN</span>
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <span className="nav-link-wrap">
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s',
                    display: 'block',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.label}
                </a>
              </span>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <a
          href="#contact"
          className="hidden md:inline-block"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '10px 24px',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#fff'
            e.currentTarget.style.color = '#000'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Hire Me
        </a>

        {/* ── Mobile Hamburger ── */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none"
          style={{ cursor: 'none' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
          />
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
          />
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '48px',
              letterSpacing: '4px',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}