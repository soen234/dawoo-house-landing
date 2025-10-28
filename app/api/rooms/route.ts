import { NextResponse } from 'next/server';
import { supabase, type RoomWithAvailability } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Debug: Log environment variables status
    console.log('Supabase URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');

    // 모든 객실 조회
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .order('name');

    if (error) {
      console.error('Rooms query error:', error);
      return NextResponse.json(
        {
          error: 'Failed to fetch rooms',
          details: error.message,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      );
    }

    // 날짜가 제공되지 않으면 기본 정보만 반환
    if (!checkIn || !checkOut) {
      return NextResponse.json({ rooms });
    }

    // 날짜별 가용성과 가격 정보 추가
    const roomsWithAvailability: RoomWithAvailability[] = await Promise.all(
      rooms.map(async (room) => {
        // 해당 기간의 재고 조회
        const { data: inventory } = await supabase
          .from('inventory')
          .select('available')
          .eq('room_id', room.id)
          .gte('date', checkIn)
          .lt('date', checkOut)
          .order('available', { ascending: true })
          .limit(1);

        // 해당 기간의 평균 가격 조회
        const { data: pricing } = await supabase
          .from('pricing')
          .select('price')
          .eq('room_id', room.id)
          .gte('date', checkIn)
          .lt('date', checkOut);

        const availableCount = inventory && inventory.length > 0
          ? inventory[0].available
          : room.total_rooms;

        const averagePrice = pricing && pricing.length > 0
          ? pricing.reduce((sum, p) => sum + Number(p.price), 0) / pricing.length
          : room.base_price;

        return {
          ...room,
          available_count: availableCount,
          current_price: averagePrice,
        };
      })
    );

    return NextResponse.json({
      rooms: roomsWithAvailability,
      checkIn,
      checkOut
    });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
