export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          다우 게스트하우스 이야기
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          {/* 건물 이미지 */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/building.jpg"
              alt="다우하우스 건물"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 소개 텍스트 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              저희 게스트하우스는 2018년에 11개 객실로 문을 열었고, <strong className="text-gray-900">다우하우스는 많은 친구들을 의미</strong>합니다.
              '손님들이 친구이고 많은 친구들 덕분에 이 공간이 존재한다.'라는 생각을 반영한 이름입니다.
            </p>

            <div className="bg-white rounded-lg p-6 my-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600">
                본 숙소는 <strong className="text-green-600">Safestay 캠페인</strong>에 참여하는 합법 숙소입니다.
                <br />
                사업자등록번호: <strong>575-34-00493</strong> · 지자체 인·허가번호: <strong>2018-000067</strong>
              </p>
            </div>

            <p>
              다우 게스트하우스는 <strong className="text-gray-900">홍대에서 가장 사랑받는 게스트하우스</strong>를 목표로 합니다.
              모든 지점은 공항철도 AREX 이용이 편리하고, 홍대·연남동·서교동을 즐기기에 최적의 위치에 있습니다.
            </p>

            <p>
              호텔급 침구와 친환경 인테리어를 사용하며, 전문 청소 인력이 모든 객실을 항상 쾌적하게 관리합니다.
              또한 1:1 맞춤형 응대로 진정한 휴식을 제공해 드립니다.
            </p>

            <p className="text-lg font-semibold text-green-700 text-center mt-6">
              끊임없는 창의와 도전으로 차별화된 가치를 제시하는<br />
              '홍대다운' 게스트하우스로 성장하겠습니다.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
