'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSiteSettings } from '@/lib/useSupabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings] = useSiteSettings();
  const siteName = settings.site_name || 'හරිතගිරි විහාරය';
  const siteNameEn = settings.site_name_en || 'Harithagiri Viharaya';

  const navLinks = [
    { href: '/', label: 'මුල් පිටුව' },
    { href: '/about', label: 'පිළිබඳව' },
    { href: '/gallery', label: 'ගැලරිය' },
    { href: '/dayaka-sabhawa', label: 'දායක සභාව' },
    { href: '/dayaka', label: 'දායක වන්න' },
    { href: '/vihara-adhikari', label: 'විහාරාධිපති' },
    { href: '/sthana', label: 'ස්ථාන' },
    { href: '/uthsawa', label: 'උත්සව' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg animate-pulse-glow group-hover:scale-110 transition-transform bg-white">
              <Image
                src="/logo.png"
                alt="හරිතගිරි විහාරය ලාංඡනය"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-temple-green group-hover:text-temple-gold transition-colors">{siteName}</h1>
              <p className="text-xs text-gray-600">{siteNameEn}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-temple-green hover:text-white hover:bg-temple-green transition-all duration-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-temple-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-temple-green hover:bg-temple-cream"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-temple-green hover:text-temple-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
