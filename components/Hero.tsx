'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t.hero.badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t.hero.title}
            <br />
            <span className="text-green-600">{t.hero.subtitle}</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description1}
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description2}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              {t.hero.cta.book}
            </Link>
            <Link
              href="/rooms"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
            >
              {t.hero.cta.rooms}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">11</div>
              <div className="text-sm text-gray-600 mt-1">{t.hero.stats.rooms}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">30{t.hero.stats.walk === '홍대까지 도보' ? '초' : 's'}</div>
              <div className="text-sm text-gray-600 mt-1">{t.hero.stats.walk}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5{t.hero.stats.station === '홍대입구역' ? '분' : 'min'}</div>
              <div className="text-sm text-gray-600 mt-1">{t.hero.stats.station}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2018</div>
              <div className="text-sm text-gray-600 mt-1">{t.hero.stats.opened}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
