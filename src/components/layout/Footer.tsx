'use client'

import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com/' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com/' },
]

export default function Footer() {
  return (
    <footer>
      {/* Social Strip */}
      <div className="flex flex-wrap border-t border-white/5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[50%] md:min-w-0 p-6 flex flex-col items-center gap-2 border-r border-white/5 last:border-r-0 transition-all duration-300 hover:bg-white/[0.03] group"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
            }}
          >
            <s.icon
              size={20}
              className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            />
            {s.label}
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-[60px] py-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5">
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          © 2025 Al Zinan. All rights reserved.
        </p>
        <div
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '20px',
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          AL ZINAN
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          Made with ♥ in Dhaka
        </p>
      </div>
    </footer>
  )
}
