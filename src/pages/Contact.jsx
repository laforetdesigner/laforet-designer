import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Mail, Phone, MapPin, Send, Calendar } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { useSiteSettings } from '../hooks/useWordPress'

const STEPS = [
  { id: 1, label: 'Votre projet' },
  { id: 2, label: 'Coordonnées' },
  { id: 3, label: 'Détails' },
]
const PROJECT_TYPES = [
  { id: 'branding', label: 'Branding', icon: '◈' },
  { id: 'com-360', label: 'COM 360', icon: '◉' },
  { id: 'solutions-digitales', label: 'Solutions Digitales', icon: '◎' },
  { id: 'coaching', label: 'Coaching / Formation', icon: '◇' },
]
const BUDGETS = ['< 2 000 €', '2 000 – 5 000 €', '5 000 – 10 000 €', '> 10 000 €']

function validate(step, form) {
  const e = {}
  if (step === 1 && !form.projectType) e.projectType = 'Choisissez un type de projet'
  if (step === 2) {
    if (!form.name.trim()) e.name = 'Requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
  }
  if (step === 3 && !form.message.trim()) e.message = 'Décrivez votre projet'
  return e
}

const init = { projectType: '', name: '', email: '', company: '', phone: '', message: '', budget: '', deadline: '' }

