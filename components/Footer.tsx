import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Da-woo House</h3>
            <p className="text-sm text-gray-400 mb-4">
              홍대입구역 도보 5분<br />
              합법 게스트하우스
            </p>
            <p className="text-xs text-gray-500">
              사업자등록번호: 575-34-00493<br />
              지자체 인·허가번호: 2018-000067
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rooms" className="hover:text-white transition-colors">
                  객실 안내
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">
                  오시는 길
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  후기
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  예약하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
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
          <p>&copy; {new Date().getFullYear()} Da-woo House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
