# 글로벌 검색 기능 정의서

> **목적**: 글로벌 검색의 다양한 입력 케이스와 AI 동작 방식 정의  
> **대상**: 개발자, 기획자, 디자이너

## 목차
1. [검색 케이스 정의](#1-검색-케이스-정의)
2. [AI 동작 방식](#2-ai-동작-방식)
3. [기술 구현](#3-기술-구현)
4. [사용 예시](#4-사용-예시)

---

## 1. 검색 케이스 정의

### 1.1 Default 상태 (입력 없음)

**입력**: (없음)

**AI 동작 방식**: 탐색 진입 유도

**화면 표시 데이터**:
- 최근 검색 기록 (Recently open) - 최대 5개
- Quick Actions
  - Register New Dealer
  - Create New Role
  - Upload New Documents
  - Manage Permissions

**표시 조건**: 검색창 포커스 시, 입력값이 없을 때

---

### 1.2 Action 입력

**입력 예시**: `add`, `create`

**AI 동작 방식**: 실행 가능한 주요 액션 제안

**화면 표시 데이터**:
- AI Intelligent Response 배너
  - 제목: "AI Intelligent Response"
  - 설명: "Found X results for 'add'"
- Action 결과
  - Create New User
  - Create New Role
  - Register New Dealer

**버튼 표시**: 결과가 있을 경우에만 표시 (없으면 숨김)

---

### 1.3 Action 입력 (대상 미포함)

**입력 예시**: `Create New User`

**AI 동작 방식**: 생성 플로우 진입 및 맥락 반영

**화면 표시 데이터**:
- Create User (Role pre-filled)
- 관련 생성 액션
  - Create New Role
  - Create New User with Template

**버튼**: "Go to User Management" 또는 해당 생성 페이지로 이동

---

### 1.4 Action 입력 (대상 포함)

**입력 예시**: `alex permission`, `김민수 권한`

**AI 동작 방식**: 특정 대상에 대한 즉시 실행

**화면 표시 데이터**:
- Edit Alex's Permissions (바로 실행 가능한 액션)
- View User Detail (Alex Johnson)
- Related Actions
  - Manage Alex's Roles
  - View Alex's Activity

**버튼**: "Go to Permissions & Roles" 또는 "Edit Permissions"

---

### 1.5 Entity 입력 - User

**입력 예시**: `Alex`, `김민수`, `user`

**AI 동작 방식**: 사용자 관리 진입

**화면 표시 데이터**:
- Users 섹션
  - Alex Johnson
  - Sarah Admin
  - (검색어와 매칭되는 사용자 목록)
- Quick Actions
  - View User List
  - Create New User

**버튼**: "Go to Users"

---

### 1.6 Entity 입력 - Dealer

**입력 예시**: `dealer`, `딜러`, `busan`, `@@ dealer`

**AI 동작 방식**: 딜러 관리 진입

**화면 표시 데이터**:
- Dealers 섹션
  - Busan Auto Center
  - Seoul Motors
  - (검색어와 매칭되는 딜러 목록)
- Quick Actions
  - Register New Dealer
  - Manage Dealer Users

**버튼**: "Go to Dealers"

---

### 1.7 Menu 입력

**입력 예시**: `role`, `permission`, `audit`, `kpi`

**AI 동작 방식**: 카테고리 단위 이동

**화면 표시 데이터**:
- 메뉴 바로가기 (Menu Shortcut)
- 관련 하위 메뉴
  - Roles & Permissions
  - User Permissions
  - Role Management

**버튼**: 해당 메뉴로 이동하는 버튼 (예: "Go to Roles & Permissions", "Go to Permissions & Roles")

---

### 1.8 애매한 입력

**입력 예시**: `manage`, `setup`, `settings`

**AI 동작 방식**: 선택지 기반 가이드 제공

**화면 표시 데이터**:
- Suggested Categories
  - User Management
  - Dealer Management
  - Settings
- 각 카테고리별 관련 액션 목록

**버튼**: 우선순위가 높은 카테고리로 이동하는 버튼

---

### 1.9 No Result

**입력 예시**: 의미 없는 키워드, 존재하지 않는 항목

**AI 동작 방식**: 실패 방지 안내

**화면 표시 데이터**:
- "No results found for '[검색어]'"
- Suggested actions
  - Try different keywords
  - Browse by category
- Suggested categories
  - Users
  - Dealers
  - Settings

**버튼**: 표시하지 않음 (결과가 없으므로)

---

## 2. AI 동작 방식

### 2.1 검색어 분석 우선순위

1. **Action + 대상 포함 패턴 감지**
   - "alex permission", "user role" 등
   - 정규식 패턴으로 감지하여 즉시 액션 제안

2. **Action 키워드 감지**
   - create, add, new, edit, delete, manage, view 등
   
3. **Entity 키워드 감지**
   - user, dealer, role, permission 등
   
4. **메뉴 키워드 감지**
   - menu 항목과 매칭되는 키워드

5. **이름/고유명사 감지**
   - 사용자 이름, 딜러 이름 등

### 2.2 버튼 표시 규칙

- ✅ **결과가 있을 때만 표시**: `searchResults.length > 0`
- ✅ **우선순위 기반 결정**: 첫 번째 결과 타입에 따라 버튼 결정
- ✅ **타입별 버튼 라벨**:
  - Users → "Go to Users"
  - Dealers → "Go to Dealers"
  - KPI/Dashboard → "Go to Dashboard"
  - Menu/Permissions → "Go to Permissions & Roles"
  - Actions (User 관련) → "Go to User Management"
  - Actions (Permission 관련) → "Go to Permissions & Roles"

### 2.3 검색 결과 하이라이트

- 검색어와 매칭되는 부분은 `#0f766e` (teal) 색상으로 하이라이트
- 부분 매칭도 지원
- 정규식 이스케이프 처리로 특수문자 안전 처리

### 2.4 UI 표시 규칙

- **검색어가 없을 때**: Recently open + Quick Actions 표시
- **검색어가 있을 때**: Recently open / Quick Actions 숨김, 검색 결과 표시
- **결과가 없을 때**: No Result 메시지 + 제안 카테고리 표시

---

## 3. 기술 구현

### 3.1 검색 로직 구조

```typescript
generateSearchResults(input: string): SearchResult[]
getAiButtonAction(): ButtonAction | null
highlightMatches(text: string, matches?: string[]): ReactNode
```

### 3.2 상태 관리

- `searchValue`: 현재 입력값
- `searchResults`: 검색 결과 배열
  ```typescript
  {
    type: string;  // 'Users' | 'Dealers' | 'KPI' | 'Menu' | 'Actions' | 'Suggested Categories'
    items: {
      name: string;
      matches?: string[];
    }[];
  }[]
  ```
- `searchOpen`: 드롭다운 열림/닫힘 상태

### 3.3 데이터 저장

- **Recently Open**: localStorage에 최대 5개 저장
- 검색 기록은 저장하지 않음 (Recently Open만 저장)

### 3.4 검색 결과 타입별 아이콘

- **Users**: `UserIcon`
- **Dealers**: `BuildingOfficeIcon`
- **KPI/Menu**: `DocumentTextIcon`
- **Actions**: `ArrowTopRightOnSquareIcon`
- **Suggested Categories**: `InformationCircleIcon`

---

## 4. 사용 예시

### 예시 1: 사용자 검색
```
입력: "alex"
결과: Users 섹션에 "Alex Johnson" 표시
버튼: "Go to Users"
```

### 예시 2: 액션 검색
```
입력: "create"
결과: Create New User, Create New Role 등 액션 목록
버튼: 첫 번째 결과 타입에 따라 결정 (User 관련이면 "Go to User Management")
```

### 예시 3: Action + 대상
```
입력: "alex permission"
결과: Actions 섹션에 "Edit Alex's Permissions", "View User Detail" 표시
버튼: "Go to Permissions & Roles"
```

### 예시 4: 메뉴 검색
```
입력: "permission"
결과: Menu 섹션에 "User Permissions", "Permissions & Roles" 표시
버튼: "Go to Permissions & Roles"
```

### 예시 5: 결과 없음
```
입력: "asdfghjkl"
결과: "No results found for 'asdfghjkl'"
제안: Suggested categories (Users, Dealers, Settings)
버튼: 없음
```

### 예시 6: 애매한 입력
```
입력: "manage"
결과: Suggested Categories에 "User Management", "Dealer Management", "Settings" 표시
버튼: 첫 번째 카테고리에 따라 결정
```

---

## 5. 구현 파일 위치

- **컴포넌트**: `components/layout/Navbar.tsx`
- **검색 로직**: `generateSearchResults()` 함수
- **AI 버튼 로직**: `getAiButtonAction()` 함수
- **하이라이트 로직**: `highlightMatches()` 함수

---

## 참고 문서

- `/doc/ARCHITECTURE.md` - 프로젝트 구조 및 컴포넌트 관리
- `/doc/TROUBLESHOOTING.md` - 문제 해결 가이드
