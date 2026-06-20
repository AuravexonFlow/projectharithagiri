'use client';

import Link from 'next/link';

const donationPurposes = [
  { id: 'general', label: 'සාමාන්‍ය දානය', icon: '🪷', desc: 'විහාරයේ සාමාන්‍ය කටයුතු සඳහා' },
  { id: 'dhamma', label: 'ධර්ම ශාලා ඉදිකිරීම', icon: '🏛️', desc: 'නව ධර්ම ශාලාව ඉදිකිරීමේ කටයුතු' },
  { id: 'bodhi', label: 'බෝධි පූජා', icon: '🌳', desc: 'පූජනීය බෝධිය රැකබලා ගැනීම' },
  { id: 'pooja', label: 'පූජා වියදම්', icon: '🕯️', desc: 'දෛනික පූජා හා මල් පූජා' },
  { id: 'katina', label: 'කඨින පූජා', icon: '👘', desc: 'කඨින චීවර පූජා සඳහා' },
  { id: 'other', label: 'වෙනත්', icon: '✨', desc: 'වෙනත් විශේෂ කටයුතු' },
];

export default function DayakaPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-temple-cream/30 to-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-temple-green via-temple-green-dark to-temple-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-temple-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-temple-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block px-6 py-2 bg-temple-gold/20 backdrop-blur-sm rounded-full border border-temple-gold/30 mb-6">
            <span className="text-temple-gold font-semibold text-sm">🪷 පින් අනුමෝදන්</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">ඔබටත් දායක වන්න</h1>
          <p className="text-xl text-temple-cream/80 max-w-2xl mx-auto">
            &quot;දානම් දදන්ති සීලම් චරන්ති භාවනාමයි&quot; — දානය, ශීලය, භාවනාය යන තුන් පින්කම් අතරින් දානය ප්‍රථමයයි.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Donation Purposes */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-temple-gold/20 text-temple-gold text-sm font-bold rounded-full mb-3">දානයේ අරමුණු</span>
            <h2 className="text-3xl font-bold text-temple-green mb-2">ඔබට දායක විය හැකි ආකාර</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {donationPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className="flex items-start gap-4 p-5 rounded-xl border-2 border-temple-gold/20 bg-white hover:border-temple-gold/50 hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mt-0.5 group-hover:scale-110 transition-transform">{purpose.icon}</span>
                <div>
                  <h3 className="font-bold text-temple-green group-hover:text-temple-gold transition-colors">{purpose.label}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{purpose.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="relative mb-16">
          <div className="bg-gradient-to-br from-temple-green via-temple-green-dark to-temple-green rounded-3xl p-10 md:p-14 text-center overflow-hidden relative">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-temple-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-temple-gold/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-5">🪷</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">දානය සඳහා සම්බන්ධ වන්න</h2>
              <p className="text-temple-cream/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                ඔබේ දානය හා පින්කම් සඳහා විහාරය හා සම්බන්ධ වීමට පහත තොරතුරු භාවිතා කරන්න.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Phone */}
                <a
                  href="tel:+94774303310"
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-temple-gold/50 transition-all duration-300 hover:scale-[1.03]"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center group-hover:bg-temple-gold/30 transition-colors">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">දුරකථන</h3>
                  <p className="text-temple-gold font-semibold text-lg">+94 77 430 3310</p>
                  <p className="text-white/50 text-sm mt-2">උදෑසන 8:00 - සවස 6:00</p>
                </a>

                {/* Email */}
                <a
                  href="mailto:harithagamapansala@gmail.com"
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-temple-gold/50 transition-all duration-300 hover:scale-[1.03]"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center group-hover:bg-temple-gold/30 transition-colors">
                    <span className="text-3xl">✉️</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">ඊමේල්</h3>
                  <p className="text-temple-gold font-semibold text-sm break-all">harithagamapansala@gmail.com</p>
                  <p className="text-white/50 text-sm mt-2">ඕනෑම වේලාවක</p>
                </a>

                {/* Location */}
                <Link
                  href="/sthana"
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-temple-gold/50 transition-all duration-300 hover:scale-[1.03]"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center group-hover:bg-temple-gold/30 transition-colors">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">පැමිණෙන්න</h3>
                  <p className="text-temple-gold font-semibold">හරිතගිරි විහාරය</p>
                  <p className="text-white/50 text-sm mt-2">හරිත ගම</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Note */}
        <div className="bg-white rounded-2xl p-8 border border-temple-gold/20 shadow-md text-center mb-16">
          <span className="text-4xl block mb-4">🙏</span>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            <strong className="text-temple-green">&quot;යස්ස දානං පසන්නස්ස&quot;</strong> — ප්‍රසන්න සිතින් දෙන දානය මහත් පිනක් වේ.
            ඔබේ සිතැඟි පරිදි දායක විය හැකිය. සියලු පින්කම් සාර්ථක වේවා!
          </p>
        </div>

        {/* Buddhist Quote */}
        <div className="bg-gradient-to-r from-temple-green to-temple-green-dark rounded-2xl p-10 text-center text-white">
          <span className="text-5xl block mb-4">☸️</span>
          <blockquote className="text-xl md:text-2xl font-semibold italic mb-4 leading-relaxed">
            &quot;පුනබ්බමේව දදාති දිස්වපස්සදේව මානවො<br />
            යස්ස ච සුඛං දුක්ඛං සයමේව අවේක්ඛාතා&quot;
          </blockquote>
          <p className="text-temple-cream/80">
            — තමාට සුඛ දුක්ඛ ඇති බැවින් අන් සත්ත්වයන්ටද සුඛ දුක්ඛ ඇති බව දැන, අනුන්ට නොමරා, නොහිංසා කළ යුතුය.
          </p>
        </div>
      </div>
    </div>
  );
}
