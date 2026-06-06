'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

const links = [
  { label: 'Our Work', href: '/our-work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
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
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group shrink-0 bg-gray-900 border-2 border-gray-900 rounded-full px-3 py-1.5 hover:bg-gray-800 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Globe className="w-[14px] h-[14px] text-white" />
            </div>
            <div className="leading-none">
              <span className="text-[1rem] font-black tracking-tight text-white">mylobstr</span>
              <span className="text-[1rem] font-black tracking-tight text-blue-400">.</span>
              <span className="text-[1rem] font-black tracking-tight text-white">com</span>
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
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            {open ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
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
