'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Reservation {
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
  status: string;
  payment_method: string | null;
  created_at: string;
  rooms?: {
    name: string;
    type: string;
    capacity: number;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('id');

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  const fetchReservation = async () => {
    try {
      const response = await fetch(`/api/reservations?id=${reservationId}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setReservation(data.reservation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reservation');
    } finally {
      setLoading(false);
    }
  };

  const nights = reservation
    ? Math.ceil(
        (new Date(reservation.check_out).getTime() -
          new Date(reservation.check_in).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
            <p className="mt-4 text-gray-600">예약 정보를 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-800 text-lg mb-4">{error}</p>
            <Link
              href="/book"
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              다시 예약하기
            </Link>
          </div>
        )}

        {reservation && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                예약이 완료되었습니다!
              </h1>
              <p className="text-gray-600">
                예약 확인 번호: <span className="font-semibold text-gray-900">{reservation.channel_reservation_id}</span>
              </p>
            </div>

            {/* Reservation Details */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">예약 상세</h2>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">객실</span>
                  <span className="font-semibold text-gray-900">
                    {reservation.rooms?.name || '객실'}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">객실 타입</span>
                  <span className="font-semibold text-gray-900">
                    {reservation.rooms?.type || '-'}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">체크인</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(reservation.check_in).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">체크아웃</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(reservation.check_out).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">숙박 기간</span>
                  <span className="font-semibold text-gray-900">{nights}박</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">투숙 인원</span>
                  <span className="font-semibold text-gray-900">
                    {reservation.number_of_guests}명
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">예약자명</span>
                  <span className="font-semibold text-gray-900">
                    {reservation.guest_name}
                  </span>
                </div>

                {reservation.guest_email && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">이메일</span>
                    <span className="font-semibold text-gray-900">
                      {reservation.guest_email}
                    </span>
                  </div>
                )}

                {reservation.guest_phone && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">전화번호</span>
                    <span className="font-semibold text-gray-900">
                      {reservation.guest_phone}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-4 bg-green-50 rounded-lg px-4 mt-4">
                  <span className="text-lg font-bold text-gray-900">총 결제 금액</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₩{reservation.total_price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {reservation.payment_method && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">결제 정보</h2>

                {reservation.payment_method === 'onsite' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">현장결제</div>
                    <p className="text-gray-700">
                      체크인 시 현금 또는 카드로 결제해 주시기 바랍니다.
                    </p>
                  </div>
                )}

                {reservation.payment_method === 'transfer' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-gray-900 mb-3">계좌이체</div>
                    <div className="space-y-1 text-gray-800">
                      <p className="font-medium">국민은행 123-456-789012</p>
                      <p>예금주: 다우게스트하우스</p>
                      <p className="text-sm text-blue-700 mt-3">
                        ※ 예약 후 24시간 이내 입금 부탁드립니다
                      </p>
                    </div>
                  </div>
                )}

                {reservation.payment_method === 'paypal' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      PayPal
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.65a.77.77 0 0 1 .76-.65h7.316c3.03 0 5.094 1.45 5.094 4.23 0 3.05-2.133 5.15-5.334 5.15h-3.43l-1.305 7.207a.642.642 0 0 1-.634.54l-.305.01Zm10.09-7.45c2.96 0 4.87-1.75 4.87-4.5 0-2.5-1.7-3.85-4.43-3.85h-3.48l-1.67 9.23h3.35c1.63 0 2.75-.83 2.75-2.25 0-1.05-.7-1.63-1.7-1.63h-1.92l.58-3.22h1.92c.94 0 1.47.48 1.47 1.34 0 .95-.64 1.54-1.7 1.54h-.94l.58 3.22h1.4Z" fill="#003087"/>
                      </svg>
                    </div>
                    <div className="space-y-1 text-gray-800">
                      <p className="font-medium">dawoohouse@paypal.com</p>
                      <p className="text-sm text-blue-700 mt-3">
                        ※ 결제 링크를 이메일로 발송해 드립니다
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Important Information */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">
                📌 중요 안내사항
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• 체크인 시간: 오후 3시 이후</li>
                <li>• 체크아웃 시간: 오전 11시까지</li>
                <li>• 신분증을 지참해주세요</li>
                <li>• 문의사항은 카카오톡(dawoohouse) 또는 LINE(gg0531)으로 연락주세요</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 py-3 bg-gray-200 text-gray-800 text-center font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                홈으로
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-green-600 text-white text-center font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                예약 확인증 인쇄
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
