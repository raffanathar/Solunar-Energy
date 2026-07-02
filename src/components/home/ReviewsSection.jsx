const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Star, Quote, Loader2, Send, CheckCircle } from 'lucide-react';

const defaultReviews = [
  { id: 'r1', name: 'Ahmed Khan', city: 'Lahore', rating: 5, comment: 'Solunar Energy installed a 5kW system at my home. The team was professional and the installation was clean. Our electricity bill dropped from Rs. 18,000 to just Rs. 2,500 monthly!', installationType: 'Home Solar 5kW', savingsPercent: 85 },
  { id: 'r2', name: 'Bilal Raza', city: 'Islamabad', rating: 5, comment: 'Very satisfied with their service. They explained the whole process clearly and helped us reduce our electricity bill. The net metering application was handled entirely by Solunar Energy — seamless experience.', installationType: 'Hybrid Solar 10kW', savingsPercent: 80 },
  { id: 'r3', name: 'Hassan Ali', city: 'Multan', rating: 5, comment: 'Good quality panels and excellent after-sales support. Our factory\'s electricity costs are now a fraction of what they were. Highly recommend Solunar Energy to any business owner in Pakistan.', installationType: 'Commercial Solar 15kW', savingsPercent: 75 },
  { id: 'r4', name: 'Fatima Malik', city: 'Karachi', rating: 5, comment: 'From site survey to final installation, everything was handled professionally. The team arrived on time and the system has been working flawlessly for 8 months now.', installationType: 'Home Solar 3kW', savingsPercent: 70 },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? 'text-[#D97706] fill-[#D97706]' : 'text-[#E2E8F0]'}`} />
      ))}
    </div>
  );
}

function ReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', city: '', rating: 5, comment: '', installationType: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await db.entities.CustomerReview.create({ ...form, status: 'pending' });
    setDone(true);
    setSubmitting(false);
    onSubmitted?.();
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-[#0A7A70] mx-auto mb-3" />
        <p className="font-jakarta font-bold text-[#0F172A] text-lg mb-1">Review Submitted!</p>
        <p className="font-inter text-sm text-[#475569]">Thank you! Your review will appear after approval.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Your Name *</label>
          <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]"
            placeholder="Ahmad Khan" />
        </div>
        <div>
          <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">City *</label>
          <input required value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]"
            placeholder="Lahore" />
        </div>
      </div>
      <div>
        <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Installation Type</label>
        <input value={form.installationType} onChange={e => setForm(f => ({...f, installationType: e.target.value}))}
          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]"
          placeholder="e.g. Home Solar 5kW" />
      </div>
      <div>
        <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Rating *</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(i => (
            <button key={i} type="button" onClick={() => setForm(f => ({...f, rating: i}))}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#D97706]/10 transition-colors">
              <Star className={`w-6 h-6 ${i <= form.rating ? 'text-[#D97706] fill-[#D97706]' : 'text-[#CBD5E1]'}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Your Review *</label>
        <textarea required value={form.comment} onChange={e => setForm(f => ({...f, comment: e.target.value}))}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white font-inter text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70] resize-none"
          placeholder="Share your experience with Solunar Energy..." />
      </div>
      <button type="submit" disabled={submitting}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0A7A70] text-white font-jakarta font-bold text-sm hover:bg-[#0A7A70]/90 transition-all duration-300 disabled:opacity-60">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = () => {
    db.entities.CustomerReview.filter({ status: 'approved' }, '-created_date', 10)
      .then(data => setReviews(data.length > 0 ? data : defaultReviews))
      .catch(() => setReviews(defaultReviews))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#F8FAFC] section-rule relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0A7A70]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
            <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
            <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Customer Reviews</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
            Trusted by <span className="text-[#0A7A70]">Pakistanis</span> Nationwide
          </h2>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            Real stories from real customers. See why hundreds of families and businesses across Pakistan choose Solunar Energy.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-[#0A7A70] animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 card-hover flex flex-col">
                <Quote className="w-8 h-8 text-[#0A7A70]/20 mb-4" />
                {r.savingsPercent && (
                  <div className="inline-block px-3 py-1 bg-[#D97706]/10 rounded-full mb-4 w-fit">
                    <span className="font-jakarta font-bold text-sm text-[#D97706]">Saved {r.savingsPercent}% on bills</span>
                  </div>
                )}
                <p className="font-inter text-sm text-[#475569] leading-relaxed flex-1 mb-4 italic">"{r.comment}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                  <div>
                    <div className="font-jakarta font-bold text-sm text-[#0F172A]">{r.name}</div>
                    <div className="font-inter text-xs text-[#475569]">{r.city} · {r.installationType}</div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review form toggle */}
        <div className="max-w-xl mx-auto">
          {!showForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 rounded-full border-2 border-[#0A7A70] text-[#0A7A70] font-jakarta font-bold text-sm hover:bg-[#0A7A70]/5 transition-all duration-300"
              >
                Share Your Experience
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-lg">
              <h3 className="font-jakarta font-bold text-[#0F172A] text-xl mb-6">Write a Review</h3>
              <ReviewForm onSubmitted={() => { fetchReviews(); setTimeout(() => setShowForm(false), 3000); }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}