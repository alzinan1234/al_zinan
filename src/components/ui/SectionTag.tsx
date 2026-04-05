'use client'

interface SectionTagProps {
  label: string
}

export default function SectionTag({ label }: SectionTagProps) {
  return (
    <div
      className="flex items-center gap-3 mb-4"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '4px',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.15)' }}>[</span>
      {label}
      <span style={{ color: 'rgba(255,255,255,0.15)' }}>]</span>
    </div>
  )
}
