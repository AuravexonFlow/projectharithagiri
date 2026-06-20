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

interface CommitteeMember {
  id: string;
  name: string;
  name_si: string | null;
  role: string;
  role_si: string | null;
  category: string;
  description_si: string | null;
  photo: string | null;
  initials: string | null;
  color: string | null;
  is_active: boolean;
}

const fallbackDonors: DonorRecord[] = [
  { name: 'දායක නාමය 1', contribution: 'රු. 50,000', year: '2024' },
  { name: 'දායක නාමය 2', contribution: 'රු. 30,000', year: '2024' },
  { name: 'දායක නාමය 3', contribution: 'රු. 25,000', year: '2024' },
  { name: 'දායක නාමය 4', contribution: 'රු. 20,000', year: '2024' },
  { name: 'දායක නාමය 5', contribution: 'රු. 15,000', year: '2024' },
  { name: 'දායක නාමය 6', contribution: 'රු. 10,000', year: '2024' },
];

const fallbackPresident: CommitteeMember = {
  id: 'fp', name: 'Venerable Lelwala Wijithadeva Thero', name_si: 'පූජ්‍ය ලේල්වල විජිතදේව ස්වාමින් වහන්සේ',
  role: 'President', role_si: 'සභාපති', category: 'president',
  description_si: 'හරිතගිරි විහාරයේ ප්‍රධාන ආධ්‍යාත්මික නායකයා ලෙස විහාරස්ථානයේ සියලු කටයුතු මෙහෙයවයි.',
  photo: '/images/vihara-adhikari.jpg', initials: '☸️', color: 'from-temple-green to-temple-green-dark', is_active: true,
};

const fallbackOfficers: CommitteeMember[] = [
  { id: 'fo1', name: 'P.K. Samanthika Ruwini', name_si: 'පී.කේ.සමන්තිකා රුවිනි', role: 'Secretary', role_si: 'ලේඛම්', category: 'officer', description_si: 'විහාරයේ ලේඛම් කටයුතු හා ලේඛන පරිපාලනය සිදුකරයි.', photo: '/images/dayaka-sabhawa/ruwini-samanthika.jpg', initials: 'ලේ', color: 'from-temple-gold to-yellow-600', is_active: true },
  { id: 'fo2', name: 'P.H.S de Silva', name_si: 'P.H.S ද සිල්වා', role: 'Vice President', role_si: 'උප සභාපති', category: 'officer', description_si: 'සභාපතිවරයාට සහාය වී විහාරයේ කටයුතු මෙහෙයවයි.', photo: null, initials: 'P.H.S', color: 'from-temple-green to-emerald-700', is_active: true },
  { id: 'fo3', name: 'S.L.A. Chamindu Akash', name_si: 'S.L.A. චමිඳු ආකාශ්', role: 'Vice Secretary', role_si: 'උප ලේඛම්', category: 'officer', description_si: 'ලේඛම්වරයාට සහාය වී ලේඛන කටයුතු පරිපාලනය කරයි.', photo: '/images/dayaka-sabhawa/chamindu-akash.jpg', initials: 'S.L.A', color: 'from-purple-500 to-indigo-600', is_active: true },
  { id: 'fo4', name: 'Premawathi Lokugamage', name_si: 'ප්‍රේමවතී ලොකුගමගේ', role: 'Treasurer', role_si: 'භාණ්ඩාගාරික', category: 'officer', description_si: 'විහාරයේ මූල්‍ය කටයුතු හා භාණ්ඩාගාර පරිපාලනය සිදුකරයි.', photo: null, initials: 'ප්‍ර', color: 'from-rose-500 to-pink-600', is_active: true },
];

const fallbackCommittee: CommitteeMember[] = [
  { id: 'fc1', name: 'S.A. Rasika Priyadarshani', name_si: 'S.A.රසිකා ප්‍රියදර්ශනී', role: 'Committee Member', role_si: 'කාරක සභික', category: 'committee', description_si: null, photo: null, initials: 'S.A', color: 'from-amber-500 to-orange-600', is_active: true },
  { id: 'fc2', name: 'Y.L.S. Renuka', name_si: 'Y.L.S.රේණුකා', role: 'Committee Member', role_si: 'කාරක සභික', category: 'committee', description_si: null, photo: null, initials: 'Y.L.S', color: 'from-teal-500 to-cyan-600', is_active: true },
  { id: 'fc3', name: 'H.S. Perera', name_si: 'H.S. පෙරේරා', role: 'Committee Member', role_si: 'කාරක සභික', category: 'committee', description_si: null, photo: null, initials: 'H.S', color: 'from-violet-500 to-purple-600', is_active: true },
  { id: 'fc4', name: 'Chamali Jayawardena', name_si: 'චාමලී ජයවර්ධන', role: 'Committee Member', role_si: 'කාරක සභික', category: 'committee', description_si: null, photo: null, initials: 'චා', color: 'from-emerald-500 to-green-600', is_active: true },
  { id: 'fc5', name: 'Chithra Nalani', name_si: 'චිත්‍රා නාලනී', role: 'Committee Member', role_si: 'කාරක සභික', category: 'committee', description_si: null, photo: null, initials: 'චි', color: 'from-rose-500 to-pink-600', is_active: true },
];

