import { Locale } from './i18n';

type TranslationKey =
  | 'nav.rooms'
  | 'nav.location'
  | 'nav.reviews'
  | 'nav.faq'
  | 'nav.book'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.description1'
  | 'hero.description2'
  | 'hero.bookNow'
  | 'hero.viewRooms'
  | 'about.title'
  | 'contact.title'
  | 'nearby.title';

type Translations = {
  [key in Locale]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  ko: {
    'nav.rooms': '객실',
    'nav.location': '오시는 길',
    'nav.reviews': '후기',
    'nav.faq': 'FAQ',
    'nav.book': '예약하기',
    'hero.title': '홍대의 중심',
    'hero.subtitle': '다우 게스트하우스',
    'hero.description1': '홍대 옷가게 거리까지 도보 30초, 조용한 주택가에 위치한 프라이빗 게스트하우스입니다.',
    'hero.description2': '모든 객실에는 샤워가 가능한 개별 화장실이 있습니다. 편안한 침구, 기본 어메니티가 제공되며 체크인/아웃 당일 짐 보관이 가능합니다.',
    'hero.bookNow': '지금 예약하기',
    'hero.viewRooms': '객실 둘러보기',
    'about.title': '다우 게스트하우스 이야기',
    'contact.title': '연락 방법',
    'nearby.title': '숙소 주변',
  },
  en: {
    'nav.rooms': 'Rooms',
    'nav.location': 'Location',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.book': 'Book Now',
    'hero.title': 'In the Heart of Hongdae',
    'hero.subtitle': 'Da-woo Guest House',
    'hero.description1': 'A private guesthouse located in a quiet residential area, just 30 seconds walk to Hongdae shopping street.',
    'hero.description2': 'All rooms have private bathrooms with showers. Comfortable bedding and basic amenities are provided, and luggage storage is available on check-in/out days.',
    'hero.bookNow': 'Book Now',
    'hero.viewRooms': 'View Rooms',
    'about.title': 'Our Story',
    'contact.title': 'Contact Us',
    'nearby.title': 'Nearby',
  },
  ja: {
    'nav.rooms': '客室',
    'nav.location': 'アクセス',
    'nav.reviews': 'レビュー',
    'nav.faq': 'FAQ',
    'nav.book': '予約する',
    'hero.title': '弘大の中心',
    'hero.subtitle': 'ダウ ゲストハウス',
    'hero.description1': '弘大ショッピングストリートまで徒歩30秒、静かな住宅街に位置するプライベートゲストハウスです。',
    'hero.description2': '全ての客室にはシャワー付きの専用バスルームがあります。快適な寝具、基本的なアメニティが提供され、チェックイン/アウト当日の荷物預かりが可能です。',
    'hero.bookNow': '今すぐ予約',
    'hero.viewRooms': '客室を見る',
    'about.title': '私たちのストーリー',
    'contact.title': 'お問い合わせ',
    'nearby.title': '周辺情報',
  },
  'zh-Hans': {
    'nav.rooms': '客房',
    'nav.location': '位置',
    'nav.reviews': '评论',
    'nav.faq': '常见问题',
    'nav.book': '立即预订',
    'hero.title': '弘大中心',
    'hero.subtitle': 'Da-woo 招待所',
    'hero.description1': '位于安静住宅区的私人招待所，步行30秒即可到达弘大购物街。',
    'hero.description2': '所有客房均配有淋浴的独立浴室。提供舒适的床上用品和基本设施，并可在入住/退房当天寄存行李。',
    'hero.bookNow': '立即预订',
    'hero.viewRooms': '查看客房',
    'about.title': '我们的故事',
    'contact.title': '联系我们',
    'nearby.title': '周边设施',
  },
  th: {
    'nav.rooms': 'ห้องพัก',
    'nav.location': 'ที่ตั้ง',
    'nav.reviews': 'รีวิว',
    'nav.faq': 'คำถามที่พบบ่อย',
    'nav.book': 'จองเลย',
    'hero.title': 'ใจกลางฮงแด',
    'hero.subtitle': 'Da-woo เกสต์เฮาส์',
    'hero.description1': 'เกสต์เฮาส์ส่วนตัวตั้งอยู่ในย่านที่อยู่อาศัยที่เงียบสงบ เดินเพียง 30 วินาทีถึงถนนช้อปปิ้งฮงแด',
    'hero.description2': 'ทุกห้องมีห้องน้ำส่วนตัวพร้อมฝักบัว มีเครื่องนอนที่สะดวกสบายและสิ่งอำนวยความสะดวกพื้นฐาน และมีบริการฝากกระเป๋าในวันเช็คอิน/เช็คเอาท์',
    'hero.bookNow': 'จองตอนนี้',
    'hero.viewRooms': 'ดูห้องพัก',
    'about.title': 'เรื่องราวของเรา',
    'contact.title': 'ติดต่อเรา',
    'nearby.title': 'สถานที่ใกล้เคียง',
  },
};

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations['ko'][key];
}
