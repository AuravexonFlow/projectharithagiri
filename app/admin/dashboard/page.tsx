'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Admin API helper — routes writes through /api/admin (service role) to bypass RLS
async function adminApi(action: string, table: string, opts?: { data?: unknown; id?: string; filters?: Record<string, unknown> }) {
  const token = sessionStorage.getItem('adminToken');
  const res = await fetch('/api/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ action, table, ...opts }),
  });
  if (res.status === 401) {
    sessionStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'API error');
  return json;
}

type Tab = 'overview' | 'donors' | 'events' | 'gallery' | 'news' | 'committee' | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) { router.push('/admin/login'); return; }
    setIsAuthenticated(true);
    fetchCounts();
  }, [router]);

  const fetchCounts = useCallback(async () => {
    const tables = ['donors', 'events', 'gallery_images', 'news_updates', 'committee_members', 'temple_places'];
    const result: Record<string, number> = {};
    for (const table of tables) {
      try {
        const res = await adminApi('count', table);
        result[table] = res.count || 0;
      } catch {
        result[table] = 0;
      }
    }
    setCounts(result);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-temple-green text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h1 className="text-2xl font-bold">හරිතගිරි විහාරය - පරිපාලක</h1>
              <p className="text-sm text-temple-cream/70">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-temple-cream/80 hover:text-white underline">← වෙබ් අඩවිය</a>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm">
              ඉවත් වන්න
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <nav className="w-56 shrink-0 space-y-1">
          {([
            { key: 'overview', icon: '📊', label: 'සාරාංශය' },
            { key: 'donors', icon: '🙏', label: 'දායකයින්' },
            { key: 'events', icon: '🎉', label: 'උත්සව' },
            { key: 'gallery', icon: '📸', label: 'ගැලරිය' },
            { key: 'news', icon: '📰', label: 'පුවත්' },
            { key: 'committee', icon: '👥', label: 'කමිටුව' },
            { key: 'settings', icon: '⚙️', label: 'සැකසුම්' },
          ] as const).map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === item.key
                  ? 'bg-temple-green text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-temple-cream'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && <OverviewTab counts={counts} />}
          {activeTab === 'donors' && <DonorsTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'committee' && <CommitteeTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

/* ============================================
   Overview Tab
   ============================================ */
function OverviewTab({ counts }: { counts: Record<string, number> }) {
  const cards = [
    { key: 'donors', icon: '🙏', label: 'දායකයින්', color: 'bg-blue-500' },
    { key: 'events', icon: '🎉', label: 'උත්සව', color: 'bg-purple-500' },
    { key: 'gallery_images', icon: '📸', label: 'ඡායාරූප', color: 'bg-green-500' },
    { key: 'news_updates', icon: '📰', label: 'පුවත්', color: 'bg-amber-500' },
    { key: 'committee_members', icon: '👥', label: 'කමිටු සාමාජිකයින්', color: 'bg-rose-500' },
    { key: 'temple_places', icon: '🏛️', label: 'ස්ථාන', color: 'bg-teal-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 සාරාංශය</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.key} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-temple-gold">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                {card.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{counts[card.key] ?? 0}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">ඉඟිය</h3>
        <p className="text-gray-600 text-sm">
          දත්ත එක් කිරීමට අදාළ ටැබ් එක තෝරන්න. එක් කළ දත්ත වෙබ් අඩවියේ පිටුවල ස්වයංක්‍රීයව පෙන්වනු ඇත.
        </p>
      </div>
    </div>
  );
}

/* ============================================
   Donors Tab
   ============================================ */
function DonorsTab() {
  const [donors, setDonors] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ name: '', name_si: '', contribution: '', amount: '', year: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const fetchDonors = useCallback(async () => {
    const { data } = await supabase.from('donors').select('*').order('created_at', { ascending: false });
    setDonors(data || []);
  }, []);

  useEffect(() => { fetchDonors(); }, [fetchDonors]);

  const addDonor = async () => {
    if (!form.name) return;
    setLoading(true);
    try {
      await adminApi('insert', 'donors', {
        data: {
          name: form.name, name_si: form.name_si || null,
          contribution: form.contribution || null,
          amount: form.amount ? parseFloat(form.amount) : null,
          year: form.year || null, phone: form.phone || null, address: form.address || null,
        }
      });
      setForm({ name: '', name_si: '', contribution: '', amount: '', year: '', phone: '', address: '' });
      fetchDonors();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  const deleteDonor = async (id: string) => {
    if (!confirm('ඔබට මෙය මැකීමට අවශ්‍යද?')) return;
    try { await adminApi('delete', 'donors', { id }); fetchDonors(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🙏 දායකයින් කළමනාකරණය</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4">නව දායකයෙකු එක් කරන්න</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input placeholder="නම (English)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="නම (සිංහල)" value={form.name_si} onChange={e => setForm({...form, name_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="දායකත්වය" value={form.contribution} onChange={e => setForm({...form, contribution: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="මුදල (රු.)" type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="වර්ෂය" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="දුරකථන" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="ලිපිනය" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <button onClick={addDonor} disabled={loading} className="bg-temple-green text-white rounded-lg hover:bg-temple-green-dark disabled:opacity-50 text-sm font-medium">
            {loading ? 'එක් වෙමින්...' : '➕ එක් කරන්න'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4">දායක ලැයිස්තුව ({donors.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-gray-200 text-left text-gray-500">
              <th className="py-2 px-3">#</th><th className="py-2 px-3">නම</th><th className="py-2 px-3">දායකත්වය</th><th className="py-2 px-3">වර්ෂය</th><th className="py-2 px-3">ක්‍රියා</th>
            </tr></thead>
            <tbody>
              {donors.map((d, i) => (
                <tr key={d.id as string} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{i + 1}</td>
                  <td className="py-2 px-3 font-medium">{(d.name_si as string) || (d.name as string)}</td>
                  <td className="py-2 px-3">{d.amount ? `රු. ${Number(d.amount).toLocaleString()}` : (d.contribution as string)}</td>
                  <td className="py-2 px-3">{d.year as string}</td>
                  <td className="py-2 px-3"><button onClick={() => deleteDonor(d.id as string)} className="text-red-500 hover:text-red-700 text-xs">🗑️ මකන්න</button></td>
                </tr>
              ))}
              {donors.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">දායකයින් නැත</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   Events Tab
   ============================================ */
function EventsTab() {
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ name: '', name_si: '', date: '', description: '', description_si: '', youtube_id: '' });
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setEvents(data || []);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const addEvent = async () => {
    if (!form.name) return;
    setLoading(true);
    try {
      await adminApi('insert', 'events', {
        data: {
          name: form.name, name_si: form.name_si || null,
          date: form.date || null, description: form.description || null,
          description_si: form.description_si || null, youtube_id: form.youtube_id || null,
        }
      });
      setForm({ name: '', name_si: '', date: '', description: '', description_si: '', youtube_id: '' });
      fetchEvents();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('මැකීමට අවශ්‍යද?')) return;
    try { await adminApi('delete', 'events', { id }); fetchEvents(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🎉 උත්සව කළමනාකරණය</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">නව උත්සවයක් එක් කරන්න</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="නම (English)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="නම (සිංහල)" value={form.name_si} onChange={e => setForm({...form, name_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="දිනය" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="YouTube Video ID" value={form.youtube_id} onChange={e => setForm({...form, youtube_id: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <textarea placeholder="විස්තරය (English)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" rows={2} />
          <textarea placeholder="විස්තරය (සිංහල)" value={form.description_si} onChange={e => setForm({...form, description_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" rows={2} />
          <button onClick={addEvent} disabled={loading} className="bg-temple-green text-white rounded-lg hover:bg-temple-green-dark disabled:opacity-50 text-sm font-medium md:col-span-2">
            {loading ? 'එක් වෙමින්...' : '➕ එක් කරන්න'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">උත්සව ලැයිස්තුව ({events.length})</h3>
        <div className="space-y-3">
          {events.map(e => (
            <div key={e.id as string} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-temple-green">{(e.name_si as string) || (e.name as string)}</h4>
                <p className="text-sm text-temple-gold">{e.date as string}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{(e.description_si as string) || (e.description as string)}</p>
              </div>
              <button onClick={() => deleteEvent(e.id as string)} className="text-red-500 hover:text-red-700 text-xs shrink-0 ml-4">🗑️</button>
            </div>
          ))}
          {events.length === 0 && <p className="text-center text-gray-400 py-8">උත්සව නැත</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   Gallery Tab
   ============================================ */
function GalleryTab() {
  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const [images, setImages] = useState<Record<string, unknown>[]>([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('gallery_categories').select('*').order('created_at', { ascending: false });
    setCategories(data || []);
  }, []);

  const fetchImages = useCallback(async () => {
    let query = supabase.from('gallery_images').select('*, category:gallery_categories(name)').order('created_at', { ascending: false });
    if (selectedCat) query = query.eq('category_id', selectedCat);
    const { data } = await query;
    setImages(data || []);
  }, [selectedCat]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchImages(); }, [fetchImages]);

  const addImage = async () => {
    if (!selectedCat || !imageUrl) return;
    setLoading(true);
    try {
      await adminApi('insert', 'gallery_images', {
        data: { category_id: selectedCat, image_url: imageUrl, title: imageTitle || null }
      });
      setImageUrl(''); setImageTitle(''); fetchImages();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  const deleteImage = async (id: string) => {
    if (!confirm('මැකීමට අවශ්‍යද?')) return;
    try { await adminApi('delete', 'gallery_images', { id }); fetchImages(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📸 ගැලරිය කළමනාකරණය</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">ඡායාරූපයක් එක් කරන්න</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">කාණ්ඩය තෝරන්න...</option>
            {categories.map(c => <option key={c.id as string} value={c.id as string}>{(c.icon as string) || ''} {c.name as string}</option>)}
          </select>
          <input placeholder="ඡායාරූප URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="මාතෘකාව (විකල්ප)" value={imageTitle} onChange={e => setImageTitle(e.target.value)} className="px-3 py-2 border rounded-lg text-sm" />
        </div>
        <button onClick={addImage} disabled={loading || !selectedCat || !imageUrl} className="mt-3 bg-temple-green text-white px-4 py-2 rounded-lg hover:bg-temple-green-dark disabled:opacity-50 text-sm">
          {loading ? 'එක් වෙමින්...' : '➕ එක් කරන්න'}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedCat('')} className={`px-3 py-1 rounded-full text-sm ${!selectedCat ? 'bg-temple-green text-white' : 'bg-gray-200'}`}>සියල්ල</button>
        {categories.map(c => (
          <button key={c.id as string} onClick={() => setSelectedCat(c.id as string)}
            className={`px-3 py-1 rounded-full text-sm ${selectedCat === c.id ? 'bg-temple-green text-white' : 'bg-gray-200'}`}>
            {(c.icon as string) || '📷'} {c.name as string}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">ඡායාරූප ({images.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.id as string} className="relative group rounded-lg overflow-hidden border">
              <img src={img.image_url as string} alt={(img.title as string) || ''} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => deleteImage(img.id as string)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">🗑️</button>
              </div>
              <p className="text-xs p-2 truncate">{img.title as string}</p>
            </div>
          ))}
          {images.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">ඡායාරූප නැත</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   News Tab
   ============================================ */
function NewsTab() {
  const [news, setNews] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ title: '', title_si: '', content: '', content_si: '', image_url: '' });
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    const { data } = await supabase.from('news_updates').select('*').order('created_at', { ascending: false });
    setNews(data || []);
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const addNews = async () => {
    if (!form.title) return;
    setLoading(true);
    try {
      await adminApi('insert', 'news_updates', {
        data: {
          title: form.title, title_si: form.title_si || null,
          content: form.content || null, content_si: form.content_si || null,
          image_url: form.image_url || null, is_published: true,
        }
      });
      setForm({ title: '', title_si: '', content: '', content_si: '', image_url: '' });
      fetchNews();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  const togglePublish = async (id: string, current: boolean) => {
    try { await adminApi('update', 'news_updates', { id, data: { is_published: !current } }); fetchNews(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  const deleteNews = async (id: string) => {
    if (!confirm('මැකීමට අවශ්‍යද?')) return;
    try { await adminApi('delete', 'news_updates', { id }); fetchNews(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📰 පුවත් කළමනාකරණය</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">නව පුවතක් එක් කරන්න</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="මාතෘකාව (English)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="මාතෘකාව (සිංහල)" value={form.title_si} onChange={e => setForm({...form, title_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="ඡායාරූප URL" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="px-3 py-2 border rounded-lg text-sm md:col-span-2" />
          <textarea placeholder="අන්තර්ගතය (English)" value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" rows={3} />
          <textarea placeholder="අන්තර්ගතය (සිංහල)" value={form.content_si} onChange={e => setForm({...form, content_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" rows={3} />
          <button onClick={addNews} disabled={loading} className="bg-temple-green text-white rounded-lg hover:bg-temple-green-dark disabled:opacity-50 text-sm font-medium md:col-span-2">
            {loading ? 'එක් වෙමින්...' : '➕ එක් කරන්න'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">පුවත් ({news.length})</h3>
        <div className="space-y-3">
          {news.map(n => (
            <div key={n.id as string} className="border rounded-lg p-4 flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold">{(n.title_si as string) || (n.title as string)}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{(n.content_si as string) || (n.content as string)}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => togglePublish(n.id as string, n.is_published as boolean)}
                    className={`text-xs px-2 py-0.5 rounded ${n.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {n.is_published ? '✅ ප්‍රකාශිත' : '📝 කෙටුම්පත'}
                  </button>
                </div>
              </div>
              <button onClick={() => deleteNews(n.id as string)} className="text-red-500 hover:text-red-700 text-xs shrink-0 ml-4">🗑️</button>
            </div>
          ))}
          {news.length === 0 && <p className="text-center text-gray-400 py-8">පුවත් නැත</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   Committee Tab
   ============================================ */
function CommitteeTab() {
  const [members, setMembers] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({
    name: '', name_si: '', role: '', role_si: '', category: 'committee',
    description_si: '', photo: '', initials: '', phone: '', email: ''
  });
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    president: { label: 'සභාපති', icon: '🌟' },
    officer: { label: 'නිලධාරින්', icon: '👔' },
    committee: { label: 'කාරක සභිකයින්', icon: '👥' },
    representative: { label: 'ප්‍රදේශ නියෝජිත්‍යින්', icon: '📍' },
  };

  const colorOptions = [
    'from-temple-green to-temple-green-dark',
    'from-temple-gold to-yellow-600',
    'from-temple-green to-emerald-700',
    'from-purple-500 to-indigo-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-teal-500 to-cyan-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-green-600',
    'from-sky-500 to-blue-600',
    'from-fuchsia-500 to-purple-600',
    'from-lime-500 to-green-600',
    'from-red-500 to-rose-600',
  ];

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from('committee_members').select('*').order('display_order', { ascending: true });
    setMembers(data || []);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const addMember = async () => {
    if (!form.name || !form.role) return;
    setLoading(true);
    try {
      const maxOrder = members.length > 0 ? Math.max(...members.map(m => (m.display_order as number) || 0)) : 0;
      await adminApi('insert', 'committee_members', {
        data: {
          name: form.name, name_si: form.name_si || null,
          role: form.role, role_si: form.role_si || null,
          category: form.category,
          description_si: form.description_si || null,
          photo: form.photo || null,
          initials: form.initials || form.name.split(' ').map((w: string) => w[0]).join('').substring(0, 3).toUpperCase(),
          color: colorOptions[members.length % colorOptions.length],
          phone: form.phone || null, email: form.email || null,
          display_order: maxOrder + 1,
        }
      });
      setForm({ name: '', name_si: '', role: '', role_si: '', category: form.category, description_si: '', photo: '', initials: '', phone: '', email: '' });
      fetchMembers();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  const deleteMember = async (id: string) => {
    if (!confirm('මැකීමට අවශ්‍යද?')) return;
    try { await adminApi('delete', 'committee_members', { id }); fetchMembers(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try { await adminApi('update', 'committee_members', { id, data: { is_active: !current } }); fetchMembers(); } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
  };

  const filtered = filterCategory === 'all' ? members : members.filter(m => m.category === filterCategory);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">👥 කමිටු සාමාජිකයින්</h2>

      {/* Add Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">නව සාමාජියෙකු එක් කරන්න</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
            <option value="president">🌟 සභාපති</option>
            <option value="officer">👔 නිලධාරින්</option>
            <option value="committee">👥 කාරක සභිකයින්</option>
            <option value="representative">📍 ප්‍රදේශ නියෝජිත්‍යින්</option>
          </select>
          <input placeholder="නම (English)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="නම (සිංහල)" value={form.name_si} onChange={e => setForm({...form, name_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="තනතුර (English)" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="තනතුර (සිංහල)" value={form.role_si} onChange={e => setForm({...form, role_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="කෙටි නම (initials, e.g. S.A)" value={form.initials} onChange={e => setForm({...form, initials: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="පින්තූර URL (විකල්ප)" value={form.photo} onChange={e => setForm({...form, photo: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <input placeholder="විස්තරය (සිංහල)" value={form.description_si} onChange={e => setForm({...form, description_si: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
          <button onClick={addMember} disabled={loading} className="bg-temple-green text-white rounded-lg hover:bg-temple-green-dark disabled:opacity-50 text-sm font-medium">
            {loading ? 'එක් වෙමින්...' : '➕ එක් කරන්න'}
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterCategory('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === 'all' ? 'bg-temple-green text-white' : 'bg-white text-gray-600 border'}`}>
          සියල්ල ({members.length})
        </button>
        {Object.entries(categoryLabels).map(([key, { label, icon }]) => {
          const count = members.filter(m => m.category === key).length;
          return (
            <button key={key} onClick={() => setFilterCategory(key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === key ? 'bg-temple-green text-white' : 'bg-white text-gray-600 border'}`}>
              {icon} {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">සාමාජිකයින් ({filtered.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(m => {
            const cat = categoryLabels[m.category as string] || { label: m.category as string, icon: '👤' };
            return (
              <div key={m.id as string} className={`border rounded-lg p-4 flex justify-between items-start ${!(m.is_active as boolean) ? 'opacity-50 bg-gray-50' : ''}`}>
                <div className="flex items-start gap-3">
                  {m.photo ? (
                    <img src={m.photo as string} alt={m.name as string} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${(m.color as string) || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white text-sm font-bold`}>
                      {(m.initials as string) || '?'}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{(m.name_si as string) || (m.name as string)}</h4>
                    <p className="text-sm text-temple-gold">{cat.icon} {(m.role_si as string) || (m.role as string)}</p>
                    {(m.description_si as string) && <p className="text-xs text-gray-500 mt-1">{m.description_si as string}</p>}
                    {(m.phone as string) && <p className="text-xs text-gray-500">📞 {m.phone as string}</p>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toggleActive(m.id as string, m.is_active as boolean)} className={`text-xs px-2 py-1 rounded ${m.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {m.is_active ? 'සක්‍රීය' : 'අක්‍රීය'}
                  </button>
                  <button onClick={() => deleteMember(m.id as string)} className="text-red-500 hover:text-red-700 text-xs">🗑️</button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">සාමාජිකයින් නැත</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   Settings Tab
   ============================================ */
const settingLabels: Record<string, { label: string; icon: string; placeholder: string }> = {
  site_name: { label: 'විහාරස්ථානයේ නම (සිංහල)', icon: '🏛️', placeholder: 'හරිතගිරි විහාරය' },
  site_name_en: { label: 'විහාරස්ථානයේ නම (English)', icon: '🔤', placeholder: 'Harithagiri Viharaya' },
  address: { label: 'ලිපිනය', icon: '📍', placeholder: 'හරිත ගම, ශ්‍රී ලංකාව' },
  phone: { label: 'දුරකථන අංකය', icon: '📞', placeholder: '+94 77 430 3310' },
  email: { label: 'ඊමේල් ලිපිනය', icon: '✉️', placeholder: 'harithagamapansala@gmail.com' },
  facebook: { label: 'Facebook පිටුව', icon: '📘', placeholder: 'https://facebook.com/...' },
  youtube: { label: 'YouTube නාලිකාව', icon: '📺', placeholder: 'https://youtube.com/...' },
};

function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('*').order('key');
    setSettings(data || []);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSetting = async (key: string, value: string) => {
    setLoading(true);
    try {
      await adminApi('upsert', 'site_settings', { data: { key, value }, filters: { onConflict: 'key' } });
      fetchSettings();
    } catch (err) { alert('දෝෂයකි: ' + (err as Error).message); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">⚙️ අඩවි සැකසුම්</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-sm text-gray-500 mb-6">ඔබේ විහාරස්ථානයේ මූලික තොරතුරු මෙහි සකස් කරන්න.</p>
        <div className="space-y-5">
          {settings.map(s => {
            const key = s.key as string;
            const meta = settingLabels[key] || { label: key, icon: '⚙️', placeholder: '' };
            return (
              <div key={key} className="border border-gray-100 rounded-xl p-4 hover:border-temple-green/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{meta.label}</p>
                    <p className="text-xs text-gray-400 font-mono">{key}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    value={(s.value as string) || ''}
                    onChange={e => {
                      const updated = settings.map(item =>
                        item.key === key ? { ...item, value: e.target.value } : item
                      );
                      setSettings(updated);
                    }}
                    placeholder={meta.placeholder}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-temple-green/30 focus:border-temple-green outline-none transition-all"
                  />
                  <button
                    onClick={() => updateSetting(key, (s.value as string) || '')}
                    disabled={loading}
                    className="bg-temple-green text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-temple-green-dark disabled:opacity-50 transition-colors"
                  >
                    💾 සුරකින්න
                  </button>
                </div>
              </div>
            );
          })}
          {settings.length === 0 && <p className="text-center text-gray-400 py-8">සැකසුම් නැත</p>}
        </div>
      </div>
    </div>
  );
}
