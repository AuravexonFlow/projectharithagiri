import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres:Ravindu%4021189960@db.hqkoqhdzvhzyogpqasxt.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

const sqlStatements = [
  // Add missing columns
  `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'committee';`,
  `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS description_si TEXT;`,
  `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS photo TEXT;`,
  `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS initials TEXT;`,
  `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS color TEXT;`,
  
  // Ensure defaults
  `ALTER TABLE committee_members ALTER COLUMN display_order SET DEFAULT 0;`,
  `ALTER TABLE committee_members ALTER COLUMN is_active SET DEFAULT true;`,
  
  // Create index for fast category + ordering lookups
  `CREATE INDEX IF NOT EXISTS idx_committee_members_category_order ON committee_members(category, display_order);`,
  
  // Enable RLS
  `ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;`,
  
  // Public read policy (anon users can read active members)
  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read active committee members' AND tablename = 'committee_members') THEN
      CREATE POLICY "Public can read active committee members" ON committee_members
        FOR SELECT USING (is_active = true);
    END IF;
  END $$;`,
  
  // Service role full access policy
  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on committee_members' AND tablename = 'committee_members') THEN
      CREATE POLICY "Service role full access on committee_members" ON committee_members
        FOR ALL USING (true) WITH CHECK (true);
    END IF;
  END $$;`,
];

const seedStatements = [
  // President
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'අමරසිරි ගුණතිලක', 'අමරසිරි ගුණතිලක', 'President', 'සභාපති', 'president', 'අංගීරස මහා විහාරයේ දායක සභාවේ සභාපති', '/images/committee/president.jpg', 'AG', 'from-amber-600 to-yellow-700', 1, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'president');`,

  // Officers
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'සුනිල් පෙරේරා', 'සුනිල් පෙරේරා', 'Secretary', 'ලේඛමාධිකාරී', 'officer', 'විහාරස්ථානයේ ලේඛමාධිකාරී', '/images/committee/secretary.jpg', 'SP', 'from-blue-600 to-indigo-700', 1, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Secretary' AND category = 'officer');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'කමල් ද සිල්වා', 'කමල් ද සිල්වා', 'Treasurer', 'භාණ්ඩාගාරික', 'officer', 'විහාරස්ථානයේ භාණ්ඩාගාරික', '/images/committee/treasurer.jpg', 'KD', 'from-green-600 to-emerald-700', 2, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Treasurer' AND category = 'officer');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ප්‍රසන්න වීරසිංහ', 'ප්‍රසන්න වීරසිංහ', 'Vice President', 'උප සභාපති', 'officer', 'දායක සභාවේ උප සභාපති', NULL, 'PV', 'from-purple-600 to-violet-700', 3, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Vice President' AND category = 'officer');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'නිමල් බණ්ඩාර', 'නිමල් බණ්ඩාර', 'Assistant Secretary', 'සහකාර ලේඛමාධිකාරී', 'officer', 'සහකාර ලේඛමාධිකාරී', NULL, 'NB', 'from-rose-600 to-pink-700', 4, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Assistant Secretary' AND category = 'officer');`,

  // Committee Members
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'සරත් ගුණවර්ධන', 'සරත් ගුණවර්ධන', 'Committee Member', 'කාරක සභික', 'committee', 'කාරක සභා සාමාජික', NULL, 'SG', 'from-teal-600 to-cyan-700', 1, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Committee Member' AND name = 'සරත් ගුණවර්ධන');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'චන්ද්‍රසේකර මුත්තුකුමාර', 'චන්ද්‍රසේකර මුත්තුකුමාර', 'Committee Member', 'කාරක සභික', 'committee', 'කාරක සභා සාමාජික', NULL, 'CM', 'from-orange-600 to-red-700', 2, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Committee Member' AND name = 'චන්ද්‍රසේකර මුත්තුකුමාර');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ලයනල් ප්‍රනාන්දු', 'ලයනල් ප්‍රනාන්දු', 'Committee Member', 'කාරක සභික', 'committee', 'කාරක සභා සාමාජික', NULL, 'LP', 'from-sky-600 to-blue-700', 3, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Committee Member' AND name = 'ලයනල් ප්‍රනාන්දු');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'එච්. එම්. ප්‍රේමතිලක', 'එච්. එම්. ප්‍රේමතිලක', 'Committee Member', 'කාරක සභික', 'committee', 'කාරක සභා සාමාජික', NULL, 'EP', 'from-lime-600 to-green-700', 4, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Committee Member' AND name = 'එච්. එම්. ප්‍රේමතිලක');`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ඩබ්ලිව්. ඒ. සෝමරත්න', 'ඩබ්ලිව්. ඒ. සෝමරත්න', 'Committee Member', 'කාරක සභික', 'committee', 'කාරක සභා සාමාජික', NULL, 'WS', 'from-fuchsia-600 to-purple-700', 5, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE role = 'Committee Member' AND name = 'ඩබ්ලිව්. ඒ. සෝමරත්න');`,

  // Area Representatives
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'එම්. ජී. රත්නසේකර', 'එම්. ජී. රත්නසේකර', 'Area Representative - Harithagama', 'ප්‍රදේශ නියෝජිත - හරිතගම', 'representative', 'හරිතගම ප්‍රදේශ නියෝජිත', NULL, 'MR', 'from-amber-500 to-orange-600', 1, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'representative' AND display_order = 1);`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ආර්. ඒ. පී. විජේසිංහ', 'ආර්. ඒ. පී. විජේසිංහ', 'Area Representative - Kandy', 'ප්‍රදේශ නියෝජිත - මහනුවර', 'representative', 'මහනුවර ප්‍රදේශ නියෝජිත', NULL, 'RW', 'from-cyan-500 to-teal-600', 2, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'representative' AND display_order = 2);`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ඩබ්ලිව්. ජී. බණ්ඩාරනායක', 'ඩබ්ලිව්. ජී. බණ්ඩාරනායක', 'Area Representative - Colombo', 'ප්‍රදේශ නියෝජිත - කොළඹ', 'representative', 'කොළඹ ප්‍රදේශ නියෝජිත', NULL, 'WB', 'from-emerald-500 to-green-600', 3, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'representative' AND display_order = 3);`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'ටී. එම්. හේරත්', 'ටී. එම්. හේරත්', 'Area Representative - Gampaha', 'ප්‍රදේශ නියෝජිත - ගම්පහ', 'representative', 'ගම්පහ ප්‍රදේශ නියෝජිත', NULL, 'TH', 'from-violet-500 to-purple-600', 4, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'representative' AND display_order = 4);`,
  `INSERT INTO committee_members (name, name_si, role, role_si, category, description_si, photo, initials, color, display_order, is_active)
   SELECT 'කේ. එච්. ජයවර්ධන', 'කේ. එච්. ජයවර්ධන', 'Area Representative - Kurunegala', 'ප්‍රදේශ නියෝජිත - කුරුණෑගල', 'representative', 'කුරුණෑගල ප්‍රදේශ නියෝජිත', NULL, 'KJ', 'from-rose-500 to-red-600', 5, true
   WHERE NOT EXISTS (SELECT 1 FROM committee_members WHERE category = 'representative' AND display_order = 5);`,
];

