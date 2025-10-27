'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Review {
  id: string;
  rating: number;
  name: string;
  country: string;
  date: string;
  isNew: boolean;
  scores: {
    staff: number;
    cleanliness: number;
    location: number;
    facilities: number;
    comfort: number;
    value: number;
    wifi?: number;
  };
  title?: string;
  content: string;
  translated?: boolean;
  translatedFrom?: string;
}

const reviews: Review[] = [
  {
    id: '1',
    rating: 8.0,
    name: 'Lea',
    country: 'nl',
    date: '2025-10-26',
    isNew: true,
    scores: {
      staff: 7.5,
      cleanliness: 10,
      location: 10,
      facilities: 7.5,
      comfort: 7.5,
      value: 7.5,
      wifi: 10
    },
    title: '홍대 좋은 위치와 쾌적한 객실',
    content: '홍대와 서울을 돌아다니기에 객실의 위치가 매우 좋았습니다. 방은 충분히 넓었고 체크인도 편리해서 좋았습니다. 와이파이는 좋았고, 객실에 에어컨이 있어서 좋았습니다.\n\n집 안의 방의 위치 때문에 다른 사람들이 오고 가는 소리가 들려서 가끔 잠을 방해받기도 했지만, 그다지 심하거나 시끄럽지는 않았습니다. 아침 식사는 견과류, 오렌지 주스, 미니 케이크로 구성되어 있으니 너무 많은 것을 기대하지 마세요. 침대는 편안했지만 방에 붙어 있어서 옆으로 나갈 수가 없었습니다. 우리에게는 문제가 되지 않았지만 고려해야 할 사항이었습니다.',
    translated: true,
    translatedFrom: '영어'
  },
  {
    id: '2',
    rating: 7.0,
    name: 'Sofia',
    country: 'es',
    date: '2025-10-25',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 7.5,
      location: 10,
      facilities: 7.5,
      comfort: 10,
      value: 10
    },
    content: '위치가 훌륭하고 깨끗한 객실입니다. 직원들이 매우 친절했고 가격 대비 훌륭한 가치를 제공합니다.',
    translated: true,
    translatedFrom: '스페인어'
  },
  {
    id: '3',
    rating: 9.0,
    name: 'hsiaojing',
    country: 'tw',
    date: '2025-10-25',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 7.5,
      location: 10,
      facilities: 7.5,
      comfort: 7.5,
      value: 10
    },
    title: '전반적으로 매우 만족합니다',
    content: '편리한 교통, 호스트의 소통이 원활하고 도움을 주려는 의지가 강함\n방음은 되지만 배낭여행객들은 방해를 피할 수 없고 다른 사람을 방해할까 두려워합니다.',
    translated: true,
    translatedFrom: '광둥어'
  },
  {
    id: '4',
    rating: 8.0,
    name: 'Barron',
    country: 'gb',
    date: '2025-10-20',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 7.5,
      location: 10,
      facilities: 7.5,
      comfort: 7.5,
      value: 10
    },
    content: '훌륭한 숙소! 위치가 완벽하고 직원들이 매우 도움이 되었습니다. 가격 대비 훌륭한 가치입니다.',
    translated: true,
    translatedFrom: '영어'
  },
  {
    id: '5',
    rating: 8.0,
    name: 'Ludmila',
    country: 'cz',
    date: '2025-10-20',
    isNew: true,
    scores: {
      staff: 7.5,
      cleanliness: 10,
      location: 10,
      facilities: 7.5,
      comfort: 10,
      value: 10
    },
    content: '매우 깨끗하고 편안한 객실입니다. 위치가 완벽하고 가격도 합리적입니다.',
    translated: true,
    translatedFrom: '체코어'
  },
  {
    id: '6',
    rating: 7.0,
    name: 'Hoi Ling',
    country: 'hk',
    date: '2025-10-20',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 7.5,
      location: 5,
      facilities: 7.5,
      comfort: 7.5,
      value: 7.5
    },
    content: '제가 몸이 좋지 않아서 그들은 매우 배려해 주었습니다. 그들은 나를 정말 아끼고 사랑해주었습니다. 정말 고맙습니다',
    translated: true,
    translatedFrom: '영어'
  },
  {
    id: '7',
    rating: 9.0,
    name: 'Darja',
    country: 'pt',
    date: '2025-10-17',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 7.5,
      location: 10,
      facilities: 10,
      comfort: 10,
      value: 10
    },
    title: '훌륭한 숙박, 청결함, 호스트와의 소통이 매우 원활했고, 체크인과 체크아웃이 쉬웠습니다.',
    content: '위치가 완벽했습니다. 공항에서 매우 편리하게 접근 가능하고, 호스트와의 소통도 원활했으며, 깨끗했습니다. 간단한 아침 식사도 제공되었습니다.\n침실 문이 매우 큰 소리로 삐걱거렸다.',
    translated: true,
    translatedFrom: '독일어'
  },
  {
    id: '8',
    rating: 10,
    name: 'Baocaca',
    country: 'tw',
    date: '2025-10-14',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 10,
      location: 10,
      facilities: 10,
      comfort: 10,
      value: 10
    },
    content: '완벽한 숙소입니다! 모든 것이 훌륭했습니다.',
    translated: true
  },
  {
    id: '9',
    rating: 8.0,
    name: 'Noemi',
    country: 'it',
    date: '2025-10-12',
    isNew: true,
    scores: {
      staff: 10,
      cleanliness: 10,
      location: 10,
      facilities: 10,
      comfort: 10,
      value: 10
    },
    content: '친절하고 깨끗하며 대중교통과 가깝습니다. 상점과 식당이 있는 중앙 광장과도 가깝습니다. 주인분은 정말 친절하고 예의 바르셨습니다.',
    translated: true,
    translatedFrom: '이탈리아어'
  },
  {
    id: '10',
    rating: 8.0,
    name: 'Marta',
    country: 'it',
    date: '2025-10-11',
    isNew: true,
    scores: {
      staff: 7.5,
      cleanliness: 10,
      location: 10,
      facilities: 7.5,
      comfort: 10,
      value: 10
    },
    content: '훌륭한 위치와 깨끗한 객실. 직원들이 매우 친절했습니다.',
    translated: true,
    translatedFrom: '이탈리아어'
  }
];

