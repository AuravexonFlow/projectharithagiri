import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_SECRET || 'harithagiri-admin-2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'harithagiri2026';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'වැරදි මුරපදය' }, { status: 401 });
    }

    const timestamp = Date.now().toString();
    const signature = createHmac('sha256', ADMIN_SECRET).update(timestamp).digest('hex');
    const token = `${timestamp}.${signature}`;

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: 'සම්බන්ධතා දෝෂයකි' }, { status: 500 });
  }
}
