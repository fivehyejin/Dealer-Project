# Dealer Dashboard

딜러(Dealer) 관리 대시보드 프로젝트입니다.

## 📋 프로젝트 개요

딜러 정보를 관리하고 시각화하는 웹 대시보드 애플리케이션입니다. Next.js와 Tailwind CSS를 기반으로 구축되었으며, 디자인 토큰 시스템을 통해 일관된 디자인을 유지합니다.

## 🛠 기술 스택

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.0
- **Charts**: Recharts 2.10.3
- **Icons**: Lucide React 0.294.0
- **Design Tokens**: W3C Design Tokens 형식

## 🚀 시작하기

### 필요 조건

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:3000)
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 린트

```bash
npm run lint
```

## 📁 프로젝트 구조

```
project-root/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 전역 레이아웃
│   ├── globals.css        # 전역 스타일
│   └── page.tsx           # 메인 페이지
│
├── components/             # 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트 (Navbar, Sidebar 등)
│   └── ui/                # 재사용 가능한 UI 컴포넌트
│
├── lib/                    # 유틸리티 및 헬퍼
│   ├── tokens.ts          # 디자인 토큰 통합
│   ├── tokenParser.ts     # 토큰 파서
│   ├── api/               # API 함수
│   ├── types/             # TypeScript 타입 정의
│   └── utils/             # 공용 유틸리티
│
├── tokens/                 # 디자인 토큰 파일
│   ├── primitiveColors.tokens.json
│   ├── primitiveString.tokens.json
│   ├── semanticDark.tokens.json
│   └── semanticLight.tokens.json
│
└── doc/                    # 프로젝트 문서
    ├── ARCHITECTURE.md    # 아키텍처 가이드
    ├── TROUBLESHOOTING.md # 문제 해결 가이드
    └── SEARCH_FEATURE.md  # 글로벌 검색 기능 정의서
```

## 📚 주요 문서

프로젝트 개발 시 다음 문서를 참고하세요:

- **[ARCHITECTURE.md](./doc/ARCHITECTURE.md)**: 프로젝트 구조, 컴포넌트 관리, 기술 실행 규칙 등 종합 가이드
- **[TROUBLESHOOTING.md](./doc/TROUBLESHOOTING.md)**: 문제 해결 및 방지 가이드
- **[SEARCH_FEATURE.md](./doc/SEARCH_FEATURE.md)**: 글로벌 검색 기능 정의서 (검색 케이스 및 AI 동작 방식)
- **[README_TOKENS.md](./README_TOKENS.md)**: 디자인 토큰 통합 가이드

## 🎨 디자인 토큰

프로젝트는 W3C Design Tokens 형식을 사용하여 디자인 시스템을 관리합니다.

### 토큰 파일

- `tokens/primitiveColors.tokens.json`: 색상 프리미티브 토큰
- `tokens/primitiveString.tokens.json`: 폰트, 간격, 반경, 브레이크포인트 토큰
- `tokens/semanticDark.tokens.json`: 다크 모드 시맨틱 토큰
- `tokens/semanticLight.tokens.json`: 라이트 모드 시맨틱 토큰

### 사용 방법

토큰은 `lib/tokens.ts`를 통해 Tailwind CSS 설정에 통합되어 있습니다. Tailwind 클래스에서 자동으로 사용할 수 있습니다.

자세한 내용은 [README_TOKENS.md](./README_TOKENS.md)를 참고하세요.

## 📝 개발 가이드

### 컴포넌트 분류

- **`components/layout/`**: 레이아웃 컴포넌트 (Header, Sidebar 등)
- **`components/ui/`**: 재사용 가능한 UI 컴포넌트
- **`app/pages/{route}/_components/`**: 페이지 전용 컴포넌트

자세한 분류 기준은 [ARCHITECTURE.md](./doc/ARCHITECTURE.md)를 참고하세요.

### 코딩 규칙

- 모든 컴포넌트는 TypeScript로 작성
- Tailwind CSS를 사용한 스타일링
- 디자인 토큰 기반 스타일 적용 (임의 값 지양)
- Pixel-Perfect 원칙 준수 (Figma 디자인 기준)

자세한 기술 실행 규칙은 [ARCHITECTURE.md](./doc/ARCHITECTURE.md)를 참고하세요.

## 🤝 기여하기

1. 브랜치 생성: `git checkout -b feature/새기능`
2. 변경사항 커밋: `git commit -m 'Add: 새기능 추가'`
3. 브랜치에 푸시: `git push origin feature/새기능`
4. Pull Request 생성

## 📄 라이선스

Private 프로젝트입니다.
