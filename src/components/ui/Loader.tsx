'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => setVisible(false),
          })
        }, 300)
      }
      setCount(current)
      if (barRef.current) barRef.current.style.width = current + '%'
    }, 40)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div
      ref={loaderRef}
      id="loader"
      className="fixed inset-0 bg-black z-[10000] flex items-center justify-center flex-col gap-6"
    >
      <div
        className="overflow-hidden"
        style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', letterSpacing: '-2px' }}
      >
        AZ
      </div>
      <div className="w-[200px] h-px bg-white/10">
        <div ref={barRef} className="exp-fill" />
      </div>
      <div
        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)' }}
      >
        {String(count).padStart(3, '0')}
      </div>
    </div>
  )
}
