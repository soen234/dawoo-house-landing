'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            {t.about.title}
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              {t.about.story1} <strong className="text-gray-900">{t.about.story1Bold}</strong>{t.about.story1End}
            </p>

            <div className="bg-white rounded-lg p-6 my-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600">
                {t.about.safestay} <strong className="text-green-600">{t.about.safestayBold}</strong>{t.about.safestayEnd}
                <br />
                {t.about.businessNumber} <strong>575-34-00493</strong> · {t.about.licenseNumber} <strong>2018-000067</strong>
              </p>
            </div>

            <p>
              {t.about.goal} <strong className="text-gray-900">{t.about.goalBold}</strong>{t.about.goalEnd}
            </p>

            <p>
              {t.about.facilities}
            </p>

            <p className="text-lg font-semibold text-green-700 text-center mt-8">
              {t.about.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
