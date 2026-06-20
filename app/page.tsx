import Image from 'next/image';
import Link from 'next/link';
import LatestUpdates from '@/components/LatestUpdates';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Enhanced */}
      <section className="relative h-[800px] overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_20260611_093651.jpg"
            alt="හරිතගිරි විහාරයේ ස්තූපය"
            fill
            className="object-cover scale-110 animate-float"
            priority
            style={{ objectPosition: 'center' }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-temple-green/90 via-temple-green-dark/80 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-temple-green/30"></div>
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-temple-gold/20 rounded-full animate-rotate-slow"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border-4 border-temple-gold/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="text-white space-y-8 animate-fade-in max-w-5xl">
            {/* Badge */}
            <div className="inline-block px-6 py-3 glass-effect rounded-full border-2 border-temple-gold/50 mb-6 animate-pulse-glow">
              <span className="text-temple-gold font-bold text-lg tracking-wide">✨ හරිත ගමේ ශාන්ත භූමිය ✨</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-7xl md:text-9xl font-black drop-shadow-2xl leading-tight text-gradient-gold animate-scale-in">
              හරිතගිරි විහාරය
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-4xl opacity-95 font-light max-w-4xl mx-auto leading-relaxed animate-slide-up">
              ගුණ ධර්ම මතින් ගොඩ නැගෙන යහපත් පරපුරක් තනන අපේ නවෝදයේ පින්බිම
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/about"
                className="group relative bg-gradient-to-r from-temple-gold to-yellow-500 text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-110 shimmer overflow-hidden flex items-center justify-center gap-3"
              >
                <span className="relative z-10">තවත් දැනගන්න</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/gallery"
                className="group bg-white/20 backdrop-blur-md border-3 border-white/50 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-110 shadow-xl flex items-center justify-center gap-3"
              >
                <span>📸 ගැලරිය</span>
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-3 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-2 h-3 bg-temple-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Latest Updates Slideshow */}
      <LatestUpdates />

      {/* Introduction Cards - Enhanced with Real Images */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-black text-gradient-green mb-4">
            අපගේ විහාරස්ථානය
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Card */}
          <Link href="/about" className="card-hover group bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-temple-gold/50">
            <div className="relative h-64 image-zoom">
              <Image
                src="/images/IMG_20260611_093710.jpg"
                alt="විහාරස්ථානය"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-6xl">🏛️</div>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gradient-green mb-3">පිළිබඳව</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                හරිතගිරි විහාරයේ ඉතිහාසය සහ අරමුණු පිළිබඳව දැනගන්න
              </p>
              <div className="mt-4 text-temple-gold font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
                කියවන්න →
              </div>
            </div>
          </Link>

          {/* Gallery Card */}
          <Link href="/gallery" className="card-hover group bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-temple-gold/50">
            <div className="relative h-64 image-zoom">
              <Image
                src="/images/IMG_20260611_094048.jpg"
                alt="බෝධිය"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-6xl">📸</div>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gradient-green mb-3">ගැලරිය</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                විහාරස්ථානයේ සුන්දර ඡායාරූප 123+ නරඹන්න
              </p>
              <div className="mt-4 text-temple-gold font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
                බලන්න →
              </div>
            </div>
          </Link>

          {/* Events Card */}
          <Link href="/uthsawa" className="card-hover group bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-temple-gold/50">
            <div className="relative h-64 image-zoom">
              <Image
                src="/images/IMG_20260611_094531.jpg"
                alt="උත්සව"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-6xl">🎉</div>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gradient-green mb-3">උත්සව</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                විහාරයේ පැවැත්වෙන උත්සව සහ විශේෂ අවස්ථා
              </p>
              <div className="mt-4 text-temple-gold font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
                සොයා බලන්න →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Stupa Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-white via-temple-cream to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-temple-green/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="animate-slide-in-left space-y-6">
              <div className="inline-block px-4 py-2 bg-temple-gold/20 rounded-full border border-temple-gold/30">
                <span className="text-temple-gold font-bold text-sm">🕉️ පූජනීය ස්ථානය</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gradient-green leading-tight">
                මුනි උත්තම ආංගීරස මහා සෑය
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                හරිතගිරි විහාරයේ ආංගීරස මහා සෑය බෞද්ධ ධර්මයේ උත්කෘෂ්ටත්වය 
                සහ ගෞරවය නිරූපණය කරයි. මෙම පූජනීය සෑය ප්‍රදේශවාසීන්ගේ 
                ආධ්‍යාත්මික කේන්ද්රස්ථානය ලෙස සේවය කරයි.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/sthana"
                  className="inline-block bg-gradient-to-r from-temple-green to-temple-green-dark text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  තවත් දැනගන්න
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl glow-gold animate-slide-in-right group">
              <Image
                src="/images/IMG_20260611_093557.jpg"
                alt="මුනි උත්තම ආංගීරස මහා සෑය"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-temple-green via-temple-green-dark to-temple-green text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-temple-gold mb-2">අපගේ විහාරස්ථානය පිළිබඳ</h3>
            <div className="w-24 h-1 bg-temple-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="text-6xl font-black text-temple-gold mb-3 group-hover:animate-pulse">50+</div>
              <div className="text-lg opacity-90 font-medium">වර්ෂ ඉතිහාසය</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="text-6xl font-black text-temple-gold mb-3 group-hover:animate-pulse">1000+</div>
              <div className="text-lg opacity-90 font-medium">දායකයින්</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="text-6xl font-black text-temple-gold mb-3 group-hover:animate-pulse">12</div>
              <div className="text-lg opacity-90 font-medium">වාර්ෂික උත්සව</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="text-6xl font-black text-temple-gold mb-3 group-hover:animate-pulse">5</div>
              <div className="text-lg opacity-90 font-medium">ප්‍රධාන ගොඩනැගිලි</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote/Message Section */}
      <section className="py-16 bg-gradient-to-br from-temple-green-dark via-temple-green to-temple-green-dark relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-temple-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-temple-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ධර්ම දේශනා
            </h3>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              බුදුරජාණන් වහන්සේ තමන්ගේ ධර්මය ප්‍රචාරය කිරීමට ගත් උපාය මාර්ග පිළිබඳව විග්‍රහ කිරීමයි.
            </p>
            <div className="w-24 h-1 bg-temple-gold rounded-full mb-6"></div>
            <p className="text-lg text-temple-gold font-medium">
              හරිතගිරි විහාරය
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-temple-cream via-white to-temple-cream">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gradient-green mb-6 animate-fade-in">
            අප සමඟ එක්වන්න
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            හරිතගිරි විහාරයේ ආධ්‍යාත්මික ගමනට ඔබද එක්වන්න. 
            දායක සභාවට බැඳී සිටිමින් ධර්මයේ ප්‍රචාරයට සහාය වන්න.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/dayaka-sabhawa"
              className="group bg-gradient-to-r from-temple-gold to-yellow-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center gap-3"
            >
              <span>දායක සභාව</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/vihara-adhikari"
              className="group bg-white border-3 border-temple-green text-temple-green px-10 py-5 rounded-full font-bold text-lg hover:bg-temple-green hover:text-white transition-all transform hover:scale-110 shadow-xl flex items-center justify-center gap-3"
            >
              <span>විහාරාධිපති</span>
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
