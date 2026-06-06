'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Calendar } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

// Deterministic "booked" slots so the page feels real (no backend needed)
function isBooked(dateStr: string, time: string) {
  const n = [...dateStr, ...time].reduce((a, c) => a + c.charCodeAt(0), 0)
  return n % 4 === 0
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

interface BookingCalendarProps {
  title?: string
  subtitle?: string
  slots?: string[]
  accent?: string          // tailwind bg class e.g. 'bg-emerald-500'
  accentText?: string      // tailwind text class e.g. 'text-emerald-600'
  accentLight?: string     // tailwind bg-light class e.g. 'bg-emerald-50'
  accentBorder?: string    // e.g. 'border-emerald-200'
  businessName?: string
}

export default function BookingCalendar({
  title = 'Book an Appointment',
  subtitle = 'Pick a date and time that works for you.',
  slots = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM'],
  accent = 'bg-gray-900',
  accentText = 'text-gray-900',
  accentLight = 'bg-gray-50',
  accentBorder = 'border-gray-200',
  businessName = 'us',
}: BookingCalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<'calendar' | 'form' | 'confirmed'>('calendar')
  const [form, setForm] = useState({ name: '', contact: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }
  function isSunday(day: number) {
    return new Date(viewYear, viewMonth, day).getDay() === 0
  }

  function selectDate(day: number) {
    if (isPast(day) || isSunday(day)) return
    const ds = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    setSelectedDate(ds)
    setSelectedTime(null)
  }

  function formatDate(ds: string) {
    const [y,m,d] = ds.split('-').map(Number)
    const date = new Date(y, m-1, d)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep('confirmed')
  }

  if (step === 'confirmed') {
    return (
      <div className="text-center py-16 px-4 space-y-4">
        <div className={`w-20 h-20 ${accent} rounded-full flex items-center justify-center mx-auto`}>
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">You're booked! 🎉</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          <strong className="text-gray-800">{form.name}</strong>, your appointment with{' '}
          <strong className="text-gray-800">{businessName}</strong> is confirmed for{' '}
          <strong className="text-gray-800">{formatDate(selectedDate!)} at {selectedTime}</strong>.
        </p>
        <p className="text-sm text-gray-400">A confirmation will be sent to <strong>{form.contact}</strong>.</p>
        <button
          onClick={() => { setStep('calendar'); setSelectedDate(null); setSelectedTime(null); setForm({ name:'', contact:'', notes:'' }) }}
          className="mt-4 text-sm text-gray-500 underline hover:text-gray-800 transition-colors"
        >
          Book another appointment
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ── Calendar ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-bold text-gray-900">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const ds = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
              const past = isPast(day)
              const sun = isSunday(day)
              const disabled = past || sun
              const selected = selectedDate === ds
              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  disabled={disabled}
                  className={`
                    mx-auto w-8 h-8 rounded-full text-sm font-semibold transition-all flex items-center justify-center
                    ${selected ? `${accent} text-white shadow-md` : ''}
                    ${!selected && !disabled ? `hover:${accentLight} ${accentText} cursor-pointer` : ''}
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">Sundays closed · Past dates unavailable</p>
        </div>

        {/* ── Right panel: slots or form ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {!selectedDate ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-8">
              <Calendar className="w-10 h-10 text-gray-200" />
              <p className="text-sm text-gray-400 font-medium">Select a date to see available times</p>
            </div>
          ) : step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
              <div>
                <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${accentLight} ${accentText} ${accentBorder} border mb-4`}>
                  <Clock className="w-3 h-3" />
                  {formatDate(selectedDate)} · {selectedTime}
                </div>
                <button onClick={() => { setStep('calendar'); setSelectedTime(null) }} className="block text-xs text-gray-400 hover:text-gray-700 underline mb-4">
                  ← Change date or time
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Your Name *</label>
                <input
                  required
                  placeholder="Maria Johnson"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Phone or Email *</label>
                <input
                  required
                  placeholder="you@email.com or 518-555-0100"
                  value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Any notes? <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea
                  rows={2}
                  placeholder="e.g. bringing a large dog, first visit..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-gray-50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-auto py-3 rounded-xl ${accent} text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Booking...</>
                ) : 'Confirm Appointment'}
              </button>
            </form>
          ) : (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Available times · {formatDate(selectedDate)}
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {slots.map(time => {
                  const booked = isBooked(selectedDate, time)
                  const picked = selectedTime === time
                  return (
                    <button
                      key={time}
                      disabled={booked}
                      onClick={() => { setSelectedTime(time); setStep('form') }}
                      className={`
                        py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all
                        ${picked ? `${accent} text-white border-transparent` : ''}
                        ${booked ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through' : ''}
                        ${!booked && !picked ? `bg-white border-gray-200 ${accentText} hover:${accentLight} hover:${accentBorder}` : ''}
                      `}
                    >
                      {booked ? `${time} · Booked` : time}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