export default function Contact() {
  const { data: settings } = useSiteSettings()
  const contactInfo = settings?.contact ?? {}
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(init)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [tab, setTab] = useState('form') // 'form' | 'calendar'

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n }) }
  const next = () => { const e = validate(step, form); if (Object.keys(e).length) { setErrors(e); return } setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(3, form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`)
      setDone(true)
    } catch (err) {
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.' })
    } finally {
      setSending(false)
    }
  }

  const inputStyle = (key) => ({
    width: '100%', fontFamily: 'Archivo,sans-serif', fontSize: 15, color: '#0A0A0A',
    background: '#fff', border: `1px solid ${errors[key] ? '#EF4444' : '#E8E8E8'}`,
    padding: '13px 16px', outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box', borderRadius: 0,
  })

  return (
    <>
      <div style={{ paddingTop: 64, background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Travaillons ensemble</motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ color: '#fff' }}>
            Contact
          </motion.h1>
        </div>
      </div>

      <section className="section" style={{ background: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '5rem', alignItems: 'start' }} className="contact-grid">

            {/* ── Left : tabs form / calendar ── */}
            <div>
              {/* Tab switcher */}
              <div style={{ display: 'flex', marginBottom: '2.5rem', border: '1px solid #E8E8E8', background: '#fff' }}>
                {[{ id: 'form', label: '✉  Formulaire de contact' }, { id: 'calendar', label: '📅  Prendre rendez-vous' }].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} style={{
                    flex: 1, padding: '14px 16px',
                    fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 13,
                    background: tab === t.id ? '#0A0A0A' : 'transparent',
                    color: tab === t.id ? '#fff' : '#888',
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  }}>{t.label}</button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* ──── TAB: FORMULAIRE ──── */}
                {tab === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    {done ? (
                      <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid #E8E8E8', background: '#fff' }}>
                        <div style={{ width: 56, height: 56, background: '#0A0A0A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                          <Check size={24} color="#fff" strokeWidth={2.5} />
                        </div>
                        <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', letterSpacing: -0.5, marginBottom: '0.75rem' }}>Demande envoyée !</h3>
                        <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 15, color: '#666', lineHeight: 1.6 }}>
                          Nous reviendrons vers vous sous <strong>48h</strong> avec un devis personnalisé.<br />
                          Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Stepper */}
                        <div style={{ display: 'flex', marginBottom: '2rem' }}>
                          {STEPS.map((s, i) => (
                            <div key={s.id} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{
                                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                background: step >= s.id ? '#0A0A0A' : '#E8E8E8',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 11,
                                color: step >= s.id ? '#fff' : '#AAA',
                              }}>
                                {step > s.id ? <Check size={12} strokeWidth={3} /> : s.id}
                              </div>
                              <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, fontWeight: 600, color: step >= s.id ? '#0A0A0A' : '#AAA' }} className="step-lbl">{s.label}</span>
                              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: step > s.id ? '#0A0A0A' : '#E8E8E8', margin: '0 8px' }} />}
                            </div>
                          ))}
                        </div>

                        <form onSubmit={submit} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '2rem' }}>
                          <AnimatePresence mode="wait">
                            {step === 1 && (
                              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', letterSpacing: -0.5, marginBottom: '0.5rem' }}>Quel est votre projet ?</h3>
                                <p className="t-body" style={{ fontSize: 14, marginBottom: '1.5rem' }}>Sélectionnez la catégorie qui correspond à votre besoin.</p>
                                {errors.projectType && <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: '#EF4444', marginBottom: '0.75rem' }}>{errors.projectType}</p>}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                  {PROJECT_TYPES.map(pt => (
                                    <button key={pt.id} type="button" onClick={() => update('projectType', pt.id)} style={{
                                      background: form.projectType === pt.id ? '#0A0A0A' : '#fff',
                                      border: `2px solid ${form.projectType === pt.id ? '#0A0A0A' : '#E8E8E8'}`,
                                      padding: '1.25rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                                    }}>
                                      <span style={{ fontSize: 24, display: 'block', marginBottom: 8, color: form.projectType === pt.id ? 'rgba(255,255,255,0.7)' : '#1E40AF' }}>{pt.icon}</span>
                                      <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 14, color: form.projectType === pt.id ? '#fff' : '#0A0A0A' }}>{pt.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {step === 2 && (
                              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', letterSpacing: -0.5, marginBottom: '1.5rem' }}>Vos coordonnées</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                  {[{ k: 'name', l: 'Nom complet *', ph: 'Jean Dupont', t: 'text' }, { k: 'email', l: 'Email *', ph: 'jean@entreprise.com', t: 'email' }, { k: 'company', l: 'Entreprise', ph: 'Nom de la société', t: 'text' }, { k: 'phone', l: 'Téléphone', ph: '+33 6 00 00 00 00', t: 'tel' }].map(f => (
                                    <div key={f.k}>
                                      <label style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 12, color: '#0A0A0A', display: 'block', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{f.l}</label>
                                      <input type={f.t} value={form[f.k]} onChange={e => update(f.k, e.target.value)} placeholder={f.ph} style={inputStyle(f.k)}
                                        onFocus={e => e.currentTarget.style.borderColor = '#0A0A0A'}
                                        onBlur={e => e.currentTarget.style.borderColor = errors[f.k] ? '#EF4444' : '#E8E8E8'}
                                      />
                                      {errors[f.k] && <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors[f.k]}</p>}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {step === 3 && (
                              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', letterSpacing: -0.5, marginBottom: '1.5rem' }}>Parlez-nous de votre projet</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                  <div>
                                    <label style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 12, color: '#0A0A0A', display: 'block', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Description *</label>
                                    <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5}
                                      placeholder="Objectifs, cibles, contexte, contraintes..."
                                      style={{ ...inputStyle('message'), resize: 'vertical' }}
                                      onFocus={e => e.currentTarget.style.borderColor = '#0A0A0A'}
                                      onBlur={e => e.currentTarget.style.borderColor = errors.message ? '#EF4444' : '#E8E8E8'}
                                    />
                                    {errors.message && <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors.message}</p>}
                                  </div>
                                  <div>
                                    <label style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 12, color: '#0A0A0A', display: 'block', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Budget estimé</label>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                      {BUDGETS.map(b => (
                                        <button key={b} type="button" onClick={() => update('budget', b)} style={{
                                          fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 12, padding: '8px 14px',
                                          border: `1.5px solid ${form.budget === b ? '#0A0A0A' : '#E8E8E8'}`,
                                          background: form.budget === b ? '#0A0A0A' : '#fff',
                                          color: form.budget === b ? '#fff' : '#0A0A0A',
                                          cursor: 'pointer', transition: 'all 0.15s',
                                        }}>{b}</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 12, color: '#0A0A0A', display: 'block', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Délai souhaité</label>
                                    <input type="text" value={form.deadline} onChange={e => update('deadline', e.target.value)} placeholder="Ex : Dans 2 mois, pour juin 2025..." style={inputStyle('deadline')}
                                      onFocus={e => e.currentTarget.style.borderColor = '#0A0A0A'}
                                      onBlur={e => e.currentTarget.style.borderColor = '#E8E8E8'}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {errors.submit && (
                            <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#EF4444', marginTop: '1rem', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA' }}>
                              {errors.submit}
                            </p>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                            {step > 1 ? (
                              <button type="button" onClick={back} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 13, color: '#888', background: 'none', border: '1px solid #E8E8E8', padding: '11px 20px', cursor: 'pointer', transition: 'all 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#0A0A0A' }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#E8E8E8' }}
                              ><ArrowLeft size={14} /> Retour</button>
                            ) : <div />}
                            {step < 3 ? (
                              <button type="button" onClick={next} className="btn-primary" style={{ fontSize: 13, padding: '12px 24px' }}>
                                Continuer <ArrowRight size={14} />
                              </button>
                            ) : (
                              <button type="submit" disabled={sending} className="btn-primary" style={{ fontSize: 13, padding: '12px 24px', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer', background: '#1E40AF', borderColor: '#1E40AF' }}>
                                {sending ? 'Envoi...' : 'Envoyer'} <Send size={14} />
                              </button>
                            )}
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                )}

                {/* ──── TAB: CALENDAR ──── */}
                {tab === 'calendar' && (
                  <motion.div key="calendar" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '2rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                        <Calendar size={20} color="#0A0A0A" />
                        <div>
                          <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 18, color: '#0A0A0A', letterSpacing: -0.3 }}>Réserver un créneau</h3>
                          <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#888' }}>Appel découverte ou visio 30 min — gratuit</p>
                        </div>
                      </div>

                      {/* Cal.com embed — remplacer l'URL par votre lien Cal.com */}
                      <div style={{ background: '#FAFAFA', border: '1px solid #E8E8E8', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: '3rem' }}>
                        <Calendar size={40} color="#E8E8E8" />
                        <p style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 15, color: '#888', textAlign: 'center' }}>
                          Calendrier Cal.com à intégrer
                        </p>
                        <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#AAA', textAlign: 'center', maxWidth: 320 }}>
                          Créez un compte sur <strong>cal.com</strong>, copiez votre lien d'événement, puis remplacez l'URL dans <code style={{ background: '#F0F0F0', padding: '2px 6px', fontSize: 12 }}>src/pages/Contact.jsx</code>
                        </p>
                        <a href="https://cal.com" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13, padding: '10px 20px', marginTop: 8 }}>
                          Créer un compte Cal.com →
                        </a>
                      </div>

                      {/* Une fois votre lien Cal.com prêt, remplacez le bloc ci-dessus par : */}
                      {/* <iframe
                        src="https://cal.com/votre-nom/30min?embed=true"
                        style={{ width: '100%', height: 600, border: 'none' }}
                        title="Réserver un créneau"
                      /> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right : infos ── */}
            <Reveal delay={150}>
              <div style={{ position: 'sticky', top: 80 }}>
                <div style={{ background: '#0A0A0A', padding: '2rem', marginBottom: '1rem' }}>
                  <p className="t-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>Nos coordonnées</p>
                  {[
                    { icon: Mail,  v: contactInfo.email   || 'hello@laforetdesigner.com' },
                    { icon: Phone, v: contactInfo.phone   || '+33 1 23 45 67 89' },
                    { icon: MapPin,v: contactInfo.address || 'Paris, France' },
                  ].map(({ icon: Icon, v }) => (
                    <div key={v} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1rem' }}>
                      <Icon size={15} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '2rem' }}>
                  <p className="t-label" style={{ marginBottom: '1.25rem' }}>Pourquoi nous choisir</p>
                  {['Devis sous 48h garanti', 'Note 5/5 sur 100+ projets', 'Expertise multi-secteurs', 'Tarifs transparents'].map(v => (
                    <div key={v} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: '0.65rem' }}>
                      <Check size={13} color="#0A0A0A" strokeWidth={2.5} />
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#333' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .step-lbl { display: none; }
        }
      `}</style>
    </>
  )
}
