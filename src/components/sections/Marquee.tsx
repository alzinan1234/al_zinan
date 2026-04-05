'use client'

import { marqueeItems } from '@/data'

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div
      className="border-t border-b overflow-hidden py-5"
      style={{ borderColor: 'rgba(139, 139, 139, 0.06)', background: '#0a0a0a' }}
    >
      <div
        className="flex gap-[60px] animate-marquee hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-[60px] whitespace-nowrap select-none"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '18px',
              letterSpacing: '4px',
              color: 'rgb(255, 255, 255)',
              textTransform: 'uppercase',
            }}
          >
            {item}
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
