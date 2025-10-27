'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LocationPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.location.title}</h1>

        {/* Entrance Photo */}
        <figure className="max-w-2xl mx-auto mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <img
            src="/images/gate.jpg"
            alt={t.location.entrancePhoto}
            className="w-full h-auto"
          />
          <figcaption className="text-xs text-gray-600 text-center py-2 bg-gray-50">
            {t.location.entrancePhoto}
          </figcaption>
        </figure>

        {/* Address & Directions */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 space-y-4" style={{ wordBreak: 'keep-all', lineHeight: '1.8' }}>
          <p className="text-gray-900">
            <span className="font-bold">{t.location.addressLabel}</span> {t.location.address}
          </p>
          <p className="font-semibold text-green-600">
            {t.location.subway}
          </p>
          <p className="text-gray-900">
            {t.location.directions}
          </p>
          <p className="text-red-700 font-bold">
            {t.location.parkingWarning}
          </p>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.location.mapTitle}</h3>
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%99%80%EC%9A%B0%EC%82%B0%EB%A1%9C29%EB%82%98%EA%B8%B8%2012%20(%EB%8B%A4%EC%9A%B0%ED%95%98%EC%9A%B0%EC%8A%A41)&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.location.mapTitle}
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
