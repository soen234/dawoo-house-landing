import { NextResponse } from 'next/server';
import { getRoomUpcomingPrices } from '@/lib/availability';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;

    if (!roomId) {
      return NextResponse.json(
        { error: 'Missing room_id parameter' },
        { status: 400 }
      );
    }

    const prices = await getRoomUpcomingPrices(roomId);

    return NextResponse.json({
      roomId,
      prices,
    });
  } catch (error) {
    console.error('Room prices API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
