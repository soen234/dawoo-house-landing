'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  const contacts = [
    {
      name: 'LINE',
      id: 'gg0531',
      qr: '/qr/line.png',
      type: 'ID'
    },
    {
      name: 'KakaoTalk',
      id: 'dawoohouse',
      qr: '/qr/kakao.png',
      type: 'ID'
    },
    {
      name: 'WhatsApp',
      id: '+82 10 8676 6858',
      qr: '/qr/whatsapp.png',
      type: 'ID'
    },
    {
      name: 'WeChat',
      id: 'dawoohouse1',
      qr: '/qr/wechat_dawoohouse1.png',
      type: t.contact.wechatID
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h3>
              <div className="text-gray-600 mb-4">
                {contact.type}: <span className="font-semibold text-gray-900">{contact.id}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <img
                    src={contact.qr}
                    alt={`${contact.name} QR`}
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{t.contact.qrText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email & Phone */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.contact.email}</h3>
              <a
                href="mailto:dawoohongdae@gmail.com"
                className="text-lg text-green-600 hover:text-green-700 font-medium"
              >
                dawoohongdae@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.contact.phone}</h3>
              <a
                href="tel:+821086766858"
                className="text-lg text-green-600 hover:text-green-700 font-medium"
              >
                +82 10 8676 6858
              </a>
              <p className="text-sm text-red-600 mt-2">
                {t.contact.phoneWarning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
