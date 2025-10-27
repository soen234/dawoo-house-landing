'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { type RoomWithAvailability } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// 객실 타입에 따른 이미지 매핑
const getRoomImage = (roomType: string): string => {
  const typeMap: { [key: string]: string } = {
    '1인실': '/room_images/room_single/161837298.jpg',
    'single': '/room_images/room_single/161837298.jpg',
    '싱글': '/room_images/room_single/161837298.jpg',
    '2인실': '/room_images/room_double/162068666.jpg',
    'double': '/room_images/room_double/162068666.jpg',
    '더블': '/room_images/room_double/162068666.jpg',
    '3인실': '/room_images/room_triple/161837267.jpg',
    'triple': '/room_images/room_triple/161837267.jpg',
    '트리플': '/room_images/room_triple/161837267.jpg',
    '4인실': '/room_images/room_quad/161837333.jpg',
    'quad': '/room_images/room_quad/161837333.jpg',
    '쿼드': '/room_images/room_quad/161837333.jpg',
    '도미토리': '/room_images/room_dormitory/161837398.jpg',
    'dormitory': '/room_images/room_dormitory/161837398.jpg',
    'dorm': '/room_images/room_dormitory/161837398.jpg',
  };

  return typeMap[roomType.toLowerCase()] || '/room_images/room_single/161837298.jpg';
};

export default function RoomsPage() {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<RoomWithAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (searchCheckIn?: string, searchCheckOut?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchCheckIn) params.set('check_in', searchCheckIn);
      if (searchCheckOut) params.set('check_out', searchCheckOut);

      const response = await fetch(`/api/rooms?${params.toString()}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setRooms(data.rooms);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rooms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      fetchRooms(checkIn, checkOut);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.rooms.title}</h1>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.rooms.checkIn}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.rooms.checkOut}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={!checkIn || !checkOut}
                className="w-full md:w-auto px-8 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t.rooms.search}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
            <p className="mt-4 text-gray-600">{t.rooms.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">{t.rooms.noRooms}</p>
              </div>
            ) : (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={getRoomImage(room.type)}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {room.type} · {room.capacity}{t.rooms.capacity}
                    </p>

                    <div className="space-y-2 mb-4">
                      {room.available_count !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{t.rooms.available}</span>
                          <span className={`font-semibold ${
                            room.available_count > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {room.available_count > 0
                              ? `${room.available_count}${t.rooms.roomsCount}`
                              : t.rooms.soldOut}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{t.rooms.price}</span>
                        <span className="text-lg font-bold text-gray-900">
                          ₩{(room.current_price || room.base_price).toLocaleString()}
                          <span className="text-sm font-normal text-gray-600">{t.rooms.perNight}</span>
                        </span>
                      </div>
                    </div>

                    {room.available_count === 0 ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                      >
                        {t.rooms.unavailable}
                      </button>
                    ) : (
                      <Link
                        href={`/book?room_id=${room.id}${checkIn ? `&check_in=${checkIn}` : ''}${checkOut ? `&check_out=${checkOut}` : ''}`}
                        className="block w-full py-3 bg-green-600 text-white text-center font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {t.rooms.bookNow}
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
