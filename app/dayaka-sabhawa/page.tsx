'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface DonorRecord {
  name: string;
  contribution: string;
  year: string;
}

const fallbackDonors: DonorRecord[] = [
  { name: 'දායක නාමය 1', contribution: 'රු. 50,000', year: '2024' },
  { name: 'දායක නාමය 2', contribution: 'රු. 30,000', year: '2024' },
  { name: 'දායක නාමය 3', contribution: 'රු. 25,000', year: '2024' },
  { name: 'දායක නාමය 4', contribution: 'රු. 20,000', year: '2024' },
  { name: 'දායක නාමය 5', contribution: 'රු. 15,000', year: '2024' },
  { name: 'දායක නාමය 6', contribution: 'රු. 10,000', year: '2024' },
];

export default function DayakaSabhawaPage() {
  const [donors, setDonors] = useState<DonorRecord[]>(fallbackDonors);

  // Fetch donors from Supabase
  useEffect(() => {
    async function fetchDonors() {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const mapped: DonorRecord[] = data.map((d: Record<string, unknown>) => ({
          name: (d.name_si as string) || (d.name as string),
          contribution: d.amount ? `රු. ${Number(d.amount).toLocaleString()}` : (d.contribution as string) || '',
          year: (d.year as string) || '',
        }));
        setDonors(mapped);
      }
    }
    fetchDonors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-temple-cream/30 to-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-temple-green via-temple-green-dark to-temple-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-temple-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-temple-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block px-6 py-2 bg-temple-gold/20 backdrop-blur-sm rounded-full border border-temple-gold/30 mb-6">
            <span className="text-temple-gold font-semibold text-sm">🏛️ දායක සභාව - සභාපති මණ්ඩලය</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">දායක සභාව</h1>
          <p className="text-xl text-temple-cream/80 max-w-2xl mx-auto">විහාරයේ ක්‍රියාකාරකම් හා පරිපාලනය සිදුකරන ගෞරවනීය සභාපති මණ්ඩලය</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* President - Special Feature */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-temple-green to-temple-green-dark rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              {/* Photo Placeholder */}
              <div className="w-full md:w-1/3 p-8 flex justify-center">
                <div className="relative">
                  <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-temple-gold shadow-2xl">
                    <Image
                      src="/images/vihara-adhikari.jpg"
                      alt="පූජ්‍ය ලේල්වල විජිතදේව ස්වාමින් වහන්සේ"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                      sizes="224px"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-14 h-14 bg-temple-gold rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">☸️</span>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="w-full md:w-2/3 p-8 md:pr-12 text-white">
                <div className="inline-block px-4 py-1 bg-temple-gold/30 rounded-full mb-4">
                  <span className="text-temple-gold text-sm font-semibold">🌟 සභාපති</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">පූජ්‍ය ලේල්වල විජිතදේව ස්වාමින් වහන්සේ</h2>
                <p className="text-temple-cream/70 text-lg">හරිතගිරි විහාරයේ ප්‍රධාන ආධ්‍යාත්මික නායකයා ලෙස විහාරස්ථානයේ සියලු කටයුතු මෙහෙයවයි.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Officer Cards */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-temple-green mb-2">නිලධාරින්</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Secretary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                  <Image src="/images/dayaka-sabhawa/ruwini-samanthika.jpg" alt="පී.කේ.සමන්තිකා රුවිනි" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-temple-gold bg-temple-gold/10 px-3 py-1 rounded-full inline-block mb-1">ලේඛම්</div>
                  <h3 className="text-lg font-bold text-temple-green-dark">පී.කේ.සමන්තිකා රුවිනි</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm">විහාරයේ ලේඛම් කටයුතු හා ලේඛන පරිපාලනය සිදුකරයි.</p>
            </div>

            {/* Vice President */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-temple-green to-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  P.H.S
                </div>
                <div>
                  <div className="text-xs font-semibold text-temple-green bg-temple-green/10 px-3 py-1 rounded-full inline-block mb-1">උප සභාපති</div>
                  <h3 className="text-lg font-bold text-temple-green-dark">P.H.S ද සිල්වා</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm">සභාපතිවරයාට සහාය වී විහාරයේ කටයුතු මෙහෙයවයි.</p>
            </div>

            {/* Vice Secretary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                  <Image src="/images/dayaka-sabhawa/chamindu-akash.jpg" alt="S.L.A. චමිඳු ආකාශ්" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full inline-block mb-1">උප ලේඛම්</div>
                  <h3 className="text-lg font-bold text-temple-green-dark">S.L.A. චමිඳු ආකාශ්</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm">ලේඛම්වරයාට සහාය වී ලේඛන කටයුතු පරිපාලනය කරයි.</p>
            </div>

            {/* Treasurer */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  ප්‍ර
                </div>
                <div>
                  <div className="text-xs font-semibold text-rose-600 bg-rose-100 px-3 py-1 rounded-full inline-block mb-1">භාණ්ඩාගාරික</div>
                  <h3 className="text-lg font-bold text-temple-green-dark">ප්‍රේමවතී ලොකුගමගේ</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm">විහාරයේ මූල්‍ය කටයුතු හා භාණ්ඩාගාර පරිපාලනය සිදුකරයි.</p>
            </div>
          </div>
        </div>

        {/* Committee Members */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-temple-green mb-2">කාරක සභිකයින්</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {([
              { name: 'S.A.රසිකා ප්‍රියදර්ශනී', initials: 'S.A', color: 'from-amber-500 to-orange-600' },
              { name: 'Y.L.S.රේණුකා', initials: 'Y.L.S', color: 'from-teal-500 to-cyan-600' },
              { name: 'H.S. පෙරේරා', initials: 'H.S', color: 'from-violet-500 to-purple-600' },
              { name: 'චාමලී ජයවර්ධන', initials: 'චා', color: 'from-emerald-500 to-green-600' },
              { name: 'චිත්‍රා නාලනී', initials: 'චි', color: 'from-rose-500 to-pink-600' },
            ]).map((member, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg hover:border-temple-gold/30 transition-all text-center group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-lg font-bold shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="text-sm font-bold text-temple-green-dark">{member.name}</h3>
                <p className="text-xs text-temple-gold mt-1">කාරක සභික</p>
              </div>
            ))}
          </div>
        </div>

        {/* Area Representatives */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-temple-green mb-2">ප්‍රදේශ නියෝජිත්‍යින්</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {([
              { name: 'D.S.නිලන්ති', initials: 'D.S', color: 'from-sky-500 to-blue-600' },
              { name: 'සුලෝචනා විජේවික්‍රම', initials: 'සු', color: 'from-fuchsia-500 to-purple-600' },
              { name: 'චාන්දනී සංගීතා', initials: 'චා', color: 'from-lime-500 to-green-600' },
              { name: 'ශානිකා මධුශානි', initials: 'ශා', color: 'from-amber-500 to-yellow-600' },
              { name: 'ලලිතාද සිල්වා', initials: 'ලල', color: 'from-red-500 to-rose-600' },
            ]).map((member, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg hover:border-temple-gold/30 transition-all text-center group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-lg font-bold shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="text-sm font-bold text-temple-green-dark">{member.name}</h3>
                <p className="text-xs text-temple-gold mt-1">ප්‍රදේශ නියෝජිත</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-temple-gold/40 to-transparent mb-16"></div>

        {/* Donors Table Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <span className="text-4xl mb-4 block">🙏</span>
            <h2 className="text-3xl font-bold text-temple-green mb-2">දායක නාමලේඛනය</h2>
            <p className="text-gray-600">විහාරයට දායකත්වය ලබා දුන් ගෞරවනීය පුද්ගලයින්</p>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full mt-4"></div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-temple-gold/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-temple-gold">
                    <th className="text-left py-4 px-6 text-temple-green font-bold">#</th>
                    <th className="text-left py-4 px-6 text-temple-green font-bold">දායක නාමය</th>
                    <th className="text-left py-4 px-6 text-temple-green font-bold">දායකත්වය</th>
                    <th className="text-left py-4 px-6 text-temple-green font-bold">වර්ෂය</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor, index) => (
                    <tr key={index} className="border-b hover:bg-temple-cream transition-colors">
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6 font-medium">{donor.name}</td>
                      <td className="py-4 px-6 text-temple-gold font-semibold">{donor.contribution}</td>
                      <td className="py-4 px-6">{donor.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-temple-cream via-white to-temple-cream rounded-2xl p-10 text-center border border-temple-gold/20 shadow-lg">
          <span className="text-4xl mb-4 block">🪷</span>
          <h2 className="text-2xl font-bold text-temple-green mb-4">ඔබටත් දායක වන්න</h2>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            විහාරයේ දියුණු ක්‍රියාකාරකම් සඳහා ඔබත් දායක විය හැක. අපව අමතන්න.
          </p>
          <Link
            href="/dayaka"
            className="inline-block bg-temple-green text-white px-8 py-3 rounded-lg hover:bg-temple-green-dark transition-colors font-semibold shadow-md"
          >
            දායක වන්න →
          </Link>
        </div>
      </div>
    </div>
  );
}
