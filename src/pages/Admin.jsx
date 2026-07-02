const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';

import { Sun, Zap, Package, Star, FileText, MessageSquare, LogOut, Plus, Pencil, Trash2, Check, X, Loader2, Eye, ShoppingBag, Briefcase, Lock, Mail } from 'lucide-react';

const tabs = [
  { id: 'quotes', label: 'Quote Requests', icon: MessageSquare },
  { id: 'products', label: 'Store Products', icon: ShoppingBag },
  { id: 'services', label: 'Services', icon: Zap },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
];

const statusColors = { new: 'bg-blue-50 text-blue-700 border-blue-200', contacted: 'bg-amber-50 text-amber-700 border-amber-200', converted: 'bg-green-50 text-green-700 border-green-200', closed: 'bg-slate-50 text-slate-500 border-slate-200' };

function QuotesTab() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.entities.QuoteRequest.list('-created_date', 100).then(setQuotes).finally(() => setLoading(false));
  }, []);
  const updateStatus = async (id, status) => {
    await db.entities.QuoteRequest.update(id, { status });
    setQuotes(q => q.map(x => x.id === id ? { ...x, status } : x));
  };
  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#0A7A70] animate-spin" /></div>;
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-jakarta font-bold text-[#0F172A] text-xl">Quote Requests ({quotes.length})</h2>
      </div>
      <div className="space-y-3">
        {quotes.map(q => (
          <div key={q.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-jakarta font-bold text-[#0F172A]">{q.fullName}</div>
                <div className="font-inter text-sm text-[#475569]">{q.phone} · {q.city}</div>
                <div className="flex flex-wrap gap-2 mt-2 text-xs font-inter text-[#94A3B8]">
                  <span>Bill: {q.monthlyBill}</span>
                  <span>·</span>
                  <span>Property: {q.propertyType}</span>
                  <span>·</span>
                  <span>System: {q.systemType}</span>
                </div>
                {q.message && <p className="font-inter text-sm text-[#475569] mt-2 italic">"{q.message}"</p>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full border text-xs font-inter font-semibold ${statusColors[q.status] || statusColors.new}`}>{q.status}</span>
                <select value={q.status} onChange={e => updateStatus(q.id, e.target.value)}
                  className="text-xs border border-[#E2E8F0] rounded-lg px-2 py-1 font-inter text-[#475569]">
                  {['new', 'contacted', 'converted', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="font-inter text-xs text-[#94A3B8] mt-3">{new Date(q.created_date).toLocaleString()}</div>
          </div>
        ))}
        {quotes.length === 0 && <p className="text-center font-inter text-[#94A3B8] py-12">No quote requests yet.</p>}
      </div>
    </div>
  );
}

function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.entities.CustomerReview.list('-created_date', 50).then(setReviews).finally(() => setLoading(false));
  }, []);
  const updateStatus = async (id, status) => {
    await db.entities.CustomerReview.update(id, { status });
    setReviews(r => r.map(x => x.id === id ? { ...x, status } : x));
  };
  const deleteReview = async (id) => {
    await db.entities.CustomerReview.delete(id);
    setReviews(r => r.filter(x => x.id !== id));
  };
  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#0A7A70] animate-spin" /></div>;
  return (
    <div>
      <h2 className="font-jakarta font-bold text-[#0F172A] text-xl mb-6">Customer Reviews ({reviews.length})</h2>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-jakarta font-bold text-[#0F172A] text-sm">{r.name}</span>
                <span className="font-inter text-xs text-[#94A3B8]">{r.city} · {r.installationType}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-inter font-semibold border ${r.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : r.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{r.status}</span>
              </div>
              <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <span key={i} className={i < r.rating ? 'text-[#D97706]' : 'text-[#E2E8F0]'}>★</span>)}</div>
              <p className="font-inter text-sm text-[#475569] italic">"{r.comment}"</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {r.status !== 'approved' && <button onClick={() => updateStatus(r.id, 'approved')} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center"><Check className="w-4 h-4" /></button>}
              {r.status !== 'rejected' && <button onClick={() => updateStatus(r.id, 'rejected')} className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center"><X className="w-4 h-4" /></button>}
              <button onClick={() => deleteReview(r.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center font-inter text-[#94A3B8] py-12">No reviews yet.</p>}
      </div>
    </div>
  );
}

function SimpleEntityTab({ entityName, fields, displayField = 'title' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    db.entities[entityName].list('order', 50).then(setItems).finally(() => setLoading(false));
  }, [entityName]);

  const handleFile = async (key, file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await db.integrations.Core.UploadFile(file);
      setForm(x => {
        const field = fields.find(f => f.key === key);
        if (field?.isArray && x[key]) {
          return { ...x, [key]: x[key] + ', ' + file_url };
        }
        return { ...x, [key]: file_url };
      });
    } catch (e) {
      console.error('Upload failed', e);
    }
    setUploading(false);
  };

  const save = async () => {
    const payload = { ...form };
    for (const f of fields) {
      if (f.isArray && typeof payload[f.key] === 'string') {
        payload[f.key] = payload[f.key].split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    if (editing === 'new') {
      const created = await db.entities[entityName].create(payload);
      setItems(i => [...i, created]);
    } else {
      await db.entities[entityName].update(editing, payload);
      setItems(i => i.map(x => x.id === editing ? { ...x, ...payload } : x));
    }
    setEditing(null); setForm({});
  };

  const del = async (id) => {
    await db.entities[entityName].delete(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const startEdit = (item) => {
    const form = { ...item };
    for (const f of fields) {
      if (f.isArray && Array.isArray(form[f.key])) {
        form[f.key] = form[f.key].join(', ');
      }
    }
    setEditing(item.id); setForm(form);
  };
  const startNew = () => { setEditing('new'); setForm({}); };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#0A7A70] animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-jakarta font-bold text-[#0F172A] text-xl">{entityName} ({items.length})</h2>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 transition-colors">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border-2 border-[#0A7A70]/30 p-6 mb-6 shadow-lg">
          <h3 className="font-jakarta font-bold text-[#0F172A] mb-4">{editing === 'new' ? 'Add New' : 'Edit'} {entityName}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
                <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={form[f.key] || ''} onChange={e => setForm(x => ({...x, [f.key]: e.target.value}))}
                    rows={3} className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70] resize-none" />
                ) : f.type === 'select' ? (
                  <select value={form[f.key] || ''} onChange={e => setForm(x => ({...x, [f.key]: e.target.value}))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30">
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'file' ? (
                  <div className="space-y-2">
                    <input type="file" accept="image/*" onChange={e => handleFile(f.key, e.target.files[0])}
                      className="w-full text-sm font-inter file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0A7A70] file:text-white hover:file:bg-[#0A7A70]/90" />
                    {uploading && <div className="text-xs text-[#0A7A70] font-inter">Uploading...</div>}
                    {form[f.key] && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#94A3B8] font-inter truncate">{form[f.key]}</span>
                        <button onClick={() => setForm(x => ({...x, [f.key]: ''}))} className="text-xs text-red-500 font-inter hover:underline">Remove</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <input value={form[f.key] || ''} onChange={e => setForm(x => ({...x, [f.key]: e.target.value}))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]" />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 transition-colors">Save</button>
            <button onClick={() => { setEditing(null); setForm({}); }} className="px-5 py-2 rounded-lg border border-[#E2E8F0] text-[#475569] font-jakarta font-semibold text-sm hover:bg-[#F8FAFC] transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-jakarta font-semibold text-[#0F172A] text-sm">{item[displayField]}</div>
              {item.description && <div className="font-inter text-xs text-[#94A3B8] mt-0.5 truncate max-w-md">{item.description || item.shortDescription}</div>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => startEdit(item)} className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0A7A70] hover:border-[#0A7A70]/30 flex items-center justify-center transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => del(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && <p className="text-center font-inter text-[#94A3B8] py-12">No items yet. Click "Add New" to start.</p>}
      </div>
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await db.auth.loginViaEmailPassword(email, password);
      if (result?.user?.role !== 'admin') {
        await db.auth.logout();
        setError('Access denied. Admin credentials required.');
        return;
      }
      onSuccess();
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0A7A70] flex items-center justify-center mb-4">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-jakarta font-extrabold text-[#0F172A] text-xl">Admin Login</h1>
            <p className="font-inter text-sm text-[#475569] mt-1">Sign in to manage your site</p>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-inter">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@solunar.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#E2E8F0] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]" required />
              </div>
            </div>
            <div>
              <label className="block font-inter text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#E2E8F0] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A70]/30 focus:border-[#0A7A70]" required />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('quotes');
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'login' | 'admin' | 'denied'

  useEffect(() => {
    db.auth.me().then(user => {
      if (!user) setAuthState('login');
      else if (user.role !== 'admin') setAuthState('denied');
      else setAuthState('admin');
    }).catch(() => setAuthState('login'));
  }, []);

  const handleLogout = () => {
    db.auth.logout();
    setAuthState('login');
  };

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0A7A70] animate-spin" />
      </div>
    );
  }

  if (authState === 'login') return <LoginForm onSuccess={() => setAuthState('admin')} />;

  if (authState === 'denied') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8 max-w-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="font-jakarta font-extrabold text-[#0F172A] text-xl mb-2">Access Denied</h1>
          <p className="font-inter text-sm text-[#475569] mb-6">You don't have admin privileges. Please sign in with an admin account.</p>
          <button onClick={() => { db.auth.logout(); setAuthState('login'); }}
            className="w-full py-2.5 rounded-lg bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 transition-colors">
            Sign in as different user
          </button>
        </div>
      </div>
    );
  }

  const serviceFields = [
    { key: 'title', label: 'Title' },
    { key: 'icon', label: 'Icon (Lucide name)', placeholder: 'Home' },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'order', label: 'Order (number)' },
  ];
  const packageFields = [
    { key: 'name', label: 'Package Name' },
    { key: 'systemSize', label: 'System Size (e.g. 5 kW)' },
    { key: 'bestFor', label: 'Best For' },
    { key: 'monthlyUnits', label: 'Monthly Units' },
    { key: 'coveragePercent', label: 'Coverage %' },
    { key: 'order', label: 'Order' },
  ];
  const productFields = [
    { key: 'name', label: 'Product Name', fullWidth: true },
    { key: 'category', label: 'Category', type: 'select', options: ['Inverter', 'Battery', 'Accessory'] },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price (PKR)' },
    { key: 'stock', label: 'Stock Quantity' },
    { key: 'image', label: 'Image', fullWidth: true, type: 'file' },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'order', label: 'Order' },
  ];
  const projectFields = [
    { key: 'title', label: 'Project Title', fullWidth: true },
    { key: 'location', label: 'Location' },
    { key: 'systemSize', label: 'System Size (e.g. 5kW)' },
    { key: 'systemType', label: 'System Type', type: 'select', options: ['On-Grid', 'Hybrid', 'Off-Grid'] },
    { key: 'completionDate', label: 'Completion Date (YYYY-MM-DD)' },
    { key: 'images', label: 'Images (comma separated URLs or upload)', fullWidth: true, isArray: true, type: 'file' },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
  ];
  const blogFields = [
    { key: 'title', label: 'Title', fullWidth: true },
    { key: 'slug', label: 'URL Slug (e.g. solar-tips-pakistan)' },
    { key: 'publishedAt', label: 'Published Date (YYYY-MM-DD)' },
    { key: 'shortDescription', label: 'Short Description', type: 'textarea', fullWidth: true },
    { key: 'content', label: 'Full Content', type: 'textarea', fullWidth: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 bg-[#0F172A] flex flex-col flex-shrink-0">
        <div className="p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0A7A70] flex items-center justify-center flex-shrink-0">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <div className="font-jakarta font-extrabold text-white text-base leading-none">Solunar</div>
              <div className="font-inter text-xs text-[#0A7A70] font-medium">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 lg:p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${activeTab === id ? 'bg-[#0A7A70] text-white' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}>
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block font-inter text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-2 lg:p-4 border-t border-white/10 space-y-1">
          <a href="/" className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#94A3B8] hover:bg-white/5 hover:text-white transition-all duration-200">
            <Eye className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block font-inter text-sm font-medium">View Site</span>
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#94A3B8] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block font-inter text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-10 max-w-5xl">
          {activeTab === 'quotes' && <QuotesTab />}
          {activeTab === 'products' && <SimpleEntityTab entityName="Product" fields={productFields} displayField="name" />}
          {activeTab === 'services' && <SimpleEntityTab entityName="Service" fields={serviceFields} displayField="title" />}
          {activeTab === 'packages' && <SimpleEntityTab entityName="SolarPackage" fields={packageFields} displayField="name" />}
          {activeTab === 'projects' && <SimpleEntityTab entityName="Project" fields={projectFields} displayField="title" />}
          {activeTab === 'reviews' && <ReviewsTab />}
          {activeTab === 'blog' && <SimpleEntityTab entityName="BlogPost" fields={blogFields} displayField="title" />}
        </div>
      </main>
    </div>
  );
}