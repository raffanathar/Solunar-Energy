const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ArrowLeft, Calendar, Loader2, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReactMarkdown from 'react-markdown';

const defaultPosts = {
  'solar-panels-reduce-bills-pakistan': {
    title: 'How Solar Panels Reduce Electricity Bills in Pakistan',
    shortDescription: 'Discover how a properly sized solar system can slash your WAPDA/LESCO bills by up to 90%.',
    content: `## The Pakistan Electricity Crisis\n\nPakistan faces some of the highest electricity tariffs in the region, with bills increasing year over year. The good news? Solar energy offers a permanent, affordable solution.\n\n## How Solar Reduces Your Bill\n\n1. **Direct energy offset** — Solar panels generate electricity during the day, directly powering your appliances and reducing grid consumption.\n\n2. **Net Metering** — Excess electricity is fed back to the DISCO grid. Your meter runs backwards, crediting you for the electricity you generate.\n\n3. **Battery Storage** — Hybrid systems store excess energy for use during load-shedding or nighttime hours.\n\n## Typical Savings in Pakistan\n\n| System Size | Monthly Generation | Approx. Savings |\n|---|---|---|\n| 3 kW | 360–420 units | Rs. 8,000–12,000 |\n| 5 kW | 600–720 units | Rs. 14,000–20,000 |\n| 10 kW | 1,200–1,400 units | Rs. 28,000–40,000 |\n\n## ROI Timeline\n\nA typical 5kW solar system in Pakistan pays for itself within 3–4 years and continues generating free electricity for 25+ years.\n\n## Contact Solunar Energy\n\nReady to slash your electricity bills? Get a free site survey and customized quote from our team.`,
    publishedAt: '2026-05-01',
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.BlogPost.filter({ slug }, '-publishedAt', 1)
      .then(data => {
        if (data.length > 0) setPost(data[0]);
        else if (defaultPosts[slug]) setPost(defaultPosts[slug]);
        else setPost(null);
      })
      .catch(() => setPost(defaultPosts[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="pt-24 pb-24">
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" /></div>
        ) : !post ? (
          <div className="max-w-2xl mx-auto px-4 text-center py-24">
            <BookOpen className="w-12 h-12 text-[#1E3A5F]/30 mx-auto mb-4" />
            <h1 className="font-jakarta font-bold text-[#0F172A] text-2xl mb-3">Article Not Found</h1>
            <p className="font-inter text-[#475569] mb-6">This article doesn't exist or hasn't been published yet.</p>
            <Link to="/#blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3A5F] text-white font-jakarta font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-inter font-medium text-[#1E3A5F] hover:text-[#D97706] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
            </Link>

            <div className="bg-gradient-to-br from-[#1E3A5F]/8 to-[#D97706]/5 rounded-2xl p-10 mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-5">
                <BookOpen className="w-3.5 h-3.5 text-[#1E3A5F]" />
                <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Solar Guide</span>
              </div>
              {post.publishedAt && (
                <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8] font-inter mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
              <h1 className="font-jakarta font-extrabold text-[#0F172A] text-2xl lg:text-4xl tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 lg:p-12 shadow-sm">
              <div className="prose prose-slate max-w-none font-inter prose-headings:font-jakarta prose-headings:text-[#0F172A] prose-p:text-[#475569] prose-p:leading-relaxed prose-a:text-[#1E3A5F] prose-strong:text-[#0F172A]">
                <ReactMarkdown>{post.content || post.shortDescription}</ReactMarkdown>
              </div>
            </div>

            <div className="mt-10 bg-[#1E3A5F] rounded-2xl p-8 text-white text-center">
              <h3 className="font-jakarta font-extrabold text-xl mb-2">Ready to Go Solar?</h3>
              <p className="font-inter text-white/80 text-sm mb-5">Get a free site survey and customized quote from Solunar Energy today.</p>
              <a href="/#quote" className="inline-block px-8 py-3 rounded-full bg-white text-[#1E3A5F] font-jakarta font-bold text-sm hover:bg-white/90 transition-colors">
                Get Protected Solar Quote
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}