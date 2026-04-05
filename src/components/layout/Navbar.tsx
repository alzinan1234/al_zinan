'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navLinks } from '@/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'px-6 md:px-[60px] py-4 border-b border-white/5'
            : 'px-6 md:px-[60px] py-6 border-b border-transparent'
        }`}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        {/* Logo */}
        <a
        className=' uppercase'
          href="#"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '28px',
            letterSpacing: '4px',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Al<span style={{ opacity: 0.4 }}>-</span>Zinan
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
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
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-block transition-all duration-300 hover:bg-white hover:text-black"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '10px 24px',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Hire Me
        </a>

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-none"
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

      {/* Mobile Menu */}
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
