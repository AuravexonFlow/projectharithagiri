import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac, timingSafeEqual } from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Allowed tables for admin operations
const ALLOWED_TABLES = [
  'donors', 'events', 'gallery_images', 'gallery_categories',
  'news_updates', 'committee_members', 'temple_places', 'place_images',
  'temple_officials', 'event_photos', 'site_settings'
];

const ADMIN_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_SECRET || 'harithagiri-admin-2026';

function verifyToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split('.');
    if (!timestamp || !signature) return false;
    if (Date.now() - parseInt(timestamp) > 24 * 60 * 60 * 1000) return false;
    const expected = createHmac('sha256', ADMIN_SECRET).update(timestamp).digest('hex');
    const sigBuf = Buffer.from(signature, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, table, data, id, filters } = body;

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !verifyToken(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!table || !ALLOWED_TABLES.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    switch (action) {
      case 'select': {
        let query = supabase.from(table).select(filters?.select || '*');
        if (filters?.order) query = query.order(filters.order.column, { ascending: filters.order.ascending ?? false });
        if (filters?.limit) query = query.limit(filters.limit);
        if (filters?.eq) {
          for (const [col, val] of Object.entries(filters.eq)) {
            query = query.eq(col, val);
          }
        }
        const { data: result, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ data: result });
      }

      case 'count': {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact' });
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ count: count || 0 });
      }

      case 'insert': {
        if (!data) return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        const { data: result, error } = await supabase.from(table).insert(data).select();
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ data: result });
      }

      case 'update': {
        if (!id || !data) return NextResponse.json({ error: 'No id or data provided' }, { status: 400 });
        const { data: result, error } = await supabase.from(table).update(data).eq('id', id).select();
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ data: result });
      }

      case 'upsert': {
        if (!data) return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        const { data: result, error } = await supabase.from(table).upsert(data, { onConflict: filters?.onConflict || 'id' }).select();
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ data: result });
      }

      case 'delete': {
        if (!id) return NextResponse.json({ error: 'No id provided' }, { status: 400 });
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
