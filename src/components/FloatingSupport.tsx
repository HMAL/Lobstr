'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, PawPrint } from 'lucide-react'

export default function FloatingSupport() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!message.trim()) return
    setSent(true)
    setMessage('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-3xl shadow-2xl shadow-black/20 border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-coral-teal p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Mylobstr Support</p>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    Online · Replies in &lt;3 min
                  </div>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="p-4 space-y-3 bg-slate-50/50 min-h-[120px]">
              <div className="flex gap-2">
                <div className="w-7 h-7 gradient-coral-teal rounded-full flex items-center justify-center text-sm shrink-0">
                  🐾
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-foreground shadow-sm max-w-[200px]">
                  Hi! 👋 Ready to build your pet business website? Ask us anything!
                </div>
              </div>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 gradient-coral-teal rounded-full flex items-center justify-center text-sm shrink-0">
                    🐾
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-foreground shadow-sm max-w-[200px]">
                    Thanks! A real team member will respond right away. 🎉
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 text-sm px-3 py-2 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30"
                />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  className="w-9 h-9 gradient-coral-teal rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Available 24/7 — No bots 🤝
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close support chat' : 'Open support chat'}
        aria-expanded={open}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 gradient-coral-teal rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#FF6B6B]/30 relative"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse indicator */}
        {!open && (
          <>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
          </>
        )}
      </motion.button>
    </div>
  )
}
