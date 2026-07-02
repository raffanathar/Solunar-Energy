const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';

import { Link } from 'react-router-dom';

const defaultPosts = [
  { id: 'b1', title: 'How Solar Panels Reduce Electricity Bills in Pakistan', shortDescription: 'Discover how a properly sized solar system can slash your WAPDA/LESCO bills by up to 90% and pay for itself within 3–4 years.', slug: 'solar-panels-reduce-bills-pakistan', publishedAt: '2026-05-01' },
  { id: 'b2', title: 'On-Grid vs Hybrid Solar System: Which One Should You Choose?', shortDescription: 'Both have advantages. Learn the key differences between on-grid and hybrid solar systems to make the right choice for your home.', slug: 'on-grid-vs-hybrid-solar-system', publishedAt: '2026-04-15' },
  { id: 'b3', title: 'What is Net Metering in Pakistan?', shortDescription: 'Net metering lets you sell excess solar electricity back to the grid. Here\'s everything you need to know about the process in Pakistan.', slug: 'net-metering-pakistan-guide', publishedAt: '2026-04-01' },
  { id: 'b4', title: 'Best Solar System Size for Your Home', shortDescription: 'Not sure what size solar system you need? Use our load calculation guide to find the perfect match for your monthly energy consumption.', slug: 'best-solar-system-size-home-pakistan', publishedAt: '2026-03-20' },
  { id: 'b5', title: 'Solar Maintenance Tips for Long-Term Performance', shortDescription: 'Maximize your solar system\'s lifespan and efficiency with these simple but important maintenance practices recommended by our engineers.', slug: 'solar-maintenance-tips-pakistan', publishedAt: '2026-03-05' },
];

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.BlogPost.filter({ isPublished: true }, '-publishedAt', 6)
      .then(data => setPosts(data.length > 0 ? data : defaultPosts))
      .catch(() => setPosts(defaultPosts))
      .finally(() => setLoading(false));
  }, []);

  const display = posts.length > 0 ? posts : defaultPosts;

  return (
    <section id="blog" className="py-24 lg:py-32 bg-[#F8FAFC] section-rule relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#D97706]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A7A70]/10 border border-[#0A7A70]/20 mb-5">
              <BookOpen className="w-3.5 h-3.5 text-[#0A7A70]" />
              <span className="font-inter text-xs font-semibold text-[#0A7A70] tracking-wider uppercase">Solar Knowledge</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight">
              Learn About <span className="text-[#0A7A70]">Solar Energy</span>
            </h2>
          </div>
          <p className="font-inter text-[#475569] text-sm max-w-xs text-right hidden sm:block">
            Educational guides to help Pakistanis make informed solar decisions.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-[#0A7A70] animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.slice(0, 6).map((post, i) => (
              <article key={post.id} className={`group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden card-hover flex flex-col ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                {/* Image or gradient */}
                <div className="h-48 bg-gradient-to-br from-[#0A7A70]/10 via-[#F8FAFC] to-[#D97706]/5 flex items-center justify-center relative overflow-hidden">
                  <BookOpen className="w-12 h-12 text-[#0A7A70]/20" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A7A70]/10 border border-[#0A7A70]/20">
                    <span className="font-inter text-xs font-semibold text-[#0A7A70]">Solar Guide</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {post.publishedAt && (
                    <div className="font-inter text-xs text-[#94A3B8] mb-3">
                      {new Date(post.publishedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  )}
                  <h3 className="font-jakarta font-bold text-[#0F172A] text-base leading-snug mb-3 group-hover:text-[#0A7A70] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-inter text-sm text-[#475569] leading-relaxed flex-1 mb-5">{post.shortDescription}</p>
                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-jakarta font-semibold text-[#0A7A70] hover:text-[#D97706] transition-colors duration-300 group/link"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}