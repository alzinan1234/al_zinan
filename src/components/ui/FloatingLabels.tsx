'use client'

export default function FloatingLabels() {
  return (
    <>
      <div
        className="fixed top-10 left-[60px] z-50 pointer-events-none hidden md:block"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
        }}
      >
        Dhaka, BD
      </div>
      <div
        className="fixed top-10 right-[60px] z-50 pointer-events-none hidden md:block"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
        }}
      >
        Available for Work
      </div>
    </>
  )
}