const countryFlags: { [key: string]: string } = {
  nl: '🇳🇱',
  es: '🇪🇸',
  tw: '🇹🇼',
  gb: '🇬🇧',
  cz: '🇨🇿',
  hk: '🇭🇰',
  pt: '🇵🇹',
  it: '🇮🇹'
};

export default function ReviewsPage() {
  const { t } = useLanguage();

  // 평균 평점 계산
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  // 카테고리별 평균 점수 계산
  const averageScores = {
    staff: (reviews.reduce((sum, r) => sum + r.scores.staff, 0) / reviews.length).toFixed(1),
    cleanliness: (reviews.reduce((sum, r) => sum + r.scores.cleanliness, 0) / reviews.length).toFixed(1),
    location: (reviews.reduce((sum, r) => sum + r.scores.location, 0) / reviews.length).toFixed(1),
    facilities: (reviews.reduce((sum, r) => sum + r.scores.facilities, 0) / reviews.length).toFixed(1),
    comfort: (reviews.reduce((sum, r) => sum + r.scores.comfort, 0) / reviews.length).toFixed(1),
    value: (reviews.reduce((sum, r) => sum + r.scores.value, 0) / reviews.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.reviews.title}</h1>
          <p className="text-lg text-gray-600">{t.reviews.subtitle}</p>
        </div>

        {/* Overall Rating Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Score */}
            <div className="flex flex-col items-center justify-center border-r border-gray-200">
              <div className="text-6xl font-bold text-green-600 mb-2">{averageRating}</div>
              <div className="text-xl font-semibold text-gray-900 mb-1">{t.reviews.overall}</div>
              <div className="text-gray-600">{reviews.length}{t.reviews.reviewsCount}</div>
            </div>

            {/* Category Scores */}
            <div className="space-y-3">
              {Object.entries(averageScores).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{t.reviews[key as keyof typeof t.reviews]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${(parseFloat(value) / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-semibold w-8">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{countryFlags[review.country]}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-lg">{review.name}</span>
                      {review.isNew && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                          {t.reviews.newBadge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{review.rating}</div>
                </div>
              </div>

              {/* Scores Grid */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4 py-4 border-y border-gray-200">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.staff}</div>
                  <div className="font-bold text-gray-900">{review.scores.staff}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.cleanliness}</div>
                  <div className="font-bold text-gray-900">{review.scores.cleanliness}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.location}</div>
                  <div className="font-bold text-gray-900">{review.scores.location}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.facilities}</div>
                  <div className="font-bold text-gray-900">{review.scores.facilities}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.comfort}</div>
                  <div className="font-bold text-gray-900">{review.scores.comfort}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{t.reviews.value}</div>
                  <div className="font-bold text-gray-900">{review.scores.value}</div>
                </div>
              </div>

              {/* Wi-Fi Score (if available) */}
              {review.scores.wifi && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">{t.reviews.wifi}: </span>
                  <span className="font-bold text-gray-900">{review.scores.wifi}</span>
                </div>
              )}

              {/* Translation Notice */}
              {review.translated && review.translatedFrom && (
                <div className="text-xs text-gray-500 mb-3">
                  {review.translatedFrom}에서 {t.reviews.translated} - {t.reviews.originalText}
                </div>
              )}

              {/* Review Content */}
              <div className="space-y-3">
                {review.title && (
                  <h3 className="font-bold text-gray-900 text-lg">{review.title}</h3>
                )}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{review.content}</p>
              </div>

              {/* Reply Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                  {t.reviews.reply}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
