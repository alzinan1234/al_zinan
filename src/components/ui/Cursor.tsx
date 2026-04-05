'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const follower = document.getElementById('cursor-follower')
    if (!cursor || !follower) return

    let mx = 0, my = 0, fx = 0, fy = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    const follow = () => {
      fx += (mx - fx) * 0.12
      fy += (my - fy) * 0.12
      follower.style.left = fx + 'px'
      follower.style.top = fy + 'px'
      requestAnimationFrame(follow)
    }

    document.addEventListener('mousemove', onMove)
    follow()

    const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'
        follower.style.transform = 'translate(-50%,-50%) scale(1.4)'
        follower.style.opacity = '0.5'
      })
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)'
        follower.style.transform = 'translate(-50%,-50%) scale(1)'
        follower.style.opacity = '1'
      })
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-follower" />
    </>
  )
}
