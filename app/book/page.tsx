'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DateRangePicker from '@/components/DateRangePicker';
import { type RoomWithAvailability } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BookPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rooms, setRooms] = useState<RoomWithAvailability[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();

    // URL 파라미터에서 초기값 설정
    const roomId = searchParams.get('room_id');
    const checkInParam = searchParams.get('check_in');
    const checkOutParam = searchParams.get('check_out');

    if (roomId) setSelectedRoomId(roomId);
    if (checkInParam) setCheckIn(checkInParam);
    if (checkOutParam) setCheckOut(checkOutParam);
  }, [searchParams]);

  useEffect(() => {
    if (selectedRoomId && checkIn && checkOut) {
      calculatePrice();
    }
  }, [selectedRoomId, checkIn, checkOut]);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data.rooms);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  };

  const calculatePrice = async () => {
    try {
      const response = await fetch(
        `/api/availability?room_id=${selectedRoomId}&check_in=${checkIn}&check_out=${checkOut}`
      );
      const data = await response.json();

      if (data.totalPrice) {
        setTotalPrice(data.totalPrice);
      }
    } catch (err) {
      console.error('Failed to calculate price:', err);
    }
  };

  const handleDateChange = (start: string, end: string) => {
    setCheckIn(start);
    setCheckOut(end);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: selectedRoomId,
          check_in: checkIn,
          check_out: checkOut,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          number_of_guests: numberOfGuests,
          total_price: totalPrice,
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create reservation');
      }

      // 예약 성공 시 확인 페이지로 이동
      router.push(`/book/confirmation?id=${data.reservation.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.booking.title}</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 객실 선택 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.booking.selectRoom}</h2>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{t.booking.selectRoomPlaceholder}</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - {room.type} (₩{room.base_price.toLocaleString()}{t.rooms.perNight})
                </option>
              ))}
            </select>
          </div>

          {/* 날짜 선택 - 캘린더 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.booking.dates}</h2>
            <DateRangePicker
              startDate={checkIn}
              endDate={checkOut}
              onDateChange={handleDateChange}
            />
            {nights > 0 && (
              <p className="mt-4 text-sm text-gray-600">
                {t.booking.totalNights} <span className="font-semibold text-gray-900">{nights}{t.booking.nights}</span> {t.booking.stay}
              </p>
            )}
          </div>

          {/* 투숙객 정보 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.booking.guestInfo}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.booking.name} <span className="text-red-500">{t.booking.required}</span>
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t.booking.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.booking.email}
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t.booking.emailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.booking.phone}
                </label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t.booking.phonePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.booking.numberOfGuests} <span className="text-red-500">{t.booking.required}</span>
                </label>
                <select
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}{t.booking.guestsCount}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 결제 수단 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t.booking.paymentMethod} <span className="text-red-500">{t.booking.required}</span>
            </h2>
            <div className="space-y-3">
              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="onsite"
                  checked={paymentMethod === 'onsite'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="mt-1 mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{t.booking.paymentOnsite}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {t.booking.paymentOnsiteDesc}
                  </p>
                </div>
              </label>

              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="mt-1 mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{t.booking.paymentTransfer}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {t.booking.paymentTransferDesc}
                  </p>
                  {paymentMethod === 'transfer' && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                      <p className="font-semibold text-blue-900 mb-1">{t.booking.paymentTransferInfo}</p>
                      <p className="text-blue-800">{t.booking.paymentTransferAccount}</p>
                      <p className="text-blue-800">{t.booking.paymentTransferName}</p>
                      <p className="text-xs text-blue-700 mt-2">
                        {t.booking.paymentTransferNote}
                      </p>
                    </div>
                  )}
                </div>
              </label>

              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="mt-1 mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {t.booking.paymentPaypal}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.65a.77.77 0 0 1 .76-.65h7.316c3.03 0 5.094 1.45 5.094 4.23 0 3.05-2.133 5.15-5.334 5.15h-3.43l-1.305 7.207a.642.642 0 0 1-.634.54l-.305.01Zm10.09-7.45c2.96 0 4.87-1.75 4.87-4.5 0-2.5-1.7-3.85-4.43-3.85h-3.48l-1.67 9.23h3.35c1.63 0 2.75-.83 2.75-2.25 0-1.05-.7-1.63-1.7-1.63h-1.92l.58-3.22h1.92c.94 0 1.47.48 1.47 1.34 0 .95-.64 1.54-1.7 1.54h-.94l.58 3.22h1.4Z" fill="#003087"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {t.booking.paymentPaypalDesc}
                  </p>
                  {paymentMethod === 'paypal' && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                      <p className="text-blue-800">
                        {t.booking.paymentPaypalAccount}
                      </p>
                      <p className="text-xs text-blue-700 mt-2">
                        {t.booking.paymentPaypalNote}
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* 예약 요약 */}
          {selectedRoom && checkIn && checkOut && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.booking.summary}</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">{t.booking.room}</span>
                  <span className="font-semibold">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{t.booking.period}</span>
                  <span className="font-semibold">
                    {checkIn} ~ {checkOut} ({nights}{t.booking.nights})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{t.booking.guests}</span>
                  <span className="font-semibold">{numberOfGuests}{t.booking.guestsCount}</span>
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">{t.booking.totalPrice}</span>
                    <span className="font-bold text-green-600">
                      ₩{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading || !selectedRoomId || !checkIn || !checkOut || !guestName || !paymentMethod}
            className="w-full py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t.booking.submitting : t.booking.submit}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
