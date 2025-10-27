# Da-woo House - 게스트하우스 랜딩 페이지

홍대 다우 게스트하우스의 공식 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (채널 매니저와 공유)

## 프로젝트 구조

```
dawoohouse/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── Header.tsx         # 헤더 & 네비게이션
│   ├── Hero.tsx           # 메인 히어로 섹션
│   ├── About.tsx          # 소개 섹션
│   ├── Contact.tsx        # 연락처 섹션
│   ├── Nearby.tsx         # 주변 정보
│   └── Footer.tsx         # 푸터
├── lib/                   # 유틸리티
│   ├── i18n.ts           # 다국어 설정
│   └── translations.ts   # 번역 데이터
└── public/
    └── qr/               # QR 코드 이미지 (필요)

```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 필요한 QR 코드 이미지

다음 이미지 파일들을 `public/qr/` 폴더에 추가해야 합니다:

- `line.png` - LINE QR 코드
- `kakao.png` - KakaoTalk QR 코드
- `whatsapp.png` - WhatsApp QR 코드
- `wechat_dawoohouse1.png` - 위챗 QR 코드

## 다국어 지원

현재 5개 언어 지원:
- 한국어 (ko)
- 영어 (en)
- 일본어 (ja)
- 중국어 간체 (zh-Hans)
- 태국어 (th)

## 주요 기능

### 완료된 기능
- ✅ 채널 매니저 DB 연동 (Supabase)
- ✅ 실시간 객실 가용성 조회
- ✅ 온라인 예약 시스템
- ✅ 예약 생성 및 자동 재고 차감
- ✅ 예약 확인 페이지
- ✅ 날짜별 가격 계산
- ✅ **날짜 범위 선택 캘린더 (예약 페이지 내)**
- ✅ 직관적인 체크인/체크아웃 선택 UI

### API 엔드포인트
- `GET /api/rooms` - 객실 목록 조회 (날짜별 가용성 포함)
- `GET /api/properties` - 숙소 정보 조회
- `GET /api/availability` - 예약 가능 여부 확인
- `POST /api/reservations` - 예약 생성
- `GET /api/reservations?id=UUID` - 예약 조회

### 페이지
- `/` - 홈페이지
- `/rooms` - 객실 검색 및 목록
- `/book` - 예약 폼 (캘린더 통합)
- `/book/confirmation` - 예약 확인

## 향후 개발 계획

- [ ] 객실 상세 페이지 (이미지, 상세 설명)
- [ ] 후기 페이지
- [ ] FAQ 페이지
- [ ] 위치/지도 페이지
- [ ] 예약 취소 기능
- [ ] 이메일 알림
- [ ] 결제 연동

## 라이선스

MIT
