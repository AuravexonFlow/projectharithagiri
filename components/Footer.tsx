'use client';

import Image from 'next/image';
import { useSiteSettings } from '@/lib/useSupabase';

export default function Footer() {
  const [settings] = useSiteSettings();
  const siteName = settings.site_name || 'හරිතගිරි විහාරය';
  const address = settings.address || 'හරිත ගම';
  const phone = settings.phone || '';
  const email = settings.email || '';
  const facebook = settings.facebook || '#';
  const youtube = settings.youtube || '#';

  return (
    <footer className="bg-temple-green text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            <p className="text-sm opacity-90">
              ගුණ ධර්ම මතින් ගොඩ නැගෙන යහපත් පරපුරක් තනන අපේ නවෝදයේ පින්බිම
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">සම්බන්ධ වන්න</h3>
            <div className="text-sm opacity-90 space-y-1">
              {address && <p>📍 {address}</p>}
              {phone && <p>📞 {phone}</p>}
              {email && <p>✉️ {email}</p>}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">අනුගමනය කරන්න</h3>
            <div className="flex space-x-4">
              {facebook && facebook !== '#' && <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-temple-gold transition-colors">Facebook</a>}
              {youtube && youtube !== '#' && <a href={youtube} target="_blank" rel="noopener noreferrer" className="hover:text-temple-gold transition-colors">YouTube</a>}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2026 හරිතගිරි විහාරය. සියලු හිමිකම් ඇවිරිණි.</p>
          <p>
            Designed & Developed by{' '}
            <a href="https://auravexon.tech/" target="_blank" rel="noopener noreferrer" className="text-temple-gold font-semibold hover:underline">Ravindu Madhushan</a>
          </p>
          <p className="text-[11px] opacity-60 mt-0.5">
            Founder & Owner — <a href="https://auravexon.tech/" target="_blank" rel="noopener noreferrer" className="hover:underline">Auravexon Flow Ecosystem</a>
          </p>
          <div className="mt-5 flex items-center justify-center gap-5">
            <a href="https://auravexon.tech/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-temple-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] group-hover:border-temple-gold transition-all duration-500 bg-black">
                <Image src="/images/auravexon-codex.png" alt="Auravexon Codex" fill sizes="64px" className="object-contain" />
              </div>
              <span className="text-[11px] font-medium text-temple-gold/80 group-hover:text-temple-gold tracking-wide transition-colors">Auravexon Codex</span>
            </a>

            <div className="flex flex-col items-center gap-1 pb-5">
              <div className="w-px h-3 bg-temple-gold/30"></div>
              <span className="text-temple-gold/40 text-[10px]">✦</span>
              <div className="w-px h-3 bg-temple-gold/30"></div>
            </div>

            <a href="https://auravexon.tech/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-temple-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] group-hover:border-temple-gold transition-all duration-500 bg-white p-1.5">
                <Image src="/images/auravexon-flow.jpg" alt="Auravexon Flow" fill sizes="64px" className="object-contain" />
              </div>
              <span className="text-[11px] font-medium text-temple-gold/80 group-hover:text-temple-gold tracking-wide transition-colors">Auravexon Flow</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
