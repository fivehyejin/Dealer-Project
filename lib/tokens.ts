// 디자인 토큰을 JSON 파일에서 직접 읽어서 사용
// 실제 구현 시 토큰 파일이 tokens 폴더에 있어야 함

// 토큰 타입 정의
export type TokenValue = string | number | { hex?: string; [key: string]: any }

/**
 * 토큰 값을 추출하는 헬퍼 함수
 */
function extractTokenValue(token: any): any {
  if (!token || typeof token !== 'object') {
    return token
  }

  if (token.$value !== undefined) {
    const value = token.$value
    // 색상 토큰인 경우 hex 값을 반환
    if (token.$type === 'color' && typeof value === 'object' && value?.hex) {
      return value.hex
    }
    // 숫자나 문자열은 그대로 반환
    if (typeof value === 'number' || typeof value === 'string') {
      return value
    }
    // 객체인 경우 재귀적으로 처리
    if (typeof value === 'object' && value !== null) {
      return extractTokenValue(value)
    }
    return value
  }

  // 중첩된 객체인 경우 재귀적으로 처리
  const result: any = {}
  for (const key in token) {
    if (key !== '$type' && key !== '$extensions' && key !== '$value') {
      result[key] = extractTokenValue(token[key])
    }
  }
  return result
}

// 토큰 파일을 import (동적 import가 필요할 수 있음)
// 실제 사용 시 토큰 파일이 tokens 폴더에 있어야 함

export const designTokens = {
  // 토큰 파일에서 읽어온 값들이 여기에 들어갈 예정
  // 실제 구현은 토큰 파일이 프로젝트에 추가된 후 진행
}
