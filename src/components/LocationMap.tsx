'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function LocationMap() {
  return (
    <section id="location" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Find Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Rooted in
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Albany, NY</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            We're a local team. We work where you work, live where you live —
            and we're always just a text away.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93773.73252440745!2d-73.87798949999999!3d42.6663957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0a34cc4ffbe9%3A0x5cc2d1b8a31ef88!2sAlbany%2C%20NY!5e0!3m2!1sen!2sus!4v1717600000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Albany NY location"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {[
              {
                icon: MapPin,
                label: 'Based in',
                value: 'Albany, NY Metro Area',
                sub: 'Serving the Capital Region',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: Mail,
                label: 'Email us',
                value: 'info@mylobstr.com',
                sub: 'Replies within 2 hours',
                color: 'bg-indigo-50 text-indigo-600',
              },
              {
                icon: Clock,
                label: 'Available',
                value: '24 / 7 / 365',
                sub: 'Real humans, real answers',
                color: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: Phone,
                label: 'Response time',
                value: 'Under 3 minutes',
                sub: 'For urgent support requests',
                color: 'bg-amber-50 text-amber-600',
              },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                  <p className="font-bold text-gray-900 text-sm">{value}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}

            <a
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.02]"
            >
              <MapPin className="w-4 h-4" /> Meet Us or Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
