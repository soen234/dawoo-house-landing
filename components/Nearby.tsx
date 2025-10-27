export default function Nearby() {
  const categories = [
    {
      title: '주변 장소',
      items: [
        { name: '근현대디자인박물관', distance: '350m' },
        { name: '카카오프렌즈컨셉뮤지엄', distance: '550m' },
        { name: 'Gyeongui Line Forest Park', distance: '550m' },
        { name: 'Wau Park', distance: '600m' },
        { name: '러브뮤지엄', distance: '700m' },
        { name: '전쟁과 여성 인권 박물관', distance: '1.8km' },
      ]
    },
    {
      title: '레스토랑 & 카페',
      items: [
        { name: 'Kim Gyeong Ok Chicken feet', distance: '150m' },
        { name: 'Seokyo (Cafe/Bar)', distance: '100m' },
        { name: 'Café BBang (Cafe/Bar)', distance: '100m' },
      ]
    },
    {
      title: '인기 명소',
      items: [
        { name: 'Yanghwa Hangang Park', distance: '3.4km' },
        { name: 'Mangwon Hangang Park', distance: '3.6km' },
        { name: '경복궁', distance: '5km' },
        { name: '창덕궁', distance: '7km' },
        { name: 'N 서울 타워', distance: '7km' },
        { name: '코엑스 아쿠아리움', distance: '14km' },
      ]
    },
    {
      title: '대중교통',
      items: [
        { name: '지하철 홍대입구역', distance: '550m' },
        { name: '지하철 서강역', distance: '800m' },
        { name: '기차 Sangsu', distance: '1.1km' },
        { name: '기차 Gwangheungchang', distance: '1.3km' },
      ]
    },
    {
      title: '가장 가까운 공항',
      items: [
        { name: '김포국제공항', distance: '12km' },
        { name: '인천국제공항', distance: '52km' },
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            숙소 주변
          </h2>
          <p className="text-lg text-gray-600">
            홍대의 다양한 명소와 편의시설이 가까이 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {item.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