async function migrate() {
  console.log('Connecting to Supabase PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected!\n');
    
    console.log('=== SCHEMA MIGRATION ===');
    for (const sql of sqlStatements) {
      console.log(`Executing: ${sql.substring(0, 80)}...`);
      try {
        await client.query(sql);
        console.log('  ✅ OK');
      } catch (err) {
        console.log(`  ⚠️  ${err.message}`);
      }
    }
    
    console.log('\n=== SEEDING DATA ===');
    for (const sql of seedStatements) {
      const desc = sql.match(/SELECT '([^']+)'/)?.[1] || 'unknown';
      console.log(`Inserting: ${desc}...`);
      try {
        const result = await client.query(sql);
        console.log(`  ✅ OK (rows affected: ${result.rowCount})`);
      } catch (err) {
        console.log(`  ⚠️  ${err.message}`);
      }
    }
    
    // Verify
    console.log('\n=== VERIFICATION ===');
    const res = await client.query('SELECT id, name, category, role, display_order, is_active FROM committee_members ORDER BY category, display_order');
    console.log(`Total rows: ${res.rows.length}`);
    for (const row of res.rows) {
      console.log(`  [${row.category}] ${row.name} - ${row.role} (order: ${row.display_order}, active: ${row.is_active})`);
    }
    
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
    console.log('\nDone.');
  }
}

migrate();
