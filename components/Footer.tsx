'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Da-woo House</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t.footer.subtitle}<br />
              {t.footer.legal}
            </p>
            <p className="text-xs text-gray-500">
              {t.footer.businessNumber} 575-34-00493<br />
              {t.footer.licenseNumber} 2018-000067
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rooms" className="hover:text-white transition-colors">
                  {t.footer.roomsLink}
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">
                  {t.footer.locationLink}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  {t.footer.reviewsLink}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t.footer.faqLink}
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  {t.footer.bookLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:dawoohongdae@gmail.com" className="hover:text-white transition-colors">
                  dawoohongdae@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+821086766858" className="hover:text-white transition-colors">
                  +82 10 8676 6858
                </a>
              </li>
              <li className="pt-2">
                <div className="text-xs text-gray-500">
                  KakaoTalk: dawoohouse<br />
                  LINE: gg0531
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Da-woo House. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
