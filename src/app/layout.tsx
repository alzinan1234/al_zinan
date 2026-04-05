import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Al Zinan — Web Developer',
  description: 'Full Stack Web Developer from Dhaka, Bangladesh. Specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: ['Al Zinan', 'Full Stack Developer', 'React', 'Next.js', 'Web Developer', 'Dhaka', 'Bangladesh'],
  authors: [{ name: 'Al Zinan' }],
  openGraph: {
    title: 'Al Zinan — Web Developer',
    description: 'Crafting digital experiences with clean code, bold design, and modern technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
