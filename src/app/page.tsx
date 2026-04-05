'use client'

import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
import FloatingLabels from '@/components/ui/FloatingLabels'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import Education from '@/components/sections/Education'

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <FloatingLabels />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
