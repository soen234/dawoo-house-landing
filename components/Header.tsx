'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{t.header.title}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/rooms"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {t.header.nav.rooms}
            </Link>
            <Link
              href="/location"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {t.header.nav.location}
            </Link>
            <Link
              href="/reviews"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {t.header.nav.reviews}
            </Link>
            <Link
              href="/faq"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {t.header.nav.faq}
            </Link>
          </nav>

          {/* Language Selector & CTA */}
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 font-semibold focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh-Hans">简体中文</option>
              <option value="th">ไทย</option>
            </select>
            <Link
              href="/book"
              className="hidden sm:inline-flex px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              {t.header.book}
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="메뉴"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/rooms"
                className="px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.nav.rooms}
              </Link>
              <Link
                href="/location"
                className="px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.nav.location}
              </Link>
              <Link
                href="/reviews"
                className="px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.nav.reviews}
              </Link>
              <Link
                href="/faq"
                className="px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.nav.faq}
              </Link>
              <Link
                href="/book"
                className="mx-4 mt-2 px-4 py-3 bg-green-600 text-white text-center font-semibold rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.book}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