const fallbackRepresentatives: CommitteeMember[] = [
  { id: 'fr1', name: 'D.S. Nilanthi', name_si: 'D.S.නිලන්ති', role: 'Area Representative', role_si: 'ප්‍රදේශ නියෝජිත', category: 'representative', description_si: null, photo: null, initials: 'D.S', color: 'from-sky-500 to-blue-600', is_active: true },
  { id: 'fr2', name: 'Sulochnana Wickramasinghe', name_si: 'සුලෝචනා විජේවික්‍රම', role: 'Area Representative', role_si: 'ප්‍රදේශ නියෝජිත', category: 'representative', description_si: null, photo: null, initials: 'සු', color: 'from-fuchsia-500 to-purple-600', is_active: true },
  { id: 'fr3', name: 'Chandani Sangeetha', name_si: 'චාන්දනී සංගීතා', role: 'Area Representative', role_si: 'ප්‍රදේශ නියෝජිත', category: 'representative', description_si: null, photo: null, initials: 'චා', color: 'from-lime-500 to-green-600', is_active: true },
  { id: 'fr4', name: 'Shanika Madushani', name_si: 'ශානිකා මධුශානි', role: 'Area Representative', role_si: 'ප්‍රදේශ නියෝජිත', category: 'representative', description_si: null, photo: null, initials: 'ශා', color: 'from-amber-500 to-yellow-600', is_active: true },
  { id: 'fr5', name: 'Lalitha de Silva', name_si: 'ලලිතාද සිල්වා', role: 'Area Representative', role_si: 'ප්‍රදේශ නියෝජිත', category: 'representative', description_si: null, photo: null, initials: 'ලල', color: 'from-red-500 to-rose-600', is_active: true },
];

export default function DayakaSabhawaPage() {
  const [donors, setDonors] = useState<DonorRecord[]>(fallbackDonors);
  const [president, setPresident] = useState<CommitteeMember>(fallbackPresident);
  const [officers, setOfficers] = useState<CommitteeMember[]>(fallbackOfficers);
  const [committee, setCommittee] = useState<CommitteeMember[]>(fallbackCommittee);
  const [representatives, setRepresentatives] = useState<CommitteeMember[]>(fallbackRepresentatives);

  // Fetch donors from Supabase
  useEffect(() => {
    async function fetchData() {
      // Fetch donors
      const { data: donorData, error: donorError } = await supabase
        .from('donors')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (!donorError && donorData && donorData.length > 0) {
        const mapped: DonorRecord[] = donorData.map((d: Record<string, unknown>) => ({
          name: (d.name_si as string) || (d.name as string),
          contribution: d.amount ? `රු. ${Number(d.amount).toLocaleString()}` : (d.contribution as string) || '',
          year: (d.year as string) || '',
        }));
        setDonors(mapped);
      }

      // Fetch committee members
      const { data: memberData, error: memberError } = await supabase
        .from('committee_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (!memberError && memberData && memberData.length > 0) {
        const members = memberData as CommitteeMember[];
        const pres = members.find(m => m.category === 'president');
        if (pres) setPresident(pres);
        
        const off = members.filter(m => m.category === 'officer');
        if (off.length > 0) setOfficers(off);
        
        const com = members.filter(m => m.category === 'committee');
        if (com.length > 0) setCommittee(com);
        
        const rep = members.filter(m => m.category === 'representative');
        if (rep.length > 0) setRepresentatives(rep);
      }
    }
    fetchData();
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
                    {president.photo ? (
                      <Image
                        src={president.photo}
                        alt={president.name_si || president.name}
                        width={224}
                        height={224}
                        className="w-full h-full object-cover"
                        sizes="224px"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${president.color || 'from-temple-green to-temple-green-dark'} flex items-center justify-center`}>
                        <span className="text-white text-6xl">{president.initials || '☸️'}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-14 h-14 bg-temple-gold rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">☸️</span>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="w-full md:w-2/3 p-8 md:pr-12 text-white">
                <div className="inline-block px-4 py-1 bg-temple-gold/30 rounded-full mb-4">
                  <span className="text-temple-gold text-sm font-semibold">🌟 {president.role_si || president.role}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{president.name_si || president.name}</h2>
                <p className="text-temple-cream/70 text-lg">{president.description_si || ''}</p>
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
            {officers.map((officer) => (
              <div key={officer.id} className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  {officer.photo ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                      <Image src={officer.photo} alt={officer.name_si || officer.name} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${officer.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                      {officer.initials || '?'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold text-temple-gold bg-temple-gold/10 px-3 py-1 rounded-full inline-block mb-1">{officer.role_si || officer.role}</div>
                    <h3 className="text-lg font-bold text-temple-green-dark">{officer.name_si || officer.name}</h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{officer.description_si || ''}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Committee Members */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-temple-green mb-2">කාරක සභිකයින්</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-temple-gold to-temple-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {committee.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg hover:border-temple-gold/30 transition-all text-center group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white text-lg font-bold shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {member.initials || '?'}
                </div>
                <h3 className="text-sm font-bold text-temple-green-dark">{member.name_si || member.name}</h3>
                <p className="text-xs text-temple-gold mt-1">{member.role_si || member.role}</p>
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
            {representatives.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg hover:border-temple-gold/30 transition-all text-center group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white text-lg font-bold shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {member.initials || '?'}
                </div>
                <h3 className="text-sm font-bold text-temple-green-dark">{member.name_si || member.name}</h3>
                <p className="text-xs text-temple-gold mt-1">{member.role_si || member.role}</p>
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
