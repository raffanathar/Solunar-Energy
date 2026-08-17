const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Zap, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { trackQuoteSubmit } from '@/lib/analytics';

const billOptions = ['Under Rs. 5,000', 'Rs. 5,000–10,000', 'Rs. 10,000–20,000', 'Rs. 20,000–40,000', 'Rs. 40,000+'];
const propertyTypes = ['Home', 'Shop', 'Office', 'Factory', 'Farm', 'Other'];
const systemTypes = ['On-Grid', 'Hybrid', 'Off-Grid', 'Not Sure'];

export default function QuoteSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    monthlyBill: '', propertyType: '', systemType: '',
    fullName: '', phone: '', city: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await db.entities.QuoteRequest.create({ ...form, status: 'new' });
      trackQuoteSubmit();
      setDone(true);
    } catch (err) {
      console.error('Quote submit failed:', err);
      alert('Something went wrong while sending your request. Please try again or contact us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section id="quote" className="py-24 lg:py-32 bg-white section-rule">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#1E3A5F]" />
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-3xl mb-4">Quote Request Sent!</h2>
          <p className="font-inter text-[#475569] text-lg leading-relaxed mb-8">
            Thank you! <strong>Solunar Energy</strong> will contact you soon with a suitable solar solution tailored to your needs.
          </p>
          <button
            onClick={() => { setDone(false); setStep(1); setForm({ monthlyBill: '', propertyType: '', systemType: '', fullName: '', phone: '', city: '', message: '' }); }}
            className="px-6 py-3 rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] font-jakarta font-semibold text-sm hover:bg-[#1E3A5F]/5 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 lg:py-32 bg-white section-rule relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1E3A5F]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Free Quotation</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-4">
            Get Your Free <span className="text-[#1E3A5F]">Solar Quote</span>
          </h2>
          <p className="font-inter text-[#475569] text-base">Complete this 3-step form and our expert will contact you with a customized package.</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-10 max-w-sm mx-auto">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 relative">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#1E3A5F]' : 'bg-[#E2E8F0]'}`} />
              <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                s < step ? 'bg-[#1E3A5F] border-[#1E3A5F]' :
                s === step ? 'bg-white border-[#1E3A5F] shadow-md shadow-[#1E3A5F]/30' :
                'bg-white border-[#E2E8F0]'
              }`} />
            </div>
          ))}
        </div>

        <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-8 lg:p-10">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h3 className="font-jakarta font-bold text-[#0F172A] text-xl mb-2">What's your monthly electricity bill?</h3>
              <p className="font-inter text-sm text-[#475569] mb-6">This helps us estimate the right system size for you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {billOptions.map(b => (
                  <button key={b} onClick={() => setForm(f => ({...f, monthlyBill: b}))}
                    className={`px-5 py-4 rounded-xl border-2 font-inter font-medium text-sm text-left transition-all duration-300 ${
                      form.monthlyBill === b
                        ? 'border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F]'
                        : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#1E3A5F]/40'
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map(t => (
                      <button key={t} onClick={() => setForm(f => ({...f, propertyType: t}))}
                        className={`px-4 py-2 rounded-lg border text-xs font-inter font-medium transition-all duration-200 ${
                          form.propertyType === t ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F]' : 'border-[#E2E8F0] text-[#475569] hover:border-[#1E3A5F]/40'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">System Type</label>
                  <div className="flex flex-wrap gap-2">
                    {systemTypes.map(t => (
                      <button key={t} onClick={() => setForm(f => ({...f, systemType: t}))}
                        className={`px-4 py-2 rounded-lg border text-xs font-inter font-medium transition-all duration-200 ${
                          form.systemType === t ? 'border-[#1E3A5F] bg-[#1E3A5F]/10 text-[#1E3A5F]' : 'border-[#E2E8F0] text-[#475569] hover:border-[#1E3A5F]/40'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.monthlyBill}
                className="flex items-center gap-2 w-full justify-center py-4 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-bold disabled:opacity-40 hover:bg-[#1E3A5F]/90 transition-all duration-300"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h3 className="font-jakarta font-bold text-[#0F172A] text-xl mb-2">Where is the installation?</h3>
              <p className="font-inter text-sm text-[#475569] mb-6">We'll connect you with our nearest team.</p>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">City *</label>
                  <input required value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F]"
                    placeholder="Lahore, Karachi, Islamabad..." />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Additional Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    rows={3} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] resize-none"
                    placeholder="Any specific requirements or questions?" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-[#E2E8F0] text-[#475569] font-jakarta font-semibold text-sm hover:border-[#1E3A5F]/30 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)} disabled={!form.city}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-bold disabled:opacity-40 hover:bg-[#1E3A5F]/90 transition-all duration-300">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h3 className="font-jakarta font-bold text-[#0F172A] text-xl mb-2">Your contact details</h3>
                  {/* TODO: CONFIRM — "reach out within 24 hours" response-time promise; confirm internal SLA before launch. */}
                  <p className="font-inter text-sm text-[#475569] mb-6">We'll reach out within 24 hours with your personalized quote.</p>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input required value={form.fullName} onChange={e => setForm(f => ({...f, fullName: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F]"
                    placeholder="Ahmad Khan" />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F]"
                    placeholder="+92 300 000 0000" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-[#E2E8F0] text-[#475569] font-jakarta font-semibold text-sm hover:border-[#1E3A5F]/30 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleSubmit} disabled={!form.fullName || !form.phone || submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-[#D97706] text-white font-jakarta font-bold disabled:opacity-40 hover:bg-[#D97706]/90 transition-all duration-300 shadow-lg shadow-[#D97706]/25">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {submitting ? 'Sending...' : 'Get My Free Quote'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: MapPin, text: 'Free Site Survey' },
            { icon: ShieldCheck, text: 'No Obligation Quote' },
            { icon: Clock, text: 'Response within 24 hours' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-inter font-medium text-[#475569]">
              <Icon className="w-4 h-4 text-[#1E3A5F]" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}