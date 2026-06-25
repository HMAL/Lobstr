import Link from 'next/link'
import { ArrowLeft, Globe } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
          <Globe className="w-[18px] h-[18px] text-white" />
        </div>
        <span className="font-bold text-base text-white">
          mylobstr<span className="text-blue-400">.</span>com
        </span>
      </Link>

      {/* 404 */}
      <p className="text-8xl font-bold text-white/10 leading-none mb-4 select-none">404</p>
      <h1 className="text-3xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-white/50 text-base max-w-sm mb-10">
        This page doesn&apos;t exist or has moved. Let&apos;s get you back to something useful.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/10"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
