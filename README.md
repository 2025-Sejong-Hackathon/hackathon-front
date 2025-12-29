# 🏠 GikSEEK 🏠

>   AI기반 대학교 기숙사 룸메이트 매칭 및 생활관리 서비스


## 📋 프로젝트 소개

세종대학교 기숙사생을 위한 룸메이트 매칭 및 공동구매 서비스입니다. GIKBTI(기숙사 MBTI) 설문을 통해 사용자 성향을 분석하고, AI 기반 매칭 알고리즘으로 최적의 룸메이트를 추천합니다.

### 주요 기능

- 🔐 **세종대 포털 연동 로그인**: 세종대학교 포털 계정으로 간편 로그인
- 🎯 **GIKBTI 설문**: 기숙사 생활 성향 분석 (16개 질문)
- 🤖 **AI 기반 룸메이트 추천**: 매칭률과 일치/불일치 항목 분석
- 💬 **실시간 채팅**: 매칭된 룸메이트와 채팅
- 🛒 **공동구매**: 음식/물품 공동구매 게시글 작성 및 참여(다대다 채팅)
- 🧺 **세탁실 정보**: 세탁기 사용 현황 조회 및 혼잡도 예측
- 📰 **소식**: 기숙사 관련 공지사항 및 소식
- 📱 **PWA 지원**: 모바일 앱처럼 설치 가능

## 🛠 기술 스택

### Frontend

- **React 19.2.0**: UI 라이브러리
- **Vite 7.2.4**: 빌드 도구
- **React Router DOM 7.11.0**: 라우팅
- **Tailwind CSS 4.1.18**: 스타일링
- **Vite PWA Plugin**: PWA 지원

### 주요 라이브러리

- **Lottie React**: 애니메이션
- **React QR Scanner**: QR 코드 스캔

### 배포

- **AWS S3**: 정적 웹사이트 호스팅
- **GitHub Actions**: CI/CD 파이프라인

## 📁 프로젝트 구조

```
hackathon-front/
├── public/                 # 정적 파일
│   ├── pwa-192x192.png    # PWA 아이콘
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── assets/            # 이미지, 아이콘 등
│   │   ├── character/     # 캐릭터 이미지
│   │   └── ...
│   ├── components/        # 공통 컴포넌트
│   │   ├── BottomNavbar.jsx
│   │   ├── Input.jsx
│   │   └── MainButton.jsx
│   ├── layouts/           # 레이아웃 컴포넌트
│   │   ├── AuthLayout.jsx
│   │   ├── MainLayout.jsx
│   │   └── SignUpLayout.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Home/          # 홈
│   │   ├── Login/         # 로그인
│   │   ├── SignUp/         # 회원가입
│   │   │   ├── BasicInfo/  # 기본 정보
│   │   │   ├── LifeStyle/  # 생활 패턴
│   │   │   ├── GeekBti/    # GIKBTI 설문
│   │   │   └── Recommendation/ # 추천
│   │   ├── Matching/       # 매칭
│   │   │   ├── MutualPick.jsx
│   │   │   ├── ReceivePick.jsx
│   │   │   └── ChatRoom.jsx
│   │   ├── GroupBuy/       # 공동구매
│   │   ├── Laundry/        # 세탁실
│   │   ├── News/           # 소식
│   │   └── Mypage/         # 마이페이지
│   ├── utils/             # 유틸리티 함수
│   ├── App.jsx            # 메인 앱 컴포넌트
│   ├── main.jsx           # 진입점
│   └── index.css          # 글로벌 스타일
├── .github/
│   └── workflows/
│       └── deploy-s3.yml   # CI/CD 워크플로우
├── vite.config.js         # Vite 설정
├── package.json
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.19+ 또는 22.12+
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd hackathon-front

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

### 린팅

```bash
npm run lint
```

## 📱 PWA 설정

이 프로젝트는 PWA(Progressive Web App)를 지원합니다.

### PWA 기능

- ✅ 오프라인 지원
- ✅ 홈 화면에 추가 가능
- ✅ Service Worker를 통한 캐싱
- ✅ 자동 업데이트

### PWA 테스트

1. 빌드: `npm run build`
2. 미리보기: `npm run preview`
3. 브라우저 개발자 도구 > Application 탭에서 확인:
   - Manifest
   - Service Workers

## 🚢 배포

### AWS S3 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 AWS S3에 배포됩니다.

#### 배포 트리거

- `main` 또는 `master` 브랜치에 push 시
- GitHub Actions 탭에서 수동 실행

#### 필요한 GitHub Secrets

다음 secrets를 GitHub 저장소에 설정해야 합니다:

1. `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
2. `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 액세스 키
3. `S3_BUCKET_NAME`: S3 버킷 이름

#### GitHub Secrets 설정 방법

1. GitHub 저장소 > Settings > Secrets and variables > Actions
2. "New repository secret" 클릭
3. 위의 각 secret 추가

#### S3 버킷 설정

**1. Block Public Access 해제**

AWS 콘솔에서:

1. S3 버킷 선택
2. Permissions 탭
3. "Block public access (bucket settings)" > Edit
4. 모든 체크박스 해제 (4개 모두)
5. Save changes

**2. 정적 웹사이트 호스팅 활성화**

```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

**3. 버킷 정책 설정**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## 📚 주요 페이지

### 인증

- `/login`: 로그인

### 회원가입

- `/signup`: 회원가입 시작
- `/signup/basic-info`: 기본 정보 입력
- `/signup/lifestyle`: 생활 패턴 입력
- `/signup/geek-bti`: GIKBTI 설문
- `/signup/geek-bti/result`: GIKBTI 결과
- `/signup/recommendation`: 룸메이트 추천

### 메인 기능

- `/`: 홈 (룸메이트 추천)
- `/matching/mutual`: 서로 Pick한 목록
- `/matching/receive`: 나를 Pick한 목록
- `/matching/chat/:id`: 채팅방

### 공동구매

- `/group-buy`: 공동구매 목록
- `/group-buy/create`: 공동구매 작성
- `/group-buy/:id`: 공동구매 상세
- `/group-buy/chats`: 내 채팅방 목록

### 기타

- `/laundry`: 세탁실 정보
- `/news`: 소식 목록
- `/news/:id`: 소식 상세
- `/mypage`: 마이페이지

## 🔌 API 연동

### 인증

모든 API 요청은 JWT 토큰을 사용합니다:

```javascript
// 로그인 후 accessToken 획득
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ studentId, password }),
});

const { accessToken } = await response.json();

// 이후 API 요청 시 헤더에 포함
fetch('/api/v1/members/me', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

## 🧪 개발 가이드

### 컴포넌트 구조

- **Layouts**: 페이지 레이아웃 (MainLayout, AuthLayout, SignUpLayout)
- **Pages**: 각 페이지 컴포넌트
- **Components**: 재사용 가능한 UI 컴포넌트

### 스타일링

Tailwind CSS를 사용합니다:

```jsx
<div className='flex items-center justify-center p-4 bg-blue-500'>Content</div>
```

### 라우팅

React Router를 사용합니다:

```jsx
<Route path='/example' element={<ExamplePage />} />
```

## 📝 라이선스

이 프로젝트는 2025 Sejong Hackathon 프로젝트입니다.

## 👥 팀

산타가 상주고 감
