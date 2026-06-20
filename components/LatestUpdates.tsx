'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const updates = [
  {
    image: '/images/IMG_20260611_093600.jpg',
    badge: '🏗️ දැනට සිදුවෙමින්',
    title: 'නව ධර්ම ශාලාව ඉදිකිරීම',
    description: 'අපගේ විහාරස්ථානයේ නව ධර්ම ශාලාව ඉදිකිරීමේ කටයුතු දැනට සාර්ථකව සිදුවෙමින් පවතී. මෙම ශාලාව බෞද්ධ ධර්ම දේශනා සඳහා ප්‍රධාන ස්ථානයක් වනු ඇත.',
    status: 'ඉදිකිරීම් ක්‍රියාත්මකයි',
    color: 'from-amber-700/80 to-orange-500/40',
  },
  {
    image: '/images/IMG_20260611_093856.jpg',
    badge: '🌳 දැනට සිදුවෙමින්',
    title: 'පූජනීය බෝධිය රැකබලා ගැනීම',
    description: 'අපගේ පූජනීය බෝධි වෘක්ෂයේ නඩත්තු හා රැකබලා ගැනීමේ කටයුතු දැනට සිදු කරමින් පවතී. බැතිමතුන්ගේ සහයෝගයෙන් බෝධිය සුරැකේ.',
    status: 'නඩත්තු කෙරේ',
    color: 'from-teal-700/80 to-emerald-500/40',
  },
  {
    image: '/images/IMG_20260611_094006.jpg',
    badge: '📿 දැනට ක්‍රියාත්මකයි',
    title: 'දෛනික භාවනා වැඩසටහන්',
    description: 'සෑම දිනකම උදෑසන හා සවස භාවනා වැඩසටහන් විහාරස්ථානයේදී පැවැත්වේ. සියලු බැතිමතුන්ට මෙම ආධ්‍යාත්මික වැඩසටහනට සහභාගී විය හැකිය.',
    status: 'සෑම දිනකම පැවැත්වේ',
    color: 'from-violet-700/80 to-purple-500/40',
  },
  {
    image: '/images/IMG_20260611_093703.jpg',
    badge: '📖 දැනට ක්‍රියාත්මකයි',
    title: 'සෙනසුන් අස්න ධර්ම දේශනා',
    description: 'සෑම දිනකම සවස ධර්ම දේශනා පැවැත්වේ. බුදුරජාණන් වහන්සේගේ උතුම් ධර්මය අසා දැන ගැනීමට මෙය විශේෂ අවස්ථාවකි.',
    status: 'දිනපතා පැවැත්වේ',
    color: 'from-emerald-700/80 to-green-500/40',
  },
  {
    image: '/images/IMG_20260611_094531.jpg',
    badge: '🪷 දැනට ක්‍රියාත්මකයි',
    title: 'පොහොය දින විශේෂ පූජාවන්',
    description: 'සෑම පුර පොහොය දිනයකම විශේෂ පූජාවන් හා ධර්ම දේශනා පැවැත්වේ. බැතිමතුන්ට පින් දහම් කටයුතුවලට සහභාගී වීමට ආරාධනා කරමු.',
    status: 'පොහොය දිනවල පැවැත්වේ',
    color: 'from-rose-700/80 to-pink-500/40',
  },
];

export default function LatestUpdates() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index === current || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400);
  }, [current, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % updates.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + updates.length) % updates.length);
  }, [current, goToSlide]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const update = updates[current];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-temple-cream to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-temple-green/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-2 bg-temple-gold/20 rounded-full border border-temple-gold/30 mb-6">
            <span className="text-temple-gold font-bold text-sm tracking-wide">✨ නවතම යාවත්කාලීන ✨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-temple-green-dark mb-4">
            දැනට <span className="text-gradient-green">සිදුවන</span> කටයුතු
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
        </div>

        {/* Slideshow Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Image Layer */}
          <div className="relative h-[450px] md:h-[550px]">
            {updates.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-temple-gold/50 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Text Overlay - Changes with each image */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {/* Badge */}
              <div className="inline-block self-start px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-4">
                <span className="text-white font-bold text-sm">{update.badge}</span>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
                {update.title}
              </h3>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mb-6 drop-shadow-md">
                {update.description}
              </p>

              {/* Status Badge */}
              <div className="inline-block self-start px-5 py-2.5 bg-temple-gold/90 backdrop-blur-sm rounded-full">
                <span className="text-white font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {update.status}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/15 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/15 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {updates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? 'w-10 h-3 bg-temple-gold'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-6 right-6 z-30 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full">
            <span className="text-white text-sm font-medium">
              {current + 1} / {updates.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
