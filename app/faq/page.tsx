'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    {
      category: t.faq.categories.checkinout,
      items: [
        {
          title: t.faq.items.checkinTime.title,
          content: t.faq.items.checkinTime.content,
        },
        {
          title: t.faq.items.checkinMethod.title,
          content: t.faq.items.checkinMethod.content,
        },
        {
          title: t.faq.items.luggage.title,
          content: t.faq.items.luggage.content,
        },
      ],
    },
    {
      category: t.faq.categories.payment,
      items: [
        {
          title: t.faq.items.paymentMethods.title,
          content: t.faq.items.paymentMethods.content,
        },
        {
          title: t.faq.items.pending.title,
          content: t.faq.items.pending.content,
          highlight: true,
        },
        {
          title: t.faq.items.cancellation.title,
          content: t.faq.items.cancellation.content,
          highlight: true,
        },
      ],
    },
    {
      category: t.faq.categories.facilities,
      items: [
        {
          title: t.faq.items.roomFacilities.title,
          content: t.faq.items.roomFacilities.content,
        },
        {
          title: t.faq.items.amenities.title,
          content: t.faq.items.amenities.content,
        },
        {
          title: t.faq.items.heating.title,
          content: t.faq.items.heating.content,
        },
      ],
    },
    {
      category: t.faq.categories.services,
      items: [
        {
          title: t.faq.items.breakfast.title,
          content: t.faq.items.breakfast.content,
        },
      ],
    },
    {
      category: t.faq.categories.rules,
      items: [
        {
          title: t.faq.items.noise.title,
          content: t.faq.items.noise.content,
          highlight: true,
        },
        {
          title: t.faq.items.toilet.title,
          content: t.faq.items.toilet.content,
          highlight: true,
        },
        {
          title: t.faq.items.eating.title,
          content: t.faq.items.eating.content,
        },
      ],
    },
    {
      category: t.faq.categories.other,
      items: [
        {
          title: t.faq.items.children.title,
          content: t.faq.items.children.content,
        },
        {
          title: t.faq.items.parkingPets.title,
          content: t.faq.items.parkingPets.content,
          highlight: true,
        },
        {
          title: t.faq.items.contact.title,
          content: t.faq.items.contact.content,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.faq.title}</h1>
        <p className="text-gray-600 mb-8">{t.faq.subtitle}</p>

        <div className="space-y-8">
          {faqs.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`p-4 rounded-lg ${
                      item.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
