import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/images/IMG_20260611_093710.jpg"
          alt="හරිතගිරි විහාරය"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-temple-green/90 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black text-gradient-gold drop-shadow-2xl">හැඳින්වීම</h1>
            <p className="text-2xl md:text-3xl font-light opacity-95 max-w-3xl mx-auto px-4">
              හරිතගිරි විහාරයේ තිහාසය සහ අරමුණු
            </p>
          </div>
        </div>
      </section>

      {/* History Section 1 - German Green Village */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-block px-4 py-2 bg-temple-gold/20 rounded-full border border-temple-gold/30">
              <span className="text-temple-gold font-bold text-sm">📜 අපගේ කථාව</span>
            </div>
            <h2 className="text-5xl font-black text-gradient-green leading-tight">
              ජර්මන් හරිත ගම - ආරම්භය සහ පසුබිම
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                2004 දෙසැම්බර් 26 වන දින ශ්‍රී ලංකාවට බලපෑ විනාශකාරී සුනාමි ව්‍යසනයෙන් 
                දකුණු පළාතේ වෙරළබඩ තීරයේ ජීවත් වූ පවුල් රැසකගේ නිවාස සහ දේපළ 
                සම්පූර්ණයෙන්ම විනාශයට පත් විය. මෙලෙස අවතැන් වූ සහ අසරණ වූ නතාවට 
                ස්ථිර නිවාස ලබා දී ඔවුන් නැවත පදිංි කරවීම සඳහා ාත්‍යන්තර ධාර 
                සංවිධාන සහ විදේශීය පරිත්‍යාගශීලීන් රැසක් පෙරමුණ ගත්හ.
              </p>
              <p>
                එහි ප්‍රතිඵලයක් ලෙස, ජර්මන් ජාතිකයන් සහ එරට විවිධ ධාර සංවිධානවල 
                (German Humanitarian Aid) මූල්ය හා ද්‍රව්යමය දායකත්වය මත ගාල්ල 
                දිස්ත්‍රික්කයේ, අක්මීමන ප්‍රාදේශීය ලේකම් කොට්ාසයට අයත් භූමියක 
                මෙම සුවිශේෂී ආදර්ශ ගම්මානය නිර්මාණය විය. ජර්මානු ජනතාවගේ 
                පරිත්‍යාගශීලිත්වය සංකේතවත් කරමින් මෙය "ජර්මන් හරිත ගම" 
                (German Green Village) ලෙස නම් කෙරුණි.
              </p>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl glow-green animate-slide-in-right group">
            <Image
              src="/images/IMG_20260611_093737.jpg"
              alt="විහාරස්ථානය"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Section 2 - Planning and Housing */}
      <section className="py-24 bg-gradient-to-br from-white via-temple-cream to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl sacred-glow animate-slide-in-left group">
              <Image
                src="/images/IMG_20260611_093710.jpg"
                alt="හරිත සංකල්පය"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8 animate-slide-in-right">
              <h2 className="text-5xl font-black text-gradient-green leading-tight">
                ️ සැලසුම්කරණය සහ නිවාස ව්‍යාපෘතිය
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-temple-green">
                  <h3 className="font-bold text-temple-green text-xl mb-3">හරිත සංකල්පය</h3>
                  <p>
                    හුදෙක් නිවාස පේළියක් පමණක් ඉදිකිරීම වෙනුවට, ස්වාවික පරිසරයට හානි 
                    නොවන පරිදි, ගස්කොළන්වලින් වට ව නිදහස් හා හරිත පරිසරයක් 
                    (Eco-friendly environment) තුළ මෙම ගම්මානය සැලසුම් කෙරුණි.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-temple-gold">
                  <h3 className="font-bold text-temple-green text-xl mb-3">ප්‍රජා පහසුකම්</h3>
                  <p>
                    සුනාමි ව්‍යසනයෙන් අවතැන් වූ පවුල් රැසකට මෙහි ස්ථිර නිවාස හිමි වූ 
                    අතර, ඔවුන්ගේ දෛනික අවශ්‍යතා සහ ජීවනෝපාය මාර්ග සංවර්ධනය සඳහා 
                    අවශ්ය පොදු ගොඩනැඟිලි සහ යටිතල පහසුකම්ද මෙහි සැලසුම් සහගතව ඉදි විය.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Bakery to Temple */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <h2 className="text-5xl font-black text-gradient-green leading-tight">
              🥖 බේකරියේ සිට විහාරස්ථානය දක්වා පරිවර්තනය
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                ගම්මානය ඉදිවන අවස්ථාවේදී එහි වැසියන්ගේ ස්වයං රැකියා සහ ප්‍රජා අවශ්‍යතාවලට 
                පහසුකම් සැලසීම වෙනුවෙන් විශාල බේකරි සංකීර්ණයක් සහා විශේෂ ගොඩනැඟිල්ලක් 
                වෙන් කර තිබුණි. කෙසේ වෙතත්, ගම්මානය පදිංචියට සුදුසු තත්ත්වයට පත්වීමෙන් 
                පසු, තමන්ට ආගමික වතාවත් සිදු කිරීම සඳහා සහ ගමේ දරුවන්ගේ දහම් අධ්‍යාපනය 
                වෙනුවෙන් විහාරස්ානයක ඇති අඩුපාඩුව ගම්වැසියන්ට දැඩිව දැනෙන්නට විය.
              </p>
              <p>
                ඒ අනුව, ගම්මානයේ සමස්ත පොදු නතාවගේ ඒකමතික කැමැත්ත සහ ඉල්ලීම මත, 
                බේකරිය සඳහා වෙන් කර තිබූ එම ගොඩනැඟිල්ල සහ පරිශ්‍රය ගමේ ආත්මීය 
                කේන්ද්‍රස්ථානය වන "විහාරස්ථානය" බවට පරිවර්තනය කිරීමට කටයුතු යෙදුණි.
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl glow-green animate-slide-in-right group">
            <Image
              src="/images/IMG_20260611_094604.jpg"
              alt="විහාරස්ථානය"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Section 4 - Timeline and Revival */}
      <section className="py-24 bg-gradient-to-br from-temple-cream via-white to-temple-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl sacred-glow animate-slide-in-left group">
              <Image
                src="/images/IMG_20260611_093543.jpg"
                alt="පුනරුදය"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8 animate-slide-in-right">
              <h2 className="text-5xl font-black text-gradient-green leading-tight">
                ⏰ කාලවකවානුව සහ පුනරුදය
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                  <h3 className="font-bold text-temple-green text-xl mb-3">කාලවකවානුව (2008 - 2020)</h3>
                  <p>
                    2008 වසරේදී මෙය ආරම්භ කළත්, 2020 වසර දක්වාම නිසි නඩත්තුවක් හෝ 
                    සංවර්ධනයක් නොමැතිව ගරා වැටෙමින් අත්හැර දමා තිබ තත්ත්වයකයි පැවතුණේ.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-temple-green/10 to-white p-6 rounded-xl shadow-md border-l-4 border-temple-green">
                  <h3 className="font-bold text-temple-green text-xl mb-3">📈 2020 න් පසු වත්මන් පුනරුදය</h3>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏗️</span>
                      <div>
                        <h4 className="font-semibold text-temple-green">භෞතික හා ආගමික සංවර්ධනය</h4>
                        <p className="text-gray-700">
                          2020 වර්ෂයේ සිට මේ දක්වා කාලය තුළ විහාරස්ානය ක්‍රමයෙන් 
                          ගොඩනැඟෙමින්, පරිශ්‍රය සංවර්ධනය වෙමින් පවතිනවා.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl"></span>
                      <div>
                        <h4 className="font-semibold text-temple-green">සමාජ සේවා දායකත්වය</h4>
                        <p className="text-gray-700">
                          මේ වන විට එය හුදෙක් ආගමික ස්ථානයක් පමණක් නොව, ප්‍රදේශයේ 
                          ජනතාව වෙනුවෙන් ගමික සහ සමාජයීය සේවා රැසක් ටුකරන 
                          සක්රීය කේන්ද්‍රස්ථානයක් බවට පත්ව තිබෙනවා.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-24 bg-gradient-to-br from-white via-temple-cream to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-temple-green/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black text-gradient-green mb-4">
              අපගේ අරමුණු
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Dharma Card */}
            <div className="card-hover group bg-white rounded-2xl shadow-2xl p-8 border-2 border-transparent hover:border-temple-gold/50 text-center">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden image-zoom">
                <Image
                  src="/images/IMG_20260611_094604.jpg"
                  alt="ධර්ම ප්‍රචාරය"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-6xl"></div>
              </div>
              <h3 className="text-3xl font-bold text-gradient-green mb-4">ධර්ම ප්‍රචාරය</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                බෞද්ධ ධර්මය ප්‍රචාරය කිරීම සහ ජනතාවට ධර්ම දේශනා ලබා දීම
              </p>
            </div>

            {/* Meditation Card */}
            <div className="card-hover group bg-white rounded-2xl shadow-2xl p-8 border-2 border-transparent hover:border-temple-gold/50 text-center">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden image-zoom">
                <Image
                  src="/images/IMG_20260611_094213.jpg"
                  alt="භාවනා"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-6xl">🧘</div>
              </div>
              <h3 className="text-3xl font-bold text-gradient-green mb-4">භාවනා වැඩසටහන්</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                මානසික ාන්තිය සඳහා ාවනා වැඩසටහන් පැවැත්වීම
              </p>
            </div>

            {/* Social Service Card */}
            <div className="card-hover group bg-white rounded-2xl shadow-2xl p-8 border-2 border-transparent hover:border-temple-gold/50 text-center">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden image-zoom">
                <Image
                  src="/images/IMG_20260611_094335.jpg"
                  alt="සමාජ සේවය"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-6xl">🤝</div>
              </div>
              <h3 className="text-3xl font-bold text-gradient-green mb-4">සමාජ සේවය</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                ප්‍රදේශවාසීන්ට සමාජ සේවා සහ පහසුකම් ලබා දීම
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-temple-green to-temple-green-dark rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 border-4 border-temple-gold/30 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-temple-gold/30 rounded-full"></div>
          
          <div className="text-center relative z-10">
            <h2 className="text-5xl font-black text-temple-gold mb-8">පිහිටුම</h2>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
                <span className="text-4xl">📍</span>
                <p className="text-2xl font-bold">හරිත ගම, ්‍රී ලංකාව</p>
              </div>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                ප්‍රදේශයේ ප්‍රධාන මාර්ගයෙන් පහසුවෙන් ළඟා විය හැකි ස්ථානයක පිහිටා ඇත
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
