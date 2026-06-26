// Setup committee members via the admin API route
const API_URL = 'http://localhost:3000/api/admin';

async function adminApi(action, table, data = null, id = null, filters = null) {
  const body = { action, table };
  if (data) body.data = data;
  if (id) body.id = id;
  if (filters) body.filters = filters;
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return resp.json();
}

async function main() {
  console.log('Checking committee_members count...');
  const countRes = await adminApi('count', 'committee_members');
  console.log('Current count:', countRes.count);

  if (countRes.count === 0) {
    console.log('Seeding committee members...');
    const members = [
      { name: 'Ven. Hanguranketha Wimalagnana Thero', name_si: 'හඟුරන්කෙත විමලඤාණ හිමි', role: 'President', role_si: 'සභාපති', category: 'president', initials: 'HV', color: 'from-amber-500 to-orange-600', display_order: 1 },
      { name: 'H. M. Karunaratne', name_si: 'එච්. එම්. කරුණාරත්න', role: 'Secretary', role_si: 'ලේකම්', category: 'officer', initials: 'HK', color: 'from-blue-500 to-indigo-600', display_order: 2 },
      { name: 'D. M. Sumanarathna', name_si: 'ඩී. එම්. සුමනරත්න', role: 'Treasurer', role_si: 'භාණ්ඩාගාරික', category: 'officer', initials: 'DS', color: 'from-purple-500 to-pink-600', display_order: 3 },
      { name: 'K. B. Jayawardena', name_si: 'කේ. බී. ජයවර්ධන', role: 'Vice President', role_si: 'උප සභාපති', category: 'officer', initials: 'KJ', color: 'from-emerald-500 to-teal-600', display_order: 4 },
      { name: 'W. A. Fernando', name_si: 'ඩබ්ලිව්. ඒ. ප්‍රනාන්දු', role: 'Assistant Secretary', role_si: 'සහකාර ලේකම්', category: 'officer', initials: 'WF', color: 'from-rose-500 to-red-600', display_order: 5 },
      { name: 'G. R. Perera', name_si: 'ජී. ආර්. පෙරේරා', role: 'Committee Member', role_si: 'සභික', category: 'committee', initials: 'GP', color: 'from-cyan-500 to-blue-600', display_order: 6 },
      { name: 'P. N. Silva', name_si: 'පී. එන්. සිල්වා', role: 'Committee Member', role_si: 'සභික', category: 'committee', initials: 'PS', color: 'from-lime-500 to-green-600', display_order: 7 },
      { name: 'R. M. Bandara', name_si: 'ආර්. එම්. බන්ඩාර', role: 'Committee Member', role_si: 'සභික', category: 'committee', initials: 'RB', color: 'from-violet-500 to-purple-600', display_order: 8 },
      { name: 'S. T. Kumara', name_si: 'එස්. ටී. කුමාර', role: 'Committee Member', role_si: 'සභික', category: 'committee', initials: 'SK', color: 'from-fuchsia-500 to-pink-600', display_order: 9 },
      { name: 'L. D. Weerasinghe', name_si: 'එල්. ඩී. වීරසිංහ', role: 'Committee Member', role_si: 'සභික', category: 'committee', initials: 'LW', color: 'from-teal-500 to-emerald-600', display_order: 10 },
      { name: 'A. P. Disanayake', name_si: 'ඒ. පී. දිසානායක', role: 'Area Representative - Harithagama', role_si: 'ප්‍රාදේශීය නියෝජිත - හරිතගම', category: 'representative', initials: 'AD', color: 'from-orange-500 to-amber-600', display_order: 11 },
      { name: 'B. K. Rathnayake', name_si: 'බී. කේ. රත්නායක', role: 'Area Representative - Kandy', role_si: 'ප්‍රාදේශීය නියෝජිත - මහනුවර', category: 'representative', initials: 'BR', color: 'from-sky-500 to-blue-600', display_order: 12 },
      { name: 'C. W. Gunasekara', name_si: 'සී. ඩබ්ලිව්. ගුණසේකර', role: 'Area Representative - Colombo', role_si: 'ප්‍රාදේශීය නියෝජිත - කොළඹ', category: 'representative', initials: 'CG', color: 'from-red-500 to-rose-600', display_order: 13 },
      { name: 'E. N. Wijesinghe', name_si: 'ඊ. එන්. විජේසිංහ', role: 'Area Representative - Gampola', role_si: 'ප්‍රාදේශීය නියෝජිත - ගම්පොළ', category: 'representative', initials: 'EW', color: 'from-amber-500 to-yellow-600', display_order: 14 },
      { name: 'F. R. Herath', name_si: 'එෆ්. ආර්. හේරත්', role: 'Area Representative - Hanguranketha', role_si: 'ප්‍රාදේශීය නියෝජිත - හඟුරන්කෙත', category: 'representative', initials: 'FH', color: 'from-indigo-500 to-violet-600', display_order: 15 }
    ];

    for (const m of members) {
      const res = await adminApi('insert', 'committee_members', m);
      if (res.error) console.error(`Error inserting ${m.name}:`, res.error);
      else console.log(`Inserted: ${m.name}`);
    }
    console.log('Done seeding!');
  }

  const finalCount = await adminApi('count', 'committee_members');
  console.log('Final count:', finalCount.count);
}

main().catch(e => console.error('Fatal:', e));
