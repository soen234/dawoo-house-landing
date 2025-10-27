import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRoomAvailability, getDateRange } from '@/lib/availability';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      room_id,
      check_in,
      check_out,
      guest_name,
      guest_email,
      guest_phone,
      number_of_guests,
      total_price,
      payment_method,
    } = body;

    // 필수 필드 검증
    if (!room_id || !check_in || !check_out || !guest_name || !number_of_guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 예약 가능 여부 확인
    const available = await checkRoomAvailability(room_id, check_in, check_out);
    if (available <= 0) {
      return NextResponse.json(
        { error: 'Room is not available for the selected dates' },
        { status: 400 }
      );
    }

    // 예약 생성
    const reservationId = crypto.randomUUID();
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .insert({
        id: reservationId,
        organization_id: '00000000-0000-0000-0000-000000000001',
        room_id,
        channel: 'website',
        channel_reservation_id: `WEB-${Date.now()}`,
        guest_name,
        guest_email: guest_email || null,
        guest_phone: guest_phone || null,
        check_in,
        check_out,
        number_of_guests,
        total_price: Number(total_price) || 0,
        currency: 'KRW',
        status: 'CONFIRMED',
        payment_method: payment_method || null,
      })
      .select()
      .single();

    if (reservationError) {
      console.error('Reservation creation error:', reservationError);
      return NextResponse.json(
        { error: 'Failed to create reservation' },
        { status: 500 }
      );
    }

    // 재고 차감
    const dates = getDateRange(check_in, check_out);
    for (const date of dates) {
      // 해당 날짜의 재고 조회
      const { data: inventoryData } = await supabase
        .from('inventory')
        .select('*')
        .eq('room_id', room_id)
        .eq('date', date)
        .single();

      if (inventoryData) {
        // 재고가 있으면 차감
        await supabase
          .from('inventory')
          .update({ available: inventoryData.available - 1 })
          .eq('id', inventoryData.id);
      } else {
        // 재고 정보가 없으면 새로 생성
        const { data: room } = await supabase
          .from('rooms')
          .select('total_rooms')
          .eq('id', room_id)
          .single();

        if (room) {
          await supabase.from('inventory').insert({
            room_id,
            date,
            total: room.total_rooms,
            available: room.total_rooms - 1,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // 특정 예약 조회
      const { data: reservation, error } = await supabase
        .from('reservations')
        .select(`
          *,
          rooms (
            name,
            type,
            capacity
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Reservation not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ reservation });
    } else {
      // 모든 예약 조회
      const { data: reservations, error } = await supabase
        .from('reservations')
        .select(`
          *,
          rooms (
            name,
            type
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch reservations' },
          { status: 500 }
        );
      }

      return NextResponse.json({ reservations });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
