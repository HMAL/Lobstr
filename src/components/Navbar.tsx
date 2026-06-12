'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { label: 'Our Work', href: '/our-work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

type Position = { left: number; width: number; opacity: number }

function Tab({
  label,
  href,
  setPosition,
}: {
  label: string
  href: string
  setPosition: React.Dispatch<React.SetStateAction<Position>>
}) {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a
        href={href}
        className="block px-3.5 py-2 text-sm font-semibold uppercase text-gray-900 whitespace-nowrap"
      >
        {label}
      </a>
    </li>
  )
}

function SlidingCursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-gray-200"
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    />
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 })

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm md:bg-transparent md:backdrop-blur-none md:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <a
            href="/"
            className="group shrink-0 flex items-center gap-2.5 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1.5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <Image
              src="/logo-icon.png"
              alt="Mylobstr"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <div className="leading-none">
              <span className="text-[1rem] font-black tracking-tight text-gray-900">mylobstr</span>
              <span className="text-[1rem] font-black tracking-tight text-blue-600">.</span>
              <span className="text-[1rem] font-black tracking-tight text-gray-900">com</span>
            </div>
          </a>

          {/* Sliding pill nav — desktop */}
          <ul
            className="relative hidden md:flex w-fit rounded-full border-2 border-gray-900 bg-white p-1"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          >
            {links.map((link) => (
              <Tab key={link.label} {...link} setPosition={setPosition} />
            ))}
            <SlidingCursor position={position} />
          </ul>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-sm border border-gray-200"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors shadow-lg border border-gray-700 relative z-50"
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
