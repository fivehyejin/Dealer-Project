# 프로젝트 아키텍처 가이드

> **목적**: 프로젝트 구조, 컴포넌트 관리, 기술 실행 규칙 등 프로젝트에 대한 종합 가이드  
> **대상**: 프로젝트에 참여하는 모든 개발자

## 목차
1. [폴더 구조](#1-폴더-구조)
2. [컴포넌트 분류 및 관리](#2-컴포넌트-분류-및-관리)
3. [레이아웃 컴포넌트 관리](#3-레이아웃-컴포넌트-관리)
4. [페이지 파일 구성 원칙](#4-페이지-파일-구성-원칙)
5. [기술 실행 규칙](#5-기술-실행-규칙)
6. [확장성 고려사항](#6-확장성-고려사항)

---

## 1. 폴더 구조

### 전체 구조

```
project-root/
├── app/
│   ├── layout.tsx               # 전역 레이아웃: providers, html/body, 공통 Shell 연결
│   ├── globals.css              # 전역 CSS: tailwind base + 전역 토큰/리셋
│   ├── pages/                   # ✅ 모든 페이지는 여기에 저장
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── _components/     # 해당 페이지에서만 쓰는 컴포넌트(페이지 전용)
│   │   ├── dealers/
│   │   │   ├── page.tsx
│   │   │   └── _components/
│   │   └── users/
│   │       ├── page.tsx
│   │       └── _components/
│   └── api/                     # (선택) route handlers 사용 시
│
├── components/
│   ├── ui/                      # ✅ 모든 재사용 가능한 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   └── ...
│   └── layout/                  # ✅ 공통 레이아웃 (Header, Sidebar, AppShell)
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── AppShell.tsx
│
├── lib/
│   ├── api/                     # API 함수 (user.ts, dealer.ts 등)
│   ├── types/                   # 타입 정의 (user.ts, dealer.ts 등)
│   └── utils/                   # 공용 유틸(문자열/날짜/format 등)
│
├── styles/
│   ├── tokens.css               # CSS 변수/토큰 정의 (색/간격/반경 등)
│   └── tailwind.css             # (선택) tailwind layer 정리 필요 시
│
├── public/
├── tailwind.config.(js|ts)
├── postcss.config.js
└── tsconfig.json
```

### 주요 디렉토리 설명

#### `app/pages/` - 모든 페이지
- **규칙**: 모든 페이지는 `app/pages/{route}/page.tsx`로 생성
- **페이지 전용 컴포넌트**: `app/pages/{route}/_components/`에 저장
- **공통 재사용**: 필요해지면 `components/ui/`로 이동

#### `components/ui/` - 모든 재사용 가능한 컴포넌트
- **정의**: 도메인 구분 없이 재사용 가능한 모든 컴포넌트
- **예시**: Button, Input, Card, Modal, Table, AddUserModal, GlobalSearch 등
- **규칙**:
  - 도메인 이름 포함 여부와 관계없이 재사용 가능하면 여기에 둠
  - Props는 범용적으로 설계
  - 파일명은 PascalCase (예: `DataTable.tsx`, `AddUserModal.tsx`)

#### `components/layout/` - 공통 레이아웃
- **정의**: Header/Sidebar/AppShell 같이 페이지를 감싸는 구조 컴포넌트
- **규칙**: 화면별 변형이 필요하면 props로 받거나, 변형이 크면 route 레벨에서 조립

#### `lib/` - 유틸리티 및 헬퍼
- **`lib/api/`**: API 함수
- **`lib/types/`**: TypeScript 타입 정의
- **`lib/utils/`**: 공용 유틸리티 함수

#### `styles/` - 스타일 관련
- **`styles/tokens.css`**: CSS 변수/토큰 정의
- **`styles/tailwind.css`**: (선택) tailwind layer 정리 필요 시

---

## 2. 컴포넌트 분류 및 관리

### 2.1 컴포넌트 분류 기준

#### `components/ui/` - 재사용 가능한 컴포넌트
**특징:**
- 도메인 구분 없이 재사용 가능한 모든 컴포넌트
- 비즈니스 로직 포함 가능 (필요 시)
- Props 기반 커스터마이징

**예시:**
- `Button.tsx` - 기본 버튼 컴포넌트
- `Input.tsx` - 기본 입력 필드
- `Card.tsx` - 카드 컨테이너
- `Modal.tsx` - 모달 컴포넌트
- `Table.tsx` - 테이블 컴포넌트
- `AddUserModal.tsx` - 사용자 추가 모달 (도메인 이름 포함하지만 재사용 가능)
- `DealerFormModal.tsx` - 딜러 폼 모달 (재사용 가능)

**규칙:**
- 재사용 가능하면 모두 여기에 둠
- 도메인 이름이 포함되어도 재사용 가능하면 `components/ui/`에 포함
- Props는 범용적으로 설계

#### `app/pages/{route}/_components/` - 페이지 전용 컴포넌트
**특징:**
- 특정 페이지에서만 사용하는 컴포넌트
- 페이지별 비즈니스 로직 포함
- 다른 페이지에서 재사용되지 않음

**예시:**
- `app/pages/dealers/_components/DealerTable.tsx`
- `app/pages/dashboard/_components/DashboardStats.tsx`

**규칙:**
- 페이지에서만 사용하는 컴포넌트
- 재사용이 필요해지면 `components/ui/`로 이동

#### `components/layout/` - 레이아웃 컴포넌트
**특징:**
- 전역 레이아웃 요소
- 모든 페이지에 일관되게 표시
- Fixed 위치

**예시:**
- `layout/Header.tsx` - 고정 헤더
- `layout/Sidebar.tsx` - 고정 사이드바
- `layout/AppShell.tsx` - Header + Sidebar 래퍼

### 2.2 컴포넌트 분류 의사결정 트리

```
새 컴포넌트를 만들 때:

1. 모든 페이지에서 사용되는 레이아웃 요소인가? (Header, Sidebar 등)
   → components/layout/

2. 여러 페이지에서 재사용 가능한가?
   → components/ui/
   
3. 특정 페이지에서만 사용되는가?
   → app/pages/{route}/_components/
```

---

## 3. 레이아웃 컴포넌트 관리

### 3.1 App Shell 구조

Header와 Sidebar는 **고정 레이아웃 컴포넌트**로 모든 페이지에 일관되게 표시됩니다.

#### App Shell 구현

```tsx
// components/layout/AppShell.tsx
'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-[292px] mt-[60px] min-h-[calc(100vh-60px)] overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

#### 전역 레이아웃

```tsx
// app/layout.tsx
import AppShell from '@/components/layout/AppShell'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
```

### 3.2 Tailwind CSS 전역 스타일 관리

#### globals.css

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Design Tokens - CSS Variables */
    --background: #ffffff;
    --foreground: #171717;
    
    /* Spacing */
    --spacing-header: 60px;
    --spacing-sidebar: 292px;
  }

  body {
    @apply bg-gray-50 text-gray-900;
    font-family: 'Inter', system-ui, sans-serif;
  }
}
```

#### tailwind.config.ts

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        header: 'var(--spacing-header)',
        sidebar: 'var(--spacing-sidebar)',
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.3 레이아웃 관리 원칙

1. **전역 레이아웃**: `app/layout.tsx`에서 AppShell 적용
2. **고정 위치**: Header와 Sidebar는 `fixed` 위치로 고정
3. **메인 콘텐츠 오프셋**: `ml-[sidebar-width] mt-[header-height]` 사용
4. **CSS Variables**: 디자인 토큰을 CSS 변수로 관리하여 일관성 유지
5. **overflow-y-auto**: 메인 콘텐츠 영역은 `overflow-y-auto` 사용
6. **레이아웃 주석**: 레이아웃 구조가 전환되는 지점에는 반드시 구조적 주석을 추가

---

## 4. 페이지 파일 구성 원칙

### 4.1 page.tsx 구성

- **역할**: "조립"만 수행 (상태/로직/뷰 결합 최소화)
- **복잡한 UI**: `_components`로 분리
- **데이터 요청/변환**: `lib/api/` 또는 `lib/utils/`로 이동

### 4.2 페이지 전용 컴포넌트

- **위치**: `app/pages/{route}/_components/`
- **사용**: 해당 페이지에서만 사용하는 컴포넌트
- **재사용**: 필요해지면 `components/ui/`로 이동

---

## 5. 기술 실행 규칙

### 5.1 데이터 무결성 및 참조 표준

#### Reference Standard
- 모든 UI 아키텍처와 컴포넌트 패턴은 **Catalyst Docs**를 절대적 기술 표준으로 삼는다
- Figma MCP를 통해 전달된 Variable, Props, Component 구조를 코드에서 그대로 재현한다

#### Pixel-Perfect 원칙
- Figma 프레임에 정의된 모든 수치(Spacing, Color, Radius)는 토큰 기반으로 100% 반영한다
- Catalyst 디자인 시스템 패턴 위에 이식하되, 임의 보정은 허용하지 않는다

#### Zero Arbitrary Logic
- 모든 스타일 값은 Figma Variable 및 Tailwind Config에 정의된 토큰만 사용한다
- 토큰으로 치환 불가능한 값이 발생할 경우 구현을 중단하고 보고한다

### 5.2 반응형 디자인 필수 규칙

**모든 컴포넌트는 반응형 디자인을 기본으로 구현해야 합니다.**

#### Breakpoint 기준
- **기준 해상도**: 1920px (Figma 디자인 기준)
- **Tailwind Breakpoints 사용**:
  - `sm`: 640px 이상
  - `md`: 768px 이상
  - `lg`: 1024px 이상
  - `xl`: 1280px 이상
  - `2xl`: 1536px 이상

#### 공통 반응형 패턴

**1. 패딩/간격 (Padding/Gap)**
```tsx
className="px-2 sm:px-4 gap-2 sm:gap-4"
```

**2. 텍스트 크기 (Font Size)**
```tsx
className="text-base sm:text-lg"
```

**3. 너비 제한 (Width Constraints)**
```tsx
className="w-full max-w-full lg:max-w-[680px]"
```

**4. 최소 너비 (Min Width)**
```tsx
className="min-w-0 sm:min-w-[200px]"
```

**5. 표시/숨김 (Visibility)**
```tsx
className="hidden md:block"
```

**6. 그리드 레이아웃 (Grid Layout)**
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

**7. 아이콘 크기 (Icon Size)**
```tsx
className="w-4 h-4 sm:w-5 sm:h-5"
```

**8. 텍스트 오버플로우 처리 (Text Overflow)**
```tsx
className="truncate"
// 또는
className="min-w-0" // flex 컨테이너 내에서
```

#### 구현 원칙

1. **자동 적용**: 위 패턴을 기본으로 사용하여 모든 컴포넌트에 자동 적용
2. **일관성**: 동일한 breakpoint와 패턴 사용
3. **최소 코드**: 반응형 스타일을 명시적으로 작성하지 말고, 공통 패턴 사용
4. **토큰 우선**: 반응형 값도 Design Tokens 기반으로 사용

#### 예외 처리

- Figma에 반응형 디자인이 명시적으로 정의된 경우: Figma 값 우선
- 특수한 반응형 동작이 필요한 경우: ARCHITECTURE.md에 예외 규칙 추가 후 적용
- 모바일 전용 기능: 명시적으로 `hidden sm:block` 또는 `block sm:hidden` 사용

### 5.3 디자인 시스템 및 인터랙션 규칙

#### 토큰 우선순위
- 인터랙션 코드나 샘플에 변칙 토큰이 존재하더라도, 반드시 Figma 토큰으로 강제 치환한다
- 구현 후 코드 상의 토큰 일치 여부를 검증한다

#### 텍스트 케이스 규칙

**Title Case**
- Page Title
- Section / Card Title
- Modal Title
- Table Header
- Breadcrumb

**Sentence case**
- Button / CTA
- Input Label
- Dropdown / Filter Label
- Checkbox / Toggle Label
- Placeholder
- Helper / Description
- Status / Badge
- Error / Success Message
- Inline Link

### 5.4 개발 기록 및 히스토리 관리

- 모든 구조 및 기능 변경에는 한글 주석으로 변경 이유와 날짜를 기록한다
- 가능할 경우 작업 소요 시간(Time Taken)을 주석으로 남겨 생산성 추적에 활용한다

### 5.5 예외 상황 및 중단 기준

다음 상황 발생 시 구현을 즉시 중단하고 사용자 승인을 받는다:

1. Figma 수치가 토큰과 매칭되지 않는 경우
2. 구현할 UI가 Catalyst Docs에 존재하지 않는 경우
3. 반응형(Breakpoint) 기준이 디자인에 명시되지 않은 경우

**디자인에 정의되지 않은 Hover/Active 상태는 임의로 생성하지 않는다**

---

## 6. 확장성 고려사항

### 6.1 페이지 추가 시

1. `app/pages/{new-route}/page.tsx` 생성
2. 필요시 `app/pages/{new-route}/_components/` 생성
3. 레이아웃은 `app/layout.tsx`에서 자동으로 적용

### 6.2 컴포넌트 추가 시

1. **재사용 가능**: `components/ui/`에 추가
2. **페이지 전용**: `app/pages/{route}/_components/`에 추가
3. **레이아웃**: `components/layout/`에 추가

---

## 7. 모범 사례 요약

1. **명확한 분리**: UI 컴포넌트, 페이지 전용 컴포넌트, 레이아웃 컴포넌트를 명확히 구분
2. **재사용성 우선**: 가능한 한 재사용 가능한 컴포넌트로 설계
3. **일관된 구조**: 위에 정의된 폴더 구조 유지
4. **타입 안정성**: TypeScript를 활용하여 타입 안정성 보장
5. **레이아웃 고정**: Header/Sidebar는 전역 레이아웃으로 관리
6. **디자인 토큰 활용**: CSS Variables와 Tailwind Config로 디자인 토큰 관리
7. **Pixel-Perfect 구현**: Figma 디자인을 토큰 기반으로 100% 반영
8. **반응형 디자인**: 모든 컴포넌트에 반응형 디자인 기본 적용