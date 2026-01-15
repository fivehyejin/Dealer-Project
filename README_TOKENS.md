# 디자인 토큰 통합 가이드

디자인 토큰 파일들을 프로젝트에 통합하려면 다음 단계를 따르세요:

1. 토큰 파일을 `tokens/` 폴더에 복사:
   - `primitiveString.tokens.json`
   - `primitiveColors.tokens.json`
   - `semanticDark.tokens.json`
   - `semanticLight.tokens.json`

2. 토큰 파일 구조:
   - W3C Design Tokens 형식
   - `$value` 속성에 실제 값 저장
   - 색상 토큰은 `hex` 값 포함

3. 사용 방법:
   - 토큰 파일을 JSON으로 import
   - `lib/tokenParser.ts`의 유틸리티 함수 사용
   - Tailwind CSS 설정에 통합
