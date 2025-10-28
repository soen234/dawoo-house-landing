import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim() || 'https://placeholder.supabase.co';
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim() || 'placeholder-anon-key';

if (supabaseUrl === 'https://placeholder.supabase.co' && typeof window !== 'undefined') {
  console.error('Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL environment variable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface Property {
  id: string;
  name: string;
  address: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  property_id: string;
  name: string;
  type: string;
  total_rooms: number;
  capacity: number;
  base_price: number;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  room_id: string;
  date: string;
  available: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface Pricing {
  id: string;
  room_id: string;
  date: string;
  price: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  room_id: string;
  channel: string;
  channel_reservation_id: string;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  number_of_guests: number;
  total_price: number;
  currency: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'NO_SHOW';
  created_at: string;
  updated_at: string;
}

export interface RoomWithAvailability extends Room {
  available_count?: number;
  current_price?: number;
}
