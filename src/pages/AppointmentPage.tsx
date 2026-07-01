import { useEffect, useMemo, useState } from 'react'
import { PageHero } from '../components/layout/PageHero'

const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
] as const

const WEEKDAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'] as const

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = 10 + Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  if (hour > 21 || (hour === 21 && minute === '30')) return null
  return `${String(hour).padStart(2, '0')}:${minute}`
}).filter(Boolean) as string[]

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildCalendarCells(viewYear: number, viewMonth: number) {
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: Array<{ day: number; date: Date } | null> = []

  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, date: new Date(viewYear, viewMonth, day) })
  }

  return cells
}

function isDateSelectable(date: Date, today: Date) {
  const day = date.getDay()
  if (day === 0) return false
  return startOfDay(date) >= startOfDay(today)
}

type FormData = {
  ad: string
  soyad: string
  telefon: string
  eposta: string
  not: string
}

export function AppointmentPage() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewDate, setViewDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form, setForm] = useState<FormData>({ ad: '', soyad: '', telefon: '', eposta: '', not: '' })

  useEffect(() => {
    document.title = 'Randevu Al | Notre Psikoloji'
    document.body.className = 'wp-singular page wp-theme-solanum appointment-route'
  }, [])

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()
  const calendarCells = useMemo(
    () => buildCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  )

  const shiftMonth = (delta: number) => {
    setViewDate(new Date(viewYear, viewMonth + delta, 1))
  }

  const handleSelectDate = (date: Date) => {
    if (!isDateSelectable(date, today)) return
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const appointmentSummary = selectedDate && selectedTime
    ? `${selectedDate.getDate()} ${MONTHS_TR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}, ${selectedTime}`
    : ''

  return (
    <main id="contenu-principal" className="wrapper appointment-page">
      <PageHero
        title="Randevu Al"
        currentPage="Randevu Al"
        description="İhtiyacınıza uygun uzman ve randevu saatini birlikte belirleyelim."
      />
      <section className="appointment-page__shell" aria-label="Randevu planlama">
        <div className="container appointment-page__container">

          {/* ADIM 1 — Takvim */}
          {step === 1 && (
            <div className="appointment-booking">
              <aside className="appointment-booking__info">
                <h2 className="appointment-booking__title">İlk Danışmanlık Görüşmesi</h2>
                <p className="appointment-booking__meta">
                  <ClockIcon />
                  <span>50 dk</span>
                </p>
                <p className="appointment-booking__desc">
                  İhtiyacınızı dinleyeceğimiz kısa bir tanışma görüşmesi. Süreci, uygun uzmanı ve
                  randevu seçeneklerini birlikte netleştiririz. Yüz yüze veya online.
                </p>
              </aside>

              <div className="appointment-booking__calendar">
                <div className="appointment-booking__month">
                  <button type="button" className="appointment-booking__month-btn" aria-label="Önceki ay" onClick={() => shiftMonth(-1)}>
                    <ChevronIcon direction="left" />
                  </button>
                  <p className="appointment-booking__month-label">
                    {MONTHS_TR[viewMonth]} {viewYear}
                  </p>
                  <button type="button" className="appointment-booking__month-btn" aria-label="Sonraki ay" onClick={() => shiftMonth(1)}>
                    <ChevronIcon direction="right" />
                  </button>
                </div>

                <div className="appointment-booking__weekdays" aria-hidden="true">
                  {WEEKDAYS_TR.map((day) => <span key={day}>{day}</span>)}
                </div>

                <div className="appointment-booking__days" role="grid" aria-label="Takvim">
                  {calendarCells.map((cell, index) => {
                    if (!cell) return <span key={`empty-${index}`} className="appointment-booking__day-empty" />

                    const selectable = isDateSelectable(cell.date, today)
                    const selected = selectedDate ? isSameDay(cell.date, selectedDate) : false
                    const isToday = isSameDay(cell.date, today)

                    return (
                      <button
                        key={cell.date.toISOString()}
                        type="button"
                        role="gridcell"
                        disabled={!selectable}
                        aria-pressed={selected}
                        aria-label={`${cell.day} ${MONTHS_TR[viewMonth]} ${viewYear}`}
                        className={['appointment-booking__day', selected ? 'is-selected' : '', isToday ? 'is-today' : ''].filter(Boolean).join(' ')}
                        onClick={() => handleSelectDate(cell.date)}
                      >
                        {cell.day}
                      </button>
                    )
                  })}
                </div>

                <div className="appointment-booking__timezone">
                  <GlobeIcon />
                  <label className="appointment-booking__timezone-label">
                    Saat dilimi
                    <select className="appointment-booking__timezone-select" defaultValue="Europe/Istanbul">
                      <option value="Europe/Istanbul">Europe/Istanbul (GMT+3)</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="appointment-booking__times">
                {selectedDate ? (
                  <>
                    <p className="appointment-booking__times-label">
                      {selectedDate.getDate()} {MONTHS_TR[selectedDate.getMonth()]} · Müsait saatler
                    </p>
                    <ul className="appointment-booking__slots">
                      {TIME_SLOTS.map((time) => {
                        const active = selectedTime === time
                        return (
                          <li key={time}>
                            <button
                              type="button"
                              className={`appointment-booking__slot${active ? ' is-selected' : ''}`}
                              aria-pressed={active}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    {selectedTime && (
                      <button
                        type="button"
                        className="appointment-booking__confirm button button--purple"
                        onClick={() => setStep(2)}
                      >
                        Devam Et
                        <ChevronIcon direction="right" />
                      </button>
                    )}
                  </>
                ) : (
                  <p className="appointment-booking__times-placeholder">
                    Saat seçmek için takvimden bir gün seçin.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ADIM 2 — İletişim Formu */}
          {step === 2 && (
            <div className="appointment-booking appointment-booking--form">
              <aside className="appointment-booking__info">
                <button type="button" className="appointment-booking__back" onClick={() => setStep(1)}>
                  <ChevronIcon direction="left" />
                  Geri
                </button>
                <h2 className="appointment-booking__title">İlk Danışmanlık Görüşmesi</h2>
                <p className="appointment-booking__meta">
                  <ClockIcon />
                  <span>50 dk</span>
                </p>
                <div className="appointment-booking__selected-info">
                  <p className="appointment-booking__selected-row">
                    <CalendarIcon />
                    <span>{appointmentSummary}</span>
                  </p>
                  <p className="appointment-booking__selected-row">
                    <GlobeIcon />
                    <span>Europe/Istanbul (GMT+3)</span>
                  </p>
                </div>
              </aside>

              <form className="appointment-booking__contact-form" onSubmit={handleConfirm}>
                <h3 className="appointment-booking__form-title">İletişim Bilgileriniz</h3>
                <p className="appointment-booking__form-desc">
                  Randevunuzu tamamlamak için bilgilerinizi girin. Onay bilgisi size iletilecektir.
                </p>

                <div className="appointment-booking__form-grid">
                  <div className="appointment-booking__form-field">
                    <label className="appointment-booking__form-label" htmlFor="appt-ad">Ad</label>
                    <input
                      id="appt-ad"
                      name="ad"
                      type="text"
                      required
                      autoComplete="given-name"
                      className="appointment-booking__form-input"
                      placeholder="Adınızı girin"
                      value={form.ad}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="appointment-booking__form-field">
                    <label className="appointment-booking__form-label" htmlFor="appt-soyad">Soyad</label>
                    <input
                      id="appt-soyad"
                      name="soyad"
                      type="text"
                      required
                      autoComplete="family-name"
                      className="appointment-booking__form-input"
                      placeholder="Soyadınızı girin"
                      value={form.soyad}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="appointment-booking__form-field">
                    <label className="appointment-booking__form-label" htmlFor="appt-telefon">Telefon</label>
                    <input
                      id="appt-telefon"
                      name="telefon"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="appointment-booking__form-input"
                      placeholder="+90 5xx xxx xx xx"
                      value={form.telefon}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="appointment-booking__form-field">
                    <label className="appointment-booking__form-label" htmlFor="appt-eposta">E-posta</label>
                    <input
                      id="appt-eposta"
                      name="eposta"
                      type="email"
                      required
                      autoComplete="email"
                      className="appointment-booking__form-input"
                      placeholder="ornek@mail.com"
                      value={form.eposta}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="appointment-booking__form-field appointment-booking__form-field--full">
                    <label className="appointment-booking__form-label" htmlFor="appt-not">Not (isteğe bağlı)</label>
                    <textarea
                      id="appt-not"
                      name="not"
                      rows={3}
                      className="appointment-booking__form-input appointment-booking__form-input--textarea"
                      placeholder="Görüşmek istediğiniz konu hakkında kısa bir not bırakabilirsiniz."
                      value={form.not}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <button type="submit" className="appointment-booking__confirm button button--purple">
                  Randevuyu Onayla
                  <ChevronIcon direction="right" />
                </button>
              </form>
            </div>
          )}

          {/* ADIM 3 — Onay */}
          {step === 3 && (
            <div className="appointment-booking appointment-booking--success">
              <div className="appointment-booking__success-icon">
                <CheckIcon />
              </div>
              <h2 className="appointment-booking__success-title">Randevunuz Alındı!</h2>
              <p className="appointment-booking__success-desc">
                <strong>{form.ad} {form.soyad}</strong>, randevu talebiniz başarıyla iletildi.
                Ekibimiz en kısa sürede <strong>{form.eposta}</strong> adresine veya{' '}
                <strong>{form.telefon}</strong> numarasına geri dönecektir.
              </p>
              <div className="appointment-booking__success-summary">
                <p><CalendarIcon /> {appointmentSummary}</p>
                <p><ClockIcon /> 50 dk · İlk Danışmanlık Görüşmesi</p>
              </div>
              <button
                type="button"
                className="button button--purple"
                onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); setForm({ ad: '', soyad: '', telefon: '', eposta: '', not: '' }) }}
              >
                Yeni Randevu Al
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.75V8.25L10.25 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2.5 8H13.5M8 2.5C6.2 4.6 5.25 6.2 5.25 8C5.25 9.8 6.2 11.4 8 13.5C9.8 11.4 10.75 9.8 10.75 8C10.75 6.2 9.8 4.6 8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.25 6.75H13.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5.25 2.25V4.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M10.75 2.25V4.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 16L13.5 20.5L22.5 11.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={direction === 'left' ? 'M10 3.5L5.5 8L10 12.5' : 'M6 3.5L10.5 8L6 12.5'}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
