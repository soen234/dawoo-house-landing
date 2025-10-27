export default function Contact() {
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
      name: '위챗',
      id: 'dawoohouse1',
      qr: '/qr/wechat_dawoohouse1.png',
      type: '위챗 ID'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            연락 방법
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            객실 준비나 손님 응대로 전화 연결이 어려운 경우가 많습니다.
            <br />
            메신저 또는 이메일로 연락 부탁드립니다.
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
                <p className="text-xs text-gray-500 mt-2">QR 코드로 추가</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email & Phone */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">이메일</h3>
              <a
                href="mailto:dawoohongdae@gmail.com"
                className="text-lg text-green-600 hover:text-green-700 font-medium"
              >
                dawoohongdae@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">전화번호</h3>
              <a
                href="tel:+821086766858"
                className="text-lg text-green-600 hover:text-green-700 font-medium"
              >
                +82 10 8676 6858
              </a>
              <p className="text-sm text-red-600 mt-2">
                ⚠️ 전화는 연결이 지연될 수 있습니다. 긴급하지 않다면 메신저/이메일을 이용해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
