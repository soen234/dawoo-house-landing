'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { type RoomWithAvailability } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// 객실 타입에 따른 이미지 매핑
const getRoomImage = (roomName: string, roomType: string): string => {
  // roomName으로 먼저 매핑 시도
  const nameMap: { [key: string]: string } = {
    '1인실': '/room_images/room_single/161837298.jpg',
    '2인실': '/room_images/room_double/162068666.jpg',
    '3인실': '/room_images/room_triple/161837267.jpg',
    '4인실': '/room_images/room_quad/161837333.jpg',
    '도미토리': '/room_images/room_dormitory/161837398.jpg',
  };

  // roomType으로 매핑
  const typeMap: { [key: string]: string } = {
    'single': '/room_images/room_single/161837298.jpg',
    'double': '/room_images/room_double/162068666.jpg',
    'triple': '/room_images/room_triple/161837267.jpg',
    'quad': '/room_images/room_quad/161837333.jpg',
    'dormitory': '/room_images/room_dormitory/161837398.jpg',
  };

  // roomName에서 키워드를 찾아서 매핑
  const lowerName = roomName.toLowerCase();
  if (lowerName.includes('1인') || lowerName.includes('single') || lowerName.includes('싱글')) {
    return '/room_images/room_single/161837298.jpg';
  } else if (lowerName.includes('2인') || lowerName.includes('double') || lowerName.includes('더블')) {
    return '/room_images/room_double/162068666.jpg';
  } else if (lowerName.includes('3인') || lowerName.includes('triple') || lowerName.includes('트리플')) {
    return '/room_images/room_triple/161837267.jpg';
  } else if (lowerName.includes('4인') || lowerName.includes('quad') || lowerName.includes('쿼드')) {
    return '/room_images/room_quad/161837333.jpg';
  } else if (lowerName.includes('도미') || lowerName.includes('dorm')) {
    return '/room_images/room_dormitory/161837398.jpg';
  }

  // roomType으로 시도
  const lowerType = roomType.toLowerCase();
  return typeMap[lowerType] || '/room_images/room_single/161837298.jpg';
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

  const getRoomTypeName = (type: string, name?: string) => {
    // Normalize type to lowercase
    let normalizedType = type?.toLowerCase() || '';

    // If type is not standard, try to infer from name
    if (!normalizedType || !['single', 'double', 'triple', 'quad', 'dormitory'].includes(normalizedType)) {
      const lowerName = (name || '').toLowerCase();
      if (lowerName.includes('single') || lowerName.includes('1인') || lowerName.includes('싱글')) {
        normalizedType = 'single';
      } else if (lowerName.includes('double') || lowerName.includes('2인') || lowerName.includes('더블')) {
        normalizedType = 'double';
      } else if (lowerName.includes('triple') || lowerName.includes('3인') || lowerName.includes('트리플')) {
        normalizedType = 'triple';
      } else if (lowerName.includes('quad') || lowerName.includes('4인') || lowerName.includes('쿼드')) {
        normalizedType = 'quad';
      } else if (lowerName.includes('dorm') || lowerName.includes('도미')) {
        normalizedType = 'dormitory';
      }
    }

    const typeKey = normalizedType as 'single' | 'double' | 'triple' | 'quad' | 'dormitory';
    return t.roomTypes?.[typeKey] || name || type;
  };

  const getRoomCapacity = (type: string, name?: string, dbCapacity?: number) => {
    // Normalize type to lowercase
    let normalizedType = type?.toLowerCase() || '';

    // If type is not standard, try to infer from name
    if (!normalizedType || !['single', 'double', 'triple', 'quad', 'dormitory'].includes(normalizedType)) {
      const lowerName = (name || '').toLowerCase();
      if (lowerName.includes('single') || lowerName.includes('1인') || lowerName.includes('싱글')) {
        normalizedType = 'single';
      } else if (lowerName.includes('double') || lowerName.includes('2인') || lowerName.includes('더블')) {
        normalizedType = 'double';
      } else if (lowerName.includes('triple') || lowerName.includes('3인') || lowerName.includes('트리플')) {
        normalizedType = 'triple';
      } else if (lowerName.includes('quad') || lowerName.includes('4인') || lowerName.includes('쿼드')) {
        normalizedType = 'quad';
      } else if (lowerName.includes('dorm') || lowerName.includes('도미')) {
        normalizedType = 'dormitory';
      }
    }

    // Return capacity based on room type
    switch (normalizedType) {
      case 'single':
        return 1;
      case 'dormitory':
        return 1;
      case 'double':
        return 2;
      case 'triple':
        return 3;
      case 'quad':
        return 4;
      default:
        return dbCapacity || 2; // fallback to DB value or 2
    }
  };

  const getNormalizedType = (type: string, name?: string): 'single' | 'double' | 'triple' | 'quad' | 'dormitory' | null => {
    let normalizedType = type?.toLowerCase() || '';

    if (!normalizedType || !['single', 'double', 'triple', 'quad', 'dormitory'].includes(normalizedType)) {
      const lowerName = (name || '').toLowerCase();
      if (lowerName.includes('single') || lowerName.includes('1인') || lowerName.includes('싱글')) {
        normalizedType = 'single';
      } else if (lowerName.includes('double') || lowerName.includes('2인') || lowerName.includes('더블')) {
        normalizedType = 'double';
      } else if (lowerName.includes('triple') || lowerName.includes('3인') || lowerName.includes('트리플')) {
        normalizedType = 'triple';
      } else if (lowerName.includes('quad') || lowerName.includes('4인') || lowerName.includes('쿼드')) {
        normalizedType = 'quad';
      } else if (lowerName.includes('dorm') || lowerName.includes('도미')) {
        normalizedType = 'dormitory';
      }
    }

    if (['single', 'double', 'triple', 'quad', 'dormitory'].includes(normalizedType)) {
      return normalizedType as 'single' | 'double' | 'triple' | 'quad' | 'dormitory';
    }
    return null;
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
                      src={getRoomImage(room.name, room.type)}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {getRoomTypeName(room.type, room.name)}
                    </h3>

                    {/* Room Details */}
                    {(() => {
                      const normalizedType = getNormalizedType(room.type, room.name);
                      const details = normalizedType ? t.roomDetails?.[normalizedType] : null;

                      return details ? (
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center text-gray-700">
                            <span className="font-semibold mr-2">{t.roomDetails.sizeLabel}</span>
                            <span>{details.size}</span>
                            <span className="mx-2">|</span>
                            <span className="font-semibold mr-2">{t.roomDetails.bedsLabel}</span>
                            <span>{details.beds}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {details.description}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 mb-4">
                          {getRoomCapacity(room.type, room.name, room.capacity)}{t.rooms.capacity}
                        </p>
                      );
                    })()}

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
                    </div>

                    <div className="space-y-2">
                      {/* View Details Button */}
                      {(() => {
                        const normalizedType = getNormalizedType(room.type, room.name);
                        return normalizedType && t.roomDetails?.[normalizedType] ? (
                          <Link
                            href={`/book?room_id=${room.id}${checkIn ? `&check_in=${checkIn}` : ''}${checkOut ? `&check_out=${checkOut}` : ''}`}
                            className="block w-full py-2 text-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                          >
                            {t.roomDetails.viewDetails} →
                          </Link>
                        ) : null;
                      })()}

                      {/* Book Now Button */}
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
