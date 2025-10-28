import { NextResponse } from 'next/server';
import { checkRoomAvailability, calculateTotalPrice, getDailyPrices } from '@/lib/availability';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('room_id');
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required parameters: room_id, check_in, check_out' },
        { status: 400 }
      );
    }

    const available = await checkRoomAvailability(roomId, checkIn, checkOut);
    const totalPrice = await calculateTotalPrice(roomId, checkIn, checkOut);
    const dailyPrices = await getDailyPrices(roomId, checkIn, checkOut);

    return NextResponse.json({
      roomId,
      checkIn,
      checkOut,
      available,
      totalPrice,
      dailyPrices,
      isAvailable: available > 0,
    });
  } catch (error) {
    console.error('Availability API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
