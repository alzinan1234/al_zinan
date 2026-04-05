'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SectionTag from '@/components/ui/SectionTag'
import { FiMail, FiMapPin, FiBriefcase, FiSend } from 'react-icons/fi'

const contactInfo = [
  { icon: FiMail,      label: 'Email',        value: 'alzinan314@gmail.com' },
  { icon: FiMapPin,    label: 'Location',     value: 'Mohakhali, Dhaka, Bangladesh' },
  { icon: FiBriefcase, label: 'Availability', value: 'Open to Freelance & Full-time' },
]

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  padding: '14px 18px',
  color: '#fff',
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.3s',
}

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  const sectionRef   = useRef<HTMLElement>(null)
  const scanlineRef  = useRef<HTMLDivElement>(null)
  const glitchBarRef = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLDivElement>(null)
  const letsRef      = useRef<HTMLSpanElement>(null)
  const workRef      = useRef<HTMLSpanElement>(null)
  const togetherRef  = useRef<HTMLSpanElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const infoRef      = useRef<HTMLDivElement>(null)
  const formRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── same initial states as Hero ──
    gsap.set([letsRef.current, workRef.current, togetherRef.current], { y: '110%' })
    gsap.set([tagRef.current, infoRef.current, formRef.current], { opacity: 0, y: 28 })

    const tl = gsap.timeline()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        tl.to(tagRef.current,      { opacity: 1, y: 0, duration: 0.7,  ease: 'power3.out' })
          .to(letsRef.current,     { y: '0%',          duration: 1.1,  ease: 'power4.out' }, '-=0.3')
          .to(workRef.current,     { y: '0%',          duration: 1.1,  ease: 'power4.out' }, '-=0.75')
          .to(togetherRef.current, { y: '0%',          duration: 1.1,  ease: 'power4.out' }, '-=0.75')
          .to(infoRef.current,     { opacity: 1, y: 0, duration: 0.8,  ease: 'power3.out' }, '-=0.5')
          .to(formRef.current,     { opacity: 1, y: 0, duration: 0.8,  ease: 'power3.out' }, '-=0.6')

        // stagger contact info rows
        if (infoRef.current) {
          const rows = infoRef.current.querySelectorAll('.contact-row')
          gsap.fromTo(rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <>
      <style>{`
        /* LET'S — same flicker as AL / WHO / MY / SELECTED */
        .contact-lets {
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

        /* WORK — same RGB split */
        .contact-work {
          position: relative;
          display: block;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .contact-work::before,
        .contact-work::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          -webkit-text-stroke: 0;
        }
        .contact-work::before {
          color: rgba(255, 30, 80, 0.8);
          animation: rgbLeft 7s infinite;
          clip-path: polygon(0 10%, 100% 10%, 100% 38%, 0 38%);
        }
        .contact-work::after {
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

        /* TOGETHER — same flicker as LET'S */
        .contact-together {
          display: block;
          color: #fff;
          animation: alFlicker 8s infinite;
          animation-delay: 0.5s;
        }

        /* scanline */
        .contact-scanline {
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
        .contact-glitch-bar {
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
        .contact-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
          z-index: 4;
        }
        .contact-corner.tl {
          top: 40px; left: 60px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }
        .contact-corner.br {
          bottom: 40px; right: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-right: 1px solid rgba(255,255,255,0.15);
        }

        /* clip-reveal line */
        .contact-line {
          display: block;
          overflow: hidden;
        }

        /* btn shimmer */
        .contact-btn {
          position: relative;
          overflow: hidden;
        }
        .contact-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .contact-btn:hover::after { left: 150%; }

        @media(max-width:768px){
          .contact-corner.tl { left: 24px; }
          .contact-corner.br { right: 24px; }
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="px-6 md:px-[60px] py-28 md:py-[120px] bg-[#050505] border-t border-white/5"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* same decorative elements as Hero */}
        <div ref={scanlineRef} className="contact-scanline" />
        <div ref={glitchBarRef} className="contact-glitch-bar" />
        <div className="contact-corner tl" />
        <div className="contact-corner br" />

        {/* tag */}
        <div ref={tagRef}>
          <SectionTag label="Contact" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── LEFT ── */}
          <div>
            {/* heading — exact same structure as Hero h1 */}
            <div
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(60px, 8vw, 120px)',
                lineHeight: 0.95,
                letterSpacing: '-2px',
                marginBottom: 40,
                willChange: 'transform',
              }}
            >
              {/* LET'S — clip-reveal + flicker */}
              <span className="contact-line">
                <span ref={letsRef} className="contact-lets">LET&apos;S</span>
              </span>

              {/* WORK — clip-reveal + RGB split */}
              <span className="contact-line">
                <span ref={workRef} className="contact-work" data-text="WORK">WORK</span>
              </span>

              {/* TOGETHER — clip-reveal + flicker */}
              <span className="contact-line">
                <span ref={togetherRef} className="contact-together">TOGETHER</span>
              </span>
            </div>

            {/* contact info rows */}
            <div ref={infoRef} className="flex flex-col gap-0">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="contact-row flex items-center gap-4 py-4 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 border"
                    style={{ width: 40, height: 40, borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <item.icon size={16} color="rgba(255,255,255,0.5)" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9,
                      letterSpacing: 2, color: 'rgba(255,255,255,0.25)',
                      textTransform: 'uppercase',
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Form ── */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: 3, textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  Your Name
                </label>
                <input
                  name="name" type="text" placeholder="Al Zinan"
                  value={form.name} onChange={handleChange}
                  style={inputStyle} required
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: 3, textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  Email Address
                </label>
                <input
                  name="email" type="email" placeholder="alzinan314@gmail.com"
                  value={form.email} onChange={handleChange}
                  style={inputStyle} required
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: 3, textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  Message
                </label>
                <textarea
                  name="message" placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange}
                  rows={5} style={{ ...inputStyle, resize: 'none' }} required
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="contact-btn flex items-center gap-3 self-start"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                  background: sent ? 'rgba(255,255,255,0.85)' : '#fff',
                  color: '#000',
                  border: 'none',
                  cursor: 'none',
                  transition: 'opacity 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <FiSend size={14} />
                {sent ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}