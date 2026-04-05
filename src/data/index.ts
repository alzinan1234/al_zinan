// src/data/index.ts

export const skills = [
  { icon: '🌐', name: 'HTML5', cat: 'Markup', level: 94 },
  { icon: '🎨', name: 'CSS3', cat: 'Styling', level: 92 },
  { icon: '💨', name: 'Tailwind CSS', cat: 'Framework', level: 90 },
  { icon: '🅱️', name: 'Bootstrap', cat: 'Framework', level: 85 },
  { icon: '⚡', name: 'JavaScript', cat: 'Language', level: 96 },
  { icon: '⚛️', name: 'React.js', cat: 'Library', level: 93 },
  { icon: '▲', name: 'Next.js', cat: 'Framework', level: 89 },
  { icon: '🟢', name: 'Node.js', cat: 'Backend', level: 82 },
  { icon: '🍃', name: 'MongoDB', cat: 'Database', level: 80 },
  { icon: '🔌', name: 'WebSocket', cat: 'Real-time', level: 78 },
  { icon: '🎭', name: 'GSAP', cat: 'Animation', level: 87 },
  { icon: '🎞️', name: 'Framer Motion', cat: 'Animation', level: 85 },
  { icon: '🐜', name: 'Ant Design', cat: 'UI Library', level: 80 },
  { icon: '🎨', name: 'Figma', cat: 'Design', level: 88 },
  { icon: '🔄', name: 'AOS', cat: 'Animation', level: 82 },
  { icon: '🔷', name: 'Three.js', cat: '3D', level: 75 },
]

export const projects = [
  {
    num: '01',
    name: 'E-Commerce Platform',
    desc: 'Full-stack shopping platform with real-time inventory, WebSocket-powered cart, and seamless payment integration.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'WebSocket'],
    icon: '🛒',
    link: '#',
    github: '#',
  },
  {
    num: '02',
    name: 'Social Dashboard',
    desc: 'Real-time analytics dashboard with beautiful data visualizations, live updates and collaborative features.',
    tags: ['React.js', 'GSAP', 'WebSocket', 'Ant Design'],
    icon: '📊',
    link: '#',
    github: '#',
  },
  {
    num: '03',
    name: 'Portfolio CMS',
    desc: 'A headless CMS-powered portfolio builder with drag-and-drop interface and instant preview capabilities.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    icon: '💼',
    link: '#',
    github: '#',
  },
  {
    num: '04',
    name: 'Chat Application',
    desc: 'End-to-end encrypted real-time messaging app with voice notes, file sharing and group conversations.',
    tags: ['React.js', 'WebSocket', 'Node.js', 'MongoDB'],
    icon: '💬',
    link: '#',
    github: '#',
  },
  {
    num: '05',
    name: 'Design System',
    desc: 'Custom UI component library with 60+ components, dark/light themes, and full accessibility compliance.',
    tags: ['React.js', 'Figma', 'Storybook', 'TypeScript'],
    icon: '🎨',
    link: '#',
    github: '#',
  },
  {
    num: '06',
    name: '3D Landing Page',
    desc: 'Immersive 3D experience for a product launch, featuring particle animations and interactive WebGL scenes.',
    tags: ['Three.js', 'GSAP', 'React.js', 'Framer Motion'],
    icon: '🌐',
    link: '#',
    github: '#',
  },
]

export const timeline = [
  {
    year: '2024 — Present',
    title: 'Senior Frontend Developer',
    company: 'Freelance & Contract',
    desc: 'Building production-grade web applications for international clients. Specializing in React, Next.js, and immersive UI with GSAP and Three.js.',
  },
  {
    year: '2023 — 2024',
    title: 'Full Stack Developer',
    company: 'Tech Startup — Dhaka',
    desc: 'Led frontend architecture for a SaaS platform serving 10,000+ users. Implemented real-time features with WebSocket and optimized performance by 60%.',
  },
  {
    year: '2022 — 2023',
    title: 'Frontend Developer',
    company: 'Web Agency',
    desc: 'Crafted responsive, pixel-perfect interfaces for 20+ client projects. Mastered Tailwind CSS, Bootstrap, and modern JavaScript patterns.',
  },
  {
    year: '2021 — 2022',
    title: 'Learning & Building',
    company: 'Self-taught Journey',
    desc: 'Dove deep into HTML, CSS, JavaScript. Built dozens of projects, contributed to open source, and developed a strong foundation in React.js.',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'FiGithub' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'FiLinkedin' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'FiTwitter' },
  { label: 'Instagram', href: 'https://instagram.com/', icon: 'FiInstagram' },
]

export const marqueeItems = [
  'Next.js', 'React.js', 'Node.js', 'MongoDB', 'GSAP',
  'Three.js', 'Framer Motion', 'Tailwind CSS', 'WebSocket', 'Figma',
]
