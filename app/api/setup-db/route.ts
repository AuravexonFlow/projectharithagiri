import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  return NextResponse.json({ message: 'Setup API ready. Use POST to run setup.' });
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Step 1: Add missing columns one by one using raw SQL via pg
    const { Client } = await import('pg');
    const client = new Client({
      connectionString: `postgresql://postgres.${process.env.SUPABASE_PROJECT_REF}:${encodeURIComponent(process.env.SUPABASE_DB_PASSWORD || '')}@${process.env.SUPABASE_DB_HOST || 'aws-0-ap-southeast-1.pooler.supabase.com'}:6543/postgres`,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();

      const alterStatements = [
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'committee'`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS description_si TEXT`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS photo TEXT`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS initials TEXT`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'from-emerald-500 to-teal-600'`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS phone TEXT`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS email TEXT`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now()`,
        `ALTER TABLE committee_members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now()`,
      ];

      const results = [];
      for (const sql of alterStatements) {
        try {
          await client.query(sql);
          results.push({ sql: sql.substring(0, 60), status: 'ok' });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          results.push({ sql: sql.substring(0, 60), status: 'error', error: msg });
        }
      }

      await client.end();
      return NextResponse.json({ success: true, results });
    } catch (dbErr) {
      return NextResponse.json({ error: `DB connection failed: ${dbErr instanceof Error ? dbErr.message : String(dbErr)}` }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
