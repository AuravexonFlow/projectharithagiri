'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Official {
  id: string;
  name: string;
  name_si: string;
  title: string;
  title_si: string;
  image_url: string;
  bio: string;
  bio_si: string;
}

export default function ViharaAdhikariPage() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOfficials() {
      const { data } = await supabase.from('temple_officials').select('*').eq('is_active', true).order('display_order');
      if (data && data.length > 0) setOfficials(data as Official[]);
      setLoading(false);
    }
    fetchOfficials();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">පූරණය වෙමින්...</p></div>;

  if (officials.length > 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-temple-green mb-4">විහාරාධිපති</h1>
          <p className="text-xl text-gray-600">හරිතගිරි විහාරයේ ප්‍රධාන භික්ෂූන් වහන්සේ</p>
          <div className="mt-6 w-32 h-1 bg-gradient-to-r from-temple-gold via-temple-green to-temple-gold mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {officials.map(o => (
            <div key={o.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-temple-gold/30">
              {o.image_url && (
                <div className="relative h-64 w-full">
                  <Image src={o.image_url} alt={o.name_si || o.name} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-temple-green mb-2">{o.name_si || o.name}</h2>
                <p className="text-temple-gold font-semibold mb-3">{o.title_si || o.title}</p>
                {o.bio_si && <p className="text-gray-700 leading-relaxed">{o.bio_si}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback to hardcoded content
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-temple-green mb-4">විහාරාධිපති</h1>
        <p className="text-xl text-gray-600">හරිතගිරි විහාරයේ ප්‍රධාන භික්ෂූන් වහන්සේ</p>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-temple-gold via-temple-green to-temple-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Photo */}
        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl sacred-glow">
          <Image
            src="/images/vihara-adhikari.jpg"
            alt="විහාරාධිපති හිමියන්"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-lg font-semibold drop-shadow-lg">පූජ්ය ලේල්වල විජිතදේව නාහිමියන්</p>
            <p className="text-sm opacity-90 drop-shadow-lg">හරිතගිරි විහාරයේ විහාරාධිපති</p>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6">
          {/* Name and Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 enchanted-hover border-2 border-temple-gold/30">
            <h2 className="text-3xl font-bold text-gradient-green mb-4">
              පූජ්ය ලේල්වල විජිතදේව නාහිමියන්
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              හරිතගිරි විහාරයේ වර්තමාන විහාරාධිපති වහන්සේ බෞද්ධ ධර්මය 
              ප්‍රචාරය කිරීම සහා වසර ගණනාවක් පුරා කැපවී සිටී.
            </p>
            
            {/* Info Cards Grid - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education */}
              <div className="flex items-start space-x-3 p-4 bg-temple-cream rounded-xl hover:bg-temple-gold/10 transition-all duration-300 hover:shadow-md">
                <span className="text-temple-gold text-2xl">🎓</span>
                <div>
                  <h3 className="font-bold text-temple-green text-lg">අධ්‍යාපනය</h3>
                  <p className="text-gray-700 font-semibold">B.A. | Dip in Psychology</p>
                  <p className="text-gray-600 text-sm">විශ්වවිද්‍යාල පාධිධාරී</p>
                </div>
              </div>
              
              {/* Viharadhipathi Role */}
              <div className="flex items-start space-x-3 p-4 bg-temple-cream rounded-xl hover:bg-temple-gold/10 transition-all duration-300 hover:shadow-md">
                <span className="text-temple-gold text-2xl">🏛️</span>
                <div>
                  <h3 className="font-bold text-temple-green text-lg">විහාරාධිපති</h3>
                  <p className="text-gray-700 font-semibold">හරිතගිරි විහාරය</p>
                  <p className="text-gray-600 text-sm">ප්‍රධාන භික්ෂූන් වහන්සේ</p>
                </div>
              </div>
            </div>
          </div>
              
          {/* Highlighted Cards - Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Association President - Highlighted */}
            <div className="flex items-start space-x-3 p-5 bg-gradient-to-r from-temple-gold/20 to-temple-cream rounded-xl border-l-4 border-temple-gold shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-temple-gold text-2xl"></span>
                <div>
                  <h3 className="font-bold text-temple-green text-lg">අක්මීමණ දහම් ගුරු සංගමයේ සාපති</h3>
                  <p className="text-gray-700 font-semibold">Akmeemana Dhamma Teachers Association - President</p>
                  <p className="text-gray-600 text-sm mt-1">ධර්ම අධ්‍යාපනය ප්‍රවර්ධනය කිරීම සඳහා නායකත්වය ලබා දෙයි</p>
                </div>
            </div>
              
            {/* Monastic Years - Highlighted */}
            <div className="flex items-start space-x-3 p-5 bg-gradient-to-r from-temple-green/10 to-temple-cream rounded-xl border-l-4 border-temple-green shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-temple-green text-2xl"></span>
                <div>
                  <h3 className="font-bold text-temple-green text-lg">පැවිදි දිවියේ වසර</h3>
                  <p className="text-gray-700 font-semibold">පැවිදි දිවියට වසර 26 ක්</p>
                  <p className="text-gray-600 text-sm mt-1">උපසම්පදා දිවියට වසර 17 ක්</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Green Contact Section - Full Width */}
      <div className="mt-12 bg-gradient-to-br from-temple-green via-temple-green-dark to-temple-green rounded-2xl p-10 sm:p-14 text-white sacred-glow min-h-[400px]">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">📞</span>
          සම්බන්ධ වන්න
        </h3>
        <p className="text-lg leading-relaxed mb-8">
          ධර්ම දේශනා, උපදෙස් හෝ විහාරය පිළිබඳව තොරතුරු සඳහා 
          විහාරාධිපති හිමියන් අමතන්න.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold">පිහිටීම</p>
              <p className="text-sm opacity-90">හරිතගම, අක්මීමණ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="font-semibold">දහම් සාකච්ඡා</p>
              <p className="text-sm opacity-90">සෑම දිනකම පැවැත්වේ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-semibold">දුරකථන</p>
              <p className="text-sm opacity-90">+94 77 430 3310</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">🌐</span>
            <div>
              <p className="font-semibold">වෙබ් අඩවිය</p>
              <p className="text-sm opacity-90">harithagiri-viharaya.lk</p>
            </div>
          </div>
        </div>
        {/* Dharma Programs Section */}
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🙏</span> ධර්ම කටයුතු
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-2xl mb-2">📖</p>
              <p className="font-semibold text-sm">සෙනසුන් අස්න</p>
              <p className="text-xs opacity-80">සතියේ සෑම දිනකම</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-2xl mb-2">🧘</p>
              <p className="font-semibold text-sm">භාවනා වැඩසටහන්</p>
              <p className="text-xs opacity-80">සතියේ සෙනසුරාදා</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-2xl mb-2">🪷</p>
              <p className="font-semibold text-sm">පොහොය දින වැඩසටහන්</p>
              <p className="text-xs opacity-80">පුර පොහොය දින</p>
            </div>
          </div>
        </div>
        {/* Quote Section */}
        <div className="pt-5 border-t border-white/20">
          <p className="text-sm opacity-80 text-center italic">
            "සබ්බදානං ධම්මදානං ජිනාති" — සියලු දානයන් අතරින් ධර්ම දානය උතුම් වේ
          </p>
        </div>
      </div>
    </div>
  );
}
