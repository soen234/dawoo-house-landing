'use client';

import { useState, useRef, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const countryCodes = [
  { code: '+93', country: 'Afghanistan', native: 'افغانستان', flag: '🇦🇫' },
  { code: '+355', country: 'Albania', native: 'Shqipëri', flag: '🇦🇱' },
  { code: '+213', country: 'Algeria', native: 'الجزائر', flag: '🇩🇿' },
  { code: '+1', country: 'USA/Canada', native: 'USA/Canada', flag: '🇺🇸' },
  { code: '+376', country: 'Andorra', native: 'Andorra', flag: '🇦🇩' },
  { code: '+244', country: 'Angola', native: 'Angola', flag: '🇦🇴' },
  { code: '+54', country: 'Argentina', native: 'Argentina', flag: '🇦🇷' },
  { code: '+374', country: 'Armenia', native: 'Հայաստան', flag: '🇦🇲' },
  { code: '+61', country: 'Australia', native: 'Australia', flag: '🇦🇺' },
  { code: '+43', country: 'Austria', native: 'Österreich', flag: '🇦🇹' },
  { code: '+994', country: 'Azerbaijan', native: 'Azərbaycan', flag: '🇦🇿' },
  { code: '+973', country: 'Bahrain', native: 'البحرين', flag: '🇧🇭' },
  { code: '+880', country: 'Bangladesh', native: 'বাংলাদেশ', flag: '🇧🇩' },
  { code: '+375', country: 'Belarus', native: 'Беларусь', flag: '🇧🇾' },
  { code: '+32', country: 'Belgium', native: 'België', flag: '🇧🇪' },
  { code: '+501', country: 'Belize', native: 'Belize', flag: '🇧🇿' },
  { code: '+229', country: 'Benin', native: 'Bénin', flag: '🇧🇯' },
  { code: '+975', country: 'Bhutan', native: 'འབྲུག', flag: '🇧🇹' },
  { code: '+591', country: 'Bolivia', native: 'Bolivia', flag: '🇧🇴' },
  { code: '+387', country: 'Bosnia', native: 'Bosna', flag: '🇧🇦' },
  { code: '+267', country: 'Botswana', native: 'Botswana', flag: '🇧🇼' },
  { code: '+55', country: 'Brazil', native: 'Brasil', flag: '🇧🇷' },
  { code: '+673', country: 'Brunei', native: 'Brunei', flag: '🇧🇳' },
  { code: '+359', country: 'Bulgaria', native: 'България', flag: '🇧🇬' },
  { code: '+226', country: 'Burkina Faso', native: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+257', country: 'Burundi', native: 'Burundi', flag: '🇧🇮' },
  { code: '+855', country: 'Cambodia', native: 'កម្ពុជា', flag: '🇰🇭' },
  { code: '+237', country: 'Cameroon', native: 'Cameroun', flag: '🇨🇲' },
  { code: '+238', country: 'Cape Verde', native: 'Cabo Verde', flag: '🇨🇻' },
  { code: '+236', country: 'Central African Rep', native: 'Centrafrique', flag: '🇨🇫' },
  { code: '+235', country: 'Chad', native: 'Tchad', flag: '🇹🇩' },
  { code: '+56', country: 'Chile', native: 'Chile', flag: '🇨🇱' },
  { code: '+86', country: 'China', native: '中国', flag: '🇨🇳' },
  { code: '+57', country: 'Colombia', native: 'Colombia', flag: '🇨🇴' },
  { code: '+269', country: 'Comoros', native: 'Comores', flag: '🇰🇲' },
  { code: '+242', country: 'Congo', native: 'Congo', flag: '🇨🇬' },
  { code: '+243', country: 'Congo (DRC)', native: 'RD Congo', flag: '🇨🇩' },
  { code: '+506', country: 'Costa Rica', native: 'Costa Rica', flag: '🇨🇷' },
  { code: '+385', country: 'Croatia', native: 'Hrvatska', flag: '🇭🇷' },
  { code: '+53', country: 'Cuba', native: 'Cuba', flag: '🇨🇺' },
  { code: '+357', country: 'Cyprus', native: 'Κύπρος', flag: '🇨🇾' },
  { code: '+420', country: 'Czech Republic', native: 'Česko', flag: '🇨🇿' },
  { code: '+45', country: 'Denmark', native: 'Danmark', flag: '🇩🇰' },
  { code: '+253', country: 'Djibouti', native: 'Djibouti', flag: '🇩🇯' },
  { code: '+593', country: 'Ecuador', native: 'Ecuador', flag: '🇪🇨' },
  { code: '+20', country: 'Egypt', native: 'مصر', flag: '🇪🇬' },
  { code: '+503', country: 'El Salvador', native: 'El Salvador', flag: '🇸🇻' },
  { code: '+240', country: 'Equatorial Guinea', native: 'Guinea Ecuatorial', flag: '🇬🇶' },
  { code: '+291', country: 'Eritrea', native: 'ኤርትራ', flag: '🇪🇷' },
  { code: '+372', country: 'Estonia', native: 'Eesti', flag: '🇪🇪' },
  { code: '+251', country: 'Ethiopia', native: 'ኢትዮጵያ', flag: '🇪🇹' },
  { code: '+679', country: 'Fiji', native: 'Fiji', flag: '🇫🇯' },
  { code: '+358', country: 'Finland', native: 'Suomi', flag: '🇫🇮' },
  { code: '+33', country: 'France', native: 'France', flag: '🇫🇷' },
  { code: '+241', country: 'Gabon', native: 'Gabon', flag: '🇬🇦' },
  { code: '+220', country: 'Gambia', native: 'Gambia', flag: '🇬🇲' },
  { code: '+995', country: 'Georgia', native: 'საქართველო', flag: '🇬🇪' },
  { code: '+49', country: 'Germany', native: 'Deutschland', flag: '🇩🇪' },
  { code: '+233', country: 'Ghana', native: 'Ghana', flag: '🇬🇭' },
  { code: '+30', country: 'Greece', native: 'Ελλάδα', flag: '🇬🇷' },
  { code: '+502', country: 'Guatemala', native: 'Guatemala', flag: '🇬🇹' },
  { code: '+224', country: 'Guinea', native: 'Guinée', flag: '🇬🇳' },
  { code: '+245', country: 'Guinea-Bissau', native: 'Guiné-Bissau', flag: '🇬🇼' },
  { code: '+592', country: 'Guyana', native: 'Guyana', flag: '🇬🇾' },
  { code: '+509', country: 'Haiti', native: 'Haïti', flag: '🇭🇹' },
  { code: '+504', country: 'Honduras', native: 'Honduras', flag: '🇭🇳' },
  { code: '+852', country: 'Hong Kong', native: '香港', flag: '🇭🇰' },
  { code: '+36', country: 'Hungary', native: 'Magyarország', flag: '🇭🇺' },
  { code: '+354', country: 'Iceland', native: 'Ísland', flag: '🇮🇸' },
  { code: '+91', country: 'India', native: 'भारत', flag: '🇮🇳' },
  { code: '+62', country: 'Indonesia', native: 'Indonesia', flag: '🇮🇩' },
  { code: '+98', country: 'Iran', native: 'ایران', flag: '🇮🇷' },
  { code: '+964', country: 'Iraq', native: 'العراق', flag: '🇮🇶' },
  { code: '+353', country: 'Ireland', native: 'Éire', flag: '🇮🇪' },
  { code: '+972', country: 'Israel', native: 'ישראל', flag: '🇮🇱' },
  { code: '+39', country: 'Italy', native: 'Italia', flag: '🇮🇹' },
  { code: '+225', country: 'Ivory Coast', native: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+81', country: 'Japan', native: '日本', flag: '🇯🇵' },
  { code: '+962', country: 'Jordan', native: 'الأردن', flag: '🇯🇴' },
  { code: '+7', country: 'Kazakhstan', native: 'Қазақстан', flag: '🇰🇿' },
  { code: '+254', country: 'Kenya', native: 'Kenya', flag: '🇰🇪' },
  { code: '+965', country: 'Kuwait', native: 'الكويت', flag: '🇰🇼' },
  { code: '+996', country: 'Kyrgyzstan', native: 'Кыргызстан', flag: '🇰🇬' },
  { code: '+856', country: 'Laos', native: 'ລາວ', flag: '🇱🇦' },
  { code: '+371', country: 'Latvia', native: 'Latvija', flag: '🇱🇻' },
  { code: '+961', country: 'Lebanon', native: 'لبنان', flag: '🇱🇧' },
  { code: '+266', country: 'Lesotho', native: 'Lesotho', flag: '🇱🇸' },
  { code: '+231', country: 'Liberia', native: 'Liberia', flag: '🇱🇷' },
  { code: '+218', country: 'Libya', native: 'ليبيا', flag: '🇱🇾' },
  { code: '+423', country: 'Liechtenstein', native: 'Liechtenstein', flag: '🇱🇮' },
  { code: '+370', country: 'Lithuania', native: 'Lietuva', flag: '🇱🇹' },
  { code: '+352', country: 'Luxembourg', native: 'Luxembourg', flag: '🇱🇺' },
  { code: '+853', country: 'Macau', native: '澳門', flag: '🇲🇴' },
  { code: '+389', country: 'Macedonia', native: 'Македонија', flag: '🇲🇰' },
  { code: '+261', country: 'Madagascar', native: 'Madagasikara', flag: '🇲🇬' },
  { code: '+265', country: 'Malawi', native: 'Malawi', flag: '🇲🇼' },
  { code: '+60', country: 'Malaysia', native: 'Malaysia', flag: '🇲🇾' },
  { code: '+960', country: 'Maldives', native: 'ދިވެހިރާއްޖެ', flag: '🇲🇻' },
  { code: '+223', country: 'Mali', native: 'Mali', flag: '🇲🇱' },
  { code: '+356', country: 'Malta', native: 'Malta', flag: '🇲🇹' },
  { code: '+222', country: 'Mauritania', native: 'موريتانيا', flag: '🇲🇷' },
  { code: '+230', country: 'Mauritius', native: 'Mauritius', flag: '🇲🇺' },
  { code: '+52', country: 'Mexico', native: 'México', flag: '🇲🇽' },
  { code: '+373', country: 'Moldova', native: 'Moldova', flag: '🇲🇩' },
  { code: '+377', country: 'Monaco', native: 'Monaco', flag: '🇲🇨' },
  { code: '+976', country: 'Mongolia', native: 'Монгол', flag: '🇲🇳' },
  { code: '+382', country: 'Montenegro', native: 'Crna Gora', flag: '🇲🇪' },
  { code: '+212', country: 'Morocco', native: 'المغرب', flag: '🇲🇦' },
  { code: '+258', country: 'Mozambique', native: 'Moçambique', flag: '🇲🇿' },
  { code: '+95', country: 'Myanmar', native: 'မြန်မာ', flag: '🇲🇲' },
  { code: '+264', country: 'Namibia', native: 'Namibia', flag: '🇳🇦' },
  { code: '+977', country: 'Nepal', native: 'नेपाल', flag: '🇳🇵' },
  { code: '+31', country: 'Netherlands', native: 'Nederland', flag: '🇳🇱' },
  { code: '+64', country: 'New Zealand', native: 'New Zealand', flag: '🇳🇿' },
  { code: '+505', country: 'Nicaragua', native: 'Nicaragua', flag: '🇳🇮' },
  { code: '+227', country: 'Niger', native: 'Niger', flag: '🇳🇪' },
  { code: '+234', country: 'Nigeria', native: 'Nigeria', flag: '🇳🇬' },
  { code: '+850', country: 'North Korea', native: '북한', flag: '🇰🇵' },
  { code: '+47', country: 'Norway', native: 'Norge', flag: '🇳🇴' },
  { code: '+968', country: 'Oman', native: 'عمان', flag: '🇴🇲' },
  { code: '+92', country: 'Pakistan', native: 'پاکستان', flag: '🇵🇰' },
  { code: '+970', country: 'Palestine', native: 'فلسطين', flag: '🇵🇸' },
  { code: '+507', country: 'Panama', native: 'Panamá', flag: '🇵🇦' },
  { code: '+675', country: 'Papua New Guinea', native: 'Papua New Guinea', flag: '🇵🇬' },
  { code: '+595', country: 'Paraguay', native: 'Paraguay', flag: '🇵🇾' },
  { code: '+51', country: 'Peru', native: 'Perú', flag: '🇵🇪' },
  { code: '+63', country: 'Philippines', native: 'Pilipinas', flag: '🇵🇭' },
  { code: '+48', country: 'Poland', native: 'Polska', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', native: 'Portugal', flag: '🇵🇹' },
  { code: '+974', country: 'Qatar', native: 'قطر', flag: '🇶🇦' },
  { code: '+40', country: 'Romania', native: 'România', flag: '🇷🇴' },
  { code: '+7', country: 'Russia', native: 'Россия', flag: '🇷🇺' },
  { code: '+250', country: 'Rwanda', native: 'Rwanda', flag: '🇷🇼' },
  { code: '+966', country: 'Saudi Arabia', native: 'السعودية', flag: '🇸🇦' },
  { code: '+221', country: 'Senegal', native: 'Sénégal', flag: '🇸🇳' },
  { code: '+381', country: 'Serbia', native: 'Србија', flag: '🇷🇸' },
  { code: '+248', country: 'Seychelles', native: 'Seychelles', flag: '🇸🇨' },
  { code: '+232', country: 'Sierra Leone', native: 'Sierra Leone', flag: '🇸🇱' },
  { code: '+65', country: 'Singapore', native: 'Singapore', flag: '🇸🇬' },
  { code: '+421', country: 'Slovakia', native: 'Slovensko', flag: '🇸🇰' },
  { code: '+386', country: 'Slovenia', native: 'Slovenija', flag: '🇸🇮' },
  { code: '+252', country: 'Somalia', native: 'Soomaaliya', flag: '🇸🇴' },
  { code: '+27', country: 'South Africa', native: 'South Africa', flag: '🇿🇦' },
  { code: '+82', country: 'South Korea', native: '대한민국', flag: '🇰🇷' },
  { code: '+211', country: 'South Sudan', native: 'South Sudan', flag: '🇸🇸' },
  { code: '+34', country: 'Spain', native: 'España', flag: '🇪🇸' },
  { code: '+94', country: 'Sri Lanka', native: 'ශ්‍රී ලංකා', flag: '🇱🇰' },
  { code: '+249', country: 'Sudan', native: 'السودان', flag: '🇸🇩' },
  { code: '+597', country: 'Suriname', native: 'Suriname', flag: '🇸🇷' },
  { code: '+268', country: 'Swaziland', native: 'Swaziland', flag: '🇸🇿' },
  { code: '+46', country: 'Sweden', native: 'Sverige', flag: '🇸🇪' },
  { code: '+41', country: 'Switzerland', native: 'Schweiz', flag: '🇨🇭' },
  { code: '+963', country: 'Syria', native: 'سوريا', flag: '🇸🇾' },
  { code: '+886', country: 'Taiwan', native: '台灣', flag: '🇹🇼' },
  { code: '+992', country: 'Tajikistan', native: 'Тоҷикистон', flag: '🇹🇯' },
  { code: '+255', country: 'Tanzania', native: 'Tanzania', flag: '🇹🇿' },
  { code: '+66', country: 'Thailand', native: 'ไทย', flag: '🇹🇭' },
  { code: '+228', country: 'Togo', native: 'Togo', flag: '🇹🇬' },
  { code: '+676', country: 'Tonga', native: 'Tonga', flag: '🇹🇴' },
  { code: '+216', country: 'Tunisia', native: 'تونس', flag: '🇹🇳' },
  { code: '+90', country: 'Turkey', native: 'Türkiye', flag: '🇹🇷' },
  { code: '+993', country: 'Turkmenistan', native: 'Türkmenistan', flag: '🇹🇲' },
  { code: '+256', country: 'Uganda', native: 'Uganda', flag: '🇺🇬' },
  { code: '+380', country: 'Ukraine', native: 'Україна', flag: '🇺🇦' },
  { code: '+971', country: 'UAE', native: 'الإمارات', flag: '🇦🇪' },
  { code: '+44', country: 'United Kingdom', native: 'United Kingdom', flag: '🇬🇧' },
  { code: '+598', country: 'Uruguay', native: 'Uruguay', flag: '🇺🇾' },
  { code: '+998', country: 'Uzbekistan', native: 'Oʻzbekiston', flag: '🇺🇿' },
  { code: '+678', country: 'Vanuatu', native: 'Vanuatu', flag: '🇻🇺' },
  { code: '+58', country: 'Venezuela', native: 'Venezuela', flag: '🇻🇪' },
  { code: '+84', country: 'Vietnam', native: 'Việt Nam', flag: '🇻🇳' },
  { code: '+967', country: 'Yemen', native: 'اليمن', flag: '🇾🇪' },
  { code: '+260', country: 'Zambia', native: 'Zambia', flag: '🇿🇲' },
  { code: '+263', country: 'Zimbabwe', native: 'Zimbabwe', flag: '🇿🇼' },
];

export default function PhoneInput({ value, onChange, required = false }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // value에서 국가 코드와 번호 분리
  const getInitialValues = () => {
    if (!value) return { countryCode: '+82', phoneNumber: '' };

    // value에서 국가 코드 찾기 (긴 코드부터 확인)
    const sortedCodes = [...countryCodes].sort((a, b) => b.code.length - a.code.length);
    const foundCode = sortedCodes.find(cc => value.startsWith(cc.code));
    if (foundCode) {
      return {
        countryCode: foundCode.code,
        phoneNumber: value.slice(foundCode.code.length).trim().replace(/^-/, '')
      };
    }
    return { countryCode: '+82', phoneNumber: value };
  };

  const [countryCode, setCountryCode] = useState(getInitialValues().countryCode);
  const [phoneNumber, setPhoneNumber] = useState(getInitialValues().phoneNumber);

  const selectedCountry = countryCodes.find(c => c.code === countryCode);

  // 검색 필터링
  const filteredCountries = countryCodes.filter(country =>
    country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery) ||
    country.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    onChange(`${code} ${phoneNumber}`.trim());
    setIsOpen(false);
    setSearchQuery('');
  };

  const handlePhoneChange = (newPhone: string) => {
    // 숫자와 하이픈만 허용
    const cleaned = newPhone.replace(/[^\d-]/g, '');
    setPhoneNumber(cleaned);
    onChange(`${countryCode} ${cleaned}`.trim());
  };

  return (
    <div className="flex gap-2">
      {/* 국가 코드 선택 (커스텀 드롭다운) */}
      <div className="relative w-48" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 font-semibold focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-left flex items-center justify-between"
        >
          <span>
            {selectedCountry?.flag} {selectedCountry?.code}
          </span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
            {/* 검색 입력 */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* 국가 목록 */}
            <div className="overflow-y-auto max-h-80">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code + country.country}
                    type="button"
                    onClick={() => handleCountrySelect(country.code)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm ${
                      country.code === countryCode ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-semibold">{country.code}</span>
                    <span className="flex-1 truncate">{country.country}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-gray-500 text-sm">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 전화번호 입력 */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        required={required}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-semibold focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="10-1234-5678"
      />
    </div>
  );
}
