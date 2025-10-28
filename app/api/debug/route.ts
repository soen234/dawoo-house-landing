import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    env: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
      supabaseKeyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString()
  });
}
