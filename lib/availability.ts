import { supabase } from './supabase';

/**
 * 특정 기간 동안 객실의 예약 가능 여부를 확인합니다.
 * @param roomId 객실 ID
 * @param checkIn 체크인 날짜 (YYYY-MM-DD)
 * @param checkOut 체크아웃 날짜 (YYYY-MM-DD)
 * @returns 예약 가능한 객실 수
 */
export async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  // 해당 기간의 재고 조회 (가장 적은 재고를 반환)
  const { data: inventory, error: inventoryError } = await supabase
    .from('inventory')
    .select('available')
    .eq('room_id', roomId)
    .gte('date', checkIn)
    .lt('date', checkOut)
    .order('available', { ascending: true })
    .limit(1);

  if (inventoryError) {
    console.error('Inventory query error:', inventoryError);
    return 0;
  }

  // 재고 정보가 없으면 객실의 total_rooms를 반환
  if (!inventory || inventory.length === 0) {
    const { data: room } = await supabase
      .from('rooms')
      .select('total_rooms')
      .eq('id', roomId)
      .single();

    return room?.total_rooms || 0;
  }

  return inventory[0].available;
}

/**
 * 특정 기간 동안 객실의 평균 가격을 계산합니다.
 * @param roomId 객실 ID
 * @param checkIn 체크인 날짜 (YYYY-MM-DD)
 * @param checkOut 체크아웃 날짜 (YYYY-MM-DD)
 * @returns 평균 가격
 */
export async function getRoomAveragePrice(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  const { data: pricing, error } = await supabase
    .from('pricing')
    .select('price')
    .eq('room_id', roomId)
    .gte('date', checkIn)
    .lt('date', checkOut);

  if (error) {
    console.error('Pricing query error:', error);
    // 가격 정보가 없으면 base_price 반환
    const { data: room } = await supabase
      .from('rooms')
      .select('base_price')
      .eq('id', roomId)
      .single();

    return room?.base_price || 0;
  }

  if (!pricing || pricing.length === 0) {
    const { data: room } = await supabase
      .from('rooms')
      .select('base_price')
      .eq('id', roomId)
      .single();

    return room?.base_price || 0;
  }

  const total = pricing.reduce((sum, p) => sum + Number(p.price), 0);
  return total / pricing.length;
}

/**
 * 특정 기간의 총 숙박 요금을 계산합니다.
 * @param roomId 객실 ID
 * @param checkIn 체크인 날짜 (YYYY-MM-DD)
 * @param checkOut 체크아웃 날짜 (YYYY-MM-DD)
 * @returns 총 요금
 */
export async function calculateTotalPrice(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  const { data: pricing, error } = await supabase
    .from('pricing')
    .select('price')
    .eq('room_id', roomId)
    .gte('date', checkIn)
    .lt('date', checkOut);

  if (error || !pricing || pricing.length === 0) {
    // 가격 정보가 없으면 base_price * 일수로 계산
    const { data: room } = await supabase
      .from('rooms')
      .select('base_price')
      .eq('id', roomId)
      .single();

    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return (room?.base_price || 0) * nights;
  }

  return pricing.reduce((sum, p) => sum + Number(p.price), 0);
}

/**
 * 날짜 범위를 생성합니다.
 * @param start 시작 날짜
 * @param end 종료 날짜
 * @returns 날짜 배열 (YYYY-MM-DD 형식)
 */
export function getDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);

  while (startDate < endDate) {
    dates.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}

/**
 * 날짜별 가격 정보를 가져옵니다.
 * @param roomId 객실 ID
 * @param checkIn 체크인 날짜 (YYYY-MM-DD)
 * @param checkOut 체크아웃 날짜 (YYYY-MM-DD)
 * @returns 날짜별 가격 배열
 */
export async function getDailyPrices(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<{ date: string; price: number }[]> {
  const dates = getDateRange(checkIn, checkOut);

  // pricing 테이블에서 날짜별 가격 조회
  const { data: pricing, error } = await supabase
    .from('pricing')
    .select('date, price')
    .eq('room_id', roomId)
    .gte('date', checkIn)
    .lt('date', checkOut)
    .order('date', { ascending: true });

  // base_price 조회
  const { data: room } = await supabase
    .from('rooms')
    .select('base_price')
    .eq('id', roomId)
    .single();

  const basePrice = room?.base_price || 0;

  // 날짜별로 가격 매핑
  return dates.map(date => {
    const priceInfo = pricing?.find(p => p.date === date);
    return {
      date,
      price: priceInfo ? Number(priceInfo.price) : basePrice
    };
  });
}

/**
 * 객실의 향후 가격 정보를 가져옵니다 (오늘부터 3개월)
 * @param roomId 객실 ID
 * @returns 날짜별 가격 배열
 */
export async function getRoomUpcomingPrices(
  roomId: string
): Promise<{ date: string; price: number }[]> {
  const today = new Date().toISOString().split('T')[0];
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const endDate = threeMonthsLater.toISOString().split('T')[0];

  // pricing 테이블에서 날짜별 가격 조회
  const { data: pricing } = await supabase
    .from('pricing')
    .select('date, price')
    .eq('room_id', roomId)
    .gte('date', today)
    .lte('date', endDate)
    .order('date', { ascending: true });

  // base_price 조회
  const { data: room } = await supabase
    .from('rooms')
    .select('base_price')
    .eq('id', roomId)
    .single();

  const basePrice = room?.base_price || 0;

  // 모든 날짜에 대한 가격 매핑
  const dates = getDateRange(today, endDate);
  return dates.map(date => {
    const priceInfo = pricing?.find(p => p.date === date);
    return {
      date,
      price: priceInfo ? Number(priceInfo.price) : basePrice
    };
  });
}
